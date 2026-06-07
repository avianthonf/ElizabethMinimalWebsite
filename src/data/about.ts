/**
 * About page content for St. Elizabeth's High School.
 */

export const MISSION_STATEMENT = {
  heading: "Our Mission",
  body: "St. Elizabeth's High School is a nurturing Catholic school community dedicated to academic excellence, character formation, and service to others. Guided by our motto 'Truth and Honesty,' we inspire students to become compassionate leaders who make a positive difference in the world.",
  values: [
    {
      title: "Truth and Honesty",
      description: "We cultivate integrity in every aspect of school life, encouraging students to be truthful in word and honest in deed.",
    },
    {
      title: "Academic Excellence",
      description: "We challenge every student to achieve their personal best through a rigorous CBSE curriculum and dedicated faculty.",
    },
    {
      title: "Faith in Action",
      description: "We nurture spiritual growth through prayer, service, and reflection, rooted in the Catholic tradition.",
    },
    {
      title: "Community & Service",
      description: "We believe in giving back — to our school, our local community in Bardez, and the world beyond.",
    },
  ],
} as const;

export const HISTORY_TIMELINE = [
  {
    year: "1949",
    event: "St. Elizabeth's High School founded in Pomburpa, Bardez, Goa, with a mission to provide quality Catholic education to the local community.",
  },
  {
    year: "1960s",
    event: "Expansion of campus facilities to accommodate growing student enrollment from across North Goa.",
  },
  {
    year: "1980s",
    event: "Introduction of science laboratories, library, and sports facilities to support holistic education.",
  },
  {
    year: "2000s",
    event: "Affiliation with CBSE, adoption of modern teaching methodologies, and integration of technology in classrooms.",
  },
  {
    year: "Today",
    event: "A thriving community of 1200+ students and dedicated faculty, continuing the legacy of 'Guiding Minds, Nurturing Hearts, Building Futures.'",
  },
] as const;

export const STAFF_MEMBERS = [
  {
    name: "", // TODO: Add actual name
    role: "Principal",
    department: "Head of School",
    description: "Leading St. Elizabeth with vision, dedication, and a deep commitment to the school's mission of Truth and Honesty.",
  },
  {
    name: "", // TODO: Add actual name
    role: "Vice Principal",
    department: "Academic Affairs",
    description: "Overseeing curriculum development, teacher mentorship, and academic standards across all grade levels.",
  },
  {
    name: "", // TODO: Add actual name
    role: "Board Chair",
    department: "Governance",
    description: "A dedicated group of community leaders ensuring the school's long-term sustainability and adherence to its founding values.",
  },
] as const;

export const STRATEGIC_PLAN_POINTS = [
  {
    title: "Academic Innovation",
    description:
      "Integrating 21st-century skills and technology across the CBSE curriculum while maintaining our commitment to foundational knowledge.",
  },
  {
    title: "Campus Development",
    description:
      "Enhancing facilities including new science labs, a performing arts centre, and upgraded sports infrastructure.",
  },
  {
    title: "Community Engagement",
    description:
      "Strengthening partnerships with families, alumni, and the broader Bardez community to enrich the student experience.",
  },
  {
    title: "Sustainability",
    description:
      "Promoting environmental stewardship through green campus initiatives, waste reduction programs, and eco-education.",
  },
] as const;

export const MISSION_PAGE = {
  metaTitle: "Mission & Values",
  metaDescription:
    "Discover the mission and values that guide St. Elizabeth's High School — Truth, Honesty, academic excellence, and faith in action.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Mission & Values" },
  heroEyebrow: "Our Purpose",
  heroHeading: "Mission & Values",
  heroDescription:
    "A nurturing Catholic school community dedicated to academic excellence, character formation, and service to others.",
  sectionAriaLabel: "Mission and values",
} as const;

export const STRATEGIC_PLAN_PAGE = {
  metaTitle: "Strategic Plan",
  metaDescription:
    "Explore the strategic plan for St. Elizabeth's High School — academic innovation, campus development, community engagement, and sustainability.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Strategic Plan" },
  heroEyebrow: "Our Future",
  heroHeading: "Strategic Plan",
  heroDescription:
    "Charting the course for St. Elizabeth's High School's next chapter — building on our legacy while embracing the opportunities ahead.",
  sectionHeading: "Priorities for the Future",
  sectionAriaLabel: "Strategic plan",
} as const;

export const STAFF_PAGE = {
  metaTitle: "Staff & Leadership",
  metaDescription:
    "Meet the leadership team at St. Elizabeth's High School — dedicated educators and administrators committed to Truth and Honesty.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Staff & Leadership" },
  heroEyebrow: "Our Leaders",
  heroHeading: "Staff & Leadership",
  heroDescription:
    "The dedicated educators and administrators who bring the mission of St. Elizabeth's High School to life every day.",
  sectionHeading: "Leadership Team",
  sectionAriaLabel: "Staff and leadership",
} as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface AboutData {
  MISSION_STATEMENT: typeof MISSION_STATEMENT;
  HISTORY_TIMELINE: typeof HISTORY_TIMELINE;
  STAFF_MEMBERS: typeof STAFF_MEMBERS;
  STRATEGIC_PLAN_POINTS: typeof STRATEGIC_PLAN_POINTS;
  MISSION_PAGE: typeof MISSION_PAGE;
  STRATEGIC_PLAN_PAGE: typeof STRATEGIC_PLAN_PAGE;
  STAFF_PAGE: typeof STAFF_PAGE;
}

/**
 * Fetches about page data.
 *
 * Currently returns static content. When a CMS is integrated, replace
 * only the implementation body — no component changes needed.
 */
export async function getAboutData(): Promise<AboutData> {
  return { MISSION_STATEMENT, HISTORY_TIMELINE, STAFF_MEMBERS, STRATEGIC_PLAN_POINTS, MISSION_PAGE, STRATEGIC_PLAN_PAGE, STAFF_PAGE };
}
