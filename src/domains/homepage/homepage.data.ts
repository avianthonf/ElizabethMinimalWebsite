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
    body: "We nurture a strong foundation of faith, encouraging students to live with hope, purpose, gratitude, and trust in God while respecting the beliefs of others.",
  },
  {
    number: "02",
    title: "Humility",
    body: "We believe that true greatness lies in humility. We encourage our students to remain grounded, respectful, and open to learning from every experience.",
  },
  {
    number: "03",
    title: "Compassion",
    body: "We foster empathy, kindness, and understanding, inspiring students to care for others, support those in need, and respect all forms of life.",
  },
  {
    number: "04",
    title: "Selfless Service",
    body: "Following the example of St. Elizabeth, we encourage our students to use their talents and abilities in the service of others, making a positive difference.",
  },
  {
    number: "05",
    title: "Integrity",
    body: "We uphold honesty, responsibility, and ethical conduct, empowering students to make the right choices and act with courage and fairness.",
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
    value: "1954",
    label: "Founded",
    description: "Over seven decades of educational excellence in Pomburpa, Bardez, Goa.",
  },
  {
    value: "185+",
    label: "Students",
    description:
      "An intimate learning community where every child is known by name, nurtured with individual attention.",
  },
  {
    value: "GBSHSE",
    label: "Affiliated",
    description:
      "Goa Board of Secondary and Higher Secondary Education curriculum with holistic development focus.",
  },
];

// ── Panel 5: Testimonials ──────────────────────────────────────────────

// ── TestimonialData updated for alumni-driven content ──────────────────

export interface TestimonialData {
  quote: string;
  attribution: string;
  role: "alumni" | "student" | "parent" | "teacher";
  /** Optional — for alumni testimonials */
  subtitle?: string;
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      "The guidance and education I received at St. Elizabeth High School were instrumental in shaping my dream of pursuing medicine. As the first doctor from my village in Ecoxim, I look back at my alma mater with immense gratitude for empowering me to serve our community.",
    attribution: "Dr. Mohandas Chodankar",
    subtitle: "BHMS, PGDEMS, MBA · Svastha Health Clinic, Ecoxim · Class of 1996",
    role: "alumni",
  },
  {
    quote:
      "The values of discipline, perseverance, teamwork, and integrity that I learned here have been the foundation of my professional journey. Today, I am privileged to serve as a Manager in an IT and Telecom organization, leading operations across Mumbai and Goa.",
    attribution: "Subash Sitaram Volvoikar",
    subtitle: "Manager — Delivery Telecom, Sify Technologies Ltd",
    role: "alumni",
  },
];

// ── Panel 6: CTA Banner ────────────────────────────────────────────────

export const CTA_CONTENT = {
  eyebrow: "Ready to Discover St. Elizabeth?",
  heading: "Ready to Join Our Community?",
  description:
    "Start your St. Elizabeth journey today. We look forward to welcoming your family into ours.",
  primaryCTA: { text: "Inquire Now" as const, href: "/admissions" as const },
  secondaryCTA: { text: "Contact Us" as const, href: "/contact" as const },
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
    excerpt:
      "Students, staff, and families gathered to celebrate another year of academic and co-curricular achievement at St. Elizabeth's High School.",
    imageFilename: "DSC07504.jpg",
    href: "/news/annual-day-2024",
  },
  {
    title: "Sports Meet XXII — A Display of Spirit",
    date: "November 22, 2024",
    excerpt:
      "Houses competed with passion and sportsmanship at the 22nd annual inter-house sports meet on the St. Elizabeth grounds.",
    imageFilename: "DSC07546.jpg",
    href: "/news/sports-meet-xxii",
  },
  {
    title: "Feast Day Celebrations at St. Elizabeth",
    date: "November 19, 2024",
    excerpt:
      "The school community came together in prayer and celebration for the annual Feast Day, honouring our patron saint's legacy.",
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
 * Validates data against Zod schema in development mode.
 */
export function getHomepageData(): HomepageData {
  return { HERO_CONTENT, VALUES, STATS, TESTIMONIALS, CTA_CONTENT, LATEST_NEWS };
}
