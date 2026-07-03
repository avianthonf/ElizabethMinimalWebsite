/**
 * Beyond Academics content for St. Elizabeth's High School.
 * Combines former Student Life, Athletics, and Arts sections.
 */

export interface Club {
  name: string;
  description: string;
  category: string;
}

export const CLUBS: Club[] = [
  {
    name: "Debate Society",
    description: "Sharpen your public speaking and critical thinking skills through structured debates on current events, ethics, and global issues.",
    category: "Academic",
  },
  {
    name: "Eco Club",
    description: "Champion environmental awareness through tree planting drives, waste reduction campaigns, and campus sustainability projects.",
    category: "Service",
  },
  {
    name: "Drama Club",
    description: "Explore the world of theatre through acting workshops, script writing, and stage production culminating in the annual school play.",
    category: "Arts",
  },
  {
    name: "Science Club",
    description: "Conduct experiments, participate in science fairs, and explore the wonders of physics, chemistry, and biology beyond the classroom.",
    category: "Academic",
  },
  {
    name: "Heritage Club",
    description: "Celebrate Goa's rich cultural heritage through local history projects, traditional art forms, and community engagement.",
    category: "Cultural",
  },
  {
    name: "Sports Club",
    description: "Organize inter-house tournaments, fitness challenges, and sports events that promote healthy competition and teamwork.",
    category: "Athletics",
  },
  {
    name: "Community Service",
    description: "Give back through volunteering at local organizations, fundraising for worthy causes, and service projects in Pomburpa and Bardez.",
    category: "Service",
  },
  {
    name: "Photography Club",
    description: "Capture campus life, events, and the beauty of Goa through the lens. Learn composition, lighting, and photo editing techniques.",
    category: "Arts",
  },
];

export const CLUBS_PAGE = {
  metaTitle: "Clubs & Organizations",
  metaDescription:
    "Explore the clubs and organizations at St. Elizabeth's High School — from debate and drama to eco club and community service.",
  heroEyebrow: "Get Involved",
  heroHeading: "Clubs & Organizations",
  heroDescription:
    "Discover your passion, develop leadership skills, and build lifelong friendships through our diverse range of student clubs and organizations.",
  sectionHeading: "Explore Our Clubs",
  sectionDescription:
    "With clubs spanning academics, arts, athletics, service, and leadership, there is something for every student at St. Elizabeth's High School.",
  sectionAriaLabel: "Clubs and organizations",
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
} as const;

export const BEYOND_ACADEMICS_SECTIONS = [
  {
    title: "Clubs",
    description: "From debate to eco club, photography to heritage — find your passion among our diverse clubs.",
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
    description: "Field trips and excursions that bring learning to life beyond the classroom walls.",
    href: "/beyond-academics/educational-tours",
  },
] as const;

export const STUDENT_COUNCIL_PAGE = {
  metaTitle: "Student Council",
  metaDescription:
    "The Student Council at St. Elizabeth's High School develops leadership skills, represents student voices, and organizes school events.",
  heroEyebrow: "Leadership",
  heroHeading: "Student Council",
  heroDescription:
    "Developing tomorrow's leaders through democratic representation, event organization, and community service.",
  sectionHeading: "Council Structure",
  sectionAriaLabel: "Student council information",
} as const;

export const STUDENT_COUNCIL_ROLES = [
  {
    title: "Head Boy & Head Girl",
    description:
      "Elected by students and faculty, the Head Boy and Head Girl serve as the voice of the student body. They lead school assemblies, represent the school at official events, and coordinate the prefect team.",
  },
  {
    title: "Prefects",
    description:
      "Senior students selected for their leadership and integrity. Prefects maintain discipline, mentor younger students, and assist faculty with school operations and event coordination.",
  },
  {
    title: "House Captains",
    description:
      "Each of the four school houses elects captains who lead their houses in academic, sports, and cultural competitions throughout the year. House captains organize teams, maintain house spirit, and serve as role models.",
  },
  {
    title: "Club Presidents",
    description:
      "Every club elects a president and secretary who plan activities, manage budgets, and coordinate with faculty advisors to deliver engaging programmes for members.",
  },
] as const;

export const CULTURAL_ACTIVITIES_PAGE = {
  metaTitle: "Cultural Activities",
  metaDescription:
    "Cultural activities at St. Elizabeth's High School — visual arts, music, dance, drama, and Goan cultural heritage.",
  heroEyebrow: "Create & Express",
  heroHeading: "Cultural Activities",
  heroDescription:
    "From painting to performance, discover your creative voice and celebrate Goa's rich cultural traditions.",
  sectionHeading: "Creative Programmes",
  sectionAriaLabel: "Cultural activities and performing arts programmes",
} as const;

