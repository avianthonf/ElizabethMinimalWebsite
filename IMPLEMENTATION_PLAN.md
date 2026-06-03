# St. Elizabeth High School — Comprehensive Implementation Plan

> **Generated:** 2026-06-03 | **Baseline:** 89 tests passing, 24 test files, clean build
> **Based on:** PAGE_ELEMENT_HIERARCHY.md, COMPONENTS.md, 71-image metadata analysis, full codebase review

---

## 0. EXECUTIVE SUMMARY

This plan transforms the current 2-panel homepage prototype into the full 8-panel St. Elizabeth website described in PAGE_ELEMENT_HIERARCHY.md, then builds all inner pages. The work is organized into **7 phases** with estimated complexity and dependencies.

**Key architecture decisions embedded in this plan:**
- The component system (24 components, 3 tiers) is complete and needs NO new components — everything required already exists
- The color system needs a critical update: maroon (`#6c1f35`) → Royal Blue (`#0c217c`) as the primary accent, per the school's actual brand identity
- All 71 images are 4:3 landscape, warm-toned, shot on Sony ILCE-7RM5 — no subject annotation exists, requiring heuristic assignment based on aesthetic profiles
- The horizontal scroll mechanism is production-ready; the 8-panel flow is a pure content/layout exercise using existing infrastructure

---

## 1. COLOR SYSTEM UPDATE (Accent: Maroon → Royal Blue)

### Rationale

The school's identity is **Royal Blue + White**. The current design system uses Maroon (`#6c1f35`). The PAGE_ELEMENT_HIERARCHY.md specifies:

| Token | Current | → Target |
|---|---|---|
| Primary Accent | `#6c1f35` (maroon) | `#0c217c` (royal blue) |
| Primary Accent Dark | `#41111f` (maroon dark) | `#060f45` (royal blue dark) |
| CTA Background | `#0c4a6e` (blue) | KEEP `#0c4a6e` |

### Files to update (systematic, not search-replace):

1. **`src/app/globals.css`** — Update CSS custom properties:
   - `--color-maroon: #0c217c` (repurpose token name; safer than renaming across all files)
   - `--color-maroon-dark: #060f45`
   
2. **`src/components/shared/constants.ts`** — Update references if any hardcoded values exist

3. **`src/components/WalkerHomepage/WalkerHomepage.module.css`** — The video gradient fallback uses maroon; update to royal blue gradient

4. **All component `.module.css` files that reference `--color-maroon`** — These will pick up the new value automatically via the CSS custom property

5. **Visual verification** — The LoadOverlay, Header, Hero, CTASection, ValueCards, Badges all use `--color-maroon` and will adopt royal blue automatically

---

## 2. IMAGE ASSIGNMENT MATRIX (71 Photos → Website Sections)

### Methodology

Without subject annotation, images are assigned based on:
- **Brightness** (dark=backgrounds with light text, medium=heroes/features, dim=gallery)
- **Contrast** (high=athletics/events, medium=academics/contemplative)
- **Color temperature** (warm=community/welcome, neutral=academics, cool=academics only)
- **Complexity** (high=gallery grids, medium=hero text overlays)
- **Mood tags** (cozy/intimate=community/heritage, dynamic/bold=athletics/events)

### Assignment Table

#### Hero/Header Images (Top 5 candidates)

| Image | Brightness | Contrast | Complexity | Temp | Assignment |
|---|---|---|---|---|---|
| **DSC07580** | 142.6 (highest) | 73.7 (highest) | High | Warm | **Homepage Panel 1 Hero** — brightest + boldest image. Featured image candidate. |
| **DSC07548** | 133.2 | 71.9 | High | Warm | **About page Hero** — dynamic, warm, school-life feel |
| **DSC07360** | 129.3 | 76.7 (2nd highest) | Medium | Neutral-Warm | **Admissions Hero** — medium complexity works for text overlay |
| **DSC07495** | 140.7 | 64.1 | High | Warm | **Athletics Hero** or inner page feature |
| **DSC07504** | 121.2 | 72.1 | High | Neutral-Warm | **Student Life Hero** — dynamic, engaging |

#### Homepage Panel 3: Photo Grid (12 images — diverse, engaging)

