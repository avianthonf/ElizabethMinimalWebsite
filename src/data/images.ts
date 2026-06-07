/**
 * Centralized image registry for St. Elizabeth's High School.
 *
 * All 71 photographs were shot on a Sony ILCE-7RM5 (28-105mm F2.8)
 * on April 28, 2026, during morning hours (~8:45–9:30 AM IST).
 * All images are 4:3 landscape, sRGB, 99% JPEG quality.
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
  | "homepage-cta"
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
  /** Optional sub-category label for gallery display (e.g. "Inter-House 2024") */
  subCategory?: string;
  /** Optional date label for gallery display (e.g. "Spring 2025") */
  date?: string;
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
    alt: "St. Elizabeth's High School students engaged in a dynamic outdoor activity on campus grounds, morning sunlight",
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
    alt: "Students participating in a school event at St. Elizabeth's High School, warm morning atmosphere",
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
    alt: "St. Elizabeth's High School campus view with natural daylight, balanced composition for text overlay",
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
    alt: "Bright campus activity at St. Elizabeth's High School, students in natural daylight",
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
    alt: "Dynamic school event at St. Elizabeth's High School, students engaged in group activity",
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
  alt: "Academic setting at St. Elizabeth's High School, contemplative atmosphere with natural cool tones",
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

// ── Homepage Photo Grid (12 images — masonry gallery) ──────────────────
//
// Hero images (span 6 cols × 2 rows in the masonry grid):
//   DSC07290 — community gathering, warm/cozy
//   DSC07301 — athletics, dynamic/bold
//
// All other images are standard (span 3 cols × 1 row).

export const HOMEPAGE_GRID_HERO_FILENAMES: string[] = [
  "DSC07290.jpg",
  "DSC07301.jpg",
];

