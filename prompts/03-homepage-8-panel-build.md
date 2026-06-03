# Step 3: Homepage 8-Panel Build — Full Horizontal Scroll Composition

> **Handoff to:** Senior Frontend Engineer
> **Estimated time:** 4–6 hours
> **Risk level:** Medium — panel widths need real-viewport tuning
> **Depends on:** Step 1 (color system), Step 2 (data architecture)
> **Baseline:** 89 tests passing, clean build

---

## 1. CONTEXT

### Current State vs. Target

**Current `WalkerHomepage.tsx`:**
```
2 panels:
├── Panel 1 [screen, 100vw] — Video Hero + "Known" h1 + statement text
└── Panel 2 [clamp widths] — "We Value" eyebrow + placeholder h2 ("Pages stack to the right.") + 3 ValueCards (Curiosity/Dignity/Honor)
```

**Target (per PAGE_ELEMENT_HIERARCHY.md §5):**
```
8 panels:
├── Panel 1 [screen, 100vw] — Photo Hero: DSC07580 + "GUIDING MINDS..." h1
├── Panel 2 [60vw desktop] — "We Believe" + 3 ValueCards (Faith/Excellence/Community)
├── Panel 3 [120vw desktop] — Photo Grid: 12 ImageCards, 3col×4row
├── Panel 4 [50vw desktop] — School Stats: SplitLayout + 3 IconCards
├── Panel 5 [80vw desktop] — Testimonials: 3 Cards
├── Panel 6 [100vw] — CTA Banner: CTASection
├── Panel 7 [100vw] — Latest News: 3 news Cards
└── Panel 8 [100vw] — Footer: Full footer
```

### The Horizontal Scroll Mechanism (CRITICAL — DO NOT BREAK)

Before touching anything, understand the mechanism:

```
<section ref={stageRef}>              ← STAGE: height = viewport + travelDistance
  <div ref={viewportRef}>             ← VIEWPORT: position: sticky; top: 0; overflow: hidden
    <div ref={trackRef}>              ← TRACK: display: flex; width: max-content; will-change: transform
      {children}                      ← HorizontalPage elements in a horizontal row
    </div>
  </div>
</section>
```

- **Stage height** = viewportHeight + travelDistance. The stage creates the vertical scrollable space.
- **Viewport** is `position: sticky; top: 0` — it pins to the screen while the user scrolls through the stage.
- **Track** translates horizontally via `translate3d(-progress × travelDistance, 0, 0)` driven by `requestAnimationFrame` on scroll.
- **1px vertical scroll = 1px horizontal translation.** This means the total stage height grows with every panel added.

### Component Constraints

