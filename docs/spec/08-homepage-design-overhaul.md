# Homepage Design Overhaul — Implementation Specification

> **Source**: Deep design research across panel archetypes, component libraries, and premium web patterns.
> **Target**: St. Elizabeth's High School homepage — 8-panel horizontal scroll.
> **Goal**: Every panel and component must feel premium, intentional, and part of a unified visual language.

---

## Part 1: Global Design Tokens

### 1.1 Unified Card System

```css
--card-radius: 8px;
--card-border: 1px solid rgba(0, 0, 0, 0.08);
--card-border-hover: 1px solid rgba(12, 33, 124, 0.12);

--shadow-card-rest: 0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04);

--shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.08);

--card-hover-lift: -2px;
```

**Rationale**: Two-layer shadow (ambient + directional) is the Stripe/Vercel/Linear standard. 1px border at 8% opacity prevents white cards from disappearing on white backgrounds.

### 1.2 Section Header Typography Scale

```css
--type-eyebrow: 0.8125rem; /* 13px */
--type-description: 1.0625rem; /* 17px */
--type-section-h2: clamp(2rem, 4vw, 2.75rem); /* 32-44px */

--eyebrow-weight: 600;
--eyebrow-spacing: 0.1em;
--eyebrow-transform: uppercase;
--eyebrow-color: var(--s-color-primary);

--section-h2-weight: 700;
--section-h2-line-height: 1.2;
--section-h2-letter-spacing: -0.02em;

--description-max-width: 38rem; /* 608px */
```

### 1.3 Dark Surface Tokens

```css
--bg-dark-primary: #060f45;
--bg-dark-gradient-start: #1e5a7e;
--bg-dark-gradient-mid: #0c4a6e;
--bg-dark-gradient-end: #082f49;

--text-on-dark-primary: #ffffff;
--text-on-dark-secondary: rgba(255, 255, 255, 0.95);
--text-on-dark-muted: rgba(255, 255, 255, 0.82);
```

### 1.4 Motion Tokens

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1); /* smooth deceleration */
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
```

### 1.5 Focus Ring

```css
--focus-ring-color: #2563eb;
--focus-ring-shadow: 0 0 0 2px white, 0 0 0 4px var(--focus-ring-color);
```

Box-shadow rings (not outline) because they scale with transform animations — outline doesn't.

---

## Part 2: Panel-by-Panel Specifications

### Panel 1: Hero (Cinematic Video) — `HeroPanel`

**Background**: Full-bleed video + vignette overlay + bottom gradient fade.

**What changes**:

1. **Cinematic vignette** — radial gradient overlay darkens edges, centers focus on text:

```css
.heroPanel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
}
```

2. **Bottom gradient for legibility**:

```css
.heroPanel::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 60%,
    rgba(0, 0, 0, 0.5) 100%
  );
  pointer-events: none;
}
```

3. **Text entrance animation** (fade-up reveal, gated behind `prefers-reduced-motion`):

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes fadeUpReveal {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .heroStatement {
    animation: fadeUpReveal 0.8s var(--ease-out) 0.3s both;
  }
  .heroHeading {
    animation: fadeUpReveal 0.8s var(--ease-out) 0.5s both;
  }
}
```

4. **Edge transition to Panel 2** — a 60px gradient fade at the very bottom:

```css
.heroPanel::after already provides this. Increase height to 60% to ensure smooth fade.
```

5. **Mobile bottom alignment** — remove `align-self: center` / `align-items: center` in mobile media query. Text stays at bottom, left-aligned, like desktop.

---

### Panel 2: Values (White, Centered) — `ValuesPanel`

