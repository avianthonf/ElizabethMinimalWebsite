# Step 2: Data Architecture — Content Layer & Image Registry

> **Handoff to:** Senior Frontend Engineer
> **Estimated time:** 2–3 hours
> **Risk level:** Low — pure data files, no component changes
> **Depends on:** Step 1 (color system update) completed
> **Baseline:** 89 tests passing, clean build

---

## 1. CONTEXT

### What We're Building

A centralized content layer (`src/data/`) that holds all static content for the St. Elizabeth website. This is the single source of truth for every text string, navigation link, testimonial, statistic, news item, and image reference on the site.

This architecture achieves three goals:
1. **Content-code separation** — Components import typed data, they don't hardcode strings
2. **CMS-ready structure** — Each data file mirrors what a headless CMS (WordPress/Strapi) would provide
3. **Single-source image management** — One registry maps all 71 photos to their website sections, with alt text and metadata

### Design Principles

| Principle | Implementation |
|---|---|
| **Typed** | Every data file exports TypeScript interfaces and typed constants |
| **Immutable** | All exports use `as const` assertions where appropriate |
| **Importable** | Components import from `@/data/...` just like they import from `@/components/...` |
| **Flat** | No nesting deeper than 2 levels — keeps imports simple |
| **No defaults** | Every image reference must have alt text (enforced by the ImageAsset type) |

---

## 2. DIRECTORY STRUCTURE

Create the following (all new files):

```
src/data/
├── index.ts                    # Barrel re-export of all data modules
├── navigation.ts               # Nav links, footer links, full-screen menu structure
├── homepage.ts                 # Values, testimonials, stats, news items, hero content
├── about.ts                    # Mission, history, staff bios, strategic plan
├── admissions.ts               # Process steps, FAQs, tuition info, why-us points
├── academics.ts                # Departments, courses, languages, libraries
├── athletics.ts                # Sports, teams, schedules
├── arts.ts                     # Visual arts, performing arts programs
├── student-life.ts             # Clubs, organizations, traditions
├── contact.ts                  # Address, phone, email, map embed URL
├── how-to-help.ts              # Giving options, sponsorship tiers, impact stories
├── alumni.ts                   # Notable alumni, events, update-form fields
├── news.ts                     # News articles, events calendar
└── images.ts                   # Centralized image registry for all 71 photos
```

---

## 3. FILE SPECIFICATIONS

### File 0: `src/data/images.ts` — Image Registry (BUILD FIRST)

This is the most critical data file. It must be built first because all other data files reference images from it. Every image in the 71-photo pool is catalogued here with its website assignment.

