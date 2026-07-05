/**
 * Office Hours content for St. Elizabeth's High School.
 */

export const OFFICE_HOURS_PAGE = {
  metaTitle: "Office Hours",
  metaDescription:
    "Office hours and contact schedule for St. Elizabeth's High School, Pomburpa, Goa.",
  breadcrumb: { href: "/contact", label: "Contact", currentLabel: "Office Hours" },
  heroEyebrow: "Find Us",
  heroHeading: "Office Hours",
  heroDescription:
    "When to reach us — administrative office hours, school timings, and holiday schedule.",
  sectionAriaLabel: "Office hours and schedule",
} as const;

export const OFFICE_HOURS = [
  {
    label: "School Hours",
    hours: "8:30 AM — 3:00 PM",
    days: "Monday to Friday",
    description:
      "Regular school hours for all students from Nursery through Class X. The school gate opens at 8:15 AM for arrival.",
  },
  {
    label: "Administrative Office",
    hours: "9:00 AM — 4:00 PM",
    days: "Monday to Friday",
    description:
      "For admissions inquiries, fee payments, transfer certificates, and general administrative matters. Appointments recommended for admissions counselling.",
  },
  {
    label: "Principal's Office",
    hours: "10:00 AM — 12:00 PM",
    days: "Monday, Wednesday, Friday",
    description:
      "Available to meet parents by prior appointment. Please contact the administrative office to schedule.",
  },
  {
    label: "Weekend & Holidays",
    hours: "Closed",
    days: "Saturday & Sunday",
    description:
      "The school campus is closed on weekends and on all gazetted public holidays. For emergencies, please email the school.",
  },
] as const;

export const HOLIDAY_SCHEDULE = [
  "Summer Vacation: mid-April to early June",
  "Diwali Break: 5 days in October/November",
  "Christmas Break: 22 December to 2 January",
  "All gazetted Goa State and Central Government holidays are observed",
] as const;
