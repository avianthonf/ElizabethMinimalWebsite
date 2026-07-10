/**
 * Press & Media Kit content for St. Elizabeth's High School.
 *
 * Resources for journalists covering the Prahari Club initiative
 * and other school activities.
 */

export const PRESS_KIT = {
  heading: "Press & Media Kit",
  intro:
    "Resources for journalists covering St. Elizabeth's High School, the Prahari Club initiative, and our community in Pomburpa, Goa.",
  schoolContact: {
    name: "Headmistress, St. Elizabeth's High School",
    phone: "+91-832-2295452",
    email: "info@stelizabethhighschool.in",
  },
  prahariBackground: {
    heading: "About the Prahari Club",
    body: "The Prahari Club at St. Elizabeth's High School is a student-led initiative established as part of a joint programme by the Narcotics Control Bureau (NCB) and the National Commission for Protection of Child Rights (NCPCR). Our club, launched in the 2026-27 academic year, comprises 12 student members and 2 teacher coordinators who lead awareness campaigns, organize rallies, and educate their peers about the dangers of substance abuse. The club is part of a nationwide network of over 22,000 Prahari Clubs working to create drug-free school environments across India.",
  },
  suggestedHeadlines: [
    "St. Elizabeth's Students Lead Anti-Drug Initiative in Pomburpa",
    "Goa School Among First to Launch NCB-Backed Prahari Club",
    "How 12 Students Are Fighting Drug Abuse in North Goa",
  ],
  keyFacts: [
    "12 student members + 2 teacher coordinators",
    "Established: Academic Year 2026-27",
    "Logo unveiled on International Day Against Drug Abuse and Illicit Trafficking",
    "Part of nationwide network of 22,000+ Prahari Clubs",
    "Goa Police actively targeting drug peddlers near schools (TOI, Mar 2026)",
  ],
} as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface PressData {
  PRESS_KIT: typeof PRESS_KIT;
}

export async function getPressData(): Promise<PressData> {
  return { PRESS_KIT };
}
