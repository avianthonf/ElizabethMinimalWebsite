/**
 * Athletics content for St. Elizabeth High School.
 */

export interface Sport {
  name: string;
  description: string;
  seasons: string[];
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
