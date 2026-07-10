/**
 * Vocational & Skill Education content for St. Elizabeth's High School.
 */

export const VOCATIONAL_PAGE = {
  metaTitle: "Vocational & Skill Education",
  metaDescription:
    "Discover vocational education at St. Elizabeth's High School, Pomburpa. NEP 2020-aligned skill development programmes including digital literacy, agriculture, crafts, and career awareness.",
  breadcrumb: {
    href: "/academics",
    label: "Academics",
    currentLabel: "Vocational Education",
  },
  heroEyebrow: "Skill Development",
  heroHeading: "Vocational & Skill Education",
  heroDescription:
    "Aligned with the National Education Policy (NEP) 2020, our vocational education programme introduces students to practical skills, career awareness, and hands-on learning from middle school onwards.",
  sectionHeading: "Our Skill Development Areas",
  sectionAriaLabel: "Vocational education programmes",
} as const;

export const VOCATIONAL_AREAS = [
  {
    title: "Digital Literacy & ICT",
    description:
      "Students develop practical computer skills including document creation, internet research, basic coding, and digital presentation — essential skills for every career path.",
    icon: "computer",
  },
  {
    title: "Agriculture & Gardening",
    description:
      "Taking advantage of our Pomburpa village setting, students participate in school gardening, learning about local agriculture, sustainability, and food systems.",
    icon: "leaf",
  },
  {
    title: "Handicrafts & Creative Arts",
    description:
      "Practical sessions in craft-making, upcycling, and traditional Goan handicrafts connect students with cultural heritage while building fine motor skills and creativity.",
    icon: "art",
  },
  {
    title: "Career Awareness & Guidance",
    description:
      "From Class 8 onwards, students explore career options through guest speakers, industry visits, and structured career awareness modules aligned with NEP guidelines.",
    icon: "compass",
  },
  {
    title: "Life Skills & Financial Literacy",
    description:
      "Practical training in communication, teamwork, basic financial concepts, and everyday problem-solving prepares students for real-world challenges.",
    icon: "life-skills",
  },
  {
    title: "Health & Wellness",
    description:
      "Students learn about nutrition, personal hygiene, mental health awareness, and first aid — building a foundation for lifelong well-being.",
    icon: "health",
  },
] as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface VocationalData {
  VOCATIONAL_PAGE: typeof VOCATIONAL_PAGE;
  VOCATIONAL_AREAS: typeof VOCATIONAL_AREAS;
}

export async function getVocationalData(): Promise<VocationalData> {
  return { VOCATIONAL_PAGE, VOCATIONAL_AREAS };
}
