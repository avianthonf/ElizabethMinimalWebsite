/**
 * Beyond Academics content for St. Elizabeth's High School.
 * Combines former Student Life, Athletics, and Arts sections.
 */

export interface Club {
  name: string;
  description: string;
  category: string;
}

// ── The Prahari Club ──────────────────────────────────────────────────

export const PRAHARI_CLUB = {
  name: "THE PRAHARI CLUB",
  intro:
    "The Prahari Club at St. Elizabeth's High School is a student-led initiative dedicated to promoting a safe, healthy, and drug-free school environment. Established under the joint initiative of the Narcotics Control Bureau (NCB) and the National Commission for Protection of Child Rights (NCPCR), the club encourages awareness, responsible choices, and peer support among students.",
  highlights: [
    {
      icon: "🛡️",
      title: "Creating Awareness",
      description:
        "Organises campaigns and activities that promote a drug-free and healthy lifestyle.",
    },
    {
      icon: "🤝",
      title: "Student Leadership",
      description:
        "Empowers students to become responsible role models and ambassadors of positive change.",
    },
    {
      icon: "🌱",
      title: "Building a Safe School Community",
      description: "Fosters vigilance, mutual support, and a culture of care and respect.",
    },
    {
      icon: "👥",
      title: "Our Team",
      description:
        "The Prahari Club comprises 12 student members guided by 2 teacher coordinators.",
    },
    {
      icon: "🎨",
      title: "A Milestone",
      description:
        "In the academic year 2026–27, the club's official logo was collaboratively designed by students and unveiled on the International Day Against Drug Abuse and Illicit Trafficking.",
    },
  ],
} as const;

// ── ECOSE Club ────────────────────────────────────────────────────────

export const ECOSE_CLUB = {
  name: "ECOSE – Eco Club of St. Elizabeth's",
  intro:
    "ECOSE (Eco Club of St. Elizabeth's) is a whole-school environmental initiative that inspires students to care for nature and become responsible environmental guardians. The club also serves as a platform for students to apply and extend the knowledge and skills gained through the Vocational Education curriculum, transforming classroom learning into meaningful environmental action.",
  atAGlance: [
    {
      icon: "🌱",
      title: "Every Student is a Member",
      description:
        "ECOSE brings together the entire school community in environmental action and sustainability.",
    },
    {
      icon: "📘",
      title: "Learning Beyond the Classroom",
      description:
        "The club extends the learning by providing opportunities to apply classroom knowledge through real-life environmental projects and activities.",
    },
    {
      icon: "🌍",
      title: "Celebrating Goa's Biodiversity",
      description:
        "The club is inspired by Goa's rich natural heritage, encouraging students to explore and protect its rivers, trees, birds, flowers, and fruits.",
    },
    {
      icon: "👩‍🏫",
      title: "Teacher Mentorship",
      description: "All ECOSE initiatives are guided by a dedicated teacher coordinator.",
    },
    {
      icon: "🤝",
      title: "Student Leadership",
      description:
        "Twenty student leaders work together to coordinate activities and inspire participation across the school.",
    },
  ],
  motto: "Engage • Care • Overcome",
  tagline: "Together, we are building a greener, cleaner, and more sustainable future.",
  structure: [
    {
      group: "🌊 River Force",
      inspiration: "Inspired by Goa's life-giving rivers.",
      teams: ["Mandovi", "Zuari", "Sal", "Mhadei"],
    },
    {
      group: "🐦 Bird Squad",
      inspiration: "Celebrating the diverse birdlife of Goa.",
      teams: ["Bulbul", "Kingfisher", "Sunbird", "Eagle"],
    },
    {
      group: "🌳 Tree Guardians",
      inspiration: "Honouring Goa's native trees and green heritage.",
      teams: ["Matti", "Kokum", "Jagama", "Tirphal"],
    },
    {
      group: "🌸 Flower Rangers",
      inspiration: "Showcasing the colourful flowering plants of Goa.",
      teams: ["Chafo", "Surangi", "Mogri", "Aboli"],
    },
    {
      group: "🍎 Fruit Brigade",
      inspiration: "Celebrating Goa's traditional fruits and agricultural heritage.",
      teams: ["Chunna", "Chibud", "Bimla", "Zaamla"],
    },
  ],
  activities: [
    "🌿 Tree Plantation Drives",
    "♻️ Waste Management & Recycling",
    "🌎 Biodiversity Conservation",
    "🚶 Nature Walks & Field Visits",
    "🌱 School Garden & Nursery Activities",
    "🎨 Awareness Campaigns, Competitions & Celebrations",
  ],
} as const;

