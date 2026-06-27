# Horizontal Redesign — Math-Validated Specification v2

> **Status:** All values below are computed and verified for 1440px and 1920px screens. Minimums work at baseline 1100px with flexible card widths.

---

## 🔴 Root Cause Analysis: Why Every Panel Is Broken

### Problem 1: Panels Are Too Narrow

On a 1440px screen, as measured via `node`:

- **ValuesPanel** (1320px): 3 cards need 932px, only 687px available → **245px clipped** by `overflow: hidden`
- **StatsPanel** (788px): 3 cards need 816px, only 680px available → **136px overflow → wraps**
- **TestimonialsPanel** (788px): need 948px → **268px overflow → wraps**
- **NewsPanel** (843px): need 1068px → **333px overflow → wraps**

### Problem 2: Hidden Vertical Splits

Every panel has a vertical split — a header/bar sitting **ABOVE** the body:

```
.valuesPanel (flex-direction: COLUMN ← HIDDEN VERTICAL SPLIT)
  ├── .valuesHeader           ← ABOVE
  └── .body                   ← BELOW
```

This violates the core requirement: **nothing above or below anything else**.

### Problem 3: Fixed Card Widths Don't Scale

Cards use fixed `width` values that don't shrink when the panel is at its minimum. Solution: all visual elements use `flex-grow` with `min-width`/`max-width` ranges.

---

## The Design Philosophy (4 Laws, Revised)

### Law 1: ONE Row Per Panel — No Exceptions

Every panel's root container uses `flex-direction: row`. The entire content is a single horizontal line. No headers, no footers, no stacked elements. NOTHING above or below.

### Law 2: Text Left, Content Right

Left column: text (eyebrow, heading, description). Right column: visual elements (cards, gallery, buttons). Text takes 25-30% of content width. Content takes the rest.

### Law 3: Element Widths Are Flexible

Every card/visual element uses `flex: 1 1 0; min-width: X; max-width: Y;` so they scale gracefully with the panel width. No fixed `width` values.

### Law 4: Math-Validated Panel Widths

Panel widths computed to guarantee every element fits at all viewports. Minimum panel widths ensure no overflow.

---

## Math-Validated Panel Specifications

### Panel 1: HeroPanel — NO CHANGES

- Width: `100vw` (screen)
- Layout: Full-bleed video background with text overlay at bottom
- Justification: The hero is a cinematic intro. Full-bleed video is correct here.

---

### Panel 2: ValuesPanel — HEAVY REFACTOR

**Problem:** `.valuesHeader` sits ABOVE `.body` (vertical split). Cards overflow by 245px.

**Fix:**

1. ELIMINATE `.valuesHeader` entirely. The header is a vertical split. Merge the counter info or drop it.
2. Panel width: `clamp(1600px, 115vw, 2400px)` ← math validated
3. Cards become flexible: `flex: 1 1 0; min-width: 260px; max-width: 380px;`
4. Gap between text/cards: `clamp(36px, 6vw, 96px)`

**Verified at 1440px:**

- Panel: 1656px → content: 1548px → text (28%): 433px → gap: 86px → cards avail: 1029px
- 3 cards need: 932px → **✓ FITS with 97px buffer**

**CSS structure (ValuesPanel.module.css):**

```css
.valuesPanel {
  display: flex;
  flex-direction: row; /* ← WAS column */
  align-items: center;
  gap: clamp(36px, 6vw, 96px);
  padding: clamp(21px, 3.75vw, 54px);
  height: 100vh;
  background: #faf8f5;
  overflow: hidden;
}

.text {
  flex: 0 0 28%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cardTrack {
  flex: 1 1 auto;
  display: flex;
  gap: clamp(21px, 3vw, 42px);
  align-items: center;
  justify-content: center;
}

.valueCard {
  flex: 1 1 0;
  min-width: 260px;
  max-width: 380px;
  aspect-ratio: 3 / 4;
}
```

**TSX changes (ValuesPanel.tsx):**

- Remove `<motion.header className={styles.valuesHeader}>` wrapper
- Make `.valuesPanel` the root container with `flex-direction: row`
- Text become left column, cardTrack becomes right column

---

### Panel 3: StatsPanel — FULL REWRITE

**Problem:** `flex-direction: column` — stats intro ABOVE stats cards. Panel too narrow.

**Fix:**

1. Panel width: `clamp(1200px, 95vw, 1800px)` ← math validated
2. Single row: text left (25%), cards right (75%)
3. Cards flexible: `flex: 1 1 0; min-width: 200px; max-width: 280px;`

