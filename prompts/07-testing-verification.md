# Step 7: Testing, Verification & Build — Final Quality Gate

> **Handoff to:** Senior Frontend Engineer
> **Estimated time:** 3–4 hours
> **Risk level:** Low — verification and hardening, no new features
> **Depends on:** Steps 1–6 all completed
> **Baseline:** All previous tests passing, all pages built, menu functional

---

## 1. CONTEXT

### What This Step Accomplishes

This is the final quality gate before the full St. Elizabeth website is considered production-ready. It covers:

1. **Test suite expansion** — Add tests for all new pages, data files, and the MenuOverlay
2. **Visual regression checklist** — Manual verification of every panel, page, and responsive breakpoint
3. **Performance audit** — Image loading, bundle size, Lighthouse baseline
4. **Accessibility audit** — axe-core automated scan + manual keyboard/screen-reader checklist
5. **Build verification** — Production build, TypeScript strictness, lint rules

### Philosophy

**Tests should verify behavior, not implementation.** Test that the right content renders, the right links work, and the right accessibility attributes are present. Don't test internal component state or CSS class names.

**Every page gets at least a smoke test.** 30+ pages means 30+ simple "renders without crashing" tests. This catches import errors, missing data, and broken component composition.

**Accessibility is not optional.** Every image needs alt text. Every section needs aria-label. Every interactive element needs focus states. The `prefers-reduced-motion` fallback must work.

---

## 2. TEST EXPANSION

### 2.1 Page Smoke Tests

Create `src/app/__tests__/` and add a smoke test for every page route. Each test verifies:
- The page renders without throwing
- The page has a `<main>` element
- Key text content is present

```typescript
// src/app/__tests__/pages.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock client components that use browser APIs
vi.mock("@/components/HorizontalScroll", () => ({
  HorizontalScroll: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="horizontal-scroll">{children}</div>
  ),
  HorizontalPage: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="horizontal-page">{children}</div>
  ),
}));

vi.mock("@/components/LoadOverlay", () => ({
  LoadOverlay: () => <div data-testid="load-overlay" />,
}));

// ── Homepage ──────────────────────────────────────────────────────────

import HomePage from "../page";

describe("Homepage '/'", () => {
  it("renders the hero heading", async () => {
    render(await HomePage());
    expect(
      screen.getByText("Guiding Minds, Nurturing Hearts, Building Futures")
    ).toBeDefined();
  });

  it("renders value cards", async () => {
    render(await HomePage());
    expect(screen.getByText("Faith")).toBeDefined();
    expect(screen.getByText("Excellence")).toBeDefined();
    expect(screen.getByText("Community")).toBeDefined();
  });
});

// ── About Pages ───────────────────────────────────────────────────────

import AboutPage from "../about/page";

describe("About '/' page", () => {
  it("renders the heading", async () => {
    render(await AboutPage());
    expect(screen.getByText("About St. Elizabeth")).toBeDefined();
  });
});

// ... repeat for all 30+ page routes
// Each test follows the same pattern: import, render, assert key text
```

### 2.2 Data Layer Tests

Create `src/data/__tests__/` (if not already created in Step 2) with tests for every data file:

```typescript
// src/data/__tests__/navigation.test.ts
import { describe, it, expect } from "vitest";
import {
  HEADER_NAV_LINKS,
  MENU_CATEGORIES,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_COPYRIGHT,
} from "../navigation";

describe("Navigation Data", () => {
  it("has 9 header nav links", () => {
    expect(HEADER_NAV_LINKS).toHaveLength(9);
  });

  it("all header links have text and href", () => {
    for (const link of HEADER_NAV_LINKS) {
      expect(link.text).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("has 10 menu categories", () => {
    expect(MENU_CATEGORIES).toHaveLength(10);
  });

  it("each menu category has title and at least one link", () => {
    for (const cat of MENU_CATEGORIES) {
      expect(cat.title).toBeTruthy();
      expect(cat.links.length).toBeGreaterThan(0);
      for (const link of cat.links) {
        expect(link.text).toBeTruthy();
        expect(link.href).toBeTruthy();
      }
    }
  });

  it("has 4 footer sections", () => {
    expect(FOOTER_SECTIONS).toHaveLength(4);
  });

  it("footer intro has heading and body", () => {
    expect(FOOTER_INTRO.heading).toBeTruthy();
    expect(FOOTER_INTRO.body.length).toBeGreaterThan(20);
  });

  it("footer copyright includes current or future year", () => {
    expect(FOOTER_COPYRIGHT).toMatch(/©\s*\d{4}/);
  });
});
```

