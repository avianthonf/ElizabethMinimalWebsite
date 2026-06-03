# St. Elizabeth High School — Component System Handoff

## Architecture Overview

The component system follows a **three-tier hierarchy** where each tier composes from the one below. Dependencies flow in one direction — primitives know nothing about content, content composes from layout and primitives.

```
FOUNDATION (0 deps)          LAYOUT (0 deps)            CONTENT (1–3 deps)
primitive components           structural components       composite components
that can't be decomposed       that arrange children       that solve specific UI problems
further                        but have no content         and compose from lower tiers
```

The system is designed for **two runtime contexts**: horizontal-scroll pages (inside `HorizontalPage`) and traditional vertical-scroll pages. Components do not assume which context they are rendered in — they are context-agnostic.

---

## Design System Principles

### Colour System

| CSS Custom Property | Hex | Role |
|---|---|---|
| `--color-maroon` | `#6c1f35` | Primary accent — used sparingly for numbers, eyebrow labels, brand marks, primary buttons |
| `--color-maroon-dark` | `#41111f` | Darker maroon — hover states, gradient fallbacks |
| `--color-ink` | `#171717` | Primary text — slightly softer than pure black |
| `--color-muted` | `#5f5f5f` | Secondary text — body copy, captions, supporting content |
| `--color-paper` | `#ffffff` | White — card backgrounds, content panels |
| `--color-soft` | `#f4f1ed` | Warm beige — page backgrounds, icon circles |
| `--color-line` | `rgba(23,23,23,0.14)` | Subtle border — 1px card borders, dividers |
| `--color-blue` | `#0c4a6e` | Secondary accent — CTA section backgrounds (desaturated blue-gray to complement maroon) |
| `--color-blue-light` | `#e0f2fe` | Light blue — section backgrounds for icon card grids |

**Rules:**
- Maroon is the **only accent colour** on cards, badges, buttons, and text. Blue exists solely for full-width CTA section backgrounds.
- Dark backgrounds (maroon, ink, blue) invert text to white and use text-shadow for readability.
- No colour is ever used as a gradient on content — the only gradient in the system is the video hero fallback.

### Typography

| Token | Family | Size (fluid) | Weight | Spacing | Usage |
|---|---|---|---|---|---|
| H1 hero | `--font-serif` (Georgia) | `clamp(3.92rem, 11.9vw, 9.8rem)` | 900 | -0.07em | Full-screen hero headings (white, text-shadow) |
| H2 section | `--font-serif` (Georgia) | `clamp(2.15rem, 7vw, 7.5rem)` | 900 | -0.05em | Section titles, two-column intros |
| H3 card | `--font-serif` (Georgia) | `clamp(1rem, 1.4vw, 1.35rem)` | 700 | -0.03em | Card titles |
| Body | `--font-sans` (Arial) | `clamp(0.94rem, 1.6vw, 1.35rem)` | 400 | normal | Body paragraphs, descriptions |
| Eyebrow | `--font-sans` (Arial) | `0.78rem` (fixed) | 800 | 0.2em | Uppercase section labels in maroon |
| Caption | `--font-sans` (Arial) | `clamp(0.7rem, 1.015vw, 1.015rem)` | 400 | normal | Small print, footnotes |

**Rules:**
- The serif font is **only** for headings. Body text, buttons, badges, and UI elements always use sans-serif.
- Hero and section headings are uppercase by default (controlled via the `uppercase` prop, which defaults to `true` for those variants).
- Line heights are intentionally tight on headings (0.72–0.9) and relaxed on body (1.45–1.62).

### Spacing

All spacing is **fluid** — it grows with the viewport using `clamp()`:

| Token | Value | ~Equivalent |
|---|---|---|
| `--spacing-sm` | `clamp(0.5rem, 2vw, 1rem)` | 8–16px |
| `--spacing-md` | `clamp(1rem, 3vw, 2rem)` | 16–32px |
| `--spacing-lg` | `clamp(2rem, 5vw, 4rem)` | 32–64px |
| `--spacing-xl` | `clamp(3rem, 7vw, 6rem)` | 48–96px |

