# Dynamic Layout Specification v3

> **Status:** Living document. Governs all layout behavior across Desktop (≥1100px), Tablet (760–1099px), and Mobile (<760px).

---

## Design Philosophy

### The Core Insight

HTML is inherently fluid. A page with only HTML and no CSS reflows text to fit any viewport. CSS constrains this natural behavior. **Responsive design is about restoring fluidity, not adding it.**

This site has TWO fundamentally different interaction paradigms — not one layout that shrinks:

| Tier        | Viewport   | Interaction Model                                     | Layout System                         |
| ----------- | ---------- | ----------------------------------------------------- | ------------------------------------- |
| **Desktop** | ≥1100px    | Horizontal scroll carousel — panels scroll left/right | `HorizontalScroll` + `HorizontalPage` |
| **Tablet**  | 760–1099px | Vertical stack — panels scroll up/down, wider cards   | `WalkerHomepageVertical`              |
| **Mobile**  | <760px     | Vertical stack — swipeable carousels, touch-optimized | `WalkerHomepageVertical`              |

Desktop and mobile are **not the same layout at different sizes**. They are different interaction paradigms that share the same content.

### Three Laws of Dynamic Layout

**Law 1: Content dictates the breakpoint.**
Breakpoints exist where _content_ starts to look wrong — not where a specific device ends. Devices change; content proportions don't.

**Law 2: Fluid over fixed.**
Use `clamp()`, `fr` units, and `%` widths. Never use fixed `px` widths for layout containers. Fluid values eliminate the "uncanny valley" between breakpoints.

**Law 3: Progressive enhancement.**
Base CSS works everywhere. Enhancements (animations, scroll-snap, container queries) layer on via `@supports` and `@media`. The accessible version is the default.

---

## Viewport Meta

```typescript
// layout.tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // Enables env(safe-area-inset-*) for notched phones
};
```

---

## Design Token System

### Existing Tokens (DO NOT CHANGE)

```css
:root {
  /* Primitives */
  --p-color-*;          /* Raw colors */
  --s-color-*;          /* Semantic: primary, accent, surface, text, border */

  /* Typography */
  --font-serif;
  --font-sans;
  --text-scale: 0.85;   /* Global reduction factor */
  --text-floor: 0.75rem; /* Minimum readable size */

  /* Spacing */
  --spacing-sm: clamp(6px, 0.9vw, 9px);
  --spacing-md: clamp(12px, 1.8vw, 18px);
  --spacing-lg: clamp(18px, 2.7vw, 27px);
  --spacing-xl: clamp(24px, 3.6vw, 36px);

  /* Shadows */
  --shadow-card-rest;
  --shadow-card-hover;
  --shadow-elevated;
}
```

### Mobile Tokens (≤760px)

```css
@media (max-width: 760px) {
  :root {
    --mobile-panel-padding: 20px;
    --mobile-card-gap: 16px;
    --mobile-section-gap: 48px;
    --mobile-carousel-height: clamp(280px, 65vh, 380px);
    --mobile-stat-number-size: clamp(2rem, 8vw, 3rem);
    --mobile-safe-bottom: env(safe-area-inset-bottom, 0px);
    --touch-target-min: 44px;
  }
}
```

### Fluid Typography

All heading sizes use `clamp()` for continuous scaling across viewports:

| Element         | Desktop                           | Mobile                                | Token                    |
| --------------- | --------------------------------- | ------------------------------------- | ------------------------ |
| Hero heading    | `clamp(3.15rem, 7.5vw, 7.875rem)` | `clamp(1.875rem, 9vw, 3rem)`          | `--type-hero-heading`    |
| Section heading | `clamp(1.5rem, 3vw, 2.25rem)`     | `clamp(1.125rem, 3vw, 1.5rem)`        | `--type-section-heading` |
| Card heading    | `clamp(1.05rem, 2.25vw, 1.35rem)` | `clamp(0.7969rem, 2.25vw, 0.9375rem)` | `--type-card-heading`    |
| Body            | `clamp(0.75rem, 1.5vw, 1.125rem)` | `clamp(0.7031rem, 1.875vw, 0.75rem)`  | `--type-body`            |

---

## Mobile Design Principles

### Touch-First Interaction

