# Master Phase Plan — 60 Open-Source Elements

> Last updated: 2026-07-05 | 15 Phases total | Phases 1-2 complete, 3-15 remaining
> Source: `docs/research/50-open-source-elements.md`

---

## STATUS LEGEND

| Symbol | Meaning                                             |
| ------ | --------------------------------------------------- |
| ✅     | Complete — implemented and committed                |
| 🔴     | Redundant — superseded by another element           |
| 📦     | Pending — planned for a future phase                |
| 🚫     | Blocked — waiting on external dependency resolution |

---

## RESOLVED AS REDUNDANT (10 of 60)

These catalog items were evaluated and found to overlap with already-implemented or already-installed alternatives. They will NOT receive dedicated phases.

| #   | Catalog Element            | Superseded By               | Rationale                                                                  |
| --- | -------------------------- | --------------------------- | -------------------------------------------------------------------------- |
| #7  | `img-comparison-slider`    | #6 `react-compare-slider`   | Already installed and wired into Campus Then & Now                         |
| #13 | `partycles`                | #12 `tsParticles`           | tsParticles covers all partycles use cases plus confetti/fireworks presets |
| #27 | `react-countup`            | #4 `motion` NumberTicker    | NumberTicker rebuilt on Motion's animate() — same capability, fewer deps   |
| #38 | `pure-react-carousel`      | `embla-carousel-react`      | Embla already installed and wired into HeroCarousel                        |
| #41 | `react-awesome-reveal`     | #4 `motion` whileInView     | ScrollReveal now uses Motion's hardware-accelerated ScrollTimeline         |
| #47 | `next-transition-router`   | #34 `next-view-transitions` | View Transitions API already wired into root layout                        |
| #50 | `react-animated-counter`   | #4 `motion` NumberTicker    | Odometer animation achievable via Motion variants                          |
| #53 | `kanpai` / `notifyx`       | `sonner`                    | Sonner already installed with ToastProvider in root layout                 |
| #55 | `react-tilt`               | #18 `react-parallax-tilt`   | ParallaxTilt already installed and wired into IconCard                     |
| #60 | `react-page-transitioning` | #34 `next-view-transitions` | Per-route transitions deferred; view-transitions covers all routes         |

---

---

## PHASE 1 — Foundation & Polish ✅ COMPLETE

**Status:** ✅ DONE — 7 commits, merged to `main`
**Scope:** Immediate high-impact, low-effort visual upgrades

| #   | Catalog Element            | Implementation                                                                        | Commit    |
| --- | -------------------------- | ------------------------------------------------------------------------------------- | --------- |
| #34 | `next-view-transitions`    | Page transitions across all routes, ViewTransitions in root layout                    | `00a2d7a` |
| #1  | `@splinetool/react-spline` | 3D Spline scene behind homepage hero carousel                                         | `3300538` |
| #6  | `react-compare-slider`     | Replaced 118-line custom Pointer Events with 66-line CompareSlider                    | `d92aa15` |
| #18 | `react-parallax-tilt`      | IconCard wrapped in Tilt (5° tilt, glare, 1.02x scale)                                | `abed4d2` |
| #15 | `react-share`              | Share bar (Facebook, Twitter/X, WhatsApp, Email, Copy Link) on news articles          | `691b1d0` |
| #42 | `canvas-confetti`          | Staggered school-color confetti bursts on contact/thank-you page                      | `d313111` |
| #11 | Lottie (replaced)          | Pure CSS SVG animated floating book for error pages (LottieFiles couldn't be scraped) | `01c6996` |

**Gate results:** 0 type errors, 0 lint errors, 56/423 tests passing, 46-route build

---

## PHASE 2 — Motion Engine & 3D Core ✅ COMPLETE

**Status:** ✅ DONE — 6 commits, merged to `main`
**Scope:** Motion-powered animation foundation, 3D globe + medallion, events calendar

