/**
 * Homepage section data for the vertical-scroll rebuild.
 * Builds on existing homepage.ts (HERO_CONTENT, VALUES, STATS, TESTIMONIALS, CTA_CONTENT, LATEST_NEWS).
 */

import { WHY_ST_ELIZABETH_POINTS } from "@/data/admissions";
import { BEYOND_ACADEMICS_SECTIONS } from "@/data/beyond-academics";

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
    tagline: "Est. 1949 · Pomburpa, Goa",
    heading: "Guiding Minds, Nurturing Hearts, Building Futures",
    ctaText: "Discover Our Story",
    ctaHref: "/about/mission",
    imageFilename: "DSC07580.jpg",
    imageAlt: "Students engaged in dynamic outdoor activity on the St. Elizabeth's campus",
  },
  {
    tagline: "CBSE Affiliated",
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
    tagline: "75+ Years of Legacy",
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
  { value: 1949, suffix: "", label: "Year Founded" },
  { value: 1200, suffix: "+", label: "Students" },
  { value: 15, suffix: ":1", label: "Student-Teacher Ratio" },
  { value: 75, suffix: "+", label: "Years of Excellence" },
];

// ── Welcome Section ────────────────────────────────────────────────────

export const WELCOME_CONTENT = {
  eyebrow: "Welcome to St. Elizabeth's",
  heading: "A Legacy of Excellence in the Heart of Goa",
  body: "For over seven decades, St. Elizabeth's High School has been a beacon of quality education in Pomburpa, Bardez. Rooted in the Catholic tradition and guided by our motto 'Truth and Honesty,' we nurture young minds to become compassionate leaders, critical thinkers, and responsible citizens. With our CBSE-affiliated curriculum, dedicated faculty, and a vibrant campus community, every student is known, valued, and inspired to reach their fullest potential.",
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

// Reuse WHY_ST_ELIZABETH_POINTS from admissions.ts (already has icon references via title)
export { WHY_ST_ELIZABETH_POINTS as WHY_POINTS };

// ── Programs Grid ──────────────────────────────────────────────────────

export interface ProgramBox {
  title: string;
  description: string;
  href: string;
  color: string;
}

export const PROGRAM_BOXES: ProgramBox[] = [
  {
    title: "75+ Year Legacy",
    description: "Founded in 1949, shaping generations of leaders from Pomburpa and beyond.",
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
    title: "Safe Campus",
    description: "Secure, gated campus in a serene Goan village setting — a sanctuary for learning.",
    href: "/contact/location-map",
    color: "var(--p-color-royal-blue-dark)",
  },
  {
    title: "Holistic Growth",
    description: "Clubs, sports, cultural activities, and leadership programmes for all-round development.",
    href: "/beyond-academics",
    color: "var(--p-color-gold)",
  },
  {
    title: "15:1 Ratio",
    description: "Small class sizes ensure personalised attention for every student.",
    href: "/academics/teaching-methods",
    color: "var(--p-color-deep-blue)",
  },
  {
    title: "CBSE Excellence",
    description: "Rigorous curriculum aligned with CBSE standards, consistently strong results.",
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
    title: "CBSE Affiliation",
    description: "Permanently affiliated with the Central Board of Secondary Education, delivering a nationally recognised curriculum.",
    icon: "award",
    year: "2005",
  },
  {
    title: "75+ Years of Service",
    description: "Seven decades of educational service to the communities of Bardez and North Goa.",
    icon: "clock",
    year: "1949",
  },
  {
    title: "Community Impact",
    description: "Our alumni serve as doctors, engineers, teachers, and leaders across India and the world.",
    icon: "users",
    year: "",
  },
  {
    title: "Sports Excellence",
    description: "Inter-house and inter-school competitions in basketball, football, cricket, and athletics.",
    icon: "trophy",
  },
  {
    title: "Academic Results",
    description: "Consistent CBSE board examination results with distinction-holders every year.",
    icon: "graduation-cap",
  },
  {
    title: "Cultural Recognition",
    description: "Regular participation and awards at state-level cultural competitions and events.",
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
    description: "Reach out to our admissions office. We'll answer your questions and guide you through the process.",
    href: "/contact/info",
  },
  {
    step: "02",
    title: "Visit",
    description: "Experience our campus firsthand. Meet our faculty, tour the facilities, and feel the St. Elizabeth's spirit.",
    href: "/contact/location-map",
  },
  {
    step: "03",
    title: "Apply",
    description: "Complete the simple application form. Our team will support you every step of the way.",
    href: "/admissions/apply",
  },
];

export const ADMISSIONS_CTA_CONTENT = {
  heading: "Begin Your Journey at St. Elizabeth's",
  description: "Join a community where every child is known, valued, and inspired to reach their fullest potential.",
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
  address: "St. Elizabeth's High School, Ven. Fr. Hilario Gonsalves Rd, Pomburpa, Bardez, Goa 403511, India",
  phone: "+91 832 241 0654",
  email: "info@stelizabeths.edu.in",
  ctaText: "Get Directions",
  ctaHref: "https://maps.google.com/?q=St+Elizabeths+High+School+Pomburpa+Goa",
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
