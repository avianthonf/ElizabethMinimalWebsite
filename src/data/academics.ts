/**
 * Academics content for St. Elizabeth's High School.
 */

export interface Department {
  name: string;
  description: string;
  icon: string;
  href: string;
}

export const DEPARTMENTS: Department[] = [
  {
    name: "Science",
    description: "Hands-on laboratory learning in Physics, Chemistry, and Biology, fostering scientific inquiry and experimental skills.",
    icon: "science",
    href: "/academics/departments",
  },
  {
    name: "Mathematics",
    description: "Building logical reasoning and problem-solving skills from foundational arithmetic through advanced calculus.",
    icon: "math",
    href: "/academics/departments",
  },
  {
    name: "English",
    description: "Developing critical reading, writing, and communication skills through literature, language study, and creative expression.",
    icon: "english",
    href: "/academics/departments",
  },
  {
    name: "Social Studies",
    description: "Exploring history, geography, civics, and economics to understand our world and our role as informed citizens.",
    icon: "social-studies",
    href: "/academics/departments",
  },
  {
    name: "World Languages",
    description: "Expanding horizons through language learning including Hindi, Konkani, and Sanskrit, connecting students to India's rich linguistic heritage.",
    icon: "languages",
    href: "/academics/languages",
  },
  {
    name: "Libraries",
    description: "A well-stocked library and digital resource centre supporting research, reading, and lifelong learning habits.",
    icon: "library",
    href: "/academics/libraries",
  },
  {
    name: "College Counseling",
    description: "Guiding students and families through university selection, application preparation, and career exploration.",
    icon: "counseling",
    href: "/academics/college-counseling",
  },
];

export interface LanguageProgram {
  name: string;
  description: string;
}

export const LANGUAGE_PROGRAMS: LanguageProgram[] = [
  {
    name: "Hindi",
    description:
      "As India's official language, Hindi is a core part of our curriculum. Students develop reading, writing, and conversational fluency through immersive instruction.",
  },
  {
    name: "Konkani",
    description:
      "Honouring Goa's mother tongue, our Konkani programme preserves and promotes the linguistic heritage of our region through literature, poetry, and oral tradition.",
  },
  {
    name: "Sanskrit",
    description:
      "The ancient language of India's classical texts. Students explore Sanskrit grammar, literature, and the philosophical traditions that shaped Indian civilisation.",
  },
  {
    name: "English",
    description:
      "As the medium of instruction, English is woven throughout the curriculum. Our dedicated English department ensures students achieve advanced proficiency in reading, writing, and literary analysis.",
  },
];

export interface LibraryResource {
  title: string;
  description: string;
}

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    title: "Physical Collection",
    description:
      "Our library houses thousands of books spanning fiction, non-fiction, reference materials, and periodicals. Students have access to age-appropriate reading materials across all subject areas.",
  },
  {
    title: "Digital Resources",
    description:
      "Our digital resource centre provides access to online databases, e-books, academic journals, and educational software that support research and self-directed learning.",
  },
  {
    title: "Reading Programmes",
    description:
      "We foster a love of reading through structured reading programmes, book clubs, author visits, and annual reading challenges that engage students of all ages.",
  },
  {
    title: "Study Spaces",
    description:
      "The library offers quiet study areas, collaborative work zones, and computer workstations where students can focus, research, and create in a supportive environment.",
  },
];

export interface CollegeCounselingStep {
  title: string;
  description: string;
}

export const COLLEGE_COUNSELING_STEPS: CollegeCounselingStep[] = [
  {
    title: "University Guidance",
    description:
      "Our counsellors help students identify universities that match their academic interests, career goals, and personal preferences — in India and abroad.",
  },
  {
    title: "Application Support",
    description:
      "From personal statements to recommendation letters, we guide students through every component of the university application process with individualised support.",
  },
  {
    title: "Entrance Exam Preparation",
    description:
      "We provide resources and guidance for CBSE board exams, JEE, NEET, and other competitive entrance examinations required by Indian universities.",
  },
  {
    title: "Career Exploration",
    description:
      "Through career days, alumni talks, and internships, students explore diverse professional paths and discover where their passions and talents intersect.",
  },
];

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface AcademicsData {
  DEPARTMENTS: typeof DEPARTMENTS;
  LANGUAGE_PROGRAMS: typeof LANGUAGE_PROGRAMS;
  LIBRARY_RESOURCES: typeof LIBRARY_RESOURCES;
  COLLEGE_COUNSELING_STEPS: typeof COLLEGE_COUNSELING_STEPS;
}

/**
 * Fetches academics page data.
 *
 * Currently returns static content. When a CMS is integrated, replace
 * only the implementation body — no component changes needed.
 */
export async function getAcademicsData(): Promise<AcademicsData> {
  return { DEPARTMENTS, LANGUAGE_PROGRAMS, LIBRARY_RESOURCES, COLLEGE_COUNSELING_STEPS };
}
