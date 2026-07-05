# 50+ Open-Source Design Elements — Research Catalog

> Research date: 2026-07-05 | For: St. Elizabeth's High School Website
> Goal: Identify open-source projects, libraries, 3D components, and design elements
> that can be integrated into the codebase to enhance the site's visual quality,
> interactivity, and user experience.

---

## CATALOG

---

### 1. `@splinetool/react-spline` — Embed Spline 3D Scenes in React

**Category:** 3D / Interactive Hero

**Source:** https://github.com/splinetool/react-spline
**NPM:** `@splinetool/react-spline` | **License:** MIT | **Stars:** 2k+

**What it does:** Renders Spline 3D scenes directly in React with full interactivity — mouse orbit, zoom, scene events. Spline scenes are exported as `.spline` files or hosted on Spline's CDN.

**Integration plan:**

- **Homepage hero background**: Replace static hero images with an interactive 3D school campus scene that rotates/zooms as the user moves their mouse.
- **About page**: 3D visualization of "our journey" — floating timeline elements.
- **Admissions page**: Interactive 3D campus tour teaser.
- **Beyond Academics**: Sports ground, auditorium, or lab 3D preview.

**Bundle impact:** ~200KB (Three.js runtime). Already lazy-loadable with `next/dynamic`.

**Spline Community scenes found:**

- **"AI Education"** — community.spline.design/file/23e9e4ac — futuristic education theme
- **"Class: Second Lesson"** — community.spline.design/file/c255c957 — classroom scene
- **"Interactive Workspace"** — community.spline.design/file/d1feeb50 — desk/workspace
- **"Interactive Parallax Scene"** — community.spline.design/file/bba57dea — parallax 3D
- **"Free Spline Hero Scene"** — contra.com/community/o9HDZAiu — ready-to-use hero

---

### 2. `@splinetool/r3f-spline` — Spline → React Three Fiber

**Category:** 3D / React Three Fiber Integration

**Source:** https://github.com/splinetool/r3f-spline
**NPM:** `@splinetool/r3f-spline` | **License:** MIT

**What it does:** Converts Spline scenes into React Three Fiber components, giving full programmatic control — animate individual objects, handle click events on specific elements, change materials at runtime.

**Integration plan:** Use when you need fine-grained control (e.g., clicking on a 3D building to navigate to its page, highlighting sports facilities on hover).

---

### 3. `@appletosolutions/reactbits` — 80+ Animation Components

**Category:** Animation Library (Comprehensive)

**Source:** https://github.com/appletosolutions/reactbits
**NPM:** `@appletosolutions/reactbits` | **License:** MIT

**What it does:** Production-ready animation components organized into Text, Interaction, Background, Layout, and 3D categories. TypeScript-first, tree-shakeable, 50KB core.

**Key components relevant to St. Elizabeth's:**

| Component           | Use Case                                                                     |
| ------------------- | ---------------------------------------------------------------------------- |
| **SplitText**       | Hero headline animation — "St. Elizabeth's" animates letter by letter        |
| **BlurText**        | Soft-reveal text on scroll for section headings                              |
| **ShinyText**       | "Admissions Open" announcement shimmer effect                                |
| **GradientText**    | Color-gradient text for key statistics                                       |
| **DecryptedText**   | "Hacker-reveal" animation for mission statement                              |
| **CountUp**         | CounterBar replacements — animated stat counters (already have NumberTicker) |
| **Aurora**          | Hero-section background — Northern Lights effect in school colors            |
| **Particles**       | Subtle background particles on Achievement/History pages                     |
| **MetaBalls**       | Organic blobs for Beyond Academics creative sections                         |
| **Carousel**        | Alternative to Embla for testimonials gallery                                |
| **FlowingMenu**     | Creative menu overlay replacement                                            |
| **CircularGallery** | Photo gallery in circular reveal pattern                                     |
| **FlyingPosters**   | 3D poster/animation for events page                                          |
| **Ballpit**         | Playful 3D ball pit — student life section                                   |
| **AnimatedList**    | Staggered list animation for staff directory, club lists                     |
| **ImageTrail**      | Mouse-follow image trail on gallery page                                     |
| **ClickSpark**      | Spark particles on click — tiny delightful touch                             |
| **InfiniteScroll**  | Replace marquee/CSS animation for logos, achievements strip                  |