```typescript
// src/data/__tests__/images.test.ts
import { describe, it, expect } from "vitest";
import {
  HERO_IMAGES,
  HOMEPAGE_GRID_IMAGES,
  VALUES_IMAGES,
  STATS_IMAGES,
  TESTIMONIAL_IMAGES,
  NEWS_IMAGES,
  ACADEMICS_IMAGES,
  ACADEMICS_HERO,
  ATHLETICS_IMAGES,
  ARTS_IMAGES,
  STUDENT_LIFE_IMAGES,
  COMMUNITY_IMAGES,
  CONTACT_IMAGES,
  OVERFLOW_IMAGES,
  TOTAL_IMAGES,
  getImageByFilename,
} from "../images";

describe("Image Registry", () => {
  // ── Count verification ────────────────────────────────────────────

  it("catalogues exactly 71 images", () => {
    expect(TOTAL_IMAGES).toBe(71);
  });

  it("has 5 hero images", () => {
    expect(HERO_IMAGES).toHaveLength(5);
  });

  it("has 12 homepage grid images", () => {
    expect(HOMEPAGE_GRID_IMAGES).toHaveLength(12);
  });

  it("has 3 values background images", () => {
    expect(Object.keys(VALUES_IMAGES)).toHaveLength(3);
  });

  it("has 3 stats images", () => {
    expect(STATS_IMAGES).toHaveLength(3);
  });

  it("has 3 testimonial images", () => {
    expect(TESTIMONIAL_IMAGES).toHaveLength(3);
  });

  it("has 3 news images", () => {
    expect(NEWS_IMAGES).toHaveLength(3);
  });

  it("has academics hero as a separate entry", () => {
    expect(ACADEMICS_HERO.filename).toBe("DSC07576.jpg");
    expect(ACADEMICS_HERO.profile.temperature).toBe("cool");
  });

  it("has 7 academics section images", () => {
    expect(ACADEMICS_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has 7 athletics section images", () => {
    expect(ATHLETICS_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has at least 4 arts section images", () => {
    expect(ARTS_IMAGES.length).toBeGreaterThanOrEqual(4);
  });

  it("has at least 7 student life images", () => {
    expect(STUDENT_LIFE_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has at least 7 community/heritage images", () => {
    expect(COMMUNITY_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has at least 2 contact page images", () => {
    expect(CONTACT_IMAGES.length).toBeGreaterThanOrEqual(2);
  });

  // ── Data integrity ─────────────────────────────────────────────────

  it("every image has non-empty alt text (10+ chars)", () => {
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    for (const img of allImages) {
      expect(img.alt).toBeTruthy();
      expect(
        img.alt.length,
        `Image ${img.filename} has alt text shorter than 10 chars: "${img.alt}"`
      ).toBeGreaterThan(10);
    }
  });

  it("every image filename ends with .jpg", () => {
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    for (const img of allImages) {
      expect(
        img.filename.endsWith(".jpg"),
        `Image ${img.filename} does not end with .jpg`
      ).toBe(true);
    }
  });

  it("every image has a valid section", () => {
    const validSections = [
      "homepage-hero", "homepage-grid", "homepage-values",
      "homepage-stats", "homepage-testimonials", "homepage-news",
      "about-hero", "about-mission", "about-history", "about-staff",
      "admissions-hero", "admissions-why", "admissions-visit",
      "academics-hero", "academics-departments",
      "athletics-hero", "athletics-teams",
      "arts-hero", "arts-visual", "arts-performing",
      "student-life-hero", "student-life-clubs",
      "contact-hero",
      "how-to-help-hero",
      "news-hero",
      "alumni-hero",
      "overflow",
    ];
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    for (const img of allImages) {
      expect(
        validSections.includes(img.section),
        `Image ${img.filename} has invalid section: "${img.section}"`
      ).toBe(true);
    }
  });

  it("getImageByFilename returns correct image", () => {
    const img = getImageByFilename("DSC07580.jpg");
    expect(img).toBeDefined();
    expect(img!.section).toBe("homepage-hero");
  });

  it("getImageByFilename returns undefined for nonexistent file", () => {
    expect(getImageByFilename("nonexistent.jpg")).toBeUndefined();
  });

  // ── Uniqueness ─────────────────────────────────────────────────────

  it("no two images have the same filename across all registries", () => {
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    const filenames = allImages.map((img) => img.filename);
    const uniqueFilenames = new Set(filenames);
    expect(uniqueFilenames.size).toBe(filenames.length);
  });
});
```

### 2.3 MenuOverlay Tests

