# Step 1: Color System Update — Maroon → Royal Blue

> **Handoff to:** Senior Frontend Engineer
> **Estimated time:** 30–45 minutes
> **Risk level:** Low — CSS custom property propagation handles most changes automatically
> **Baseline:** 89 tests passing, clean TypeScript build. All changes must preserve both.

---

## 1. CONTEXT

### The Problem

The current design system uses **Maroon (`#6c1f35`)** as the sole accent colour. However, St. Elizabeth High School's actual brand identity is **Royal Blue + White**. The school motto is "Truth and Honesty" and the tagline is "Guiding Minds, Nurturing Hearts, Building Futures."

The colour mismatch was identified during the initial build — maroon was chosen as a familiar Catholic-school colour, but the school's real identity is royal blue. The PAGE_ELEMENT_HIERARCHY.md spec (line 112–113) confirms:

| Token | Current (Walker) | → Target (St. Elizabeth) |
|---|---|---|
| Primary Accent | Maroon `#6c1f35` | Royal Blue `#0c217c` |
| Primary Accent Dark | `#41111f` | `#060f45` |
| CTA Background | `#0c4a6e` | **KEEP** `#0c4a6e` (already a desaturated blue-gray) |

### The Architecture

The project uses **CSS Modules exclusively** (no Tailwind). All colour values flow through **CSS custom properties** defined in `src/app/globals.css`. Every component references these variables — none hardcode hex values directly (with one exception: the video gradient fallback in WalkerHomepage).

This means updating the custom property values in one file will propagate the change across **all 24 components** automatically. However, we must also update:
- The variable **names** are misleading after the change (they still say "maroon")
- One hardcoded gradient in `WalkerHomepage.module.css`
- The `constants.ts` file documents design tokens (reference only, but should stay aligned)

### Decision: Repurpose the existing token names

Rather than renaming `--color-maroon` to `--color-royal-blue` across 30+ files (which risks missing references and breaking tests), we **repurpose the existing custom property names** — keeping the CSS variable name `--color-maroon` but changing its value to royal blue. This is safe because CSS custom properties are just identifiers; the semantic mismatch exists only in the name, not in behaviour.

The dark variant `--color-maroon-dark` similarly gets the royal blue dark value.

---

## 2. FILES TO MODIFY

### File 1: `src/app/globals.css` (PRIMARY CHANGE)

**Path:** `/home/avinash/Files/Projects/ElizabethFinal/intro-animation/StElizabethWeb/src/app/globals.css`

**Current state (lines 1–13):**
```css
:root {
  /* ── Core colours ─────────────────────────────────── */
  --color-maroon: #6c1f35;
  --color-maroon-dark: #41111f;
  --color-ink: #171717;
  --color-muted: #5f5f5f;
  --color-paper: #ffffff;
  --color-soft: #f4f1ed;
  --color-line: rgba(23, 23, 23, 0.14);

  /* ── Accent colours ──────────────────────────────── */
  --color-blue: #0c4a6e;
  --color-blue-light: #e0f2fe;
  /* ... spacing, typography, motion tokens follow ... */
}
```

**Required change — Update the accent colour values:**

```css
:root {
  /* ── Core colours ─────────────────────────────────── */
  --color-maroon: #0c217c;          /* Royal Blue — St. Elizabeth brand accent */
  --color-maroon-dark: #060f45;     /* Dark Royal Blue — hover states, gradient fallbacks */
  --color-ink: #171717;             /* UNCHANGED */
  --color-muted: #5f5f5f;           /* UNCHANGED */
  --color-paper: #ffffff;           /* UNCHANGED */
  --color-soft: #f4f1ed;            /* UNCHANGED */
  --color-line: rgba(23, 23, 23, 0.14);  /* UNCHANGED */

  /* ── Accent colours ──────────────────────────────── */
  --color-blue: #0c4a6e;            /* UNCHANGED — CTA section backgrounds */
  --color-blue-light: #e0f2fe;      /* UNCHANGED */
  /* ... spacing, typography, motion tokens follow ... */
}
```

**What changes:**
- `--color-maroon`: `#6c1f35` → `#0c217c` (royal blue)
- `--color-maroon-dark`: `#41111f` → `#060f45` (dark royal blue)
- Everything else stays exactly as-is

**What this automatically updates across the entire codebase:**
- All `Badge` number badges (ValueCard "01", "02", "03")
- All `Button` primary variant backgrounds and borders
- All `Text` eyebrow labels (the maroon uppercase labels)
- All `Link` default variant underlines
- All `Heading` accent behaviors
- All `Icon` colour references
- `Hero` text overlays and accents
- `CTASection` maroon background variant
- `Card` hover states
- `ValueCard` number badges
- `Footer` maroon background
- `Section` maroon background variant
- `WalkerHomepage` eyebrow labels, gradient references

---

### File 2: `src/components/WalkerHomepage/WalkerHomepage.module.css`

**Path:** `/home/avinash/Files/Projects/ElizabethFinal/intro-animation/StElizabethWeb/src/components/WalkerHomepage/WalkerHomepage.module.css`

**Current state (lines 145–148 — the video gradient fallback):**
```css
.videoFallback {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.24), transparent 28%),
    linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark) 46%, #111 100%);
}
```

**Required change:**
The gradient currently transitions from maroon to maroon-dark. After the globals.css update, these variables will resolve to royal blue automatically. However, the visual result may not look right — the `radial-gradient` with white at 30% 20% was tuned for maroon's warm undertones. We need to adjust the gradient composition for the cooler royal blue.

