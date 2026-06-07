/**
 * Content for the St. Elizabeth's High School homepage.
 * 8-panel horizontal scroll layout per PAGE_ELEMENT_HIERARCHY.md
 */

// ── Panel 1: Hero ──────────────────────────────────────────────────────

export const HERO_CONTENT = {
  statement:
    "St. Elizabeth's High School inspires transformative learning through meaningful relationships, academic excellence and unique opportunities. With an average class size of 15 students, each student is challenged, supported and most of all...",
  heading: "Nurturing Hearts",
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
    excerpt: "Students, staff, and families gathered to celebrate another year of academic and co-curricular achievement at St. Elizabeth's High School.",
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

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface HomepageData {
  HERO_CONTENT: typeof HERO_CONTENT;
  VALUES: ValueCardData[];
  STATS: StatData[];
  TESTIMONIALS: TestimonialData[];
  CTA_CONTENT: typeof CTA_CONTENT;
  LATEST_NEWS: NewsItemData[];
}

/**
 * Fetches homepage data.
 *
 * Currently returns static content. When a CMS is integrated, replace
 * only the implementation body — no component changes needed.
 */
export async function getHomepageData(): Promise<HomepageData> {
  return { HERO_CONTENT, VALUES, STATS, TESTIMONIALS, CTA_CONTENT, LATEST_NEWS };
}