export const CLUBS: Club[] = [
  {
    name: "Debate Society",
    description:
      "Sharpen your public speaking and critical thinking skills through structured debates on current events, ethics, and global issues.",
    category: "Academic",
  },
  {
    name: "Drama Club",
    description:
      "Explore the world of theatre through acting workshops, script writing, and stage production culminating in the annual school play.",
    category: "Arts",
  },
  {
    name: "Science Club",
    description:
      "Conduct experiments, participate in science fairs, and explore the wonders of physics, chemistry, and biology beyond the classroom.",
    category: "Academic",
  },
  {
    name: "Heritage Club",
    description:
      "Celebrate Goa's rich cultural heritage through local history projects, traditional art forms, and community engagement.",
    category: "Cultural",
  },
  {
    name: "Sports Club",
    description:
      "Organize inter-house tournaments, fitness challenges, and sports events that promote healthy competition and teamwork.",
    category: "Athletics",
  },
  {
    name: "Community Service",
    description:
      "Give back through volunteering at local organizations, fundraising for worthy causes, and service projects in Pomburpa and Bardez.",
    category: "Service",
  },
  {
    name: "Photography Club",
    description:
      "Capture campus life, events, and the beauty of Goa through the lens. Learn composition, lighting, and photo editing techniques.",
    category: "Arts",
  },
];

export const CLUBS_PAGE = {
  metaTitle: "Clubs & Organizations",
  metaDescription:
    "Explore the clubs and organizations at St. Elizabeth's High School — including The Prahari Club and ECOSE (Eco Club of St. Elizabeth's).",
  heroEyebrow: "Get Involved",
  heroHeading: "Clubs & Organizations",
  heroDescription:
    "Discover your passion, develop leadership skills, and build lifelong friendships through our diverse range of student clubs and organizations.",
  sectionHeading: "Our Clubs",
  sectionDescription:
    "From academic pursuits to environmental action, arts to athletics — there is something for every student at St. Elizabeth's High School.",
  sectionAriaLabel: "Clubs and organizations",
  breadcrumb: {
    href: "/beyond-academics",
    label: "Beyond Academics",
    currentLabel: "Clubs & Organizations",
  },
} as const;

export const BEYOND_ACADEMICS_INTRO = {
  heading: "Beyond the Classroom",
  body: "At St. Elizabeth's High School, education extends far beyond textbooks. Our vibrant co-curricular programmes nurture every dimension of a child's development — leadership, creativity, physical fitness, cultural awareness, and community spirit. We believe that the lessons learned on the sports field, in the club meeting, on the stage, and through service to others are just as important as those learned in the classroom.",
} as const;

export const BEYOND_ACADEMICS_PAGE = {
  metaTitle: "Beyond Academics",
  metaDescription:
    "Explore student life beyond the classroom at St. Elizabeth's High School — clubs, sports, student council, cultural activities, and educational tours.",
  heroEyebrow: "Student Life",
  heroHeading: "Beyond Academics",
  heroDescription:
    "Discover a world of opportunities that develop character, leadership, creativity, and community spirit.",
  breadcrumb: { href: "/", label: "Home", currentLabel: "Beyond Academics" },
} as const;

export const BEYOND_ACADEMICS_SECTIONS = [
  {
    title: "Clubs",
    description:
      "From debate to eco club, photography to heritage — find your passion among our diverse clubs.",
    href: "/beyond-academics/clubs",
  },
  {
    title: "Sports",
    description: "Seven competitive sports including basketball, football, cricket, and athletics.",
    href: "/beyond-academics/sports",
  },
  {
    title: "Student Council",
    description: "Develop leadership skills by representing your peers and shaping school life.",
    href: "/beyond-academics/student-council",
  },
  {
    title: "Cultural Activities",
    description: "Visual arts, music, dance, and drama — celebrating creativity and Goan heritage.",
    href: "/beyond-academics/cultural-activities",
  },
  {
    title: "Educational Tours",
    description:
      "Field trips and excursions that bring learning to life beyond the classroom walls.",
    href: "/beyond-academics/educational-tours",
  },
] as const;

