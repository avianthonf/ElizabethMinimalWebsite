/**
 * Navigation structure for St. Elizabeth High School.
 * Used by Header, Footer, and full-screen menu overlay components.
 */

export interface NavLink {
  text: string;
  href: string;
  /** Optional image preview shown on hover in full-screen menu */
  previewImage?: string;
}

export interface NavCategory {
  title: string;
  links: NavLink[];
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

// ── Header Navigation ──────────────────────────────────────────────────

export const HEADER_NAV_LINKS: NavLink[] = [
  { text: "About", href: "/about" },
  { text: "Admissions", href: "/admissions" },
  { text: "Academics", href: "/academics" },
  { text: "Athletics", href: "/athletics" },
  { text: "Arts", href: "/arts" },
  { text: "Student Life", href: "/student-life" },
  { text: "Alumni", href: "/alumni" },
  { text: "News", href: "/news" },
  { text: "Contact", href: "/contact" },
];

export const HEADER_CTA_LINKS: NavLink[] = [
  { text: "Inquire", href: "/admissions" },
  { text: "Visit", href: "/contact/visit" },
];

// ── Full-Screen Menu Structure ────────────────────────────────────────

export const MENU_CATEGORIES: NavCategory[] = [
  {
    title: "ABOUT",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "Staff", href: "/about/staff" },
      { text: "Strategic Plan", href: "/about/strategic-plan" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { text: "Why St. Elizabeth?", href: "/admissions/why" },
      { text: "Plan Your Visit", href: "/admissions/visit" },
      { text: "Admission Steps", href: "/admissions/apply" },
      { text: "Tuition & Assistance", href: "/admissions/tuition" },
      { text: "FAQs", href: "/admissions/faqs" },
    ],
  },
  {
    title: "ACADEMICS",
    links: [
      { text: "Departments", href: "/academics/departments" },
      { text: "World Languages", href: "/academics/languages" },
      { text: "Libraries", href: "/academics/libraries" },
      { text: "College Counseling", href: "/academics/college-counseling" },
    ],
  },
  {
    title: "STUDENT LIFE",
    links: [
      { text: "Clubs & Organizations", href: "/student-life/clubs" },
    ],
  },
  {
    title: "ATHLETICS",
    links: [
      { text: "Teams & Schedules", href: "/athletics/teams" },
    ],
  },
  {
    title: "ARTS",
    links: [
      { text: "Visual Arts", href: "/arts/visual-arts" },
      { text: "Performing Arts", href: "/arts/performing-arts" },
    ],
  },
  {
    title: "HOW TO HELP",
    links: [
      { text: "Giving", href: "/how-to-help/give" },
    ],
  },
  {
    title: "ALUMNI",
    links: [
      { text: "Notable Alumni", href: "/alumni" },
    ],
  },
  {
    title: "NEWS",
    links: [
      { text: "All News", href: "/news" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { text: "Locations", href: "/contact" },
      { text: "Inquiry", href: "/contact/visit" },
    ],
  },
];

// ── Footer Navigation ──────────────────────────────────────────────────

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "About",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "Staff", href: "/about/staff" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { text: "Why St. Elizabeth", href: "/admissions/why" },
      { text: "Apply", href: "/admissions/apply" },
      { text: "Tuition", href: "/admissions/tuition" },
      { text: "FAQs", href: "/admissions/faqs" },
    ],
  },
  {
    title: "Academics",
    links: [
      { text: "Departments", href: "/academics/departments" },
      { text: "Languages", href: "/academics/languages" },
      { text: "Libraries", href: "/academics/libraries" },
      { text: "College Counseling", href: "/academics/college-counseling" },
    ],
  },
  {
    title: "Community",
    links: [
      { text: "Student Life", href: "/student-life" },
      { text: "Athletics", href: "/athletics" },
      { text: "Arts", href: "/arts" },
      { text: "Alumni", href: "/alumni" },
      { text: "News", href: "/news" },
      { text: "How to Help", href: "/how-to-help" },
    ],
  },
];

export const FOOTER_INTRO = {
  heading: "St. Elizabeth High School",
  body: `Guiding Minds, Nurturing Hearts, Building Futures. A nurturing Catholic school in Pomburpa, Goa, rooted in Truth and Honesty since 1949.

Ven. Fr. Hilario Gonsalves Rd
Pomburpa, Bardez
Goa 4031102, India

info@stelizabethhighschool.in`,
};

export const FOOTER_SOCIAL_LINKS = [
  { platform: "facebook" as const, href: "https://facebook.com/stelizabethhighschool" },
  { platform: "instagram" as const, href: "https://instagram.com/stelizabethhighschool" },
];

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} St. Elizabeth High School, Pomburpa, Goa. All Rights Reserved.`;