**Bundle impact:** 50KB core + per-component. Tree-shakeable (only what you import ships).

---

### 4. `motion` (FKA Framer Motion) — Core Animation Engine

**Category:** Animation Engine

**Source:** https://motion.dev/ | **NPM:** `motion` | **License:** MIT

**What it does:** Declarative animation library for React. Handles layout animations, gestures (drag, hover, tap), scroll-linked animations, and SVG path morphing. Built-in server-side rendering support.

**Key features for St. Elizabeth's:**

- **Motion Ticker** — `<Ticker>` component for infinite scroll marquees (news ticker, achievement strip)
- **Motion Typewriter** — `<Typewriter>` for animated text reveal
- **Motion AnimateNumber** — `<AnimateNumber>` for animated counters
- **Stagger** — orchestrated children animations for list reveals
- **Scroll-triggered** — `whileInView` for section entrance animations
- **Custom Cursor** — cursor trail/follower effect
- **Layout animations** — auto-animate between layout states

---

### 5. `react-globe.gl` — Interactive 3D Globe

**Category:** 3D / Data Visualization

**Source:** https://github.com/vasturiano/react-globe.gl
**NPM:** `react-globe.gl` | **License:** MIT | **Stars:** 2k+

**What it does:** Renders an interactive 3D globe with Three.js. Supports markers, arcs, heatmaps, and custom textures.

**Integration plan:**

- **Contact / Location page**: Replace static map with a rotating 3D globe, with a glowing marker on Goa, India.
- **"Our Reach" section**: Show where alumni are located worldwide with arc lines from Goa.
- **Educational tours page**: Show past tour destinations on the globe.

**Bundle impact:** ~400KB (Three.js + globe data). Must be dynamically imported.

---

### 6. `react-compare-slider` — Before/After Image Slider

**Category:** Image Comparison / Interactive

**Source:** https://github.com/nerdyman/react-compare-slider
**NPM:** `react-compare-slider` | **License:** MIT | **Stars:** 500+

**What it does:** A draggable slider that reveals one image over another.

**Integration plan:**

- **Campus Then & Now page**: Already have `CampusThenNow` component — replace custom implementation with this polished library.
- **Infrastructure page**: Before/after of renovated facilities.

---

### 7. `img-comparison-slider` — Vanilla Web Component (Lightweight)

**Category:** Image Comparison (Lightweight Alternative)

**Source:** https://github.com/sneas/img-comparison-slider
**NPM:** `img-comparison-slider` | **License:** MIT | **Stars:** 700+

**What it does:** A framework-agnostic web component for before/after image comparison. ~5KB.

**Integration plan:** Lightweight alternative for the Campus Then & Now section.

---

### 8. `flipbookjs/react-flipbook` — PDF/Magazine Flipbook Viewer

**Category:** Document Viewer

**Source:** https://github.com/flipbookjs/react-flipbook
**NPM:** `react-flipbook` | **License:** MIT

**What it does:** Renders PDFs or image sets as an interactive 3D flipbook with realistic page-turn animations.

**Integration plan:**

- **Newsletter archive**: School newsletters as a digital flipbook.
- **School magazine**: Annual magazine as an interactive flipbook.
- **Prospectus**: Admissions prospectus as a beautiful digital flipbook.

---

### 9. `react-player` — Universal Media Player

**Category:** Video / Audio Player

**Source:** https://github.com/cookpete/react-player
**NPM:** `react-player` | **License:** MIT | **Stars:** 9k+

**What it does:** Plays videos from YouTube, Vimeo, Facebook, Twitch, SoundCloud, and direct URLs.

**Integration plan:**

- **Video gallery page**: Replace or enhance the existing video gallery.
- **Hero background video**: Muted autoplay background videos instead of static images.
- **Testimonial videos**: Embed parent/student testimonial videos.

---

### 10. `react-h5-audio-player` — Audio Player

**Category:** Audio Player

**Source:** https://github.com/lhz516/react-h5-audio-player
**NPM:** `react-h5-audio-player` | **License:** MIT | **Stars:** 800+

**What it does:** Beautiful, customizable HTML5 audio player for React. Supports playlists.

**Integration plan:**

- **School anthem page**: Play the school anthem with a beautiful player.
- **Cultural activities page**: Audio samples from school events.
- **Motto & Anthem page**: Listen to the school song.

---

