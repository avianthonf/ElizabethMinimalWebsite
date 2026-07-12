/**
 * Infrastructure content for St. Elizabeth's High School.
 */

export const INFRASTRUCTURE_PAGE = {
  metaTitle: "Campus Infrastructure",
  metaDescription:
    "Explore the modern campus infrastructure of St. Elizabeth's High School, Pomburpa, Goa — smart classrooms, specialized labs, sports facilities, and a safe, technology-enabled learning environment.",
  breadcrumb: { href: "/admissions", label: "Admissions", currentLabel: "Infrastructure" },
  heroEyebrow: "Our Campus",
  heroHeading: "Infrastructure & Facilities",
  heroDescription:
    "At St. Elizabeth's High School, our campus is thoughtfully designed to provide a safe, modern, and engaging environment that supports learning, creativity, and holistic development.",
  sectionAriaLabel: "Campus infrastructure and facilities",
} as const;

export const LEARNING_SPACES = [
  {
    icon: "💻",
    title: "Smart Classrooms",
    description:
      "Smart TVs, internet connectivity, and technology-enabled teaching make learning interactive and engaging in every classroom.",
  },
  {
    icon: "🔬",
    title: "Specialized Learning Areas",
    description:
      "Computer Laboratory, Science Laboratory, Academic Resource Room, Library, and AV Room provide dedicated spaces for hands-on learning and exploration.",
  },
] as const;

export const SPORTS_ACTIVITIES = [
  {
    icon: "⚽",
    title: "Playground & Assembly Ground",
    description:
      "Spacious outdoor areas for sports, assemblies, and school events where students develop physical fitness and teamwork.",
  },
  {
    icon: "🎭",
    title: "Multipurpose Hall",
    description:
      "A versatile venue for cultural programmes, competitions, workshops, and celebrations that brings our community together.",
  },
  {
    icon: "🏓",
    title: "Indoor Sports Room",
    description:
      "Facilities for indoor games and recreational activities, ensuring year-round physical education opportunities.",
  },
] as const;

export const TECHNOLOGY_COMMUNICATION = [
  {
    icon: "🌐",
    title: "Digital Campus",
    description:
      "Campus-wide internet connectivity supporting teaching and learning in every corner of our school.",
  },
  {
    icon: "📞",
    title: "Intercom System",
    description:
      "Efficient communication across the school campus ensures smooth coordination and quick response.",
  },
  {
    icon: "🔊",
    title: "Audio-Visual & Sound Systems",
    description:
      "Modern sound and presentation systems for assemblies, events, and classroom activities enhance every learning experience.",
  },
  {
    icon: "🎵",
    title: "Music Facilities",
    description:
      "Musical instruments and equipment that nurture creativity and talent in our students.",
  },
] as const;

export const SAFETY_SECURITY = [
  {
    icon: "🛡️",
    title: "Safe Campus",
    description:
      "CCTV surveillance and a secure, student-friendly environment ensures the safety and well-being of every child.",
  },
] as const;

export const INFRASTRUCTURE_INTRO = {
  body: "Our facilities are designed with one goal in mind: to create an environment where every student can learn, grow, explore, and thrive. From technology-enabled classrooms to specialized labs, from sports grounds to creative spaces — every corner of our campus supports holistic development.",
} as const;