Selected from high-complexity, warm, "lively/engaging/story-rich" pool. Prioritize variety in palette (earth tones + occasional blue accents):

1. DSC07290 — cozy, intimate, story-rich
2. DSC07292 — balanced, natural, authentic
3. DSC07294 — balanced, lively
4. DSC07300 — cozy, intimate
5. DSC07301 — dynamic, bold
6. DSC07305 — dynamic, bold
7. DSC07317 — medium complexity (good for overlay text)
8. DSC07328 — balanced, natural
9. DSC07335 — medium daylight, hero-quality
10. DSC07346 — medium daylight
11. DSC07351 — medium daylight, hero-quality
12. DSC07370 — dim, story-rich

#### Values Panel (Value Cards — 3 images for background/context)

| Card | Image | Rationale |
|---|---|---|
| 01 FAITH | DSC07463 or DSC07619 | Cozy, intimate, nostalgic — heritage/faith feel |
| 02 EXCELLENCE | DSC07497 or DSC07394 | Balanced, natural, bright — academic excellence |
| 03 COMMUNITY | DSC07290 or DSC07378 | Cozy, intimate, story-rich — community warmth |

#### School Stats (IconCards — 3 images)

| Stat | Image | Rationale |
|---|---|---|
| "1949 | Founded" | DSC07469 (darkest, royal blue accent, heritage feel) or DSC07632 (cozy, nostalgic) |
| "1200+ | Students" | DSC07420 (dynamic, bold, group shot feel) |
| "CBSE | Affiliated" | DSC07428 (balanced, dynamic) |

#### Testimonials (3 images)

| Card | Image | Rationale |
|---|---|---|
| Alumni testimonial | DSC07400 or DSC07401 | Cozy, intimate, nostalgic |
| Student testimonial | DSC07437 (blue accent) | Balanced, natural |
| Parent testimonial | DSC07477 (blue accent) | Balanced, natural |

#### Latest News (3 images)

| Card | Image | Rationale |
|---|---|---|
| News 1 (Annual Day) | DSC07504 | Dynamic, bold |
| News 2 (Sports Meet) | DSC07546 | Dynamic, bold, high contrast |
| News 3 (Feast Day) | DSC07555 | Dynamic, eye-catching |

#### Academics Pages (6-8 images)

| Image | Rationale |
|---|---|
| **DSC07576** | **ONLY cool-tone image** — serious, contemplative, moody. PERFECT for Academics hero. Blue-dominant palette. |
| DSC07502 | Neutral color temperature (rare), blue accent |
| DSC07431 | Medium complexity (less busy = good for text overlay) |
| DSC07510 | Neutral-warm, balanced |
| DSC07518 | Dim, balanced |
| DSC07522 | Dim, balanced |
| DSC07584 | Dim, balanced |
| DSC07590 | Medium daylight, balanced |

#### Athletics Pages (5-7 images — dynamic, high-contrast)

| Image | Rationale |
|---|---|
| DSC07580 | Highest brightness + contrast — premier athletics image |
| DSC07504 | Dynamic, bold, high contrast (72.1) |
| DSC07546 | Dynamic, bold |
| DSC07548 | Dynamic, bold, hero-candidate |
| DSC07555 | Dynamic, bold, high contrast |
| DSC07420 | Dynamic, bold |
| DSC07301 | Dynamic, bold (ISO 10000, indoor sports feel) |

#### Arts Pages (5-7 images)

| Image | Rationale |
|---|---|
| DSC07565 | Medium contrast (calmer), warm rosy tone |
| DSC07575 | Hero-candidate, green midtone (vegetation) suggests outdoor arts |
| DSC07597 | Medium contrast (balanced), medium daylight |
| DSC07538 | Medium contrast only, warm |
| DSC07541 | Medium contrast only, warm |
| DSC07543 | Medium contrast, warm |
| DSC07610 | Flash-fired (unique lighting), golden wood tones |

#### Student Life / Clubs (5-7 images)

| Image | Rationale |
|---|---|
| DSC07306 | Medium daylight, lively |
| DSC07349 | Dim, lively |
| DSC07373 | Medium daylight, lively |
| DSC07381 | Balanced, lively |
| DSC07404 | Balanced, natural |
| DSC07411 | Balanced, natural |
| DSC07489 | Balanced, natural |