**Rules:**
- Sections breathe — never use zero padding unless explicitly needed for a video background.
- The site aesthetic is **generous, not cramped**. When in doubt, use the next size up.

### Elevation & Borders

- **No box-shadows** anywhere. Depth comes from border contrast and typographic hierarchy.
- **Text-shadows** are used **only** for readability on dark/media backgrounds. No text-shadow on light backgrounds.
- Cards have a **1px solid border** (`var(--color-line)`) and **no border-radius** (sharp corners).
- The sole exceptions to sharp corners are: the crest badge (2px/12px), search icon circle (50%), and icon card circles (50%).

### Responsive Breakpoints

| Name | Width | Behaviour |
|---|---|---|
| Tablet | ≤ 1100px | 4-col → 2-col grids, navigation links hidden |
| Mobile | ≤ 760px | 2-col → 1-col grids, split layouts stack, cards stack |
| Small mobile | ≤ 420px | Further reduced padding, 3-col → 1-col |
| Landscape | max-height ≤ 520px | Height-constrained adjustments (only in horizontal-scroll context) |

The `Grid` component handles column collapse automatically when `responsive={true}` (the default).

### Motion

- **Easing:** `cubic-bezier(0.25, 1, 0.5, 1)` — a smooth deceleration curve.
- **Transition tokens:** `--transition-fast` (150ms) for hover states, `--transition-normal` (250ms) for opacity fades.
- Every component respects `prefers-reduced-motion: reduce` — transitions are zeroed, animations are killed.
- Scroll-linked animation (the horizontal scroll itself) lives in `HorizontalScroll` and is not a concern of the component system.

---

## Component Catalogue

### Tier 1 — Primitives (`@/components/primitives/`)

These components cannot be meaningfully decomposed further. They have zero dependencies within the system.

#### `Button`

`"use client"` — renders `<button>` or wraps `Link` when `href` is provided.

```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";  // default: "primary"
  size?: "small" | "medium" | "large";           // default: "medium"
  href?: string;                                  // renders as Link if provided
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";               // default: "left"
}
```

| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` | `--color-maroon` | white | `2px solid --color-maroon` |
| `secondary` | transparent | `--color-maroon` | `2px solid --color-maroon` |
| `ghost` | transparent | `--color-maroon` | `2px solid transparent` |

Sharp corners, uppercase, bold (900), letter-spacing 0.08em.

#### `Heading`

Server-compatible. Renders `h1`–`h6` based on the `level` prop.

```typescript
interface HeadingProps {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "hero" | "section" | "card" | "default";
  children: ReactNode;
  className?: string;
  uppercase?: boolean;  // default: true for hero/section, false otherwise
}
```

The `variant` controls font family, size, weight, letter-spacing, and colour — independently of the semantic level. The `level` prop sets the HTML tag and base size; the variant provides the styling preset.

#### `Text`

Server-compatible. Renders `p`, `span`, or `div` via the `as` prop.

```typescript
interface TextProps {
  variant?: "body" | "eyebrow" | "caption" | "muted";  // default: "body"
  size?: "small" | "medium" | "large";                   // default: "medium"
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";                             // default: "p"
}
```

The `eyebrow` variant forces: `0.78rem`, maroon, uppercase, 0.2em letter-spacing, weight 800 — regardless of the `size` prop. The `muted` variant uses `--color-muted` for colour.

#### `Icon`

Server-compatible. Wraps an SVG child with consistent sizing and accessibility.

```typescript
interface IconProps {
  children: ReactNode;  // SVG element
  size?: "small" | "medium" | "large" | "xlarge";  // default: "medium"
  color?: string;        // CSS custom property name, e.g. "--color-maroon"
  className?: string;
  ariaLabel?: string;
  decorative?: boolean;  // adds aria-hidden="true" when set
}
```

Uses `currentColor` by default. The `color` prop accepts a CSS var name and applies it via inline style.

#### `Badge`

Server-compatible. Inline label, primarily used as a number badge.

```typescript
interface BadgeProps {
  children: ReactNode;
  variant?: "number" | "status" | "label";  // default: "number"
  color?: "maroon" | "ink" | "muted";       // default: "maroon"
  className?: string;
}
```

The `number` variant (used in ValueCard) uses `clamp(2.8rem, 5vw, 5.25rem)` with -0.08em letter-spacing and bottom-margin auto — it pushes itself to the top of a flex-end card.

#### `Link`

Server-compatible. Wraps Next.js `Link` for internal URLs, renders `<a>` for external URLs.

```typescript
interface LinkProps {
  href: string;
  children: ReactNode;
  variant?: "default" | "nav" | "footer";  // default: "default"
  external?: boolean;                       // auto-detected if starts with http:// or https://
  className?: string;
  ariaLabel?: string;
}
```

| Variant | Style |
|---|---|
| `default` | Maroon, underlined, offset underline |
| `nav` | White, uppercase, bold, text-shadow (for transparent headers over video) |
| `footer` | Muted, no underline, hover darkens to ink |

External links automatically get `target="_blank"` and `rel="noopener noreferrer"`.

---

### Tier 2 — Layout (`@/components/layout/`)

These components arrange children but contain no content or opinions about what that content is. Zero dependencies within the system.

#### `Container`

Max-width wrapper with horizontal padding. No visual styling.

```typescript
interface ContainerProps {
  children: ReactNode;
  width?: "narrow" | "default" | "wide" | "full";  // default: "default"
  className?: string;
  as?: "div" | "section" | "article";               // default: "div"
}
```

| Width | max-width |
|---|---|
| `narrow` | 780px |
| `default` | 1180px |
| `wide` | 1440px |
| `full` | none |

Horizontal padding is `clamp(20px, 5vw, 72px)` (reduced at 760px).

#### `Section`

Full-width semantic `<section>` with background colour and vertical padding.

```typescript
interface SectionProps {
  children: ReactNode;
  background?: "paper" | "soft" | "maroon" | "ink" | "blue";  // default: "paper"
  padding?: "none" | "small" | "medium" | "large" | "xlarge"; // default: "large"
  className?: string;
  ariaLabel?: string;
  id?: string;
}
```

The component sets `padding-top` and `padding-bottom` only — no horizontal padding (delegated to `Container`). Dark backgrounds (maroon, ink, blue) invert the text colour to white.

#### `Grid`

Responsive CSS grid with automatic column collapse.

```typescript
interface GridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;        // default: 3
  gap?: "small" | "medium" | "large";  // default: "medium"
  responsive?: boolean;        // default: true
  className?: string;
}
```

Responsive behaviour (when `responsive={true}`):
- **4 columns:** → 2-col at 1100px → 1-col at 760px
- **3 columns:** → 2-col at 760px → 1-col at 420px
- **2 columns:** → 1-col at 760px

Uses `grid-template-columns: repeat(n, 1fr)`.

#### `Stack`

Vertical spacing container. Space is injected between consecutive children, not on the container itself.

```typescript
interface StackProps {
  children: ReactNode;
  gap?: "small" | "medium" | "large" | "xlarge";  // default: "medium"
  className?: string;
  as?: "div" | "section" | "article";               // default: "div"
}
```

Uses the "lobotomized owl" selector (`* + * { margin-block-start: var(--gap) }`) so the spacing collapses correctly when children are conditionally rendered.

#### `SplitLayout`

Two-column responsive layout. Stacks on mobile (760px).

```typescript
interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
  ratio?: "equal" | "1-2" | "2-1" | "1-3" | "3-1";  // default: "1-2"
  gap?: "small" | "medium" | "large";                  // default: "large"
  reverse?: boolean;                                    // reverse visual order on desktop
  className?: string;
}
```

This is the **dominant layout pattern** on the site — intro text on the left, card stack on the right. Uses `grid-template-columns` with `minmax()` to prevent content overflow.

#### `Cluster`

Horizontal flexbox layout. Aligns children in a row.

```typescript
interface ClusterProps {
  children: ReactNode;
  align?: "start" | "center" | "end" | "space-between";  // default: "start"
  gap?: "small" | "medium" | "large";                      // default: "medium"
  wrap?: boolean;                                           // default: false
  className?: string;
}
```

Useful for button groups, icon rows, and horizontal card stacks (though the WE VALUE card stack uses the existing CSS in `WalkerHomepage.module.css`).

---

### Tier 3 — Content (`@/components/content/`)

These components solve specific UI problems. They compose from primitives and layout components.

#### `Card`

Base card component. White background, 1px border, sharp corners.

```typescript
interface CardProps {
  children: ReactNode;
  variant?: "default" | "value" | "icon" | "image";  // default: "default"
  padding?: "small" | "medium" | "large";              // default: "medium"
  border?: boolean;                                     // default: true
  className?: string;
  ariaLabel?: string;
}
```

| Variant | Flex direction | Behaviour |
|---|---|---|
| `default` | column, top-aligned | Standard card |
| `value` | column, bottom-aligned | Flex `1 1 0` with min-width and min-height — for value cards in a horizontal stack |
| `icon` | column, centered, text-center | For IconCard — content is centered |
| `image` | column, padding: 0 | Image fills the top, text sits below |

#### `ValueCard`

Composes from `Card` (variant="value"), `Badge`, `Heading`, `Text`.

```typescript
interface ValueCardProps {
  number: string;   // e.g. "01"
  title: string;
  body: string;
  className?: string;
}
```

Renders a vertically-stretched card with the number badge at the top (pushed by `margin-bottom: auto`), title in the middle, and body at the bottom.

#### `IconCard`

Composes from `Card` (variant="icon"), `Heading`, `Text`, and a circular icon wrapper.

```typescript
interface IconCardProps {
  icon: ReactNode;     // pass an SVG inside <Icon>
  title: string;
  description: string;
  href?: string;       // makes the card a clickable link
  className?: string;
}
```

The icon sits in a **circular beige container** (`border-radius: 50%`) — this is intentional contrast to the system's sharp-corner default. When `href` is provided, the entire card becomes a link with a hover effect that changes the card border to maroon.

#### `ImageCard`

Composes from `Card` (variant="image") with Next.js `<Image>`.

```typescript
interface ImageCardProps {
  image: string;        // path to image file
  imageAlt: string;
  title: string;
  description?: string;
  imagePosition?: "top" | "left";           // default: "top"
  aspectRatio?: "16:9" | "4:3" | "1:1";    // default: "16:9"
  href?: string;
  className?: string;
}
```

Uses `fill` layout with `object-fit: cover`. When `href` is provided, the card becomes a clickable link.

#### `Hero`

Full-viewport hero section. Supports video backgrounds, image backgrounds, and solid colours.

```typescript
interface HeroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;        // default: true — dark overlay on media backgrounds
  align?: "left" | "center";  // default: "left"
  className?: string;
}
```

When a `backgroundVideo` is provided, it renders a `<video>` with `autoPlay muted loop playsInline`. When a `backgroundImage` is provided, it's set as `background-image` on the section. Both get the gradient fallback. Content is positioned over the media at z-index 2.

On media backgrounds: heading uses the `hero` variant (white, text-shadow). On solid backgrounds: heading uses the `section` variant (ink).

#### `CTASection`

Full-width coloured call-to-action section.

```typescript
interface CTASectionProps {
  heading: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  background?: "maroon" | "blue" | "soft";  // default: "maroon"
  centered?: boolean;                        // default: true
  className?: string;
}
```

Renders a `Section` (padding="xlarge") with a `Container` (width="narrow"). On dark backgrounds (maroon, blue): text is white, primary CTA uses `secondary` variant (white border), secondary CTA uses `ghost` variant (white text). On soft background: text is ink, primary CTA uses `primary` variant.

#### `MediaBlock`

Image/video beside text content. Uses `SplitLayout` internally (equal ratio).

```typescript
interface MediaBlockProps {
  mediaType: "image" | "video";
  mediaSrc: string;
  mediaAlt?: string;
  heading: string;
  description: string;
  mediaPosition?: "left" | "right";   // default: "left"
  cta?: { text: string; href: string };
  className?: string;
}
```

At 760px, stacks vertically (media above text). Uses Next.js `<Image>` for images, native `<video>` for video.

---

### Tier 3 — Navigation (`@/components/navigation/`)

#### `Header`

Extracted from the inlined homepage header. Fixed position, transparent over video.

```typescript
interface HeaderProps {
  brandText?: string;       // default: "St. Elizabeth High School"
  brandHref?: string;       // default: "/"
  navLinks?: Array<{ text: string; href: string }>;
  showSearch?: boolean;     // default: true
  showMenu?: boolean;       // default: true
  fixed?: boolean;          // default: true
  transparent?: boolean;    // default: true
  className?: string;
}
```

Grid layout: `brand | nav links | search | menu`. At 1100px, nav links are hidden and only search + menu remain. At 760px, search is also hidden. When `transparent`, the header background is transparent with white text (suitable for video hero pages). Search and menu buttons are currently disabled — the menu hookup is future work.

#### `Footer`

Multi-column footer with intro, link sections, social links, and copyright.

```typescript
interface FooterSection {
  title: string;
  links: Array<{ text: string; href: string }>;
}

