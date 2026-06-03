/**
 * Academics content for St. Elizabeth High School.
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
