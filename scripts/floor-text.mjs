#!/usr/bin/env node
/**
 * floor-text.mjs — Enforce a readability floor on small font-size values.
 *
 * After the 0.75× resize (compounding with the existing --text-scale: 0.85),
 * some text resolves below a readable minimum (e.g. calc(var(--text-scale) *
 * 0.4725rem) ≈ 4.8px). This wraps any font-size declaration whose effective
 * minimum falls below --text-floor in `max(var(--text-floor), <value>)`, so
 * the responsive clamp() behaviour is preserved above the floor while no text
 * drops under it.
 *
 * The floor wraps the ENTIRE font-size value so it applies to the final computed
 * size (after --text-scale multiplication), not the pre-multiplied term:
 *   calc(var(--text-scale) * 0.54rem)
 *     → max(var(--text-floor), calc(var(--text-scale) * 0.54rem))
 *   calc(var(--text-scale) * clamp(0.5625rem, 0.7875vw, 0.7125rem))
 *     → max(var(--text-floor), calc(var(--text-scale) * clamp(0.5625rem, 0.7875vw, 0.7125rem)))
 *
 *   (Flooring the inner clamp MIN would be wrong: the floor would then be
 *    re-scaled by --text-scale, landing below the floor — e.g. 0.85 × 0.75rem
 *    = 0.64rem = 10.2px, under a 12px floor.)
 *
 * Bare rem/px font-sizes below the floor are wrapped the same way.
 * !important is preserved.
 *
 * USAGE
 *   node scripts/floor-text.mjs --dry-run        # report only
 *   node scripts/floor-text.mjs --apply           # write changes
 *   node scripts/floor-text.mjs --apply --floor 0.8125rem
 */

import { readFileSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import postcss from "postcss";

const FLOOR = process.argv.find((a) => a.startsWith("--floor="))?.split("=")[1] ?? "0.75rem";
const FLOOR_REM = parseFloat(FLOOR); // numeric for comparison
const APPLY = process.argv.includes("--apply");
const DRY_RUN = !APPLY;

// Effective-size model: a font-size value's minimum effective rem.
// calc(var(--text-scale) * X) → 0.85 * X  (text-scale is 0.85 on desktop; 1 on mobile,
//   so the desktop value is the binding constraint for "too small").
// calc(var(--text-scale) * clamp(MIN, PREF, MAX)) → 0.85 * MIN
// bare Xrem → X
// We floor when effective < FLOOR_REM.
const TEXT_SCALE = 0.85;

function effectiveMinRem(value) {
  // Returns the minimum effective rem of a font-size value, or null if not determinable.
  const v = value.trim();
  // calc(var(--text-scale) * clamp(MIN, ...))
  let m = v.match(/^calc\(var\(--text-scale\) \* clamp\(([\d.]+)rem,/);
  if (m) return TEXT_SCALE * parseFloat(m[1]);
  // calc(var(--text-scale) * Nrem)
  m = v.match(/^calc\(var\(--text-scale\) \* ([\d.]+)rem\)/);
  if (m) return TEXT_SCALE * parseFloat(m[1]);
  // bare Nrem
  m = v.match(/^([\d.]+)rem$/);
  if (m) return parseFloat(m[1]);
  // bare Npx → rem equivalent (16px = 1rem)
  m = v.match(/^([\d.]+)px$/);
  if (m) return parseFloat(m[1]) / 16;
  return null; // var(), clamp without text-scale, etc. — leave alone
}

function alreadyFloored(value) {
  return value.includes("var(--text-floor)");
}

function wrapValue(value) {
  // Wrap the entire value so the floor applies to the final computed size.
  // NOTE: do NOT append "!important" here — postcss serializes it from
  // decl.important, so adding it to the string would produce "!important !important".
  return `max(var(--text-floor), ${value})`;
}

const cssFiles = globSync("src/**/*.css");
console.log(
  `floor-text: ${DRY_RUN ? "DRY RUN" : "APPLY"} | floor=${FLOOR} (effective ${FLOOR_REM}rem) | ${cssFiles.length} CSS files\n`,
);

let totalFloored = 0;
const samples = [];

for (const file of cssFiles) {
  const original = readFileSync(file, "utf8");
  const root = postcss.parse(original);
  let fileFloored = 0;

  root.walkDecls("font-size", (decl) => {
    if (alreadyFloored(decl.value)) return;
    // Strip a trailing !important from the value string for wrapping; postcss
    // re-serializes !important from decl.important, so we must not duplicate it.
    const value = decl.value.replace(/\s*!important\s*$/, "").trim();
    const eff = effectiveMinRem(value);
    if (eff === null || eff >= FLOOR_REM) return; // not below floor

    // All cases: wrap the entire value so the floor applies to the final size.
    const newValue = wrapValue(value);

    if (samples.length < 20) {
      samples.push(
        `  ${file.replace("src/", "")}: ${decl.value.trim()} (eff ${eff.toFixed(3)}rem) → ${newValue.trim()}`,
      );
    }
    if (APPLY) decl.value = newValue;
    fileFloored++;
  });

  if (fileFloored > 0 && APPLY) {
    writeFileSync(file, root.toString(), "utf8");
  }
  totalFloored += fileFloored;
}

console.log("── Floored declarations (sample) ──");
samples.forEach((s) => console.log(s));
console.log(`\nTotal: ${totalFloored} font-size declarations floored at ${FLOOR}.`);
console.log(
  APPLY
    ? "✓ Changes written. Review with `git diff`."
    : "Dry run — no files written. Re-run with --apply to write.",
);
