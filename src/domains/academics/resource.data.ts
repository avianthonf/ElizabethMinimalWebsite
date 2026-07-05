/**
 * Resource Room content for St. Elizabeth's High School.
 */

export const RESOURCE_ROOM_PAGE = {
  metaTitle: "Resource Room",
  metaDescription:
    "The Resource Room at St. Elizabeth's High School — dedicated support for students with diverse learning needs.",
  breadcrumb: { href: "/academics", label: "Academics", currentLabel: "Resource Room" },
  heroEyebrow: "Support",
  heroHeading: "Resource Room",
  heroDescription:
    "A dedicated space where students with diverse learning needs receive individualised support to thrive academically and personally.",
  sectionHeading: "Support Services",
  sectionAriaLabel: "Resource room and learning support",
} as const;

export const RESOURCE_ROOM_SERVICES = [
  {
    title: "Learning Support",
    description:
      "Our special educators work one-on-one and in small groups with students who need additional academic support. Whether it's reading, writing, mathematics, or study skills, we create individualized learning plans that build confidence and competence.",
  },
  {
    title: "Remedial Teaching",
    description:
      "Students who are falling behind in specific subjects receive targeted remedial instruction. Our teachers identify gaps in understanding and use alternative teaching strategies to help students catch up with their peers.",
  },
  {
    title: "Counselling Services",
    description:
      "Beyond academic support, our counsellors provide emotional and social guidance. Students can discuss personal challenges, peer relationships, and academic pressures in a safe, confidential environment.",
  },
  {
    title: "Parent Partnership",
    description:
      "We work closely with parents to ensure consistency between home and school. Regular meetings, progress reports, and collaborative goal-setting keep families informed and engaged in their child's development.",
  },
  {
    title: "Inclusive Education",
    description:
      "St. Elizabeth's is committed to inclusive education. Our resource room supports the integration of students with diverse learning needs into mainstream classrooms while ensuring they receive the specialized attention they require to succeed.",
  },
] as const;