| #   | Catalog Element              | Implementation                                                                                                                                                        | Commit                |
| --- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| #4  | `motion` foundation          | Replaced ScrollReveal (95→18 lines) + NumberTicker (70→43 lines) with Motion engine. Added `<MotionConfig reducedMotion="user">` to root layout                       | `ade4988`             |
| #3  | `reactbits` (replaced)       | Built 4 custom Motion text primitives (SplitText, TypewriterText, GradientText, EntranceText) — reactbits rejected due to hard GSAP/Three.js peer deps                | `c13ea9d`             |
| #5  | `react-globe.gl`             | 3D globe on location-map page with Goa marker, auto-rotation, atmosphere                                                                                              | `702364f`             |
| #20 | `FullCalendar`               | Events calendar route at `/news/events-calendar`, 6 color-coded events, month grid + year list                                                                        | `bbc3e95` + `bc1d162` |
| #17 | `react-hot-toast` → `sonner` | Sonner already properly integrated (Toaster in root layout, toast in share-bar). Contact form uses redirect→confetti (better UX). No change needed.                   | —                     |
| #29 | `react-three-fiber` + `drei` | 3D rotating medallion (navy+gold geometric composition) on About page. Also fixed 10 pre-existing React 19 JSX type errors in conditional-link, visually-hidden, link | `d82dbd6`             |
| #25 | `TinaCMS`                    | **Skipped** — Next.js 16 compatibility not yet available (issue #6492 on github.com/tinacms/tinacms)                                                                  | 🚫                    |

**Gate results:** 0 type errors, 0 lint errors, 56/423 tests passing, 46-route build

---

---

## PHASE 3 — Atmosphere & Micro-Interactions

**Status:** 📦 Pending
**Scope:** Particle backgrounds, marquee tickers, cinematic reveals, error boundaries, custom cursor, QR codes, scroll progress
**Effort:** Medium | **Risk:** Low | **Estimated commits:** 4

| #   | Catalog Element        | Plan                                                                                                                                                                                                                                                                                    | Integration Point                                                  |
| --- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| #12 | `tsParticles`          | Install `@tsparticles/react` + `@tsparticles/preset-confetti`. Create `features/particles/particle-background.tsx` — configurable background with school-color particles. Replace canvas-confetti on thank-you page with tsParticles confetti preset (richer visuals, same bundle cost) | Hero background, achievement page, annual day page, thank-you page |
| #14 | `react-fast-marquee`   | Replace CSS-based announcement bar animation with GPU-accelerated marquee. Add achievement ticker strip to homepage (below CounterBar). Add partner/sponsor logo scroll to footer section                                                                                               | AnnouncementBar widget, homepage, footer                           |
| #43 | `react-kino`           | Install `react-kino`. Add cinematic letterbox reveal to homepage hero on first visit (sessionStorage flag). Fade-to-black transition for the "Our Story" section on About page                                                                                                          | Hero carousel, About page, Mission page                            |
| #16 | `react-error-boundary` | Install `react-error-boundary`. Replace existing `error.tsx` files with `<ErrorBoundary FallbackComponent={...} onReset={...}>`. Wire reset function in error-illustration to retry the page load                                                                                       | `app/error.tsx`, `app/(site)/error.tsx`                            |
| #54 | `react-cursor-kit`     | Install `@ri-dev/react-cursor-kit`. Add custom cursor trail on homepage only (magnetic hover on buttons, school-crest cursor). Scope to `useReducedMotion()` gate                                                                                                                       | Homepage layout                                                    |
| #21 | `qrcode.react`         | Install `qrcode.react`. Add QR code component to contact page (encodes school vCard), admissions page (encodes admissions portal URL), location page (encodes Google Maps directions)                                                                                                   | Contact page, admissions page, location-map page                   |
| #44 | `scrollmeter`          | Install `scrollmeter`. Add reading progress bar to news article detail pages and long content pages (> 2000px)                                                                                                                                                                          | `app/(site)/news/[slug]/page.tsx`, content pages                   |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing

---

## PHASE 4 — Multimedia & Rich Documents

**Status:** 📦 Pending
**Scope:** Video/audio players, 3D flipbook viewer, document viewer
**Effort:** Medium-High | **Risk:** Medium (PDF rendering, cross-browser) | **Estimated commits:** 4

