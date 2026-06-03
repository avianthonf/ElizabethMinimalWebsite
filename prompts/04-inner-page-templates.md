# Step 4: Inner Page Templates — All Route Groups

> **Handoff to:** Senior Frontend Engineer
> **Estimated time:** 8–10 hours
> **Risk level:** Low — repetitive pattern-based work, each page follows the same architecture
> **Depends on:** Step 1 (colors), Step 2 (data), Step 3 (homepage)
> **Baseline:** All previous tests passing, clean build

---

## 1. CONTEXT

### What We're Building

Every inner page for the full St. Elizabeth website — 10 route groups, ~30 individual pages. Each page follows the **Content-with-Sidebar** pattern or the **Grid** pattern from COMPONENTS.md (Patterns A–F).

The component system is complete — every page is built by composing existing Tier 1 (primitives), Tier 2 (layout), and Tier 3 (content) components. No new components are needed.

### Architecture: Two Page Templates

**Template A — Content-with-Sidebar** (used by: About, Admissions, How to Help, Contact):
```
Header (fixed, white bg)
├── Hero (full-width, static photo bg) — "PAGE TITLE"
├── Container (wide)
│   ├── SplitLayout (ratio="2-1")
│   │   ├── Main (left, 2/3): Text, MediaBlock × N, Grid
│   │   └── Sidebar (right, 1/3): Related links, CTAs
│   └── CTASection (optional)
└── Footer
```

**Template B — Grid Index** (used by: Academics, Athletics, Arts, Student Life, News, Alumni):
```
Header (fixed, white bg)
├── Hero (full-width, static photo bg) — "PAGE TITLE"
├── Container (default or wide)
│   ├── Grid (3–4 columns, responsive)
│   │   └── IconCard or ImageCard × N (linking to sub-pages)
│   └── Text sections (optional)
└── Footer
```

### Component Rules (from COMPONENTS.md)

1. **Use `Section` + `Container` together.** Section provides the background/vertical padding; Container provides horizontal containment.
2. **Use `Stack` for vertical rhythm.** Consecutive headings, text, buttons → wrap in `<Stack gap="medium">`.
3. **Use `SplitLayout` for two-column layouts.** This is the canonical pattern for intro-text + card-stack.
4. **Use `Grid` with `responsive={true}`** for automatic column collapse.
5. **Pass `ariaLabel` to Section** — it becomes a named `<section>` region.
6. **Do NOT add `border-radius`, `box-shadow`, or inline spacing.** Use layout components.

---

## 2. DIRECTORY STRUCTURE TO CREATE

```
src/app/
├── about/
│   ├── page.tsx                    # About landing
│   ├── mission/
│   │   └── page.tsx                # Mission & Values
│   ├── history/
│   │   └── page.tsx                # School History
│   ├── staff/
│   │   └── page.tsx                # Head of School, Board
│   └── strategic-plan/
│       └── page.tsx                # Strategic Plan
├── admissions/
│   ├── page.tsx                    # Admissions landing
│   ├── why/
│   │   └── page.tsx                # Why St. Elizabeth?
│   ├── visit/
│   │   └── page.tsx                # Plan Your Visit
│   ├── apply/
│   │   └── page.tsx                # Admission Steps
│   ├── tuition/
│   │   └── page.tsx                # Tuition & Financial Assistance
│   └── faqs/
│       └── page.tsx                # Frequently Asked Questions
├── academics/
│   ├── page.tsx                    # Academics landing (grid of departments)
│   ├── departments/
│   │   └── page.tsx                # All departments overview
│   ├── languages/
│   │   └── page.tsx                # World Languages
│   ├── libraries/
│   │   └── page.tsx                # Libraries
│   └── college-counseling/
│       └── page.tsx                # College Counseling
├── student-life/
│   ├── page.tsx                    # Student Life landing
│   └── clubs/
│       └── page.tsx                # Clubs & Organizations
├── athletics/
│   ├── page.tsx                    # Athletics landing
│   └── teams/
│       └── page.tsx                # Team Schedules
├── arts/
│   ├── page.tsx                    # Arts landing
│   ├── visual-arts/
│   │   └── page.tsx                # Visual Arts
│   └── performing-arts/
│       └── page.tsx                # Performing Arts
├── contact/
│   ├── page.tsx                    # Contact landing (map + form)
│   └── visit/
│       └── page.tsx                # Visit St. Elizabeth
├── how-to-help/
│   ├── page.tsx                    # How to Help landing
│   └── give/
│       └── page.tsx                # Donations & Sponsorship
├── news/
│   └── page.tsx                    # News & Events
└── alumni/
    └── page.tsx                    # Alumni
```

