#!/usr/bin/env node
/**
 * scale-ui.mjs — Globally reduce spatial sizing by a scale factor (default 0.75).
 *
 * WHY A CODEMOD, NOT A RUNTIME TOKEN
 *   The site mixes px (757×), vw/vh (206×), rem (193×), and clamp() across 52 CSS
 *   modules. A root font-size change only moves rem. To hit "everything 25% smaller"
 *   uniformly we scale the literal numbers in place via a postcss AST walk — safe,
 *   deterministic, reviewable, and reversible via git.
 *
 * WHAT GETS SCALED
 *   Length values (px, rem, vw, vh, vmin, vmax, dvh, dvw, svh, svw, lvh, lvw) on
 *   SPATIAL properties only — the allowlist below. This covers font-size, padding,
 *   margin, gap, width/height, inset, border-radius, letter-spacing, scroll-padding.
 *
 * WHAT IS PRESERVED (by design)
 *   • em / ex / ch  — relative to the element's OWN font-size, which is itself being
 *     scaled. Scaling the number too would double-reduce (0.75 × 0.75). They ride
 *     along automatically.
 *   • %             — relative to parent, not a fixed length.
 *   • fr            — grid track fractions.
 *   • ms / s        — durations.
 *   • deg / turn    — rotation.
 *   • Borders, outlines, box-shadow, text-shadow, transforms, transitions,
 *     z-index, opacity, font-weight, flex/grid layout props — never on the allowlist.
 *   • Full-bleed values: 100vw / 100vh / 100% on spatial props are preserved
 *     (a full-width panel must stay full-width).
 *   • Custom properties in the PRESERVE_VARS set (a11y touch targets, borders,
 *     shadows, focus rings, motion timings) are never scaled even if they hold
 *     a length.
 *
 * TYPOGRAPHY COMPOUNDING
 *   The existing --text-scale: 0.85 token already shrinks type 15%. We scale the
 *   literal numbers INSIDE `calc(var(--text-scale) * ...)` by 0.75 too, so type
 *   ends at 0.85 × 0.75 ≈ 0.64 of original — a true 25%+ reduction from current.
 *
 * USAGE
 *   node scripts/scale-ui.mjs --dry-run        # report only, no writes
 *   node scripts/scale-ui.mjs --apply          # write changes in place
 *   node scripts/scale-ui.mjs --apply --scale 0.8
 */

import { readFileSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import postcss from "postcss";
import valueParser from "postcss-value-parser";

// ── Configuration ──────────────────────────────────────────────────────────

const SCALE = parseFloat(
  process.argv.find((a) => a.startsWith("--scale="))?.split("=")[1] ?? "0.75",
);
const APPLY = process.argv.includes("--apply");
const DRY_RUN = process.argv.includes("--dry-run") || !APPLY;

if (DRY_RUN && APPLY) {
  console.error("Pass either --dry-run or --apply, not both.");
  process.exit(1);
}

/**
 * Properties whose length values represent SPATIAL extent and should be scaled.
 * Anything not here is left untouched (borders, shadows, transforms, etc.).
 * Custom properties (--foo) are handled separately via PRESERVE_VARS / SPATIAL_VARS.
 */
const SPATIAL_PROPS = new Set([
  // Typography
  "font-size",
  "letter-spacing",
  "word-spacing",
  "text-indent",
  "line-height", // only when it's a length; unitless ratios are preserved by the unit filter
  // Box spacing
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "padding-inline",
  "padding-block",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "margin-inline",
  "margin-block",
  "gap",
  "row-gap",
  "column-gap",
  // Sizing
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  // Positioning offsets
  "top",
  "right",
  "bottom",
  "left",
  "inset",
  "inset-block",
  "inset-inline",
  // Radii
  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  // Scroll
  "scroll-padding",
  "scroll-padding-top",
  "scroll-padding-right",
  "scroll-padding-bottom",
  "scroll-padding-left",
  "scroll-margin",
  "scroll-margin-top",
  "scroll-margin-right",
  "scroll-margin-bottom",
  "scroll-margin-left",
]);

/**
 * Custom properties that must NEVER be scaled — they hold a11y minimums, structural
 * borders, shadows, focus rings, or motion timings whose absolute values matter.
 */
const PRESERVE_VARS = new Set([
  "--touch-target-min", // WCAG 2.5.8 — 44px minimum, do not shrink
  "--card-border",
  "--card-border-hover",
  "--shadow-card-rest",
  "--shadow-card-hover",
  "--card-hover-lift",
  "--focus-ring-color",
  "--focus-ring-shadow",
  "--transition-fast",
  "--transition-normal",
  "--animation-stagger",
  "--ease-standard",
  "--ease-out",
  "--ease-overshoot",
  "--text-scale", // the existing 0.85 typography lever — leave as-is
  "--text-floor", // readability floor — absolute minimum font-size, must not be scaled
  "--header-height", // layout-critical; scaled indirectly via its clamp terms? No — preserve to keep header stable. See note.
]);

/**
 * Custom properties that ARE spatial and SHOULD be scaled when they hold a length.
 * The default for any --foo not in PRESERVE_VARS is "scale if it holds a length",
 * so no explicit allowlist is needed — PRESERVE_VARS is the exhaustive exception set.
 */

/** Length units we scale. em/ex/ch are deliberately absent (auto-scale w/ font-size). */
const SCALABLE_UNITS = new Set([
  "px",
  "rem",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "dvh",
  "dvw",
  "svh",
  "svw",
  "lvh",
  "lvw",
]);

/** Full-bleed values preserved even on spatial properties. */
function isFullBleed(numeric, unit) {
  return numeric === 100 && (unit === "vw" || unit === "vh" || unit === "%" || unit === "vmax");
}

/**
 * Hairline guard: 1px / -1px is the canonical sr-only / visually-hidden /
 * divider-hairline value. Scaling it to 0.75px breaks the clip-rect hiding
 * technique and renders inconsistently across browsers. Every 1px on a spatial
 * property in this codebase is a hairline (audited), so preserve universally.
 */
function isHairline(numeric, unit) {
  return unit === "px" && (numeric === 1 || numeric === -1);
}

/**
 * Max-idiom guard: 999px / 9999px (and their negatives) are "as large as
 * needed" idioms — fully-rounded pills (border-radius: 9999px) and off-screen
 * hiding (left: -9999px honeypot). Scaling them to 749.25px / 7499.25px is
 * semantically wrong and, for off-screen positioning, fragile. Preserve.
 */
function isMaxIdiom(numeric, unit) {
  if (unit !== "px") return false;
  const abs = Math.abs(numeric);
  return abs === 999 || abs === 9999;
}

/** Round to avoid float noise (0.75 * 0.9375 = 0.703125 → 0.7031rem). */
function round(n) {
  return Math.round(n * 10000) / 10000;
}

/**
 * Scale a single parsed value node if it is a scalable length.
 * Returns true if the node was modified.
 */
function scaleNode(node) {
  if (node.type !== "word") return false;
  // Match <optional sign><number><unit>  e.g. 1.05rem, -0.02em, 100vw, 32px
  const m = node.value.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  if (!m) return false;
  const numeric = parseFloat(m[1]);
  const unit = m[2].toLowerCase();
  if (!SCALABLE_UNITS.has(unit)) return false;
  if (isFullBleed(numeric, unit)) return false;
  if (isHairline(numeric, unit)) return false;
  if (isMaxIdiom(numeric, unit)) return false;
  const scaled = round(numeric * SCALE);
  // Preserve a leading minus for negative offsets.
  node.value = `${scaled}${unit}`;
  return true;
}

/**
 * Walk a postcss-value-parser tree and scale every scalable length word.
 * Handles plain values, calc(), clamp(), and nested combinations.
 */
function scaleValueTree(rawValue) {
  const parsed = valueParser(rawValue);
  let changed = false;
  parsed.walk((node) => {
    if (scaleNode(node)) changed = true;
  });
  return { value: parsed.toString(), changed };
}

function isCustomProp(prop) {
  return prop.startsWith("--");
}

function shouldScaleDeclaration(prop) {
  if (isCustomProp(prop)) {
    // Custom props: scale unless explicitly preserved.
    return !PRESERVE_VARS.has(prop);
  }
  return SPATIAL_PROPS.has(prop);
}

// ── Main ───────────────────────────────────────────────────────────────────

const cssFiles = globSync("src/**/*.css");
console.log(
  `scale-ui: ${DRY_RUN ? "DRY RUN" : "APPLY"} | scale=${SCALE} | ${cssFiles.length} CSS files\n`,
);

let totalScaled = 0;
let totalPreserved = 0;
let totalFilesChanged = 0;
const perFile = [];
const preserveSamples = [];
const scaledSamples = [];

for (const file of cssFiles) {
  const original = readFileSync(file, "utf8");
  const root = postcss.parse(original);

  let fileScaled = 0;
  let filePreserved = 0;

  root.walkDecls((decl) => {
    // Skip declarations inside @keyframes percent-ruled blocks? Those are fine —
    // we only scale by property, and keyframe transforms are not on the allowlist.
    if (!shouldScaleDeclaration(decl.prop)) {
      // Still count spatial-looking-but-preserved for the report? No — only count
      // declarations we examined and chose to preserve because of value rules.
      return;
    }

    const { value: newValue, changed } = scaleValueTree(decl.value);
    if (changed) {
      if (APPLY) decl.value = newValue;
      fileScaled++;
      if (scaledSamples.length < 25) {
        scaledSamples.push(
          `  ${file
            .replace("src/", "")
            .replace(
              /\.module\.css$/,
              "",
            )}: ${decl.prop}: ${decl.value.trim()} → ${newValue.trim()}`,
        );
      }
    } else {
      // Was on a spatial prop but held no scalable length (e.g. var(--spacing-md),
      // 100%, 0, none). Count as preserved-by-value.
      filePreserved++;
      if (preserveSamples.length < 15) {
        preserveSamples.push(`  ${decl.prop}: ${decl.value.trim()}  (${file.replace("src/", "")})`);
      }
    }
  });

  // Also scale custom-property declarations that are spatial hints and not preserved.
  // (Handled above via shouldScaleDeclaration for --props.)

  if (fileScaled > 0) {
    totalFilesChanged++;
    if (APPLY) {
      const out = root.toString();
      writeFileSync(file, out, "utf8");
    }
  }
  totalScaled += fileScaled;
  totalPreserved += filePreserved;
  perFile.push({ file, scaled: fileScaled, preserved: filePreserved });
}

// ── Report ─────────────────────────────────────────────────────────────────

console.log("── Scaled declarations (sample) ──");
scaledSamples.forEach((s) => console.log(s));
console.log(`\n── Spatial declarations preserved by value (no scalable length) (sample) ──`);
preserveSamples.forEach((s) => console.log(s));

console.log("\n── Per-file summary ──");
perFile
  .filter((f) => f.scaled > 0)
  .sort((a, b) => b.scaled - a.scaled)
  .forEach((f) =>
    console.log(`  ${String(f.scaled).padStart(4)} scaled  ${f.file.replace("src/", "")}`),
  );

console.log(
  `\nTotal: ${totalScaled} declarations scaled across ${totalFilesChanged} files.` +
    ` ${totalPreserved} spatial declarations preserved (no scalable length).`,
);
console.log(
  APPLY
    ? "✓ Changes written. Review with `git diff`."
    : "Dry run — no files written. Re-run with --apply to write.",
);