| #   | Catalog Element             | Plan                                                                                                                                                                                                                         | Integration Point                               |
| --- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| #8  | `flipbookjs/react-flipbook` | Install `react-flipbook`. Create `features/flipbook/school-publication.tsx` — lazy-loaded 3D flipbook. Wire into newsletter archive page (replace static list). Add admissions prospectus as flipbook on `/admissions/apply` | Newsletter page, admissions/apply page          |
| #9  | `react-player`              | Replace custom video embed markup with `react-player`. Add muted-autoplay hero background video as alternative to Spline scene (lighter bundle for mobile). Add testimonial video gallery                                    | Video gallery page, hero (optional), about page |
| #10 | `react-h5-audio-player`     | Install `react-h5-audio-player`. Create audio player for school anthem on `/about/motto-anthem`. Add playlist support for cultural activities audio samples                                                                  | Motto & Anthem page, cultural activities page   |
| #48 | `react-doc-viewer`          | Install `react-doc-viewer`. Add inline document preview to resource room page (PDF, DOCX, XLSX). Add prospectus preview to admissions page                                                                                   | Resource room page, admissions page             |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing

---

## PHASE 5 — Navigation & Layout Engineering

**Status:** 📦 Pending
**Scope:** Sticky elements, tooltips/popovers, accessible tabs
**Effort:** Medium | **Risk:** Low | **Estimated commits:** 3

| #   | Catalog Element    | Plan                                                                                                                                                                                                              | Integration Point                                  |
| --- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------- |
| #35 | `react-sticky-kit` | Install `react-sticky-kit`. Add sticky table-of-contents sidebar to long content pages (About, Admissions). Add sticky filter/action bar to photo gallery and events calendar                                     | Content pages, gallery page, events calendar       |
| #36 | `floating-ui`      | Install `@floating-ui/react`. Add hover tooltips to navigation icons, school abbreviation expansions. Add staff profile popover cards (hover → quick info modal). Create `features/tooltips/tooltip-provider.tsx` | Header navigation, staff directory, glossary terms |
| #39 | `react-tabs`       | Install `react-tabs`. Add tabbed layout to academics page (Curriculum                                                                                                                                             | Teaching Methods                                   | Facilities). Add department tabs to staff directory. Add category tabs to events calendar | Academics page, staff directory, events |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing

---

## PHASE 6 — Performance & Data Visualization

**Status:** 📦 Pending
**Scope:** Virtualized lists, masonry gallery, interactive charts
**Effort:** Medium-High | **Risk:** Medium (chart data, masonry edge cases) | **Estimated commits:** 3

| #   | Catalog Element             | Plan                                                                                                                                                                                                                          | Integration Point                                  |
| --- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| #19 | `react-virtuoso`            | Install `react-virtuoso`. Replace static staff directory grid with virtualized list (smooth scrolling for 100+ staff). Add virtualized news archive list                                                                      | Staff directory, news archive                      |
| #58 | `react-masonry-virtualized` | Install `react-masonry-virtualized`. Replace existing photo gallery grid with virtualized masonry layout. Handles hundreds of photos without DOM bloat                                                                        | Photo gallery page                                 |
| #59 | `echarts` or `recharts`     | Install one (prefer `recharts` for React-first DX). Add enrollment growth chart to About page. Add exam results bar chart to Achievements page. Add sports achievement radar chart. Create `features/charts/school-stats.tsx` | About page, achievements page, infrastructure page |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing

---

## PHASE 7 — Maps & Geography

**Status:** 📦 Pending
**Scope:** SVG maps, globe arc routes
**Effort:** Medium | **Risk:** Low | **Estimated commits:** 2

| #      | Catalog Element       | Plan                                                                                                                                                               | Integration Point                         |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| #37    | `react-simple-maps`   | Install `react-simple-maps`. Add India map SVG with Goa highlighted to "Our Reach" section. Add alumni city dots. Add educational tour destination markers         | About/alumni page, educational tours page |
| #5 ext | `react-globe.gl` arcs | Extend existing globe component with arc lines from Goa to alumni cities worldwide. Add tour destination markers. Create `features/globe/alumni-globe.tsx` variant | Alumni page, educational tours page       |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing

---

## PHASE 8 — Illustrations & Brand Polish

**Status:** 📦 Pending
**Scope:** SVG illustrations, hand-drawn doodles, design system audit
**Effort:** Medium | **Risk:** Low (static assets, no runtime deps) | **Estimated commits:** 3