interface FooterProps {
  sections?: FooterSection[];
  intro?: { heading: string; body: string };
  visualContent?: ReactNode;
  socialLinks?: Array<{ platform: string; href: string }>;
  copyright?: string;
  background?: "soft" | "maroon";  // default: "maroon"
  className?: string;
}
```

Default link sections (Quick Links, Academics, Community) are provided as sensible defaults. Layout: intro text on the left, link column grid on the right → bottom bar with social links and copyright. Full-width maroon background by default.

---

### Shared Utilities (`@/components/shared/`)

#### `types.ts`

Exports: `BaseComponentProps`, `AriaProps`, `BackgroundColor`, `TextColor`, `SpacingScale`.

These are TypeScript utility types used across components. Not all components import from here — only when the union types are needed.

#### `constants.ts`

Exports: `BREAKPOINTS`, `SPACING`, `FONT_SIZE`, `MEDIA`.

Numeric breakpoints, fluid clamp() values, and media query template strings. These are reference constants — components use the CSS custom properties directly in their stylesheets. The constants exist for consistency checks and potential future JS-driven responsive logic.

---

## Composition Patterns

### Pattern A: Intro + Card Stack (the "WE VALUE" pattern)

This is the dominant content pattern on the site. A section eyebrow, large serif heading, and body text on the left; a horizontal stack of cards on the right.

```tsx
import { Section } from "@/components/layout/Section";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { ValueCard } from "@/components/content/ValueCard";

