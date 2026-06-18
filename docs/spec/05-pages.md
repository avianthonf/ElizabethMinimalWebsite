# Inner Page Specifications (29 Pages)

Format per page: **Route**, **Title**, **Template**, **Data Source**, **Key Components**, **Content Description**, **Gaps** (if any).

---

## About Section (5 pages)

### `/about` — About St. Elizabeth

**Template**: Hand-composed (PageShell + Hero + SplitLayout)  
**Data**: `getHeroImage("about-hero")`, `HERO_IMAGES`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `SplitLayout`, `Stack`, `MediaBlock`, `IconCard`, `CTASection`, `Heading`, `Text`, `Icon`, `SchoolIcon`  
**Content**: Hero with "Discover" eyebrow. Left: school story, MediaBlock with image + "A Tradition of Excellence" heading + "Our History" CTA. Right: Explore sidebar with IconCards linking to Mission, History, Staff, Strategic Plan. Bottom: CTASection "Ready to Learn More?" with "Plan a Visit" link (background blue).  
**Gaps**: None.

### `/about/history` — School History

**Template**: Hand-composed  
**Data**: `HISTORY_TIMELINE` from `@/data/about`, `COMMUNITY_IMAGES`  
**Components**: `PageShell`, `Hero` (with breadcrumb), `Section`, `Container`, `Stack`, `Card`, `Heading`, `Text`  
**Content**: Breadcrumb "About / History". Hero with "Our Story" eyebrow. Timeline of school history in chronological cards (year + event description).  
**Gaps**: None.

### `/about/mission` — Mission & Values

**Template**: Hand-composed  
**Data**: `@/data/about` (mission + values data)  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Heading`, `Text`  
**Content**: Hero with mission statement. Body sections describing core values (Faith, Excellence, Community in detail).  
**Gaps**: None.

### `/about/staff` — Staff Directory

**Template**: `ListPage`  
**Data**: `STAFF_PAGE`, `STAFF_MEMBERS` from `@/data/about`, `COMMUNITY_IMAGES`  
**Components**: `ListPage`, `Card`, `Heading`, `Stack`, `Text`  
**Content**: Breadcrumb "About / Staff". Hero with eyebrow. List of staff members rendered as cards with name, role, department, description.  
**Gaps**: None.

### `/about/strategic-plan` — Strategic Plan

**Template**: Hand-composed  
**Data**: `@/data/about` (strategic plan data)  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Heading`, `Text`, `Card`  
**Content**: Hero with strategic plan overview. Document sections with goals, priorities, and timeline.  
**Gaps**: None.

---

## Academics Section (5 pages)

### `/academics` — Academics Overview

**Template**: Hand-composed  
**Data**: `DEPARTMENTS` from `@/data/academics`, `ACADEMICS_HERO` from `@/data/images`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, `IconCard`, `Heading`, `Text`, `Icon`, `SchoolIcon`  
**Content**: Hero "Learn / Academics." 7 academic departments in a 4-column grid with IconCards (name, description). Description: "Our seven academic departments provide a well-rounded education."  
**Gaps**: None.

### `/academics/departments` — Departments

**Template**: Hand-composed (or `CardGridPage` if converted)  
**Data**: `DEPARTMENTS` from `@/data/academics`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Grid`, `Card` / `IconCard`  
**Content**: Detailed view of each academic department with programs, faculty, and resources.  
**Gaps**: Currently may use same data as `/academics` — needs distinct content per department.

### `/academics/college-counseling` — College Counseling

**Template**: `CardGridPage`  
**Data**: `@/data/academics` (college counseling programs)  
**Components**: `CardGridPage`, `Card`  
**Content**: Programs for college preparation: counseling services, university partnerships, test prep resources. Rendered as 2-column card grid.  
**Gaps**: Content source is minimal; may need richer data.

### `/academics/languages` — World Languages

**Template**: `CardGridPage`  
**Data**: `@/data/academics` (language programs)  
**Components**: `CardGridPage`, `Card`  
**Content**: Language offerings (English, Hindi, Konkani, etc.) with descriptions and cultural programs. 3-column grid.  
**Gaps**: Needs language program data in `academics.ts`.

### `/academics/libraries` — Libraries

**Template**: `CardGridPage`  
**Data**: `@/data/academics` (library info)  
**Components**: `CardGridPage`, `Card`  
**Content**: Library facilities, collections, digital resources. 2-column card grid.  
**Gaps**: Needs library data in `academics.ts`.

---

## Admissions Section (6 pages)

### `/admissions` — Admissions Overview

**Template**: Hand-composed (PageShell + Hero + SplitLayout)  
**Data**: `getHeroImage("admissions-hero")`, ADMISSIONS page data, `Why`, `Visit`, `Apply`, `Tuition` links  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `SplitLayout`, `Stack`, `Grid`, `IconCard`, `Card`, `Link`, `Heading`, `Text`, `Icon`, `SchoolIcon`  
**Content**: Hero "Join Us / Admissions." Left: intro text + 4 icon cards (Why?, Visit, Apply, Tuition). Right: Key Dates cards (Admissions Open, Open House) + FAQ link.  
**Gaps**: None.

### `/admissions/apply` — How to Apply

**Template**: Hand-composed  
**Data**: `ADMISSION_STEPS` from `@/data/admissions`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Card`, `Heading`, `Text`  
**Content**: Hero "Apply / Admission Steps." 6-step process displayed as stacked cards (Step 1 through Step 6 with title + description each).  
**Gaps**: The form submission is non-functional (static page).