| #        | Catalog Element      | Plan                                                                                                                                                                                                                                                                       | Integration Point                                          |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| #22      | `unDraw`             | Download 8-10 education-themed SVG illustrations (teamwork, learning, graduation, school, reading, science, sports, community). Replace the pure-CSS error illustration with styled unDraw illustrations. Add illustrations to empty states (no search results, no events) | 404 page, error pages, search empty state, no-events state |
| #52      | `react-open-doodles` | Install `react-open-doodles`. Add hand-drawn personality to student life section, clubs page, newsletter signup. Use sparingly — doodles vs unDraw provide distinct visual tones                                                                                           | Student life page, clubs page, newsletter                  |
| #32, #33 | Design system audit  | Review `once-ui` and `daisyUI` pattern libraries. Audit current shared UI components against their APIs. Document any reusable patterns worth adopting (spacing scales, semantic class conventions). No code changes unless a clear gap is identified                      | Design documentation in `docs/design/`                     |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing

---

## PHASE 9 — Lottie Vector Animations

**Status:** 📦 Pending
**Scope:** Lightweight vector animation player, micro-animations
**Effort:** Medium | **Risk:** Low (JSON assets, no heavy runtime) | **Estimated commits:** 2

| #   | Catalog Element                    | Plan                                                                                                                                                                                                                                                                                                              | Integration Point                                |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| #11 | `@lottiefiles/react-lottie-player` | Install `@lottiefiles/react-lottie-player`. Source 5-6 free education Lottie animations (school badge, graduation cap, book opening, science flask, sports medal, community heart). Replace existing CSS SVG error illustration with a clean Lottie animation. Add loading spinner animation (school crest pulse) | Error pages, loading states, achievement badges  |
| #40 | `micro-lottie-react`               | Install `micro-lottie-react` (1.5KB). Use for micro-animations where full Lottie player is overkill: animated icons (bell notification, calendar reminder), button loading states, inline decorative animations                                                                                                   | Icon buttons, notifications, form submit buttons |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing

---

## PHASE 10 — Accessibility Infrastructure

**Status:** 📦 Pending
**Scope:** Live region management, dev-time a11y checker
**Effort:** Medium | **Risk:** Low (dev-only tooling) | **Estimated commits:** 2

| #   | Catalog Element   | Plan                                                                                                                                                                                                                                                | Integration Point                                         |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| #23 | `react-aria-live` | Install `react-aria-live`. Replace custom RouteAnnouncer with more robust `<LiveAnnouncer>` + `<LiveMessage>`. Add live region announcements for: search results count, form validation summary, events calendar navigation, gallery filter changes | RouteAnnouncer replacement, search overlay, forms, events |
| #24 | `compa11y`        | Install `@compa11y/react` as dev-dependency. Add `<Compa11yProvider>` to layout (conditionally rendered in development). Provides visual overlay of a11y issues during local dev — complements jest-axe in tests                                    | Root layout (dev only), developer documentation           |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing, no runtime impact in production

---

## PHASE 11 — Content Management

**Status:** 📦 Pending (partially blocked)
**Scope:** Git-based CMS, VSCode content editor
**Effort:** High | **Risk:** High (architectural change) | **Estimated commits:** 5-8

| #   | Catalog Element    | Plan                                                                                                                                                                                                                                                                                          | Integration Point                                    |
| --- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| #26 | `Front Matter CMS` | **Immediate.** Install VSCode extension. Create `.frontmatter/` config. Define content types: news articles, events, staff profiles, page content, hero slides. Audit `src/domains/` data files — identify which are CMS candidates vs truly static. Start with news articles (highest churn) | `src/domains/news/`, `.frontmatter/`, developer docs |
| #25 | `TinaCMS`          | **Conditional** — blocked until https://github.com/tinacms/tinacms/discussions/6492 resolves (Next.js 16 support). Once available: migrate from Front Matter to TinaCMS for visual editing. Non-technical staff can edit all content through a visual interface                               | All content domains, admin route                     |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing, build successful

---

## PHASE 12 — Seasonal & Festive Effects