| Principle                            | Implementation                                                      | Rationale                                                                  |
| ------------------------------------ | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **44px minimum targets**             | `min-height: var(--touch-target-min)` on all interactive elements   | WCAG 2.5.8 AA: dexterity limitations + touchscreen imprecision             |
| **Safe area padding**                | `env(safe-area-inset-bottom)` on every panel's bottom padding       | Notched phones hide content behind system UI                               |
| **Dynamic viewport**                 | `min-height: 100dvh` instead of `100vh`                             | `100vh` includes area behind browser chrome; `dvh` tracks visible viewport |
| **Swipe carousels**                  | `scroll-snap-type: x mandatory` on card containers                  | Native touch swipe + momentum + snap at compositor level (60fps)           |
| **No horizontal scroll for content** | Card tracks stay horizontal (carousel); all other flex-row → column | Users expect vertical scrolling for content flow                           |

### Scroll-Snap Carousel Pattern

Every panel with multiple cards uses this pattern on mobile:

```css
@media (max-width: 760px) {
  .cardTrack {
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: var(--mobile-card-gap, 16px);
    padding: 0 var(--mobile-panel-padding, 20px);
    scrollbar-width: none; /* Hide scrollbar, keep scrollable */
  }

  .cardTrack > * {
    flex: 0 0 85%;
    scroll-snap-align: center;
  }
}
```

**Why scroll-snap, not JavaScript carousels:**

- Zero JS dependency → no bundle cost, no hydration delay
- Operates at compositor level → 60fps guaranteed
- Native touch momentum → feels like system UI
- `scroll-snap-type: mandatory` ensures clean stops between cards

### Mobile Panel Height Pattern

Every panel on mobile uses:

```css
@media (max-width: 760px) {
  .panel {
    height: auto;
    min-height: 100vh;
    min-height: 100dvh; /* Modern browsers */
    max-height: none;
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  }
}
```

**Why `dvh`:** On iOS/Android, the address bar retracts on scroll. `100vh` is the _large_ viewport (address bar hidden) — too tall initially. `100dvh` tracks the _dynamic_ viewport, matching what the user actually sees.

---

## Desktop Design Principles

### Horizontal Scroll Carousel

Desktop uses a continuous horizontal scroll where panels flow left-to-right:

```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│   Hero   │  Values  │  Stats   │ Gallery  │ Testim.  │   CTA    │   News   │
│  100vw   │  115vw   │  95vw    │  180vw   │  110vw   │  80vw    │  110vw   │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
← ─ ─ ─ ─ ─ ─ ─ ─ ─ horizontal scroll ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ →
```

**Implementation:** `HorizontalScroll` component uses `requestAnimationFrame` to translate horizontal scroll position into `translateX` on a fixed-width container.

### Desktop Panel Layout

Every content panel (panels 2–7) follows the same pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                    PANEL (flex-direction: row)                │
│  ┌──────────────┐   ┌────────────────────────────────────┐  │
│  │  Text Column  │   │         Card Track                  │  │
│  │  (25-30%)     │   │  ┌──────┐  ┌──────┐  ┌──────┐     │  │
│  │               │   │  │ Card │  │ Card │  │ Card │     │  │
│  │  - Eyebrow    │   │  └──────┘  └──────┘  └──────┘     │  │
│  │  - Heading    │   │                                    │  │
│  │  - Description│   │  flex: 1 1 0; min-width; max-width │  │
│  └──────────────┘   └────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Key constraints:**

- Text column: `flex: 0 0 25-30%; min-width: 260-320px`
- Card track: `flex: 1 1 auto; display: flex; flex-direction: row; flex-wrap: nowrap`
- Cards: `flex: 1 1 0; min-width: X; max-width: Y` — never fixed `width`
- Gap: `clamp(36px, 5vw, 96px)` — scales with viewport

---

## Panel Specifications

### Panel 1: HeroPanel

| Tier        | Layout                                                                          | Key Behavior                                   |
| ----------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Desktop** | Full-bleed video, 2-col grid overlay (statement left, heading right)            | Parallax on scroll, video seek at 2.7s         |
| **Tablet**  | Full-bleed video, single-col overlay at bottom                                  | Same video, adjusted text sizes                |
| **Mobile**  | Full-bleed video fills `100dvh`, text anchored at bottom with safe-area padding | Video seek at 1.0s (faster start), no parallax |

**Desktop CSS:**

