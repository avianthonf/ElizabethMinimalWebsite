# Tier 1 Implementation Plan — Full End-to-End Specification

> Created: 2026-07-05 | For: St. Elizabeth's High School Website
> Based on: `docs/research/50-open-source-elements.md` TIER 1 row

---

## Objective

Integrate ALL 7 Tier 1 design elements into the St. Elizabeth's codebase, making it
visually stunning, interactive, and production-ready with zero regressions.

**Non-negotiable constraints:**

- Zero visual regressions at breakpoints (mobile/tablet/desktop must be pixel-identical)
- Zero type errors, zero lint errors, all 423 tests passing
- Clean commits between each element
- All 3D/animation content lazy-loaded via `next/dynamic` — no SSR bundle bloat
- `prefers-reduced-motion` honored for all animations
- Static fallback for every dynamic element

---

## Tier 1 Elements (7)

| Commit | Element              | NPM Package                                        | Target File(s)                                                             | Impact                         |
| ------ | -------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------ |
| C1     | Page Transitions     | `next-view-transitions`                            | `src/app/layout.tsx`, `src/shared/ui/link.tsx`, 13 raw `next/link` imports | All 46 routes feel premium     |
| C2     | 3D Homepage Hero     | `@splinetool/react-spline` + `@splinetool/runtime` | `src/screens/home/hero-carousel.tsx`                                       | Dramatic visual upgrade        |
| C3     | Before/After Slider  | `react-compare-slider`                             | `src/screens/home/campus-then-now.tsx`                                     | Replace ~100 lines → ~30 lines |
| C4     | 3D Tilt Cards        | `react-parallax-tilt`                              | `src/shared/ui/icon-card.tsx`                                              | Subtle polish on all cards     |
| C5     | Social Share Buttons | `react-share`                                      | `src/app/(site)/news/[slug]/page.tsx`                                      | Social engagement              |
| C6     | Thank-You Confetti   | `canvas-confetti`                                  | `src/app/(site)/contact/thank-you/page.tsx`                                | Delightful micro-interaction   |
| C7     | Lottie Animations    | `lottie-react`                                     | `src/app/error.tsx`, `src/app/(site)/error.tsx`                            | Friendly error states          |

---

## Pre-Flight Checklist

- [x] Codebase fully refactored (Phases 1-13 complete, 423 tests, 0 errors)
- [x] Research catalog written (`docs/research/50-open-source-elements.md`)
- [x] All target files surveyed — every file exists, no missing dependencies
- [x] No conflicting dependencies in `package.json`

---

## DETAILED IMPLEMENTATION STEPS

### C1: Page Transitions (`next-view-transitions`)

**NPM:** `next-view-transitions@^0.3.5` | **Weight:** ~2KB | **License:** MIT

**What it does:**
Uses the View Transitions API (Chrome 111+) with an automatic CSS-only fallback for
Firefox/Safari. Provides `<ViewTransitions>` layout wrapper and `<Link>` component that
triggers smooth cross-fade navigation between pages.

**Files to modify:**