### 11. `@lottiefiles/react-lottie-player` — Lottie Animation Player

**Category:** Vector Animation

**Source:** https://github.com/mifi/react-lottie-player
**NPM:** `@lottiefiles/react-lottie-player` | **License:** MIT

**What it does:** Plays Lottie (JSON-based vector) animations with full control — play, pause, loop, speed.

**Integration plan:**

- **Loading/transition animations**: School crest animated on page load.
- **Empty states**: Playful illustrations for 404, no results.
- **Achievement badges**: Animated badges for student achievements.
- **Celebration moments**: Confetti/animation on admissions "thank you" page.

---

### 12. `tsParticles` — Particle Effects Engine

**Category:** Particle Effects / Backgrounds

**Source:** https://github.com/tsparticles/tsparticles
**NPM:** `@tsparticles/react` | **License:** MIT | **Stars:** 7k+

**What it does:** Highly configurable particle system — confetti, snow, fireworks, stars, bubbles, and custom shapes.

**Integration plan:**

- **Celebration page** (admissions accepted): Confetti burst.
- **Annual Day / Sports Day pages**: Festive particles.
- **Hero background**: Subtle floating particles in school colors.
- **404 page**: Playful particle effects.

---

### 13. `partycles` — Beautiful Particle Animations for React

**Category:** Particle Effects (Lightweight)

**Source:** https://github.com/jonathanleane/partycles
**NPM:** `partycles` | **License:** MIT

**What it does:** Pre-built beautiful particle animations that are dead-simple to use.

**Integration plan:** Quick particle effects for special pages — events, celebrations.

---

### 14. `react-fast-marquee` — Infinite Scrolling Marquee

**Category:** Marquee / Ticker

**Source:** https://github.com/justin-chu/react-fast-marquee
**NPM:** `react-fast-marquee` | **License:** MIT | **Stars:** 800+

**What it does:** Smooth, GPU-accelerated infinite scrolling marquee.

**Integration plan:**

- **Announcement bar replacement**: Smoother than current CSS animation.
- **Achievement ticker**: Scrolling strip of student achievements.
- **Partner/sponsor logos**: Scrolling logo bar.
- **News headlines ticker**: On homepage or news page.

---

### 15. `react-share` — Social Media Share Buttons

**Category:** Social Sharing

**Source:** https://github.com/nygardk/react-share
**NPM:** `react-share` | **License:** MIT | **Stars:** 2.5k+

**What it does:** 20+ social share buttons (Facebook, Twitter/X, WhatsApp, LinkedIn, Email, etc.) with zero dependencies.

**Integration plan:**

- **News article pages**: Share buttons at the bottom of each article.
- **Events pages**: "Share this event" buttons.
- **Photo gallery**: Share individual photos.

---

### 16. `react-error-boundary` — Error Boundary Helper

**Category:** Error Handling

**Source:** https://github.com/bvaughn/react-error-boundary
**NPM:** `react-error-boundary` | **License:** MIT | **Stars:** 6k+

**What it does:** Provides `<ErrorBoundary>` with `FallbackComponent`, `onError`, `onReset`, and `resetKeys` props.

**Integration plan:** Replace or enhance the existing `error.tsx` files with better fallback UIs using react-error-boundary's reset functionality.

---

### 17. `react-hot-toast` — Toast Notifications

**Category:** Notifications

**Source:** https://react-hot-toast.com/
**NPM:** `react-hot-toast` | **License:** MIT | **Stars:** 9k+

**What it does:** Beautiful, customizable toast notifications. Supports promise-based toasts, custom icons, and positioning.

**Integration plan:**

- **Contact form submission**: Success/error toast (replaces current ToastProvider).
- **Newsletter signup**: Confirmation toast.
- **Admissions form**: Progress/success notifications.

---

### 18. `react-parallax-tilt` — 3D Tilt Hover Effect

**Category:** 3D Hover Effect

**Source:** https://github.com/mkosir/react-parallax-tilt
**NPM:** `react-parallax-tilt` | **License:** MIT | **Stars:** 1k+

**What it does:** Adds 3D tilt effect on hover — the card/element tilts based on mouse position, with glare and shadow effects.

**Integration plan:**

- **Faculty/staff cards**: 3D tilt on hover for staff profile cards.
- **Achievement cards**: Tilt effect on achievement cards.
- **Program cards**: Interactive hover for academics program cards.
- **Photo gallery thumbnails**: Subtle tilt on hover.

