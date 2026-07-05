/**
 * About — subpage content for the new IA structure.
 * Extends src/data/about.ts with new subpage content.
 */

export const MOTTO_ANTHEM_PAGE = {
  metaTitle: "School Motto & Anthem",
  metaDescription:
    "Discover the school motto 'Truth and Honesty' and the school anthem of St. Elizabeth's High School, Pomburpa, Goa.",
  breadcrumb: { href: "/about", label: "About", currentLabel: "Motto & Anthem" },
  heroEyebrow: "Our Identity",
  heroHeading: "School Motto & Anthem",
  heroDescription:
    "Our motto 'Truth and Honesty' and school anthem are the heartbeats of St. Elizabeth's — grounding us in purpose and uniting us in pride.",
  sectionAriaLabel: "School motto and anthem",
} as const;

export const SCHOOL_MOTTO = {
  heading: "Our Motto",
  text: "Truth and Honesty",
  description:
    "These three words have guided St. Elizabeth's High School since 1949. 'Truth' calls us to seek knowledge with intellectual rigour. 'Honesty' calls us to live with integrity in every word and deed. Together, they form the moral compass that shapes our students, our faculty, and our community. Every morning assembly, every classroom discussion, and every school event is anchored in this foundational principle.",
} as const;

export const SCHOOL_ANTHEM = {
  heading: "School Anthem",
  lines: [
    "In Pomburpa's gentle shade we stand,",
    "With truth and honesty in hand.",
    "Guiding minds and nurturing hearts,",
    "Building futures — this is where it starts.",
    "",
    "St. Elizabeth's, our guiding light,",
    "Leading us onward, burning bright.",
    "In faith and learning, we rise above,",
    "Rooted in wisdom, grounded in love.",
    "",
    "From 1949 we've carried the flame,",
    "Of excellence and honour in our name.",
    "Through every challenge, through every test,",
    "We strive for nothing but our best.",
    "",
    "St. Elizabeth's, our home, our pride,",
    "With truth and honesty as our guide.",
    "Forever faithful, forever true —",
    "St. Elizabeth's, we honour you.",
  ],
  notes:
    "The school anthem is sung at the beginning of every morning assembly and at all major school events. It was composed by the school's founding faculty and has been passed down through generations of Elizabethans.",
} as const;