| File                          | Change                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/layout.tsx`          | Import `ViewTransitions` from `next-view-transitions`. Wrap the `<body>` content (the provider chain: AxeProvider → SmoothScrollProvider → MenuProvider → children + MenuOverlay + Analytics). The `<ViewTransitions>` goes INSIDE `<body>` as the outermost element.                                                                                       |
| `src/shared/ui/link.tsx`      | Change `import NextLink from "next/link"` to `import { Link as NextLink } from "next-view-transitions"`. All internal nav through the shared Link now triggers view transitions.                                                                                                                                                                            |
| 13 files with raw `next/link` | Replace `from "next/link"` with `from "next-view-transitions"` in each. Files: breadcrumb.tsx, not-found.tsx, search-overlay.tsx, student-life-section.tsx, locate-section.tsx, error.tsx, (site)/error.tsx, events-preview.tsx, admissions-cta.tsx, holistic-section.tsx, programs-grid.tsx, news-section.tsx, gallery-section.tsx, video-gallery page.tsx |

**Verification:**

- `npm run build` — all 46 routes still generate
- `npm run typecheck` — 0 errors
- `npm run lint` — 0 errors
- `npm run test -- --run` — 423 tests pass
- Manual: click any internal link — smooth cross-fade (Chrome) or instant nav (Firefox/Safari)

**Rollback:** Revert the import in `link.tsx` and restore `next/link` in all 13 files.

---

### C2: 3D Homepage Hero (`@splinetool/react-spline`)

**NPM:** `@splinetool/react-spline@^4.1.0`, `@splinetool/runtime@^1.x` | **Weight:** ~200KB lazy-loaded | **License:** MIT

**What it does:**
Renders an interactive 3D Spline scene in the hero area. The scene replaces or
sits behind the existing carousel overlay. Users can orbit/zoom with their mouse.
The existing carousel overlay (text + CTAs) remains on top at z-index 2.

**Approach:**
Since we don't have a custom-designed Spline scene from the Spline editor, we will:

1. Create a `<HeroSplineScene>` component that uses a placeholder Spline scene URL
   (the Spline community has "AI Education", "Class: Second Lesson", "Interactive Workspace"
   scenes that can serve as placeholders until a custom scene is created).
2. Use `next/dynamic` with `ssr: false` to lazy-load the Spline component.
3. Render it at z-index 0, behind the carousel overlay (z1) and content (z2).
4. Add a static gradient fallback for SSR (the existing hero gradient).

**Files to create/modify:**

| File                                            | Action | Change                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/screens/home/hero-spline-scene.tsx`        | CREATE | `"use client"` component. Uses `Spline` from `@splinetool/react-spline`. Accepts a `sceneUrl` prop. Wraps in a full-size div with `position: absolute; inset: 0; z-index: 0;`. Catches load errors silently (fallback to gradient).                                                                                                    |
| `src/screens/home/hero-spline-scene.module.css` | CREATE | `.root` with `position: absolute; inset: 0; z-index: 0; overflow: hidden;`. `.canvas` sizing.                                                                                                                                                                                                                                          |
| `src/screens/home/hero-carousel.tsx`            | MODIFY | Import the Spline scene via `next/dynamic`. Add `const HeroSplineScene = dynamic(() => import("./hero-spline-scene").then(m => m.HeroSplineScene), { ssr: false })`. Render `<HeroSplineScene>` inside the `.root` div BEFORE the overlay and content layers. Pass a scene URL constant. Existing carousel functionality is unchanged. |
| `src/domains/homepage/sections.data.ts`         | MODIFY | Add `SPLINE_SCENE_URL` export — the URL to the Spline scene. Initially a community scene or a placeholder comment.                                                                                                                                                                                                                     |

**Spline scene URL strategy:**

- **Immediate:** Use a freely available Spline community scene as a proof-of-concept
  (e.g., "AI Education" scene or a generic 3D abstract background).
- **Future:** Custom-designed scene built in Spline editor — school building, campus,
  or abstract education-themed 3D composition with school colors.
- **Scene source:** Exported from Spline editor → Copy "React" export URL →
  paste into `SPLINE_SCENE_URL`.
- **Self-hosting:** The `.splinecode` file can be downloaded and served from
  `/public/spline/scene.splinecode` for zero external dependencies and no CORS issues.

**CSS changes to hero-carousel.module.css:**

- `.root`: Ensure the Spline canvas fills the container. The carousel already uses
  `position: relative` for the root, which enables absolute-positioned children.
- `.overlay` (z-index: 1): Ensure it overlaps the Spline scene.
- `.content` (z-index: 2): Ensure text and CTAs are above everything.

**Verification:**

- Homepage loads — existing carousel images + text + CTAs still visible
- Spline scene loads beneath the overlay (visible through the gradient)
- If Spline fails to load, the gradient fallback is visible (no white screen)
- Mobile: Spline is disabled via `prefers-reduced-motion` or viewport width check
- `npm run build` passes (Spline is `next/dynamic` with `ssr: false`)
- Browsers with JS disabled see only the static gradient overlay

