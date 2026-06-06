# Implementation Plan: Generic Page Templates for Isomorphic Pages

## Overview

Create three generic page templates (`CardGridPage`, `ListPage`, `VisitPage`) and migrate 8 isomorphic pages to use them. This collapses ~10 pages into reusable components. No visual appearance, data content, URLs, or routing changes.

---

## Files to Create (7 files)

### 1. `src/components/templates/CardGridPage/CardGridPage.tsx`

For pages displaying a grid (or stack) of cards with a hero. **Used by:** visual-arts, performing-arts, mission, strategic-plan.

```typescript
interface CardGridPageProps<T> {
  // Hero
  heroEyebrow?: string;
  heroHeading: string;
  heroDescription?: string;
  heroBackgroundImage?: string;
  // Optional breadcrumb above hero
  breadcrumb?: { href: string; label: string; currentLabel: string };
  // Section
  sectionHeading?: string;
  sectionDescription?: string;
  // Items
  items: readonly T[];
  renderCard: (item: T, index: number) => ReactNode;
  columns?: 2 | 3 | 4;    // When omitted, uses Stack (list layout)
  containerWidth?: "narrow" | "default" | "wide";
  // Accessibility
  sectionAriaLabel: string;
}
```

**Internal structure:**
- PageShell with `hero` prop containing optional breadcrumb + Hero
- Section(background="paper", padding="xlarge") > Container > Stack(gap="large")
  - Optional sectionHeading (Heading h2) + optional sectionDescription (Text muted)
  - If `columns` provided: Grid(columns, gap="medium", responsive) with items.map(renderCard)
  - If `columns` omitted: Stack(gap="medium") with items.map(renderCard)

### 2. `src/components/templates/CardGridPage/index.ts`
```typescript
export { CardGridPage } from "./CardGridPage";
```

### 3. `src/components/templates/ListPage/ListPage.tsx`

For pages displaying people/items with grid/list layout toggle. **Used by:** staff, clubs.

```typescript
interface ListPageProps<T> {
  // Hero
  heroEyebrow?: string;
  heroHeading: string;
  heroDescription?: string;
  heroBackgroundImage?: string;
  // Optional breadcrumb
  breadcrumb?: { href: string; label: string; currentLabel: string };
  // Section
  sectionHeading: string;
  sectionDescription?: string;
  // Items
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  layout?: "grid" | "list";   // default "list"
  columns?: 2 | 3 | 4;        // for grid layout, default 2
  containerWidth?: "narrow" | "default" | "wide";
  // Accessibility
  sectionAriaLabel: string;
}
```

**Internal structure:**
- PageShell with hero (breadcrumb + Hero)
- Section > Container > Stack(gap="xlarge")
  - Stack(gap="medium"): sectionHeading + optional sectionDescription
  - If layout="grid": Grid(columns) with items.map(renderItem)
  - If layout="list": Stack(gap="medium") with items.map(renderItem)

### 4. `src/components/templates/ListPage/index.ts`
```typescript
export { ListPage } from "./ListPage";
```

### 5. `src/components/templates/VisitPage/VisitPage.tsx`

For the two visit pages sharing a SplitLayout + map + address pattern. **Used by:** admissions/visit, contact/visit.

```typescript
interface VisitInfoCard {
  eyebrow: string;
  content: ReactNode;
}

interface MapConfig {
  title: string;
  addressLines: ReactNode;
  embedUrl: string;
}

interface VisitPageProps {
  // Hero
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroBackgroundImage: string;
  // Section
  sectionHeading: string;
  introText: string;
  // Content
  infoCards: VisitInfoCard[];
  mapConfig: MapConfig;
  // Accessibility
  sectionAriaLabel: string;
}
```

**Internal structure:**
- PageShell with Hero
- Section > Container(width="wide") > SplitLayout(ratio="2-1")
  - **Left:** Stack(gap="large")
    - Stack(gap="medium"): Heading(h2, variant="section") + Text(introText)
    - infoCards.map(card => Card > Stack > Text(eyebrow) + Text(content))
  - **Right:** Stack(gap="medium")
    - Heading(h3, variant="card") with mapConfig.title
    - Text with addressLines
    - div (iframe wrapper) with Google Maps embed

### 6. `src/components/templates/VisitPage/index.ts`
```typescript
export { VisitPage } from "./VisitPage";
```

### 7. `src/components/templates/index.ts`
Barrel re-export of all three templates.

