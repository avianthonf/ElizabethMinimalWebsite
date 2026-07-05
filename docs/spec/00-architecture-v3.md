# St. Elizabeth's High School — Architecture v3.0

## Complete Design Specification & Implementation Plan

---

## 1. Architecture Philosophy

**Why not full Feature-Sliced Design (FSD):** FSD was designed for applications with complex business logic, state management, API integration, and multiple team boundaries. St. Elizabeth's is a **purely static content site** — zero state, zero APIs, zero authenticated routes. Applying full FSD (entities/features/widgets/pages layers) introduces ceremonial complexity without benefit. The codecentric AG analysis confirms: "for a website without more complex business logic, the granularity of FSD may be overdimensioned."

**What we use instead: Domain-Colocated Static Architecture.** We adopt FSD's _principles_ (unidirectional dependencies, public API barrels, colocation, thin routes, server-first) without its ceremony.

---

## 2. Directory Structure

```
app/                              # Routes ONLY — no business logic
├── layout.tsx                    # Providers only (no page chrome)
├── page.tsx                      # "/" → <HomePage />
├── (home)/
│   └── layout.tsx                # AnnouncementBar + Header + SkipLink + <main> + Footer
├── (site)/
│   ├── layout.tsx                # Header + SkipLink + <main> + Footer
│   ├── error.tsx
│   ├── loading.tsx
│   ├── about/...
│   ├── academics/...
│   ├── admissions/...
│   ├── beyond-academics/...
│   ├── contact/...
│   ├── news/...
├── error.tsx
├── not-found.tsx
├── robots.ts
├── sitemap.ts
└── globals.css

src/
├── pages/                        # Thin page composition
│   ├── home/                     # Homepage assembler
│   ├── about/                    # Section landing pages
│   ├── academics/
│   ├── admissions/
│   ├── beyond-academics/
│   ├── contact/
│   ├── news/
│   └── generic/                  # ContentPage universal template
│
├── domains/                      # Content data + domain-specific UI cards
│   ├── about/                    # about.data.ts, achievements.data.ts, etc.
│   ├── academics/
│   ├── admissions/
│   ├── beyond-academics/
│   ├── contact/
│   ├── news/
│   ├── nav/                      # navigation.data.ts
│   ├── media/                    # images.data.ts
│   └── homepage/                 # homepage.data.ts, sections.data.ts, events.data.ts
│
├── widgets/                      # Composite reusable blocks
│   ├── header/
│   ├── footer/
│   ├── breadcrumb/
│   ├── announcement-bar/
│   └── hero-carousel/
│
├── features/                     # Interactive client-only features
│   ├── search/                   # Pagefind search overlay
│   ├── menu/                     # Full-screen nav overlay + provider
│   ├── contact-form/
│   ├── gallery/
│   └── map/
│
└── shared/                       # Framework-agnostic primitives
    ├── ui/                       # Design system (Button, Card, Hero, etc.)
    ├── lib/                      # brand, safe-html, safe-json, page-utils, structured-data, cn, email
    ├── hooks/                    # useFocusTrap, useScrollLock
    └── types/                    # Cross-cutting TypeScript types
```

---

## 3. Dependency Rules

```
app/        → pages/        (routes import page components)
pages/      → domains/ + widgets/ + features/ + shared/
widgets/    → domains/ + features/ + shared/
features/   → domains/ + shared/
domains/    → shared/
shared/     → NOTHING from the project
```

**Hard rules:**

- `shared/` imports nothing from any other layer
- No layer imports from a layer above it
- Every directory exports through `index.ts` (public API)
- No deep imports across domain boundaries

---

## 4. Route Architecture

**Key change: Route-group layouts.**

Root layout renders **only providers** (AxeProvider, SmoothScrollProvider, MenuProvider, Suspense wrappers, MenuOverlay, Analytics). Zero page chrome.

`(home)/layout.tsx` renders: AnnouncementBar + Header + SkipLink + `<main>` + Footer. This eliminates the duplicate shell in `HomePage.tsx`.

`(site)/layout.tsx` renders: Header + SkipLink + `<main>` + Footer. This eliminates `PageShell.tsx` entirely — inner pages no longer manually wrap with PageShell.

**Before → After:**

- `HomePage.tsx`: ~175 lines → ~100 lines (removes Header, Footer, AnnouncementBar, SkipLink, `<main>` wrapper)
- `PageShell.tsx`: 45 lines → **DELETED** (absorbed by site layout)
- Every inner page: `PageShell` import removed. Pages use ContentPage or custom page components directly.
- SkipLink: Two identical instances → one per layout (still duplicated but at layout level, not component level)

