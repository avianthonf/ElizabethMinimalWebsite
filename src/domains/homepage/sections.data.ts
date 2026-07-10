/**
 * Homepage section data for the vertical-scroll rebuild.
 * Builds on existing homepage.ts (HERO_CONTENT, VALUES, STATS, TESTIMONIALS, CTA_CONTENT, LATEST_NEWS).
 */

import { CONTACT_EMAIL, POSTAL_CODE } from "@/shared/lib/brand";
import { GOOGLE_MAPS_DIRECTIONS_URL } from "@/domains/contact/contact.data";
import { SCHOOL_CONFIG, SCHOOL_STATS, CONTACT_CONFIG } from "@/shared/config";

import { WHY_ST_ELIZABETH_POINTS } from "@/domains/admissions/admissions.data";
import { BEYOND_ACADEMICS_SECTIONS } from "@/domains/beyond-academics/beyond.data";

// ── Hero Carousel ──────────────────────────────────────────────────────

export interface HeroSlide {
  tagline: string;
  heading: string;
  ctaText: string;
  ctaHref: string;
  imageFilename: string;
  imageAlt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    tagline: `Est. ${SCHOOL_CONFIG.FOUNDED_YEAR} · ${SCHOOL_CONFIG.LOCATION.CITY}, ${SCHOOL_CONFIG.LOCATION.STATE}`,
    heading: "Guiding Minds, Nurturing Hearts, Building Futures",
    ctaText: "Discover Our Story",
    ctaHref: "/about/mission",
    imageFilename: "DSC07580.jpg",
    imageAlt: "Students engaged in dynamic outdoor activity on the St. Elizabeth's campus",
  },
  {
    tagline: "GBSHSE Affiliated",
    heading: "Academic Excellence Rooted in Values",
    ctaText: "Explore Academics",
    ctaHref: "/academics",
    imageFilename: "DSC07328.jpg",
    imageAlt: "Teacher explaining a concept to attentive students in class",
  },
  {
    tagline: "Holistic Development",
    heading: "Beyond the Classroom — Sports, Arts & Leadership",
    ctaText: "Discover Student Life",
    ctaHref: "/beyond-academics",
    imageFilename: "DSC07301.jpg",
    imageAlt: "Students competing in a relay race during the inter-house sports meet",
  },
  {
    tagline: "Seven Decades of Legacy",
    heading: "A Tradition of Truth, Honesty & Service",
    ctaText: "Our Heritage",
    ctaHref: "/about/history",
    imageFilename: "DSC07290.jpg",
    imageAlt: "School community gathered for the annual day celebration in the auditorium",
  },
  {
    tagline: "Join Our Family",
    heading: "Admissions Open for 2026-27",
    ctaText: "Apply Now",
    ctaHref: "/admissions/apply",
    imageFilename: "DSC07548.jpg",
    imageAlt: "Students participating in a school event, warm morning atmosphere",
  },
];

// ── Counter Bar ────────────────────────────────────────────────────────

export interface CounterStat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export const COUNTER_STATS: CounterStat[] = [
  { value: SCHOOL_CONFIG.FOUNDED_YEAR, suffix: "", label: "Year Founded" },
  { value: SCHOOL_STATS.STUDENT_TEACHER_RATIO, suffix: ":1", label: "Student-Teacher Ratio" },
  { value: SCHOOL_STATS.CURRENT_ENROLLMENT, suffix: "+", label: "Students" },
  {
    value: new Date().getFullYear() - SCHOOL_CONFIG.FOUNDED_YEAR,
    suffix: "",
    label: "Years of Excellence",
  },
];

// ── Welcome Section ────────────────────────────────────────────────────

export const WELCOME_CONTENT = {
  eyebrow: "Welcome to St. Elizabeth's",
  heading: "A Legacy of Excellence in the Heart of Goa",
  body: "For over seven decades, St. Elizabeth's High School has been a beacon of quality education in Pomburpa, Bardez. Rooted in the Catholic tradition and guided by our motto 'Truth and Honesty,' we nurture young minds to become compassionate leaders, critical thinkers, and responsible citizens. With our GBSHSE-affiliated curriculum, dedicated faculty, and a vibrant campus community, every student is known, valued, and inspired to reach their fullest potential.",
  ctaText: "Learn More About Us",
  ctaHref: "/about",
} as const;

export const WELCOME_CAROUSEL_IMAGES = [
  {
    filename: "DSC07317.jpg",
    alt: "Panoramic view of the school campus with green trees and buildings",
  },
  {
    filename: "DSC07335.jpg",
    alt: "Students enjoying outdoor games during the school sports period",
  },
  {
    filename: "DSC07346.jpg",
    alt: "Friends walking together across the school campus during lunch break",
  },
];