#### Community / Heritage (cozy, intimate, nostalgic)

| Image | Rationale |
|---|---|
| DSC07290 | Cozy, intimate |
| DSC07296 | Dim, warm earth tones |
| DSC07300 | Cozy, intimate |
| DSC07378 | Cozy, intimate |
| DSC07380 | Cozy, intimate |
| DSC07400 | Cozy, intimate |
| DSC07401 | Cozy, intimate |
| DSC07463 | Dark, cozy, intimate |
| DSC07619 | Darkest, coziest, intimate, nostalgic (flash-fired) |
| DSC07632 | Dark, cozy, intimate (unique -3EV, 1/800s) |

#### Contact / Visit page

| Image | Rationale |
|---|---|
| DSC07557 | Medium daylight, hero-candidate |
| DSC07394 | Medium daylight, hero-candidate |
| DSC07592 | Neutral-warm (rare), balanced |

#### Gallery / Overflow (remaining ~20 images)

All remaining `gallery/events`-tagged images fill into inner page galleries. These are the high-complexity, warm-tone images not assigned above: DSC07306, DSC07335, DSC07346, DSC07349, DSC07370, DSC07373, DSC07404, DSC07411, DSC07416, DSC07455, DSC07477, DSC07489, DSC07495, DSC07502, DSC07510, DSC07518, DSC07522, DSC07524, DSC07525, DSC07528, DSC07533, DSC07538, DSC07541, DSC07557, DSC07561, DSC07570, DSC07584, DSC07590, DSC07592, DSC07597, DSC07616, DSC07622, DSC07629-HDR, DSC07634.

---

## 3. PHASE 1: HOMEPAGE 8-PANEL BUILD

### Current State
```
WalkerHomepage
├── LoadOverlay ("WE BELIEVE")
├── Header (fixed, transparent)
└── HorizontalScroll (height="100vh", gap="0px")
    ├── HorizontalPage [screen] — Video Hero + "Known" h1
    └── HorizontalPage [clamp widths] — "We Value" + 3 ValueCards (placeholder text)
```

### Target State (8 panels per PAGE_ELEMENT_HIERARCHY.md)

```
WalkerHomepage
├── LoadOverlay ("WE BELIEVE")
├── Header (fixed, transparent, updated nav links)
└── HorizontalScroll (height="100vh", gap="0px")
    ├── Panel 1 [screen, 100vw] — Photo Hero (DSC07580 static + gradient)
    ├── Panel 2 [60vw] — "We Believe" Values (Faith/Excellence/Community)
    ├── Panel 3 [120vw] — Photo Grid (12 ImageCards, 3col×4row)
    ├── Panel 4 [50vw] — School Stats (SplitLayout + 3 IconCards)
    ├── Panel 5 [80vw] — Testimonials (3 Cards)
    ├── Panel 6 [100vw] — CTA Banner
    ├── Panel 7 [100vw] — Latest News (3 Cards)
    └── Panel 8 [100vw] — Complete Footer
```

### Panel 1: Photo Hero (replaces Video Hero)

**Decision:** Replace the video hero with a static photo + gradient overlay. Rationale: The current video (`1-homepage-video.mp4`) file size is unknown; the Walker School uses video but our photo inventory has excellent hero candidates. DSC07580 (142.6 brightness, 73.7 contrast) is the best hero image.

**Implementation:**
```tsx
<HorizontalPage screen className={`${styles.panel} ${styles.heroPanel}`} ariaLabel="...">
  <div className={styles.heroBackground} style={{ backgroundImage: "url('/images/DSC07580.jpg')" }} />
  <div className={styles.heroGradient} aria-hidden="true" />
  <div className={styles.heroOverlay}>
    <p className={styles.heroStatement}>
      St. Elizabeth High School inspires transformative learning through meaningful 
      relationships, academic excellence and unique opportunities...
    </p>
    <h1>Guiding Minds, Nurturing Hearts, Building Futures</h1>
  </div>
</HorizontalPage>
```

