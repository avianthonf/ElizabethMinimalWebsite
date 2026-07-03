/**
 * Newsletter content for St. Elizabeth's High School.
 */

export const NEWSLETTER_PAGE = {
  metaTitle: "Newsletter",
  metaDescription:
    "The St. Elizabeth's High School newsletter — campus news, student achievements, and community updates from Pomburpa, Goa.",
  breadcrumb: { href: "/news", label: "News", currentLabel: "Newsletter" },
  heroEyebrow: "Stay Connected",
  heroHeading: "School Newsletter",
  heroDescription:
    "Our monthly newsletter keeps families, alumni, and the community informed about campus life, student achievements, and upcoming events.",
  sectionAriaLabel: "School newsletter",
} as const;

export const NEWSLETTER_INTRO = {
  heading: "The Elizabethan Chronicle",
  body: "Published monthly during the academic year, The Elizabethan Chronicle brings you news from every corner of campus — academic achievements, sports results, arts performances, community service, and more. Subscribe to receive it directly in your inbox.",
} as const;

export const NEWSLETTER_ARCHIVE = [
  { title: "June 2026 — New Academic Year Begins", description: "Welcoming our new students, faculty introductions, and the year ahead." },
  { title: "May 2026 — Summer Camp Highlights", description: "Recap of our annual summer camp featuring sports clinics, art workshops, and science explorations." },
  { title: "March 2026 — Annual Day & Prize Distribution", description: "Celebrating student excellence across academics, sports, and arts at our Annual Day ceremony." },
  { title: "January 2026 — Republic Day & Sports Meet XXII", description: "Republic Day celebrations and a thrilling inter-house athletics competition." },
  { title: "November 2025 — Children's Day & Science Fair", description: "Special Children's Day programme and the annual science exhibition." },
  { title: "August 2025 — Independence Day & Monsoon Sports", description: "Independence Day celebrations and the start of the monsoon sports season." },
] as const;