export const STUDENT_COUNCIL_PAGE = {
  metaTitle: "Student Council",
  metaDescription:
    "The Student Council at St. Elizabeth's High School develops leadership skills, represents student voices, and organizes school events. Learn about our council structure and four-house system.",
  heroEyebrow: "Leadership",
  heroHeading: "Student Council",
  heroDescription:
    "Leadership is not about a position—it's about serving others with responsibility and integrity.",
  sectionHeading: "Council Structure",
  sectionAriaLabel: "Student council information",
  breadcrumb: {
    href: "/beyond-academics",
    label: "Beyond Academics",
    currentLabel: "Student Council",
  },
} as const;

export const STUDENT_COUNCIL_INTRO = {
  body: "The Student Council of St. Elizabeth's High School provides students with opportunities to develop leadership, responsibility, teamwork, and service. Through various roles and responsibilities, student leaders work closely with the school community to uphold discipline, promote school values, and lead by example.",
} as const;

export const STUDENT_COUNCIL_ROLES = [
  {
    icon: "🎯",
    title: "Commander",
    description:
      "The highest leadership position, responsible for overseeing the entire student council and serving as the primary liaison between students and school administration.",
  },
  {
    icon: "👦",
    title: "Head Boy",
    description:
      "Elected by students and faculty to serve as the voice of the male student body, lead assemblies, and represent the school at official events.",
  },
  {
    icon: "👧",
    title: "Head Girl",
    description:
      "Elected by students and faculty to serve as the voice of the female student body, lead assemblies, and represent the school at official events.",
  },
  {
    icon: "🏆",
    title: "House Captains",
    description:
      "Each of the four school houses elects captains who lead their houses in academic, sports, and cultural competitions throughout the year.",
  },
  {
    icon: "⭐",
    title: "Assistant House Captains",
    description:
      "Support house captains in organizing teams, maintaining house spirit, and serving as role models for younger students.",
  },
] as const;

export const HOUSE_SYSTEM = {
  heading: "House System",
  intro:
    "The Student Council also provides leadership to the school's four houses, fostering teamwork, discipline, sportsmanship, and healthy competition throughout the academic year.",
  houses: [
    {
      name: "Red House",
      color: "#DC2626",
      emoji: "🔴",
    },
    {
      name: "Yellow House",
      color: "#EAB308",
      emoji: "🟡",
    },
    {
      name: "Blue House",
      color: "#2563EB",
      emoji: "🔵",
    },
    {
      name: "Green House",
      color: "#16A34A",
      emoji: "🟢",
    },
  ],
} as const;

export const INVESTITURE_CEREMONY = {
  heading: "Investiture Ceremony",
  description:
    "The Student Council is formally inducted during the Investiture Ceremony, a significant occasion that marks the beginning of their leadership journey. During this ceremony, student leaders take their oath of office and receive their badges of responsibility in the presence of the entire school community.",
} as const;

export const CULTURAL_ACTIVITIES_PAGE = {
  metaTitle: "Cultural Activities",
  metaDescription:
    "Cultural activities at St. Elizabeth's High School — Annual Day, music, dance, drama, visual arts, and celebrations of school life and traditions.",
  heroEyebrow: "Create & Express",
  heroHeading: "Cultural Activities",
  heroDescription:
    "At St. Elizabeth's High School, cultural activities are an integral part of school life. They provide students with opportunities to discover their talents, express their creativity, build confidence, and develop teamwork.",
  sectionHeading: "Our Cultural Activities",
  sectionAriaLabel: "Cultural activities and performing arts programmes",
  breadcrumb: {
    href: "/beyond-academics",
    label: "Beyond Academics",
    currentLabel: "Cultural Activities",
  },
} as const;

