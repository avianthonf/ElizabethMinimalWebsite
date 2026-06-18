# Component Catalog

## Five-Tier Architecture

```
Tier 1 — Primitives       (Badge, Button, ConditionalLink, Heading, Icon, Link, Text)
Tier 2 — Layout           (Cluster, Container, Grid, PageShell, Section, SplitLayout, Stack)
Tier 3 — Content          (Card, CTASection, GalleryCard, GalleryFilter, GalleryLightbox, Hero,
                           IconCard, ImageCard, MediaBlock, TestimonialCard, ValueCard)
Tier 4 — Navigation       (Footer, Header, MenuOverlay)
Tier 5 — Templates        (CardGridPage, ListPage, VisitPage)
```

---

## Tier 1 — Primitives

Primitives are the most reusable components. They accept minimal props, render semantic HTML, and contain no business logic.

### Badge

**File**: `src/components/primitives/Badge/`  
Pill-style indicator. Used for category labels, status indicators, and role badges (e.g., "alumni", "student" on testimonial cards).  
**Props**: `variant?: "default" | "primary" | "accent"`, `children`

### Button

**File**: `src/components/primitives/Button/`  
Clickable button with three visual variants: default, primary, and ghost. Supports icons, disabled state, and all native button attributes.  
**Props**: `variant`, `size?`, `disabled?`, `children`, plus native button props.  
**Variants**: `default` (outlined), `primary` (filled bg), `ghost` (text only)

### ConditionalLink

**File**: `src/components/primitives/ConditionalLink/`  
Renders either a Next.js `<Link>` or a `<span>` depending on whether `href` is provided. Used by components that optionally link.  
**Props**: `href?`, `children`, plus Next.js Link props.

### Heading

**File**: `src/components/primitives/Heading/`  
Typography primitive for all headings. Renders `<h1>` through `<h6>` with consistent styling.  
**Props**: `level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"`, `variant?: "hero" | "section" | "card" | "body" | "eyebrow"`, `children`  
**Variants**:

- `hero`: Largest display size (hero panel heading)
- `section`: Section-level heading (inner pages)
- `card`: Card-level heading
- `body`: Body-style heading (smaller)
- `eyebrow`: Small uppercase label

### Icon

**File**: `src/components/primitives/Icon/`  
Wrapper around SVG icons with consistent sizing.  
**Props**: `size?: "small" | "medium" | "large"`, `children` (SVG element)

### Link

**File**: `src/components/primitives/Link/`  
Extended Next.js `<Link>` with style variants and active state support.  
**Props**: `variant?: "default" | "primary" | "nav" | "footer"`, `active?`, `children`, plus Next.js Link props.

### Text

**File**: `src/components/primitives/Text/`  
Typography primitive for body text, captions, and labels.  
**Props**: `variant?: "default" | "muted" | "eyebrow" | "caption" | "small"`, `size?: "small" | "medium" | "large"`, `children`

---

## Tier 2 — Layout

Layout components handle structural concerns: width constraints, whitespace, and grid arrangement.

### Cluster

**File**: `src/components/layout/Cluster/`  
Horizontal flex layout with wrapping.  
**Props**: `gap?`, `align?`, `justify?`, `children`

### Container

**File**: `src/components/layout/Container/`  
Width constraint wrapper.  
**Props**: `width?: "narrow" | "default" | "wide" | "full"`, `padding?`, `children`

- narrow: ~720px max-width
- default: ~1024px max-width
- wide: ~1280px max-width
- full: 100% width

### Grid

**File**: `src/components/layout/Grid/`  
CSS Grid wrapper with responsive column support.  
**Props**: `columns?: 2 | 3 | 4 | 5 | 6`, `gap?`, `responsive?: boolean`, `children`  
**Responsive**: When `responsive` is true, columns collapse to 1 on mobile (<760px), 2 on tablet.

### PageShell

**File**: `src/components/layout/PageShell/`  
Root wrapper for all inner pages. Provides Hero area + content area + footer.  
**Props**: `hero?: ReactNode`, `children?`  
**Usage**: Wraps every non-homepage route.