---

### 19. `react-virtuoso` — Virtualized Lists

**Category:** Performance / Lists

**Source:** https://github.com/petyosi/react-virtuoso
**NPM:** `react-virtuoso` | **License:** MIT | **Stars:** 5k+

**What it does:** Virtualized list rendering — only renders items visible in the viewport.

**Integration plan:**

- **Staff directory page**: Smooth scrolling through 100+ staff entries.
- **Alumni directory**: Large list of alumni.
- **News archive**: Long list of news articles.

---

### 20. `FullCalendar` — Event Calendar

**Category:** Calendar / Events

**Source:** https://fullcalendar.io/
**NPM:** `@fullcalendar/react` | **License:** MIT (core)

**What it does:** Full-featured calendar with month/week/day views, event rendering, and drag-drop.

**Integration plan:**

- **Events page**: Interactive calendar showing upcoming school events.
- **Academic calendar**: Term dates, exam schedules, holidays.
- **Sports calendar**: Match schedules, practice times.

---

### 21. `qrcode.react` — QR Code Generator

**Category:** Utility

**Source:** https://github.com/zpao/qrcode.react
**NPM:** `qrcode.react` | **License:** ISC | **Stars:** 2k+

**What it does:** Renders QR codes as React components (SVG or Canvas). Tiny (~3KB).

**Integration plan:**

- **Contact page**: QR code that encodes the school's contact vCard.
- **Admissions page**: QR code linking to the admissions portal.
- **Location page**: QR code for Google Maps directions.

---

### 22. `unDraw` — Open-Source SVG Illustrations

**Category:** Illustrations

**Source:** https://undraw.co/ | **NPM:** `react-open-doodles`, `iblis-react-undraw`
**License:** MIT (illustrations are free for any use)

**What it does:** 1000+ beautiful, customizable SVG illustrations. Education, teamwork, learning, graduation — all covered.

**Integration plan:**

- **404 page**: Friendly "lost student" illustration.
- **Empty state for search**: "No results found" illustration.
- **Mission page**: Illustrations representing values.
- **Admissions**: "Welcome to the family" illustration.

---

### 23. `react-aria-live` — Screen Reader Live Region

**Category:** Accessibility

**Source:** https://github.com/AlmeroSteyn/react-aria-live
**NPM:** `react-aria-live` | **License:** MIT

**What it does:** Manages ARIA live regions for dynamically announcing content changes to screen readers.

**Integration plan:** Enhance existing `RouteAnnouncer` with more robust live region management.

---

### 24. `compa11y` — Accessibility Testing in Dev

**Category:** Accessibility / Developer Tooling

**Source:** https://github.com/trajkovskiivan/compa11y
**NPM:** `@compa11y/react` | **License:** MIT

**What it does:** In-development accessibility checker that overlays issues on your UI.

**Integration plan:** Add as a dev-dependency. Provides visual feedback during development alongside jest-axe in tests.

---

### 25. `TinaCMS` — Git-Based Headless CMS

**Category:** Content Management

**Source:** https://tina.io/
**NPM:** `tinacms` | **License:** Apache 2.0 | **Stars:** 12k+

**What it does:** Visual editing experience for Markdown/MDX content, committed directly to Git.

**Integration plan:** Replace hardcoded `src/data/` content with Tina-managed Markdown files. Non-technical staff can edit news, events, staff directory, page content, hero content.

---

### 26. `Front Matter CMS` — VSCode Content Editor

**Category:** Content Management (Lighter Alternative)

**Source:** https://frontmatter.codes/
**License:** MIT | **Stars:** 2k+

**What it does:** A CMS that lives inside VSCode. Edit Markdown frontmatter with a visual UI. Zero runtime dependency.

**Integration plan:** Ultra-lightweight CMS option. Staff edits content in VSCode, commits to Git, triggers rebuild.

---

### 27. `react-countup` — Animated Number Counters

**Category:** Number Animation

**Source:** https://github.com/glennreyes/react-countup
**NPM:** `react-countup` | **License:** MIT | **Stars:** 2k+

**What it does:** Animates numbers counting up from 0 to target with duration control, easing, formatting.

**Integration plan:** Enhance/replace `NumberTicker`/`CounterBar` — student enrollment, years established, alumni count.