export const CULTURAL_PROGRAMMES = [
  {
    icon: "🎭",
    title: "Annual Day",
    description:
      "A grand celebration showcasing the talents of our students through music, dance, drama, and creative performances. Students, staff, and families gather to celebrate another year of academic and co-curricular achievement at St. Elizabeth's High School.",
  },
  {
    icon: "🎶",
    title: "Music & Dance",
    description:
      "Students participate in choir, solo and group singing, folk and contemporary dances, and instrumental performances. Classical Indian dance, Goan folk dance, and contemporary movement celebrate India's and Goa's rich performance traditions.",
  },
  {
    icon: "🎨",
    title: "Art & Creative Expression",
    description:
      "Drawing, painting, sculpture, and 3D design. Students develop their artistic voice through hands-on practice in various media including watercolour, acrylic, charcoal, clay, and recycled materials. Craft, rangoli, and other creative activities encourage imagination and artistic skills.",
  },
  {
    icon: "🎤",
    title: "Literary Activities",
    description:
      "Elocution, storytelling, debates, quizzes, and public speaking help students develop confidence and communication skills. These activities nurture critical thinking and articulate expression.",
  },
  {
    icon: "🎬",
    title: "Drama & Theatre",
    description:
      "From script reading to full stage production. Students develop confidence, collaboration, and creative expression through our drama workshops and theatrical productions.",
  },
  {
    icon: "🎉",
    title: "School Celebrations",
    description:
      "The school joyfully celebrates important occasions such as Independence Day, Republic Day, Teachers' Day, Children's Day, Christmas, and the School Feast. These celebrations bring together students, families, and the community in shared joy and tradition.",
  },
] as const;

export const EDUCATIONAL_TOURS_PAGE = {
  metaTitle: "Educational Tours",
  metaDescription:
    "Educational tours and excursions at St. Elizabeth's High School — learning beyond the classroom through field trips and cultural experiences.",
  heroEyebrow: "Explore",
  heroHeading: "Educational Tours",
  heroDescription:
    "Learning comes alive when students step beyond the classroom. Our educational tours connect academic concepts with real-world experiences.",
  sectionHeading: "Recent Excursions",
  sectionAriaLabel: "Educational tours and excursions",
  breadcrumb: {
    href: "/beyond-academics",
    label: "Beyond Academics",
    currentLabel: "Educational Tours",
  },
} as const;

export const EDUCATIONAL_TOURS = [
  {
    title: "Goa Science Centre",
    description:
      "Students explore interactive exhibits covering physics, biology, and astronomy. Hands-on experiments and planetarium shows make scientific concepts tangible and exciting.",
  },
  {
    title: "Old Goa Heritage Walk",
    description:
      "A guided tour of the Basilica of Bom Jesus, Sé Cathedral, and the Archaeological Museum. Students learn about Goa's Portuguese colonial history, architecture, and cultural heritage.",
  },
  {
    title: "Salim Ali Bird Sanctuary",
    description:
      "Located on Chorao Island, this mangrove sanctuary introduces students to Goa's rich biodiversity. Guided nature walks help students identify bird species and understand wetland ecosystems.",
  },
  {
    title: "Goa State Museum",
    description:
      "From prehistoric artefacts to contemporary Goan art, students trace the cultural evolution of their home state. Exhibits cover archaeology, numismatics, and ethnography.",
  },
  {
    title: "Spice Plantation Visit",
    description:
      "Students tour a working spice plantation in Ponda, learning about organic farming, spice cultivation, and the agricultural traditions that make Goa famous worldwide.",
  },
] as const;

export interface Sport {
  name: string;
  description: string;
  seasons: string[];
  schedule?: string[];
}

