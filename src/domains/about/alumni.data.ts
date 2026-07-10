/**
 * Alumni content for St. Elizabeth's High School.
 *
 * Alumni page has been reframed from "notable alumni" (previously contained
 * unverifiable individual names) to a community-focused alumni network hub.
 */

export const ALUMNI_INTRO = {
  heading: "Once a St. Elizabeth Student, Always Family",
  body: "The bonds formed at St. Elizabeth's High School last a lifetime. Our alumni community spans generations and continents, united by shared values of Truth, Honesty, and service. Stay connected, give back, and help shape the future of the school that shaped you.",
} as const;

export const ALUMNI_NETWORK = {
  heading: "Our Alumni Community",
  body: "For over seven decades, St. Elizabeth's High School has educated thousands of students from Pomburpa and across North Goa. Our alumni have gone on to become doctors, engineers, teachers, entrepreneurs, artists, and community leaders — carrying the values of truth and honesty into every corner of the world.",
  cta: {
    text: "Join the Alumni Network",
    description:
      "We are building a registry of all St. Elizabeth's alumni. Share your story, reconnect with classmates, and help inspire the next generation.",
    href: "/contact",
  },
} as const;

export const ALUMNI_STATISTICS = [
  { value: "72", label: "Years", description: "Of graduating classes since 1954" },
  { value: "60+", label: "Classes", description: "That have passed through our halls" },
  { value: "1,000+", label: "Alumni", description: "Contributing to communities worldwide" },
] as const;

export const ALUMNI_TESTIMONIALS = {
  heading: "Alumni Voices",
  body: "We invite our alumni to share their reflections and memories. Whether your journey took you around the corner or around the world, your story matters to the students who walk these halls today.",
  callToAction: "Share Your Story →",
} as const;

export const ALUMNI_EVENTS = [
  {
    title: "Annual Alumni Reunion",
    date: "December 28, 2026",
    description:
      "Join fellow alumni for an evening of nostalgia, networking, and celebration on the St. Elizabeth campus in Pomburpa.",
    location: "St. Elizabeth's High School Campus",
  },
  {
    title: "Alumni Career Day",
    date: "January 2027",
    description:
      "Share your professional journey with current students. Inspire the next generation by speaking about your career path and experiences.",
    location: "School Auditorium",
  },
  {
    title: "Founder's Day Alumni Dinner",
    date: "July 2027",
    description:
      "A special gathering to honour the founding of St. Elizabeth's High School and celebrate the achievements of our alumni community.",
    location: "Pomburpa Community Hall",
  },
] as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface AlumniData {
  ALUMNI_INTRO: typeof ALUMNI_INTRO;
  ALUMNI_NETWORK: typeof ALUMNI_NETWORK;
  ALUMNI_STATISTICS: typeof ALUMNI_STATISTICS;
  ALUMNI_TESTIMONIALS: typeof ALUMNI_TESTIMONIALS;
  ALUMNI_EVENTS: typeof ALUMNI_EVENTS;
}

export async function getAlumniData(): Promise<AlumniData> {
  return { ALUMNI_INTRO, ALUMNI_NETWORK, ALUMNI_STATISTICS, ALUMNI_TESTIMONIALS, ALUMNI_EVENTS };
}