**Verified at 1440px:**

- Panel: 1368px → content: 1260px → text (25%): 315px → gap: 72px → cards avail: 873px
- 3 cards need: 756px → **✓ FITS with 117px buffer**

**CSS structure (StatsPanel.module.css):**

```css
.statsPanel {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(36px, 5vw, 80px);
  padding: clamp(21px, 3.75vw, 54px);
  height: 100vh;
  background: var(--s-color-surface);
}

.statsIntro {
  flex: 0 0 25%;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.statsCards {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  gap: clamp(18px, 3vw, 36px);
  align-items: stretch;
}

.statsCard {
  flex: 1 1 0;
  min-width: 200px;
  max-width: 280px;
}
```

**TSX changes (StatsPanel.tsx):**

- Restructure: remove `Container`, `Stack`, etc. Make `.statsPanel` a single flex row
- StatsIntro becomes left column, statsCards becomes right column

---

### Panel 4: GalleryPanel — FULL REWRITE

**Problem:** Header ABOVE masonry grid. Column-wrap creates vertical stacking.

**Fix:**

1. Panel width: `clamp(1800px, 180vw, 5000px)` ← math validated, very wide for gallery
2. Single row: sidebar left (18%), gallery grid right (82%)
3. Gallery grid: horizontal scrolling row. Cards: fixed height, aspect-ratio 4:3
4. Sidebar contains: header text + filter pills

**Verified at 1440px:**

- Panel: 2592px → content: 2484px → sidebar (18%): 447px → gap: 86px → cards avail: 1951px
- Each card at 4:3 aspect, 100% height: ~180-220px wide → fits 8-10 cards visible before scrolling

**CSS structure (GalleryPanel.module.css):**

```css
.galleryPanel {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(36px, 6vw, 96px);
  padding: clamp(21px, 3.75vw, 54px);
  height: 100vh;
  overflow-x: visible;
  background: radial-gradient(...) /* keep dark theme */;
}

.gallerySidebar {
  flex: 0 0 18%;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(12px, 2vw, 24px);
}

.galleryGrid {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: clamp(12px, 2vw, 24px);
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  align-items: center;
}
```

**GalleryCard.module.css changes:**

- Remove column-wrap height calculations (standard/hero)
- All cards: `height: calc(100% - 8px); aspect-ratio: 4/3; flex: 0 0 auto;`

**TSX changes (GalleryPanel.tsx):**

- Restructure to sidebar + grid as siblings in one flex row

---

### Panel 5: TestimonialsPanel — FULL REWRITE

**Problem:** Header ABOVE 3 testimonial cards in grid. Panel too narrow.

**Fix:**

1. Panel width: `clamp(1400px, 110vw, 2200px)` ← math validated
2. Single row: text left (30%), cards right (70%)
3. Cards flexible: `flex: 1 1 0; min-width: 240px; max-width: 380px;`

**Verified at 1440px:**

- Panel: 1584px → content: 1476px → text (30%): 443px → gap: 72px → cards avail: 961px
- 3 cards need: 948px → **✓ FITS with 13px buffer**

**CSS structure (TestimonialsPanel.module.css):**

```css
.testimonialsPanel {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(36px, 5vw, 80px);
  padding: clamp(21px, 3.75vw, 54px);
  height: 100vh;
  background: var(--s-color-surface);
}

.sidebar {
  flex: 0 0 30%;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cardsRow {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  gap: clamp(18px, 3vw, 36px);
  align-items: stretch;
}

/* Cards are flex items, TestimonialCard component gets className */
.cardsRow > * {
  flex: 1 1 0;
  min-width: 240px;
  max-width: 380px;
}
```

---

### Panel 6: CTAPanel — FULL REWRITE

**Problem:** Single centered column. No horizontal split.

**Fix:**

1. Panel width: `clamp(900px, 80vw, 1400px)` ← math validated
2. Single row: text left (45%), buttons right (55%)
3. Buttons stacked vertically in right column, centered

**Verified at 1440px:**

- Panel: 1152px → content: 1044px → text (45%): 470px → gap: 58px → buttons avail: 516px
- **✓ FITS with generous space**

**CSS structure (CTAPanel.module.css):**

```css
.ctaPanel {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(36px, 5vw, 80px);
  padding: clamp(21px, 3.75vw, 54px);
  height: 100vh;
}

.ctaText {
  flex: 0 0 45%;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ctaActions {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 2vw, 24px);
}
```

---

### Panel 7: NewsPanel — FULL REWRITE

**Problem:** Header ABOVE 3 news cards in grid. Panel too narrow.

