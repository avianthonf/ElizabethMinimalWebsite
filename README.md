# St. Elizabeth's High School Website

A modern, accessible website for St. Elizabeth's High School in Pomburpa, Goa — built with Next.js 16, React 19, TypeScript, and CSS Modules.

## Tech Stack

- **Framework**: Next.js 16 App Router (RSC)
- **Runtime**: React 19
- **Language**: TypeScript (strict)
- **Styling**: CSS Modules with 3-tier design token system
- **Animation**: CSS transitions + IntersectionObserver (no runtime animation lib)
- **Testing**: Vitest + Testing Library + Playwright
- **Email**: Resend (contact form)
- **Maps**: Leaflet + OpenStreetMap (no API key)
- **Search**: Pagefind (built at postbuild, no runtime index)

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Add your Resend API key (or leave blank to use mock email sender in dev)
# RESEND_API_KEY=re_xxxxxxxx

# Start development server
npm run dev
```

### Available Scripts

| Script                  | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `npm run dev`           | Start development server                         |
| `npm run build`         | Production build (runs pagefind postbuild)       |
| `npm run start`         | Start production server                          |
| `npm run test`          | Run unit tests                                   |
| `npm run test:coverage` | Run tests with coverage                          |
| `npm run typecheck`     | TypeScript type checking                         |
| `npm run lint`          | ESLint                                           |
| `npm run format`        | Prettier format                                  |
| `npm run format:check`  | Check formatting                                 |
| `npm run analyze`       | Bundle analysis                                  |

### One-off scripts

| Script                              | Description                                                     |
| ----------------------------------- | --------------------------------------------------------------- |
| `node scripts/generate-assets.mjs`  | Regenerate `favicon.ico` and `og-default.jpg` from `logo.png`  |
| `node scripts/scale-ui.mjs`         | Codemod: globally scale spatial sizing in CSS modules           |
| `node scripts/floor-text.mjs`       | Codemod: enforce a minimum font-size floor                      |
| `node scripts/create-pdfs.mjs`      | Render every page to PDF (desktop + mobile) for printing        |

## Architecture

### Design Token System

Three-tier CSS custom properties:

1. **Primitives** (`--p-*`): Raw design values (colors, spacing)
2. **Semantics** (`--s-*`): Theme-aware aliases (never use primitives directly)
3. **Component** (`--c-*`): Scoped overrides in component CSS modules

### Component Hierarchy

```
src/components/
├── primitives/    # Tier 1 — Badge, Button, Heading, Icon, Text, ScrollReveal, …
├── ui/            # Tier 2 — Carousel, Lightbox, Map, NumberTicker, …
├── content/       # Tier 3 — Card, Gallery, ImageCard, TestimonialCard, …
├── home/          # Homepage section components (16 sections)
├── navigation/    # Tier 4 — Header, Footer, MenuOverlay, Breadcrumb
├── templates/     # Tier 5 — ContentPage
└── layout/        # PageShell, Section
```

### IA (6 top-level sections, 33 routes)

```
/                      Homepage
/about                 (7 subpages)  history, mission, manager-message, achievements, alumni, staff, motto
/academics             (7 subpages)  curriculum, teaching-methods, library, computer-lab, science-lab, resource-room, …
/admissions            (3 subpages)  why, infrastructure, apply
/beyond-academics      (5 subpages)  clubs, sports, student-council, cultural, tours
/news                  (4 subpages)  latest, newsletter, photo-gallery, video-gallery
/contact               (4 subpages)  info, location-map, office-hours
```

### Homepage

Vertical scroll, 14 sections + AnnouncementBar. All sections are server components; only the interactive ones (HeroCarousel, AchievementsSection, MapEmbed) are client. `ScrollReveal` wraps each section in a CSS-driven `IntersectionObserver` animation that respects `prefers-reduced-motion`.

## Accessibility

Target: **WCAG 2.2 AA**

- Skip link on every page
- Keyboard navigation throughout
- Screen reader support (`aria-live`, `aria-label`, `aria-current`)
- `prefers-reduced-motion` respected globally
- Focus management in modals and lightbox
- Automated accessibility testing with axe-core

## Deployment

Optimized for Vercel:

```bash
npm run build
```

`postbuild` runs Pagefind to generate a static search index into `public/pagefind/` (gitignored).

### Environment Variables

| Variable         | Required | Description                                                    |
| ---------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY` | No*      | Resend API key for contact form emails                         |
| `CONTACT_EMAIL`  | No       | Email to receive inquiries (default: info@stelizabeths.edu.in) |

*Without `RESEND_API_KEY`, the contact form logs to the server console instead of sending email.

## License

MIT — see [LICENSE](LICENSE)