- Photo: `DSC07580.jpg` — highest brightness + contrast, warm, dynamic
- Gradient fallback: radial + linear using royal blue (`#0c217c` → `#060f45`)
- H1 text: "GUIDING MINDS, NURTURING HEARTS, BUILDING FUTURES" (uppercase, Georgia, fluid clamp)
- Statement text: School mission statement (bottom-left)
- LoadOverlay text: "WE BELIEVE" (SVG mask)

### Panel 2: "We Believe" Values

Replace the placeholder "We Value / Pages stack to the right" content:

```tsx
<HorizontalPage width="clamp(900px, 60vw, 1300px)" ...>
  <div className={styles.dynamicIntro}>
    <Text variant="eyebrow">We Believe</Text>
    <Heading level="h2" variant="section">Values That Shape Our Community</Heading>
    <Text variant="muted" size="medium">
      At St. Elizabeth High School, we are guided by our motto 'Truth and Honesty' 
      and the principle of 'Guiding Minds, Nurturing Hearts, Building Futures.'
    </Text>
  </div>
  <div className={styles.dynamicCards}>
    <ValueCard number="01" title="Faith" body="In God we trust, in Truth we stand..." />
    <ValueCard number="02" title="Excellence" body="Academic rigor and holistic growth..." />
    <ValueCard number="03" title="Community" body="Inclusive, nurturing, and committed..." />
  </div>
</HorizontalPage>
```

### Panel 3: Photo Grid (NEW PANEL, 120vw)

This is the widest panel (120vw on desktop). Uses Grid + ImageCard components:

```tsx
<HorizontalPage width="clamp(1400px, 120vw, 2200px)" ...>
  <Grid columns={4} gap="medium" responsive>
    {photoGridImages.map(img => (
      <ImageCard
        key={img.filename}
        image={`/images/${img.filename}`}
        imageAlt={img.altText}
        title={img.category}
        aspectRatio="4:3"
        href={img.linkHref}
      />
    ))}
  </Grid>
</HorizontalPage>
```

Image categories for the grid (titles appear on hover): "Academics", "Athletics", "Arts", "Student Life" — 3 of each across the 12 images. Each ImageCard links to its section page.

### Panel 4: School Stats (50vw)

```tsx
<HorizontalPage width="clamp(700px, 50vw, 1000px)" ...>
  <SplitLayout
    left={
      <Stack gap="medium">
        <Text variant="eyebrow">Our Legacy</Text>
        <Heading level="h2" variant="section">Since 1949</Heading>
        <Text variant="muted" size="medium">
          St. Elizabeth High School has been educating students in Pomburpa, Goa...
        </Text>
      </Stack>
    }
    right={
      <Grid columns={3} responsive>
        <IconCard icon={...} title="1949" description="Founded" />
        <IconCard icon={...} title="1200+" description="Students" />
        <IconCard icon={...} title="CBSE" description="Affiliated" />
      </Grid>
    }
  />
</HorizontalPage>
```

### Panel 5: Testimonials (80vw)

```tsx
<HorizontalPage width="clamp(1100px, 80vw, 1600px)" ...>
  <Stack gap="large">
    <Text variant="eyebrow">Voices of Our Community</Text>
    <Heading level="h2" variant="section">What They Say</Heading>
    <Grid columns={3} responsive>
      <Card variant="default">
        <Text variant="body">"St. Elizabeth shaped me into the person I am today."</Text>
        <Text variant="caption">— Alumni, Class of 2020</Text>
      </Card>
      <Card variant="default">
        <Text variant="body">"The teachers here don't just teach — they inspire."</Text>
        <Text variant="caption">— Current Student, Class XII</Text>
      </Card>
      <Card variant="default">
        <Text variant="body">"A nurturing environment where every child finds their voice."</Text>
        <Text variant="caption">— Parent</Text>
      </Card>
    </Grid>
  </Stack>
</HorizontalPage>
```

### Panel 6: CTA Banner (100vw)

Use the existing CTASection component:

```tsx
<HorizontalPage screen ...>
  <CTASection
    heading="Ready to Join Our Community?"
    description="Start your St. Elizabeth journey today."
    primaryCTA={{ text: "Inquire Now", href: "/admissions" }}
    secondaryCTA={{ text: "Plan a Visit", href: "/visit" }}
    background="blue"
    centered
  />
</HorizontalPage>
```