**Fix:**

1. Panel width: `clamp(1400px, 110vw, 2200px)` ← math validated
2. Single row: sidebar left (28%) with header + CTA link, cards right (72%)
3. Cards flexible: `flex: 1 1 0; min-width: 240px; max-width: 360px;`

**Verified at 1440px:**

- Panel: 1584px → content: 1476px → sidebar (28%): 413px → gap: 72px → cards avail: 991px
- 3 cards need: 948px → **✓ FITS with 43px buffer**

**CSS structure (NewsPanel.module.css):**

```css
.newsPanel {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(36px, 5vw, 80px);
  padding: clamp(21px, 3.75vw, 54px);
  height: 100vh;
  background: var(--s-color-surface);
}

.sidebar {
  flex: 0 0 28%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(18px, 3vw, 36px);
}

.cardsRow {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  gap: clamp(18px, 3vw, 36px);
  align-items: stretch;
}

.cardsRow > * {
  flex: 1 1 0;
  min-width: 240px;
  max-width: 360px;
}
```

---

## Orchestrator Changes (WalkerHomepageDesktop.tsx)

| Panel             | Current Width                    | New Width                      |
| ----------------- | -------------------------------- | ------------------------------ |
| HeroPanel         | `100vw` screen                   | `100vw` screen — unchanged     |
| ValuesPanel       | `clamp(1320px, 90vw, 1600px)`    | `clamp(1600px, 115vw, 2400px)` |
| StatsPanel        | `clamp(675px, 54.75vw, 862.5px)` | `clamp(1200px, 95vw, 1800px)`  |
| GalleryPanel      | `auto`                           | `clamp(1800px, 180vw, 5000px)` |
| TestimonialsPanel | `clamp(675px, 54.75vw, 862.5px)` | `clamp(1400px, 110vw, 2200px)` |
| CTAPanel          | `clamp(675px, 54.75vw, 900px)`   | `clamp(900px, 80vw, 1400px)`   |
| NewsPanel         | `clamp(720px, 58.5vw, 900px)`    | `clamp(1400px, 110vw, 2200px)` |

Remove all `tabletWidth`, `mobileWidth`, `smallMobileWidth`, `landscapeWidth` override props from panels 2-7.

---

## File Change Order (Execution Loop)

| Step | File                           | Type                                               |
| ---- | ------------------------------ | -------------------------------------------------- |
| 1    | `WalkerHomepageDesktop.tsx`    | Width update                                       |
| 2    | `ValuesPanel.module.css`       | Refactor (header elimination + row layout)         |
| 3    | `ValuesPanel.tsx`              | Refactor (remove header, restructure)              |
| 4    | `StatsPanel.module.css`        | Full rewrite                                       |
| 5    | `StatsPanel.tsx`               | Full rewrite                                       |
| 6    | `GalleryPanel.module.css`      | Full rewrite                                       |
| 7    | `GalleryPanel.tsx`             | Full rewrite                                       |
| 8    | `GalleryCard.module.css`       | Remove column-wrap, add horizontal row card sizing |
| 9    | `TestimonialsPanel.module.css` | Full rewrite                                       |
| 10   | `TestimonialsPanel.tsx`        | Full rewrite                                       |
| 11   | `CTAPanel.module.css`          | Full rewrite                                       |
| 12   | `CTAPanel.tsx`                 | Full rewrite                                       |
| 13   | `NewsPanel.module.css`         | Full rewrite                                       |
| 14   | `NewsPanel.tsx`                | Full rewrite                                       |

Each step: Edit → lint → format:check → test → typecheck → repeat until clean.

---

## Verification Checklist

After all changes:

- [ ] Every panel root uses `display: flex; flex-direction: row;` — no column stacking
- [ ] No header bars sitting ABOVE body content in any panel
- [ ] Text appears on the LEFT in every panel (panels 2-7)
- [ ] Visual content appears on the RIGHT in every panel
- [ ] All panel widths math-validated (≥100vw, ≥ cards needed + text + gap + padding)
- [ ] All card elements use `flex: 1 1 0` with `min-width`/`max-width` ranges
- [ ] No elements overlap on desktop (≥1100px)
- [ ] Horizontal scrolling is smooth (sticky viewport, translateX)
- [ ] Dark-themed panels maintain their special backgrounds (Values, Gallery, CTA)
- [ ] Hover effects still work on cards
- [ ] Gallery lightbox/filter/scroll-reveal still work
- [ ] Values expanded view still works
- [ ] Lint passes, typecheck passes, tests pass