---

### 28. `react-hook-form` + `@hookform/resolvers` + `zod` — Form Validation Stack

**Category:** Forms

**Source:** https://github.com/react-hook-form/react-hook-form
**NPM:** `react-hook-form`, `zod`, `@hookform/resolvers` | **License:** MIT

**What it does:** Performant, type-safe form handling with Zod schema validation.

**Integration plan:** Enhance the existing contact form with Zod validation, field-level errors, server-side validation, and better a11y annotations.

---

### 29. `react-three-fiber` + `@react-three/drei` — Three.js for React

**Category:** 3D Rendering

**Source:** https://github.com/pmndrs/react-three-fiber
**NPM:** `@react-three/fiber`, `@react-three/drei` | **License:** MIT | **Stars:** 27k+

**What it does:** Declarative Three.js in React. Drei provides 100+ helpers.

**Integration plan:** Foundation for advanced 3D beyond Spline — custom school crest, interactive 3D timeline, 3D library visualization.

---

### 30. `shreejai/book-slider-3d` — 3D Book Carousel

**Category:** 3D / Education-Themed

**Source:** https://github.com/shreejai/book-slider-3d
**License:** Open Source

**What it does:** A 3D book slider/carousel rendered with Three.js.

**Integration plan:** Library page — "Featured Books" section with 3D book carousel.

---

### 31. `Xallt/TheInfiniteLibrary3D` — Infinite 3D Library

**Category:** 3D / Education-Themed

**Source:** https://github.com/Xallt/TheInfiniteLibrary3D
**License:** Open Source

**What it does:** An infinite, procedurally generated 3D library scene.

**Integration plan:** Library page hero background — "Our Library" with an infinite library visual.

---

### 32. `once-ui` — Open-Source Design System

**Category:** Design System

**Source:** https://once-ui.com/
**License:** MIT

**What it does:** A complete design system with React components, built for indie creators. Clean, modern aesthetic.

**Integration plan:** Reference for design patterns — spacing, typography, component API design.

---

### 33. `daisyUI` — CSS Component Library

**Category:** CSS Framework

**Source:** https://daisyui.com/
**NPM:** `daisyui` | **License:** MIT | **Stars:** 35k+

**What it does:** Tailwind CSS component library — semantic class names for common UI patterns.

**Integration plan:** Design reference for component patterns and semantic class naming conventions.

---

### 34. `next-view-transitions` — Page Transition Animations

**Category:** Page Transitions

**Source:** https://github.com/shuding/next-view-transitions
**NPM:** `next-view-transitions` | **License:** MIT

**What it does:** Smooth page transitions using the View Transitions API (Chrome) with a fallback.

**Integration plan:** Add cross-fade transitions between pages — navigating from Home → About feels smooth.

---

### 35. `react-sticky-kit` — Sticky Elements

**Category:** Layout / Scroll

**Source:** https://github.com/oe/react-sticky-kit
**NPM:** `react-sticky-kit` | **License:** MIT

**What it does:** Makes elements sticky with awareness of boundaries and stacked stickies.

**Integration plan:**

- **Table of contents sidebar**: Sticky TOC on long content pages.
- **Filter/action bar**: Sticky bar on photo gallery, events pages.

---

### 36. `floating-ui` — Tooltips, Popovers, Dropdowns

**Category:** Positioning

**Source:** https://floating-ui.com/
**NPM:** `@floating-ui/react` | **License:** MIT | **Stars:** 30k+

**What it does:** Low-level positioning engine for floating elements — handles collision detection, viewport awareness.

**Integration plan:**

- **Tooltips**: Hover tooltips on navigation items, icons, abbreviations.
- **Popovers**: Rich hover cards for staff profiles.
- **Dropdown**: Enhanced dropdown menus for navigation.

---

### 37. `react-simple-maps` — SVG Map Component

**Category:** Maps (Lightweight)

**Source:** https://github.com/zcreativelabs/react-simple-maps
**NPM:** `react-simple-maps` | **License:** MIT | **Stars:** 3k+

**What it does:** SVG-based choropleth maps. No heavy map tile dependencies.

**Integration plan:**

- **"Our Reach"**: Map of India with Goa highlighted.
- **Alumni map**: Where alumni are now — India map with city dots.
- **Educational tours**: India/world map with tour destinations marked.

---