```css
.heroOverlay {
  display: grid;
  grid-template-columns: minmax(280px, 0.48fr) minmax(420px, 0.72fr);
  align-items: end;
}
```

**Mobile CSS:**

```css
@media (max-width: 760px) {
  .heroPanel {
    min-height: 100vh;
    min-height: 100dvh;
  }
  .heroOverlay {
    grid-template-columns: 1fr;
    padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
  }
}
```

---

### Panel 2: ValuesPanel

| Tier        | Layout                                                      | Key Behavior                                         |
| ----------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| **Desktop** | Row: text (28%) + 3 cards in horizontal track               | 3D tilt cards, parallax particles, aurora background |
| **Tablet**  | Column: text centered + cards in wider carousel             | Same cards, swipeable                                |
| **Mobile**  | Column: text centered + swipeable carousel (80% card width) | Cards at 80% width, scroll-snap, dot pagination      |

**Desktop width:** `clamp(1600px, 115vw, 2400px)`
**Math at 1440px:** Panel 1656px → text 433px → gap 86px → cards 1029px → 3 cards need 932px ✓

**Mobile card carousel:**

```css
@media (max-width: 760px) {
  .cardTrack {
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  .valueCard {
    flex: 0 0 80%;
    scroll-snap-align: center;
  }
}
```

---

### Panel 3: StatsPanel

| Tier        | Layout                                                  | Key Behavior             |
| ----------- | ------------------------------------------------------- | ------------------------ |
| **Desktop** | Row: intro (25%) + 3 stat cards                         | Animated counters, icons |
| **Tablet**  | Column: intro centered + cards in carousel              | Swipeable cards          |
| **Mobile**  | Column: intro centered + swipeable carousel (80% width) | Number-first emphasis    |

**Desktop width:** `clamp(1200px, 95vw, 1800px)`
**Math at 1440px:** Panel 1368px → text 315px → gap 72px → cards 873px → 3 cards need 756px ✓

**Mobile stat number emphasis:**

```css
@media (max-width: 760px) {
  .statValue {
    font-size: var(--mobile-stat-number-size, clamp(2rem, 8vw, 3rem));
  }
}
```

---

### Panel 4: GalleryPanel

| Tier        | Layout                                                  | Key Behavior                           |
| ----------- | ------------------------------------------------------- | -------------------------------------- |
| **Desktop** | Row: sidebar (18%) + horizontal scroll of gallery cards | Lightbox, filter pills, scroll-reveal  |
| **Tablet**  | Column: sidebar + 2-col grid of cards                   | Filter pills scroll horizontally       |
| **Mobile**  | Column: sidebar + denser 2-col grid                     | Filter pills swipeable, cards at 2-col |

**Desktop width:** `clamp(1800px, 180vw, 5000px)` — widest panel for gallery browsing

**Desktop gallery scroll:**

```css
.galleryGrid {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: clamp(12px, 2vw, 24px);
}
```

**Mobile grid:**

```css
@media (max-width: 760px) {
  .verticalGalleryGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }
}
```

**Note:** GalleryPanel uses **class-swapping** (not media queries). The orchestrator renders `.galleryPanel` on desktop and `.verticalGalleryPanel` on mobile — different CSS classes for different layouts.

---

### Panel 5: TestimonialsPanel

| Tier        | Layout                                           | Key Behavior                |
| ----------- | ------------------------------------------------ | --------------------------- |
| **Desktop** | Row: sidebar (30%) + 3 testimonial cards         | Quote emphasis, role badges |
| **Tablet**  | Column: sidebar + cards in carousel              | Swipeable                   |
| **Mobile**  | Column: sidebar + swipeable carousel (85% width) | Full-width quote emphasis   |

**Desktop width:** `clamp(1400px, 110vw, 2200px)`
**Math at 1440px:** Panel 1584px → text 443px → gap 72px → cards 961px → 3 cards need 948px ✓

---

### Panel 6: CTAPanel

| Tier        | Layout                                                | Key Behavior                            |
| ----------- | ----------------------------------------------------- | --------------------------------------- |
| **Desktop** | Row: text (45%) + crest watermark (55%) + buttons     | Dark background, dual CTA               |
| **Tablet**  | Column: text + crest + buttons stacked                | Buttons full-width                      |
| **Mobile**  | Column: text centered + crest + sticky bottom buttons | Buttons sticky at bottom with safe-area |