### `/admissions/faqs` — FAQs

**Template**: Hand-composed  
**Data**: `@/data/admissions` (FAQs)  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Card`, `Heading`, `Text`  
**Content**: Question-and-answer pairs about admissions, fees, uniforms, etc.  
**Gaps**: FAQ data is minimal; could benefit from accordion component for better UX.

### `/admissions/tuition` — Tuition & Assistance

**Template**: Hand-composed  
**Data**: `TUITION_INFO` from `@/data/admissions`, `getHeroImage("admissions-hero")`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Card`, `Heading`, `Text`  
**Content**: Hero "Invest / Tuition & Financial Assistance." Section with tuition heading, body, financial assistance card, and how-to-apply card.  
**Gaps**: No actual fee amounts displayed (data source lacks specifics).

### `/admissions/visit` — Plan Your Visit

**Template**: `VisitPage`  
**Data**: `ADMISSIONS_VISIT_PAGE`, `SCHOOL_ADDRESS`, `SCHOOL_CONTACT`, `VISIT_TYPES`, `GOOGLE_MAPS_EMBED_URL`  
**Components**: `VisitPage`  
**Content**: Visit types (Campus Tour, Open House, Shadow Day) as info cards. Right: address + embedded Google Map.  
**Gaps**: Pincode in `SCHOOL_ADDRESS` is `4031102` (7 digits, invalid). Real Pomburpa pincode is 403511. Address also differs from footer.

### `/admissions/why` — Why St. Elizabeth?

**Template**: Hand-composed  
**Data**: `WHY_ST_ELIZABETH_POINTS` from `@/data/admissions`, `getHeroImage("admissions-hero")`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, `IconCard`, `Heading`, `Icon`, `SchoolIcon`  
**Content**: Hero "Discover / Why St. Elizabeth?" 2-column grid of IconCards with differentiating factors (academic excellence, values, community, etc.).  
**Gaps**: None.

---

## Alumni (1 page)

### `/alumni` — Alumni

**Template**: Hand-composed  
**Data**: `NOTABLE_ALUMNI`, `ALUMNI_EVENTS`, `ALUMNI_INTRO` from `@/data/alumni`, `COMMUNITY_IMAGES`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, `Card`, `Heading`, `Text`  
**Content**: Hero "Reconnect / St. Elizabeth Alumni" with intro text. Notable alumni in 3-column card grid (name, class, achievement). Upcoming events in 3-column card grid (title, date, description, location).  
**Gaps**: Social media links are static and may not exist.

---

## Arts Section (3 pages)

### `/arts` — Arts Overview

**Template**: Hand-composed  
**Data**: `ARTS_IMAGES` from `@/data/images`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, `ImageCard`, `Heading`, `Text`  
**Content**: Hero "Create / Arts at St. Elizabeth." 2-column ImageCard grid linking to Visual Arts and Performing Arts.  
**Gaps**: None.

### `/arts/visual-arts` — Visual Arts

**Template**: `CardGridPage`  
**Data**: `VISUAL_ARTS_PROGRAMS` from `@/data/arts`  
**Components**: `CardGridPage`, `Card`  
**Content**: 2-column card grid of visual arts programs (Drawing & Painting, Sculpture & 3D Design, Art History & Appreciation).  
**Gaps**: None.

### `/arts/performing-arts` — Performing Arts

**Template**: `CardGridPage`  
**Data**: `PERFORMING_ARTS_PROGRAMS` from `@/data/arts`  
**Components**: `CardGridPage`, `Card`  
**Content**: 2-column card grid of performing arts (Music, Dance, Drama, Annual Arts Festival).  
**Gaps**: None.

---

## Athletics Section (2 pages)

### `/athletics` — Athletics Overview

