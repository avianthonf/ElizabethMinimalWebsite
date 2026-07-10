/**
 * Relocation content for families moving to Goa.
 * Targets families relocating from Mumbai, Bangalore, Delhi post-COVID.
 */

export const RELOCATION_PAGE = {
  metaTitle: "Relocating to Goa?",
  metaDescription:
    "Moving to Goa? Discover St. Elizabeth's High School — English-medium, GBSHSE-affiliated, small classes (15:1), Catholic values, and a nurturing community in Pomburpa, Bardez.",
  breadcrumb: {
    href: "/admissions",
    label: "Admissions",
    currentLabel: "Relocating to Goa",
  },
  heroEyebrow: "New to Goa?",
  heroHeading: "Welcome to St. Elizabeth's",
  heroDescription:
    "Finding the right school is one of the most important decisions when relocating. St. Elizabeth's High School has been welcoming families to Pomburpa since 1954 — and we'd love to welcome yours.",
  sectionHeading: "Why Relocating Families Choose Us",
  sectionAriaLabel: "Information for families relocating to Goa",
} as const;

export const WHY_RELOCATING_FAMILIES_CHOOSE_US = [
  {
    title: "English-Medium, Values-Based",
    description:
      "Quality English-medium education rooted in the Catholic tradition and guided by our motto 'Truth and Honesty.' Your child gets the best of both worlds — academic rigour and character formation.",
  },
  {
    title: "Small Classes, Personal Attention",
    description:
      "With an average class size of just 15 students, your child won't get lost in the crowd. Every teacher knows every student by name and understands their individual needs.",
  },
  {
    title: "GBSHSE Curriculum — NEP 2020 Ready",
    description:
      "We follow the Goa State Board curriculum, aligned with the National Education Policy. Locally relevant, nationally recognized — and fully NEP-ready for the 2026-27 academic year.",
  },
  {
    title: "The Goan Village Advantage",
    description:
      "Located in the serene village of Pomburpa, our campus offers a safe, natural environment — yet we're just 15 minutes from Mapusa and 30 minutes from Panjim.",
  },
  {
    title: "Seamless Academic Transition",
    description:
      "We have experience welcoming students from CBSE, ICSE, and international curricula. Our team ensures your child transitions smoothly into the GBSHSE system with personalized support.",
  },
  {
    title: "Community, Not Just a School",
    description:
      "From parent-teacher meetings to village festivals, our school is woven into the fabric of Pomburpa. You're not just enrolling in a school — you're joining a community.",
  },
] as const;

export const RELOCATION_FAQ = [
  {
    question: "My child is coming from a CBSE/ICSE school. Will they adjust to GBSHSE?",
    answer:
      "Yes. GBSHSE is well-aligned with national curricula, and our teachers provide personalized support during the transition. We also conduct baseline assessments to identify any gaps and address them early.",
  },
  {
    question: "What is the medium of instruction?",
    answer:
      "English is the primary medium of instruction across all subjects. Konkani and Hindi are offered as additional languages.",
  },
  {
    question: "Is school transport available from Panjim and surrounding areas?",
    answer:
      "Yes, we operate school buses covering North Goa routes including Panjim, Mapusa, Calangute, and nearby villages. Contact our office for route details.",
  },
  {
    question: "When can we visit the campus?",
    answer:
      "We welcome campus visits by appointment on weekdays. Please contact us at least 48 hours in advance, and we will arrange a tour and a meeting with our admissions team.",
  },
  {
    question: "Our relocation timeline is tight. Can admissions be fast-tracked?",
    answer:
      "We understand the urgency of relocation. While we have a structured admissions process, we can expedite steps for families with confirmed relocation dates. Contact our Headmistress's office directly.",
  },
] as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface RelocationData {
  RELOCATION_PAGE: typeof RELOCATION_PAGE;
  WHY_RELOCATING_FAMILIES_CHOOSE_US: typeof WHY_RELOCATING_FAMILIES_CHOOSE_US;
  RELOCATION_FAQ: typeof RELOCATION_FAQ;
}

export async function getRelocationData(): Promise<RelocationData> {
  return { RELOCATION_PAGE, WHY_RELOCATING_FAMILIES_CHOOSE_US, RELOCATION_FAQ };
}