- **`HorizontalPage` with `screen` prop**: Always `width: 100vw; min-width: 100vw`. Ignores responsive width overrides. Use for full-viewport panels (Hero, CTA, News, Footer).
- **`HorizontalPage` with custom widths**: Uses CSS custom properties with cascade fallback (`smallMobileWidth ?? mobileWidth ?? tabletWidth ?? width`). Use for content panels that need to be wider or narrower than the viewport.
- **All panels must have `height: 100%`** (provided by the HorizontalPage base style and the track's `align-items: stretch`).
- **Gap is `0px`** — no gaps between panels. Clean edges.

### The Gap Constraint

The current `HorizontalScroll` uses `gap="0px"`. DO NOT change this. If you need visual breathing room between panels, add internal padding to the panel content, not the HorizontalScroll gap. Rationale: The gap adds to the track's scrollWidth, which changes the travel distance math in ways the designer didn't intend.

---

## 2. PANEL WIDTH CALCULATIONS

### Total Travel Budget

Desktop widths sum:
| Panel | Width | Contribution |
|---|---|---|
| Panel 1 | 100vw | 100vw |
| Panel 2 | 60vw | 60vw |
| Panel 3 | 120vw | 120vw |
| Panel 4 | 50vw | 50vw |
| Panel 5 | 80vw | 80vw |
| Panel 6 | 100vw | 100vw |
| Panel 7 | 100vw | 100vw |
| Panel 8 | 100vw | 100vw |
| **Total** | | **710vw** |

At 1440px viewport: travelDistance = 710vw = 10,224px. On a 900px tall viewport: spacer ≈ 11,124px.

**This is a lot of scrolling.** The Walker School uses ~5 panels. Consider:
- Reducing Panel 3 (Photo Grid) from 120vw → 100vw to save 20vw
- Reducing Panel 5 (Testimonials) from 80vw → 60vw to save 20vw
- New total: 670vw = 9,648px travel on 1440px (still large but manageable)

**Decision: Stick with the spec widths.** The PAGE_ELEMENT_HIERARCHY.md was designed intentionally. We can tune later if the scroll feels endless.

---

## 3. FILE-BY-FILE CHANGES

### File 1: `src/components/WalkerHomepage/WalkerHomepage.tsx`

**Complete rewrite.** The current file has inline values data and placeholder text. Replace everything.

```tsx
import { LoadOverlay } from "@/components/LoadOverlay";
import { HorizontalPage, HorizontalScroll } from "@/components/HorizontalScroll";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { ValueCard } from "@/components/content/ValueCard";
import { IconCard } from "@/components/content/IconCard";
import { ImageCard } from "@/components/content/ImageCard";
import { Card } from "@/components/content/Card";
import { CTASection } from "@/components/content/CTASection";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Button } from "@/components/primitives/Button";
import { Link } from "@/components/primitives/Link";
import { Icon } from "@/components/primitives/Icon";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { CommunityIcon } from "@/components/icons/CommunityIcon";
import { AcademicIcon } from "@/components/icons/AcademicIcon";
import { SportsIcon } from "@/components/icons/SportsIcon";

import {
  HERO_CONTENT,
  VALUES,
  STATS,
  TESTIMONIALS,
  CTA_CONTENT,
  LATEST_NEWS,
  HERO_IMAGES,
  HOMEPAGE_GRID_IMAGES,
} from "@/data/homepage";
import {
  HEADER_NAV_LINKS,
  HEADER_CTA_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";

import styles from "./WalkerHomepage.module.css";

// ── Icon mapping for stat IconCards ────────────────────────────────────
const statIcons = [
  <Icon key="founded" size="large" decorative><CommunityIcon /></Icon>,
  <Icon key="students" size="large" decorative><AcademicIcon /></Icon>,
  <Icon key="affiliated" size="large" decorative><SportsIcon /></Icon>,
];

export function WalkerHomepage(): React.ReactNode {
  return (
    <main className={styles.page}>
      <LoadOverlay />

      <Header
        brandText="St. Elizabeth High School"
        navLinks={HEADER_NAV_LINKS}
        transparent
        fixed
      />

      <HorizontalScroll height="100vh" gap="0px" ariaLabel="St. Elizabeth homepage — horizontally scrolling content panels">
        
        {/* ══════════════════════════════════════════════════════════════
            PANEL 1: Photo Hero (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen className={`${styles.panel} ${styles.heroPanel}`} ariaLabel="St. Elizabeth High School — introduction">
          <div
            className={styles.heroBackground}
            style={{ backgroundImage: `url('/images/${HERO_IMAGES[0].filename}')` }}
            role="img"
            aria-label={HERO_IMAGES[0].alt}
          />
          <div className={styles.heroGradient} role="presentation" aria-hidden="true" />
          <div className={styles.heroOverlay}>
            <p className={styles.heroStatement}>{HERO_CONTENT.statement}</p>
            <h1 className={styles.heroHeading}>{HERO_CONTENT.heading}</h1>
          </div>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 2: "We Believe" Values (60vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(900px, 60vw, 1300px)"
          tabletWidth="min(900px, 110vw)"
          mobileWidth="max(760px, 180vw)"
          smallMobileWidth="max(720px, 200vw)"
          landscapeWidth="max(860px, 125vw)"
          className={`${styles.panel} ${styles.valuesPanel}`}
          ariaLabel="St. Elizabeth values — Faith, Excellence, Community"
        >
          <div className={styles.valuesIntro}>
            <Text variant="eyebrow" as="p">We Believe</Text>
            <Heading level="h2" variant="section">Values That Shape Our Community</Heading>
            <Text variant="muted" as="p" size="medium">
              At St. Elizabeth High School, we are guided by our motto &lsquo;Truth and Honesty&rsquo;
              and the principle of &lsquo;Guiding Minds, Nurturing Hearts, Building Futures.&rsquo;
            </Text>
          </div>
          <div className={styles.valuesCards}>
            {VALUES.map((value) => (
              <ValueCard
                key={value.number}
                number={value.number}
                title={value.title}
                body={value.body}
              />
            ))}
          </div>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 3: Photo Grid (120vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(1400px, 120vw, 2200px)"
          tabletWidth="min(1100px, 140vw)"
          mobileWidth="max(760px, 220vw)"
          smallMobileWidth="max(720px, 240vw)"
          landscapeWidth="max(1200px, 150vw)"
          className={`${styles.panel} ${styles.gridPanel}`}
          ariaLabel="Photo gallery — Academics, Athletics, Arts, Student Life"
        >
          <Section background="paper" padding="large" className={styles.gridSection}>
            <Container width="wide">
              <Stack gap="large">
                <div className={styles.gridHeader}>
                  <Text variant="eyebrow" as="p">Experience St. Elizabeth</Text>
                  <Heading level="h2" variant="section">Life at Our School</Heading>
                </div>
                <Grid columns={4} gap="medium" responsive>
                  {HOMEPAGE_GRID_IMAGES.map((img) => (
                    <ImageCard
                      key={img.filename}
                      image={`/images/${img.filename}`}
                      imageAlt={img.alt}
                      title={img.category.charAt(0).toUpperCase() + img.category.slice(1)}
                      aspectRatio="4:3"
                      href={`/${img.category === "general" ? "about" : img.category}`}
                    />
                  ))}
                </Grid>
              </Stack>
            </Container>
          </Section>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 4: School Stats (50vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(700px, 50vw, 1000px)"
          tabletWidth="min(700px, 90vw)"
          mobileWidth="max(760px, 175vw)"
          smallMobileWidth="max(720px, 195vw)"
          landscapeWidth="max(720px, 105vw)"
          className={`${styles.panel} ${styles.statsPanel}`}
          ariaLabel="School statistics — Founded 1949, 1200+ students, CBSE affiliated"
        >
          <SplitLayout
            left={
              <Stack gap="medium">
                <Text variant="eyebrow">Our Legacy</Text>
                <Heading level="h2" variant="section">Since 1949</Heading>
                <Text variant="muted" size="medium">
                  St. Elizabeth High School has been educating students in Pomburpa, Goa, India.
                  Guided by our motto &lsquo;Truth and Honesty,&rsquo; we foster a supportive
                  environment where every child discovers their potential and purpose.
                </Text>
                <Link href="/about/history">Learn About Our History</Link>
              </Stack>
            }
            right={
              <Grid columns={1} gap="medium" responsive={false}>
                {STATS.map((stat, i) => (
                  <IconCard
                    key={stat.label}
                    icon={statIcons[i]}
                    title={stat.value}
                    description={`${stat.label} — ${stat.description}`}
                  />
                ))}
              </Grid>
            }
            ratio="1-2"
          />
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 5: Testimonials (80vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(1100px, 80vw, 1600px)"
          tabletWidth="min(900px, 110vw)"
          mobileWidth="max(760px, 200vw)"
          smallMobileWidth="max(720px, 220vw)"
          landscapeWidth="max(1000px, 130vw)"
          className={`${styles.panel} ${styles.testimonialsPanel}`}
          ariaLabel="Testimonials from students, alumni, and parents"
        >
          <Section background="soft" padding="xlarge" className={styles.testimonialsSection}>
            <Container>
              <Stack gap="xlarge">
                <div className={styles.testimonialsHeader}>
                  <Text variant="eyebrow">Voices of Our Community</Text>
                  <Heading level="h2" variant="section">What They Say</Heading>
                </div>
                <Grid columns={3} gap="large" responsive>
                  {TESTIMONIALS.map((t) => (
                    <Card key={t.attribution} variant="default" padding="large">
                      <Stack gap="medium">
                        <Text variant="body" as="blockquote" size="medium">
                          &ldquo;{t.quote}&rdquo;
                        </Text>
                        <div>
                          <Text variant="caption" as="span">
                            {t.attribution}
                          </Text>
                        </div>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </Container>
          </Section>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 6: CTA Banner (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen className={`${styles.panel} ${styles.ctaPanel}`} ariaLabel="Call to action — Join our community">
          <CTASection
            heading={CTA_CONTENT.heading}
            description={CTA_CONTENT.description}
            primaryCTA={CTA_CONTENT.primaryCTA}
            secondaryCTA={CTA_CONTENT.secondaryCTA}
            background="blue"
            centered
          />
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 7: Latest News (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen className={`${styles.panel} ${styles.newsPanel}`} ariaLabel="Latest news and events">
          <Section background="paper" padding="xlarge" className={styles.newsSection}>
            <Container>
              <Stack gap="xlarge">
                <div className={styles.newsHeader}>
                  <Text variant="eyebrow">Latest News &amp; Events</Text>
                  <Heading level="h2" variant="section">What&rsquo;s Happening</Heading>
                </div>
                <Grid columns={3} gap="large" responsive>
                  {LATEST_NEWS.map((item) => (
                    <ImageCard
                      key={item.href}
                      image={`/images/${item.imageFilename}`}
                      imageAlt={item.title}
                      title={item.title}
                      description={`${item.date} — ${item.excerpt}`}
                      aspectRatio="4:3"
                      href={item.href}
                    />
                  ))}
                </Grid>
                <div className={styles.newsCta}>
                  <Link href="/news">View All News</Link>
                </div>
              </Stack>
            </Container>
          </Section>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 8: Footer (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen className={`${styles.panel} ${styles.footerPanel}`} ariaLabel="Site footer with contact information and links">
          <Footer
            intro={FOOTER_INTRO}
            sections={FOOTER_SECTIONS}
            socialLinks={FOOTER_SOCIAL_LINKS}
            copyright={FOOTER_COPYRIGHT}
            background="maroon"
          />
        </HorizontalPage>

      </HorizontalScroll>
    </main>
  );
}
```

### Key Design Decisions in This Component

1. **Panel 1 switches from video to static photo.** The video element is removed. The hero background is now a `<div>` with `background-image` set to `DSC07580.jpg` (the highest-quality hero candidate from the 71-photo pool). The gradient fallback remains as a decorative overlay.

2. **Panel 2 values change from placeholder to real content.** "Curiosity/Dignity/Honor" → "Faith/Excellence/Community" as specified in PAGE_ELEMENT_HIERARCHY.md §5 Panel 2.

3. **Panels 3–8 are entirely NEW.** They use the existing component system — no new components are created. Every panel composes from Tier 1 (primitives), Tier 2 (layout), and Tier 3 (content) components.

4. **The Header now receives `navLinks` from the data layer** instead of using its internal defaults. This ensures the nav links shown on the homepage match the data architecture.

5. **IconCards for stats use the 4 existing SVG icon components** (`AcademicIcon`, `CommunityIcon`, `SportsIcon`, `ArtsIcon`). If none perfectly matches "Founded" or "Affiliated," use the closest available — we're not creating new icons in this step.

6. **The Footer is composed inside Panel 8.** Since the homepage uses horizontal scroll, the footer is the final panel in the track, not a separate element below the scroll stage. On mobile (vertical stack), it appears at the bottom naturally.

---

### File 2: `src/components/WalkerHomepage/WalkerHomepage.module.css`

**Replace the entire file.** The current styles were built for 2 panels. We need styles for 8 panels. Many existing classes (like `.heroOverlay`, `.heroStatement`, `.valueCard` etc.) are reused but contextualized within new panel wrappers.

Here's the complete new stylesheet. Every class from the old file that's reused has been preserved or adapted:

```css
/* ═══════════════════════════════════════════════════════════════════════
   WalkerHomepage — 8-Panel Horizontal Scroll Styles
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Page Wrapper ────────────────────────────────────────────────────── */

.page {
  min-height: 100vh;
  background: var(--color-paper);
}

/* ── Panel Base ──────────────────────────────────────────────────────── */

.panel {
  position: relative;
  display: grid;
  height: 100%;
  overflow: hidden;
  background: var(--color-paper);
}

/* ── Panel 1: Hero ──────────────────────────────────────────────────── */

.heroPanel {
  place-items: stretch;
  color: var(--color-paper);
  background: var(--color-ink);
}

.heroBackground {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.heroGradient {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.18), transparent 32%),
    radial-gradient(ellipse at 70% 80%, rgba(12, 33, 124, 0.4), transparent 50%),
    linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark) 46%, #02081f 100%);
}

.heroOverlay {
  position: relative;
  z-index: 2;
  align-self: end;
  display: grid;
  max-width: min(1180px, calc(100vw - 32px));
  grid-template-columns: minmax(280px, 0.48fr) minmax(420px, 0.72fr);
  align-items: end;
  gap: clamp(28px, 5vw, 76px);
  padding: 0 clamp(22px, 7vw, 84px) clamp(18px, 2.6vw, 38px);
}

.heroHeading {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(3.92rem, 11.9vw, 9.8rem);
  font-weight: 900;
  line-height: 0.72;
  letter-spacing: -0.07em;
  text-transform: uppercase;
  color: var(--color-paper);
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
}

.heroStatement {
  max-width: 520px;
  margin: 0;
  color: var(--color-paper);
  font-size: clamp(0.7rem, 1.015vw, 1.015rem);
  font-weight: 900;
  line-height: 1.62;
  text-align: center;
  text-shadow: 0 3px 14px rgba(0, 0, 0, 0.38);
}

/* ── Panel 2: Values ────────────────────────────────────────────────── */

.valuesPanel {
  grid-template-columns: minmax(280px, 0.72fr) minmax(360px, 1fr);
  align-items: center;
  gap: clamp(28px, 5vw, 72px);
  padding: clamp(28px, 5vw, 72px);
  background: var(--color-soft);
}

.valuesIntro {
  max-width: 640px;
}

.valuesIntro p {
  color: var(--color-muted);
}

.valuesCards {
  display: flex;
  align-items: stretch;
  gap: clamp(16px, 2vw, 28px);
  min-width: 0;
}

/* ── Panel 3: Photo Grid ────────────────────────────────────────────── */

.gridPanel {
  background: var(--color-paper);
}

.gridSection {
  display: flex;
  align-items: center;
  height: 100%;
}

.gridHeader {
  text-align: left;
}

/* ── Panel 4: Stats ─────────────────────────────────────────────────── */

.statsPanel {
  padding: clamp(28px, 5vw, 72px);
  align-content: center;
  background: var(--color-paper);
}

/* ── Panel 5: Testimonials ──────────────────────────────────────────── */

.testimonialsPanel {
  background: var(--color-soft);
}

.testimonialsSection {
  display: flex;
  align-items: center;
  height: 100%;
}

.testimonialsHeader {
  text-align: left;
}

/* ── Panel 6: CTA ───────────────────────────────────────────────────── */

.ctaPanel {
  background: var(--color-blue);
}

/* ── Panel 7: News ──────────────────────────────────────────────────── */

.newsPanel {
  background: var(--color-paper);
}

.newsSection {
  display: flex;
  align-items: center;
  height: 100%;
}

.newsHeader {
  text-align: left;
}

.newsCta {
  text-align: left;
}

/* ── Panel 8: Footer ────────────────────────────────────────────────── */

.footerPanel {
  background: var(--color-maroon);
}

/* ═══════════════════════════════════════════════════════════════════════
   RESPONSIVE BREAKPOINTS
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Tablet: ≤1100px ────────────────────────────────────────────────── */

@media (max-width: 1100px) {
  .valuesPanel {
    grid-template-columns: minmax(240px, 0.75fr) minmax(340px, 1fr);
  }

  .gridHeader,
  .testimonialsHeader,
  .newsHeader {
    text-align: left;
  }
}

/* ── Mobile: ≤760px ─────────────────────────────────────────────────── */

@media (max-width: 760px) {
  .heroOverlay {
    max-width: calc(100vw - 32px);
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: 18px;
    padding: 0 20px 26px;
  }

  .heroHeading {
    font-size: clamp(2.73rem, 13.3vw, 4.55rem);
  }

  .heroStatement {
    font-size: clamp(0.546rem, 2.24vw, 0.7rem);
    line-height: 1.42;
  }

  .valuesPanel {
    grid-template-columns: minmax(230px, 0.7fr) minmax(480px, 1.3fr);
    align-content: center;
    gap: 20px;
    padding: 78px 20px 28px;
  }

  .valuesIntro {
    max-width: 300px;
  }

  .valuesCards {
    gap: 12px;
  }

  .statsPanel {
    padding: 48px 20px;
  }

  .testimonialsSection {
    padding: 48px 20px;
  }
}

/* ── Small Mobile: ≤420px ───────────────────────────────────────────── */

@media (max-width: 420px) {
  .valuesPanel {
    grid-template-columns: minmax(210px, 0.62fr) minmax(450px, 1.38fr);
    padding-inline: 18px;
  }
}

/* ── Landscape: max-height ≤520px + landscape orientation ───────────── */

@media (max-height: 520px) and (orientation: landscape) {
  .heroOverlay {
    max-width: min(880px, calc(100vw - 32px));
    grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.1fr);
    gap: 20px;
    padding: 0 22px 18px;
  }

  .heroHeading {
    font-size: clamp(2.94rem, 10.5vw, 4.9rem);
  }

  .heroStatement {
    font-size: 0.63rem;
    line-height: 1.35;
  }

  .valuesPanel {
    grid-template-columns: minmax(220px, 0.68fr) minmax(520px, 1.32fr);
    gap: 20px;
    padding: 58px 22px 18px;
  }

  .valuesCards {
    gap: 12px;
  }
}
```

---

### File 3: `src/components/WalkerHomepage/WalkerHomepage.test.tsx`

Update the test to reflect the new 8-panel content:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WalkerHomepage } from "./WalkerHomepage";