**Desktop width:** `clamp(900px, 80vw, 1400px)`

**Mobile sticky CTA:**

```css
@media (max-width: 760px) {
  .ctaButtons {
    position: sticky;
    bottom: env(safe-area-inset-bottom, 0px);
    background: linear-gradient(to top, var(--bg-dark-gradient-end) 60%, transparent);
    flex-direction: column;
    width: 100%;
  }
}
```

**Why sticky CTA:** On mobile, the primary conversion action (Apply Now, Contact Us) should always be accessible without scrolling. Sticky bottom placement follows the thumb zone pattern.

---

### Panel 7: NewsPanel

| Tier        | Layout                                           | Key Behavior                   |
| ----------- | ------------------------------------------------ | ------------------------------ |
| **Desktop** | Row: sidebar (28%) + 3 news cards                | Image cards with hover effects |
| **Tablet**  | Column: sidebar + cards in carousel              | Swipeable                      |
| **Mobile**  | Column: sidebar + swipeable carousel (85% width) | Compact cards, relative dates  |

**Desktop width:** `clamp(1400px, 110vw, 2200px)`
**Math at 1440px:** Panel 1584px → text 413px → gap 72px → cards 991px → 3 cards need 948px ✓

---

## Orchestrator Architecture

### WalkerHomepageDesktop (≥1100px)

```
HorizontalScroll (sticky viewport, overflow hidden)
  └── HorizontalPage (flex container, width = sum of all panels)
        ├── HeroPanel          (width: 100vw)
        ├── HorizontalPage     (width: clamp(1600px, 115vw, 2400px))
        │   └── ValuesPanel
        ├── HorizontalPage     (width: clamp(1200px, 95vw, 1800px))
        │   └── StatsPanel
        ├── HorizontalPage     (width: clamp(1800px, 180vw, 5000px))
        │   └── GalleryPanel
        ├── HorizontalPage     (width: clamp(1400px, 110vw, 2200px))
        │   └── TestimonialsPanel
        ├── HorizontalPage     (width: clamp(900px, 80vw, 1400px))
        │   └── CTAPanel
        └── HorizontalPage     (width: clamp(1400px, 110vw, 2200px))
            └── NewsPanel
```

### WalkerHomepageVertical (<1100px)

```
<main>
  ├── HeroPanel              (section, 100dvh)
  ├── ValuesPanel            (section, scroll-snap carousel)
  ├── StatsPanel             (section, scroll-snap carousel)
  ├── GalleryPanel           (section, 2-col grid)
  ├── TestimonialsPanel      (section, scroll-snap carousel)
  ├── CTAPanel               (section, sticky bottom CTA)
  └── NewsPanel              (section, scroll-snap carousel)
```

**Key difference:** `WalkerHomepageVertical` does NOT use `HorizontalPage` or `HorizontalScroll`. Each panel is a plain `<section>` with `shared.panel` class. Panel-specific CSS overrides handle the mobile layout.

---

## Component Behavior by Tier

### Card Components

| Component           | Desktop                                  | Mobile                               |
| ------------------- | ---------------------------------------- | ------------------------------------ |
| **ValueCard**       | 3D tilt, parallax, fixed aspect ratio    | Scroll-snap carousel item, 80% width |
| **GalleryCard**     | Horizontal scroll item, 4:3 aspect       | 2-col grid item, 4:3 aspect          |
| **TestimonialCard** | Flex column (quote + footer), role badge | Same structure, 85% carousel width   |
| **ImageCard**       | Flex column (image + text), hover lift   | Same structure, carousel item        |
| **IconCard**        | Flex column (icon + text)                | Same structure, carousel item        |

### Filter Components

| Component         | Desktop                                | Mobile                                   |
| ----------------- | -------------------------------------- | ---------------------------------------- |
| **GalleryFilter** | Horizontal pill bar, flex-wrap: nowrap | Horizontal scroll strip with scroll-snap |

### Navigation

| Component  | Desktop                              | Mobile                |
| ---------- | ------------------------------------ | --------------------- |
| **Header** | Fixed, transparent → solid on scroll | Fixed, hamburger menu |
| **Footer** | Multi-column grid                    | Stacked single column |

---

## Verification Checklist

### Desktop (≥1100px)

