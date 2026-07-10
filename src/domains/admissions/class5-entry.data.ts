/**
 * Class 5 Entry page content for St. Elizabeth's High School.
 *
 * Class 5 is the school's primary entry point — students transition
 * from primary schools across North Goa into secondary education.
 * This page targets parents choosing where to send their child after Class 4.
 */

export const CLASS5_ENTRY_PAGE = {
  metaTitle: "Class 5 Admissions — St. Elizabeth's High School, Pomburpa",
  metaDescription:
    "Join St. Elizabeth's High School, Pomburpa at Class 5. Smooth transition from primary school, personalized orientation, and a nurturing environment for your child's most formative years.",
  breadcrumb: {
    href: "/admissions",
    label: "Admissions",
    currentLabel: "Class 5 Entry",
  },
  heroEyebrow: "Starting Strong",
  heroHeading: "Join Us at Class 5",
  heroDescription:
    "Class 5 marks the beginning of an exciting new chapter. At St. Elizabeth's, we make the transition from primary school seamless, welcoming, and full of discovery.",
  sectionHeading: "Why Class 5 at St. Elizabeth's?",
  sectionAriaLabel: "Class 5 entry information",
} as const;

export const CLASS5_BENEFITS = [
  {
    title: "A Fresh Start, A Strong Foundation",
    description:
      "All our Class 5 students come from different primary schools — so everyone starts together. Our orientation programme ensures every child feels welcomed, comfortable, and ready to learn from Day 1.",
  },
  {
    title: "Small Class, Big Attention",
    description:
      "With just 15 students per class on average, your child transitions from primary school with the individual attention they need to build confidence and excel in new subjects like science, mathematics, and additional languages.",
  },
  {
    title: "Buddy System",
    description:
      "Every new Class 5 student is paired with a senior buddy who helps them navigate the school — finding classrooms, understanding routines, and making friends. By the end of the first week, your child will feel at home.",
  },
  {
    title: "Parent Partnership",
    description:
      "We hold a special parent orientation for Class 5 families to align expectations, answer questions, and build the parent-teacher partnership from the very beginning of your child's journey with us.",
  },
] as const;

export const CLASS5_FEEDER_SCHOOLS = {
  heading: "From Primary to St. Elizabeth's",
  body: "We welcome students from primary schools across North Goa. Many of our Class 5 entrants come from local primary schools in Pomburpa, Olaulim, and surrounding Bardez villages. Regardless of where your child completed primary education — whether at a village primary school in Goa or a school in another state — our team ensures a smooth and supportive transition into the GBSHSE secondary curriculum.",
} as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface Class5EntryData {
  CLASS5_ENTRY_PAGE: typeof CLASS5_ENTRY_PAGE;
  CLASS5_BENEFITS: typeof CLASS5_BENEFITS;
  CLASS5_FEEDER_SCHOOLS: typeof CLASS5_FEEDER_SCHOOLS;
}

export async function getClass5EntryData(): Promise<Class5EntryData> {
  return { CLASS5_ENTRY_PAGE, CLASS5_BENEFITS, CLASS5_FEEDER_SCHOOLS };
}