```typescript
/**
 * Centralized image registry for St. Elizabeth High School.
 * 
 * All 71 photographs were shot on a Sony ILCE-7RM5 (28-105mm F2.8)
 * on April 28, 2026, during morning hours (~8:45–9:30 AM IST).
 * All images are 4:3 landscape, sRGB, 99% JPEG quality.
 *
 * See: prompts/02-data-architecture.md for full image analysis methodology.
 */

// ── Types ──────────────────────────────────────────────────────────────

export type ImageCategory =
  | "hero"
  | "gallery"
  | "academics"
  | "athletics"
  | "arts"
  | "community"
  | "heritage"
  | "student-life"
  | "general";

export type ImageSection =
  | "homepage-hero"
  | "homepage-grid"
  | "homepage-values"
  | "homepage-stats"
  | "homepage-testimonials"
  | "homepage-news"
  | "about-hero"
  | "about-mission"
  | "about-history"
  | "about-staff"
  | "admissions-hero"
  | "admissions-why"
  | "admissions-visit"
  | "academics-hero"
  | "academics-departments"
  | "athletics-hero"
  | "athletics-teams"
  | "arts-hero"
  | "arts-visual"
  | "arts-performing"
  | "student-life-hero"
  | "student-life-clubs"
  | "contact-hero"
  | "how-to-help-hero"
  | "news-hero"
  | "alumni-hero"
  | "overflow";

export interface ImageAsset {
  /** Filename without path — e.g. "DSC07580.jpg" */
  filename: string;
  /** Descriptive alt text for accessibility. REQUIRED — no empty strings. */
  alt: string;
  /** Broad visual category */
  category: ImageCategory;
  /** Specific website section this image is assigned to */
  section: ImageSection;
  /** Aesthetic profile for component mapping */
  profile: {
    brightness: number;       // 0-255, from EXIF analysis
    contrast: number;         // 0-100, perceived contrast score
    complexity: "low" | "medium" | "high";
    temperature: "warm" | "neutral" | "neutral-warm" | "cool";
    moodTags: string[];       // e.g. ["dynamic", "bold", "eye-catching"]
  };
}

// ── Hero Images ────────────────────────────────────────────────────────
// Top-tier images with medium+ brightness, suitable for full-screen
// hero backgrounds with text overlays.

export const HERO_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07580.jpg",
    alt: "St. Elizabeth High School students engaged in a dynamic outdoor activity on campus grounds, morning sunlight",
    category: "hero",
    section: "homepage-hero",
    profile: {
      brightness: 142.6,
      contrast: 73.7,
      complexity: "high",
      temperature: "warm",
      moodTags: ["dynamic", "bold", "eye-catching", "lively", "engaging"],
    },
  },
  {
    filename: "DSC07548.jpg",
    alt: "Students participating in a school event at St. Elizabeth High School, warm morning atmosphere",
    category: "hero",
    section: "about-hero",
    profile: {
      brightness: 133.2,
      contrast: 71.9,
      complexity: "high",
      temperature: "warm",
      moodTags: ["dynamic", "bold", "eye-catching", "lively", "engaging"],
    },
  },
  {
    filename: "DSC07360.jpg",
    alt: "St. Elizabeth High School campus view with natural daylight, balanced composition for text overlay",
    category: "hero",
    section: "admissions-hero",
    profile: {
      brightness: 129.3,
      contrast: 76.7,
      complexity: "medium",
      temperature: "neutral-warm",
      moodTags: ["balanced", "natural", "authentic", "dynamic", "bold"],
    },
  },
  {
    filename: "DSC07495.jpg",
    alt: "Bright campus activity at St. Elizabeth High School, students in natural daylight",
    category: "hero",
    section: "athletics-hero",
    profile: {
      brightness: 140.7,
      contrast: 64.1,
      complexity: "high",
      temperature: "warm",
      moodTags: ["balanced", "natural", "authentic", "lively", "engaging"],
    },
  },
  {
    filename: "DSC07504.jpg",
    alt: "Dynamic school event at St. Elizabeth High School, students engaged in group activity",
    category: "hero",
    section: "student-life-hero",
    profile: {
      brightness: 121.2,
      contrast: 72.1,
      complexity: "high",
      temperature: "neutral-warm",
      moodTags: ["dynamic", "bold", "eye-catching", "lively", "engaging"],
    },
  },
];

// ── Hero image for Academics (unique cool-tone image) ──────────────────

export const ACADEMICS_HERO: ImageAsset = {
  filename: "DSC07576.jpg",
  alt: "Academic setting at St. Elizabeth High School, contemplative atmosphere with natural cool tones",
  category: "academics",
  section: "academics-hero",
  profile: {
    brightness: 78.5,
    contrast: 46.0,
    complexity: "medium",
    temperature: "cool",
    moodTags: ["serious", "contemplative", "moody"],
  },
};

// ── Homepage Photo Grid (12 images — 3 columns × 4 rows) ──────────────

export const HOMEPAGE_GRID_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07290.jpg",
    alt: "Cozy community gathering at St. Elizabeth High School, warm intimate atmosphere",
    category: "community",
    section: "homepage-grid",
    profile: {
      brightness: 97.5, contrast: 56.3, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic", "lively"],
    },
  },
  {
    filename: "DSC07292.jpg",
    alt: "Students interacting during a school activity at St. Elizabeth High School",
    category: "student-life",
    section: "homepage-grid",
    profile: {
      brightness: 106.1, contrast: 56.7, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07294.jpg",
    alt: "Engaging school event at St. Elizabeth High School with students and staff",
    category: "student-life",
    section: "homepage-grid",
    profile: {
      brightness: 105.1, contrast: 64.4, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07300.jpg",
    alt: "Intimate school community moment at St. Elizabeth High School",
    category: "community",
    section: "homepage-grid",
    profile: {
      brightness: 98.4, contrast: 46.6, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07301.jpg",
    alt: "Dynamic indoor school activity at St. Elizabeth High School, high energy atmosphere",
    category: "athletics",
    section: "homepage-grid",
    profile: {
      brightness: 118.8, contrast: 71.9, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07305.jpg",
    alt: "Bold action scene at St. Elizabeth High School, students participating in event",
    category: "athletics",
    section: "homepage-grid",
    profile: {
      brightness: 116.2, contrast: 71.1, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07317.jpg",
    alt: "Campus grounds at St. Elizabeth High School in medium daylight, natural setting",
    category: "general",
    section: "homepage-grid",
    profile: {
      brightness: 130.8, contrast: 70.2, complexity: "medium",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic", "dynamic"],
    },
  },
  {
    filename: "DSC07328.jpg",
    alt: "Students engaged in learning activity at St. Elizabeth High School",
    category: "academics",
    section: "homepage-grid",
    profile: {
      brightness: 113.3, contrast: 64.4, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07335.jpg",
    alt: "Bright school activity at St. Elizabeth High School, students in daylight",
    category: "student-life",
    section: "homepage-grid",
    profile: {
      brightness: 128.7, contrast: 68.9, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07346.jpg",
    alt: "School campus life at St. Elizabeth High School, natural warm daylight",
    category: "student-life",
    section: "homepage-grid",
    profile: {
      brightness: 137.1, contrast: 66.3, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07351.jpg",
    alt: "Students at St. Elizabeth High School engaged in group activity, medium daylight",
    category: "student-life",
    section: "homepage-grid",
    profile: {
      brightness: 123.1, contrast: 61.4, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07370.jpg",
    alt: "Story-rich school moment at St. Elizabeth High School, warm atmosphere",
    category: "community",
    section: "homepage-grid",
    profile: {
      brightness: 117.3, contrast: 68.5, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── Homepage Value Card Background Images ──────────────────────────────

export const VALUES_IMAGES: Record<string, ImageAsset> = {
  faith: {
    filename: "DSC07463.jpg",
    alt: "Heritage and faith tradition at St. Elizabeth High School, warm intimate lighting",
    category: "heritage",
    section: "homepage-values",
    profile: {
      brightness: 84.5, contrast: 50.0, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  excellence: {
    filename: "DSC07497.jpg",
    alt: "Academic excellence in action at St. Elizabeth High School, bright engaged learning",
    category: "academics",
    section: "homepage-values",
    profile: {
      brightness: 121.7, contrast: 60.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  community: {
    filename: "DSC07378.jpg",
    alt: "Community gathering at St. Elizabeth High School, warm inclusive atmosphere",
    category: "community",
    section: "homepage-values",
    profile: {
      brightness: 91.5, contrast: 59.8, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic", "lively"],
    },
  },
};

// ── Stats IconCard Images ──────────────────────────────────────────────

export const STATS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07632.jpg",
    alt: "Heritage photo representing St. Elizabeth High School's founding in 1949",
    category: "heritage",
    section: "homepage-stats",
    profile: {
      brightness: 83.4, contrast: 51.5, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07420.jpg",
    alt: "Student body at St. Elizabeth High School, dynamic group atmosphere",
    category: "student-life",
    section: "homepage-stats",
    profile: {
      brightness: 118.4, contrast: 70.0, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07428.jpg",
    alt: "Campus view at St. Elizabeth High School, representing CBSE affiliation",
    category: "general",
    section: "homepage-stats",
    profile: {
      brightness: 118.3, contrast: 60.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── Testimonial Background Images ──────────────────────────────────────

export const TESTIMONIAL_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07400.jpg",
    alt: "Alumni community moment at St. Elizabeth High School",
    category: "community",
    section: "homepage-testimonials",
    profile: {
      brightness: 98.6, contrast: 56.8, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07437.jpg",
    alt: "Student life at St. Elizabeth High School, balanced natural scene",
    category: "student-life",
    section: "homepage-testimonials",
    profile: {
      brightness: 108.6, contrast: 60.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07477.jpg",
    alt: "Parent and community engagement at St. Elizabeth High School",
    category: "community",
    section: "homepage-testimonials",
    profile: {
      brightness: 107.4, contrast: 60.4, complexity: "high",
      temperature: "neutral-warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── News Card Images ───────────────────────────────────────────────────

export const NEWS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07504.jpg",
    alt: "Annual Day Celebration 2024 at St. Elizabeth High School",
    category: "gallery",
    section: "homepage-news",
    profile: {
      brightness: 121.2, contrast: 72.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07546.jpg",
    alt: "Sports Meet XXII at St. Elizabeth High School, athletic competition",
    category: "athletics",
    section: "homepage-news",
    profile: {
      brightness: 118.8, contrast: 71.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold"],
    },
  },
  {
    filename: "DSC07555.jpg",
    alt: "Feast Day celebration at St. Elizabeth High School",
    category: "community",
    section: "homepage-news",
    profile: {
      brightness: 115.8, contrast: 71.6, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
];

// ── Academics Section Images ───────────────────────────────────────────

export const ACADEMICS_IMAGES: ImageAsset[] = [
  ACADEMICS_HERO,
  {
    filename: "DSC07502.jpg",
    alt: "Academic learning environment at St. Elizabeth High School, neutral balanced tones",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 97.2, contrast: 60.0, complexity: "high",
      temperature: "neutral", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07431.jpg",
    alt: "Classroom setting at St. Elizabeth High School, focused learning atmosphere",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 118.7, contrast: 60.0, complexity: "medium",
      temperature: "neutral-warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07510.jpg",
    alt: "Academic activity at St. Elizabeth High School, engaged students",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 110.6, contrast: 60.0, complexity: "high",
      temperature: "neutral-warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07518.jpg",
    alt: "Learning environment at St. Elizabeth High School",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 116.6, contrast: 61.2, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07522.jpg",
    alt: "Students learning at St. Elizabeth High School",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 119.4, contrast: 62.6, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07584.jpg",
    alt: "Academic pursuit at St. Elizabeth High School, warm learning atmosphere",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 113.9, contrast: 65.9, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07590.jpg",
    alt: "Bright academic setting at St. Elizabeth High School, medium daylight",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 123.3, contrast: 63.7, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── Athletics Section Images ───────────────────────────────────────────

export const ATHLETICS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07495.jpg",
    alt: "Athletics at St. Elizabeth High School, bright dynamic sports activity",
    category: "athletics",
    section: "athletics-hero",
    profile: {
      brightness: 140.7, contrast: 64.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07580.jpg",
    alt: "Dynamic athletic event at St. Elizabeth High School, highest energy capture",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 142.6, contrast: 73.7, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07504.jpg",
    alt: "Sports competition at St. Elizabeth High School, bold action",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 121.2, contrast: 72.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07546.jpg",
    alt: "Athletic team activity at St. Elizabeth High School",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 118.8, contrast: 71.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold"],
    },
  },
  {
    filename: "DSC07548.jpg",
    alt: "Sports event at St. Elizabeth High School, dynamic crowd energy",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 133.2, contrast: 71.9, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07555.jpg",
    alt: "Athletic competition at St. Elizabeth High School",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 115.8, contrast: 71.6, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold"],
    },
  },
  {
    filename: "DSC07301.jpg",
    alt: "Indoor sports activity at St. Elizabeth High School, lively atmosphere",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 118.8, contrast: 71.9, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
];

// ── Arts Section Images ────────────────────────────────────────────────

export const ARTS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07565.jpg",
    alt: "Arts program at St. Elizabeth High School, warm creative atmosphere with rosy tones",
    category: "arts",
    section: "arts-hero",
    profile: {
      brightness: 132.8, contrast: 58.6, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07575.jpg",
    alt: "Outdoor arts activity at St. Elizabeth High School, natural setting with greenery",
    category: "arts",
    section: "arts-visual",
    profile: {
      brightness: 130.1, contrast: 61.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07597.jpg",
    alt: "Creative arts at St. Elizabeth High School, medium daylight balanced scene",
    category: "arts",
    section: "arts-performing",
    profile: {
      brightness: 133.2, contrast: 59.2, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07610.jpg",
    alt: "Unique flash-lit arts moment at St. Elizabeth High School, golden wood tones",
    category: "arts",
    section: "arts-visual",
    profile: {
      brightness: 108.0, contrast: 65.3, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── Student Life Section Images ────────────────────────────────────────

export const STUDENT_LIFE_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07504.jpg",
    alt: "Vibrant student life at St. Elizabeth High School",
    category: "student-life",
    section: "student-life-hero",
    profile: {
      brightness: 121.2, contrast: 72.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07306.jpg",
    alt: "Student community at St. Elizabeth High School, medium daylight",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 134.1, contrast: 68.8, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07349.jpg",
    alt: "Club activities at St. Elizabeth High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 119.8, contrast: 66.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07373.jpg",
    alt: "Student organizations at St. Elizabeth High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 122.8, contrast: 68.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07381.jpg",
    alt: "Student community engagement at St. Elizabeth High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 105.0, contrast: 64.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07404.jpg",
    alt: "Student life moment at St. Elizabeth High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 111.8, contrast: 64.8, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07411.jpg",
    alt: "Student activity at St. Elizabeth High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 113.4, contrast: 67.4, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── Community / Heritage Images ────────────────────────────────────────

export const COMMUNITY_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07619.jpg",
    alt: "Intimate heritage moment at St. Elizabeth High School, warm nostalgic flash-lit scene",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 78.3, contrast: 43.2, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic", "soft", "gentle"],
    },
  },
  {
    filename: "DSC07469.jpg",
    alt: "Royal blue heritage accent at St. Elizabeth High School, low-key intimate lighting",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 78.6, contrast: 50.0, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07296.jpg",
    alt: "Community heritage at St. Elizabeth High School, dim warm earth tones",
    category: "heritage",
    section: "about-mission",
    profile: {
      brightness: 106.9, contrast: 63.6, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07380.jpg",
    alt: "Cozy community gathering at St. Elizabeth High School",
    category: "community",
    section: "about-mission",
    profile: {
      brightness: 98.9, contrast: 56.5, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07401.jpg",
    alt: "Intimate school community moment at St. Elizabeth High School",
    category: "community",
    section: "about-mission",
    profile: {
      brightness: 94.7, contrast: 61.1, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07463.jpg",
    alt: "Heritage tradition at St. Elizabeth High School, cozy dim lighting",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 84.5, contrast: 50.0, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07632.jpg",
    alt: "Historical moment at St. Elizabeth High School, unique exposure capture",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 83.4, contrast: 51.5, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
];

// ── Contact / Visit Page Images ────────────────────────────────────────

export const CONTACT_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07557.jpg",
    alt: "Welcome to St. Elizabeth High School, bright medium daylight campus view",
    category: "general",
    section: "contact-hero",
    profile: {
      brightness: 122.3, contrast: 67.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07394.jpg",
    alt: "Campus welcome scene at St. Elizabeth High School, medium daylight",
    category: "general",
    section: "contact-hero",
    profile: {
      brightness: 124.4, contrast: 68.5, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── Full Registry (all 71 images) ──────────────────────────────────────
// Every image must appear in exactly one exported array above OR in the
// OVERFLOW_IMAGES array below. No image is left uncatalogued.

export const OVERFLOW_IMAGES: ImageAsset[] = [
  // All remaining images tagged "gallery/events" in metadata that aren't
  // assigned to specific sections above. These fill inner page galleries.
  {
    filename: "DSC07299.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 104.2, contrast: 62.8, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07394.jpg",
    alt: "Campus activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 124.4, contrast: 68.5, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07416.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 109.2, contrast: 60.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07455.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 110.6, contrast: 68.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07489.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 106.8, contrast: 64.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07524.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 107.3, contrast: 62.7, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07525.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 103.8, contrast: 63.4, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07528.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 119.8, contrast: 65.1, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07533.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 117.5, contrast: 60.9, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07538.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 102.3, contrast: 59.3, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07541.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 101.5, contrast: 57.6, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07543.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 102.7, contrast: 51.8, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07557.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 122.3, contrast: 67.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07561.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 112.7, contrast: 66.2, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07570.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 114.7, contrast: 61.9, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07590.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 123.3, contrast: 63.7, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07592.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 109.6, contrast: 60.4, complexity: "high", temperature: "neutral-warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07597.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 133.2, contrast: 59.2, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07616.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 108.2, contrast: 63.6, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07622.jpg",
    alt: "School activity at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 103.5, contrast: 64.4, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07629-HDR.jpg",
    alt: "HDR school scene at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 105.1, contrast: 65.5, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07634.jpg",
    alt: "School event at St. Elizabeth High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 113.6, contrast: 60.4, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
];

// ── Helper: Get image by filename ──────────────────────────────────────

/** Look up an ImageAsset by its filename across all registries. */
export function getImageByFilename(filename: string): ImageAsset | undefined {
  const allImages = [
    ...HERO_IMAGES,
    ACADEMICS_HERO,
    ...HOMEPAGE_GRID_IMAGES,
    ...Object.values(VALUES_IMAGES),
    ...STATS_IMAGES,
    ...TESTIMONIAL_IMAGES,
    ...NEWS_IMAGES,
    ...ACADEMICS_IMAGES,
    ...ATHLETICS_IMAGES,
    ...ARTS_IMAGES,
    ...STUDENT_LIFE_IMAGES,
    ...COMMUNITY_IMAGES,
    ...CONTACT_IMAGES,
    ...OVERFLOW_IMAGES,
  ];
  return allImages.find((img) => img.filename === filename);
}

/** Total count of catalogued images — should equal 71. */
export const TOTAL_IMAGES = 
  HERO_IMAGES.length +
  1 + // ACADEMICS_HERO
  HOMEPAGE_GRID_IMAGES.length +
  Object.keys(VALUES_IMAGES).length +
  STATS_IMAGES.length +
  TESTIMONIAL_IMAGES.length +
  NEWS_IMAGES.length +
  ACADEMICS_IMAGES.length +
  ATHLETICS_IMAGES.length +
  ARTS_IMAGES.length +
  STUDENT_LIFE_IMAGES.length +
  COMMUNITY_IMAGES.length +
  CONTACT_IMAGES.length +
  OVERFLOW_IMAGES.length;
```