Already specified in Step 6. Verify they're created and passing.

### 2.4 Component Integration Tests

```typescript
// src/components/__tests__/homepage-integration.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WalkerHomepage } from "@/components/WalkerHomepage";

// ... same mocks as Step 3 test ...

describe("Homepage Integration", () => {
  it("renders 8 panels", () => {
    render(<WalkerHomepage />);
    const panels = screen.getAllByTestId("horizontal-page");
    expect(panels).toHaveLength(8);
  });

  it("all navigation links point to valid routes", () => {
    render(<WalkerHomepage />);
    // Verify key links are present with correct hrefs
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href")).filter(Boolean);
    expect(hrefs.length).toBeGreaterThan(20); // Should have many links
    for (const href of hrefs) {
      expect(href?.startsWith("/")).toBe(true);
    }
  });
});
```

---

## 3. VISUAL VERIFICATION CHECKLIST

### 3.1 Homepage 8-Panel Verification

For each panel, verify at 1440px, 1100px, 760px, and 420px viewport widths:

| Panel | Desktop (>1100px) | Tablet (760-1100px) | Mobile (<760px) |
|---|---|---|---|
| Panel 1 (Hero) | Photo fills viewport, text overlay in 2 columns | Text columns tighten, photo scales | Single-column text stack |
| Panel 2 (Values) | 60vw: intro + 3 ValueCards in row | Cards may wrap or narrow | Single column, cards stack |
| Panel 3 (Grid) | 120vw: 4 columns × 3 rows | 2-3 columns | 1 column |
| Panel 4 (Stats) | 50vw: SplitLayout 1:2 | Columns narrow | Stacked |
| Panel 5 (Testimonials) | 80vw: 3 cards in row | 2 cards | 1 card |
| Panel 6 (CTA) | 100vw: centered text + 2 buttons | Same, text smaller | Stacked buttons |
| Panel 7 (News) | 100vw: 3 cards | 2 cards | 1 card |
| Panel 8 (Footer) | 100vw: 4-column | 2-column | 1-column |

### 3.2 Inner Page Verification

For each inner page type, verify:
- [ ] Header is solid white with dark text (not transparent)
- [ ] Hero image loads with gradient overlay
- [ ] Heading text is readable on the hero background
- [ ] Content sections have proper spacing (not cramped)
- [ ] Footer renders correctly
- [ ] No horizontal overflow on any page

### 3.3 Color Verification

