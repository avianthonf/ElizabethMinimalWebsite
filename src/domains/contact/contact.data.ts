/**
 * Shared visit data for St. Elizabeth's High School.
 *
 * Central source of truth for visit-related types, address, contact info,
 * map configuration, and visit type definitions. Both admissions/visit and
 * contact/visit pages consume this data; the pages differ only in their
 * introductory text and hero metadata.
 */

import type { ReactNode } from "react";
import { CONTACT_EMAIL, POSTAL_CODE } from "@/shared/lib/brand";
import { SCHOOL_CONFIG, CONTACT_CONFIG } from "@/shared/config";

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
  /** Optional address text rendered above the map (omitted when null) */
  addressLines?: ReactNode;
  /** Center latitude */
  lat?: number;
  /** Center longitude */
  lng?: number;
  /** Map zoom level (default 14) */
  zoom?: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
}

// ── School Address ─────────────────────────────────────────────────────

export const SCHOOL_ADDRESS = {
  street: CONTACT_CONFIG.ADDRESS.STREET,
  area: `${SCHOOL_CONFIG.LOCATION.CITY}, Bardez`,
  city: CONTACT_CONFIG.ADDRESS.STATE,
  pinCode: CONTACT_CONFIG.ADDRESS.POSTAL_CODE,
  country: CONTACT_CONFIG.ADDRESS.COUNTRY,
} as const;

// ── School Contact ─────────────────────────────────────────────────────

export const SCHOOL_CONTACT = {
  phone: CONTACT_CONFIG.PHONE.MAIN,
  email: CONTACT_CONFIG.EMAIL.GENERAL,
  hours: `${CONTACT_CONFIG.OFFICE_HOURS.DAYS.join(", ").replace(/, ([^,]*)$/, " and $1")}: ${CONTACT_CONFIG.OFFICE_HOURS.WEEKDAY_OPEN} – ${CONTACT_CONFIG.OFFICE_HOURS.WEEKDAY_CLOSE}`,
} as const;

// ── School Coordinates ─────────────────────────────────────────────────

export const SCHOOL_COORDINATES = {
  lat: SCHOOL_CONFIG.LOCATION.COORDINATES.LATITUDE,
  lng: SCHOOL_CONFIG.LOCATION.COORDINATES.LONGITUDE,
} as const;

// ── Google Maps ────────────────────────────────────────────────────────

export const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=St.+Elizabeth+High+School+Pomburpa+Goa&output=embed";

export const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=St.+Elizabeth+High+School+Pomburpa+Goa";

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