---

## 3. FILE SPECIFICATIONS — LANDING PAGES

### 3.1 `/about/page.tsx` — About Landing

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { MediaBlock } from "@/components/content/MediaBlock";
import { CTASection } from "@/components/content/CTASection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Grid } from "@/components/layout/Grid";
import { IconCard } from "@/components/content/IconCard";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Icon } from "@/components/primitives/Icon";
import { CommunityIcon } from "@/components/icons/CommunityIcon";
import { AcademicIcon } from "@/components/icons/AcademicIcon";
import { ArtsIcon } from "@/components/icons/ArtsIcon";
import { HEADER_NAV_LINKS, FOOTER_SECTIONS, FOOTER_INTRO, FOOTER_SOCIAL_LINKS, FOOTER_COPYRIGHT } from "@/data/navigation";
import { HERO_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "About | St. Elizabeth High School",
  description: "Learn about St. Elizabeth High School's mission, history, and values in Pomburpa, Goa.",
};

export default function AboutPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main>
        <Hero
          eyebrow="Discover"
          heading="About St. Elizabeth"
          description="Guided by our motto 'Truth and Honesty,' St. Elizabeth High School has been nurturing young minds in Pomburpa, Goa since 1949."
          backgroundImage={`/images/${HERO_IMAGES.find((i) => i.section === "about-hero")?.filename ?? HERO_IMAGES[0].filename}`}
        />

        <Section background="paper" padding="xlarge" ariaLabel="About St. Elizabeth">
          <Container>
            <SplitLayout
              left={
                <Stack gap="large">
                  <Stack gap="medium">
                    <Text variant="eyebrow">Our Story</Text>
                    <Heading level="h2" variant="section">Educating the Whole Person</Heading>
                    <Text variant="muted" size="medium">
                      St. Elizabeth High School is a nurturing Catholic school community where students are known,
                      challenged, and supported. Our commitment to Truth and Honesty shapes every aspect of school
                      life — from academic excellence to character formation.
                    </Text>
                  </Stack>
                  <MediaBlock
                    mediaType="image"
                    mediaSrc={`/images/${HERO_IMAGES[1]?.filename ?? HERO_IMAGES[0].filename}`}
                    mediaAlt="St. Elizabeth High School campus"
                    heading="A Tradition of Excellence"
                    description="For over seven decades, St. Elizabeth has provided quality education to students from across North Goa."
                    mediaPosition="left"
                    cta={{ text: "Our History", href: "/about/history" }}
                  />
                </Stack>
              }
              right={
                <Stack gap="medium">
                  <Heading level="h3" variant="card">Explore</Heading>
                  <Grid columns={1} gap="small" responsive={false}>
                    <IconCard icon={<Icon size="medium"><CommunityIcon /></Icon>} title="Mission & Values" description="Our guiding principles" href="/about/mission" />
                    <IconCard icon={<Icon size="medium"><AcademicIcon /></Icon>} title="History" description="Since 1949" href="/about/history" />
                    <IconCard icon={<Icon size="medium"><ArtsIcon /></Icon>} title="Staff" description="Our leadership team" href="/about/staff" />
                  </Grid>
                </Stack>
              }
            />
          </Container>
        </Section>

        <CTASection
          heading="Ready to Learn More?"
          primaryCTA={{ text: "Plan a Visit", href: "/contact/visit" }}
          background="blue"
        />
      </main>
      <Footer
        intro={FOOTER_INTRO}
        sections={FOOTER_SECTIONS}
        socialLinks={FOOTER_SOCIAL_LINKS}
        copyright={FOOTER_COPYRIGHT}
      />
    </>
  );
}
```

### 3.2 `/admissions/page.tsx` — Admissions Landing

Follows Template A. Structure:
```tsx
<Hero eyebrow="Join Us" heading="Admissions at St. Elizabeth" backgroundImage={admissionsHeroImage} />
<Section><Container>
  <SplitLayout
    left={<Stack>
      <Text variant="eyebrow">Welcome</Text>
      <Heading level="h2">Begin Your Journey</Heading>
      <Text variant="muted">description...</Text>
      <Grid columns={2} responsive>
        <IconCard title="Why St. Elizabeth?" description="..." href="/admissions/why" />
        <IconCard title="Plan Your Visit" description="..." href="/admissions/visit" />
        <IconCard title="Apply" description="..." href="/admissions/apply" />
        <IconCard title="Tuition & Assistance" description="..." href="/admissions/tuition" />
      </Grid>
    </Stack>}
    right={<Stack>
      <Heading level="h3">Key Dates</Heading>
      <Card>Application deadline: ...</Card>
      <Card>Open House: ...</Card>
      <Link href="/admissions/faqs">View FAQs</Link>
    </Stack>}
  />