### Section

**File**: `src/components/layout/Section/`  
Semantic `<section>` with background color and padding presets.  
**Props**: `background?: "paper" | "soft" | "primary" | "ink" | "blue"`, `padding?: "small" | "medium" | "large" | "xlarge"`, `ariaLabel?: string`, `children`

### SplitLayout

**File**: `src/components/layout/SplitLayout/`  
Two-column layout with configurable ratio.  
**Props**: `ratio?: "1-1" | "2-1" | "1-2"`, `left: ReactNode`, `right: ReactNode`, `align?`, `gap?`  
**Responsive**: Stacks vertically on mobile.

### Stack

**File**: `src/components/layout/Stack/`  
Vertical flex stack with consistent gap.  
**Props**: `gap?: "small" | "medium" | "large" | "xlarge"`, `align?`, `children`

---

## Tier 3 — Content

Content components are page-specific but reusable across the site. They combine primitives and layout components.

### Card

**File**: `src/components/content/Card/`  
Container with background, padding, and optional border.  
**Props**: `variant?: "default" | "outlined" | "elevated"`, `padding?: "small" | "medium" | "large"`, `children`

### CTASection

**File**: `src/components/content/CTASection/`  
Full-width call-to-action banner with heading, description, and button pair.  
**Props**: `heading`, `description?`, `primaryCTA?: {text, href}`, `secondaryCTA?: {text, href}`, `background?: "blue" | "soft" | "primary"`

### GalleryCard

**File**: `src/components/content/GalleryCard/`  
Image card for the gallery with hover overlay and lightbox trigger.  
**Props**: `image`, `title?`, `category?`, `onClick?`

### GalleryFilter

**File**: `src/components/content/GalleryFilter/`  
Category filter bar for the gallery.  
**Props**: `categories`, `activeCategory`, `onChange`

### GalleryLightbox

**File**: `src/components/content/GalleryLightbox/`  
Full-screen lightbox for gallery images with navigation controls.  
**Props**: `images`, `currentIndex`, `isOpen`, `onClose`, `onNext`, `onPrev`

### Hero

**File**: `src/components/content/Hero/`  
Full-width hero banner with eyebrow, heading, description, and optional background image.  
**Props**: `eyebrow?`, `heading`, `description?`, `backgroundImage?`, `children?`

### IconCard

**File**: `src/components/content/IconCard/`  
Card with an icon, title, description, and optional link.  
**Props**: `icon`, `title`, `description?`, `href?`, `onClick?`

### ImageCard

**File**: `src/components/content/ImageCard/`  
Card with an image, title, description, and optional link.  
**Props**: `image`, `imageAlt`, `title`, `description?`, `href?`, `aspectRatio?: "4:3" | "16:9" | "1:1" | "3:2"`

### MediaBlock

**File**: `src/components/content/MediaBlock/`  
Two-column block with media (image/video) on one side and text on the other.  
**Props**: `mediaType: "image" | "video"`, `mediaSrc`, `mediaAlt?`, `heading`, `description?`, `cta?`, `mediaPosition?: "left" | "right"`, `layout?: "side-by-side" | "stacked"`

### TestimonialCard

**File**: `src/components/content/TestimonialCard/`  
Quote card with attribution and role badge.  
**Props**: `quote`, `attribution`, `role: "alumni" | "student" | "parent" | "teacher"`

### ValueCard

**File**: `src/components/content/ValueCard/`  
Numbered value card (01, 02, 03) with title and body text.  
**Props**: `number`, `title`, `body`

---

## Tier 4 — Navigation

### Footer

**File**: `src/components/navigation/Footer/`  
Full site footer with navigation links, contact info, social links, and copyright.  
**Props**: `background?: "paper" | "soft" | "primary"`, `showSocial?`, `showNav?`  
**Sections**: About, Admissions, Academics, Community, Social, Copyright.  
**Data**: `FOOTER_SECTIONS`, `FOOTER_INTRO`, `FOOTER_SOCIAL_LINKS`, `FOOTER_COPYRIGHT` from `@/data/navigation`.