// ── Why Section ────────────────────────────────────────────────────────

export const WHY_CONTENT = {
  eyebrow: "Why Choose Us",
  heading: "What Sets St. Elizabeth's Apart",
  sectionAriaLabel: "Why choose St. Elizabeth's High School",
} as const;

/**
 * Homepage-specific 'why points' — typed as {title, description} to match
 * the WhySection component's expected input. Icons are resolved by title
 * in WhySection's internal mapIcon() function.
 */
export const WHY_POINTS = WHY_ST_ELIZABETH_POINTS.map((p) => ({
  title: p.title,
  description: p.description,
}));

// ── Programs Grid ──────────────────────────────────────────────────────

export interface ProgramBox {
  title: string;
  description: string;
  href: string;
  color: string;
}

export const PROGRAM_BOXES: ProgramBox[] = [
  {
    title: "Since 1954",
    description: `Over ${new Date().getFullYear() - SCHOOL_CONFIG.FOUNDED_YEAR} decades shaping generations of leaders from ${SCHOOL_CONFIG.LOCATION.CITY} and beyond.`,
    href: "/about/history",
    color: "var(--p-color-royal-blue)",
  },
  {
    title: "Modern Facilities",
    description: "Science labs, computer lab, library, resource room, and sports infrastructure.",
    href: "/admissions/infrastructure",
    color: "var(--p-color-deep-blue)",
  },
  {
    title: "Safe Community",
    description:
      "Nestled within the Pomburpa village community, our campus is a caring, watchful environment where every adult knows every child by name — a true village raising a child.",
    href: "/contact/location-map",
    color: "var(--p-color-royal-blue-dark)",
  },
  {
    title: "Holistic Growth",
    description:
      "Clubs, sports, cultural activities, and leadership programmes for all-round development.",
    href: "/beyond-academics",
    color: "var(--p-color-gold)",
  },
  {
    title: `${SCHOOL_STATS.STUDENT_TEACHER_RATIO}:1 Ratio`,
    description: "Small class sizes ensure personalised attention for every student.",
    href: "/academics/teaching-methods",
    color: "var(--p-color-deep-blue)",
  },
  {
    title: "GBSHSE Excellence",
    description: "Rigorous curriculum aligned with GBSHSE standards, consistently strong results.",
    href: "/academics/curriculum",
    color: "var(--p-color-royal-blue)",
  },
  {
    title: "Values + Academics",
    description: "Where traditional values meet modern education — preparing students for life.",
    href: "/about/mission",
    color: "var(--p-color-royal-blue-dark)",
  },
];

export const PROGRAMS_CONTENT = {
  eyebrow: "Our Foundation",
  heading: "Programmes at a Glance",
  sectionAriaLabel: "Programmes at a glance",
} as const;

// ── Gallery Section ────────────────────────────────────────────────────

export const GALLERY_CONTENT = {
  eyebrow: "Our Campus",
  heading: "Life at St. Elizabeth's",
  ctaText: "View Full Gallery",
  ctaHref: "/news/photo-gallery",
  sectionAriaLabel: "Photo gallery",
} as const;

export const GALLERY_IMAGES = [
  {
    filename: "DSC07290.jpg",
    alt: "School community gathered for the annual day celebration",
    span: "tall" as const,
  },
  {
    filename: "DSC07292.jpg",
    alt: "Students walking together in the school corridor",
    span: "normal" as const,
  },
  {
    filename: "DSC07294.jpg",
    alt: "Students performing a skit during the annual cultural programme",
    span: "normal" as const,
  },
  {
    filename: "DSC07305.jpg",
    alt: "Action shot of students during a football match",
    span: "normal" as const,
  },
  {
    filename: "DSC07328.jpg",
    alt: "Teacher explaining a concept on the whiteboard",
    span: "tall" as const,
  },
  {
    filename: "DSC07335.jpg",
    alt: "Students enjoying outdoor games during sports period",
    span: "normal" as const,
  },
  {
    filename: "DSC07346.jpg",
    alt: "Friends walking across the school campus during lunch",
    span: "normal" as const,
  },
];