</Container></Section>
```

### 3.3 `/academics/page.tsx` — Academics Landing

Follows Template B. Grid of 7 departments as IconCards linking to sub-pages:
```tsx
<Hero eyebrow="Learn" heading="Academics" backgroundImage={academicsHeroImage} />
<Section background="soft" padding="xlarge">
  <Container>
    <Stack gap="xlarge">
      <Heading level="h2" variant="section">Our Departments</Heading>
      <Grid columns={4} gap="medium" responsive>
        {DEPARTMENTS.map(dept => (
          <IconCard key={dept.name} icon={deptIcon} title={dept.name} description={dept.description} href={dept.href} />
        ))}
      </Grid>
    </Stack>
  </Container>
</Section>
```

### 3.4 `/athletics/page.tsx` — Athletics Landing

Template B. Grid of 7 sports as ImageCards:
```tsx
<Hero eyebrow="Compete" heading="Athletics at St. Elizabeth" backgroundImage={athleticsHeroImage} />
<Section background="paper" padding="xlarge">
  <Container>
    <Stack gap="xlarge">
      <Heading level="h2" variant="section">Our Sports Programs</Heading>
      <Grid columns={3} gap="large" responsive>
        {SPORTS.map(sport => (
          <ImageCard image={sportImage} imageAlt={sport.name} title={sport.name} description={sport.description} href={`/athletics/teams#${sport.name.toLowerCase()}`} />
        ))}
      </Grid>
      <Grid columns={3} gap="medium">
        <IconCard icon={...} title="7" description="Varsity Teams" />
        <IconCard icon={...} title="300+" description="Student-Athletes" />
        <IconCard icon={...} title="15+" description="Championships" />
      </Grid>
    </Stack>
  </Container>
</Section>
```

### 3.5 `/arts/page.tsx` — Arts Landing

Template B. Uses the 4 arts images:
```tsx
<Hero eyebrow="Create" heading="Arts at St. Elizabeth" backgroundImage={artsHeroImage} />
<Section background="soft" padding="xlarge">
  <Container>
    <Stack gap="xlarge">
      <Heading level="h2" variant="section">Visual & Performing Arts</Heading>
      <Grid columns={2} gap="large" responsive>
        <Card variant="image"><ImageCard image={...} title="Visual Arts" description="..." href="/arts/visual-arts" /></Card>
        <Card variant="image"><ImageCard image={...} title="Performing Arts" description="..." href="/arts/performing-arts" /></Card>
      </Grid>
    </Stack>
  </Container>
</Section>
```

### 3.6 `/student-life/page.tsx` — Student Life Landing

Template B with clubs grid:
```tsx
<Hero eyebrow="Belong" heading="Student Life" backgroundImage={studentLifeHeroImage} />
<Section background="paper" padding="xlarge">
  <Container>
    <Stack gap="xlarge">
      <Heading level="h2" variant="section">Clubs & Organizations</Heading>
      <Grid columns={3} gap="medium" responsive>
        {CLUBS.map(club => (
          <Card key={club.name} variant="default"><Stack gap="small">
            <Heading level="h3" variant="card">{club.name}</Heading>
            <Text variant="caption">{club.category}</Text>
            <Text variant="muted" size="small">{club.description}</Text>
          </Stack></Card>
        ))}
      </Grid>
    </Stack>
  </Container>