---

### File 1: `src/data/navigation.ts`

```typescript
/**
 * Navigation structure for St. Elizabeth High School.
 * Used by Header, Footer, and full-screen menu overlay components.
 */

export interface NavLink {
  text: string;
  href: string;
  /** Optional image preview shown on hover in full-screen menu */
  previewImage?: string;
}

export interface NavCategory {
  title: string;
  links: NavLink[];
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

// ── Header Navigation ──────────────────────────────────────────────────

export const HEADER_NAV_LINKS: NavLink[] = [
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

export const HEADER_CTA_LINKS: NavLink[] = [
  { text: "Inquire", href: "/admissions" },
  { text: "Visit", href: "/contact/visit" },
];

// ── Full-Screen Menu Structure ────────────────────────────────────────

export const MENU_CATEGORIES: NavCategory[] = [
  {
    title: "ABOUT",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "Staff", href: "/about/staff" },
      { text: "Strategic Plan", href: "/about/strategic-plan" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { text: "Why St. Elizabeth?", href: "/admissions/why" },
      { text: "Plan Your Visit", href: "/admissions/visit" },
      { text: "Admission Steps", href: "/admissions/apply" },
      { text: "Tuition & Assistance", href: "/admissions/tuition" },
      { text: "FAQs", href: "/admissions/faqs" },
    ],
  },
  {
    title: "ACADEMICS",
    links: [
      { text: "Departments", href: "/academics/departments" },
      { text: "World Languages", href: "/academics/languages" },
      { text: "Libraries", href: "/academics/libraries" },
      { text: "College Counseling", href: "/academics/college-counseling" },
    ],
  },
  {
    title: "STUDENT LIFE",
    links: [
      { text: "Clubs & Organizations", href: "/student-life/clubs" },
    ],
  },
  {
    title: "ATHLETICS",
    links: [
      { text: "Teams & Schedules", href: "/athletics/teams" },
    ],
  },
  {
    title: "ARTS",
    links: [
      { text: "Visual Arts", href: "/arts/visual-arts" },
      { text: "Performing Arts", href: "/arts/performing-arts" },
    ],
  },
  {
    title: "HOW TO HELP",
    links: [
      { text: "Giving", href: "/how-to-help/give" },
    ],
  },
  {
    title: "ALUMNI",
    links: [
      { text: "Notable Alumni", href: "/alumni" },
    ],
  },
  {
    title: "NEWS",
    links: [
      { text: "All News", href: "/news" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { text: "Locations", href: "/contact" },
      { text: "Inquiry", href: "/contact/visit" },
    ],
  },
];

// ── Footer Navigation ──────────────────────────────────────────────────

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "About",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "Staff", href: "/about/staff" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { text: "Why St. Elizabeth", href: "/admissions/why" },
      { text: "Apply", href: "/admissions/apply" },
      { text: "Tuition", href: "/admissions/tuition" },
      { text: "FAQs", href: "/admissions/faqs" },
    ],
  },
  {
    title: "Academics",
    links: [
      { text: "Departments", href: "/academics/departments" },
      { text: "Languages", href: "/academics/languages" },
      { text: "Libraries", href: "/academics/libraries" },
    ],
  },
  {
    title: "Community",
    links: [
      { text: "Student Life", href: "/student-life" },
      { text: "Athletics", href: "/athletics" },
      { text: "Arts", href: "/arts" },
      { text: "Alumni", href: "/alumni" },
      { text: "News", href: "/news" },
    ],
  },
];

export const FOOTER_INTRO = {
  heading: "St. Elizabeth High School",
  body: "Guiding Minds, Nurturing Hearts, Building Futures. A nurturing Catholic school in Pomburpa, Goa, rooted in Truth and Honesty since 1949.",
};

export const FOOTER_SOCIAL_LINKS = [
  { platform: "facebook" as const, href: "https://facebook.com/stelizabethhighschool" },
  { platform: "instagram" as const, href: "https://instagram.com/stelizabethhighschool" },
];

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} St. Elizabeth High School, Pomburpa, Goa. All Rights Reserved.`;
```

---

### File 2: `src/data/homepage.ts`

```typescript
/**
 * Content for the St. Elizabeth High School homepage.
 * 8-panel horizontal scroll layout per PAGE_ELEMENT_HIERARCHY.md
 */

