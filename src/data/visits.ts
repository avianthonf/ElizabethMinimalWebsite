/**
 * Shared visit data for St. Elizabeth's High School.
 *
 * Central source of truth for visit-related types, address, contact info,
 * map configuration, and visit type definitions. Both admissions/visit and
 * contact/visit pages consume this data; the pages differ only in their
 * introductory text and hero metadata.
 */

import type { ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────────

export interface VisitType {
  /** Unique identifier (e.g. "campus-tour") */
  id: string;
  /** Human-readable label (e.g. "Campus Tour") */
  label: string;
  /** Short description of what this visit type entails */
  description: string;
}

export interface MapConfig {
  /** Right-column heading above the map */
  title: string;
  /** Optional address text rendered above the map iframe (omitted when null) */
  addressLines?: ReactNode;
  /** Google Maps embed URL for the iframe src */
  embedUrl: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
}

// ── School Address ─────────────────────────────────────────────────────

export const SCHOOL_ADDRESS = {
  street: "Ven. Fr. Hilario Gonsalves Rd",
  area: "Pomburpa, Bardez",
  city: "Goa",
  pinCode: "4031102",
  country: "India",
} as const;

// ── School Contact ─────────────────────────────────────────────────────

export const SCHOOL_CONTACT = {
  phone: "+91 XX-XXXX-XXXX (TBD)",
  email: "info@stelizabethhighschool.in",
} as const;

// ── Google Maps ────────────────────────────────────────────────────────

export const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=St.+Elizabeth+High+School+Pomburpa+Goa&output=embed";

// ── Visit Types ────────────────────────────────────────────────────────

export const VISIT_TYPES: VisitType[] = [
  {
    id: "campus-tour",
    label: "Campus Tour",
    description:
      "A guided walking tour of our facilities, classrooms, and campus grounds led by a member of our admissions team. Tours are available Monday through Friday by appointment. We recommend allowing 90 minutes for a complete visit.",
  },
  {
    id: "open-house",
    label: "Open House",
    description:
      "Scheduled group events where prospective families can explore St. Elizabeth, meet faculty and students, observe sample classes, and learn about our academic and extracurricular programs.",
  },
  {
    id: "shadow-day",
    label: "Shadow Day",
    description:
      "Prospective students spend a full school day shadowing a current St. Elizabeth student — attending classes, meeting peers, and experiencing daily life firsthand. Available for applicants to grades 6–12.",
  },
];