### Panel 7: Latest News (100vw)

```tsx
<HorizontalPage screen ...>
  <Section background="soft" padding="large">
    <Container>
      <Stack gap="large">
        <Text variant="eyebrow">Latest News & Events</Text>
        <Grid columns={3} responsive>
          <Card variant="image">
            <ImageCard image="/images/DSC07504.jpg" imageAlt="Annual Day Celebration" 
                       title="Annual Day Celebration 2024" description="November 15, 2024" />
          </Card>
          {/* repeat for 2 more news cards */}
        </Grid>
        <Link href="/news">View All News</Link>
      </Stack>
    </Container>
  </Section>
</HorizontalPage>
```

### Panel 8: Footer (100vw)

```tsx
<HorizontalPage screen ...>
  <Footer
    intro={{ heading: "St. Elizabeth High School", body: "Guiding Minds, Nurturing Hearts, Building Futures." }}
    sections={[
      { title: "About", links: [
        { text: "Mission & Values", href: "/mission" },
        { text: "History", href: "/history" },
        { text: "Staff", href: "/staff" },
      ]},
      // ... 3 more columns
    ]}
    socialLinks={[
      { platform: "facebook", href: "https://facebook.com/stelizabeth" },
      { platform: "instagram", href: "https://instagram.com/stelizabeth" },
    ]}
    copyright="© 2026 St. Elizabeth High School. All Rights Reserved."
    background="maroon"
  />
</HorizontalPage>
```

### Travel Distance Calculation

With 8 panels at these widths:
- Panel 1: 100vw
- Panel 2: 60vw
- Panel 3: 120vw
- Panel 4: 50vw
- Panel 5: 80vw
- Panel 6: 100vw
- Panel 7: 100vw
- Panel 8: 100vw
- **Total: 710vw** = 7.1× viewport width

On a 1440px viewport: travelDistance = 710vw = 10,224px → spacer height = viewportHeight + 10,224px. On a 900px tall viewport: spacer ≈ 11,124px tall.

> **Verify**: The total width sum (710vw) is large. The Walker School uses ~5-6 panels. We should consider reducing Panel 3 to 100vw (from 120vw) and Panel 5 to 60vw to keep total travel manageable: 100+60+100+50+60+100+100+100 = 670vw. Still large but acceptable.

---

## 4. PHASE 2: INNER PAGE INFRASTRUCTURE

### Route Structure (Next.js App Router)

```
src/app/
├── layout.tsx                    (existing — add Header + Footer)
├── page.tsx                      (existing — WalkerHomepage)
├── globals.css                   (existing — update colors)
├── about/
│   ├── page.tsx                  (About landing)
│   ├── mission/page.tsx
│   ├── history/page.tsx
│   ├── staff/page.tsx
│   └── strategic-plan/page.tsx
├── admissions/
│   ├── page.tsx
│   ├── why/page.tsx
│   ├── visit/page.tsx
│   ├── apply/page.tsx
│   ├── tuition/page.tsx
│   └── faqs/page.tsx
├── academics/
│   ├── page.tsx
│   ├── departments/page.tsx
│   ├── languages/page.tsx
│   ├── libraries/page.tsx
│   └── college-counseling/page.tsx
├── student-life/
│   ├── page.tsx
│   └── clubs/page.tsx
├── athletics/
│   ├── page.tsx
│   └── teams/page.tsx
├── arts/
│   ├── page.tsx
│   ├── visual-arts/page.tsx
│   └── performing-arts/page.tsx
├── contact/
│   ├── page.tsx
│   └── visit/page.tsx
├── how-to-help/
│   ├── page.tsx
│   └── give/page.tsx
├── news/
│   └── page.tsx
└── alumni/
    └── page.tsx
```

### Shared Inner Page Layout

All inner pages follow Pattern F from COMPONENTS.md:

```tsx
// src/app/about/page.tsx (template for all inner pages)
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/content/Hero";
import { Footer } from "@/components/navigation/Footer";

export default function AboutPage() {
  return (
    <>
      <Header transparent={false} fixed />
      <main>
        <Hero
          eyebrow="Discover"
          heading="About St. Elizabeth"
          description="..."
          backgroundImage="/images/DSC07548.jpg"
        />
        {/* content sections */}
        <CTASection ... />
      </main>
      <Footer ... />
    </>
  );
}
```