---

## Files to Modify

### Data files (5 files) — Add page config objects

#### `src/data/arts.ts` — Add:
```typescript
export const VISUAL_ARTS_PAGE = {
  metaTitle: "Visual Arts",
  metaDescription: "Explore the visual arts programme at St. Elizabeth High School — drawing, painting, sculpture, 3D design, and art history.",
  heroEyebrow: "Create",
  heroHeading: "Visual Arts",
  heroDescription: "Develop your artistic voice through hands-on practice in drawing, painting, sculpture, and art appreciation.",
  sectionHeading: "Our Programmes",
  sectionAriaLabel: "Visual arts programmes",
} as const;

export const PERFORMING_ARTS_PAGE = {
  metaTitle: "Performing Arts",
  metaDescription: "Explore the performing arts programme at St. Elizabeth High School — music, dance, drama, and our annual arts festival.",
  heroEyebrow: "Perform",
  heroHeading: "Performing Arts",
  heroDescription: "Find your voice on stage — through music, dance, and drama — and celebrate Goa's rich performance traditions.",
  sectionHeading: "Our Programmes",
  sectionAriaLabel: "Performing arts programmes",
} as const;
```

#### `src/data/about.ts` — Add:
```typescript
export const MISSION_PAGE = {
  metaTitle: "Mission & Values",
  metaDescription: "Discover the mission and values that guide St. Elizabeth High School — Truth, Honesty, academic excellence, and faith in action.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Mission & Values" },
  heroEyebrow: "Our Purpose",
  heroHeading: "Mission & Values",
  heroDescription: "A nurturing Catholic school community dedicated to academic excellence, character formation, and service to others.",
  sectionAriaLabel: "Mission and values",
} as const;

export const STRATEGIC_PLAN_PAGE = {
  metaTitle: "Strategic Plan",
  metaDescription: "Explore the strategic plan for St. Elizabeth High School — academic innovation, campus development, community engagement, and sustainability.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Strategic Plan" },
  heroEyebrow: "Our Future",
  heroHeading: "Strategic Plan",
  heroDescription: "Charting the course for St. Elizabeth High School's next chapter — building on our legacy while embracing the opportunities ahead.",
  sectionHeading: "Priorities for the Future",
  sectionAriaLabel: "Strategic plan",
} as const;

export const STAFF_PAGE = {
  metaTitle: "Staff & Leadership",
  metaDescription: "Meet the leadership team at St. Elizabeth High School — dedicated educators and administrators committed to Truth and Honesty.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Staff & Leadership" },
  heroEyebrow: "Our Leaders",
  heroHeading: "Staff & Leadership",
  heroDescription: "The dedicated educators and administrators who bring the mission of St. Elizabeth High School to life every day.",
  sectionHeading: "Leadership Team",
  sectionAriaLabel: "Staff and leadership",
} as const;
```

#### `src/data/student-life.ts` — Add:
```typescript
export const CLUBS_PAGE = {
  metaTitle: "Clubs & Organizations",
  metaDescription: "Explore the clubs and organizations at St. Elizabeth High School — from debate and drama to eco club, student council, and community service.",
  heroEyebrow: "Get Involved",
  heroHeading: "Clubs & Organizations",
  heroDescription: "Discover your passion, develop leadership skills, and build lifelong friendships through our diverse range of student clubs and organizations.",
  sectionHeading: "Explore Our Clubs",
  sectionDescription: "With clubs spanning academics, arts, athletics, service, and leadership, there's something for every student at St. Elizabeth High School.",
  sectionAriaLabel: "Clubs and organizations",
} as const;
```

#### `src/data/admissions.ts` — Add:
```typescript
export const ADMISSIONS_VISIT_PAGE = {
  metaTitle: "Plan Your Visit",
  metaDescription: "Plan your visit to St. Elizabeth High School in Pomburpa, Goa. Tour our campus, meet our faculty, and experience our community firsthand.",
  heroEyebrow: "Visit Us",
  heroHeading: "Plan Your Visit",
  heroDescription: "Experience St. Elizabeth High School firsthand — walk our campus, meet our faculty, and discover what makes our community special.",
  sectionHeading: "Schedule a Campus Tour",
  introText: "We welcome families to visit our campus and experience the St. Elizabeth difference. Tours are available Monday through Friday by appointment. During your visit, you'll tour our facilities, observe classes in session, and meet with our admissions team.",
  sectionAriaLabel: "Visit information",
} as const;
```