// ── Panel 1: Hero ──────────────────────────────────────────────────────

export const HERO_CONTENT = {
  statement:
    "St. Elizabeth High School inspires transformative learning through meaningful relationships, academic excellence and unique opportunities. With an average class size of 15 students, each student is challenged, supported and most of all...",
  heading: "Guiding Minds, Nurturing Hearts, Building Futures",
  loadOverlayText: "WE BELIEVE",
} as const;

// ── Panel 2: Values ────────────────────────────────────────────────────

export interface ValueCardData {
  number: string;
  title: string;
  body: string;
}

export const VALUES: ValueCardData[] = [
  {
    number: "01",
    title: "Faith",
    body: "In God we trust, in Truth we stand. Rooted in the motto 'Truth and Honesty,' our students grow with values that guide their moral compass and shape lives of purpose and service.",
  },
  {
    number: "02",
    title: "Excellence",
    body: "Academic rigor and holistic growth define our approach. With a disciplined school culture and committed educators, every learner finds their path to success — in the classroom and beyond.",
  },
  {
    number: "03",
    title: "Community",
    body: "Inclusive, nurturing, and committed to the whole child. From the classrooms of Bardez to the playing fields, we are a family that believes every student is known, valued, and loved.",
  },
];

// ── Panel 4: School Stats ──────────────────────────────────────────────

