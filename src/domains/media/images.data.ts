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
  },
  {
    filename: "DSC07548.jpg",
    alt: "Students participating in a school event at St. Elizabeth's High School, warm morning atmosphere",
    category: "hero",
    section: "about-hero",
  },
  {
    filename: "DSC07360.jpg",
    alt: "St. Elizabeth's High School campus view with natural daylight, balanced composition for text overlay",
    category: "hero",
    section: "admissions-hero",
  },
  {
    filename: "DSC07495.jpg",
    alt: "Bright campus activity at St. Elizabeth's High School, students in natural daylight",
    category: "hero",
    section: "athletics-hero",
  },
  {
    filename: "DSC07504.jpg",
    alt: "Dynamic school event at St. Elizabeth's High School, students engaged in group activity",
    category: "hero",
    section: "student-life-hero",
  },
];

// ── Hero image for Academics (unique cool-tone image) ──────────────────

export const ACADEMICS_HERO: ImageAsset = {
  filename: "DSC07576.jpg",
  alt: "Students studying together in a quiet corner of the school library",
  category: "academics",
  section: "academics-hero",
};

// ── Homepage Photo Grid (12 images — masonry gallery) ──────────────────
//
// Hero images (span 6 cols × 2 rows in the masonry grid):
//   DSC07290 — community gathering, warm/cozy
//   DSC07301 — athletics, dynamic/bold
//
// All other images are standard (span 3 cols × 1 row).

export const HOMEPAGE_GRID_HERO_FILENAMES: string[] = ["DSC07290.jpg", "DSC07301.jpg"];

export const HOMEPAGE_GRID_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07290.jpg",
    alt: "School community gathered for the annual day celebration in the auditorium",
    category: "community",
    section: "homepage-grid",
    subCategory: "Gathering",
    date: "Spring 2025",
  },
  {
    filename: "DSC07292.jpg",
    alt: "Students walking together in the school corridor between classes",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Campus Life",
    date: "Fall 2024",
  },
  {
    filename: "DSC07294.jpg",
    alt: "Students performing a skit during the annual cultural programme",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "School Event",
    date: "Annual Day 2024",
  },
  {
    filename: "DSC07300.jpg",
    alt: "Close-up of students working on a craft project during art class",
    category: "community",
    section: "homepage-grid",
    subCategory: "Community Outreach",
    date: "Winter 2024",
  },
  {
    filename: "DSC07301.jpg",
    alt: "Students competing in a relay race during the inter-house sports meet",
    category: "athletics",
    section: "homepage-grid",
    subCategory: "Inter-House",
    date: "2024",
  },
  {
    filename: "DSC07305.jpg",
    alt: "Action shot of students during a football match on the school field",
    category: "athletics",
    section: "homepage-grid",
    subCategory: "Sports Day",
    date: "2024",
  },
  {
    filename: "DSC07317.jpg",
    alt: "Panoramic view of the school campus with green trees and buildings",
    category: "general",
    section: "homepage-grid",
    subCategory: "Campus",
    date: "Spring 2025",
  },
  {
    filename: "DSC07328.jpg",
    alt: "Teacher explaining a concept on the whiteboard to attentive students",
    category: "academics",
    section: "homepage-grid",
    subCategory: "Classroom",
    date: "Fall 2024",
  },
  {
    filename: "DSC07335.jpg",
    alt: "Students enjoying outdoor games during the school sports period",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Activities",
    date: "Spring 2025",
  },
  {
    filename: "DSC07346.jpg",
    alt: "Friends walking together across the school campus during lunch break",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Friendship",
    date: "Fall 2024",
  },
  {
    filename: "DSC07351.jpg",
    alt: "Students collaborating on a group assignment in the school library",
    category: "student-life",
    section: "homepage-grid",
    subCategory: "Group Work",
    date: "2024",
  },
  {
    filename: "DSC07370.jpg",
    alt: "Students and teachers celebrating together during the school feast day",
    category: "community",
    section: "homepage-grid",
    subCategory: "Celebration",
    date: "Annual Day 2024",
  },
];

// ── Homepage Value Card Background Images ──────────────────────────────

