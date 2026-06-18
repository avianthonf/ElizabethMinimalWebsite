# Implementation Specification — Codebase Refactor

> **Purpose**: Comprehensive catalogue of every issue in the current codebase with prescribed fixes, ordered by priority and dependency.  
> **Source of truth**: Codebase audit (June 2026) + docs/spec/00–06 specifications.  
> **Target**: Production-grade Next.js 16 + React 19 codebase with zero code smells, full WCAG 2.2 AA compliance, and battle-tested design patterns.

---

## Table of Contents

1. [Guiding Principles](#1-guiding-principles)
2. [Issue Catalogue](#2-issue-catalogue)
   - [P0 — React 19 Breaking Changes](#p0--react-19-breaking-changes)
   - [P1 — Architecture & Design Patterns](#p1--architecture--design-patterns)
   - [P2 — Performance](#p2--performance)
   - [P3 — Accessibility](#p3--accessibility)
   - [P4 — Security](#p4--security)
   - [P5 — Testing](#p5--testing)
   - [P6 — Data Layer](#p6--data-layer)
   - [P7 — Developer Experience](#p7--developer-experience)
3. [Implementation Phases](#3-implementation-phases)
4. [Verification Checklist](#4-verification-checklist)

---

## 1. Guiding Principles

These principles are derived from the existing spec documents (00–06) and industry best practices for Next.js 16 + React 19 projects.

### 1.1 Server Components by Default

Every component is a React Server Component unless it **needs** one or more of:

- Browser APIs (`window`, `document`, `navigator`)
- React hooks (`useState`, `useEffect`, `useCallback`, `useRef`, `useContext`, etc.)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Dynamic `import()` of client-only libraries

The `"use client"` directive is a **boundary declaration**, not a styling choice. It should appear as far down the component tree as possible. Components that only render static markup, even if they accept `children` or `className`, should remain Server Components.

**Rationale**: Server Components reduce JavaScript bundle size, improve First Contentful Paint, and enable streaming. Each `"use client"` boundary serializes its entire subtree.

### 1.2 React 19: No `forwardRef`

React 19 passes `ref` as a regular prop. `forwardRef` is deprecated. The new pattern:

```tsx
// BEFORE (React 18 pattern — deprecated)
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { children, ...props },
  ref,
) {
  return <button ref={ref}>{children}</button>;
});

// AFTER (React 19 pattern)
export function Button({ children, ref, ...props }: ButtonProps) {
  return <button ref={ref}>{children}</button>;
}
```

The prop interface includes `ref` directly:

```tsx
interface ButtonProps {
  ref?: React.Ref<HTMLElement>;
  children: ReactNode;
  // ... other props
}
```

**Rationale**: `forwardRef` was a workaround from when `ref` couldn't be a regular prop. In React 19, it adds unnecessary indirection and breaks dev-tools inspection.

### 1.3 Image Optimization Is Mandatory

All images must go through `next/image` for:

- Automatic WebP/AVIF format conversion
- Responsive `srcset` generation
- Lazy loading (via `loading="lazy"`, the default)
- Layout shift prevention (`width`/`height` or `fill` + aspect ratio)

The only exceptions:

- Background images on `<video>` elements (not applicable here)
- Images already handled by a third-party embed (Google Maps iframe)

CSS `background-image: url(...)` is **forbidden** for content images. It bypasses all optimization.

**Rationale**: Image optimization directly impacts Core Web Vitals (LCP, CLS) and is required per spec 02-content-and-voice.md ("All non-hero images use `loading="lazy"` or Next.js Image optimization").

### 1.4 CSS Modules for All Styling

Inline `style={{...}}` is forbidden except for:

- CSS custom property values that are dynamic per-component (e.g., `--stagger-index`)
- Computed values that cannot be expressed in CSS (e.g., JavaScript-calculated positions)

Static layout styles, spacing, colors, and typography belong in `.module.css` files.

**Rationale**: Inline styles bypass the CSS Module scoping system, prevent CSS minification, and make responsive design harder.

### 1.5 Accessibility Is Non-Negotiable

Every component must:

- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<section>`, `<article>`)
- Have visible or programmatic focus indicators
- Support keyboard navigation (Tab, Enter, Space, Escape, Arrow keys where appropriate)
- Include ARIA attributes only when semantic HTML is insufficient
- Respect `prefers-reduced-motion: reduce`
- Pass automated axe-core audits

---

## 2. Issue Catalogue

### P0 — React 19 Breaking Changes

These issues will cause runtime errors or deprecated behavior in React 19. Fix first.

---

#### ISSUE-001: `forwardRef` deprecated — 5 components affected

**Severity**: P0 — Deprecated API, will be removed in React 20.  
**Files**:

- `src/components/primitives/Button/Button.tsx` (line 30)
- `src/components/primitives/Heading/Heading.tsx` (line 27)
- `src/components/primitives/Text/Text.tsx` (line 22)
- `src/components/primitives/Icon/Icon.tsx` (line — similar pattern)
- `src/components/content/GalleryCard/GalleryCard.tsx` (line 21)

**Current code** (Button example):

```tsx
export const Button = forwardRef<HTMLElement, ButtonProps>(
  function Button({ children, ...props }, ref) { ... }
);
```

**Fix**: Remove `forwardRef` wrapper. Add `ref` as a regular prop. The internal `HeadingTag` helper in `Heading.tsx` should also be refactored to accept `ref` and pass it to the rendered heading element.

**Verification**: `grep -rn "forwardRef" src/` returns zero results. All 424 existing tests pass. TypeScript compiles with no errors.

---

#### ISSUE-002: `Heading` renders a `<span>` wrapper inside the heading element

**Severity**: P0 — Semantic HTML violation, breaks heading hierarchy for screen readers.  
**File**: `src/components/primitives/Heading/Heading.tsx` (lines 46–49)

**Current code**:

```tsx
<HeadingTag level={level} className={composedClassName}>
  <span ref={ref}>{children}</span>
</HeadingTag>
```

**Problem**: Every heading renders as `<h1><span>...</span></h1>`. The `<span>` is unnecessary and was only needed for the deprecated `forwardRef<HTMLSpanElement>`. With React 19, the `ref` goes directly on the heading element.

**Fix**: Remove the `<span>` wrapper. Apply `ref` directly to the heading element via `HeadingTag`:

```tsx
const HeadingTag = ({ level, children, className, ref }: HeadingTagProps) => {
  switch (level) {
    case "h1":
      return (
        <h1 ref={ref} className={className}>
          {children}
        </h1>
      );
    // ...
  }
};
```

**Verification**: All heading elements render as bare `<h1>`–`<h6>` with no wrapper `<span>`. Tests using `getByRole("heading")` continue to pass.

---

### P1 — Architecture & Design Patterns

These issues affect code quality, maintainability, and adherence to the spec.

---

#### ISSUE-003: Hero component uses CSS `background-image` instead of `next/image`

**Severity**: P1 — Violates spec 02 ("Next.js Image optimization"), bypasses image optimization, hurts LCP.  
**File**: `src/components/content/Hero/Hero.tsx` (lines 47–49, 52–55)

**Current code**:

```tsx
const mediaBackground = backgroundImage
  ? { backgroundImage: `url(${backgroundImage})` }
  : undefined;
// ...
<section style={mediaBackground} ...>
```

**Fix**: Render `next/image` with `fill` prop inside the `<section>`, positioned absolutely behind the content:

```tsx
{
  backgroundImage && (
    <Image
      src={backgroundImage}
      alt="" // decorative — heading provides context
      fill
      priority // hero images are LCP
      className={styles.bgImage}
      sizes="100vw"
      aria-hidden="true"
    />
  );
}
```

Add corresponding CSS:

```css
.bgImage {
  position: absolute;
  inset: 0;
  object-fit: cover;
  z-index: 0;
}
```

**Impact**: ~8 pages use Hero with backgroundImage. All benefit from automatic WebP conversion and responsive sizing.

**Verification**: Hero images load via `next/image` pipeline. Lighthouse LCP improves. No layout shift.

---

#### ISSUE-004: MenuOverlay uses CSS `background-image` for preview images (potential CSS injection)

**Severity**: P1 — Uses template literal in `style` attribute; image filenames are from data layer but pattern is fragile.  
**File**: `src/components/navigation/MenuOverlay/MenuOverlay.tsx` (line 217)

**Current code**:

```tsx
style={{
  backgroundImage: `url('/images/${currentPreviewImage}')`,
}}
```

**Fix**: Use `next/image` for the preview image:

```tsx
{
  currentPreviewImage && (
    <div className={styles.previewPanel} aria-hidden="true">
      <Image
        src={`/images/${currentPreviewImage}`}
        alt=""
        fill
        className={styles.previewImage}
        sizes="(min-width: 1100px) 300px, 0px"
        priority={false}
      />
    </div>
  );
}
```

**Verification**: Preview images render via `next/image`. No raw URL interpolation in style attributes.

---

#### ISSUE-005: Skip link rendered twice (root layout + PageShell)

**Severity**: P1 — Duplicate accessibility landmark.  
**Files**:

- `src/app/layout.tsx` (line 21)
- `src/components/layout/PageShell/PageShell.tsx` (line 39)

**Current code** (layout.tsx):

```tsx
<body>
  <a href="#main-content" className="skipLink">
    Skip to main content
  </a>
  {children}
</body>
```

And (PageShell.tsx):

```tsx
<Header ... />
<a href="#main-content" className="skipLink">Skip to main content</a>
```

**Fix**: Remove the skip link from `src/app/layout.tsx`. Keep it only in `PageShell` (which wraps all inner pages) and in `WalkerHomepageDesktop.tsx` / `WalkerHomepageVertical.tsx` (which render the homepage `<main>`). The root layout should contain only `<html>`, `<body>`, and children.

**Verification**: Exactly one skip link per page. Tab into the page focuses the skip link first.

---

#### ISSUE-006: `(site)/layout.tsx` is empty — unused wrapper

**Severity**: P2 — Dead code, adds unnecessary route group nesting without value.  
**File**: `src/app/(site)/layout.tsx`

**Current code**:

```tsx
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

**Fix**: Remove this file entirely. The `(site)` route group is useful for grouping but doesn't need an explicit layout when it's a passthrough. If future shared layout is needed (e.g., shared metadata, analytics), re-add it then.

**Verification**: All `/about/*`, `/admissions/*`, etc. routes still render correctly.

---

#### ISSUE-007: CardGridPage and ListPage are near-duplicates

**Severity**: P2 — DRY violation, maintenance overhead.  
**Files**:

- `src/components/templates/CardGridPage/CardGridPage.tsx`
- `src/components/templates/ListPage/ListPage.tsx`

**Analysis**: Both templates:

1. Accept `hero*`, `breadcrumb`, `sectionHeading`, `sectionDescription`, `items`, `containerWidth`, `sectionAriaLabel`
2. Render `PageShell > Hero > Section > Container > Stack > items`
3. Differ only in: `renderCard` vs `renderItem`, optional `layout: "list" | "grid"` on ListPage

**Fix**: Merge into a single `ContentPage<T>` template:

```tsx
export interface ContentPageProps<T> {
  // Hero props (same as current)
  // Breadcrumb props (same as current)
  // Section props (same as current)
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  layout?: "grid" | "list";
  columns?: GridColumns;
  // ...
}
```

Update all 12 consumer pages to import from the single template. The `renderCard` prop becomes `renderItem` everywhere.

**Verification**: All 12 pages that use CardGridPage or ListPage render identically. Tests pass.

---

#### ISSUE-008: Root metadata is generic and incomplete

**Severity**: P2 — Missed SEO and social sharing.  
**File**: `src/app/layout.tsx` (lines 4–10)

**Current code**:

```tsx
export const metadata: Metadata = {
  title: "St. Elizabeth's High School",
  description: "Horizontal homepage prototype for St. Elizabeth's High School.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};
```

**Problems**:

1. Description says "prototype" — not production-ready
2. No Open Graph metadata (title, description, images)
3. No Twitter card metadata
4. No `openGraph.images` for social sharing
5. No canonical URL
6. No `robots` configuration
7. No structured data (JSON-LD for School)

**Fix**:

```tsx
export const metadata: Metadata = {
  title: {
    default: "St. Elizabeth's High School — Pomburpa, Goa",
    template: "%s | St. Elizabeth's High School",
  },
  description:
    "St. Elizabeth's High School in Pomburpa, Goa — nurturing hearts since 1949. Catholic education affiliated with CBSE with an average class size of 15 students.",
  metadataBase: new URL("https://www.stelizabeths.edu.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "St. Elizabeth's High School",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "St. Elizabeth's High School campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};
```

Add `generateMetadata()` to the homepage for Open Graph title/description specific to the homepage.

**Verification**: `next build` succeeds. Social sharing previews show correct title, description, and image.

---

#### ISSUE-009: `images.remotePatterns` uses wildcard hostname

**Severity**: P2 — Overly permissive, security risk.  
**File**: `next.config.ts` (line 6)

**Current code**:

```ts
remotePatterns: [
  { protocol: "https", hostname: "*.google.com" },
],
```

**Problem**: `*.google.com` matches any subdomain. While this is for Google Maps embeds, it's more permissive than needed.

**Fix**: Restrict to the specific Google Maps hostname:

```ts
remotePatterns: [
  { protocol: "https", hostname: "maps.google.com" },
  { protocol: "https", hostname: "www.google.com" },
  { protocol: "https", hostname: "lh3.googleusercontent.com" },
],
```

**Verification**: Google Maps embeds still load. No other external images are unexpectedly optimized.

---

### P2 — Performance

---

#### ISSUE-010: `getAllImages()` rebuilds array on every call

**Severity**: P2 — O(n) allocation per call, called multiple times at module load.  
**File**: `src/data/images.ts` (line 994)

**Current code**:

```ts
function getAllImages(): ImageAsset[] {
  return [
    ...HERO_IMAGES,
    ACADEMICS_HERO,
    ...HOMEPAGE_GRID_IMAGES,
    // ... 15 more spreads
  ];
}
```

**Problem**: This function is called by `IMAGE_BY_SECTION`, `getImageByFilename()`, and `countUnique()`. Each call allocates a new array with 71+ items. While not a runtime performance issue (it's evaluated once at module load), the pattern is wasteful and the `getImageByFilename()` O(n) scan is called per-news-card.

**Fix**: Build the flat array once at module scope:

```ts
const ALL_IMAGES: ImageAsset[] = [
  ...HERO_IMAGES,
  ACADEMICS_HERO,
  ...HOMEPAGE_GRID_IMAGES,
  ...Object.values(VALUES_IMAGES),
  ...STATS_IMAGES,
  ...TESTIMONIAL_IMAGES,
  ...NEWS_IMAGES,
  ...CTA_IMAGES,
  ...ACADEMICS_IMAGES,
  ...ATHLETICS_IMAGES,
  ...ARTS_IMAGES,
  ...STUDENT_LIFE_IMAGES,
  ...COMMUNITY_IMAGES,
  ...CONTACT_IMAGES,
  ...OVERFLOW_IMAGES,
];

// O(1) lookup by filename (built once)
const IMAGE_BY_FILENAME: Partial<Record<string, ImageAsset>> = Object.fromEntries(
  ALL_IMAGES.map((img) => [img.filename, img]),
);

export function getImageByFilename(filename: string): ImageAsset | undefined {
  return IMAGE_BY_FILENAME[filename];
}
```

**Verification**: `getImageByFilename("DSC07580.jpg")` returns the correct asset. No regression in existing image lookups.

---

#### ISSUE-011: Inline styles in page components

**Severity**: P2 — Bypasses CSS Modules, prevents minification.  
**Files**:

- `src/app/(site)/contact/page.tsx` (lines 89–93, 98) — iframe wrapper `style`
- `src/components/WalkerHomepage/panels/StatValue.tsx` — no inline styles but uses `performance.now()` (OK)

**Fix for contact page**: Move iframe wrapper styles to a CSS module:

```css
/* ContactPage.module.css */
.mapWrapper {
  width: 100%;
  aspect-ratio: 4/3;
  border: 1px solid var(--s-color-border);
}
.mapIframe {
  border: 0;
  width: 100%;
  height: 100%;
}
```

**Verification**: No inline `style=` attributes on structural elements (dynamic CSS custom properties excepted).

---

#### ISSUE-012: StatValue animation doesn't check `prefers-reduced-motion`

**Severity**: P2 — Violates spec 00 ("prefers-reduced-motion: reduce fully respected").  
**File**: `src/components/WalkerHomepage/panels/StatValue.tsx` (lines 25–42)

**Current code**:

```tsx
useEffect(() => {
  if (!isVisible || num === null || hasAnimated.current) return;
  // ... RAF animation loop
}, [isVisible, num, suffix]);
```

**Fix**: Check reduced motion preference and skip animation:

```tsx
import { useReducedMotion } from "../hooks/useReducedMotion";

export function StatValue({ value, className }: StatValueProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  // ...

  useEffect(() => {
    if (!isVisible || num === null || hasAnimated.current) return;
    hasAnimated.current = true;

    if (prefersReducedMotion) {
      setDisplay(`${num.toLocaleString()}${suffix}`);
      return;
    }

    // ... existing RAF animation
  }, [isVisible, num, suffix, prefersReducedMotion]);
}
```

**Verification**: With `prefers-reduced-motion: reduce` enabled in browser, stat values appear immediately without animation.

---

### P3 — Accessibility

---

#### ISSUE-013: GalleryLightbox doesn't restore focus to trigger element

**Severity**: P3 — Focus is lost when lightbox closes, keyboard users must tab from the top of the page.  
**File**: `src/components/content/GalleryLightbox/GalleryLightbox.tsx`

**Current behavior**: Lightbox opens, traps focus, closes on Escape. But focus doesn't return to the gallery card that triggered it.

**Fix**: Accept an optional `triggerRef` prop, or use the existing `useFocusTrap` which already handles `restoreFocus`. Verify that the gallery card that opens the lightbox receives focus on close. The current `useFocusTrap` saves `document.activeElement` on activation and restores on deactivation — this should work if the card is focused when the lightbox opens.

**Verification**: Open lightbox via keyboard (Enter on gallery card), press Escape, focus returns to the same card.

---

#### ISSUE-014: HorizontalScroll lacks touch support

**Severity**: P3 — Mobile users cannot swipe to navigate panels on touch devices.  
**File**: `src/components/HorizontalScroll/HorizontalScroll.tsx`

**Current behavior**: Horizontal scroll is driven by mouse wheel and keyboard arrows. On touch devices (tablets in landscape), there's no swipe gesture support.

**Fix**: Add touch event handlers for swipe detection:

```tsx
const touchStartRef = useRef<{ x: number; y: number } | null>(null);

const handleTouchStart = useCallback((e: TouchEvent) => {
  touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, []);

const handleTouchEnd = useCallback(
  (e: TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Only handle horizontal swipes (dx > dy)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      scrollByPanel(dx < 0 ? "next" : "prev");
    }
  },
  [scrollByPanel],
);
```

Register on the viewport element. Respect `prefers-reduced-motion`.

**Verification**: On a touch device or Chrome DevTools touch emulation, swiping left/right navigates between panels.

---

#### ISSUE-015: HorizontalScroll doesn't announce current panel to screen readers

**Severity**: P3 — Screen reader users have no indication of which panel is visible.  
**File**: `src/components/HorizontalScroll/HorizontalScroll.tsx`

**Current code**: Has `aria-roledescription="carousel"` and `role="list"` on track, but no `aria-live` region or `aria-current` on visible panels.

**Fix**: Add an `aria-live="polite"` region that announces the current panel:

```tsx
const [currentPanel, setCurrentPanel] = useState(0);
// In updateTransform, calculate current panel index:
const panelIndex = Math.round(progress * (childrenArray.length - 1));
if (panelIndex !== currentPanel) setCurrentPanel(panelIndex);

// Render:
<span className="sr-only" aria-live="polite">
  Panel {currentPanel + 1} of {childrenCount}: {panelLabels[currentPanel]}
</span>;
```

Each `HorizontalPage` already has `ariaLabel` — use these as panel labels.

**Verification**: VoiceOver/NVDA announces "Panel 1 of 8: St. Elizabeth's High School — introduction" etc. when navigating.

---

#### ISSUE-016: No print stylesheet

**Severity**: P3 — Explicitly required by spec 00 ("Print stylesheets included").  
**File**: `src/app/globals.css`

**Fix**: Add `@media print` rules:

```css
@media print {
  .skipLink,
  [data-header="true"],
  .menuButton,
  nav {
    display: none !important;
  }

  body {
    font-size: 12pt;
    color: #000;
    background: #fff;
  }

  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
  }
  a[href^="#"]::after,
  a[href^="javascript:"]::after {
    content: "";
  }

  main {
    padding: 0;
  }
  section {
    page-break-inside: avoid;
  }
}
```

**Verification**: Browser Print Preview shows clean, readable layout without navigation or animations.

---

#### ISSUE-017: No automated accessibility testing

**Severity**: P3 — axe-core and Playwright are installed but unused for a11y.  
**Files**: `e2e/a11y.spec.ts`, `playwright.config.ts`

**Current state**: `@axe-core/playwright` is in devDependencies. `e2e/a11y.spec.ts` exists but may not cover all pages.

**Fix**: Expand `e2e/a11y.spec.ts` to test every route:

```ts
const routes = [
  "/",
  "/about",
  "/about/history",
  "/about/mission",
  "/about/staff",
  "/about/strategic-plan",
  "/admissions",
  "/admissions/apply",
  "/admissions/faqs",
  "/admissions/tuition",
  "/admissions/visit",
  "/admissions/why",
  "/academics",
  "/academics/departments",
  "/academics/college-counseling",
  "/academics/languages",
  "/academics/libraries",
  "/athletics",
  "/athletics/teams",
  "/arts",
  "/arts/visual-arts",
  "/arts/performing-arts",
  "/alumni",
  "/student-life",
  "/student-life/clubs",
  "/how-to-help",
  "/how-to-help/give",
  "/news",
  "/contact",
  "/contact/visit",
];

for (const route of routes) {
  test(`a11y: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
```

**Verification**: `npx playwright test e2e/a11y.spec.ts` passes with zero violations on every page.

---

### P4 — Security

---

#### ISSUE-018: Missing CSP, HSTS, and Permissions-Policy headers

**Severity**: P4 — Production security hardening.  
**File**: `next.config.ts`

**Current headers**: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`

**Fix**: Add comprehensive security headers:

```ts
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        // Existing
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        // New
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval for dev
            "style-src 'self' 'unsafe-inline'", // Framer Motion inline styles
            "img-src 'self' data: https:",
            "font-src 'self'",
            "frame-src https://www.google.com https://maps.google.com",
            "connect-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; "),
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
        },
      ],
    },
  ];
},
```

**Note**: CSP `script-src 'unsafe-eval' 'unsafe-inline'` is required for Next.js development mode. In production, use nonces or hashes. Consider using the `next/dynamic` CSP approach with nonce generation.

**Verification**: `curl -I http://localhost:3000` shows all security headers. [securityheaders.com](https://securityheaders.com) scores A+.

---

### P5 — Testing

---

#### ISSUE-019: No E2E tests for user journeys

**Severity**: P5 — Critical user flows have zero automated coverage.  
**Files**: `e2e/homepage.spec.ts` (exists, limited)

**Fix**: Create comprehensive E2E tests for the 4 user journeys defined in spec 01-ia-and-journeys.md:

```ts
// e2e/journeys.spec.ts

test.describe("Journey 1: Prospective Parent → Admissions", () => {
  test("navigates from homepage to admissions to visit", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Inquire Now" }).click();
    await expect(page).toHaveURL("/admissions");
    await page.getByRole("link", { name: /visit/i }).click();
    await expect(page).toHaveURL("/admissions/visit");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Journey 2: Student → Extracurriculars", () => {
  test("navigates to student life and clubs", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Student Life" }).first().click();
    await expect(page).toHaveURL("/student-life");
    // ... navigate to clubs
  });
});

// Journey 3: Alumnus → Reconnect
// Journey 4: Donor → Giving
```

**Verification**: `npx playwright test e2e/journeys.spec.ts` passes.

---

#### ISSUE-020: Many components have zero test coverage

**Severity**: P5 — Untested code is unmaintainable code.  
**Components without tests**:

- `Breadcrumb` — no test file
- `VisitPage` — no test file
- `Box` — no test file
- `VisuallyHidden` — no test file
- `AspectRatio` — no test file
- `Cluster` — has test but verify completeness
- `SchoolIcon` — no test file
- `HorizontalPage` — has test
- All WalkerHomepage panels except basic render tests

**Fix**: Add test files for each untested component. Priority order:

1. `Breadcrumb` — test aria-current, rendering of links
2. `VisitPage` — test map iframe, info cards rendering
3. `Box` — test polymorphic `as` prop
4. `VisuallyHidden` — test screen-reader-only rendering
5. `AspectRatio` — test ratio CSS classes

**Verification**: `vitest run --coverage` shows >80% component coverage.

---

#### ISSUE-021: No test coverage thresholds

**Severity**: P5 — No guardrail against coverage regression.

**Fix**: Add coverage config to `vitest.config.ts`:

```ts
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

**Verification**: `vitest run --coverage` fails if any threshold drops below target.

---

### P6 — Data Layer

---

#### ISSUE-022: `/news/[slug]` route doesn't exist — dead links

**Severity**: P6 — Broken links on homepage and /news page.  
**Files**:

- `src/data/homepage.ts` (lines 119, 126, 133) — `href: "/news/annual-day-2024"` etc.
- `src/data/news.ts` — likely has same hrefs

**Fix**: Create `src/app/(site)/news/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { NEWS_ARTICLES } from "@/data/news";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.href === `/news/${slug}`);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.href === `/news/${slug}`);
  if (!article) notFound();

  return (
    <PageShell
      hero={
        <>
          <Breadcrumb href="/news" label="News" currentLabel={article.title} />
          <Hero
            eyebrow="News"
            heading={article.title}
            backgroundImage={`/images/${article.imageFilename}`}
          />
        </>
      }
    >
      <Section background="paper" padding="xlarge">
        <Container width="narrow">
          <Stack gap="large">
            <Text variant="caption">{article.date}</Text>
            <Text variant="muted" size="large">
              {article.excerpt}
            </Text>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
```

Also add `generateStaticParams()` for static generation:

```tsx
export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.href.replace("/news/", ""),
  }));
}
```

**Verification**: `/news/annual-day-2024` renders the article page. Homepage news cards link to valid URLs.

---

#### ISSUE-023: Zod schemas exist but are never used at runtime

**Severity**: P6 — Data validation is defined but not enforced.  
**File**: `src/lib/schemas.ts`

**Current state**: Schemas are defined (`homepageDataSchema`, `navigationDataSchema`, etc.) but no data file calls `.parse()` or `.safeParse()`.

**Fix**: Add runtime validation in the async getter functions:

```ts
// In src/data/homepage.ts
import { homepageDataSchema } from "@/lib/schemas";

export async function getHomepageData(): Promise<HomepageData> {
  const data = { HERO_CONTENT, VALUES, STATS, TESTIMONIALS, CTA_CONTENT, LATEST_NEWS };
  const result = homepageDataSchema.safeParse(data);
  if (!result.success) {
    console.error("Homepage data validation failed:", result.error.flatten());
    // In development, throw. In production, log and continue.
    if (process.env.NODE_ENV === "development") throw result.error;
  }
  return data;
}
```

Apply to all data getters: `getAthleticsData`, `getAdmissionsData`, etc.

**Verification**: Intentionally corrupt a data field → dev mode throws, prod mode logs warning.

---

#### ISSUE-024: Contact form is placeholder only

**Severity**: P6 — Spec 05 lists contact page with inquiry form.  
**File**: `src/app/(site)/contact/page.tsx` (lines 73–79)

**Current code**:

```tsx
<Card variant="default" padding="large">
  <Text variant="caption">
    Inquiry form coming soon. In the meantime, please call or email us...
  </Text>
</Card>
```

**Fix**: Implement a functional contact form using React Server Actions:

```tsx
// src/app/(site)/contact/actions.ts
"use server";

import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitInquiry(formData: FormData) {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  // TODO: Integrate with email service (SendGrid, Resend, etc.)
  // For now, log to console in development
  console.log("Inquiry submitted:", parsed.data);

  return { success: true };
}
```

Create a `ContactForm` client component with proper form validation, loading states, and success/error feedback.

**Verification**: Fill out the form → submission succeeds → success message displayed.

---

### P7 — Developer Experience

---

#### ISSUE-025: No pre-commit hooks

**Severity**: P7 — No guardrail against committing broken code.  
**Files**: None (missing)

**Fix**: Add Husky + lint-staged:

```bash
npm install -D husky lint-staged
npx husky init
```

`.husky/pre-commit`:

```sh
npx lint-staged
```

`package.json` addition:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "tsc --noEmit"],
    "*.{ts,tsx,css}": ["prettier --write"]
  }
}
```

**Verification**: Introduce a TypeScript error → `git commit` is blocked.

---

#### ISSUE-026: No bundle size monitoring

**Severity**: P7 — No guardrail against bundle bloat.

**Fix**: Add `@next/bundle-analyzer`:

```bash
npm install -D @next/bundle-analyzer
```

`next.config.ts`:

```ts
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  // ... existing config
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
```

Add script: `"analyze": "ANALYZE=true next build"`

**Verification**: `npm run analyze` opens bundle visualization. JS bundle < 150KB gzipped for initial load.

---

#### ISSUE-027: No structured data (JSON-LD)

**Severity**: P7 — Missed SEO opportunity for school search results.

**Fix**: Add JSON-LD to root layout:

```tsx
// src/app/layout.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "St. Elizabeth's High School",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pomburpa",
    addressLocality: "Bardez",
    addressRegion: "Goa",
    postalCode: "403511",
    addressCountry: "IN",
  },
  url: "https://www.stelizabeths.edu.in",
  telephone: "+91-832-241-0654",
  email: "info@stelizabeths.edu.in",
  foundingDate: "1949",
  description: "Catholic school affiliated with CBSE in Pomburpa, Goa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Verification**: Google Rich Results Test shows valid School structured data.

---

#### ISSUE-028: Heading variant "eyebrow" missing from HeadingVariant type

**Severity**: P7 — Inconsistency between Heading and Text variants.  
**File**: `src/components/primitives/Heading/Heading.tsx` (line 6)

**Current**:

```ts
export type HeadingVariant = "hero" | "section" | "card" | "default";
```

But `Text` has `variant: "body" | "eyebrow" | "caption" | "muted"`. The spec 06-components.md lists Heading variants as `hero | section | card | body | eyebrow`.

**Fix**: Add "body" and "eyebrow" to `HeadingVariant` if used, or confirm the spec is aspirational and the current 4 variants are correct. Based on actual usage, `Heading` doesn't use eyebrow — `Text variant="eyebrow"` is used instead. Keep the current 4 variants but document the decision.

**Verification**: No component tries to pass `variant="eyebrow"` to Heading.

---

## 3. Implementation Phases

### Phase 1: React 19 Compliance (P0)

**Estimated effort**: 2–3 hours  
**Dependencies**: None

1. Remove `forwardRef` from Button, Heading, Text, Icon, GalleryCard (ISSUE-001)
2. Remove `<span>` wrapper from Heading (ISSUE-002)
3. Run full test suite — all 424 tests must pass
4. TypeScript compiles clean

### Phase 2: Image Optimization (P1)

**Estimated effort**: 3–4 hours  
**Dependencies**: Phase 1 (Heading changes affect component tree)

1. Refactor Hero to use `next/image` (ISSUE-003)
2. Refactor MenuOverlay preview to use `next/image` (ISSUE-004)
3. Remove duplicate skip link (ISSUE-005)
4. Remove empty SiteLayout (ISSUE-006)
5. Test all 29 pages render correctly

### Phase 3: Architecture Consolidation (P2)

**Estimated effort**: 4–6 hours  
**Dependencies**: Phase 2

1. Merge CardGridPage + ListPage into ContentPage (ISSUE-007)
2. Update all 12 consumer pages
3. Fix root metadata (ISSUE-008)
4. Restrict remotePatterns (ISSUE-009)
5. Add getAllImages optimization (ISSUE-010)
6. Move inline styles to CSS modules (ISSUE-011)
7. Add reduced-motion check to StatValue (ISSUE-012)

### Phase 4: Accessibility (P3)

**Estimated effort**: 4–5 hours  
**Dependencies**: Phase 2

1. Fix lightbox focus restoration (ISSUE-013)
2. Add touch support to HorizontalScroll (ISSUE-014)
3. Add aria-live to HorizontalScroll (ISSUE-015)
4. Add print stylesheet (ISSUE-016)
5. Expand a11y E2E tests (ISSUE-017)

### Phase 5: Security & Data (P4 + P6)

**Estimated effort**: 3–4 hours  
**Dependencies**: None (independent)

1. Add security headers (ISSUE-018)
2. Create `/news/[slug]` route (ISSUE-022)
3. Add Zod runtime validation (ISSUE-023)
4. Implement contact form (ISSUE-024)

### Phase 6: Testing & DevEx (P5 + P7)

**Estimated effort**: 4–5 hours  
**Dependencies**: Phases 1–5 (tests should run against refactored code)

1. Add tests for untested components (ISSUE-020)
2. Add coverage thresholds (ISSUE-021)
3. Add E2E journey tests (ISSUE-019)
4. Add Husky + lint-staged (ISSUE-025)
5. Add bundle analyzer (ISSUE-026)
6. Add JSON-LD (ISSUE-027)
7. Resolve Heading variant question (ISSUE-028)

---

## 4. Verification Checklist

After all phases, verify:

- [ ] `npm run typecheck` — zero errors
- [ ] `npm run lint` — zero warnings
- [ ] `npm run test` — all tests pass (>80% coverage)
- [ ] `npm run build` — clean build, no errors
- [ ] `npx playwright test` — all E2E + a11y tests pass
- [ ] `grep -rn "forwardRef" src/` — zero results
- [ ] `grep -rn 'style={{' src/` — only dynamic CSS custom properties
- [ ] `grep -rn "background-image" src/` — zero results in `.tsx` files
- [ ] `grep -rn "use client" src/` — only components that need interactivity
- [ ] Every page renders correctly (manual + automated check)
- [ ] `prefers-reduced-motion: reduce` — no animations fire
- [ ] Keyboard navigation works on every interactive element
- [ ] Screen reader announces all landmarks, headings, and interactive elements
- [ ] Security headers present on all responses
- [ ] Social sharing shows correct OG image and description

---

_This specification is the implementation guide for the refactor. Each issue has a clear before/after, verification step, and dependency chain. Work through the phases sequentially — Phase 1 must complete before Phase 2, etc._
