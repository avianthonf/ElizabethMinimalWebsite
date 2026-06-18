# Inner Page System

All inner pages (29 routes) follow a consistent page-shell pattern. Three template components handle the majority of pages; the remaining pages are hand-composed using the same building blocks.

## Page Shell Pattern

Every inner page wraps its content in `PageShell`, which provides:

- Full-width hero section (from header to bottom of hero image)
- Below-hero content area (white background, constrained width)
- Footer (from `Footer` component)
- Header theme management (light/dark)

```
PageShell
├── Hero (optional eyebrow + heading + description + background image)
└── Content (children)
    └── Section → Container → Stack|Grid → Components
```

### Components Used

| Component     | Source                            | Purpose                                                  |
| ------------- | --------------------------------- | -------------------------------------------------------- |
| `PageShell`   | `@/components/layout/PageShell`   | Root layout for all Inner pages                          |
| `Hero`        | `@/components/content/Hero`       | Hero banner with heading, description, optional bg image |
| `Section`     | `@/components/layout/Section`     | Semantic `<section>`, background color, padding          |
| `Container`   | `@/components/layout/Container`   | Width constraint (narrow/default/wide)                   |
| `Stack`       | `@/components/layout/Stack`       | Vertical flex stack with configurable gap                |
| `Cluster`     | `@/components/layout/Cluster`     | Horizontal flex with wrapping and gap                    |
| `Grid`        | `@/components/layout/Grid`        | CSS Grid with responsive columns                         |
| `SplitLayout` | `@/components/layout/SplitLayout` | Two-column split (2-1, 1-1, 1-2 ratios)                  |

---

## Template: CardGridPage

**File**: `src/components/templates/CardGridPage/CardGridPage.tsx`

Generic template for pages that display a grid (or stack) of cards behind a Hero banner. Used by ~12 pages.

### Props

| Prop                | Type                            | Required | Default         |
| ------------------- | ------------------------------- | -------- | --------------- |
| heroEyebrow         | string                          | No       | undefined       |
| heroHeading         | string                          | Yes      | —               |
| heroDescription     | string                          | No       | undefined       |
| heroBackgroundImage | string                          | No       | undefined       |
| breadcrumb          | {href, label, currentLabel}     | No       | undefined       |
| sectionHeading      | string                          | No       | undefined       |
| sectionDescription  | string                          | No       | undefined       |
| items               | readonly T[]                    | Yes      | —               |
| renderCard          | (item, index) => ReactNode      | Yes      | —               |
| columns             | GridColumns (2\|3\|4)           | No       | Stack (no grid) |
| containerWidth      | "narrow" \| "default" \| "wide" | No       | "narrow"        |
| sectionAriaLabel    | string                          | Yes      | —               |

### Pages Using CardGridPage

| Page                  | Route                         | Items            | Columns |
| --------------------- | ----------------------------- | ---------------- | ------- |
| Academics Overview    | /academics                    | department cards | 3       |
| Academic Departments  | /academics/departments        | subject cards    | 3       |
| College Counseling    | /academics/college-counseling | program cards    | 2       |
| World Languages       | /academics/languages          | language cards   | 3       |
| Libraries             | /academics/libraries          | library cards    | 2       |
| Athletics             | /athletics                    | sport cards      | 2       |
| Clubs & Organizations | /student-life/clubs           | club cards       | 3       |
| Visual Arts           | /arts/visual-arts             | program cards    | 2       |
| Performing Arts       | /arts/performing-arts         | program cards    | 2       |

---

## Template: ListPage

**File**: `src/components/templates/ListPage/ListPage.tsx`

Generic template for pages that display a list (or grid) of people/items behind a Hero banner.

### Props

Same as `CardGridPage`, plus:

| Prop       | Type                       | Required | Default |
| ---------- | -------------------------- | -------- | ------- |
| renderItem | (item, index) => ReactNode | Yes      | —       |
| layout     | "list" \| "grid"           | No       | "list"  |

### Pages Using ListPage

| Page              | Route            | Items                | Layout |
| ----------------- | ---------------- | -------------------- | ------ |
| Staff             | /about/staff     | staff member cards   | list   |
| Notable Alumni    | /alumni          | notable alumni cards | list   |
| Teams & Schedules | /athletics/teams | team rows            | list   |

---

## Template: VisitPage

**File**: `src/components/templates/VisitPage/VisitPage.tsx`

Generic template for visit/directions pages. Split layout: info cards on left, map on right.

### Props

| Prop                | Type                             | Required |
| ------------------- | -------------------------------- | -------- |
| heroEyebrow         | string                           | Yes      |
| heroHeading         | string                           | Yes      |
| heroDescription     | string                           | Yes      |
| heroBackgroundImage | string                           | Yes      |
| sectionHeading      | string                           | Yes      |
| introText           | string                           | Yes      |
| infoCards           | {eyebrow, content}[]             | Yes      |
| mapConfig           | {title, addressLines?, embedUrl} | Yes      |
| sectionAriaLabel    | string                           | Yes      |

### Pages Using VisitPage

| Page                         | Route             |
| ---------------------------- | ----------------- |
| Plan Your Visit (Admissions) | /admissions/visit |
| Visit (Contact)              | /contact/visit    |

---

## Hand-Composed Pages (No Template)

The following 14 pages are hand-composed using `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, and content components. They typically have unique layouts that don't fit the card-grid or list patterns.

| Page              | Route                 | Key Layout               |
| ----------------- | --------------------- | ------------------------ |
| About             | /about                | Hero + content sections  |
| History           | /about/history        | Hero + timeline          |
| Mission           | /about/mission        | Hero + content           |
| Strategic Plan    | /about/strategic-plan | Hero + document sections |
| Admissions        | /admissions           | Hero + multi-section     |
| Apply             | /admissions/apply     | Hero + form/steps        |
| Tuition           | /admissions/tuition   | Hero + pricing info      |
| FAQs              | /admissions/faqs      | Hero + accordion/list    |
| Why St. Elizabeth | /admissions/why       | Hero + selling points    |
| Arts              | /arts                 | Hero + program overview  |
| Alumni            | /alumni               | Hero + notable alumni    |
| Contact           | /contact              | Hero + contact form      |
| How to Help       | /how-to-help          | Hero + giving info       |
| Student Life      | /student-life         | Hero + overview          |
| News              | /news                 | Hero + news listing      |