export const VALUES_IMAGES: Record<string, ImageAsset> = {
  faith: {
    filename: "DSC07463.jpg",
    alt: "Heritage corner of the school displaying historical photographs and artifacts",
    category: "heritage",
    section: "homepage-values",
  },
  excellence: {
    filename: "DSC07497.jpg",
    alt: "Students receiving academic awards during the school prize distribution ceremony",
    category: "academics",
    section: "homepage-values",
  },
  community: {
    filename: "DSC07378.jpg",
    alt: "Students and parents enjoying the school community picnic on campus",
    category: "community",
    section: "homepage-values",
  },
};

// ── Stats IconCard Images ──────────────────────────────────────────────

export const STATS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07632.jpg",
    alt: "Historical photograph of the school building from the early years",
    category: "heritage",
    section: "homepage-stats",
  },
  {
    filename: "DSC07420.jpg",
    alt: "Students raising their hands during an interactive classroom session",
    category: "student-life",
    section: "homepage-stats",
  },
  {
    filename: "DSC07428.jpg",
    alt: "Students standing in formation during the morning assembly prayer",
    category: "general",
    section: "homepage-stats",
  },
];

// ── Testimonial Background Images ──────────────────────────────────────

export const TESTIMONIAL_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07400.jpg",
    alt: "Parents and teachers interacting during the parent-teacher meeting",
    category: "community",
    section: "homepage-testimonials",
  },
  {
    filename: "DSC07437.jpg",
    alt: "Students playing basketball during the school sports period",
    category: "student-life",
    section: "homepage-testimonials",
  },
  {
    filename: "DSC07477.jpg",
    alt: "Community members gathered for a school event on campus",
    category: "community",
    section: "homepage-testimonials",
  },
];

// ── News Card Images ───────────────────────────────────────────────────

export const NEWS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07504.jpg",
    alt: "Annual Day Celebration 2024 at St. Elizabeth's High School",
    category: "gallery",
    section: "homepage-news",
  },
  {
    filename: "DSC07546.jpg",
    alt: "Sports Meet XXII at St. Elizabeth's High School, athletic competition",
    category: "athletics",
    section: "homepage-news",
  },
  {
    filename: "DSC07555.jpg",
    alt: "Feast Day celebration at St. Elizabeth's High School",
    category: "community",
    section: "homepage-news",
  },
];

// ── Academics Section Images ───────────────────────────────────────────

export const ACADEMICS_IMAGES: ImageAsset[] = [
  ACADEMICS_HERO,
  {
    filename: "DSC07502.jpg",
    alt: "Students presenting their science projects at the annual exhibition",
    category: "academics",
    section: "academics-departments",
  },
  {
    filename: "DSC07431.jpg",
    alt: "Teacher explaining a science concept using a practical demonstration",
    category: "academics",
    section: "academics-departments",
  },
  {
    filename: "DSC07510.jpg",
    alt: "Students engaged in a group discussion during English literature class",
    category: "academics",
    section: "academics-departments",
  },
  {
    filename: "DSC07518.jpg",
    alt: "Students working on mathematics problems during a practice session",
    category: "academics",
    section: "academics-departments",
  },
  {
    filename: "DSC07522.jpg",
    alt: "Students taking notes during a biology lesson in the classroom",
    category: "academics",
    section: "academics-departments",
  },
  {
    filename: "DSC07584.jpg",
    alt: "Students practicing Hindi language skills during a class activity",
    category: "academics",
    section: "academics-departments",
  },
  {
    filename: "DSC07590.jpg",
    alt: "Teacher addressing students during a special school assembly",
    category: "academics",
    section: "academics-departments",
  },
];

// ── Athletics Section Images ───────────────────────────────────────────

