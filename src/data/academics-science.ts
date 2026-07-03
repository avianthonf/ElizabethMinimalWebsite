/**
 * Science Laboratory content for St. Elizabeth's High School.
 */

export const SCIENCE_LAB_PAGE = {
  metaTitle: "Science Laboratory",
  metaDescription:
    "The science laboratory at St. Elizabeth's High School — Physics, Chemistry, and Biology labs for hands-on experimental learning.",
  breadcrumb: { href: "/academics", label: "Academics", currentLabel: "Science Laboratory" },
  heroEyebrow: "Experiment",
  heroHeading: "Science Laboratory",
  heroDescription:
    "Where curiosity meets discovery — our fully equipped Physics, Chemistry, and Biology laboratories bring scientific concepts to life.",
  sectionHeading: "Our Laboratories",
  sectionAriaLabel: "Science laboratory facilities",
} as const;

export const SCIENCE_LAB_FACILITIES = [
  {
    title: "Physics Laboratory",
    description:
      "Equipped with apparatus for mechanics, optics, electricity, magnetism, and electronics experiments. Students verify theoretical principles through hands-on measurement and observation, developing experimental skills essential for higher studies in science and engineering.",
  },
  {
    title: "Chemistry Laboratory",
    description:
      "A well-ventilated lab with individual workstations, reagent storage, fume hood, and safety equipment. Students learn qualitative and quantitative analysis, titration techniques, and the synthesis and characterization of chemical compounds.",
  },
  {
    title: "Biology Laboratory",
    description:
      "Featuring compound and dissecting microscopes, specimen collection, anatomical models, and botanical specimens. Students study cell structure, plant and animal anatomy, and ecological systems through direct observation.",
  },
  {
    title: "Safety & Standards",
    description:
      "All three laboratories comply with CBSE safety standards. Each lab is equipped with fire extinguishers, first-aid kits, eye-wash stations, and chemical spill management. Students receive thorough safety training before beginning practical work.",
  },
] as const;