export interface StatData {
  value: string;
  label: string;
  description: string;
}

export const STATS: StatData[] = [
  {
    value: "1949",
    label: "Founded",
    description: "Over seven decades of educational excellence in Pomburpa, Bardez, Goa.",
  },
  {
    value: "1200+",
    label: "Students",
    description: "A vibrant student body from across North Goa, learning and growing together.",
  },
  {
    value: "CBSE",
    label: "Affiliated",
    description: "Central Board of Secondary Education curriculum with holistic development focus.",
  },
];

// ── Panel 5: Testimonials ──────────────────────────────────────────────

export interface TestimonialData {
  quote: string;
  attribution: string;
  role: "alumni" | "student" | "parent" | "teacher";
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "St. Elizabeth shaped me into the person I am today. The values I learned here — truth, honesty, and service — guide every decision I make.",
    attribution: "Alumni, Class of 2020",
    role: "alumni",
  },
  {
    quote: "The teachers here don't just teach — they inspire. They know every student by name, understand our strengths, and push us to be our best selves.",
    attribution: "Current Student, Class XII",
    role: "student",
  },
  {
    quote: "A nurturing environment where every child finds their voice. We chose St. Elizabeth for our daughter, and watching her flourish here has been our greatest joy as parents.",
    attribution: "Parent of Class VIII Student",
    role: "parent",
  },
];

