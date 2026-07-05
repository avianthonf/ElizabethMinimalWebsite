/**
 * Navigation structure for St. Elizabeth's High School.
 * Used by Header, Footer, and full-screen menu overlay components.
 *
 * IA: Home | About Us | Academics | Admissions | Beyond Academics | News & Media | Contact Us
 */

import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "@/shared/lib/brand";

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
  { text: "About Us", href: "/about" },
  { text: "Academics", href: "/academics" },
  { text: "Admissions", href: "/admissions" },
  { text: "Beyond Academics", href: "/beyond-academics" },
  { text: "News & Media", href: "/news" },
  { text: "Contact Us", href: "/contact" },
];

// ── Full-Screen Menu Structure ────────────────────────────────────────

export const MENU_CATEGORIES: NavCategory[] = [
  {
    title: "ABOUT US",
    links: [
      { text: "Vision, Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "School Motto & Anthem", href: "/about/motto-anthem" },
      { text: "Management & Staff", href: "/about/staff" },
      { text: "Manager's Message", href: "/about/manager-message" },
      { text: "Achievements & Milestones", href: "/about/achievements" },
      { text: "Alumni", href: "/about/alumni" },
    ],
  },
  {
    title: "ACADEMICS",
    links: [
      { text: "Curriculum", href: "/academics/curriculum" },
      { text: "Teaching Methods", href: "/academics/teaching-methods" },
      { text: "Resource Room", href: "/academics/resource-room" },
      { text: "Library", href: "/academics/library" },
      { text: "Science Laboratory", href: "/academics/science-laboratory" },
      { text: "Computer Laboratory", href: "/academics/computer-laboratory" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { text: "Why St. Elizabeth's", href: "/admissions/why" },
      { text: "Infrastructure", href: "/admissions/infrastructure" },
      { text: "Admission Steps", href: "/admissions/apply" },
    ],
  },
  {
    title: "BEYOND ACADEMICS",
    links: [
      { text: "Clubs", href: "/beyond-academics/clubs" },
      { text: "Sports", href: "/beyond-academics/sports" },
      { text: "Student Council", href: "/beyond-academics/student-council" },
      { text: "Cultural Activities", href: "/beyond-academics/cultural-activities" },
      { text: "Educational Tours", href: "/beyond-academics/educational-tours" },
    ],
  },
  {
    title: "NEWS & MEDIA",
    links: [
      { text: "Latest News", href: "/news" },
      { text: "Newsletter", href: "/news/newsletter" },
      { text: "Photo Gallery", href: "/news/photo-gallery" },
      { text: "Video Gallery", href: "/news/video-gallery" },
    ],
  },
  {
    title: "CONTACT US",
    links: [
      { text: "Contact Information", href: "/contact/info" },
      { text: "Office Hours", href: "/contact/office-hours" },
      { text: "Location Map", href: "/contact/location-map" },
    ],
  },
];

// ── Footer Navigation ──────────────────────────────────────────────────

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "About Us",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "Management & Staff", href: "/about/staff" },
      { text: "Manager's Message", href: "/about/manager-message" },
      { text: "Alumni", href: "/about/alumni" },
    ],
  },
  {
    title: "Academics",
    links: [
      { text: "Curriculum", href: "/academics/curriculum" },
      { text: "Teaching Methods", href: "/academics/teaching-methods" },
      { text: "Library", href: "/academics/library" },
      { text: "Science Lab", href: "/academics/science-laboratory" },
      { text: "Computer Lab", href: "/academics/computer-laboratory" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { text: "Why St. Elizabeth's", href: "/admissions/why" },
      { text: "Infrastructure", href: "/admissions/infrastructure" },
      { text: "Apply Now", href: "/admissions/apply" },
    ],
  },
  {
    title: "Beyond Academics",
    links: [
      { text: "Clubs", href: "/beyond-academics/clubs" },
      { text: "Sports", href: "/beyond-academics/sports" },
      { text: "Student Council", href: "/beyond-academics/student-council" },
      { text: "Cultural Activities", href: "/beyond-academics/cultural-activities" },
      { text: "Educational Tours", href: "/beyond-academics/educational-tours" },
    ],
  },
  {
    title: "News & Media",
    links: [
      { text: "Latest News", href: "/news" },
      { text: "Newsletter", href: "/news/newsletter" },
      { text: "Photo Gallery", href: "/news/photo-gallery" },
      { text: "Video Gallery", href: "/news/video-gallery" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { text: "Contact Info", href: "/contact/info" },
      { text: "Office Hours", href: "/contact/office-hours" },
      { text: "Location Map", href: "/contact/location-map" },
    ],
  },
];

export const FOOTER_INTRO = {
  heading: "St. Elizabeth's High School",
  body: `Guiding Minds, Nurturing Hearts, Building Futures. A nurturing Catholic school in Pomburpa, Goa, rooted in Truth and Honesty since 1949.

Ven. Fr. Hilario Gonsalves Rd
Pomburpa, Bardez
Goa 403511, India

${CONTACT_EMAIL}`,
};

export const FOOTER_SOCIAL_LINKS = [
  { platform: "facebook" as const, href: FACEBOOK_URL },
  { platform: "instagram" as const, href: INSTAGRAM_URL },
];

/** Copyright string with {year} placeholder — replaced client-side in Footer. */
export const FOOTER_COPYRIGHT =
  "© {year} St. Elizabeth's High School, Pomburpa, Goa. All Rights Reserved.";
