/**
 * Academics content for St. Elizabeth's High School.
 */

import { SCHOOL_BOARD_SHORT } from "@/shared/lib/brand";

export interface Department {
  name: string;
  description: string;
  icon: string;
  href: string;
}

export const DEPARTMENTS: Department[] = [
  {
    name: "Science",
    description:
      "Hands-on laboratory learning in Physics, Chemistry, and Biology, fostering scientific inquiry and experimental skills.",
    icon: "science",
    href: "/academics/curriculum",
  },
  {
    name: "Mathematics",
    description:
      "Building logical reasoning and problem-solving skills from foundational arithmetic through advanced calculus.",
    icon: "math",
    href: "/academics/curriculum",
  },
  {
    name: "English",
    description:
      "Developing critical reading, writing, and communication skills through literature, language study, and creative expression.",
    icon: "english",
    href: "/academics/curriculum",
  },
  {
    name: "Social Studies",
    description:
      "Exploring history, geography, civics, and economics to understand our world and our role as informed citizens.",
    icon: "social-studies",
    href: "/academics/curriculum",
  },
  {
    name: "Teaching Methods",
    description:
      "Student-centred, activity-based learning with differentiated instruction in small classes of approximately 15 students.",
    icon: "teaching",
    href: "/academics/teaching-methods",
  },
  {
    name: "Library",
    description:
      "A well-stocked library with over 6,000 resources and digital resource centre supporting research, reading, and lifelong learning habits.",
    icon: "library",
    href: "/academics/library",
  },
  {
    name: "Resource Room",
    description:
      "Dedicated learning support for students with diverse needs — individualised instruction, remedial teaching, and counselling.",
    icon: "support",
    href: "/academics/resource-room",
  },
  {
    name: "Science Laboratory",
    description:
      "Fully equipped Physics, Chemistry, and Biology labs for hands-on experimental learning and scientific inquiry.",
    icon: "science",
    href: "/academics/science-laboratory",
  },
  {
    name: "Computer Laboratory",
    description:
      "Modern computing facility with workstations, coding programmes, digital literacy, and internet safety education.",
    icon: "computer",
    href: "/academics/computer-laboratory",
  },
];

export interface CurriculumHighlight {
  title: string;
  description: string;
  icon: string;
}

export const CURRICULUM_HIGHLIGHTS: CurriculumHighlight[] = [
  {
    title: "Academic Excellence",
    description: `A strong foundation in languages, mathematics, science, social sciences, and other core subjects aligned with ${SCHOOL_BOARD_SHORT} standards.`,
    icon: "academic",
  },
  {
    title: "Digital Learning",
    description:
      "Technology-integrated learning through ICT, digital resources, and innovative classroom practices.",
    icon: "computer",
  },
  {
    title: "Experiential Learning",
    description:
      "Hands-on activities, projects, and real-world experiences that make learning meaningful and engaging.",
    icon: "science",
  },
  {
    title: "Vocational Education",
    description:
      "Practical skill development and career awareness through NEP-aligned vocational learning opportunities.",
    icon: "teaching",
  },
  {
    title: "Holistic Development",
    description:
      "A balanced education enriched by sports, arts, clubs, environmental initiatives, and community service.",
    icon: "arts",
  },
  {
    title: "Values & Leadership",
    description:
      "Character formation through faith, discipline, leadership, collaboration, and responsible citizenship.",
    icon: "community",
  },
];

