/**
 * Computer Laboratory content for St. Elizabeth's High School.
 */

export const COMPUTER_LAB_PAGE = {
  metaTitle: "Computer Laboratory",
  metaDescription:
    "The computer laboratory at St. Elizabeth's High School — digital literacy, programming, and technology education.",
  breadcrumb: { href: "/academics", label: "Academics", currentLabel: "Computer Laboratory" },
  heroEyebrow: "Digital Literacy",
  heroHeading: "Computer Laboratory",
  heroDescription:
    "Preparing students for a digital future with hands-on computing education, programming fundamentals, and responsible technology use.",
  sectionHeading: "Facilities & Programmes",
  sectionAriaLabel: "Computer laboratory and digital literacy",
} as const;

export const COMPUTER_LAB_FACILITIES = [
  {
    title: "Computer Lab",
    description:
      "A modern facility with 30 networked workstations, broadband internet access, interactive smart board, and printing capabilities. Each student has dedicated terminal access during lab sessions with a 1:1 student-to-computer ratio.",
  },
  {
    title: "Digital Literacy Curriculum",
    description:
      "Starting from foundational computing skills — keyboarding, file management, and productivity software — our curriculum progresses to programming fundamentals, web design, and multimedia creation in senior grades.",
  },
  {
    title: "Programming & Coding",
    description:
      "Students are introduced to computational thinking through visual programming environments before progressing to Python and web technologies. Our coding programme emphasizes problem-solving, logical reasoning, and creativity.",
  },
  {
    title: "Internet Safety & Digital Citizenship",
    description:
      "We take digital citizenship seriously. Students learn about online safety, privacy, responsible social media use, cyberbullying prevention, and the ethical use of information — preparing them to navigate the digital world with wisdom and integrity.",
  },
] as const;