#### `src/data/contact.ts` — Add:
```typescript
export const CONTACT_VISIT_PAGE = {
  metaTitle: "Visit St. Elizabeth",
  metaDescription: "Visit St. Elizabeth High School in Pomburpa, Goa. Get directions, schedule a campus tour, and find our address and contact information.",
  heroEyebrow: "Welcome",
  heroHeading: "Visit St. Elizabeth",
  heroDescription: "We invite you to experience our campus, meet our community, and discover what makes St. Elizabeth High School special.",
  sectionHeading: "Directions",
  introText: "St. Elizabeth High School is located in the village of Pomburpa in Bardez taluka, North Goa. We're easily accessible from Panjim (approximately 15 km), Mapusa (approximately 10 km), and Calangute (approximately 12 km).",
  sectionAriaLabel: "Visit information and directions",
} as const;
```

### Page files (8 files) — Replace with template usage

Each page file becomes ~10-30 lines:

#### CardGridPage migrations (4 pages):

| Page | Template | Columns | Has Breadcrumb |
|------|----------|---------|----------------|
| arts/visual-arts | CardGridPage | none (Stack) | No |
| arts/performing-arts | CardGridPage | none (Stack) | No |
| about/mission | CardGridPage | 2 | Yes |
| about/strategic-plan | CardGridPage | 2 | Yes |

#### ListPage migrations (2 pages):

| Page | Template | Layout | Columns |
|------|----------|--------|---------|
| about/staff | ListPage | list (default) | — |
| student-life/clubs | ListPage | grid | 2 |

#### VisitPage migrations (2 pages):

| Page | Template | 
|------|----------|
| admissions/visit | VisitPage |
| contact/visit | VisitPage |

---

## Page File Reductions

### Example: `about/mission/page.tsx`
- **Before:** 84 lines
- **After:** ~28 lines including imports (67% reduction)
- Uses: CardGridPage with breadcrumb, columns=2, sectionHeading from MISSION_STATEMENT.body

### Example: `admissions/visit/page.tsx`
- **Before:** 116 lines
- **After:** ~35 lines including imports (70% reduction)
- Uses: VisitPage with 2 infoCards, mapConfig with Google Maps embed

### Example: `about/staff/page.tsx`
- **Before:** 88 lines
- **After:** ~22 lines including imports (75% reduction)

---

## Key Design Decisions

1. **Metadata stays in page files** — Next.js App Router requires `export const metadata` at the page module level for static analysis. Template components cannot generate metadata.

2. **renderCard/renderItem callbacks stay in page files** — These return JSX (components) and belong in the composition layer (page), not data files. The page file is where data meets rendering.

3. **CardGridPage vs ListPage are separate** — Per spec requirement. CardGridPage: section heading optional, defaults to Stack. ListPage: section heading required, defaults to list layout with explicit `layout` prop.

4. **No changes to visual appearance, data content, URLs, or routing** — Templates render the exact same component tree, just parameterized. Tests that check for specific heading text should continue to pass.

5. **Image references stay in page files** — Images are imported from `@/data/images` in the page file and passed as string props to templates. This keeps template components decoupled from the image registry.

6. **Breadcrumb is an optional `breadcrumb` prop** — The template handles the breadcrumb nav rendering internally when the prop is provided, so pages don't need to include Link/nav boilerplate.

---

## Verification Checklist

1. ✅ `npm test` — All 89 existing tests pass
2. ✅ `npm run build` — Build succeeds with no TypeScript or bundling errors
3. ✅ Visual — The 8 migrated pages render identically (same DOM structure)
4. ✅ Data content — All textual content unchanged, just moved to data files
5. ✅ URLs — No routing changes, all pages at same paths
6. ✅ Existing test assertions — Tests that check for heading text like "Mission & Values", "Visual Arts", "Staff & Leadership", etc. continue to pass

---

## Implementation Order

1. Create `src/components/templates/CardGridPage/` (2 files)
2. Create `src/components/templates/ListPage/` (2 files)
3. Create `src/components/templates/VisitPage/` (2 files)
4. Create `src/components/templates/index.ts` (barrel export)
5. Add data objects to: arts.ts, about.ts, student-life.ts, admissions.ts, contact.ts
6. Migrate page files one at a time, verifying build after each
7. Run full test suite
8. Final build verification