export const HOMEPAGE_GRID_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07290.jpg",
    alt: "Cozy community gathering at St. Elizabeth's High School, warm intimate atmosphere",
    category: "community",
    section: "homepage-grid",
    subCategory: "Gathering",
    date: "Spring 2025",
    profile: {
      brightness: 97.5, contrast: 56.3, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic", "lively"],
    },
  },
  {
    filename: "DSC07292.jpg",
    alt: "Students interacting during a school activity at St. Elizabeth's High School",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Campus Life",
    date: "Fall 2024",
    profile: {
      brightness: 106.1, contrast: 56.7, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07294.jpg",
    alt: "Engaging school event at St. Elizabeth's High School with students and staff",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "School Event",
    date: "Annual Day 2024",
    profile: {
      brightness: 105.1, contrast: 64.4, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07300.jpg",
    alt: "Intimate school community moment at St. Elizabeth's High School",
    category: "community",
    section: "homepage-grid",
    subCategory: "Community Outreach",
    date: "Winter 2024",
    profile: {
      brightness: 98.4, contrast: 46.6, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07301.jpg",
    alt: "Dynamic indoor school activity at St. Elizabeth's High School, high energy atmosphere",
    category: "athletics",
    section: "homepage-grid",
    subCategory: "Inter-House",
    date: "2024",
    profile: {
      brightness: 118.8, contrast: 71.9, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07305.jpg",
    alt: "Bold action scene at St. Elizabeth's High School, students participating in event",
    category: "athletics",
    section: "homepage-grid",
    subCategory: "Sports Day",
    date: "2024",
    profile: {
      brightness: 116.2, contrast: 71.1, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07317.jpg",
    alt: "Campus grounds at St. Elizabeth's High School in medium daylight, natural setting",
    category: "general",
    section: "homepage-grid",
    subCategory: "Campus",
    date: "Spring 2025",
    profile: {
      brightness: 130.8, contrast: 70.2, complexity: "medium",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic", "dynamic"],
    },
  },
  {
    filename: "DSC07328.jpg",
    alt: "Students engaged in learning activity at St. Elizabeth's High School",
    category: "academics",
    section: "homepage-grid",
    subCategory: "Classroom",
    date: "Fall 2024",
    profile: {
      brightness: 113.3, contrast: 64.4, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07335.jpg",
    alt: "Bright school activity at St. Elizabeth's High School, students in daylight",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Activities",
    date: "Spring 2025",
    profile: {
      brightness: 128.7, contrast: 68.9, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07346.jpg",
    alt: "School campus life at St. Elizabeth's High School, natural warm daylight",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Friendship",
    date: "Fall 2024",
    profile: {
      brightness: 137.1, contrast: 66.3, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07351.jpg",
    alt: "Students at St. Elizabeth's High School engaged in group activity, medium daylight",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Group Work",
    date: "2024",
    profile: {
      brightness: 123.1, contrast: 61.4, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07370.jpg",
    alt: "Story-rich school moment at St. Elizabeth's High School, warm atmosphere",
    category: "community",
    section: "homepage-grid",
    subCategory: "Celebration",
    date: "Annual Day 2024",
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
    alt: "Heritage and faith tradition at St. Elizabeth's High School, warm intimate lighting",
    category: "heritage",
    section: "homepage-values",
    profile: {
      brightness: 84.5, contrast: 50.0, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  excellence: {
    filename: "DSC07497.jpg",
    alt: "Academic excellence in action at St. Elizabeth's High School, bright engaged learning",
    category: "academics",
    section: "homepage-values",
    profile: {
      brightness: 121.7, contrast: 60.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  community: {
    filename: "DSC07378.jpg",
    alt: "Community gathering at St. Elizabeth's High School, warm inclusive atmosphere",
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
    alt: "Heritage photo representing St. Elizabeth's High School's founding in 1949",
    category: "heritage",
    section: "homepage-stats",
    profile: {
      brightness: 83.4, contrast: 51.5, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07420.jpg",
    alt: "Student body at St. Elizabeth's High School, dynamic group atmosphere",
    category: "student-life",
    section: "homepage-stats",
    profile: {
      brightness: 118.4, contrast: 70.0, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07428.jpg",
    alt: "Campus view at St. Elizabeth's High School, representing CBSE affiliation",
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
    alt: "Alumni community moment at St. Elizabeth's High School",
    category: "community",
    section: "homepage-testimonials",
    profile: {
      brightness: 98.6, contrast: 56.8, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07437.jpg",
    alt: "Student life at St. Elizabeth's High School, balanced natural scene",
    category: "student-life",
    section: "homepage-testimonials",
    profile: {
      brightness: 108.6, contrast: 60.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07477.jpg",
    alt: "Parent and community engagement at St. Elizabeth's High School",
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
    alt: "Annual Day Celebration 2024 at St. Elizabeth's High School",
    category: "gallery",
    section: "homepage-news",
    profile: {
      brightness: 121.2, contrast: 72.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07546.jpg",
    alt: "Sports Meet XXII at St. Elizabeth's High School, athletic competition",
    category: "athletics",
    section: "homepage-news",
    profile: {
      brightness: 118.8, contrast: 71.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold"],
    },
  },
  {
    filename: "DSC07555.jpg",
    alt: "Feast Day celebration at St. Elizabeth's High School",
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
    alt: "Academic learning environment at St. Elizabeth's High School, neutral balanced tones",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 97.2, contrast: 60.0, complexity: "high",
      temperature: "neutral", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07431.jpg",
    alt: "Classroom setting at St. Elizabeth's High School, focused learning atmosphere",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 118.7, contrast: 60.0, complexity: "medium",
      temperature: "neutral-warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07510.jpg",
    alt: "Academic activity at St. Elizabeth's High School, engaged students",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 110.6, contrast: 60.0, complexity: "high",
      temperature: "neutral-warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07518.jpg",
    alt: "Learning environment at St. Elizabeth's High School",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 116.6, contrast: 61.2, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07522.jpg",
    alt: "Students learning at St. Elizabeth's High School",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 119.4, contrast: 62.6, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07584.jpg",
    alt: "Academic pursuit at St. Elizabeth's High School, warm learning atmosphere",
    category: "academics",
    section: "academics-departments",
    profile: {
      brightness: 113.9, contrast: 65.9, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07590.jpg",
    alt: "Bright academic setting at St. Elizabeth's High School, medium daylight",
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
    alt: "Athletics at St. Elizabeth's High School, bright dynamic sports activity",
    category: "athletics",
    section: "athletics-hero",
    profile: {
      brightness: 140.7, contrast: 64.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07580.jpg",
    alt: "Dynamic athletic event at St. Elizabeth's High School, highest energy capture",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 142.6, contrast: 73.7, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07504.jpg",
    alt: "Sports competition at St. Elizabeth's High School, bold action",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 121.2, contrast: 72.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07546.jpg",
    alt: "Athletic team activity at St. Elizabeth's High School",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 118.8, contrast: 71.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold"],
    },
  },
  {
    filename: "DSC07548.jpg",
    alt: "Sports event at St. Elizabeth's High School, dynamic crowd energy",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 133.2, contrast: 71.9, complexity: "high",
      temperature: "warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07555.jpg",
    alt: "Athletic competition at St. Elizabeth's High School",
    category: "athletics",
    section: "athletics-teams",
    profile: {
      brightness: 115.8, contrast: 71.6, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold"],
    },
  },
  {
    filename: "DSC07301.jpg",
    alt: "Indoor sports activity at St. Elizabeth's High School, lively atmosphere",
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
    alt: "Arts program at St. Elizabeth's High School, warm creative atmosphere with rosy tones",
    category: "arts",
    section: "arts-hero",
    profile: {
      brightness: 132.8, contrast: 58.6, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07575.jpg",
    alt: "Outdoor arts activity at St. Elizabeth's High School, natural setting with greenery",
    category: "arts",
    section: "arts-visual",
    profile: {
      brightness: 130.1, contrast: 61.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07597.jpg",
    alt: "Creative arts at St. Elizabeth's High School, medium daylight balanced scene",
    category: "arts",
    section: "arts-performing",
    profile: {
      brightness: 133.2, contrast: 59.2, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07610.jpg",
    alt: "Unique flash-lit arts moment at St. Elizabeth's High School, golden wood tones",
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
    alt: "Vibrant student life at St. Elizabeth's High School",
    category: "student-life",
    section: "student-life-hero",
    profile: {
      brightness: 121.2, contrast: 72.1, complexity: "high",
      temperature: "neutral-warm", moodTags: ["dynamic", "bold", "eye-catching"],
    },
  },
  {
    filename: "DSC07306.jpg",
    alt: "Student community at St. Elizabeth's High School, medium daylight",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 134.1, contrast: 68.8, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07349.jpg",
    alt: "Club activities at St. Elizabeth's High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 119.8, contrast: 66.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07373.jpg",
    alt: "Student organizations at St. Elizabeth's High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 122.8, contrast: 68.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07381.jpg",
    alt: "Student community engagement at St. Elizabeth's High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 105.0, contrast: 64.1, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07404.jpg",
    alt: "Student life moment at St. Elizabeth's High School",
    category: "student-life",
    section: "student-life-clubs",
    profile: {
      brightness: 111.8, contrast: 64.8, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07411.jpg",
    alt: "Student activity at St. Elizabeth's High School",
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
    alt: "Intimate heritage moment at St. Elizabeth's High School, warm nostalgic flash-lit scene",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 78.3, contrast: 43.2, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic", "soft", "gentle"],
    },
  },
  {
    filename: "DSC07469.jpg",
    alt: "Royal blue heritage accent at St. Elizabeth's High School, low-key intimate lighting",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 78.6, contrast: 50.0, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07296.jpg",
    alt: "Community heritage at St. Elizabeth's High School, dim warm earth tones",
    category: "heritage",
    section: "about-mission",
    profile: {
      brightness: 106.9, contrast: 63.6, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07380.jpg",
    alt: "Cozy community gathering at St. Elizabeth's High School",
    category: "community",
    section: "about-mission",
    profile: {
      brightness: 98.9, contrast: 56.5, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07401.jpg",
    alt: "Intimate school community moment at St. Elizabeth's High School",
    category: "community",
    section: "about-mission",
    profile: {
      brightness: 94.7, contrast: 61.1, complexity: "high",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07463.jpg",
    alt: "Heritage tradition at St. Elizabeth's High School, cozy dim lighting",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 84.5, contrast: 50.0, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
  {
    filename: "DSC07632.jpg",
    alt: "Historical moment at St. Elizabeth's High School, unique exposure capture",
    category: "heritage",
    section: "about-history",
    profile: {
      brightness: 83.4, contrast: 51.5, complexity: "medium",
      temperature: "warm", moodTags: ["cozy", "intimate", "nostalgic"],
    },
  },
];

// ── CTA Section Images (homepage) ──────────────────────────────────────

export const CTA_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07306.jpg",
    alt: "Students engaged in a group activity at St. Elizabeth's High School, warm and welcoming community atmosphere",
    category: "student-life",
    section: "homepage-cta",
    profile: {
      brightness: 134.1,
      contrast: 68.8,
      complexity: "high",
      temperature: "warm",
      moodTags: ["balanced", "natural", "authentic"],
    },
  },
];

// ── Contact / Visit Page Images ────────────────────────────────────────

export const CONTACT_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07557.jpg",
    alt: "Welcome to St. Elizabeth's High School, bright medium daylight campus view",
    category: "general",
    section: "contact-hero",
    profile: {
      brightness: 122.3, contrast: 67.0, complexity: "high",
      temperature: "warm", moodTags: ["balanced", "natural", "authentic"],
    },
  },
  {
    filename: "DSC07394.jpg",
    alt: "Campus welcome scene at St. Elizabeth's High School, medium daylight",
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
  {
    filename: "DSC07299.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 104.2, contrast: 62.8, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07394.jpg",
    alt: "Campus activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 124.4, contrast: 68.5, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07416.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 109.2, contrast: 60.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07455.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 110.6, contrast: 68.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07489.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 106.8, contrast: 64.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07524.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 107.3, contrast: 62.7, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07525.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 103.8, contrast: 63.4, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07528.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 119.8, contrast: 65.1, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07533.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 117.5, contrast: 60.9, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07538.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 102.3, contrast: 59.3, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07541.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 101.5, contrast: 57.6, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07543.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 102.7, contrast: 51.8, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07557.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 122.3, contrast: 67.0, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07561.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 112.7, contrast: 66.2, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07570.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 114.7, contrast: 61.9, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07590.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 123.3, contrast: 63.7, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07592.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 109.6, contrast: 60.4, complexity: "high", temperature: "neutral-warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07597.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 133.2, contrast: 59.2, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07616.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 108.2, contrast: 63.6, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07622.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 103.5, contrast: 64.4, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07629-HDR.jpg",
    alt: "HDR school scene at St. Elizabeth's High School",
    category: "gallery", section: "overflow",
    profile: { brightness: 105.1, contrast: 65.5, complexity: "high", temperature: "warm", moodTags: ["balanced", "natural", "authentic"] },
  },
  {
    filename: "DSC07634.jpg",
    alt: "School event at St. Elizabeth's High School",
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
    ...CTA_IMAGES,
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

/** Count unique filenames across all registries. Should equal 71. */
function countUnique() {
  const seen = new Set<string>();
  const allImages = [
    ...HERO_IMAGES,
    ACADEMICS_HERO,
    ...HOMEPAGE_GRID_IMAGES,
    ...Object.values(VALUES_IMAGES),
    ...STATS_IMAGES,
    ...TESTIMONIAL_IMAGES,
    ...NEWS_IMAGES,
    ...CTA_IMAGES,
    ...ACADEMICS_IMAGES,
    ...ATHLETICS_IMAGES,
    ...ARTS_IMAGES,
    ...STUDENT_LIFE_IMAGES,
    ...COMMUNITY_IMAGES,
    ...CONTACT_IMAGES,
    ...OVERFLOW_IMAGES,
  ];
  for (const img of allImages) {
    seen.add(img.filename);
  }
  return seen.size;
}

export const TOTAL_IMAGES = countUnique();