**Template**: Hand-composed (PageShell + Hero + Grid + Stats)  
**Data**: `SPORTS`, `ATHLETICS_STATS` from `@/data/athletics`, `ATHLETICS_IMAGES` from `@/data/images`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, `ImageCard`, `IconCard`, `Heading`, `Text`, `Icon`, `SchoolIcon`  
**Content**: Hero "Compete / Athletics at St. Elizabeth." 7 sports in a 3-column ImageCard grid. Stats row: 7 Teams, 300+ Student-Athletes, 15+ Championships.  
**Gaps**: Image cycling is based on array index; some sports might share images. Links to `/athletics/teams#sport-name` — the Teams page needs anchor handling.

### `/athletics/teams` — Teams & Schedules

**Template**: `ListPage`  
**Data**: `SPORTS` from `@/data/athletics`  
**Components**: `ListPage`, `Card`  
**Content**: List of all teams with season info, contact, and schedule details.  
**Gaps**: Schedule data is missing from `SPORTS` array; needs dedicated schedule data.

---

## Contact Section (2 pages)

### `/contact` — Contact Information

**Template**: Hand-composed (PageShell + Hero + SplitLayout)  
**Data**: `SCHOOL_ADDRESS`, `SCHOOL_CONTACT`, `GOOGLE_MAPS_EMBED_URL` from `@/data/visits`, `CONTACT_IMAGES` from `@/data/images`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `SplitLayout`, `Stack`, `Card`, `Heading`, `Text`  
**Content**: Hero "Connect / Contact Us." Left: address, phone, email + inquiry form placeholder card. Right: "Find Us" heading + Google Maps embed iframe (4:3 aspect ratio).  
**Gaps**: Inquiry form is non-functional (placeholder card says "coming soon"). Phone number is "+91 XX-XXXX-XXXX (TBD)".

### `/contact/visit` — Visit / Directions

**Template**: `VisitPage`  
**Data**: `CONTACT_VISIT_PAGE`, `SCHOOL_ADDRESS`, `GOOGLE_MAPS_EMBED_URL` from `@/data/visits`  
**Components**: `VisitPage`  
**Content**: Visit information and directions. Left: intro text + visit type cards. Right: address + map.  
**Gaps**: Same pincode issue as `/admissions/visit`.

---

## How to Help Section (2 pages)

### `/how-to-help` — How to Help

**Template**: Hand-composed (PageShell + Hero + SplitLayout + CTASection)  
**Data**: `GIVING_OPTIONS`, `SPONSORSHIP_TIERS` from `@/data/how-to-help`, `COMMUNITY_IMAGES` from `@/data/images`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `SplitLayout`, `Stack`, `Grid`, `IconCard`, `Card`, `CTASection`, `Heading`, `Text`, `Icon`, `SchoolIcon`  
**Content**: Hero "Support / How to Help." Left: intro + giving options in 2-column IconCard grid. Right: sponsorship tiers as stacked cards. Bottom: CTASection "Support Our Mission" with "Give Now" link.  
**Gaps**: Giving button links to `/how-to-help/give` but that page is basic. No payment integration.

### `/how-to-help/give` — Giving Page

**Template**: Hand-composed  
**Data**: `@/data/how-to-help`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Heading`, `Text`  
**Content**: Donation form or giving information.  
**Gaps**: No payment integration. Page content is minimal.

---

## News (1 page)

### `/news` — News Listing

**Template**: Hand-composed  
**Data**: `NEWS_ARTICLES` from `@/data/news`, `HERO_IMAGES` from `@/data/images`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, `ImageCard`, `Heading`, `Text`  
**Content**: Hero "Stay Informed / News & Events." 3-column ImageCard grid of news articles (title, date, excerpt).  
**Gaps**: Articles link to `/news/<slug>` but no dynamic `[slug]` route exists. All article links are dead.

---

## Student Life Section (2 pages)

### `/student-life` — Student Life Overview

**Template**: Hand-composed  
**Data**: `STUDENT_LIFE_INTRO` from `@/data/student-life`, `STUDENT_LIFE_IMAGES` from `@/data/images`  
**Components**: `PageShell`, `Hero`, `Section`, `Container`, `Stack`, `Grid`, `Card`, `Heading`, `Text`  
**Content**: Hero "Belong / Student Life" with intro text. 3-column card grid of clubs (from `CLUBS` data) with name, category, and description.  
**Gaps**: None.

### `/student-life/clubs` — Clubs & Organizations

**Template**: `CardGridPage`  
**Data**: `CLUBS`, `CLUBS_PAGE` from `@/data/student-life`  
**Components**: `CardGridPage`, `Card`  
**Content**: 3-column card grid of all student clubs with name, category, and description.  
**Gaps**: None.
