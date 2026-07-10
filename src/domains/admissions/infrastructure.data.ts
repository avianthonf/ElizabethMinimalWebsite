/**
 * Infrastructure content for St. Elizabeth's High School.
 */

export const INFRASTRUCTURE_PAGE = {
  metaTitle: "Campus Infrastructure",
  metaDescription:
    "Explore the campus infrastructure of St. Elizabeth's High School, Pomburpa, Goa — classrooms, labs, library, sports facilities, and amenities.",
  breadcrumb: { href: "/admissions", label: "Admissions", currentLabel: "Infrastructure" },
  heroEyebrow: "Our Campus",
  heroHeading: "Infrastructure & Facilities",
  heroDescription:
    "A well-equipped campus designed to support every aspect of a student's growth — academic, physical, creative, and spiritual.",
  sectionAriaLabel: "Campus infrastructure and facilities",
} as const;

export const INFRASTRUCTURE_FACILITIES = [
  {
    title: "Campus Setting",
    description:
      "Our school is nestled within the village of Pomburpa, creating an authentic community atmosphere where students learn within — not apart from — the world they will inherit. The campus is walking distance from many homes, fostering independence and community connection.",
  },
  {
    title: "Academic Block",
    description:
      "Spacious, well-ventilated classrooms with natural light and smart boards. Our academic building houses classrooms for all grades, faculty rooms, and administrative offices in a central location on campus.",
  },
  {
    title: "Science Laboratories",
    description:
      "Fully equipped Physics, Chemistry, and Biology laboratories that meet GBSHSE standards. Each lab accommodates 30 students with individual workstations and modern apparatus.",
  },
  {
    title: "Computer Laboratory",
    description:
      "A state-of-the-art computer lab with 30 workstations, broadband internet, and an interactive smart board. Students receive dedicated lab sessions as part of their digital literacy curriculum.",
  },
  {
    title: "Library",
    description:
      "A well-stocked library with thousands of volumes spanning fiction, non-fiction, reference materials, and periodicals. Dedicated reading areas and digital resource stations support research and independent study.",
  },
  {
    title: "Sports Facilities",
    description:
      "Our campus features a full-size football field, outdoor basketball and volleyball courts, cricket practice nets, a 400m athletics track, and space for tennis. Our sports infrastructure supports seven competitive sports and daily physical education.",
  },
  {
    title: "Playground & Recreation",
    description:
      "Age-appropriate play areas for younger students, with swings, climbing frames, and open space for supervised play. Shaded seating areas allow students to socialize and relax during breaks.",
  },
  {
    title: "School Chapel",
    description:
      "A peaceful chapel at the heart of our campus where students and staff gather for prayer, reflection, and liturgical celebrations. The chapel is central to our Catholic identity and community life.",
  },
  {
    title: "Transportation",
    description:
      "Our fleet of school buses covers major routes across North Goa, including Panjim, Mapusa, Calangute, and surrounding areas. All buses are equipped with GPS tracking and have trained attendants for student safety.",
  },
] as const;