**Background**: `var(--s-color-surface)` (#ffffff) — pure white (changed from `--s-color-surface-alt`).

**What changes**:

1. **Background**: Change from `#f4f1ed` to `#ffffff`.
2. **Header centering**: Already centered. Update typography to use new tokens.
3. **Card hover**: Apply unified `--shadow-card-hover` + `--card-hover-lift`.
4. **Card border**: Apply unified `--card-border`.
5. **Image zoom on hover**: Already has `transform: scale(1.03)`. Keep.
6. **Watermarks (01/02/03)**: Already perfect at 8% opacity. No change.
7. **Top padding**: Apply header offset `padding-top: calc(var(--header-height) + clamp(32px, 5vw, 72px))`.

---

### Panel 3: Stats (White, Centered) — `StatsPanel`

**Background**: `var(--s-color-surface)` (#ffffff) — stays white.

**What changes**:

1. **Header centering**: Update typography tokens. Eyebrow in tracked-out uppercase.
2. **Card border + shadow**: Apply unified card system.
3. **Icon circle upgrade** — soft gradient + inset highlight + subtle border:

```css
.statIcon {
  background: linear-gradient(135deg, #faf9f7 0%, #f4f1ed 100%);
  border: 1px solid rgba(12, 33, 124, 0.06);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
```

4. **Icon hover reaction**: On card hover, icon lifts 4px with scale 1.1 via `cubic-bezier(0.34, 1.56, 0.64, 1)` (subtle overshoot).
5. **Top padding**: Header offset.

---

### Panel 4: Gallery (Deep Navy, "Dark Room") — `GalleryPanel`

**Background**: `#060f45` (deep navy) with noise texture + vignette.

**What changes**:

1. **Dark cinematic surface**:

```css
.galleryPanel {
  background:
    radial-gradient(ellipse at center, #060f45 0%, #030722 100%),
    url("data:image/svg+xml,...noise-filter...");
  background-blend-mode: overlay;
}
```

2. **White photo frames**: Each photo gets a 2px white/off-white border — like framed prints on a gallery wall.

3. **Header light**: Eyebrow and h2 become white text with subtle text-shadow.

4. **Gallery filter buttons — ghost style on dark**:

```css
.filterButton {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 9999px;
  transition: all var(--duration-fast);
}
.filterButton[aria-pressed="true"] {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.6);
  color: white;
}
```

5. **Masonry gap**: Tighten to 14px — photos sit closer together like a real gallery wall.

6. **Scroll reveal**: Cards fade in + translateY(16px) via IntersectionObserver. Stagger at 50ms each.

7. **Transition from Panel 3 (white)**: Intentional sharp cut — stepping from sunlit room into cinema.

---

### Panel 5: Testimonials (White, Centered) — `TestimonialsPanel`

**Background**: `var(--s-color-surface)` (#ffffff) — changed from `--s-color-surface-alt`.

**What changes**:

1. **Background**: Change from `#f4f1ed` to `#ffffff`.
2. **Header centering**: Apply centered section header tokens.
3. **Oversized decorative quotemark**: Pseudo-element `::before` on each card — `"` at 6rem, primary color, 12% opacity, positioned behind quote text. Like editorial/magazine layout.
4. **Card treatment**: Unified card border + shadow + hover lift.
5. **Role badges**: Already color-coded. Keep. Add subtle gradient backgrounds instead of flat fills.
6. **Top padding**: Header offset.

---

### Panel 6: CTA (Deep Blue Spotlight, Centered) — `CTAPanel`

**Background**: Radial gradient spotlight + noise texture + crest watermark. **No image.**

**What changes**:

1. **Spotlight gradient**:

```css
.ctaPanel {
  background: radial-gradient(
    ellipse 800px 600px at center,
    var(--bg-dark-gradient-start) 0%,
    var(--bg-dark-gradient-mid) 45%,
    var(--bg-dark-gradient-end) 100%
  );
}
```

2. **Noise texture**: SVG noise filter at 3% opacity, `mix-blend-mode: overlay` — adds cinematic grain.

3. **Crest watermark**: School crest at 3% opacity centered behind text. Uses CSS `background-image` or a positioned element.

4. **Typography**: Fully centered. Eyebrow in tracked-out uppercase white. H2 in bold white with subtle glow. Description in translucent white.

5. **Button pair**: Filled white + ghost white side-by-side. Slide-fill hover animation from bottom. On hover: lift 2px, deeper shadow.

6. **full panel vertical centering**: Content is dead center in the viewport.

7. **Remove the image entirely** from the CTAPanel component — `CTASection` without image, or a custom centered layout.

---

### Panel 7: News (White, Centered) — `NewsPanel`

**Background**: `var(--s-color-surface)` (#ffffff) — stays white.

**What changes**:

1. **Header centering**: Apply centered section header tokens.
2. **Image card hover**: Overflow-hidden container → image scales 1.03 inside, card lifts 2px with deeper shadow.
3. **Card treatment**: Unified card border + shadow.
4. **"View All News" button**: Ghost style — transparent fill, primary border, fills on hover. Centered below cards.
5. **Top padding**: Header offset.

---

### Panel 8: Footer

**No changes.** Already solid. Royal blue background with school info.

---

## Part 3: Cross-Cutting Component Standards

### 3.1 All Cards Share

| Property       | Value                                                      |
| -------------- | ---------------------------------------------------------- |
| border         | `1px solid rgba(0, 0, 0, 0.08)`                            |
| border-radius  | `8px`                                                      |
| shadow (rest)  | `0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)`   |
| shadow (hover) | `0 4px 12px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)` |
| hover lift     | `translateY(-2px)`                                         |
| transition     | `250ms cubic-bezier(0.16, 1, 0.3, 1)`                      |

### 3.2 All Section Headers Share

| Property    | Value                                                              |
| ----------- | ------------------------------------------------------------------ |
| text-align  | center                                                             |
| max-width   | 720px                                                              |
| mx          | auto                                                               |
| eyebrow     | 13px, 600 weight, 0.1em spacing, uppercase, primary color          |
| h2          | 32-44px clamp, 700 weight, -0.02em letter-spacing, 1.2 line-height |
| description | 17px, muted color, 1.65 line-height, 608px max-width               |

### 3.3 All Panels Share

- `padding-top: calc(var(--header-height) + clamp(32px, 5vw, 72px))` — header clearance
- `padding-bottom: clamp(28px, 5vw, 72px)`
- Same-content panels (2,3,5,7) all pure white — continuous surface
- Gallery panel (4) is the dark interlude — intentionally sharp boundary
- CTA panel (6) is the spotlight moment

### 3.4 prefers-reduced-motion

- All transform animations gated behind `@media (prefers-reduced-motion: no-preference)`
- Color/opacity/border transitions reduced to 150ms
- No translate/scale/rotate at all
- Card hover lifts disabled
- Entrance animations replaced with instant appearance

### 3.5 Focus-Visible

- All interactive cards get `box-shadow` ring on `:focus-visible`
- 2px white spacer + 4px brand-blue ring
- Inner links get standard 2px outline with 2px offset

---

## Part 4: Color Map — Before vs After

| Panel        | Before                      | After                                                   |
| ------------ | --------------------------- | ------------------------------------------------------- |
| Hero         | Transparent + video         | Transparent + video + vignette + fade overlay           |
| Values       | `#f4f1ed` (warm cream)      | `#ffffff` (pure white)                                  |
| Stats        | `#ffffff`                   | `#ffffff` (no change)                                   |
| Gallery      | `#faf9f7` (very light warm) | `#060f45` (deep navy + noise)                           |
| Testimonials | `#f4f1ed`                   | `#ffffff`                                               |
| CTA          | `#0c4a6e` (flat)            | `#0c4a6e` → `#082f49` (radial gradient + noise + crest) |
| News         | `#ffffff`                   | `#ffffff` (no change)                                   |
| Footer       | Royal blue                  | Royal blue (no change)                                  |

No two adjacent panels now have "similar but slightly different" whites. The rhythm is: white → white → white → DARK → white → DARK SPOTLIGHT → white → BLUE.

---

## Part 5: Implementation Order

1. **Design tokens** (`globals.css`) — add new tokens, shadow system, motion, focus ring
2. **Shared panel CSS** (`shared.module.css`) — update `.panel` base class
3. **Header offset** — apply `padding-top` to all panels
4. **Panel width tuning** — compute per-panel optimal width based on card count × min-width + gaps + padding
5. **Hero** (`HeroPanel`) — vignette, gradient, entrance animation, mobile bottom-align
6. **Values** (`ValuesPanel`) — white bg, card system, header centering
7. **Stats** (`StatsPanel`) — card system, icon circle upgrade
8. **Gallery** (`GalleryPanel`) — dark background, noise, white borders, ghost filters
9. **Testimonials** (`TestimonialsPanel`) — white bg, quotemark, card system
10. **CTA** (`CTAPanel`) — spotlight gradient, crest watermark, button pair, remove image
11. **News** (`NewsPanel`) — card system, ghost CTA button
12. **prefers-reduced-motion** — gate all transforms
13. **Focus-visible** — ring system on all cards
14. **Test verification** — lint, typecheck, build, 478 tests
15. **Spec file updates** — update docs/spec/03-homepage.md and 06-components.md

---

## Part 6: Panel Width Calculations

Based on content analysis:

| Panel        | Content width calculation                                       | Panel width                    |
| ------------ | --------------------------------------------------------------- | ------------------------------ |
| Hero         | 100vw (full-bleed video)                                        | `100vw`                        |
| Values       | 3 cards × 280px + 2 gaps × 24px + 2 × 72px padding = ~1032px    | `clamp(960px, 78vw, 1200px)`   |
| Stats        | 3 cards × 260px + 2 gaps × 24px + 2 × 72px padding = ~972px     | `clamp(900px, 73vw, 1150px)`   |
| Gallery      | 6 columns × 200px + 5 gaps × 14px + 2 × 72px padding + overflow | `auto` (masonry natural width) |
| Testimonials | 3 cards × 260px + 2 gaps × 24px + 2 × 72px padding = ~972px     | `clamp(900px, 73vw, 1150px)`   |
| CTA          | 780px centered content + 2 × 72px padding = ~924px              | `clamp(900px, 73vw, 1200px)`   |
| News         | 3 cards × 280px + 2 gaps × 24px + 2 × 72px padding = ~1032px    | `clamp(960px, 78vw, 1200px)`   |
| Footer       | 100vw                                                           | `100vw`                        |

Note: `gap="0px"` on `HorizontalScroll` — panels butt together. White panels (2,3,5,7) read as continuous. Dark panels (4,6) provide deliberate interruption.

---

_This specification is directly implementable. Every value is exact. Every treatment is justified._