### Inner Page Content Patterns (per PAGE_ELEMENT_HIERARCHY.md §7)

Each inner page uses these composition patterns from COMPONENTS.md:

| Page | Pattern | Components |
|---|---|---|
| About | Content-with-Sidebar | SplitLayout, Stack, MediaBlock |
| Admissions | Content-with-Sidebar + Form (future) | SplitLayout, Card, Stack |
| Academics | Grid of departments | Grid, IconCard |
| Athletics | Grid + Stats | Grid, IconCard, ImageCard |
| Arts | Grid | Grid, ImageCard |
| Student Life | Grid + Text | Grid, Card, Text |
| News | News Grid (paginated) | Grid, Card (image variant) |
| Contact | Maps iframe + Form | SplitLayout, Container |
| How to Help | Content-with-Sidebar + Grid | SplitLayout, Grid, CTASection |
| Alumni | Grid + Form | Grid, Card |

---

## 5. PHASE 3: DATA ARCHITECTURE

### Static Data Files

All content lives in `src/data/` as TypeScript/JSON files (CMS-ready structure):

```
src/data/
├── navigation.ts          # Nav links, footer links, menu structure
├── homepage.ts            # Values, testimonials, stats, news items
├── about.ts               # Mission, history text, staff bios
├── admissions.ts          # Process steps, FAQs, tuition info
├── academics.ts           # Departments, courses, faculty
├── athletics.ts           # Sports, teams, schedules
├── arts.ts                # Programs, faculty, events
├── student-life.ts        # Clubs, organizations, traditions
├── contact.ts             # Address, phone, email, map coordinates
├── how-to-help.ts         # Giving options, sponsorship tiers
├── alumni.ts              # Notable alumni, events
├── news.ts                # News articles, events calendar
└── images.ts              # Centralized image registry with metadata
```

### Image Registry (`src/data/images.ts`)

A central registry mapping images to website sections, including alt text:

```typescript
export interface ImageAsset {
  filename: string;
  alt: string;
  category: "hero" | "gallery" | "academics" | "athletics" | "arts" | 
            "community" | "heritage" | "student-life" | "general";
  section?: string;  // Which page/section uses this image
}

export const IMAGES: Record<string, ImageAsset> = {
  DSC07580: { filename: "DSC07580.jpg", alt: "...", category: "hero", section: "homepage-hero" },
  // ... all 71 images
};
```

---

## 6. PHASE 4: NAVIGATION & INTERACTION

### Header Updates

Current Header has 4 default nav links (`Inquire`, `Visit`, `Summer`, `St. Elizabeth`). Update to match PAGE_ELEMENT_HIERARCHY.md §9:

```typescript
const DEFAULT_NAV: HeaderNavLink[] = [
  { text: "About", href: "/about" },
  { text: "Admissions", href: "/admissions" },
  { text: "Academics", href: "/academics" },
  { text: "Athletics", href: "/athletics" },
  { text: "Arts", href: "/arts" },
  { text: "Student Life", href: "/student-life" },
  { text: "Alumni", href: "/alumni" },
  { text: "News", href: "/news" },
  { text: "Contact", href: "/contact" },
];
```

Right side: `Inquire | Visit | Search | Menu` (Search and Menu buttons currently disabled).

### Scroll Behavior
- Homepage: Header transparent with white text over hero → becomes white with dark text after scrolling past hero
- Inner pages: Header always white with dark text (pass `transparent={false}`)

### Full-Screen Menu Overlay (Future)
- The Menu button is currently disabled
- Needs a new `MenuOverlay` component (or extend Header)
- Walker School shows image preview on nav category hover → we can use DSC07580 or other hero images

---

## 7. PHASE 5: RESPONSIVE & ACCESSIBILITY

### Responsive Breakpoints (consistent with existing system)

| Breakpoint | Behavior |
|---|---|
| >1100px | Full horizontal scroll, 3-4 column grids |
| 760-1100px | Horizontal scroll, 2-3 column grids, nav links hidden |
| 420-759px | Vertical stack (horizontal scroll disabled), 2-col grids, hamburger menu |
| <420px | Single column, reduced padding |
| Landscape + max-height 520px | Height-constrained adjustments |