// Mock the horizontal scroll components (they use client-side APIs)
vi.mock("@/components/HorizontalScroll", () => ({
  HorizontalScroll: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="horizontal-scroll">{children}</div>
  ),
  HorizontalPage: ({ children, ...props }: { children: React.ReactNode; screen?: boolean; width?: string }) => (
    <div data-testid="horizontal-page">{children}</div>
  ),
}));

// Mock LoadOverlay (uses animation APIs)
vi.mock("@/components/LoadOverlay", () => ({
  LoadOverlay: () => <div data-testid="load-overlay" />,
}));

// Mock next/image (used by ImageCard)
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe("WalkerHomepage", () => {
  it("renders the LoadOverlay", () => {
    render(<WalkerHomepage />);
    expect(screen.getByTestId("load-overlay")).toBeDefined();
  });

  it("renders the HorizontalScroll", () => {
    render(<WalkerHomepage />);
    expect(screen.getByTestId("horizontal-scroll")).toBeDefined();
  });

  it("renders the hero heading from data", () => {
    render(<WalkerHomepage />);
    expect(
      screen.getByText("Guiding Minds, Nurturing Hearts, Building Futures")
    ).toBeDefined();
  });

  it("renders all three value cards", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText("Faith")).toBeDefined();
    expect(screen.getByText("Excellence")).toBeDefined();
    expect(screen.getByText("Community")).toBeDefined();
  });

  it("renders the We Believe eyebrow text", () => {
    render(<WalkerHomepage />);
    const eyebrows = screen.getAllByText("We Believe");
    expect(eyebrows.length).toBeGreaterThan(0);
  });

  it("renders stat values", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText("1949")).toBeDefined();
    expect(screen.getByText("1200+")).toBeDefined();
    expect(screen.getByText("CBSE")).toBeDefined();
  });

  it("renders all three testimonials", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText(/St. Elizabeth shaped me/)).toBeDefined();
    expect(screen.getByText(/The teachers here/)).toBeDefined();
    expect(screen.getByText(/A nurturing environment/)).toBeDefined();
  });

  it("renders CTA buttons", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText("Inquire Now")).toBeDefined();
    expect(screen.getByText("Plan a Visit")).toBeDefined();
  });

  it("renders news items", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText("Annual Day Celebration 2024")).toBeDefined();
    expect(screen.getByText("Sports Meet XXII — A Display of Spirit")).toBeDefined();
    expect(screen.getByText("Feast Day Celebrations at St. Elizabeth")).toBeDefined();
  });
});
```

---

## 4. PANEL-BY-PANEL IMPLEMENTATION NOTES

### Panel 1: Photo Hero
- **Image**: Uses `HERO_IMAGES[0]` (DSC07580.jpg) from the data registry
- **Gradient**: The same 3-layer gradient from Step 1 (royal blue → dark royal blue → deep navy)
- **Text positions**: Statement bottom-left, heading bottom-right — same grid as original but with real content
- **LoadOverlay**: Still "WE BELIEVE" — unchanged
- **Video removed**: The `<video>` element and `videoFallback` div are gone. The gradient now overlays the static photo

### Panel 2: Values
- **Content**: Faith (01), Excellence (02), Community (03) from `VALUES` data
- **Width**: 60vw desktop. This is narrower than the original 110vw clamp. The content should feel concentrated.
- **Layout**: Same `grid-template-columns: minmax(280px, 0.72fr) minmax(360px, 1fr)` as the original dynamic page
- **Background**: `var(--color-soft)` warm beige

### Panel 3: Photo Grid
- **Width**: 120vw desktop — WIDEST panel. The grid needs breathing room.
- **Images**: 12 ImageCards from `HOMEPAGE_GRID_IMAGES`
- **Grid**: `columns={4}` with `responsive={true}` → collapses to 2 columns at 760px, 1 column at 420px
- **Aspect ratio**: `4:3` (matches the source photos exactly — all 71 photos are 1.333 landscape)
- **Titles on hover**: The ImageCard component shows the title overlay on hover by default
- **Categories**: Each card shows its category as the hover title (first letter capitalized by inline logic)

### Panel 4: Stats
- **Width**: 50vw desktop — NARROWEST panel. Intentionally compact.
- **Layout**: `SplitLayout` with `ratio="1-2"` — text takes 1/3, stats take 2/3
- **IconCards**: 3 cards with SVG icons. "1949 | Founded", "1200+ | Students", "CBSE | Affiliated"
- **Icons**: Reuse the 4 existing SVG icon components. Map: Founded→CommunityIcon, Students→AcademicIcon, Affiliated→SportsIcon

### Panel 5: Testimonials
- **Width**: 80vw desktop
- **Layout**: Section with soft background, centered Stack
- **Cards**: 3 Card components in a responsive Grid
- **Quotes**: Using `<blockquote>` via Text's `as` prop
- **Typography**: Georgia serif for the quotes would be nice, but the Text component uses Arial. Keep Arial for consistency — the card border and layout provide the visual distinction.

### Panel 6: CTA Banner
- **Width**: 100vw (screen mode — fills the viewport)
- **Component**: CTASection with `background="blue"` (the `--color-blue: #0c4a6e` desaturated blue-gray)
- **CTAs**: "Inquire Now" (primary) → `/admissions`, "Plan a Visit" (secondary) → `/contact/visit`
- **Centered text**: The CTASection component handles this with its `centered` prop (default: true)

