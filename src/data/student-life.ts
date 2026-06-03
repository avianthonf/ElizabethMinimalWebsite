/**
 * Student Life content for St. Elizabeth High School.
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
    name: "Student Council",
    description: "Develop leadership skills by representing your classmates, organizing events, and contributing to school decision-making.",
    category: "Leadership",
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

export const STUDENT_LIFE_INTRO = {
  heading: "Beyond the Classroom",
  body: "At St. Elizabeth High School, student life extends far beyond academics. Our clubs, organizations, and traditions create a vibrant community where every student can explore their passions, develop leadership skills, and build lifelong friendships.",
} as const;
