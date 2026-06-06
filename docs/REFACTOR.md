# Refactoring Summary — St. Elizabeth School Website

This document captures the architectural improvements made during the refactoring effort.
It serves as both a changelog and a usage guide for developers working on the codebase.

---

## 1. Three-Tier CSS Token System

The CSS custom property system uses a strict three-tier hierarchy defined in `src/app/globals.css`:

| Tier | Prefix | Location | Usage |
|---|---|---|---|
| **1. Primitives** | `--p-color-*` | `:root` in `globals.css` | Raw design values. Never referenced directly by components. |
| **2. Semantics** | `--s-color-*` | `:root` in `globals.css` | Theme-aware aliases referencing primitives. Components consume these. |
| **3. Component** | `--c-<component>-*` | Individual `.module.css` files | Scoped overrides for specific components. |

**Example chain:**
```
--p-color-royal-blue: #0c217c           (Primitive — defined once)
--s-color-primary: var(--p-color-royal-blue)   (Semantics — references primitive)
--c-btn-bg: var(--s-color-primary)             (Component — references semantic)
```

**Conventions:**
- Primitives (`--p-*`) are **never** referenced outside `globals.css`.
- Components use `--s-color-*` variables (or `--c-*` overrides) exclusively.
- Add new colours to the primitives tier first, then wire through semantics.

**Additional semantic tokens:**
- `--s-color-text`, `--s-color-text-muted` — text colours
- `--s-color-surface`, `--s-color-surface-alt` — backgrounds
- `--s-color-accent` — gold accent
- `--s-color-cta-bg`, `--s-color-cta-bg-light` — CTA colours
- `--s-color-border` — borders and lines

### Cascade Layers

CSS is organized into two cascade layers defined in `globals.css`:

| Layer | Purpose |
|---|---|
| `reset` | Element defaults via zero-specificity `:where()` selectors |
| `utilities` | Skip links, layout helpers, a11y overrides |

Design tokens on `:root` are **unlayered**, making them globally available regardless of layer ordering.

---

## 2. Hook Extraction Inventory

Hooks were extracted from inline logic into reusable modules:

| Hook | Location | Purpose | Consumers |
|---|---|---|---|
| `useFocusTrap` | `src/hooks/useFocusTrap.ts` | Traps Tab/Shift+Tab cycling within a container, Escape to dismiss, focus restoration on close | `MenuOverlay` |
| `useBodyScrollLock` | `src/hooks/useBodyScrollLock.ts` | Locks document body scroll with scrollbar-width compensation | `MenuOverlay` |
| `useMenuState` | `src/components/WalkerHomepage/hooks/useMenuState.ts` | Menu open/close/toggle state with trigger-ref focus restoration | `WalkerHomepage` |
| `useGalleryState` | `src/components/WalkerHomepage/hooks/useGalleryState.ts` | Gallery filter state, filtered image list derivation, lightbox open/close/next/prev with circular navigation | `GalleryPanel` |
| `useScrollReveal` | `src/components/WalkerHomepage/hooks/useScrollReveal.ts` | Per-element one-shot IntersectionObserver scroll reveal with fallback | `GalleryPanel` (via `GalleryCardWithReveal`) |

### Shareable hooks (`src/hooks/`)
These are general-purpose and can be reused across the entire app:
- `useFocusTrap(options)` → returns a ref to attach to the trap container
- `useBodyScrollLock(isLocked: boolean)` → side-effects only, no return

### Page-specific hooks (`src/components/WalkerHomepage/hooks/`)
These are scoped to the WalkerHomepage feature:
- `useMenuState()` → `{ isOpen, open, close, toggle, triggerRef }`
- `useGalleryState()` → `{ activeFilter, lightboxIndex, filteredImages, lightboxImages, setFilter, openLightbox, closeLightbox, nextImage, prevImage }`
- `useScrollReveal(threshold?)` → `{ ref, isVisible }`

---

## 3. Panel Decomposition

The WalkerHomepage was decomposed into a scroll orchestrator (`WalkerHomepage.tsx`) and 7 independent panels under `src/components/WalkerHomepage/panels/`:

| Panel | File | Wrapper | Description |
|---|---|---|---|
| **HeroPanel** | `panels/HeroPanel.tsx` | Wrapped by orchestrator with `HorizontalPage(width="100vw")` | Full-viewport hero with background image, statement, and heading |
| **ValuesPanel** | `panels/ValuesPanel.tsx` | Self-wraps in `HorizontalPage` with responsive widths | "We Believe" — three value cards (Faith, Excellence, Community) |
| **StatsPanel** | `panels/StatsPanel.tsx` | Self-wraps in `HorizontalPage` with responsive widths | "By the Numbers" — three icon cards (Founded, Students, Affiliated) |
| **GalleryPanel** | `panels/GalleryPanel.tsx` | Self-wraps in `HorizontalPage(width="auto")` | Masonry mosaic gallery with CategoryFilter, GalleryCards, and GalleryLightbox |
| **TestimonialsPanel** | `panels/TestimonialsPanel.tsx` | Self-wraps in `HorizontalPage` with responsive widths | "Voices of Our Community" — three testimonial cards in a responsive grid |
| **CTAPanel** | `panels/CTAPanel.tsx` | Wrapped by orchestrator with `HorizontalPage(width="100vw")` | CTA banner with primary and secondary buttons |
| **NewsPanel** | `panels/NewsPanel.tsx` | Wrapped by orchestrator with `HorizontalPage(width="100vw")` | "Latest News & Events" — three image cards in a grid with "View All News" link |