<Section background="soft" padding="large">
  <SplitLayout
    left={
      <Stack gap="medium">
        <Text variant="eyebrow">About Our School</Text>
        <Heading level="h2" variant="section">Educating the Whole Person</Heading>
        <Text variant="muted" size="medium">
          Every student is known, challenged, and supported...
        </Text>
      </Stack>
    }
    right={
      <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
        <ValueCard number="01" title="Academic Excellence" body="..." />
        <ValueCard number="02" title="Character Formation" body="..." />
        <ValueCard number="03" title="Community Life" body="..." />
      </div>
    }
  />
</Section>
```

### Pattern B: Icon Card Grid

```tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { IconCard } from "@/components/content/IconCard";
import { Icon } from "@/components/primitives/Icon";
import { AcademicIcon } from "@/components/icons/AcademicIcon";

<Section background="blue-light" padding="large">
  <Container>
    <Stack gap="large">
      <Heading level="h2" variant="section" className={/* centered */}>
        Why St. Elizabeth
      </Heading>
      <Grid columns={4} gap="medium" responsive>
        <IconCard
          icon={<Icon size="large"><AcademicIcon /></Icon>}
          title="Academic Excellence"
          description="Rigorous curriculum with personalized support and advanced placement opportunities."
        />
        {/* repeat for each icon card */}
      </Grid>
    </Stack>
  </Container>
