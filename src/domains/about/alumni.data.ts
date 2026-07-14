/**
 * Alumni content for St. Elizabeth's High School.
 *
 * Alumni page has been reframed from "notable alumni" (previously contained
 * unverifiable individual names) to a community-focused alumni network hub.
 */

export const ALUMNI_INTRO = {
  heading: "Once a St. Elizabeth Student, Always Family",
  body: "Once a part of the St. Elizabeth's High School family, always a part of it. Our alumni are our pride and our greatest ambassadors. Over the years, generations of students have carried forward the values, knowledge, and life lessons they received at St. Elizabeth's High School, making meaningful contributions to their communities and professions. We cherish our lifelong connection with our alumni and celebrate their achievements, inspiring journeys, and lasting memories of school life.",
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

export const ALUMNI_TESTIMONIALS = [
  {
    quote:
      "The guidance and education I received at St. Elizabeth High School were instrumental in shaping my dream of pursuing medicine. As the first doctor from my village in Ecoxim, I look back at my alma mater with immense gratitude for empowering me to serve our community. St. Elizabeth High School did not just provide an education; it instilled core values of discipline, integrity, and empathy that has shaped me into the person that I am today. I am forever grateful to my teachers for teaching us to dream big while staying rooted in our values. To the students today, my advice is to embrace every learning opportunity, stay rooted in your moral values, and believe that your dedication and discipline will surely help you achieve your goals.",
    name: "Dr. Mohandas Chodankar",
    credentials: "BHMS, PGDEMS, MBA",
    designation: "Svastha Health Clinic, Ecoxim",
    academicYears: "1986-1996",
  },
  {
    quote:
      "Looking back at my school days fills me with gratitude and pride. The values of discipline, perseverance, teamwork, and integrity that I learned here have been the foundation of my professional journey. Today, I am privileged to serve as a Manager in an IT and Telecom organization, leading operations and projects across Mumbai and Goa. Whatever I have achieved today is rooted in the guidance, encouragement, and education I received from my teachers. I sincerely thank my alma mater for shaping my character and inspiring me to strive for excellence. I wish the school continued success in nurturing future leaders and creating many more success stories.",
    name: "Subash Sitaram Volvoikar",
    credentials: "",
    designation: "Manager - Delivery Telecom-Mumbai & Goa, Sify Technologies Ltd",
    academicYears: "",
  },
  {
    quote:
      "School is my foundation, where I have grown into character of harmony and unity. The values which will last for long.",
    name: "Sushant Devidas Gad",
    credentials: "",
    designation: "Police Sub Inspector",
    academicYears: "1988-1998",
  },
  {
    quote:
      "As PTA Chairperson, and also ex student, I am proud that St Elizabeth's High School, Pomburpa provides a safe, caring, and enjoyable learning environment where every student is encouraged to learn, grow, and succeed.",
    name: "Willy Fernandes",
    credentials: "",
    designation: "PTA Chairperson, St. Elizabeth's High School",
    academicYears: "",
  },
  {
    quote:
      "As a former staff member, it brings me immense joy to see our school launch its official website. This digital gateway perfectly mirrors the spirit of innovation and community that I always cherished during my time here. It is a wonderful tool to connect past achievements with future possibilities. Wishing the management, staff and students tremendous success as you step into this exciting new digital chapter.",
    name: "Mrs. Premal Kadam",
    credentials: "",
    designation: "Former Staff Member",
    academicYears: "",
  },
] as const;

export const ALUMNI_TESTIMONIALS_INTRO = {
  heading: "Voices of Our Alumni",
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

export const ALUMNI_CLOSING = {
  heading: "Stay Connected",
  body: "We warmly invite all our alumni to stay connected with the St. Elizabeth's family. Your achievements, experiences, and continued association inspire our students and strengthen our school community. Together, let's celebrate our shared legacy and build an even brighter future.",
} as const;

export interface AlumniData {
  ALUMNI_INTRO: typeof ALUMNI_INTRO;
  ALUMNI_NETWORK: typeof ALUMNI_NETWORK;
  ALUMNI_STATISTICS: typeof ALUMNI_STATISTICS;
  ALUMNI_TESTIMONIALS: typeof ALUMNI_TESTIMONIALS;
  ALUMNI_TESTIMONIALS_INTRO: typeof ALUMNI_TESTIMONIALS_INTRO;
  ALUMNI_EVENTS: typeof ALUMNI_EVENTS;
  ALUMNI_CLOSING: typeof ALUMNI_CLOSING;
}

export async function getAlumniData(): Promise<AlumniData> {
  return {
    ALUMNI_INTRO,
    ALUMNI_NETWORK,
    ALUMNI_STATISTICS,
    ALUMNI_TESTIMONIALS,
    ALUMNI_TESTIMONIALS_INTRO,
    ALUMNI_EVENTS,
    ALUMNI_CLOSING,
  };
}