Replace with:
```css
.videoFallback {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.18), transparent 32%),
    radial-gradient(ellipse at 70% 80%, rgba(12, 33, 124, 0.4), transparent 50%),
    linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark) 46%, #02081f 100%);
}
```

**What changed:**
- Reduced white highlight opacity (0.24 → 0.18) since royal blue is cooler
- Increased radial spread (28% → 32%)
- Added a secondary radial gradient (royal blue glow at bottom-right) for depth
- Changed the final gradient stop from `#111` to `#02081f` (very dark navy) to complement royal blue
- The linear gradient now flows: royal blue → dark royal blue → deep navy

**Why this matters:** This is the ONLY hardcoded colour in the entire codebase (everything else uses CSS custom properties). The gradient provides a fallback when the video doesn't load or before it starts playing. It must look good standing alone.

---

### File 3: `src/components/shared/constants.ts` (Documentation alignment)

**Path:** `/home/avinash/Files/Projects/ElizabethFinal/intro-animation/StElizabethWeb/src/components/shared/constants.ts`

This file is **reference-only** — it documents design tokens as JavaScript constants but is not imported by any component's runtime styles. Components use the CSS custom properties directly. However, it should stay aligned for developer reference.

No functional changes needed, but add a comment at lines 1–5 to document the naming decision:

```typescript
/**
 * Design token constants — REFERENCE ONLY.
 * Components use the CSS custom properties in globals.css, not these constants.
 * 
 * NOTE: The CSS variable name --color-maroon was intentionally kept after the
 * accent colour changed from maroon (#6c1f35) to royal blue (#0c217c) to match
 * St. Elizabeth's brand identity. Renaming the variable across 30+ files was
 * deemed riskier than keeping the semantically-mismatched name.
 *
 * Pixel-width breakpoints used by media queries across components.
 */
export const BREAKPOINTS = {
  // ... rest unchanged ...
```

---

## 3. VISUAL VERIFICATION CHECKLIST

After making the changes, verify these elements render with royal blue instead of maroon:

| Component | Element | Expected Behaviour |
|---|---|---|
| `LoadOverlay` | "WE BELIEVE" text mask | White overlay (no colour change — it's white) |
| `Header` | Brand crest "S" letter | The crest uses `currentColor` from the header — verify it's white over the video panel |
| `WalkerHomepage` Panel 1 | Video gradient fallback | Royal blue → dark royal blue → deep navy gradient |
| `WalkerHomepage` Panel 2 | "We Value" eyebrow text | Royal blue (`--color-maroon`), uppercase, 0.78rem |
| `ValueCard` | "01", "02", "03" number badges | Royal blue, large serif numbers |
| `Button` (primary) | Any primary button | Royal blue background, white text, royal blue border |
| `Button` (secondary) | Any secondary button | Transparent background, royal blue text, royal blue border |
| `CTASection` (maroon bg) | Full-width coloured band | Royal blue background |
| `Footer` (maroon bg) | Full-width footer | Royal blue background |
| `Badge` | Number badges | Royal blue text |
| `Text` (eyebrow) | Section eyebrow labels | Royal blue, uppercase |
| `Link` (default) | Inline links | Royal blue underline |

---

## 4. ACCEPTANCE CRITERIA

- [ ] `pnpm build` passes with zero TypeScript errors
- [ ] `pnpm test` passes — all 89 tests green
- [ ] The video gradient fallback renders in royal blue tones (not maroon)
- [ ] ValueCard number badges ("01", "02", "03") render in royal blue
- [ ] Eyebrow text ("We Value") renders in royal blue
- [ ] No maroon (#6c1f35) visible anywhere on the homepage
- [ ] No hardcoded colour values remain outside of `globals.css`
- [ ] The `--color-blue` token remains `#0c4a6e` (CTA backgrounds still use desaturated blue-gray)
- [ ] The `--color-blue-light` token remains `#e0f2fe` (light blue section backgrounds)

---

## 5. ROLLBACK INSTRUCTIONS

If the royal blue doesn't look right:

```bash
git checkout -- src/app/globals.css
git checkout -- src/components/WalkerHomepage/WalkerHomepage.module.css
git checkout -- src/components/shared/constants.ts
```

Then run `pnpm test && pnpm build` to verify the baseline is restored.

---

## 6. EDGE CASES & NOTES

1. **The `--color-blue` token is NOT royal blue.** It's `#0c4a6e` (a desaturated blue-gray). This is intentional — it's used for full-width CTA section backgrounds and should remain distinct from the royal blue accent. Do NOT change it.

2. **`--color-blue-light` (`#e0f2fe`) is also unchanged.** It's for section backgrounds (like icon card grids). It's a light sky blue that complements both maroon and royal blue.

3. **The `--color-soft` token (`#f4f1ed`) is a warm beige.** It was chosen to complement maroon's warm undertones. Royal blue is cooler. If the beige feels disjointed after the accent change, it can be adjusted later — but do NOT change it in this step.

4. **Text shadow values throughout the codebase** use `rgba(0, 0, 0, X)` for readability on dark backgrounds. These are colour-agnostic and do not need updating.

5. **The LoadOverlay is pure white** with a transparent text cutout — no colour change needed there.

6. **The Footer's maroon background** variant will become royal blue automatically via the CSS variable. The white text on top should remain readable — royal blue at `#0c217c` has similar luminance to the old maroon.

---

*Handoff complete. Proceed to Step 2 after this step is verified.*