### 38. `pure-react-carousel` — Carousel Alternative

**Category:** Carousel

**Source:** https://github.com/express-labs/pure-react-carousel
**NPM:** `pure-react-carousel` | **License:** MIT | **Stars:** 1.5k+

**What it does:** A pure React carousel with no external CSS dependency.

**Integration plan:** Alternative to Embla carousel for testimonials, photo gallery thumbnails, events preview.

---

### 39. `react-tabs` — Accessible Tab Component

**Category:** Tabs

**Source:** https://github.com/reactjs/react-tabs
**NPM:** `react-tabs` | **License:** MIT | **Stars:** 3k+

**What it does:** Accessible, keyboard-navigable tab component following WAI-ARIA patterns.

**Integration plan:**

- **Academics page**: Tab between curriculum, teaching methods, facilities.
- **Staff directory**: Tab by department.
- **Events**: Tab by category (sports, cultural, academic).

---

### 40. `micro-lottie-react` — Ultra-Light Lottie Player

**Category:** Vector Animation (Lightweight)

**Source:** https://github.com/mucahitgurbuz/micro-lottie-react
**NPM:** `micro-lottie-react` | **License:** MIT

**What it does:** Smallest possible Lottie player (~1.5KB).

**Integration plan:** Tiny animation inserts — animated icons, loading spinners, micro-interactions.

---

### 41. `react-awesome-reveal` — Scroll Reveal Library

**Category:** Scroll Animation

**Source:** https://react-awesome-reveal.morello.dev/
**NPM:** `react-awesome-reveal` | **License:** MIT | **Stars:** 1.5k+

**What it does:** Declarative scroll reveal animations — Fade, slide, zoom, flip.

**Integration plan:** Replace/augment existing `ScrollReveal` with more animation varieties.

---

### 42. `@tsparticles/preset-confetti` — Confetti & Celebration Effects

**Category:** Celebration Effects

**Source:** https://github.com/tsparticles/tsparticles (confetti preset)
**NPM:** `@tsparticles/react`, `@tsparticles/preset-confetti`

**What it does:** Confetti cannon, fireworks, and celebration bursts.

**Integration plan:**

- **Admissions "Thank You" page**: Confetti burst after form submission.
- **Achievements page**: Subtle celebration on page load.

---

### 43. `react-kino` — Cinematic Animation Library

**Category:** Cinematic Effects

**Source:** https://github.com/lancaster215/react-kino
**NPM:** `react-kino` | **License:** MIT

**What it does:** Cinematic-grade animations — letterboxing, fade-to-black, dramatic reveals. Built on Motion.

**Integration plan:** Cinematic intro sequence for the homepage — "letterbox" reveal of the hero section.

---

### 44. `scrollmeter` — Scroll Progress Bar

**Category:** Reading Progress

**Source:** https://github.com/freechird2/scrollmeter
**NPM:** `scrollmeter` | **License:** MIT

**What it does:** A thin progress bar at the top of the page showing scroll/reading progress.

**Integration plan:**

- **News articles**: Reading progress bar.
- **Long content pages**: Indicate scroll position.

---

### 45. `react-snowfall-effect` — Snowfall Effect

**Category:** Weather / Seasonal Effect

**Source:** https://github.com/namnguyenthanhwork/react-snowfall-effect
**NPM:** `react-snowfall-effect` | **License:** MIT

**What it does:** Beautiful snowfall effect overlaying the page.

**Integration plan:**

- **Christmas/Annual Day page**: Festive snowfall.
- **Winter events**: Seasonal touches.

---

### 46. `seasonalfx` — Multi-Season Effects

**Category:** Seasonal Effects

**Source:** https://github.com/NishikantaRay/seasonalfx
**NPM:** `seasonalfx` | **License:** MIT

**What it does:** Multiple seasonal effects — snow, rain, autumn leaves, cherry blossoms.

**Integration plan:** Seasonal website themes — different effects based on time of year (festival, monsoon season in Goa).

---

### 47. `next-transition-router` — Smooth Client-Side Navigation

**Category:** Navigation Transitions

**Source:** https://github.com/ismamz/next-transition-router
**NPM:** `next-transition-router` | **License:** MIT

**What it does:** Page transition animations during Next.js App Router navigation. Exit animations on current page before new page enters.