export const ATHLETICS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07495.jpg",
    alt: "Athletics at St. Elizabeth's High School, bright dynamic sports activity",
    category: "athletics",
    section: "athletics-hero",
  },
  {
    filename: "DSC07580.jpg",
    alt: "Dynamic athletic event at St. Elizabeth's High School, highest energy capture",
    category: "athletics",
    section: "athletics-teams",
  },
  {
    filename: "DSC07504.jpg",
    alt: "Sports competition at St. Elizabeth's High School, bold action",
    category: "athletics",
    section: "athletics-teams",
  },
  {
    filename: "DSC07546.jpg",
    alt: "Athletic team activity at St. Elizabeth's High School",
    category: "athletics",
    section: "athletics-teams",
  },
  {
    filename: "DSC07548.jpg",
    alt: "Sports event at St. Elizabeth's High School, dynamic crowd energy",
    category: "athletics",
    section: "athletics-teams",
  },
  {
    filename: "DSC07555.jpg",
    alt: "Athletic competition at St. Elizabeth's High School",
    category: "athletics",
    section: "athletics-teams",
  },
  {
    filename: "DSC07301.jpg",
    alt: "Indoor sports activity at St. Elizabeth's High School, lively atmosphere",
    category: "athletics",
    section: "athletics-teams",
  },
];

// ── Arts Section Images ────────────────────────────────────────────────

export const ARTS_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07565.jpg",
    alt: "Arts program at St. Elizabeth's High School, warm creative atmosphere with rosy tones",
    category: "arts",
    section: "arts-hero",
  },
  {
    filename: "DSC07575.jpg",
    alt: "Outdoor arts activity at St. Elizabeth's High School, natural setting with greenery",
    category: "arts",
    section: "arts-visual",
  },
  {
    filename: "DSC07597.jpg",
    alt: "Group of students laughing together during a break between classes",
    category: "arts",
    section: "arts-performing",
  },
  {
    filename: "DSC07610.jpg",
    alt: "Unique flash-lit arts moment at St. Elizabeth's High School, golden wood tones",
    category: "arts",
    section: "arts-visual",
  },
];

// ── Student Life Section Images ────────────────────────────────────────

export const STUDENT_LIFE_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07504.jpg",
    alt: "Vibrant student life at St. Elizabeth's High School",
    category: "student-life",
    section: "student-life-hero",
  },
  {
    filename: "DSC07306.jpg",
    alt: "Students engaged in a group activity during the school community day",
    category: "student-life",
    section: "student-life-clubs",
  },
  {
    filename: "DSC07349.jpg",
    alt: "Students cleaning the school garden as part of the environmental club activity",
    category: "student-life",
    section: "student-life-clubs",
  },
  {
    filename: "DSC07373.jpg",
    alt: "Student council members meeting to plan upcoming school events",
    category: "student-life",
    section: "student-life-clubs",
  },
  {
    filename: "DSC07381.jpg",
    alt: "Students helping each other with homework during the after-school study period",
    category: "student-life",
    section: "student-life-clubs",
  },
  {
    filename: "DSC07404.jpg",
    alt: "Students practicing for the school choir performance in the music room",
    category: "student-life",
    section: "student-life-clubs",
  },
  {
    filename: "DSC07411.jpg",
    alt: "Students reading and discussing books during the school book club meeting",
    category: "student-life",
    section: "student-life-clubs",
  },
];

// ── Community / Heritage Images ────────────────────────────────────────

export const COMMUNITY_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07619.jpg",
    alt: "Old photographs and memorabilia displayed in the school heritage room",
    category: "heritage",
    section: "about-history",
  },
  {
    filename: "DSC07469.jpg",
    alt: "School chapel entrance decorated for the annual feast day celebration",
    category: "heritage",
    section: "about-history",
  },
  {
    filename: "DSC07296.jpg",
    alt: "Students gathered around a teacher for an outdoor science lesson",
    category: "heritage",
    section: "about-mission",
  },
  {
    filename: "DSC07380.jpg",
    alt: "Students sitting in a circle during a values education class",
    category: "community",
    section: "about-mission",
  },
  {
    filename: "DSC07401.jpg",
    alt: "Students working on computers during the school computer lab period",
    category: "community",
    section: "about-mission",
  },
  {
    filename: "DSC07463.jpg",
    alt: "Heritage tradition at St. Elizabeth's High School, cozy dim lighting",
    category: "heritage",
    section: "about-history",
  },
  {
    filename: "DSC07632.jpg",
    alt: "Historical moment at St. Elizabeth's High School, unique exposure capture",
    category: "heritage",
    section: "about-history",
  },
];

// ── CTA Section Images (homepage) ──────────────────────────────────────