**Status:** 📦 Pending
**Scope:** Weather effects, seasonal themes
**Effort:** Low | **Risk:** Low (opt-in, gated) | **Estimated commits:** 2

| #   | Catalog Element         | Plan                                                                                                                                                                                                                                                                              | Integration Point                        |
| --- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| #45 | `react-snowfall-effect` | Install `react-snowfall-effect`. Add snowfall effect to Christmas celebrations page. Gate behind `prefers-reduced-motion` + manual toggle. Only active Dec 15 – Jan 5 (check `new Date()`)                                                                                        | Annual Day page, Christmas page (future) |
| #46 | `seasonalfx`            | Install `seasonalfx`. Add multi-season effects: monsoon rain (June-Sep, Goa-appropriate), festive Diwali lights (Oct-Nov), Christmas snow (Dec). Create `features/seasons/seasonal-overlay.tsx` with date-gated activation. Lazy-loaded — zero bundle cost on non-seasonal visits | Site-wide overlay, season config         |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing, zero runtime cost when effects aren't active

---

## PHASE 13 — Form Hardening & Compliance

**Status:** 📦 Pending
**Scope:** Schema validation, cookie consent, GDPR
**Effort:** Medium | **Risk:** Medium (legal compliance) | **Estimated commits:** 3

| #        | Catalog Element           | Plan                                                                                                                                                                                                                                                                                      | Integration Point                |
| -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| #28      | `react-hook-form` + `zod` | Zod already installed for server-side validation. Install `react-hook-form` + `@hookform/resolvers`. Refactor ContactForm from `useActionState` to `useForm` with Zod resolver. Benefits: field-level validation before submit, better a11y (aria-describedby linking), controlled inputs | Contact form, any future forms   |
| #49      | `c15t/react`              | Install `@c15t/react`. Add GDPR-compliant cookie consent banner. Wire into Vercel Analytics (already installed) — only load analytics after consent. Granular categories: necessary, analytics, marketing                                                                                 | Root layout, analytics providers |
| #51, #56 | Cookie alternatives       | Evaluate `open-cookie-consent-banner` and `@cookiekit/react-cookie-manager` as lighter alternatives to c15t. Pick the best fit during implementation                                                                                                                                      | Root layout                      |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing, consent banner visible on first visit

---

## PHASE 14 — Advanced 3D Scenes

**Status:** 📦 Pending
**Scope:** Interactive Spline→R3F, 3D book carousel, infinite library
**Effort:** High | **Risk:** High (performance, bundle size) | **Estimated commits:** 3

| #   | Catalog Element          | Plan                                                                                                                                                                                                                                                                                                          | Integration Point                                  |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| #2  | `@splinetool/r3f-spline` | Already installed as peer of `@splinetool/react-spline`. Replace current Spline scene (passive background) with an interactive R3F scene: clickable buildings that navigate, hover highlights on sports ground/auditorium, animated school crest. Create custom Spline scene in Spline editor → export to R3F | Homepage hero (upgrade from passive → interactive) |
| #30 | `book-slider-3d`         | Clone/fork `shreejai/book-slider-3d` into `features/library/`. Adapt for school library — "Featured Books" carousel with 3D book rotation. Add to library page. Lazy-loaded, SSR fallback: static book card grid                                                                                              | Library page                                       |
| #31 | `TheInfiniteLibrary3D`   | Clone/fork `Xallt/TheInfiniteLibrary3D` into `features/library/`. Add as library page hero background — procedurally generated 3D library shelves that extend infinitely. Lazy-loaded behind IntersectionObserver. SSR fallback: gradient background                                                          | Library page hero                                  |

**Gate expectations:** 0 type errors, 0 lint errors, all tests passing, bundle budget enforced per-page

---

## PHASE 15 — Final Quality Gate

**Status:** 📦 Pending
**Scope:** Comprehensive audit across all domains
**Effort:** Medium-High | **Risk:** Discovery-driven | **Estimated commits:** 3-5