Each panel lives in its own directory:
```
panels/
├── HeroPanel.tsx          + HeroPanel.module.css
├── ValuesPanel.tsx        + ValuesPanel.module.css
├── StatsPanel.tsx         + StatsPanel.module.css
├── GalleryPanel.tsx       + GalleryPanel.module.css
├── TestimonialsPanel.tsx  + TestimonialsPanel.module.css
├── CTAPanel.tsx           + CTAPanel.module.css
├── NewsPanel.tsx          + NewsPanel.module.css
└── shared.module.css      (shared styles across all panels)
```

### Panel Exports

Some panels export a composed `className` string so the orchestrator can apply it to the wrapping `HorizontalPage`:
- `HeroPanel` → `heroPanelClass`
- `CTAPanel` → `ctaPanelClass`
- `NewsPanel` → `newsPanelClass`

Others wrap themselves in `HorizontalPage` directly and don't export a class.

---

## 4. Page Template Usage Guide

### Templates

| Template | File | Use Case |
|---|---|---|
| `CardGridPage<T>` | `src/components/templates/CardGridPage/CardGridPage.tsx` | Pages displaying a grid (or vertical stack) of cards behind a Hero banner |
| `ListPage` | `src/components/templates/ListPage/ListPage.tsx` | Pages with a hero and a simple list layout |
| `VisitPage` | `src/components/templates/VisitPage/VisitPage.tsx` | Visit/contact pages with a split layout |

### CardGridPage Props

```tsx
<CardGridPage
  heroHeading="Academics"                    // h1 text (required)
  heroEyebrow="Explore"                      // optional eyebrow above heading
  heroDescription="Learn about..."           // optional description
  heroBackgroundImage="/images/hero.jpg"     // optional background
  breadcrumb={{                              // optional breadcrumb
    href: "/about",
    label: "About",
    currentLabel: "Academics"
  }}
  sectionHeading="Our Departments"           // optional h2 below hero
  sectionDescription="Browse..."             // optional description
  items={departments}                        // your data array
  renderCard={(item, index) => (             // card render function
    <DepartmentCard key={item.slug} {...item} />
  )}
  columns={3}                                // Grid columns (2|3|4) or omit for vertical Stack
  containerWidth="narrow"                    // "narrow" | "default" | "wide"
  sectionAriaLabel="Academic departments"     // accessible label for <section>
/>
```

### PageShell

`PageShell` is the universal wrapper for all inner (non-homepage) pages:

```tsx
<PageShell
  hero={<Hero heading="About Us" />}   // optional hero/breadcrumb content
  skipLink={true}                       // renders skip-to-content link (default: true)
  headerTheme="light"                   // "light" = solid bg, "dark" = transparent (default: "light")
>
  <Section>
    <Container>
      {/* Page content */}
    </Container>
  </Section>
</PageShell>
```

PageShell automatically renders:
1. `<Header>` with nav links
2. Skip-to-content link (`<a class="skipLink" href="#main-content">`)
3. Optional hero content
4. `<main id="main-content" tabIndex={-1}>` wrapper
5. `<Footer>`

---

## 5. How to Add a New Page

### Using a Template (Recommended)

1. **Create a new route directory** under `src/app/(site)/`:
   ```
   src/app/(site)/my-section/
   ├── page.tsx
   └── my-section.module.css
   ```

2. **Write your page component** using a template:
   ```tsx
   // src/app/(site)/my-section/page.tsx
   import { CardGridPage } from "@/components/templates/CardGridPage";
   import { MY_ITEMS } from "@/data/my-section";  // your data source

   export default function MySectionPage() {
     return (
       <CardGridPage
         heroHeading="My Section"
         heroDescription="Welcome to my section."
         items={MY_ITEMS}
         renderCard={(item) => <MyCard key={item.id} {...item} />}
         columns={3}
         sectionAriaLabel="My section content"
       />
     );
   }
   ```

3. **Add navigation** in `src/data/navigation.ts`:
   - Add a link to `HEADER_NAV_LINKS`
   - Add a menu category to `MENU_CATEGORIES` if needed

4. **Add test** for the page:
   ```tsx
   // src/app/__tests__/pages.test.tsx (or co-located)
   ```

### Using PageShell Directly (For Custom Layouts)

```tsx
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function CustomPage() {
  return (
    <PageShell
      hero={<Hero heading="Custom Page" />}
      headerTheme="light"
    >
      <Section background="paper" padding="xlarge" ariaLabel="Custom content">
        <Container width="default">
          {/* Your custom layout here */}
        </Container>
      </Section>
    </PageShell>
  );
}
```

---

## 6. Testing Infrastructure

- **Unit/Component tests**: Vitest + @testing-library/react (413 tests, ~54 test files)
- **E2E**: Playwright + @axe-core/playwright (e2e/ directory, run via `npx playwright test`)
- **Type checking**: `npx tsc --noEmit`
- **Build**: `npm run build` (Next.js production build)

### Running tests
```bash
npm test              # Run all unit/component tests
npx playwright test   # Run e2e + a11y tests (requires next build first)
npm run typecheck     # Run TypeScript type checking
npm run build         # Production build
```