</Section>
```

### 3.7 `/contact/page.tsx` — Contact Page

Template A with Google Maps iframe + inquiry form (placeholder for now):
```tsx
<Hero eyebrow="Connect" heading="Contact Us" backgroundImage={contactHeroImage} />
<Section background="paper" padding="xlarge">
  <Container>
    <SplitLayout
      left={<Stack gap="large">
        <Heading level="h2" variant="section">Get in Touch</Heading>
        <Stack gap="medium">
          <Text variant="eyebrow">Address</Text>
          <Text variant="muted">
            Ven. Fr. Hilario Gonsalves Rd<br />
            Pomburpa, Bardez<br />
            Goa 4031102, India
          </Text>
        </Stack>
        <Stack gap="medium">
          <Text variant="eyebrow">Contact</Text>
          <Text variant="muted">Phone: +91 XXXXXXXXXX</Text>
          <Text variant="muted">Email: info@stelizabethhighschool.in</Text>
        </Stack>
        {/* Form placeholder — future implementation */}
        <Card variant="default" padding="large">
          <Text variant="caption">Inquiry form coming soon.</Text>
        </Card>
      </Stack>}
      right={<Stack gap="medium">
        <Heading level="h3" variant="card">Find Us</Heading>
        <div style={{ width: "100%", aspectRatio: "4/3", border: "1px solid var(--color-line)" }}>
          <iframe
            src="https://maps.google.com/maps?q=St.+Elizabeth+High+School+Pomburpa+Goa&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="St. Elizabeth High School on Google Maps"
          />
        </div>
      </Stack>}
    />
  </Container>
</Section>
```

### 3.8 `/how-to-help/page.tsx` — How to Help Landing

Template A:
```tsx
<Hero eyebrow="Support" heading="How to Help" backgroundImage={communityHeroImage} />
<Section background="soft" padding="xlarge">
  <Container>
    <SplitLayout
      left={<Stack gap="large">
        <Heading level="h2" variant="section">Make a Difference</Heading>
        <Text variant="muted">Your support helps us continue our mission...</Text>
        <Grid columns={2} gap="medium" responsive>
          <IconCard icon={...} title="Donate" description="..." href="/how-to-help/give" />
          <IconCard icon={...} title="Sponsor" description="..." href="/how-to-help/give" />
          <IconCard icon={...} title="Volunteer" description="..." href="/how-to-help/give" />
        </Grid>
      </Stack>}
      right={<Stack gap="medium">
        <Heading level="h3" variant="card">Giving Levels</Heading>
        {SPONSORSHIP_TIERS.map(tier => (
          <Card key={tier.name}><Stack gap="small">
            <Heading level="h3" variant="card">{tier.name}</Heading>
            <Text variant="muted">{tier.description}</Text>
          </Stack></Card>
        ))}
      </Stack>}
    />
  </Container>
</Section>
<CTASection heading="Support Our Mission" primaryCTA={{ text: "Give Now", href: "/how-to-help/give" }} background="blue" />
```

### 3.9 `/news/page.tsx` — News Page

Template B with full news grid:
```tsx
<Hero eyebrow="Stay Informed" heading="News & Events" backgroundImage={newsHeroImage} />
<Section background="paper" padding="xlarge">
  <Container>
    <Grid columns={3} gap="large" responsive>
      {NEWS_ARTICLES.map(article => (
        <ImageCard
          key={article.href}
          image={`/images/${article.imageFilename}`}
          imageAlt={article.title}
          title={article.title}
          description={`${article.date} — ${article.excerpt}`}
          aspectRatio="4:3"
          href={article.href}
        />
      ))}
    </Grid>
  </Container>
</Section>
```

### 3.10 `/alumni/page.tsx` — Alumni Page

Template B:
```tsx
<Hero eyebrow="Reconnect" heading="St. Elizabeth Alumni" backgroundImage={communityHeroImage} />
<Section background="soft" padding="xlarge">
  <Container>
    <Stack gap="xlarge">
      <Heading level="h2" variant="section">Our Alumni Community</Heading>
      <Text variant="muted" size="medium">Stay connected with your St. Elizabeth family...</Text>
      <Grid columns={3} gap="medium" responsive>
        {NOTABLE_ALUMNI.map(alum => (
          <Card key={alum.name}><Stack gap="small">
            <Heading level="h3" variant="card">{alum.name}</Heading>
            <Text variant="caption">{alum.class}</Text>
            <Text variant="muted">{alum.achievement}</Text>
          </Stack></Card>
        ))}
      </Grid>
    </Stack>
  </Container>