export const CULTURAL_PROGRAMMES = [
  {
    title: "Visual Arts",
    description:
      "Drawing, painting, sculpture, and 3D design. Students develop their artistic voice through hands-on practice in various media including watercolour, acrylic, charcoal, clay, and recycled materials.",
  },
  {
    title: "Music",
    description:
      "Vocal and instrumental instruction including choir, school band, and individual practice sessions. Students perform at school events, community celebrations, and the annual arts festival.",
  },
  {
    title: "Dance",
    description:
      "Classical Indian dance, Goan folk dance, and contemporary movement. Students celebrate India's and Goa's rich performance traditions while embracing modern choreographic expression.",
  },
  {
    title: "Drama & Theatre",
    description:
      "From script reading to full stage production. Students develop confidence, collaboration, and creative expression through our annual school play and drama workshops.",
  },
  {
    title: "Annual Arts Festival",
    description:
      "A showcase of student creativity featuring art exhibitions, musical performances, dance recitals, and theatrical productions. The festival brings together students, families, and the Pomburpa community in celebration of the arts.",
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
    description: "A fast-paced team sport building agility, coordination, and strategic thinking on our outdoor courts.",
    seasons: ["Winter"],
  },
  {
    name: "Football",
    description: "The beautiful game that teaches teamwork, endurance, and sportsmanship on our school field in Pomburpa.",
    seasons: ["Monsoon"],
  },
  {
    name: "Volleyball",
    description: "Building reflexes, teamwork, and vertical power through this exciting net sport.",
    seasons: ["Winter"],
  },
  {
    name: "Cricket",
    description: "India's beloved sport — developing batting, bowling, and fielding skills with coaching from experienced players.",
    seasons: ["Summer"],
  },
  {
    name: "Athletics",
    description: "Track and field events including sprints, relays, long jump, shot put, and cross-country running.",
    seasons: ["Year-round"],
  },
  {
    name: "Swimming",
    description: "Building water confidence, stroke technique, and competitive swimming skills.",
    seasons: ["Summer"],
  },
  {
    name: "Tennis",
    description: "Developing hand-eye coordination, footwork, and strategic play on our school courts.",
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
} as const;

// ── Async data getter ─────────────────────────────────────────────────

export interface BeyondAcademicsData {
  CLUBS: typeof CLUBS;
  CLUBS_PAGE: typeof CLUBS_PAGE;
  SPORTS: typeof SPORTS;
  ATHLETICS_STATS: typeof ATHLETICS_STATS;
  SPORTS_PAGE: typeof SPORTS_PAGE;
  BEYOND_ACADEMICS_INTRO: typeof BEYOND_ACADEMICS_INTRO;
  BEYOND_ACADEMICS_PAGE: typeof BEYOND_ACADEMICS_PAGE;
  BEYOND_ACADEMICS_SECTIONS: typeof BEYOND_ACADEMICS_SECTIONS;
  STUDENT_COUNCIL_PAGE: typeof STUDENT_COUNCIL_PAGE;
  STUDENT_COUNCIL_ROLES: typeof STUDENT_COUNCIL_ROLES;
  CULTURAL_ACTIVITIES_PAGE: typeof CULTURAL_ACTIVITIES_PAGE;
  CULTURAL_PROGRAMMES: typeof CULTURAL_PROGRAMMES;
  EDUCATIONAL_TOURS_PAGE: typeof EDUCATIONAL_TOURS_PAGE;
  EDUCATIONAL_TOURS: typeof EDUCATIONAL_TOURS;
}

export async function getBeyondAcademicsData(): Promise<BeyondAcademicsData> {
  return {
    CLUBS,
    CLUBS_PAGE,
    SPORTS,
    ATHLETICS_STATS,
    SPORTS_PAGE,
    BEYOND_ACADEMICS_INTRO,
    BEYOND_ACADEMICS_PAGE,
    BEYOND_ACADEMICS_SECTIONS,
    STUDENT_COUNCIL_PAGE,
    STUDENT_COUNCIL_ROLES,
    CULTURAL_ACTIVITIES_PAGE,
    CULTURAL_PROGRAMMES,
    EDUCATIONAL_TOURS_PAGE,
    EDUCATIONAL_TOURS,
  };
}
