# Homepage Specification

The homepage is the most bespoke page in the entire site. It uses a split-component architecture that serves a horizontal-scroll experience on desktop (≥1100px) and a vertical scroll on mobile/tablet (<1100px).

## Responsive Routing

```
WalkerHomepage (orchestrator)
├── WalkerHomepageDesktop  (horizontal scroll, ≥1100px)
└── WalkerHomepageVertical  (vertical scroll, <1100px)
```

The `useIsDesktop(1100)` hook defaults to `true` for SSR, corrected by `useLayoutEffect` before paint. `suppressHydrationWarning` prevents hydration mismatches.

---

## Panel Architecture — 8 Panels

Both desktop and vertical share the same **8-panel content model**. Each panel is a self-contained component. The orchestrator owns all layout wrapping (padding, width, scroll behavior). Panels are "content-only" — no layout awareness.

### Panel 1: Hero

- **Desktop width**: 100vw
- **Theme**: Light (header transparent)
- **Content**: Full-viewport video/image background with overlay text
- **Components**: `HeroPanel`
- **Data**: `HERO_CONTENT` from `src/data/homepage.ts`
  - `statement`: intro paragraph
  - `heading`: "Nurturing Hearts"
  - `loadOverlayText`: "WE BELIEVE" (used in intro animation)

### Panel 2: Values

- **Desktop width**: `clamp(960px, 85vw, 1400px)`
- **Theme**: Dark (header switches to dark when scrolling into view)
- **Content**: Three value cards (Faith, Excellence, Community)
- **Components**: `ValuesPanel`
- **Data**: `VALUES` from `src/data/homepage.ts`

### Panel 3: Statistics

- **Desktop width**: `clamp(960px, 85vw, 1400px)`
- **Theme**: Dark
- **Content**: Stat counters (Founded: 1949, Students: 1200+, Affiliated: CBSE)
- **Components**: `StatsPanel`, `StatValue`
- **Data**: `STATS` from `src/data/homepage.ts`
- **Animation**: Count-up on scroll-into-view (desktop), with stagger

### Panel 4: Gallery (Masonry Mosaic)

- **Desktop width**: `auto` (content-driven)
- **Theme**: Dark
- **Content**: Filterable photo grid with lightbox
- **Components**: `GalleryPanel`, `GalleryFilter`, `GalleryLightbox`
- **Behavior**: Filter by category, zoom into lightbox on click
- **Responsive**: Single column on small screens

### Panel 5: Testimonials

- **Desktop width**: `clamp(960px, 80vw, 1400px)`
- **Theme**: Dark
- **Content**: Quote blocks, auto-rotating or click-to-navigate
- **Components**: `TestimonialsPanel`
- **Data**: `TESTIMONIALS` from `src/data/homepage.ts`
- **Animation**: Fade-in on scroll

### Panel 6: CTA Banner

- **Desktop width**: 100vw
- **Theme**: Light (cta background)
- **Content**: Call-to-action block with primary + secondary buttons
- **Components**: `CTAPanel`
- **Data**: `CTA_CONTENT` from `src/data/homepage.ts`
  - eyebrow, heading, description, primaryCTA, secondaryCTA

### Panel 7: Latest News

- **Desktop width**: 100vw
- **Theme**: Dark
- **Content**: 3-card news preview grid
- **Components**: `NewsPanel`
- **Data**: `LATEST_NEWS` from `src/data/homepage.ts`
- **Links**: Each card links to `/news/<slug>` (GAPS: no dynamic route exists yet)

### Panel 8: Footer

- **Desktop width**: 100vw
- **Theme**: Light
- **Content**: Full site footer with nav links, contact, social, copyright
- **Components**: `Footer`
- **Background**: primary (royal blue)

---

## Intro Animation (LoadOverlay)

### Desktop (≥1100px)

Total duration: **4.5 seconds**

1. **Phase 1** (0–1.5s): Heritage text ("St. Elizabeth's...") fades in, background dark
2. **Phase 2** (1.5–3.0s): "WE BELIEVE" SVG mask dolly-zoom effect
3. **Phase 3** (3.0–4.5s): Overlay slides away, revealing first panel
4. After: Horizontal scroll is enabled, locked-scroll mechanism activates

### Mobile (<1100px)

Total duration: **2.8 seconds**

1. **Phase 1** (0–0.8s): Heritage text
2. **Phase 2** (0.8–1.8s): "WE BELIEVE"
3. **Phase 3** (1.8–2.8s): Overlay slides away, revealing stacked vertical layout

### Components

- `LoadOverlay` (desktop): Full-screen animated overlay with SVG dolly zoom
- `LoadOverlayMobile` (mobile): Simplified version with reduced animation

---

## Header Behavior

- **Transparent on Hero**: Header sits on top of hero video, text in white/photography-safe colors
- **Theme switching**: Header listens to `data-header-theme` attribute on the current visible panel. As user scrolls between panels, the header's color scheme (light/dark) transitions smoothly.
- **Fixed position**: Header is `position: fixed` at all times
- **Menu**: Hamburger on mobile (<1100px), desktop links on wide screens

## Horizontal Scroll Mechanics (Desktop)

- Driven by `HorizontalScroll` and `HorizontalPage` components
- `height: 100vh` container, smooth horizontal scroll via mouse wheel / trackpad translation
- Each `HorizontalPage` defines its own width (`100vw` for full-screens, `clamp()` for content panels)
- Scroll momentum and snapping via Framer Motion `useScroll` + `useTransform`
- Landscape fallback: panel widths reduce to `max(960px, 125vw)` etc.

## Entrance Animations (Vertical View)

On mobile, each panel fades in + slides up (`y: 30 → 0`, `opacity: 0 → 1`) when it enters the viewport. Uses Framer Motion `whileInView` with `viewport={{ once: true, margin: "-50px" }}`.

Variants:

```
sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
}
```

## Panel Shared Styles

Each panel imports a shared `panels/shared.module.css` for common padding, full-height, and desktop/mobile consistent widths. Panel-specific widths are passed via props to `HorizontalPage` (desktop) or as CSS classes (vertical).