---

### C3: Before/After Slider (`react-compare-slider`)

**NPM:** `react-compare-slider@^4.0.0` | **Weight:** ~12KB | **License:** MIT

**What it does:**
Replaces the custom 118-line `CampusThenNow` component with a polished,
library-maintained slider. The library handles touch, mouse, keyboard, RTL,
`prefers-reduced-motion`, and accessibility out of the box.

**Files to modify:**

| File                                          | Change                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/screens/home/campus-then-now.tsx`        | Replace the custom Pointer Events implementation with `ReactCompareSlider` + `ReactCompareSliderImage` from `react-compare-slider`. Keep the `CampusThenNowProps` interface but simplify the implementation to ~30 lines. The `itemOne` (before) and `itemTwo` (after) props map directly.                               |
| `src/screens/home/campus-then-now.module.css` | Remove custom `.slider`, `.handle`, `.handleLine`, `.grip`, `.sideImage`, `.label`, `.labelLeft`, `.labelRight`, `.afterSection`, `.beforeSection`, `.active` styles. Keep only `.root`, `.heading`, `.description`, and layout wrappers. Add `.slider` with `aspect-ratio: 16/9; border-radius: 8px; overflow: hidden`. |

**Implementation diff (conceptual):**

Before (118 lines):

```tsx
"use client";
// Custom Pointer Events drag logic, refs, useState, clipPath calculation...
```

After (~30 lines):

```tsx
"use client";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export function CampusThenNow({
  heading,
  description,
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
}: CampusThenNowProps) {
  return (
    <section>
      <Heading>{heading}</Heading>
      <Text>{description}</Text>
      <div className={styles.slider}>
        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src={beforeImage} alt={beforeLabel} />}
          itemTwo={<ReactCompareSliderImage src={afterImage} alt={afterLabel} />}
        />
      </div>
    </section>
  );
}
```

**Verification:**

- Campus Then & Now section still renders and is interactive
- Labels (before/after) still display
- Touch/mouse/keyboard all work
- `npm run typecheck` + `npm run lint` pass
- Existing test `campus-then-now` test file may need updating if it tests internal elements
  — check and update assertions to target DOM elements rendered by react-compare-slider.

---

### C4: 3D Tilt Cards (`react-parallax-tilt`)

**NPM:** `react-parallax-tilt@^1.7.x` | **Weight:** ~8KB | **License:** MIT

**What it does:**
Adds 3D perspective tilt to cards on hover — the card follows the mouse position,
creating a subtle depth effect. Applied to `IconCard` (used everywhere: Why Choose Us,
Programs Grid, Achievements, Student Life, etc.) via the shared UI layer.

**Files to modify:**

| File                               | Change                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/shared/ui/icon-card.tsx`      | Import `Tilt` from `react-parallax-tilt`. Wrap the `ConditionalLink` + `Card` output in `<Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="#ffffff" glarePosition="all" scale={1.02} transitionSpeed={600}>`. Disable tilt when `prefers-reduced-motion` is set (check `useReducedMotion` hook or the library's built-in support). |
| `src/shared/ui/icon-card.test.tsx` | Add test: verify Tilt wrapper renders. Mock `prefers-reduced-motion`.                                                                                                                                                                                                                                                                                                           |

**CSS changes:**

- `icon-card.module.css`: None needed — Tilt manages its own transforms.
- Ensure `.cardLink` has `transform-style: preserve-3d` if not already.

**Verification:**

- All pages using `IconCard` still render correctly
- Cards tilt on hover (desktop)
- Cards don't tilt on touch devices (react-parallax-tilt auto-detects)
- `npm run test -- --run` — all icon-card tests pass

---

### C5: Social Share Buttons (`react-share`)

**NPM:** `react-share@^5.x` | **Weight:** ~5KB (tree-shaken) | **License:** MIT

**What it does:**
Adds share buttons to news article pages. Users can share articles on WhatsApp,
Facebook, Twitter/X, Email, and copy the link. Zero external dependencies.

**Files to create/modify:**

| File                                      | Action | Change                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/features/share/share-bar.tsx`        | CREATE | `"use client"` component. Receives `url` and `title` props. Renders a row of share buttons: `<WhatsappShareButton>`, `<FacebookShareButton>`, `<TwitterShareButton>`, `<EmailShareButton>`, with matching `<WhatsappIcon>`, `<FacebookIcon>`, `<TwitterIcon>`, `<EmailIcon>` from `react-share`. Also a "Copy Link" button using `navigator.clipboard.writeText()`. Uses `sonner` toast for "Link copied!" feedback. |
| `src/features/share/share-bar.module.css` | CREATE | Flexbox row, `gap: 12px`, `border-top: 1px solid var(--border-color)`, `padding-top: var(--space-4)`. Icons at 32px with subtle scale-on-hover.                                                                                                                                                                                                                                                                      |
| `src/features/share/index.ts`             | CREATE | Barrel export: `export { ShareBar } from "./share-bar"`.                                                                                                                                                                                                                                                                                                                                                             |
| `src/app/(site)/news/[slug]/page.tsx`     | MODIFY | Import `ShareBar`. Add `<ShareBar url={...} title={...} />` at the bottom of the article section, after the article content `Stack`. Use the full `BASE_URL + path` as the share URL.                                                                                                                                                                                                                                |

**Verification:**

- News article pages show share buttons at the bottom
- Clicking each share button opens the correct share dialog
- "Copy Link" copies URL and shows a toast
- `npm run typecheck` + `npm run lint` pass
- No regressions in news article tests

---

### C6: Thank-You Confetti (`canvas-confetti`)

**NPM:** `canvas-confetti@^1.x` | **Weight:** ~7KB (lazy-loaded) | **License:** ISC

**What it does:**
Fires a confetti burst when a user lands on the contact thank-you page.
Pure canvas rendering — no React overhead. Uses a `"use client"` wrapper
component since the thank-you page is a server component.

**Files to create/modify:**

| File                                         | Action | Change                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/features/confetti/confetti-trigger.tsx` | CREATE | `"use client"` component. Uses `useEffect` to fire `canvas-confetti` on mount. Fires 3 bursts with staggered delays for a dramatic effect. Accepts an optional `duration` prop. Respects `prefers-reduced-motion`.                                                                                               |
| `src/features/confetti/index.ts`             | CREATE | Barrel export: `export { ConfettiTrigger } from "./confetti-trigger"`.                                                                                                                                                                                                                                           |
| `src/app/(site)/contact/thank-you/page.tsx`  | MODIFY | Import `ConfettiTrigger` and render it inside the `<Section>` (or at the fragment level). It's a client-only component, so it must be wrapped in `next/dynamic` with `ssr: false` OR imported normally (it's a `"use client"` component, which works in server components — Next.js handles this automatically). |