### Accessibility Requirements
- All images: meaningful `alt` text
- ARIA labels on all sections (`ariaLabel` prop)
- Focus states for keyboard navigation
- Skip-to-content link
- `prefers-reduced-motion`: disable horizontal scroll animation, show native scrollbar

---

## 8. PHASE 6: TESTING STRATEGY

### Unit Tests (extend existing 89 tests)
- New homepage data: test that values, testimonials, stats, news arrays are non-empty
- Image registry: test that all referenced files exist
- Each new page: basic rendering test
- Navigation: test link rendering

### Integration Tests
- HorizontalScroll: test 8-panel layout with real widths
- Responsive: test grid collapse at breakpoints

---

## 9. PHASE 7: BUILD & DEPLOY VERIFICATION

```bash
pnpm build    # Must pass TypeScript checking + produce production build
pnpm test     # All tests must pass
pnpm lint     # No lint errors
```

---

## 10. IMPLEMENTATION ORDER (Dependency-Aware)

### Step 1: Color System Update
- Update `globals.css` custom properties (maroon → royal blue)
- Update `WalkerHomepage.module.css` gradient fallback
- Verify all 89 tests still pass
- **Time: ~30 min | Risk: Low (CSS custom property propagation)**

### Step 2: Data Layer
- Create `src/data/` directory with all data files
- Create image registry
- **Time: ~2 hours | Risk: Low (pure data)**

### Step 3: Homepage 8-Panel Build
- Update WalkerHomepage.tsx with 8 panels
- Update WalkerHomepage.module.css with new panel styles
- Update Header nav links
- **Time: ~4-6 hours | Risk: Medium (panel widths need tuning)**

### Step 4: Inner Page Templates
- Create all route directories
- Build each page using Composition Patterns from COMPONENTS.md
- **Time: ~8-10 hours | Risk: Low (repetitive pattern-based work)**

### Step 5: Footer Update
- Update Footer component with St. Elizabeth content
- **Time: ~1 hour | Risk: Low**

### Step 6: Menu Overlay (if scope permits)
- Enable Menu button
- Build full-screen menu overlay with image previews
- **Time: ~3-4 hours | Risk: Medium (new component)**

### Step 7: Testing & Verification
- Add tests for new pages
- Verify responsive behavior
- Visual verification
- **Time: ~3-4 hours**

---

## 11. KNOWN GAPS & FUTURE WORK

1. **Image subject annotation**: All 71 images lack human-readable descriptions of what's in them. Alt text will need to be manually written or AI-vision-generated.
2. **Menu overlay**: The hamburger menu is disabled. Needs new component.
3. **Search**: Search button is disabled. Needs search implementation.
4. **Forms**: Inquiry/contact forms need React Hook Form implementation + backend.
5. **CMS integration**: Static data files are structured for future WordPress/Strapi migration.
6. **Google Maps**: iframe embed on /contact page needs the URL from PAGE_ELEMENT_HIERARCHY.md.
7. **Video hero**: The current video can be re-enabled as an option — keep the static photo fallback.
8. **News pagination**: News page needs pagination/filtering when content grows beyond 3 items.

---

## 12. QUICK-START SUMMARY

```bash
# 1. Update colors
edit src/app/globals.css  # maroon → royal blue custom properties

# 2. Create data directory
mkdir -p src/data
# Create all .ts data files

# 3. Update homepage
edit src/components/WalkerHomepage/WalkerHomepage.tsx   # 8 panels
edit src/components/WalkerHomepage/WalkerHomepage.module.css  # new panel styles

# 4. Create inner pages
mkdir -p src/app/{about,admissions,academics,student-life,athletics,arts,contact,how-to-help,news,alumni}
# Create page.tsx for each

# 5. Update Header/Footer
edit src/components/navigation/Header/Header.tsx  # nav links
edit src/components/navigation/Footer/Footer.tsx  # St. Elizabeth content

# 6. Verify
pnpm test && pnpm build
```

---

*Plan generated from comprehensive analysis of: PAGE_ELEMENT_HIERARCHY.md, COMPONENTS.md, 71-image metadata catalog, full source code review, and 89-test baseline.*