---

## 5. ContentPage v3.0 — The Universal Template

Enhancements over current ContentPage:

- **Default card renderer**: Auto-detects `{ title, description }` shape. 88% of pages no longer need a `renderItem` prop.
- **`children` and `childrenAfter` props**: Custom content before/after the items grid. Handles pages like `manager-message` (prose before grid) and `alumni` (two grids with separate headings).
- **`sectionBackground` prop**: Control background color.
- **Breadcrumb auto-render**: When `breadcrumb` prop provided, auto-renders both visual Breadcrumb + JSON-LD.
- **Structured data auto-injection**: Uses `createBreadcrumbSchema` + `createWebPageSchema` from `shared/lib/structured-data.ts`.

---

## 6. Data Architecture

**From: 24 flat files in `src/data/`**
**To: 24 files in `src/domains/*/` — colocated by business domain**

| Old                                 | New                                           |
| ----------------------------------- | --------------------------------------------- |
| `data/about.ts`                     | `domains/about/about.data.ts`                 |
| `data/about-achievements.ts`        | `domains/about/achievements.data.ts`          |
| `data/about-manager.ts`             | `domains/about/manager.data.ts`               |
| `data/about-motto.ts`               | `domains/about/motto.data.ts`                 |
| `data/academics.ts`                 | `domains/academics/academics.data.ts`         |
| `data/academics-computer.ts`        | `domains/academics/computer.data.ts`          |
| `data/academics-resource.ts`        | `domains/academics/resource.data.ts`          |
| `data/academics-science.ts`         | `domains/academics/science.data.ts`           |
| `data/academics-teaching.ts`        | `domains/academics/teaching.data.ts`          |
| `data/admissions.ts`                | `domains/admissions/admissions.data.ts`       |
| `data/admissions-infrastructure.ts` | `domains/admissions/infrastructure.data.ts`   |
| `data/beyond-academics.ts`          | `domains/beyond-academics/beyond.data.ts`     |
| `data/alumni.ts`                    | `domains/about/alumni.data.ts`                |
| `data/visits.ts`                    | `domains/contact/contact.data.ts`             |
| `data/contact-hours.ts`             | `domains/contact/hours.data.ts`               |
| `data/news.ts`                      | `domains/news/news.data.ts`                   |
| `data/news-newsletter.ts`           | `domains/news/newsletter.data.ts`             |
| `data/news-video.ts`                | `domains/news/video.data.ts`                  |
| `data/navigation.ts`                | `domains/nav/navigation.data.ts`              |
| `data/images.ts`                    | `domains/media/images.data.ts`                |
| `data/homepage.ts`                  | `domains/homepage/homepage.data.ts`           |
| `data/homepage-sections.ts`         | `domains/homepage/sections.data.ts`           |
| `data/homepage-events.ts`           | `domains/homepage/events.data.ts`             |
| `data/index.ts`                     | **DELETED** (already deprecated, 0 consumers) |

---

## 7. Component Migration Map

Every component gets categorized into one of four layers:

### → `shared/ui/` (design system primitives — no domain knowledge)

Button, Card, Container, ConditionalLink, Grid, Heading, Icon, IconCard, ImageCard, Link, MediaBlock, Section, SplitLayout, Stack, Text, VisuallyHidden, ScrollReveal, CTASection, Hero, AspectRatio, ProximityTiltWrapper

### → `widgets/` (composite blocks)

Header, Footer, Breadcrumb, BreadcrumbJsonLd, AnnouncementBar, HeroCarousel

### → `features/` (interactive client boundaries)

SearchOverlay + GlobalSearchOverlay + useSearchOverlay, MenuOverlay + MenuProvider + useMenu, ContactForm, Gallery, MapEmbed + MapEmbedLazy

### → `pages/` (page composition)

HomePage + all 14 homepage section components, about page components, academics page components, admissions page components, beyond-academics page components, contact page components, news page components, ContentPage

---

## 8. Homepage Section Components