**Confetti implementation:**

```ts
import confetti from "canvas-confetti";

export function ConfettiTrigger() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#c9a96e", "#0f1d35", "#ffffff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#c9a96e", "#0f1d35", "#ffffff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return null;
}
```

**Verification:**

- Navigating to `/contact/thank-you` shows confetti
- `prefers-reduced-motion` disables confetti
- `npm run build` passes
- No test regressions

---

### C7: Lottie Error Animations (`lottie-react`)

**NPM:** `lottie-react@^2.x` | **Weight:** ~50KB (shared across routes) | **License:** MIT

**What it does:**
Adds a friendly Lottie animation above the error heading on both error pages.
Since both `src/app/error.tsx` and `src/app/(site)/error.tsx` share the same
CSS module, one component works for both.

**Files to create/modify:**

| File                                             | Action | Change                                                                                                                                                                                                                                            |
| ------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/features/lottie/lottie-player.tsx`          | CREATE | `"use client"` component. Uses `Lottie` from `lottie-react`. Accepts `animationData` (JSON). Renders a container with a fixed size (e.g., 200x200). The Lottie JSON data is imported as a static import to enable tree-shaking.                   |
| `src/features/lottie/animations/error-book.json` | CREATE | A Lottie animation JSON file — education-themed "something went wrong" animation. Use a free Lottie from LottieFiles (e.g., "books falling", "graduation cap", "school building"). Downloaded and committed to the repo (not fetched at runtime). |
| `src/features/lottie/index.ts`                   | CREATE | Barrel export.                                                                                                                                                                                                                                    |
| `src/app/error.tsx`                              | MODIFY | Import `LottiePlayer` and `errorBookAnimation` from `@/features/lottie`. Add `<LottiePlayer animationData={errorBookAnimation} />` inside `.wrapper`, above the heading.                                                                          |
| `src/app/(site)/error.tsx`                       | MODIFY | Same change as above.                                                                                                                                                                                                                             |

**Lottie JSON strategy:**

- Download a free education-themed Lottie JSON from LottieFiles (search "school", "books", "education")
- Save to `src/features/lottie/animations/error-book.json`
- Alternatively, use a simple built-in animation JSON (some libraries ship defaults)

**If no perfect free Lottie is found:** Use a simple CSS keyframe animation as fallback — a floating book or school crest SVG with CSS animation. This avoids blocking on finding the perfect asset.

**CSS changes:**

- `site-error.module.css`: Add `.lottieWrapper` with `width: 200px; height: 200px; margin: 0 auto var(--space-6);` to center the animation above the heading.

**Verification:**

- Both error pages show the Lottie animation
- Error pages still function correctly
- `npm run build` passes
- No test regressions

---

## ORDER OF OPERATIONS

1. **C1 — Page Transitions** (first, it's the foundation — everything builds on routing)
2. **C2 — 3D Hero** (second, highest visual impact)
3. **C3 — Before/After Slider** (third, replaces custom code)
4. **C4 — 3D Tilt Cards** (fourth, touches shared UI)
5. **C5 — Social Share** (fifth, isolated to news pages)
6. **C6 — Confetti** (sixth, isolated to thank-you page)
7. **C7 — Lottie Errors** (seventh, isolated to error pages)

## RISK ASSESSMENT

| Risk                                                      | Likelihood | Mitigation                                                                                                                                       |
| --------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `next-view-transitions` breaks existing `<Link>` behavior | Low        | The library's `Link` is a thin wrapper around `next/link` — only adding View Transition hooks. Test all link interactions.                       |
| Spline scene doesn't load on slow connections             | Medium     | Spline is lazy-loaded via `next/dynamic(ssr: false)`. Static gradient fallback always visible.                                                   |
| Campus-then-now tests break                               | Medium     | The existing test file checks for `beforeLabel` and `afterLabel` text — these should still render. May need DOM assertion updates.               |
| Parallax-tilt conflicts with existing hover transforms    | Low        | Tilt replaces the existing CSS `translateY(-4px)` on hover. Test on mobile and desktop.                                                          |
| Confetti fires multiple times (React Strict Mode)         | Low        | `useEffect` with cleanup — `canvas-confetti` can be reset. Strict Mode double-fire is harmless (confetti just fires twice, user doesn't notice). |
| Lottie JSON file is too large                             | Low        | Education-themed animations are typically 20-50KB. Lazy-load or use `next/dynamic` if needed.                                                    |

## VALIDATION GATES (after each commit)

```
npm run typecheck    → 0 errors
npm run lint         → 0 errors
npm run test -- --run → 423 tests pass
npm run build        → 46 routes static-generated
```

## COMMIT STRUCTURE

```
C1: feat: add page transitions with next-view-transitions
C2: feat: add 3D Spline scene to homepage hero
C3: refactor: replace custom before/after slider with react-compare-slider
C4: feat: add 3D tilt effect to icon cards
C5: feat: add social share buttons to news articles
C6: feat: add confetti celebration to contact thank-you page
C7: feat: add Lottie animations to error pages
```