// ── Achievements Section ───────────────────────────────────────────────

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  year?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "GBSHSE Affiliation",
    description:
      "Affiliated with the Goa Board of Secondary and Higher Secondary Education, delivering a nationally aligned curriculum under NEP 2020.",
    icon: "award",
    year: "",
  },
  {
    title: "Seven Decades of Service",
    description: `Since ${SCHOOL_CONFIG.FOUNDED_YEAR}, providing quality education to the communities of Bardez and North Goa.`,
    icon: "clock",
    year: String(SCHOOL_CONFIG.FOUNDED_YEAR),
  },
  {
    title: "Community Impact",
    description:
      "Our alumni serve as doctors, engineers, teachers, and leaders across India and the world.",
    icon: "users",
    year: "",
  },
  {
    title: "Sports Excellence",
    description:
      "Inter-house and inter-school competitions in basketball, football, cricket, and athletics.",
    icon: "trophy",
  },
  {
    title: "Academic Results",
    description:
      "Consistent GBSHSE board examination results including 97.38% pass percentage in SSC 2025-26.",
    icon: "graduation-cap",
  },
  {
    title: "Cultural Recognition",
    description:
      "Regular participation and awards at state-level cultural competitions and events.",
    icon: "music",
  },
];

export const ACHIEVEMENTS_CONTENT = {
  eyebrow: "Our Pride",
  heading: "Achievements & Milestones",
  sectionAriaLabel: "Achievements and milestones",
} as const;

// ── Student Life Section ───────────────────────────────────────────────

// Reuse BEYOND_ACADEMICS_SECTIONS from beyond-academics.ts
export { BEYOND_ACADEMICS_SECTIONS as STUDENT_LIFE_CARDS };

export const STUDENT_LIFE_CONTENT = {
  eyebrow: "Beyond the Classroom",
  heading: "Student Life at St. Elizabeth's",
  ctaText: "Explore All Activities",
  ctaHref: "/beyond-academics",
  sectionAriaLabel: "Student life and activities",
} as const;

// ── Admissions CTA Section ─────────────────────────────────────────────

export interface AdmissionsStep {
  step: string;
  title: string;
  description: string;
  href: string;
}

export const ADMISSIONS_CTA_STEPS: AdmissionsStep[] = [
  {
    step: "01",
    title: "Inquire",
    description:
      "Reach out to our admissions office. We'll answer your questions and guide you through the process.",
    href: "/contact/info",
  },
  {
    step: "02",
    title: "Visit",
    description:
      "Experience our campus firsthand. Meet our faculty, tour the facilities, and feel the St. Elizabeth's spirit.",
    href: "/contact/location-map",
  },
  {
    step: "03",
    title: "Apply",
    description:
      "Complete the simple application form. Our team will support you every step of the way.",
    href: "/admissions/apply",
  },
];

export const ADMISSIONS_CTA_CONTENT = {
  heading: "Begin Your Journey at St. Elizabeth's",
  description:
    "Join a community where every child is known, valued, and inspired to reach their fullest potential.",
  primaryCtaText: "Start Your Application",
  primaryCtaHref: "/admissions/apply",
  sectionAriaLabel: "Admissions call to action",
} as const;

// ── News Section ───────────────────────────────────────────────────────

export const NEWS_HOMEPAGE_CONTENT = {
  eyebrow: "Stay Updated",
  heading: "News & Events",
  ctaText: "View All News",
  ctaHref: "/news",
  sectionAriaLabel: "Latest news and events",
} as const;

// ── Locate Us Section ──────────────────────────────────────────────────

export const LOCATE_CONTENT = {
  eyebrow: "Find Us",
  heading: "Locate Us",
  address: `${SCHOOL_CONFIG.NAME}, Ven. Fr. Hilario Gonsalves Rd, ${CONTACT_CONFIG.ADDRESS.STREET}, ${CONTACT_CONFIG.ADDRESS.CITY}, ${CONTACT_CONFIG.ADDRESS.STATE} ${CONTACT_CONFIG.ADDRESS.POSTAL_CODE}, ${CONTACT_CONFIG.ADDRESS.COUNTRY}`,
  phone: CONTACT_CONFIG.PHONE.MAIN,
  email: CONTACT_CONFIG.EMAIL.GENERAL,
  ctaText: "Get Directions",
  ctaHref: GOOGLE_MAPS_DIRECTIONS_URL,
  sectionAriaLabel: "Locate us and contact information",
} as const;

// ── Section Backgrounds ────────────────────────────────────────────────

export const SECTION_BACKGROUNDS = {
  hero: "dark",
  counter: "primary",
  welcome: "white",
  why: "cream",
  programs: "white",
  holistic: "cream",
  gallery: "white",
  achievements: "cream",
  studentLife: "white",
  testimonials: "primary",
  admissionsCta: "dark",
  news: "cream",
  locate: "dark",
} as const;