export const CTA_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07306.jpg",
    alt: "Students engaged in a group activity at St. Elizabeth's High School, warm and welcoming community atmosphere",
    category: "student-life",
    section: "homepage-cta",
  },
];

// ── Contact / Visit Page Images ────────────────────────────────────────

export const CONTACT_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07557.jpg",
    alt: "Aerial view of the St. Elizabeth's High School campus and buildings",
    category: "general",
    section: "contact-hero",
  },
  {
    filename: "DSC07394.jpg",
    alt: "Students gathered around a table working on a group science project",
    category: "general",
    section: "contact-hero",
  },
];

// ── Full Registry (all 71 images) ──────────────────────────────────────
// Every image must appear in exactly one exported array above OR in the
// OVERFLOW_IMAGES array below. No image is left uncatalogued.

export const OVERFLOW_IMAGES: ImageAsset[] = [
  {
    filename: "DSC07299.jpg",
    alt: "Students gathered in the school courtyard during a morning assembly at St. Elizabeth's High School",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07394.jpg",
    alt: "Campus activity at St. Elizabeth's High School",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07416.jpg",
    alt: "Students participating in an outdoor group activity on the school grounds",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07455.jpg",
    alt: "Students participating in a quiz competition during the school talent show",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07489.jpg",
    alt: "Students performing during the annual cultural event at St. Elizabeth's High School",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07524.jpg",
    alt: "Students working together on a science project in the school laboratory",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07525.jpg",
    alt: "Group of students posing for a photo after a school competition",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07528.jpg",
    alt: "Students reading in the school library during a quiet study period",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07533.jpg",
    alt: "Teacher guiding students through a mathematics lesson in the classroom",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07538.jpg",
    alt: "Students playing on the school playground during recess",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07541.jpg",
    alt: "Morning prayer assembly with students gathered in the school courtyard",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07543.jpg",
    alt: "Students presenting their science fair projects to visiting parents",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07557.jpg",
    alt: "School event at St. Elizabeth's High School",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07561.jpg",
    alt: "Students performing a choreographed dance during the annual day celebration",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07570.jpg",
    alt: "Students participating in a spelling bee competition on stage",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07590.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07592.jpg",
    alt: "Students working on art projects in the school art room",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07597.jpg",
    alt: "School activity at St. Elizabeth's High School",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07616.jpg",
    alt: "Students running on the school track during a sports practice session",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07622.jpg",
    alt: "Classroom discussion with students actively participating in a debate",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07629-HDR.jpg",
    alt: "Students performing an experiment during the annual science exhibition",
    category: "gallery",
    section: "overflow",
  },
  {
    filename: "DSC07634.jpg",
    alt: "Students from different houses lined up before the inter-house sports meet",
    category: "gallery",
    section: "overflow",
  },
];

// ── Helper: Get image by filename ──────────────────────────────────────

/** Flat array of all images across all registries — built once at module load. */
const ALL_IMAGES: ImageAsset[] = [
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

/**
 * O(1) image lookup by section.
 * Built once at module load time from all registries.
 * Only the FIRST image per section is indexed (hero images typically).
 */
export const IMAGE_BY_SECTION: Partial<Record<ImageSection, ImageAsset>> = Object.fromEntries(
  ALL_IMAGES.filter((img) => img.section !== "overflow")
    .map((img) => [img.section, img] as const)
    .filter(([section], idx, arr) => arr.findIndex(([s]) => s === section) === idx),
);

/** O(1) image lookup by filename — built once at module load. Keeps first occurrence. */
const IMAGE_BY_FILENAME: Partial<Record<string, ImageAsset>> = (() => {
  const map: Record<string, ImageAsset> = {};
  for (const img of ALL_IMAGES) {
    if (!(img.filename in map)) {
      map[img.filename] = img;
    }
  }
  return map;
})();

/**
 * Look up an ImageAsset by its filename across all registries.
 * Uses O(1) hash lookup; prefer `IMAGE_BY_SECTION` for section-based lookups.
 */
export function getImageByFilename(filename: string): ImageAsset | undefined {
  return IMAGE_BY_FILENAME[filename];
}

/** Count of unique filenames across all registries. */
export const TOTAL_IMAGES = new Set(ALL_IMAGES.map((img) => img.filename)).size;