export const SPORTS: Sport[] = [
  {
    name: "Basketball",
    description:
      "A fast-paced team sport building agility, coordination, and strategic thinking on our outdoor courts.",
    seasons: ["Winter"],
  },
  {
    name: "Football",
    description:
      "The beautiful game that teaches teamwork, endurance, and sportsmanship on our school field in Pomburpa.",
    seasons: ["Monsoon"],
  },
  {
    name: "Volleyball",
    description: "Building reflexes, teamwork, and vertical power through this exciting net sport.",
    seasons: ["Winter"],
  },
  {
    name: "Cricket",
    description:
      "India's beloved sport — developing batting, bowling, and fielding skills with coaching from experienced players.",
    seasons: ["Summer"],
  },
  {
    name: "Athletics",
    description:
      "Track and field events including sprints, relays, long jump, shot put, and cross-country running.",
    seasons: ["Year-round"],
  },
  {
    name: "Swimming",
    description: "Building water confidence, stroke technique, and competitive swimming skills.",
    seasons: ["Summer"],
  },
  {
    name: "Tennis",
    description:
      "Developing hand-eye coordination, footwork, and strategic play on our school courts.",
    seasons: ["Winter"],
  },
];

export const ATHLETICS_STATS = {
  teams: "7",
  athletes: "300+",
  championships: "15+",
} as const;

export const SPORTS_PAGE = {
  metaTitle: "Sports",
  metaDescription:
    "Sports and athletics at St. Elizabeth's High School — basketball, football, cricket, volleyball, athletics, swimming, and tennis.",
  heroEyebrow: "Compete",
  heroHeading: "Sports & Athletics",
  heroDescription:
    "Building character, teamwork, and physical fitness through competitive sports and athletic programmes.",
  sectionHeading: "Our Sports",
  sectionAriaLabel: "Sports and athletics",
  breadcrumb: { href: "/beyond-academics", label: "Beyond Academics", currentLabel: "Sports" },
} as const;

// ── Async data getter ─────────────────────────────────────────────────

export interface BeyondAcademicsData {
  CLUBS: typeof CLUBS;
  PRAHARI_CLUB: typeof PRAHARI_CLUB;
  ECOSE_CLUB: typeof ECOSE_CLUB;
  CLUBS_PAGE: typeof CLUBS_PAGE;
  SPORTS: typeof SPORTS;
  ATHLETICS_STATS: typeof ATHLETICS_STATS;
  SPORTS_PAGE: typeof SPORTS_PAGE;
  BEYOND_ACADEMICS_INTRO: typeof BEYOND_ACADEMICS_INTRO;
  BEYOND_ACADEMICS_PAGE: typeof BEYOND_ACADEMICS_PAGE;
  BEYOND_ACADEMICS_SECTIONS: typeof BEYOND_ACADEMICS_SECTIONS;
  STUDENT_COUNCIL_PAGE: typeof STUDENT_COUNCIL_PAGE;
  STUDENT_COUNCIL_INTRO: typeof STUDENT_COUNCIL_INTRO;
  STUDENT_COUNCIL_ROLES: typeof STUDENT_COUNCIL_ROLES;
  HOUSE_SYSTEM: typeof HOUSE_SYSTEM;
  INVESTITURE_CEREMONY: typeof INVESTITURE_CEREMONY;
  CULTURAL_ACTIVITIES_PAGE: typeof CULTURAL_ACTIVITIES_PAGE;
  CULTURAL_PROGRAMMES: typeof CULTURAL_PROGRAMMES;
  EDUCATIONAL_TOURS_PAGE: typeof EDUCATIONAL_TOURS_PAGE;
  EDUCATIONAL_TOURS: typeof EDUCATIONAL_TOURS;
}

export async function getBeyondAcademicsData(): Promise<BeyondAcademicsData> {
  return {
    CLUBS,
    PRAHARI_CLUB,
    ECOSE_CLUB,
    CLUBS_PAGE,
    SPORTS,
    ATHLETICS_STATS,
    SPORTS_PAGE,
    BEYOND_ACADEMICS_INTRO,
    BEYOND_ACADEMICS_PAGE,
    BEYOND_ACADEMICS_SECTIONS,
    STUDENT_COUNCIL_PAGE,
    STUDENT_COUNCIL_INTRO,
    STUDENT_COUNCIL_ROLES,
    HOUSE_SYSTEM,
    INVESTITURE_CEREMONY,
    CULTURAL_ACTIVITIES_PAGE,
    CULTURAL_PROGRAMMES,
    EDUCATIONAL_TOURS_PAGE,
    EDUCATIONAL_TOURS,
  };
}
