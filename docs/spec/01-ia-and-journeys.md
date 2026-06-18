# Information Architecture & User Journeys

## Site Map (29 Pages)

### Structure

```
/                          → Homepage (horizontal scroll)
├── about
│   ├── /                  → About (mission, overview)
│   ├── /history            → School History
│   ├── /mission            → Mission & Values
│   ├── /staff              → Staff Directory
│   └── /strategic-plan     → Strategic Plan
├── admissions
│   ├── /                   → Admissions Overview
│   ├── /apply              → How to Apply
│   ├── /faqs               → Admissions FAQs
│   ├── /tuition            → Tuition & Assistance
│   ├── /visit              → Plan Your Visit
│   └── /why                → Why St. Elizabeth?
├── academics
│   ├── /                   → Academics Overview
│   ├── /college-counseling → College Counseling
│   ├── /departments        → Departments
│   ├── /languages          → World Languages
│   └── /libraries          → Libraries
├── alumni
│   └── /                   → Alumni (notable alumni + events)
├── arts
│   ├── /                   → Arts Overview
│   ├── /performing-arts    → Performing Arts
│   └── /visual-arts        → Visual Arts
├── athletics
│   ├── /                   → Athletics Overview
│   └── /teams              → Teams & Schedules
├── contact
│   ├── /                   → Contact Information
│   └── /visit              → Visit / Directions
├── how-to-help
│   ├── /                   → How to Help Overview
│   └── /give               → Giving Page
├── news
│   └── /                   → News Listing
└── student-life
    ├── /                   → Student Life Overview
    └── /clubs              → Clubs & Organizations
```

## Navigation

### Header (Primary Nav)

Links rendered in Header component:

| #   | Link         | AIRoot        | Destination  | Template Used |
| --- | ------------ | ------------- | ------------ | ------------- |
| 1   | About        | /about        | Custom       |
| 2   | Admissions   | /admissions   | Custom       |
| 3   | Academics    | /academics    | Custom       |
| 4   | Athletics    | /athletics    | CardGridPage |
| 5   | Arts         | /arts         | Custom       |
| 6   | Student Life | /student-life | Custom       |
| 7   | Alumni       | /alumni       | Custom       |
| 8   | News         | /news         | Custom       |
| 9   | Contact      | /contact      | Custom       |

### Header CTA Links

| Text    | Destination    |
| ------- | -------------- |
| Inquire | /admissions    |
| Visit   | /contact/visit |

### Full-Screen Menu (MenuOverlay)

10-category mega-menu displayed on hamburger click. Each category shows image previews on hover (desktop).

| Category     | Links                                                                            |
| ------------ | -------------------------------------------------------------------------------- |
| ABOUT        | Mission & Values, History, Staff, Strategic Plan                                 |
| ADMISSIONS   | Why St. Elizabeth?, Plan Your Visit, Admission Steps, Tuition & Assistance, FAQs |
| ACADEMICS    | Departments, World Languages, Libraries, College Counseling                      |
| STUDENT LIFE | Clubs & Organizations                                                            |
| ATHLETICS    | Teams & Schedules                                                                |
| ARTS         | Visual Arts, Performing Arts                                                     |
| HOW TO HELP  | Giving                                                                           |
| ALUMNI       | Notable Alumni                                                                   |
| NEWS         | All News                                                                         |
| CONTACT      | Locations, Inquiry                                                               |

### Footer

| Section    | Links                                                    |
| ---------- | -------------------------------------------------------- |
| About      | Mission & Values, History, Staff                         |
| Admissions | Why St. Elizabeth, Apply, Tuition, FAQs                  |
| Academics  | Departments, Languages, Libraries, College Counseling    |
| Community  | Student Life, Athletics, Arts, Alumni, News, How to Help |

**Footer contact block:**

- Heading: "St. Elizabeth's High School"
- Body: venereal address, email
- Social: Facebook, Instagram
- Copyright: © 2026 St. Elizabeth's High School, Pomburpa, Goa

## User Journeys

### Journey 1: Prospective Parent → Admissions

1. Lands on homepage → scrolls through 8 panels
2. Views Values, Stats, Testimonials
3. Clicks "Inquire Now" CTA → /admissions
4. Reads overview → clicks "Visit" → /admissions/visit (VisitPage)
5. Views map, address, visit types
6. Returns → /admissions/apply for application steps
7. Reviews /admissions/tuition and /admissions/faqs

### Journey 2: Current Student → Extracurriculars

1. From homepage → "Student Life" in header nav
2. Reads overview, clicks "Clubs & Organizations" → /student-life/clubs
3. Views card grid of all clubs
4. Explores Athletics (/athletics) or Arts (/arts) for specific interests

### Journey 3: Alumnus → Reconnect

1. Homepage → "Alumni" in nav
2. Views notable alumni list, upcoming events
3. Clicks social links (Facebook/Instagram)

### Journey 4: Donor → Giving

1. Homepage → "How to Help" from footer
2. Reads about giving opportunities → /how-to-help/give
3. Finds contact info to make a donation

## Breadcrumb Trails

Breadcrumbs are optional and rendered above the Hero in relevant inner pages. Pattern: `Parent Page / Current Page`.

Example on `/academics/departments`:

```
Academics / Departments
```

Controlled by the `breadcrumb` prop on `CardGridPage` / `ListPage` templates.
