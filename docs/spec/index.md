# St. Elizabeth's High School Website — Specification

> **Purpose**: Comprehensive specification of every page, component, and design decision for the St. Elizabeth's High School website.  
> **Scope**: 29 pages, ~60 components, 3 template types, 14 data files.  
> **Technology**: Next.js 16 App Router, React 19, TypeScript strict, CSS Modules, Framer Motion.

## Spec Structure

| File                                                     | Contents                                                                   | Pages / Items       |
| -------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------- |
| [`00-overview.md`](00-overview.md)                       | Design tokens, breakpoints, typography, motion, a11y, conventions          | —                   |
| [`01-ia-and-journeys.md`](01-ia-and-journeys.md)         | Site map, navigation, footer, user journeys                                | 29 pages mapped     |
| [`02-content-and-voice.md`](02-content-and-voice.md)     | Brand voice, content types, tone, image strategy                           | —                   |
| [`03-homepage.md`](03-homepage.md)                       | Homepage: 8 panels, intro animation, horizontal scroll, responsive         | 8 panels            |
| [`04-inner-page-system.md`](04-inner-page-system.md)     | Template system, PageShell, shared page pattern, template selection        | 3 templates         |
| [`05-pages.md`](05-pages.md)                             | All 29 inner pages — route, template, data, components, content, gaps      | 29 pages            |
| [`06-components.md`](06-components.md)                   | Full component catalog: primitives, layout, content, navigation, templates | ~60 components      |
| [`07-implementation-spec.md`](07-implementation-spec.md) | Refactor spec: 28 issues catalogued with fixes, 6 implementation phases    | 28 issues, 6 phases |

## Key Decisions

| Decision               | Value                             | Rationale                                                                  |
| ---------------------- | --------------------------------- | -------------------------------------------------------------------------- |
| Responsive breakpoint  | 1100px                            | Cleanest split between horizontal (desktop) and vertical (mobile) homepage |
| Design tokens          | 3-tier CSS custom properties      | `--p-*` → `--s-*` → `--c-*` — clear separation of concerns                 |
| Animation engine       | Framer Motion + CSS transitions   | Facebook-grade animation library, supports `prefers-reduced-motion`        |
| Data layer             | Typed static data + async getters | CMS-ready: replace getter body, no component changes                       |
| Component architecture | 5-tier hierarchy                  | Primitives → Layout → Content → Navigation → Templates                     |
| Styling                | CSS Modules                       | Scoped styles, no runtime overhead, co-located with components             |

## Current Gaps & Known Issues

1. **Dead news article links**: All news articles (homepage news panel + /news page) link to `/news/<slug>` but no dynamic `[slug]` route exists.
2. **Pincode inconsistency**: `SCHOOL_ADDRESS.pinCode` in `visits.ts` is `4031102` (7 digits, invalid). Footer correctly states `403511`. Real Pomburpa pincode is `403511`.
3. **Missing contact form**: `/contact` page has a placeholder card saying "Inquiry form coming soon."
4. **Placeholder phone number**: `SCHOOL_CONTACT.phone` is "+91 XX-XXXX-XXXX (TBD)".
5. **No payment integration**: `/how-to-help/give` is a static page with no payment gateway.
6. **News page needs dynamic routes**: `/news` exists but individual article pages are missing.
7. **Athletics schedule data**: `/athletics/teams` needs detailed schedule data not present in current `SPORTS` array.

## Navigation Quick Reference

### Header (9 links)

About → /about | Admissions → /admissions | Academics → /academics | Athletics → /athletics | Arts → /arts | Student Life → /student-life | Alumni → /alumni | News → /news | Contact → /contact

### Mega Menu (10 categories)

**ABOUT**: Mission & Values · History · Staff · Strategic Plan  
**ADMISSIONS**: Why St. Elizabeth? · Plan Your Visit · Admission Steps · Tuition & Assistance · FAQs  
**ACADEMICS**: Departments · World Languages · Libraries · College Counseling  
**STUDENT LIFE**: Clubs & Organizations  
**ATHLETICS**: Teams & Schedules  
**ARTS**: Visual Arts · Performing Arts  
**HOW TO HELP**: Giving  
**ALUMNI**: Notable Alumni  
**NEWS**: All News  
**CONTACT**: Locations · Inquiry

### Footer (4 sections)

**About**: Mission & Values · History · Staff  
**Admissions**: Why St. Elizabeth · Apply · Tuition · FAQs  
**Academics**: Departments · Languages · Libraries · College Counseling  
**Community**: Student Life · Athletics · Arts · Alumni · News · How to Help

---

_This specification is the single source of truth for all design, content, and development decisions. When making changes, update the relevant section here first._
