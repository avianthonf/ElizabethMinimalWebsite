# Project Memory

_Facts, conventions, and patterns discovered about this project._

---

## Architecture

- **Homepage:** 13-section vertical scroll with ScrollReveal wrappers. HomePage.tsx assembles: HeroCarousel → CounterBar → WelcomeSection → WhySection → ProgramsGrid → HolisticSection → GallerySection → CampusThenNow → AchievementsSection → StudentLifeSection → TestimonialsSection → AdmissionsCTA → EventsPreview → NewsSection → LocateSection. Each section is a self-contained component with its own CSS module.
- **IA:** 6 top-level sections: About Us (7 subpages), Academics (7 subpages), Admissions (3 subpages), Beyond Academics (5 subpages), News & Media (4 subpages), Contact Us (4 subpages). 46 routes total.
- **Page template:** Every page uses `createPageMetadata` for SEO meta, `getHeroImage("section-name")` for hero images. Pages use either `ContentPage` template or custom `PageShell + Hero`.
- **Data layer:** All content is static, sourced from `@/data/*` modules. No CMS, no API, no runtime fetching. One data file per content domain.
- **MenuOverlay:** React Context (MenuProvider) shares `isOpen`/`toggle`/`close`/`triggerButtonRef` between Header and MenuOverlay. MenuOverlay renders once in root layout. Header falls back to legacy props when context is absent.
- **All overlays/dialogs MUST implement:** useFocusTrap, lockBodyScroll, aria-modal, Escape close, focus restoration. MenuOverlay.tsx is the reference implementation.
- **Every route group** must have its own `error.tsx` boundary.
- **Suspense boundaries:** Required around `useSearchParams`, `cookies()`, and dynamic APIs. Applies to homepage and layout search providers.

## Design System

- **CSS Modules** throughout. No Tailwind, no styled-components, no CSS-in-JS.
- **Three-tier tokens:** primitives (`--p-*`), semantics (`--s-*`), component (`--c-*`). Primitives defined ONLY in `globals.css`.
- **Responsive:** Three breakpoints: 420px, 760px, 1100px. Container queries (@container) for component-level responsiveness.
- **Animation:** motion/react (`motion`, `AnimatePresence`) for declarative animations. ScrollReveal uses IntersectionObserver + CSS transitions for SSR-safe scroll reveals. All animations respect `prefers-reduced-motion`.

## Testing

- **Vitest** for unit tests, **Playwright** for E2E with chromium/firefox/webkit.
- `@axe-core/playwright` for a11y audit gates.
- Coverage thresholds: 80% statements, 75% branches, 80% functions/lines.

## Security

- **JSON-LD XSS:** Always use `safeJsonStringify()` from `@/lib/safe-json` — escapes `<` → `\u003c` and `>` → `\u003e` to prevent `</script>` injection in JSON-LD blocks. Based on OWASP + Redux security guidance.
- **CSP:** Enforced via middleware. `script-src 'self'`, no nonce needed for static site. `style-src 'self' 'unsafe-inline'` for CSS Modules.
- **Contact form:** Layered bot defense: honeypot → timing check → rate limit → email. Honeypot silently returns success. `serverActions.bodySizeLimit: "100kb"`.
- **Security headers:** HSTS with `max-age=63072000; preload`, COOP/ CORP: `same-origin`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.
- **No secrets** in source code. `RESEND_API_KEY` accessed via `process.env` in server actions only.

## Conventions

- **Custom Link** primitive (not raw `next/link`) for all links — centralizes external detection, variant styling, and `ariaDisabled`.
- **Contact form** uses `useActionState` + colocated `actions.ts` Server Action pattern. Unique IDs via `useId()` for label-input associations.
- **Async search** MUST use `cancelled` flag pattern — `clearTimeout` only cancels the timer, not in-flight async operations.
- **Skip-link targets** MUST have visible focus indicators (no `outline: none`). WCAG 2.4.7.
- **Carousel dots** use `role="group"` + `aria-current` (not conflicting `tablist` pattern). Autoplay requires visible pause button (WCAG 2.2.2).
- **Breadcrumbs** wrap in `<ol>` for semantic structure.
- **Contact form** fields use `autocomplete="name"`, `"email"`, `"tel"`.
- **`useFocusTrap`** visibility check uses `getComputedStyle` + `offsetWidth/Height` (handles `position:fixed` elements).
- **`scroll-lock.ts`** has SSR guard: `typeof document === "undefined"` early return.
- **Image optimization:** `sizes` attributes tuned to actual CSS layout, not generic values. Priority images use `priority` on first slide only.

## Emails

- **@react-email/components** for HTML templates rendered via `render()` and sent through Resend. JSX interpolation auto-escapes — no `dangerouslySetInnerHTML` in email templates.
- **Architecture:** Next.js 16 App Router uses reactStrictMode: true by default — all client components must be StrictMode-safe. Never use useRef guards (didInit, hasMounted) to gate one-shot effects; use useState initializers or reset the ref in the cleanup function instead. _(Rationale: React StrictMode simulates unmount/remount in dev, and useRef values persist across this cycle. A didInit guard blocks the second mount after the first mount's cleanup kills the effect's setup (e.g., clears a setTimeout). This causes permanent deadlock visible only in dev.)_ — 2026-07-06
- **Architecture:** Do not wrap statically renderable server components in Suspense unless they actually suspend (async data fetching, dynamic imports, etc.). React 19.2's progressiveChunkSize (default 12,800 bytes) renders the fallback for Suspense boundaries whose children exceed this size, causing SSR to omit content. _(Rationale: React 19.2 introduced outlining: Suspense boundaries with children >12,800 bytes render the fallback during the initial SSR stream as an optimization. For large server components that never suspend (like HomePage with 14 sections), this causes the entire page body to render as null on SSR.)_ — 2026-07-06
- **Accessibility:** Never use opacity-based scroll reveal animations. Use transform-only (translateX/Y) so content defaults to opacity: 1 (CSS default). Content must be visible on first paint regardless of SSR state, hydration timing, reduced-motion preference, or animation library bugs. _(Rationale: Opacity-driven scroll reveals fail in three independent failure modes: SSR (content invisible until hydration), prefers-reduced-motion (transitions disabled → content stays at opacity: 0 permanently, a WCAG 2.3.3 violation), and library bugs (motion's whileInView may never fire on modern Next.js + Turbopack stacks). Transform-only reveals degrade gracefully: content is always visible, transforms are simply skipped when animation is unavailable.)_ — 2026-07-06
- **Architecture:** motion library (formerly framer-motion) whileInView has known reliability issues on Next.js 16 + Turbopack stacks. Design animations to be resilient to whileInView never firing — content must be visible in the initial state. _(Rationale: motion@12.42.2 has an open bug (issue #3565) where whileInView intermittently does not fire on Next.js 16 with Turbopack, leaving elements stuck at their initial state. This means opacity-based scroll reveals are fundamentally unreliable on this stack regardless of correct code.)_ — 2026-07-06