- [ ] Every panel root uses `flex-direction: row`
- [ ] Text column is left (25-30%), card track is right (70-75%)
- [ ] No header bars sitting ABOVE body content in any panel
- [ ] All panel widths math-validated (≥ cards needed + text + gap + padding)
- [ ] All card elements use `flex: 1 1 0` with `min-width`/`max-width` ranges
- [ ] Horizontal scrolling is smooth (sticky viewport, translateX)
- [ ] Gallery lightbox/filter/scroll-reveal still work
- [ ] Values expanded view still works
- [ ] Hover effects work on cards

### Mobile (<760px)

- [ ] Every panel uses `min-height: 100dvh` (not `100vh`)
- [ ] Every panel has `env(safe-area-inset-bottom)` padding
- [ ] Card tracks use `scroll-snap-type: x mandatory`
- [ ] All interactive elements are ≥44px touch targets
- [ ] CTA buttons are sticky at bottom
- [ ] Gallery uses 2-column grid (not horizontal scroll)
- [ ] Filter pills are swipeable
- [ ] Text columns are centered
- [ ] `prefers-reduced-motion: reduce` disables all animations

### Cross-Tier

- [ ] `viewport-fit=cover` in layout.tsx
- [ ] Fluid typography with `clamp()` throughout
- [ ] No fixed `px` widths on layout containers
- [ ] Lint passes, typecheck passes, tests pass

---

## File Change Reference

### Current State (what exists)

| File                                    | Status                                    |
| --------------------------------------- | ----------------------------------------- |
| `WalkerHomepageDesktop.tsx`             | ✅ Desktop horizontal scroll orchestrator |
| `WalkerHomepageVertical.tsx`            | ✅ Mobile/tablet vertical orchestrator    |
| `HeroPanel.tsx` + `.module.css`         | ✅ Both tiers implemented                 |
| `ValuesPanel.tsx` + `.module.css`       | ✅ Desktop row + mobile carousel          |
| `StatsPanel.tsx` + `.module.css`        | ✅ Desktop row + mobile carousel          |
| `GalleryPanel.tsx` + `.module.css`      | ✅ Desktop scroll + mobile 2-col grid     |
| `TestimonialsPanel.tsx` + `.module.css` | ✅ Desktop row + mobile carousel          |
| `CTAPanel.tsx` + `.module.css`          | ✅ Desktop row + mobile sticky CTA        |
| `NewsPanel.tsx` + `.module.css`         | ✅ Desktop row + mobile carousel          |
| `MobileCarousel.tsx` + `.module.css`    | ✅ Reusable scroll-snap carousel          |
| `shared.module.css`                     | ✅ Base panel styles                      |
| `globals.css`                           | ✅ Mobile tokens defined                  |
| `layout.tsx`                            | ✅ viewport-fit=cover                     |

### Known Gaps (to fix)

| Gap                         | Severity | File                       | Fix                                       |
| --------------------------- | -------- | -------------------------- | ----------------------------------------- |
| GalleryFilter scroll hint   | Low      | `GalleryFilter.module.css` | Add gradient fade at right edge on mobile |
| ExpandedView stats overflow | Medium   | `ValuesPanel.module.css`   | Add `flex-wrap: wrap` at ≤760px           |

---

## Appendix: CSS Feature Support Matrix

| Feature                  | Chrome | Firefox | Safari | Use?                              |
| ------------------------ | ------ | ------- | ------ | --------------------------------- |
| `clamp()`                | 79+    | 75+     | 13.1+  | ✅ Yes — fluid typography         |
| `dvh`/`svh`/`lvh`        | 108+   | 101+    | 15.4+  | ✅ Yes — mobile viewport          |
| `scroll-snap`            | 69+    | 62+     | 11+    | ✅ Yes — mobile carousels         |
| `env(safe-area-inset-*)` | 115+   | 117+    | 15+    | ✅ Yes — notched phones           |
| `container queries`      | 105+   | 110+    | 16+    | ✅ Yes — component responsiveness |
| `::scroll-marker()`      | 135+   | —       | —      | ⚠️ Progressive enhancement only   |
| CSS nesting              | 120+   | 117+    | 17.2+  | ✅ Yes — co-located enhancement   |
| `:has()`                 | 105+   | 121+    | 15.4+  | ✅ Yes — parent styling           |
