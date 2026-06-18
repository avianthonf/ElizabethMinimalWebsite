# St. Elizabeth's High School Website

A modern, accessible website for St. Elizabeth's High School in Pomburpa, Goa — built with Next.js 16, React 19, TypeScript, and CSS Modules.

## Tech Stack

- **Framework**: Next.js 16 App Router
- **Runtime**: React 19
- **Language**: TypeScript (strict)
- **Styling**: CSS Modules with 3-tier design token system
- **Animation**: Framer Motion + CSS transitions
- **Testing**: Vitest + Testing Library + Playwright
- **Email**: Resend (contact form)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Resend API key to .env
# RESEND_API_KEY=re_xxxxxxxx

# Start development server
npm run dev
```

### Available Scripts

| Script                  | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Production build         |
| `npm run start`         | Start production server  |
| `npm run test`          | Run unit tests           |
| `npm run test:coverage` | Run tests with coverage  |
| `npm run typecheck`     | TypeScript type checking |
| `npm run lint`          | ESLint                   |
| `npm run format`        | Prettier format          |
| `npm run format:check`  | Check formatting         |
| `npm run analyze`       | Bundle analysis          |

## Architecture

### Design Token System

Three-tier CSS custom properties:

1. **Primitives** (`--p-*`): Raw design values (colors, spacing)
2. **Semantics** (`--s-*`): Theme-aware aliases (never use primitives directly)
3. **Component** (`--c-*`): Scoped overrides in component CSS modules

### Component Hierarchy

```
Tier 1 — Primitives    Badge, Button, ConditionalLink, Heading, Icon, Link, Text, Box, VisuallyHidden
Tier 2 — Layout        Cluster, Container, Grid, PageShell, Section, SplitLayout, Stack, AspectRatio
Tier 3 — Content       Card, CTASection, GalleryCard, GalleryFilter, GalleryLightbox, Hero,
                       IconCard, ImageCard, MediaBlock, TestimonialCard, ValueCard
Tier 4 — Navigation    Footer, Header, MenuOverlay, Breadcrumb
Tier 5 — Templates     ContentPage, VisitPage
```

### Homepage

The homepage uses a split-component architecture:

- **Desktop** (≥1100px): Horizontal scroll with 8 panels
- **Mobile** (<1100px): Vertical scroll with entrance animations

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (site)/             # Inner pages (About, Admissions, etc.)
│   ├── layout.tsx          # Root layout with JSON-LD
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # SEO: robots.txt
│   └── sitemap.ts          # SEO: sitemap.xml
├── components/             # React components (5-tier architecture)
├── data/                   # Static data + CMS-ready getters
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities and Zod schemas
```

## Accessibility

Target: **WCAG 2.2 AA**

- Skip link on every page
- Keyboard navigation throughout
- Screen reader support (aria-live, aria-label, aria-current)
- `prefers-reduced-motion` respected globally
- Touch support for horizontal scroll
- Focus management in modals and lightbox
- Automated accessibility testing with axe-core

## Deployment

This site is optimized for deployment on Vercel:

```bash
npm run build
```

### Environment Variables

| Variable         | Required | Description                                                    |
| ---------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY` | Yes      | Resend API key for contact form emails                         |
| `CONTACT_EMAIL`  | No       | Email to receive inquiries (default: info@stelizabeths.edu.in) |

## License

MIT — see [LICENSE](LICENSE)
