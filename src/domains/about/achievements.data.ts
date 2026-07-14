/**
 * Achievements & Milestones content for St. Elizabeth's High School.
 */

export const ACHIEVEMENTS_PAGE = {
  metaTitle: "Achievements & Milestones",
  metaDescription:
    "Awards, achievements, and significant milestones of St. Elizabeth's High School, Pomburpa, Goa — over seven decades of educational excellence.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Achievements & Milestones" },
  heroEyebrow: "Our Legacy",
  heroHeading: "Achievements & Milestones",
  heroDescription:
    "For over seven decades, St. Elizabeth's High School has celebrated milestones of academic excellence, holistic development, and meaningful contributions to the community.",
  sectionAriaLabel: "Achievements and milestones",
} as const;

export const SSC_RESULT_BANNER = {
  enabled: true,
  heading: "SSC Results 2025-26",
  subtitle: "97.38% Pass Percentage",
  description:
    "Our students have achieved outstanding results in the Goa Board SSC examinations, continuing our tradition of academic excellence.",
} as const;

export const ACHIEVEMENTS = [
  {
    title: "GBSHSE Affiliation",
    description:
      "Affiliated with the Goa Board of Secondary and Higher Secondary Education (GBSHSE), aligned with the National Education Policy (NEP) 2020. The state board's overall SSC pass percentage reached 95.3% in 2025, and St. Elizabeth's students consistently perform above state averages.",
    icon: "school",
    category: "academic",
  },
  {
    title: "Sports Excellence",
    description:
      "Achievements at inter-school, district, state, and national levels across multiple sports disciplines.",
    icon: "trophy",
    category: "sports",
  },
  {
    title: "Cultural Achievements",
    description:
      "Music, dance, drama, art, literary events, and competitions showcasing the creative talents of our students.",
    icon: "music",
    category: "cultural",
  },
  {
    title: "Co-curricular Excellence",
    description:
      "Science exhibitions, quizzes, debates, and environmental initiatives that foster critical thinking and innovation.",
    icon: "graduation-cap",
    category: "co-curricular",
  },
] as const;