</Section>
```

### Pattern C: CTA Section

```tsx
import { CTASection } from "@/components/content/CTASection";

<CTASection
  heading="Ready to Join Our Community?"
  description="Start your St. Elizabeth journey today."
  primaryCTA={{ text: "Apply Now", href: "/apply" }}
  secondaryCTA={{ text: "Schedule a Visit", href: "/visit" }}
  background="blue"
  centered
/>
```

### Pattern D: Image + Text Block

```tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { MediaBlock } from "@/components/content/MediaBlock";

<Section background="paper" padding="large">
  <Container>
    <MediaBlock
      mediaType="image"
      mediaSrc="/images/campus.jpg"
      mediaAlt="Our campus grounds"
      heading="A Place to Grow"
      description="Our 40-acre campus provides space for learning, athletics, and reflection."
      mediaPosition="left"
      cta={{ text: "Take a Virtual Tour", href: "/visit" }}
    />
  </Container>
</Section>
```

### Pattern E: Full Hero Section

```tsx
import { Hero } from "@/components/content/Hero";

<Hero
  eyebrow="Welcome"
  heading="Known"
  description="St. Elizabeth High School inspires transformative learning through meaningful relationships..."
  primaryCTA={{ text: "Apply Now", href: "/apply" }}
  secondaryCTA={{ text: "Visit Campus", href: "/visit" }}
  backgroundVideo="/videos/campus.mp4"
/>
```

### Pattern F: Full Page Composition

```tsx
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/content/CTASection";
import { Footer } from "@/components/navigation/Footer";

<>
  <Header transparent fixed />
  <main>
    <Hero heading="Academics" description="..." backgroundImage="/images/academics.jpg" />
    <Section background="soft" padding="large">
      {/* intro + card stack pattern */}
    </Section>
    <Section background="blue-light" padding="large">
      {/* icon card grid pattern */}
    </Section>
    <CTASection heading="Apply Today" primaryCTA={{ text: "Apply", href: "/apply" }} />
  </main>
  <Footer
    intro={{ heading: "St. Elizabeth", body: "..." }}
    copyright="© 2026 St. Elizabeth High School"
  />
