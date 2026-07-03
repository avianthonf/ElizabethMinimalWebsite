/**
 * Upcoming events data for the homepage EventsPreview component.
 * Following industry best practice: every top school homepage features
 * upcoming events (Finalsite — "5 Key Homepage Design Elements").
 */

export interface HomepageEvent {
  title: string;
  date: string;
  time?: string;
  location?: string;
  type: "academic" | "sports" | "cultural" | "admissions" | "community";
}

export const UPCOMING_EVENTS: HomepageEvent[] = [
  {
    title: "Admissions Open House — Campus Tour",
    date: "August 2026",
    type: "admissions",
  },
  {
    title: "First Day of School — Academic Year 2026-27",
    date: "September 1, 2026",
    type: "academic",
  },
  {
    title: "Inter-House Sports Meet XXIII",
    date: "October 2026",
    type: "sports",
  },
  {
    title: "Annual Day Celebrations",
    date: "November 2026",
    type: "cultural",
  },
];

const EVENT_TYPE_ICONS: Record<HomepageEvent["type"], string> = {
  academic: "graduation-cap",
  sports: "trophy",
  cultural: "music",
  admissions: "door-open",
  community: "users",
};

export const EVENT_TYPE_ICON_PATHS: Record<string, string> = {
  "graduation-cap":
    "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 2.5 3.5 6 4.5 3.5-1 6-2.5 6-4.5v-5",
  trophy:
    "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z",
  music:
    "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
  "door-open":
    "M13 4h3a2 2 0 012 2v14M2 20h3M13 20h9M10 12v.01M13 4.562v16.157a1 1 0 01-1.242.97L5 20V5.562a2 2 0 011.515-1.94l4-1A2 2 0 0113 4.561z",
  users:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
};

export const EVENT_ICON_MAP = EVENT_TYPE_ICONS;