export const CURRICULUM_INTRO = {
  heading: "Curriculum",
  body: `At St. Elizabeth's High School, we follow the curriculum prescribed by the Goa Board of Secondary and Higher Secondary Education (${SCHOOL_BOARD_SHORT}). Aligned with the vision of the National Education Policy (NEP) 2020, our curriculum promotes academic excellence, experiential learning, critical thinking, creativity, and holistic development, preparing students to become confident, responsible, and lifelong learners.`,
} as const;

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
    title: "Extensive Collection",
    description:
      "A wide range of fiction, non-fiction, reference books, encyclopedias, and periodicals — over 6,000 resources available to students.",
  },
  {
    title: "Reading Culture",
    description:
      "We foster a love of reading through structured reading programmes, book clubs, author visits, and annual reading challenges that engage students of all ages, encouraging regular reading habits and a lifelong love for books.",
  },
  {
    title: "Learning & Research",
    description:
      "Supports classroom learning through reference materials and subject-specific resources. Our digital resource centre provides access to online databases, e-books, and educational software.",
  },
  {
    title: "Welcoming Environment",
    description:
      "A quiet and comfortable space for reading, learning, and exploration. The library offers quiet study areas, collaborative work zones, and computer workstations.",
  },
  {
    title: "Knowledge Beyond the Classroom",
    description:
      "Empowers students to think critically, explore new ideas, and become independent learners — supporting curiosity and discovery beyond the curriculum.",
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
    description: `We provide resources and guidance for ${SCHOOL_BOARD_SHORT} board exams, JEE, NEET, and other competitive entrance examinations required by Indian universities.`,
  },
  {
    title: "Career Exploration",
    description:
      "Through career days, alumni talks, and internships, students explore diverse professional paths and discover where their passions and talents intersect.",
  },
];

export const CURRICULUM_PAGE = {
  metaTitle: "Curriculum",
  metaDescription: `Explore the ${SCHOOL_BOARD_SHORT} curriculum at St. Elizabeth's High School — aligned with NEP 2020, promoting academic excellence and holistic development.`,
  heroEyebrow: "Our Curriculum",
  heroHeading: "Curriculum",
  heroDescription: `At St. Elizabeth's High School, we follow the curriculum prescribed by the ${SCHOOL_BOARD_SHORT}, aligned with the vision of NEP 2020.`,
  sectionHeading: "Our Curriculum",
  sectionAriaLabel: "Curriculum overview",
  breadcrumb: { href: "/academics", label: "Academics", currentLabel: "Curriculum" },
} as const;

// ── NEP 2020 Readiness ───────────────────────────────────────────────

export const NEP_READINESS = {
  heading: "NEP 2020 Readiness",
  body: "Goa will implement the National Education Policy (NEP) 2020 for all classes from the academic year 2026-27. St. Elizabeth's High School is fully prepared, with NEP-aligned curriculum, vocational education opportunities, competency-based assessment, and holistic development programmes already in place.",
  timeline: [
    {
      year: "2025-26",
      milestone: "NEP implemented in Nursery, Class III, Class VI, and Classes IX-X across Goa.",
    },
    {
      year: "2026-27",
      milestone: "Full NEP rollout — all classes covered with credit-based assessment system.",
    },
  ],
  highlights: [
    "Credit-based assessment (30 notional learning hours per credit)",
    "Common syllabus for art & craft, sports, yoga",
    "Vocational education from middle school onwards",
    "Competency-based learning replacing rote memorization",
    "Free NEP-aligned textbooks from SCERT for all students",
  ],
} as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface AcademicsData {
  DEPARTMENTS: typeof DEPARTMENTS;
  CURRICULUM_HIGHLIGHTS: typeof CURRICULUM_HIGHLIGHTS;
  CURRICULUM_INTRO: typeof CURRICULUM_INTRO;
  LANGUAGE_PROGRAMS: typeof LANGUAGE_PROGRAMS;
  LIBRARY_RESOURCES: typeof LIBRARY_RESOURCES;
  COLLEGE_COUNSELING_STEPS: typeof COLLEGE_COUNSELING_STEPS;
  CURRICULUM_PAGE: typeof CURRICULUM_PAGE;
  NEP_READINESS: typeof NEP_READINESS;
}

/**
 * Academics page data - exported directly for synchronous access.
 *
 * All data is static. When a CMS is integrated, add async fetching
 * functions without changing existing component imports.
 */
export const ACADEMICS_DATA: AcademicsData = {
  DEPARTMENTS,
  CURRICULUM_HIGHLIGHTS,
  CURRICULUM_INTRO,
  LANGUAGE_PROGRAMS,
  LIBRARY_RESOURCES,
  COLLEGE_COUNSELING_STEPS,
  CURRICULUM_PAGE,
  NEP_READINESS,
};