</>
```

---

## File Structure Reference

```
src/components/
├── primitives/                 6 components, 0 dependencies
│   ├── Badge/                  .tsx, .module.css, .test.tsx, index.ts
│   ├── Button/                 ↑ same file structure
│   ├── Heading/
│   ├── Icon/
│   ├── Link/
│   ├── Text/
│   └── index.ts                barrel export
│
├── layout/                    6 components, 0 dependencies
│   ├── Cluster/
│   ├── Container/
│   ├── Grid/
│   ├── Section/
│   ├── SplitLayout/
│   ├── Stack/
│   └── index.ts
│
├── content/                   7 components, depends on primitives + layout
│   ├── Card/
│   ├── CTASection/
│   ├── Hero/
│   ├── IconCard/
│   ├── ImageCard/
│   ├── MediaBlock/
│   ├── ValueCard/
│   └── index.ts
│
├── navigation/                2 components, depends on primitives + layout
│   ├── Footer/
│   ├── Header/
│   └── index.ts
│
├── icons/                     4 SVG icon components
│   ├── AcademicIcon.tsx
│   ├── ArtsIcon.tsx
│   ├── CommunityIcon.tsx
│   ├── SportsIcon.tsx
│   └── index.ts
│
├── shared/                    Design tokens & types
│   ├── constants.ts           BREAKPOINTS, SPACING, FONT_SIZE, MEDIA
│   └── types.ts               BaseComponentProps, AriaProps, union types
│
├── HorizontalScroll/          Existing (unchanged)
├── LoadOverlay/               Existing (unchanged)
└── WalkerHomepage/            Refactored — now composes from the component system
```

Every component directory contains exactly four files:
- `ComponentName.tsx` — implementation
- `ComponentName.module.css` — scoped styles
- `ComponentName.test.tsx` — unit tests (Vitest + React Testing Library)
- `index.ts` — named barrel export

---

## Conventions & Constraints

### What to do

1. **Default props over configuration.** Every component has sensible defaults — you can render `<Button>Click</Button>` without specifying variant, size, or any optional prop.
2. **Use `className` for composition.** Every component accepts `className` and merges it with its internal styles. Class names are appended, not replaced.
3. **Import from barrel exports.** `import { Button, Heading, Text } from "@/components/primitives"` rather than importing from each component's directory.
4. **Use Section + Container together.** `Section` provides the background and vertical padding; `Container` provides horizontal containment and max-width.
5. **Use Stack for vertical rhythm.** When you have consecutive headings, text, and buttons, wrap them in `<Stack gap="medium">` rather than manually spacing.
6. **Use SplitLayout for two-column layouts.** This is the canonical pattern for intro-text + card-stack arrangements. Use the `ratio` prop to control column widths.
7. **Pass `ariaLabel` to Section.** It becomes a named `<section>` region for screen readers.
8. **Use `as` prop on Text.** Change the rendered HTML element without changing the visual styling.
9. **Let Grid handle responsive column collapse.** Set `columns={4}` and `responsive={true}` — the grid will automatically stack at breakpoints.
10. **Use the light/dark pattern in CTASection and Hero.** These components automatically invert text colour on dark backgrounds. No manual colour overrides needed.

### What to avoid

1. **Do NOT add `border-radius` to cards, buttons, or sections.** It breaks the design language. The only rounded elements are: the crest badge, icon card circles, and search icon circle.
2. **Do NOT add `box-shadow`.** Depth comes from borders and typography, not shadows. Text-shadow is only for readability on media backgrounds.
3. **Do NOT use inline styles for spacing.** Use `Stack`, `Grid`, `SplitLayout`, or `Cluster` instead. The spacing scale is encoded in the CSS custom properties.
4. **Do NOT hardcode colour values.** Always use the CSS custom properties (`var(--color-maroon)`, etc.). The only exception is the video gradient fallback in WalkerHomepage.
5. **Do NOT use Tailwind classes.** The project uses CSS Modules exclusively. There is no Tailwind configuration.
6. **Do NOT wrap primitives with unnecessary divs.** If a component can't express what you need via its props, use its `className` prop to add a CSS Module class — but prefer composition over styling overrides.
7. **Do NOT mix serif and sans-serif within a single text block.** Serif is for headings only; sans-serif is for body and UI text.
8. **Do NOT use `margin` directly on components.** Use `Stack` for vertical spacing, `Cluster` for horizontal spacing, or add gap via layout component props.

---

## Testing

Run `pnpm test` to execute the full suite. Current state: **89 tests, 24 test files, all passing**.

Each component test covers:
- Basic rendering
- Prop application (checking for correct classes, text content, tags)
- Accessibility attributes (aria-labels, roles, semantic elements)
- Variant switching
- `className` merging
- Edge cases (disabled state, optional props, conditional children)

Tests use Vitest with React Testing Library. Mocks are provided for `next/image` in ImageCard and MediaBlock tests.

---

## Build Verification

Run `pnpm build` — it must pass TypeScript checking and produce a production build. The current build is clean.

---

## Future Scope

Not part of this handoff, but documented for awareness:

- **Menu functionality:** The Header's menu button and search button are currently `disabled`. The hamburger menu (flyout/drawer) needs implementation.
- **Form components:** Input, Textarea, Select, Checkbox, Radio — needed for inquiry/apply forms.
- **Scroll animations:** Content entrance animations on scroll. The components are designed to accept an `animationDelay` prop in the future.
- **Storybook:** Component documentation and visual testing.
- **CMS integration:** Sanity/Contentful for content management.