</Section>
```

---

## 4. FILE SPECIFICATIONS — SUB-PAGES

Each sub-page (e.g., `/about/mission/page.tsx`, `/admissions/why/page.tsx`) follows the same pattern — just with different content. Create each one with:

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
// ... data imports

export const metadata: Metadata = {
  title: "Page Title | St. Elizabeth High School",
  description: "Page description for SEO.",
};

export default function SubPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main>
        <Hero eyebrow="..." heading="..." description="..." backgroundImage="..." />
        <Section background="paper" padding="xlarge" ariaLabel="...">
          <Container width="narrow">
            <Stack gap="large">
              {/ * page-specific content * /}
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer intro={FOOTER_INTRO} sections={FOOTER_SECTIONS} socialLinks={FOOTER_SOCIAL_LINKS} copyright={FOOTER_COPYRIGHT} />
    </>
  );
}
```

### Sub-page content mapping:

| Sub-page | Hero eyebrow | Hero heading | Hero image | Body content |
|---|---|---|---|---|
| `/about/mission` | "Our Purpose" | "Mission & Values" | COMMUNITY_IMAGES[2] | MISSION_STATEMENT text + list of values |
| `/about/history` | "Our Story" | "School History" | COMMUNITY_IMAGES[0] | HISTORY_TIMELINE items |
| `/about/staff` | "Our Leaders" | "Staff & Leadership" | COMMUNITY_IMAGES[1] | STAFF_MEMBERS list |
| `/admissions/why` | "Discover" | "Why St Elizabeth?" | HERO_IMAGES[2] | WHY_ST_ELIZABETH_POINTS |
| `/admissions/visit` | "Visit Us" | "Plan Your Visit" | CONTACT_IMAGES[0] | Visit info + map |
| `/admissions/apply` | "Apply" | "Admission Steps" | HERO_IMAGES[2] | ADMISSION_STEPS |
| `/admissions/tuition` | "Invest" | "Tuition & Assistance" | HERO_IMAGES[2] | TUITION_INFO |
| `/admissions/faqs` | "Questions" | "FAQs" | HERO_IMAGES[2] | FAQS array |

---

## 5. SHARED LAYOUT CONSIDERATION

Currently, every page has its own `<Header>` and `<Footer>` render. This is intentional for the initial build — each page is self-contained. In a future optimization pass, these can be extracted to a shared `layout.tsx` per route group. The decision to duplicate is deliberate:

1. **Each page is independently readable** — no hidden layout inheritance to debug
2. **Header props differ per page** — homepage has `transparent={true}`, inner pages have `transparent={false}`
3. **Quick to refactor later** — extract a shared `<PageLayout>` wrapper when patterns stabilize

---

## 6. RESPONSIVE BEHAVIOR

All inner pages use the existing component breakpoints:
- Grid: `responsive={true}` handles column collapse (4→2→1)
- SplitLayout: stacks at 760px (media above text)
- Container: adjusts horizontal padding at 760px
- Header: nav links hidden at 1100px, search hidden at 760px
- Hero: full-viewport on all sizes, text scales via fluid clamp()

No additional responsive code is needed — the component system handles it.

---

## 7. ACCEPTANCE CRITERIA

- [ ] All route directories exist with their `page.tsx` files
- [ ] Every page renders without errors
- [ ] Every page has proper `<title>` and `<meta description>` for SEO
- [ ] Every page has proper `<html lang="en">` (from root layout)
- [ ] Every page uses `ariaLabel` on at least the main `<Section>`
- [ ] All images referenced via the data layer (no hardcoded paths)
- [ ] All text content imported from `@/data/` (no hardcoded strings except metadata)
- [ ] `pnpm build` passes — zero TypeScript errors across all new files
- [ ] `pnpm test` passes — existing tests still green
- [ ] No new components created — all pages use existing Tier 1–3 components
- [ ] No inline styles for spacing — uses Stack, Grid, SplitLayout, Container
- [ ] No hardcoded colours — uses CSS custom properties
- [ ] Footer renders correctly on all pages

---

*Handoff complete. This is the most voluminous step — 30+ pages. Proceed to Step 5 after verification.*