Stay in `pages/home/` (they're page-specific composition, not reusable widgets):

```
pages/home/
├── home-page.tsx
├── hero-carousel.tsx      (→ moved from widgets/ — actually stays as page-specific)
├── counter-bar.tsx
├── welcome-section.tsx
├── why-section.tsx
├── programs-grid.tsx
├── holistic-section.tsx
├── gallery-section.tsx
├── campus-then-now.tsx
├── achievements-section.tsx
├── student-life-section.tsx
├── testimonials-section.tsx
├── admissions-cta.tsx
├── events-preview.tsx
├── news-section.tsx
├── locate-section.tsx
└── index.ts
```

---

## 9. "use client" Optimization

| Component           | Current | After       | How                                                                 |
| ------------------- | ------- | ----------- | ------------------------------------------------------------------- |
| CounterBar          | client  | **server**  | Use CSS scroll-driven animations instead of IntersectionObserver    |
| CampusThenNow       | client  | **server**  | Replace GSAP ScrollTrigger → CSS animations                         |
| AchievementsSection | client  | **server**  | Replace GSAP → CSS animations                                       |
| CommandPalette      | client  | **DELETED** | Remove entirely (cmdk dependency dropped)                           |
| HomePage            | client  | **server**  | No longer renders Header/Footer/AnnouncementBar (layout handles it) |

**Before: 28 client components → After: 24**

---

## 10. Dead Code Removal

| Item                                                       | Reason                                 |
| ---------------------------------------------------------- | -------------------------------------- |
| `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | 0 imports                              |
| `zustand`                                                  | No stores exist                        |
| `cmdk`                                                     | CommandPalette removed                 |
| `src/stores/`                                              | Empty directory                        |
| `src/components/features/`                                 | Empty directory                        |
| `src/types/`                                               | Empty (repopulated at `shared/types/`) |
| `src/hooks/useReducedMotion.ts`                            | 0 imports in entire codebase           |
| `src/components/shared/constants.ts`                       | 0 imports                              |
| `src/data/index.ts`                                        | Already deprecated                     |
| `HEADER_CTA_LINKS` from navigation.ts                      | 0 usages                               |

---

## 11. Implementation Plan — 14 Phases

| Phase                             | Scope                                                    | Files              |
| --------------------------------- | -------------------------------------------------------- | ------------------ |
| **1. Dead Code Removal**          | Delete dead packages, files, exports                     | ~20 files          |
| **2. Create Directory Structure** | mkdir the new tree                                       | Directory ops only |
| **3. Move shared/ layer**         | UI primitives, lib, hooks, types → `src/shared/`         | ~35 files          |
| **4. Move domains/ layer**        | Data files → `src/domains/`                              | ~24 files          |
| **5. Move widgets/ layer**        | Header, Footer, Breadcrumb, etc. → `src/widgets/`        | ~15 files          |
| **6. Move features/ layer**       | Search, Menu, ContactForm, etc. → `src/features/`        | ~12 files          |
| **7. Move pages/ layer**          | HomePage, section components, ContentPage → `src/pages/` | ~30 files          |
| **8. Route group layouts**        | Create `(home)/layout.tsx`, `(site)/layout.tsx`          | 2 new files        |
| **9. Thin route files**           | Refactor all 36 page.tsx to 5—15 lines                   | ~36 files          |
| **10. Wire structured data**      | Use factories in layout, ContentPage, news/[slug]        | ~4 files           |
| **11. "use client" audit**        | Convert CounterBar, CampusThenNow, AchievementsSection   | ~3 files           |
| **12. Update tests**              | Fix import paths, move tests with source                 | ~58 test files     |
| **13. Update config**             | tsconfig, vitest, eslint, CI, package.json               | ~6 files           |
| **14. Final gate**                | lint + typecheck + test + build                          | All                |

---

## 12. Risk Mitigation

| Risk                                                        | Mitigation                                                                                     |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| ~170 import paths break                                     | Automated find-and-replace per phase. Test after each phase.                                   |
| `MapEmbedLazy` dynamic import `import("./MapEmbed")` breaks | Move MapEmbed + MapEmbedLazy together in same feature directory                                |
| Test mocks reference old paths                              | Update `vi.mock("@/components/...")` → `vi.mock("@/shared/...")` or `vi.mock("@/widgets/...")` |
| `globals.css` `@import "../shims/"` breaks if moved         | globals.css stays at `app/globals.css` — never moves                                           |
| Pagefind index unaffected                                   | Pagefind indexes `.next/` output, not source                                                   |
| CSS Modules lose co-location                                | Every `.module.css` moves WITH its `.tsx`                                                      |
| `(home)/layout.tsx` conflicts with `page.tsx`               | Next.js convention: route group layout wraps `page.tsx` inside the group                       |

---

## 13. What Stays Identical

- Every piece of text content — zero content changes
- Every CSS class, every design token, every animation
- Every visual — pixel-identical output
- Every URL — no route changes
- Every test assertion — tests move, logic unchanged
- Email sending, CSP headers, Pagefind, JSON-LD, SEO metadata
- Dependency versions (except removed packages)
