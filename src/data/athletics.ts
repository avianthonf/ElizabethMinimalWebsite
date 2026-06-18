/**
 * Athletics content for St. Elizabeth's High School.
 */

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
    schedule: [
      "Practice: Mon, Wed, Fri 4:00–5:30 PM",
      "Inter-school matches: Nov–Feb",
      "Annual basketball tournament: February",
    ],
  },
  {
    name: "Football",
    description:
      "The beautiful game that teaches teamwork, endurance, and sportsmanship on our school field in Pomburpa.",
    seasons: ["Monsoon"],
    schedule: [
      "Practice: Tue, Thu 4:00–5:30 PM",
      "Inter-house matches: Jul–Sep",
      "District tournament: August",
    ],
  },
  {
    name: "Volleyball",
    description: "Building reflexes, teamwork, and vertical power through this exciting net sport.",
    seasons: ["Winter"],
    schedule: ["Practice: Mon, Wed 4:00–5:00 PM", "Inter-school league: Nov–Jan"],
  },
  {
    name: "Cricket",
    description:
      "India's beloved sport — developing batting, bowling, and fielding skills with coaching from experienced players.",
    seasons: ["Summer"],
    schedule: [
      "Practice: Tue, Thu, Sat 7:00–8:30 AM",
      "Inter-house tournament: Jan–Mar",
      "Zonal tournament: February",
    ],
  },
  {
    name: "Athletics",
    description:
      "Track and field events including sprints, relays, long jump, shot put, and cross-country running.",
    seasons: ["Year-round"],
    schedule: [
      "Practice: Mon–Fri 6:30–7:30 AM",
      "Annual sports meet: November",
      "District athletics championship: October",
    ],
  },
  {
    name: "Swimming",
    description: "Building water confidence, stroke technique, and competitive swimming skills.",
    seasons: ["Summer"],
    schedule: ["Practice: Mon, Wed, Fri 3:30–4:30 PM", "Inter-school gala: March"],
  },
  {
    name: "Tennis",
    description:
      "Developing hand-eye coordination, footwork, and strategic play on our school courts.",
    seasons: ["Winter"],
    schedule: ["Practice: Tue, Thu 4:00–5:00 PM", "District championship: December"],
  },
];

export const ATHLETICS_STATS = {
  teams: "7",
  athletes: "300+",
  championships: "15+",
} as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface AthleticsData {
  SPORTS: typeof SPORTS;
  ATHLETICS_STATS: typeof ATHLETICS_STATS;
}

export async function getAthleticsData(): Promise<AthleticsData> {
  return { SPORTS, ATHLETICS_STATS };
}