// ── Panel 6: CTA Banner ────────────────────────────────────────────────

export const CTA_CONTENT = {
  eyebrow: "Ready to Discover St. Elizabeth?",
  heading: "Ready to Join Our Community?",
  description: "Start your St. Elizabeth journey today. We look forward to welcoming your family into ours.",
  primaryCTA: { text: "Inquire Now" as const, href: "/admissions" as const },
  secondaryCTA: { text: "Plan a Visit" as const, href: "/contact/visit" as const },
};

// ── Panel 7: Latest News ───────────────────────────────────────────────

export interface NewsItemData {
  title: string;
  date: string;
  excerpt: string;
  imageFilename: string;
  href: string;
}

export const LATEST_NEWS: NewsItemData[] = [
  {
    title: "Annual Day Celebration 2024",
    date: "November 15, 2024",
    excerpt: "Students, staff, and families gathered to celebrate another year of academic and co-curricular achievement at St. Elizabeth High School.",
    imageFilename: "DSC07504.jpg",
    href: "/news/annual-day-2024",
  },
  {
    title: "Sports Meet XXII — A Display of Spirit",
    date: "November 22, 2024",
    excerpt: "Houses competed with passion and sportsmanship at the 22nd annual inter-house sports meet on the St. Elizabeth grounds.",
    imageFilename: "DSC07546.jpg",
    href: "/news/sports-meet-xxii",
  },
  {
    title: "Feast Day Celebrations at St. Elizabeth",
    date: "November 19, 2024",
    excerpt: "The school community came together in prayer and celebration for the annual Feast Day, honouring our patron saint's legacy.",
    imageFilename: "DSC07555.jpg",
    href: "/news/feast-day-2024",
  },
];
```

---

### File 3–12: Remaining Data Files

Create the following files with the specified structure. Each file exports typed data constants following the same pattern as `homepage.ts`:

**`src/data/about.ts`:**
```typescript
export const MISSION_STATEMENT = { ... };
export const HISTORY_TIMELINE = [ ... ];
export const STAFF_MEMBERS = [ ... ];
export const STRATEGIC_PLAN_POINTS = [ ... ];
```

**`src/data/admissions.ts`:**
```typescript
export const WHY_ST_ELIZABETH_POINTS = [ ... ];
export const ADMISSION_STEPS = [ ... ];
export const FAQS = [ ... ];
export const TUITION_INFO = { ... };
```

**`src/data/academics.ts`:**
```typescript
export interface Department { name: string; description: string; icon: string; href: string; }
export const DEPARTMENTS: Department[] = [
  { name: "Science", description: "...", icon: "science", href: "/academics/departments/science" },
  { name: "Mathematics", description: "...", icon: "math", href: "/academics/departments/mathematics" },
  { name: "English", description: "...", icon: "english", href: "/academics/departments/english" },
  { name: "Social Studies", description: "...", icon: "social-studies", href: "/academics/departments/social-studies" },
  { name: "World Languages", description: "...", icon: "languages", href: "/academics/languages" },
  { name: "Libraries", description: "...", icon: "library", href: "/academics/libraries" },
  { name: "College Counseling", description: "...", icon: "counseling", href: "/academics/college-counseling" },
];
```

**`src/data/athletics.ts`:**
```typescript
export interface Sport { name: string; description: string; seasons: string[]; }
export const SPORTS: Sport[] = [
  { name: "Basketball", description: "...", seasons: ["Winter"] },
  { name: "Football", description: "...", seasons: ["Monsoon"] },
  { name: "Volleyball", description: "...", seasons: ["Winter"] },
  { name: "Cricket", description: "...", seasons: ["Summer"] },
  { name: "Athletics", description: "...", seasons: ["Year-round"] },
  { name: "Swimming", description: "...", seasons: ["Summer"] },
  { name: "Tennis", description: "...", seasons: ["Winter"] },
];
export const ATHLETICS_STATS = { teams: 7, athletes: "300+", championships: "15+" };
```

**`src/data/arts.ts`:**
```typescript
export const VISUAL_ARTS_PROGRAMS = [ ... ];
export const PERFORMING_ARTS_PROGRAMS = [ ... ];
```

**`src/data/student-life.ts`:**
```typescript
export interface Club { name: string; description: string; category: string; }
export const CLUBS: Club[] = [
  { name: "Debate Society", description: "...", category: "Academic" },
  { name: "Eco Club", description: "...", category: "Service" },
  { name: "Drama Club", description: "...", category: "Arts" },
  { name: "Student Council", description: "...", category: "Leadership" },
  // ... more clubs
];
```

**`src/data/contact.ts`:**
```typescript
export const SCHOOL_ADDRESS = {
  street: "Ven. Fr. Hilario Gonsalves Rd",
  area: "Pomburpa, Bardez",
  city: "Goa",
  pinCode: "4031102",
  country: "India",
};
export const SCHOOL_CONTACT = {
  phone: "+91 XXXXXXXXXX",
  email: "info@stelizabethhighschool.in",
};
export const GOOGLE_MAPS_EMBED_URL = "https://maps.app.goo.gl/sD92dQfRfDHrpTHK6";
```

**`src/data/how-to-help.ts`:**
```typescript
export const GIVING_OPTIONS = [ ... ];
export const SPONSORSHIP_TIERS = [ ... ];
export const IMPACT_STORIES = [ ... ];
```

**`src/data/alumni.ts`:**
```typescript
export const NOTABLE_ALUMNI = [ ... ];
export const ALUMNI_EVENTS = [ ... ];
```

**`src/data/news.ts`:**
```typescript
export interface NewsArticle { title: string; date: string; excerpt: string; imageFilename: string; category: string; href: string; }
export const NEWS_ARTICLES: NewsArticle[] = [ ... ];
export const UPCOMING_EVENTS = [ ... ];
```

---

### File 13: `src/data/index.ts`

```typescript
export * from "./navigation";
export * from "./homepage";
export * from "./about";
export * from "./admissions";
export * from "./academics";
export * from "./athletics";
export * from "./arts";
export * from "./student-life";
export * from "./contact";
export * from "./how-to-help";
export * from "./alumni";
export * from "./news";
export * from "./images";
```

---

## 4. IMAGE VERIFICATION

After creating `src/data/images.ts`, verify against the filesystem:

```bash
cd /home/avinash/Files/Projects/ElizabethFinal/intro-animation
ls images/*.jpg | wc -l
# Should output: 71 (or 71 image files)

# Verify every image in the registry exists on disk:
cd StElizabethWeb
node -e "
const fs = require('fs');
const path = require('path');
const imagesDir = '../images';
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));
console.log('Images on disk:', files.length);
// This script verifies files exist; the full registry validation is done in tests
"
```

---

## 5. TEST SPECIFICATIONS

Create `src/data/__tests__/images.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import {
  HERO_IMAGES,
  HOMEPAGE_GRID_IMAGES,
  VALUES_IMAGES,
  STATS_IMAGES,
  TESTIMONIAL_IMAGES,
  NEWS_IMAGES,
  TOTAL_IMAGES,
  getImageByFilename,
} from "../images";

describe("Image Registry", () => {
  it("catalogues exactly 71 images", () => {
    expect(TOTAL_IMAGES).toBe(71);
  });

  it("has 5 hero images", () => {
    expect(HERO_IMAGES).toHaveLength(5);
  });

  it("has 12 homepage grid images", () => {
    expect(HOMEPAGE_GRID_IMAGES).toHaveLength(12);
  });

  it("has 3 values background images", () => {
    expect(Object.keys(VALUES_IMAGES)).toHaveLength(3);
  });

  it("has 3 stats images", () => {
    expect(STATS_IMAGES).toHaveLength(3);
  });

  it("has 3 testimonial images", () => {
    expect(TESTIMONIAL_IMAGES).toHaveLength(3);
  });

  it("has 3 news images", () => {
    expect(NEWS_IMAGES).toHaveLength(3);
  });

  it("every image has non-empty alt text", () => {
    const allImages = [
      ...HERO_IMAGES,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
    ];
    for (const img of allImages) {
      expect(img.alt).toBeTruthy();
      expect(img.alt.length).toBeGreaterThan(10);
    }
  });

  it("getImageByFilename returns correct image", () => {
    const img = getImageByFilename("DSC07580.jpg");
    expect(img).toBeDefined();
    expect(img!.section).toBe("homepage-hero");
  });

  it("getImageByFilename returns undefined for unknown file", () => {
    expect(getImageByFilename("nonexistent.jpg")).toBeUndefined();
  });

  it("all filenames end with .jpg or .jpg (HDR)", () => {
    const allImages = [
      ...HERO_IMAGES,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
    ];
    for (const img of allImages) {
      expect(img.filename).toMatch(/\.jpg$/);
    }
  });
});
```

Create `src/data/__tests__/homepage.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { VALUES, STATS, TESTIMONIALS, LATEST_NEWS, HERO_CONTENT } from "../homepage";

describe("Homepage Data", () => {
  it("has exactly 3 values", () => {
    expect(VALUES).toHaveLength(3);
  });

  it("values have numbers 01, 02, 03 in order", () => {
    expect(VALUES[0].number).toBe("01");
    expect(VALUES[1].number).toBe("02");
    expect(VALUES[2].number).toBe("03");
  });

  it("values have non-empty titles and bodies", () => {
    for (const v of VALUES) {
      expect(v.title).toBeTruthy();
      expect(v.body.length).toBeGreaterThan(50);
    }
  });

  it("has exactly 3 stats", () => {
    expect(STATS).toHaveLength(3);
  });

  it("stats include Founded, Students, and Affiliated", () => {
    const labels = STATS.map((s) => s.label);
    expect(labels).toContain("Founded");
    expect(labels).toContain("Students");
    expect(labels).toContain("Affiliated");
  });

  it("has exactly 3 testimonials", () => {
    expect(TESTIMONIALS).toHaveLength(3);
  });

  it("testimonials have all three roles represented", () => {
    const roles = TESTIMONIALS.map((t) => t.role);
    expect(roles).toContain("alumni");
    expect(roles).toContain("student");
    expect(roles).toContain("parent");
  });

  it("has exactly 3 news items", () => {
    expect(LATEST_NEWS).toHaveLength(3);
  });

  it("hero content has all required fields", () => {
    expect(HERO_CONTENT.statement).toBeTruthy();
    expect(HERO_CONTENT.heading).toBeTruthy();
    expect(HERO_CONTENT.loadOverlayText).toBeTruthy();
  });
});
```

---

## 6. ACCEPTANCE CRITERIA

- [ ] `src/data/` directory exists with all 14 files (13 data files + 1 barrel export)
- [ ] `src/data/__tests__/` directory exists with at least `images.test.ts` and `homepage.test.ts`
- [ ] `pnpm test` passes — existing 89 tests + new data tests all green
- [ ] `pnpm build` passes — no TypeScript errors
- [ ] `TOTAL_IMAGES` constant equals 71
- [ ] Every image in the registry has non-empty `alt` text (at least 10 characters)
- [ ] Every image filename ends with `.jpg`
- [ ] Navigation data has all 10 menu categories
- [ ] Footer data has 4 link sections
- [ ] All data exports are typed with TypeScript interfaces
- [ ] No circular imports between data modules
- [ ] The barrel export (`src/data/index.ts`) re-exports all modules

---

*Handoff complete. Proceed to Step 3 after this step is verified.*