### Header

**File**: `src/components/navigation/Header/`  
Fixed header with branding, navigation links, hamburger menu (mobile), and CTA buttons.  
**Props**: `brandText`, `navLinks`, `transparent?`, `fixed?`, `onMenuClick?`, `isMenuOpen?`, `menuButtonRef?`  
**Behavior**: Transparent on hero, theme switching via `data-header-theme`, fixed position.

### MenuOverlay

**File**: `src/components/navigation/MenuOverlay/`  
Full-screen mega-menu overlay with categorized links and image previews (desktop).  
**Props**: `isOpen`, `onClose`  
**Features**: Focus trap, escape-to-close底线, image hover previews on desktop.  
**Data**: `MENU_CATEGORIES` from `@/data/navigation`.

---

## Tier 5 — Templates

### CardGridPage

**File**: `src/components/templates/CardGridPage/`  
Generic template for pages with a hero + card grid (or stack) layout.  
**Props**: `heroEyebrow?`, `heroHeading`, `heroDescription?`, `heroBackgroundImage?`, `breadcrumb?`, `sectionHeading?`, `sectionDescription?`, `items`, `renderCard`, `columns?`, `containerWidth?`, `sectionAriaLabel`  
**Used by**: 9 pages (see 04-inner-page-system.md)

### ListPage

**File**: `src/components/templates/ListPage/`  
Generic template for pages with a hero + list (or grid) layout.  
**Props**: Same as CardGridPage, plus `renderItem` and `layout?: "list" | "grid"`  
**Used by**: 3 pages (see 04-inner-page-system.md)

### VisitPage

**File**: `src/components/templates/VisitPage/`  
Visit/directions template with info cards on left and map on right.  
**Props**: `heroEyebrow`, `heroHeading`, `heroDescription`, `heroBackgroundImage`, `sectionHeading`, `introText`, `infoCards`, `mapConfig`, `sectionAriaLabel`  
**Used by**: `/admissions/visit`, `/contact/visit`

---

## Homepage Only

### WalkerHomepage

**File**: `src/components/WalkerHomepage/`  
Orchestrator that routes between desktop horizontal and mobile vertical layouts.  
**Key files**: `WalkerHomepage.tsx` (orchestrator), `WalkerHomepageDesktop.tsx` (horizontal), `WalkerHomepageVertical.tsx` (vertical)

### HorizontalScroll / HorizontalPage

**File**: `src/components/HorizontalScroll/`  
Core horizontal scrolling engine. `HorizontalScroll` is the viewport container; `HorizontalPage` is each scrollable panel.  
**Key files**: `HorizontalScroll.tsx`, `HorizontalPage.tsx`

### LoadOverlay / LoadOverlayMobile

**File**: `src/components/LoadOverlay/`  
Intro animation overlay. Desktop version has SVG dolly-zoom; mobile is simplified.  
**Key files**: `LoadOverlay.tsx`, `LoadOverlayMobile.tsx`

---

## Hooks

### `useIsDesktop(breakpoint: number)`

Returns `true` if viewport width ≥ breakpoint. Defaults to `true` for SSR; corrected via `useLayoutEffect`.

### `useBodyScrollLock()`

Disables body scrolling when a modal/overlay is open. Restores on unmount.

### `useFocusTrap()`

Manages focus within a modal (for MenuOverlay). Traps Tab key within the container.

### `useMenuState()`

Manages menu open/close state, trigger ref, and close handler for MenuOverlay.

### `useReducedMotion()`

Returns `true` if user prefers reduced motion. Checked by all scroll-triggered animations.

### `useScrollReveal()`

Intersection Observer hook for scroll-triggered entrance animations.

---

## Icons

### SchoolIcon

**File**: `src/components/icons/SchoolIcon.tsx`  
Custom SVG icons for the school. Variants: `academic`, `community`, `arts`, `sports` (and others). Used by IconCard and other content components.
