/**
 * Alumni content for St. Elizabeth High School.
 */

export const NOTABLE_ALUMNI = [
  {
    name: "Dr. Rajesh Naik",
    class: "Class of 1995",
    achievement: "Renowned cardiologist practicing at Goa Medical College, recognized for contributions to rural healthcare in North Goa.",
  },
  {
    name: "Sandra D'Souza",
    class: "Class of 2005",
    achievement: "Award-winning journalist and editor at a leading national newspaper, covering education and social justice issues.",
  },
  {
    name: "Anthony Fernandes",
    class: "Class of 1998",
    achievement: "Technology entrepreneur who founded a successful IT services company in Panjim, employing over 200 Goan professionals.",
  },
  {
    name: "Maria Gonsalves",
    class: "Class of 2010",
    achievement: "Professional artist whose work has been exhibited in galleries across India, drawing inspiration from Goan heritage and landscape.",
  },
  {
    name: "Coach Peter Menezes",
    class: "Class of 1988",
    achievement: "Respected football coach who has trained multiple state-level players and continues to mentor young athletes in Bardez.",
  },
  {
    name: "Lisa Rodrigues",
    class: "Class of 2012",
    achievement: "Social entrepreneur and founder of a non-profit organization working to improve educational access in rural Goa.",
  },
] as const;

export const ALUMNI_EVENTS = [
  {
    title: "Annual Alumni Reunion",
    date: "December 28, 2026",
    description: "Join fellow alumni for an evening of nostalgia, networking, and celebration on the St. Elizabeth campus in Pomburpa.",
    location: "St. Elizabeth High School Campus",
  },
  {
    title: "Alumni Career Day",
    date: "January 2027",
    description: "Share your professional journey with current students. Inspire the next generation by speaking about your career path and experiences.",
    location: "School Auditorium",
  },
  {
    title: "Founder's Day Alumni Dinner",
    date: "July 2027",
    description: "A special gathering to honour the founding of St. Elizabeth High School and celebrate the achievements of our alumni community.",
    location: "Pomburpa Community Hall",
  },
] as const;

export const ALUMNI_INTRO = {
  heading: "Once a St. Elizabeth Student, Always Family",
  body: "The bonds formed at St. Elizabeth High School last a lifetime. Our alumni community spans generations and continents, united by shared values of Truth, Honesty, and service. Stay connected, give back, and help shape the future of the school that shaped you.",
} as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface AlumniData {
  NOTABLE_ALUMNI: typeof NOTABLE_ALUMNI;
  ALUMNI_EVENTS: typeof ALUMNI_EVENTS;
  ALUMNI_INTRO: typeof ALUMNI_INTRO;
}

export async function getAlumniData(): Promise<AlumniData> {
  return { NOTABLE_ALUMNI, ALUMNI_EVENTS, ALUMNI_INTRO };
}