- [ ] No maroon (#6c1f35) visible anywhere — everything is royal blue (#0c217c) or the CTA blue (#0c4a6e)
- [ ] The Footer background is royal blue with white text
- [ ] ValueCard number badges are royal blue
- [ ] Eyebrow text is royal blue
- [ ] Primary buttons are royal blue
- [ ] CTA sections use the desaturated blue (#0c4a6e)
- [ ] The hero gradient uses royal blue tones (not maroon)

---

## 4. ACCESSIBILITY AUDIT

### 4.1 Automated (axe-core)

Run axe-core via browser DevTools or a test script:

```bash
# Install axe-core for automated testing
pnpm add -D @axe-core/react

# Run on key pages and fix all "critical" and "serious" violations
```

Key checks:
- [ ] All images have `alt` attributes (decorative images have `alt=""` or `aria-hidden="true"`)
- [ ] All form inputs have labels (future — forms not yet built)
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] No duplicate IDs
- [ ] All page content is in landmark regions (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`)

### 4.2 Manual Keyboard Testing

Tab through every page:
- [ ] Focus ring is visible on all interactive elements
- [ ] Tab order is logical (left→right, top→bottom)
- [ ] No keyboard traps
- [ ] Menu opens with Enter/Space, closes with Escape
- [ ] Skip-to-content link works (add one if missing)

### 4.3 Screen Reader Testing

Use VoiceOver (Mac), NVDA (Windows), or ChromeVox:
- [ ] Page title is announced on load
- [ ] Landmark navigation works (header, main, footer, nav)
- [ ] Image alt text is meaningful (not just filename)
- [ ] Link text is descriptive (not "click here" or "read more" without context)
- [ ] LoadOverlay text "WE BELIEVE" is announced

### 4.4 Reduced Motion

Enable `prefers-reduced-motion: reduce` in browser DevTools:
- [ ] LoadOverlay animation is instant (0.01ms duration)
- [ ] Horizontal scroll shows native scrollbar (no translate3d)
- [ ] Menu overlay appears instantly (no stagger animation)
- [ ] All CSS transitions are zeroed

---

## 5. PERFORMANCE BASELINE

### 5.1 Image Optimization

All images are currently unoptimized (~553 MB total). For production:

1. **Add Next.js Image component** where `<img>` tags are currently used
2. **Set `priority` on hero images** (above-fold LCP images)
3. **Set `loading="lazy"` on below-fold images** (default in Next.js Image)
4. **Add `sizes` attribute** for responsive image loading
5. **Consider converting to WebP/AVIF** formats at build time

```typescript
// Current (Hero background — needs migration to next/image)
<div style={{ backgroundImage: `url('/images/${filename}')` }} />

// Better (for ImageCard, IconCard, MediaBlock — already using next/image)
<ImageCard image={`/images/${filename}`} imageAlt={alt} ... />
```

**Action items:**
- [ ] Verify all ImageCard and MediaBlock instances use `<Image>` (they should per COMPONENTS.md)
- [ ] For hero background images, consider using `<Image fill>` instead of CSS `background-image` for better optimization
- [ ] Run `pnpm build` and check the image optimization output

### 5.2 Bundle Size

```bash
pnpm build
# Check the output for:
# - First Load JS size
# - Individual page sizes
# - Largest dependencies
```

Target: First Load JS < 150KB (gzipped). If larger, investigate:
- Dynamic imports for heavy components
- Code splitting for inner pages
- Tree-shaking unused exports

### 5.3 Lighthouse Targets

| Metric | Target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

Key LCP (Largest Contentful Paint) optimization:
- Hero images should have `priority` attribute
- Video should be removed or deferred (already replaced with static photo)
- Font loading: Georgia and Arial are system fonts — no web font blocking

---

## 6. BUILD VERIFICATION

### 6.1 TypeScript Strictness

```bash
pnpm build
```

Must pass with:
- Zero TypeScript errors
- Zero ESLint errors (if configured)
- Successful production build output

### 6.2 Next.js Build Output

Verify the build output shows:
- All pages are statically generated (○ or ● for Static)
- No pages show λ (Lambda/server-rendered) unexpectedly
- No build warnings about large page data

### 6.3 Test Suite

```bash
pnpm test
```

**Target: All tests passing.** The baseline was 89 tests across 24 files. After Steps 1–6, expect ~110–130 tests across ~30+ test files.

---

## 7. FINAL PUNCH LIST

### Critical (must fix before launch)

- [ ] `pnpm build` passes cleanly
- [ ] `pnpm test` passes — all tests green
- [ ] No 404 errors on any route
- [ ] All images load (no broken image links)
- [ ] Royal blue colour scheme is consistent across all pages

### High (should fix before launch)

- [ ] All images have descriptive alt text (not just "School event at St. Elizabeth High School")
- [ ] Mobile responsive — no horizontal overflow
- [ ] Footer links are functional
- [ ] Menu overlay works on homepage

### Medium (can ship with, fix in next iteration)

- [ ] Image optimization (WebP conversion, lazy loading)
- [ ] Lighthouse score ≥ 90 on all metrics
- [ ] Menu overlay on inner pages
- [ ] Search functionality
- [ ] Contact form backend

### Low (nice to have)

- [ ] Video hero option (upload optimized video)
- [ ] Google Analytics
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Favicon with school crest
- [ ] Open Graph meta tags for social sharing

---

## 8. HANDOFF COMMANDS

```bash
# Full verification suite
pnpm test && pnpm build

# Type checking only
pnpm tsc --noEmit

# Lint check (if configured)
pnpm lint

# Dev server for visual verification
pnpm dev

# Production build analysis
pnpm build && ls -la .next/static/chunks
```

---

## 9. ACCEPTANCE CRITERIA (FINAL)

- [ ] `pnpm test` passes — all test files green, zero failures
- [ ] `pnpm build` passes — zero TypeScript errors, production build succeeds
- [ ] Test count ≥ 100 (baseline was 89; data tests + page tests + MenuOverlay tests add ~20–40)
- [ ] All 8 homepage panels render correctly at 1440px, 1100px, 760px, 420px
- [ ] All inner pages render at all breakpoints
- [ ] Royal blue colour scheme is consistent (no maroon remnants)
- [ ] Footer renders correctly on all pages
- [ ] Menu overlay opens/closes with all interaction methods
- [ ] Keyboard navigation works across the site
- [ ] `prefers-reduced-motion` disables all animations
- [ ] All 71 images have descriptive alt text (10+ chars)
- [ ] No console errors in browser DevTools
- [ ] No horizontal overflow on body
- [ ] All nav links point to existing routes (no 404s)

---

*Final handoff complete. This step gates the entire project. Ship when all critical and high items are ✅.*