### Panel 7: News
- **Width**: 100vw (screen mode)
- **Layout**: Section with white background
- **Cards**: 3 ImageCards (image + title + date + excerpt)
- **View All link**: Below the grid, links to `/news`

### Panel 8: Footer
- **Width**: 100vw (screen mode)
- **Component**: Footer with all data from `FOOTER_SECTIONS`, `FOOTER_INTRO`, `FOOTER_SOCIAL_LINKS`, `FOOTER_COPYRIGHT`
- **Background**: `"maroon"` — which now resolves to royal blue (`#0c217c`) due to Step 1's CSS variable update

---

## 5. PANEL WIDTH TUNING GUIDE

After implementation, test on real viewports. Adjust these width props if panels feel cramped or too wide:

| Panel | Symptom of wrong width | Adjust |
|---|---|---|
| Panel 2 (60vw) | Text wrapping awkwardly | Increase to 65vw or decrease to 55vw |
| Panel 3 (120vw) | Images too small or too large | Adjust grid `columns` (3 vs 4) or change to 100vw |
| Panel 4 (50vw) | Text column too narrow for readable line length | Increase to 55vw or 60vw |
| Panel 5 (80vw) | Cards too wide | Decrease to 70vw or add a `Container` wrapper |

**How to tune**: Each `HorizontalPage` has `width`, `tabletWidth`, `mobileWidth`, `smallMobileWidth`, `landscapeWidth`. Change one at a time, test on multiple viewport sizes.