**Integration plan:** Smooth cross-fade or slide transitions between all pages — elevates perceived quality to "premium site" level.

---

### 48. `react-doc-viewer` — Multi-Format Document Viewer

**Category:** Document Viewer

**Source:** https://github.com/mehuljariwala/react-doc-viewer
**NPM:** `react-doc-viewer` | **License:** MIT

**What it does:** Renders PDF, DOCX, XLSX, PPTX, images, and videos in a unified viewer.

**Integration plan:**

- **Resource room page**: View/downloadable documents previewed inline.
- **Admissions page**: View prospectus, forms inline.

---

### 49. `c15t/react` — Consent Management / Cookie Banner

**Category:** Compliance

**Source:** https://github.com/c15t/c15t
**NPM:** `@c15t/react` | **License:** MIT

**What it does:** GDPR-compliant cookie consent banner with granular consent controls.

**Integration plan:** If the site adds analytics (GA4, etc.), add a proper consent banner.

---

### 50. `react-animated-counter` — Odometer-Style Counter

**Category:** Counter Animation

**Source:** https://www.npmjs.com/package/react-animated-counter
**NPM:** `react-animated-counter` | **License:** MIT

**What it does:** Number counter with old-school odometer flip animation style.

**Integration plan:** Alternative to NumberTicker for stat counters — the flip animation gives a more tactile feel.

---

### 51. `open-cookie-consent-banner` — Cookie Banner (Lightweight)

**Category:** Compliance

**Source:** https://github.com/yhauxell/open-cookie-consent-banner
**License:** MIT

**What it does:** Minimal, framework-agnostic cookie consent banner. Zero dependencies.

**Integration plan:** Lightweight cookie consent for analytics integration.

---

### 52. `react-open-doodles` — Hand-Drawn SVG Illustrations

**Category:** Illustrations

**Source:** https://github.com/lunahq/react-open-doodles
**NPM:** `react-open-doodles` | **License:** MIT

**What it does:** React components for Open Doodles — charming hand-drawn SVG illustrations by Pablo Stanley.

**Integration plan:**

- Student life page
- Clubs and activities
- "Page not found" / error pages
- Newsletter signup

---

### 53. `kanpai` / `notifyx` — Toast Notification Alternatives

**Category:** Notifications

**Source:** https://github.com/tigerabrodi/kanpai, https://github.com/awalhadi/notifyx
**NPM:** `kanpai`, `notifyx` | **License:** MIT

**What it does:** Alternative toast libraries with different visual styles and APIs.

**Integration plan:** Evaluate alongside react-hot-toast for the best fit with the school's design language.

---

### 54. `react-cursor-kit` — Custom Cursor Effects

**Category:** Micro-Interactions

**Source:** https://www.npmjs.com/package/@ri-dev/react-cursor-kit
**NPM:** `@ri-dev/react-cursor-kit` | **License:** MIT

**What it does:** Custom cursor trails, magnetic effects, and hover transitions.

**Integration plan:**

- **Homepage**: Custom cursor with school logo trail.
- **Interactive pages**: Magnetic hover on buttons, cards.

---

### 55. `react-tilt` — Lightweight Tilt Alternative

**Category:** 3D Hover

**Source:** https://github.com/gfazioli/react-tilt
**NPM:** `react-tilt` | **License:** MIT

**What it does:** A simpler, lighter alternative to react-parallax-tilt. ~5KB.

**Integration plan:** Use on staff cards, achievement cards — lighter footprint.

---

### 56. `react-cookie-manager` — Cookie Consent (React-First)

**Category:** Compliance

**Source:** https://github.com/cookiekit-io/react-cookie-manager
**NPM:** `@cookiekit/react-cookie-manager` | **License:** MIT

**What it does:** React-first cookie consent with granular category controls and callback hooks.

**Integration plan:** Proper cookie consent if analytics/3rd-party scripts are added.

---

### 57. `glide-data-grid` — High-Performance Data Grid

**Category:** Data Display

**Source:** https://github.com/royalcala/glide-data-grid
**NPM:** `@glideapps/glide-data-grid` | **License:** MIT

**What it does:** Canvas-rendered data grid — handles millions of rows.

**Integration plan:** If a large student/staff/alumni database page is added.

---

### 58. `react-masonry-virtualized` — Virtualized Masonry Gallery

**Category:** Gallery / Performance

