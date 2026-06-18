# Overview & Design System

## Project Info

| Property  | Value                                        |
| --------- | -------------------------------------------- |
| Framework | Next.js 16 App Router                        |
| Runtime   | React 19 (RC)                                |
| Language  | TypeScript (strict)                          |
| Styling   | CSS Modules                                  |
| Animation | Framer Motion + CSS transitions              |
| Icons     | Custom SVG (SchoolIcon)                      |
| Fonts     | System (Arial → sans-serif, Georgia → serif) |

## File Conventions

- **Components**: PascalCase directories with `index.ts` barrel exports
- **Pages**: `page.tsx` per route; `layout.tsx` for route groups
- **Styles**: Co-located `[Name].module.css` alongside each component
- **Tests**: Co-located `[Name].test.tsx` or `[Name].test.ts`
- **Data**: Typed static data files in `src/data/` with async getter functions (CMS-ready)

## Three-Tier Design Token System

All design values flow through CSS custom properties on three tiers.

### Tier 1 — Primitives (`--p-*`)

Raw values. **Never used directly in component styles.** Defined in `globals.css`.

| Token                     | Value               | Description              |
| ------------------------- | ------------------- | ------------------------ |
| --p-color-royal-blue      | #0c217c             | Primary brand blue       |
| --p-color-royal-blue-dark | #060f45             | Dark variant             |
| --p-color-ink             | #171717             | Primary text             |
| --p-color-muted           | #5f5f5f             | Muted text               |
| --p-color-paper           | #ffffff             | Background surface       |
| --p-color-soft            | #f4f1ed             | Alt surface (warm grey)  |
| --p-color-line            | rgba(23,23,23,0.14) | Borders                  |
| --p-color-deep-blue       | #0c4a6e             | CTA background           |
| --p-color-deep-blue-light | #e0f2fe             | CTA light accent         |
| --p-color-gold            | #c9a84c             | Accent/gold              |
| --p-color-gallery-bg      | #faf9f7             | Gallery panel background |

### Tier 2 — Semantics (`--s-*`)

Theme-aware aliases referencing primitives. **Consumed by all components.**

| Token                  | Resolution                  |
| ---------------------- | --------------------------- |
| --s-color-primary      | → --p-color-royal-blue      |
| --s-color-primary-dark | → --p-color-royal-blue-dark |
| --s-color-text         | → --p-color-ink             |
| --s-color-text-muted   | → --p-color-muted           |
| --s-color-surface      | → --p-color-paper           |
| --s-color-surface-alt  | → --p-color-soft            |
| --s-color-accent       | → --p-color-gold            |
| --s-color-cta-bg       | → --p-color-deep-blue       |
| --s-color-cta-bg-light | → --p-color-deep-blue-light |
| --s-color-border       | → --p-color-line            |
| --s-color-gallery-bg   | → --p-color-gallery-bg      |

### Tier 3 — Component (`--c-*`)

Scoped overrides defined within a component's own `.module.css` file:

```css
/* Example: Button overrides */
.button {
  --c-btn-bg: var(--s-color-primary);
  --c-btn-text: var(--s-color-surface);
}
```

### Layout Tokens

| Token           | Value                  |
| --------------- | ---------------------- |
| --header-height | clamp(52px, 6vw, 78px) |

### Spacing Tokens

| Token        | Desktop                | Mobile (<760px) |
| ------------ | ---------------------- | --------------- |
| --spacing-sm | clamp(0.5rem,2vw,1rem) | 8px (fixed)     |
| --spacing-md | clamp(1rem,3vw,2rem)   | 16px (fixed)    |
| --spacing-lg | clamp(2rem,5vw,4rem)   | 24px (fixed)    |
| --spacing-xl | clamp(3rem,7vw,6rem)   | 32px (fixed)    |

### Typography Scale

All via `clamp()` with `--text-scale` multiplier (0.85 desktop, 1.0 mobile).

| Role         | Formula                     | Range (desktop) |
| ------------ | --------------------------- | --------------- |
| h1 (hero)    | --text-scale × 3.92–9.8rem  | 62.72–156.8px   |
| h2 (section) | --text-scale × 2.15–7.5rem  | 34.4–120px      |
| h3 (card)    | --text-scale × 1–1.35rem    | 16–21.6px       |
| body         | --text-scale × 0.94–1.35rem | 15.04–21.6px    |
| eyebrow      | --text-scale × 0.78rem      | ~12.48px        |
| caption      | --text-scale × 0.7–1.015rem | 11.2–16.24px    |

Font families: `--font-sans` (Arial, Helvetica, sans-serif), `--font-serif` (Georgia, Times New Roman, serif).

## Breakpoints

| Name         | Query                    | Purpose                                |
| ------------ | ------------------------ | -------------------------------------- |
| desktop      | ≥1100px                  | Full horizontal-scroll homepage        |
| tablet       | 760–1099px               | Vertical homepage, reduced spacing     |
| mobile       | ≤760px                   | Vertical homepage, mobile tokens       |
| small-mobile | ≤420px                   | Further typography reduction           |
| landscape    | height≤520px + landscape | Reduced horizontal scroll panel widths |

## Motion & Animation

| Token               | Value                                   |
| ------------------- | --------------------------------------- |
| --ease-standard     | cubic-bezier(0.25, 1, Cocooning 0.5, 1) |
| --transition-fast   | 150ms var(--ease-standard)              |
| --transition-normal | 250ms var(--ease-standard)              |
| --animation-stagger | 50ms                                    |

**Reduced motion**: `prefers-reduced-motion: reduce` globally enforced via CSS (no JS detection needed). All scroll-triggered viewport animations use `once: true`.

### Animation Timings

- **Intro overlay** (desktop): 4.5s total (heritage → "WE BELIEVE" SVG dolly zoom → panel reveal)
- **Intro overlay** (mobile): 2.8s total
- **Card entrances**: fade-up, 0.5s, staggered 50–150ms
- **Stats counter**: animate-on-scroll, count-up 2s
- **Header transition**: 250ms color/background morph

## Accessibility Standard

Target: **WCAG 2.2 AA**

- Skip link on every page (`#main-content` target)
- Touch targets ≥44px on mobile
- `prefers-reduced-motion: reduce` fully respected
- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<article>`)
- ARIA labels on all interactive elements and scroll regions
- Focus trap in menu overlay
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs
- Print stylesheets included