---

## 6. MOBILE BEHAVIOR

At viewport widths ≤760px, HorizontalScroll disables the translate3d animation and shows a native horizontal scrollbar instead (per `prefers-reduced-motion` CSS in `HorizontalScroll.module.css`).

However, on mobile, the content panels should ideally **stack vertically** rather than scroll horizontally. This is NOT implemented in the current HorizontalScroll — it always uses horizontal layout. The mobile vertical stack is a future enhancement.

**For now**: The responsive width overrides on each HorizontalPage ensure that even at narrow viewports, each panel is at least viewport-width (via `mobileWidth="max(760px, Xvw)"`), so the horizontal scroll works as a page-by-page carousel on mobile.

---

## 7. ACCEPTANCE CRITERIA

- [ ] `pnpm build` passes with zero TypeScript errors
- [ ] `pnpm test` passes — all existing + new tests green
- [ ] Homepage renders 8 distinct panels in HorizontalScroll
- [ ] Panel 1 shows hero photo (DSC07580) with gradient overlay, statement text, and heading
- [ ] Panel 2 shows "We Believe" eyebrow + 3 ValueCards (Faith, Excellence, Community)
- [ ] Panel 3 shows 12 ImageCards in a responsive grid
- [ ] Panel 4 shows "Our Legacy / Since 1949" + 3 IconCards with stats
- [ ] Panel 5 shows 3 testimonial Cards with quotes and attributions
- [ ] Panel 6 shows CTASection with "Inquire Now" and "Plan a Visit" buttons
- [ ] Panel 7 shows 3 news ImageCards with "View All News" link
- [ ] Panel 8 shows Footer with links, social icons, copyright
- [ ] Header shows all 9 nav links (About through Contact) from data layer
- [ ] Horizontal scroll translates smoothly on desktop (no jank, no layout shift)
- [ ] All images load with proper alt text
- [ ] Scroll math is correct — stage bottom is reached when track is fully translated
- [ ] No horizontal overflow visible on body (hidden by `overflow-x: hidden`)
- [ ] `prefers-reduced-motion` fallback shows native horizontal scrollbar
- [ ] No hardcoded text strings in the component — everything comes from `@/data/`

---

## 8. COMMON PITFALLS

1. **Don't change the HorizontalScroll mechanism.** The rAF loop, measure/updateTransform math, and DOM structure (stage/viewport/track) are battle-tested. Do NOT refactor them in this step.

2. **Don't add margins between panels.** The `gap="0px"` on HorizontalScroll means panels abut directly. If you need internal spacing, add padding inside the panel, not margin outside.

3. **Don't nest Sections unnecessarily.** The HorizontalPage already creates a section-like container. If a panel has a full-bleed background, use the panel's className instead of wrapping in a Section that might add unintended padding.

4. **Don't hardcode image paths as strings.** Always reference the data layer: `HERO_IMAGES[0].filename`, not `"DSC07580.jpg"`.

5. **Don't forget to update the test mock.** The `next/image` mock in the test file needs to be added since ImageCard uses Next.js `<Image>`.

6. **Don't add new components.** Every visual element in all 8 panels is built from existing Tier 1–3 components. If you think you need a new component, re-read COMPONENTS.md — the existing component is probably sufficient with the right props.

---

*Handoff complete. This is the largest step. Proceed to Step 4 after verification.*