**Source:** https://github.com/sooon-ai/react-masonry-virtualized
**NPM:** `react-masonry-virtualized` | **License:** MIT

**What it does:** Masonry layout with virtualization — handles thousands of images without DOM bloat.

**Integration plan:** Photo gallery with hundreds of images — smooth scrolling with masonry layout.

---

### 59. `echarts` / `recharts` — Chart Libraries

**Category:** Data Visualization

**Source:** https://github.com/apache/echarts, https://github.com/recharts/recharts
**NPM:** `echarts`, `recharts` | **License:** Apache 2.0 / MIT

**What it does:** Interactive charts — bar, line, pie, radar, heatmap, etc.

**Integration plan:**

- **About/Achievements page**: Visual stats — enrollment growth, exam results, sports achievements.
- **Infrastructure page**: "Our Growth" chart.

---

### 60. `react-page-transitioning` — Programmatic Page Transitions

**Category:** Page Transitions (Alternative)

**Source:** https://github.com/eddietindame/next-page-transitioning
**NPM:** `next-page-transitioning` | **License:** MIT

**What it does:** Page transition animations with full control — define enter/exit animations per route.

**Integration plan:** Alternative to next-transition-router — allows per-route animation customization.

---

## PRIORITY MATRIX

### TIER 1 — Immediate High Impact, Low Effort

| #     | Element                     | Where                               | Why                                  |
| ----- | --------------------------- | ----------------------------------- | ------------------------------------ |
| 1     | `@splinetool/react-spline`  | Homepage hero                       | Dramatic visual upgrade              |
| 12-13 | `tsParticles` / `partycles` | Hero backgrounds, celebration pages | Instant "wow" factor                 |
| 34    | `next-view-transitions`     | All pages                           | Smooth navigation elevates feel      |
| 18    | `react-parallax-tilt`       | Staff cards, achievement cards      | Subtle 3D polish                     |
| 15    | `react-share`               | News articles, events               | Social engagement                    |
| 6     | `react-compare-slider`      | Campus Then & Now                   | Polished replacement for custom code |
| 11    | Lottie animations           | Loading, empty states, badges       | Delightful micro-interactions        |

### TIER 2 — High Impact, Moderate Effort

| #   | Element                       | Where                    | Why                                        |
| --- | ----------------------------- | ------------------------ | ------------------------------------------ |
| 3   | `@appletosolutions/reactbits` | Multiple sections        | 80+ prebuilt animations                    |
| 4   | `motion` (Framer Motion)      | Foundation layer         | Replaces custom animation code             |
| 5   | `react-globe.gl`              | Location, Reach pages    | 3D globe with Goa marker                   |
| 20  | `FullCalendar`                | Events page              | Structured event display                   |
| 17  | `react-hot-toast`             | Contact form, newsletter | Better feedback than current ToastProvider |
| 29  | `react-three-fiber` + Spline  | Advanced 3D scenes       | Custom 3D beyond premade Spline scenes     |
| 25  | `TinaCMS`                     | All content pages        | Non-technical editing                      |

### TIER 3 — Specialized Use Cases

| #   | Element                     | Where                           | Why                                     |
| --- | --------------------------- | ------------------------------- | --------------------------------------- |
| 8   | `flipbookjs/react-flipbook` | Newsletter, prospectus          | Beautiful document viewer               |
| 22  | `unDraw` SVG illustrations  | 404, error states, empty states | Free, beautiful education illustrations |
| 37  | `react-simple-maps`         | Our Reach, Alumni, Tours        | Lightweight static maps                 |
| 49  | Cookie consent              | Before adding analytics         | GDPR compliance                         |
| 59  | Charts                      | Achievements, growth stats      | Data storytelling                       |

---

## INTEGRATION PRINCIPLES

1. **Server-first**: All 3D/animations must be client-side and lazy-loaded. Static fallback must exist.
2. **Zero layout shift**: All dynamic content must reserve space to prevent CLS.
3. **Accessibility**: `prefers-reduced-motion` must disable all animations. All 3D scenes need text alternatives.
4. **Bundle budget**: No single page should exceed 1MB of JS. Use `next/dynamic` aggressively.
5. **Spline priority**: Spline scenes are the fastest path to 3D — no custom Three.js code needed.
6. **Tree-shaking**: Import only what's used. ReactBits, tsParticles, and Motion all support tree-shaking.