| #   | Catalog Element            | Plan                                                                                                                                                                             | Integration Point            |
| --- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| #57 | `glide-data-grid`          | **Conditional** — only if a database-backed staff/alumni directory is added. Not applicable for current static-data architecture                                                 | Future staff/alumni database |
| —   | Accessibility audit        | Run `@axe-core/playwright` across all 46 routes. Fix all violations. Run manual keyboard-navigation test. Verify screen reader announcements on VoiceOver/NVDA                   | All routes, CI pipeline      |
| —   | Bundle size audit          | Run `@next/bundle-analyzer`. Set per-page budget: 1MB JS total (including lazy chunks), 250KB first-load JS. Audit Phases 3-14 additions. Optimize or defer any over-budget page | All routes, CI pipeline      |
| —   | Lighthouse audit           | Target 95+ on all scores (Performance, Accessibility, Best Practices, SEO). Address any sub-95 score                                                                             | All routes                   |
| —   | Cross-browser verification | Test Chrome, Firefox, Safari, Edge. Verify: Spline rendering, globe WebGL, CSS subgrid fallbacks, View Transitions API fallback                                                  | All routes                   |
| —   | CI/CD hardening            | Ensure all gates run in CI: typecheck → lint → test → build. Add Lighthouse CI for performance regression detection                                                              | CI pipeline                  |

**Gate expectations:** 100/100 Lighthouse, 0 a11y violations, all pages under bundle budget

---

---

## PHASE DEPENDENCY MAP

```
Phase 1 ────► Phase 2 ────┬────► Phase 3 ──► Phase 5 ──► Phase 6 ──► Phase 7
                          │         │
                          │         └────► Phase 4 (multimedia, no dep on 3)
                          │
                          ├────► Phase 8 (illustrations, standalone)
                          │
                          ├────► Phase 9 (Lottie, standalone)
                          │
                          ├────► Phase 10 (a11y, depends on phases 3-9 being complete for audit)
                          │
                          ├────► Phase 11 (CMS, standalone — but tests content from all phases)
                          │
                          ├────► Phase 12 (seasonal, standalone)
                          │
                          ├────► Phase 13 (forms+compliance, standalone)
                          │
                          ├────► Phase 14 (advanced 3D, depends on R3F from Phase 2)
                          │
                          └────► Phase 15 (final gate, depends on ALL phases)
```

**Parallelizable:** Phases 3, 4, 8, 9, 12, 13 can run in parallel (no cross-dependencies).
**Sequential:** Phase 5 → Phase 6 → Phase 7 (each builds on previous layout/data work).
**Gate:** Phase 10 (a11y audit) and Phase 15 (final gate) must run after all content phases.

---

## COMPLETION SUMMARY

| Phase                                | Elements                            | Status                    | Commits        |
| ------------------------------------ | ----------------------------------- | ------------------------- | -------------- |
| 1 — Foundation & Polish              | 7 implemented, 0 remaining          | ✅ DONE                   | 7              |
| 2 — Motion Engine & 3D Core          | 5 implemented, 1 blocked, 1 skipped | ✅ DONE                   | 6              |
| 3 — Atmosphere & Micro-Interactions  | 7 pending                           | 📦                        | —              |
| 4 — Multimedia & Rich Documents      | 4 pending                           | 📦                        | —              |
| 5 — Navigation & Layout Engineering  | 3 pending                           | 📦                        | —              |
| 6 — Performance & Data Visualization | 3 pending                           | 📦                        | —              |
| 7 — Maps & Geography                 | 2 pending                           | 📦                        | —              |
| 8 — Illustrations & Brand Polish     | 3 pending                           | 📦                        | —              |
| 9 — Lottie Vector Animations         | 2 pending                           | 📦                        | —              |
| 10 — Accessibility Infrastructure    | 2 pending                           | 📦                        | —              |
| 11 — Content Management              | 2 pending (1 blocked)               | 📦                        | —              |
| 12 — Seasonal & Festive              | 2 pending                           | 📦                        | —              |
| 13 — Form Hardening & Compliance     | 3 pending                           | 📦                        | —              |
| 14 — Advanced 3D Scenes              | 3 pending                           | 📦                        | —              |
| 15 — Final Quality Gate              | 1 conditional, 5 audits             | 📦                        | —              |
| **Resolved as redundant**            | **10**                              | **🔴**                    | **—**          |
| **TOTAL**                            | **60**                              | **12/15 phases complete** | **13 commits** |
