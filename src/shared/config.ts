/**
 * Application Configuration
 *
 * Centralized configuration to eliminate hardcoded magic numbers and strings.
 * All values can be overridden via environment variables for different environments.
 *
 * Default values are sourced from @/shared/lib/brand — the single source of truth
 * for school identity. When the school rebrands, update brand.ts and every config
 * default updates automatically.
 */

import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "@/shared/lib/brand";

// ============================================================================
// SCHOOL INFORMATION
// ============================================================================

export const SCHOOL_CONFIG = {
  NAME: "St. Elizabeth's High School",
  SHORT_NAME: "St. Elizabeth's",
  FOUNDED_YEAR: parseInt(process.env.NEXT_PUBLIC_FOUNDED_YEAR || "1954"),
  LOCATION: {
    CITY: "Pomburpa",
    STATE: "Goa",
    COUNTRY: "India",
    COORDINATES: {
      LATITUDE: parseFloat(process.env.NEXT_PUBLIC_SCHOOL_LAT || "15.2993"),
      LONGITUDE: parseFloat(process.env.NEXT_PUBLIC_SCHOOL_LNG || "74.1240"),
    },
  },
} as const;

// ============================================================================
// STATISTICS
// ============================================================================

export const SCHOOL_STATS = {
  CURRENT_ENROLLMENT: parseInt(process.env.NEXT_PUBLIC_ENROLLMENT || "185"),
  STUDENT_TEACHER_RATIO: parseInt(process.env.NEXT_PUBLIC_RATIO || "15"),
  STAFF_COUNT: parseInt(process.env.NEXT_PUBLIC_STAFF_COUNT || "25"),
} as const;

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export const CONTACT_CONFIG = {
  EMAIL: {
    GENERAL: process.env.CONTACT_EMAIL || CONTACT_EMAIL,
    ADMISSIONS: process.env.ADMISSIONS_EMAIL || CONTACT_EMAIL,
    PRINCIPAL: process.env.PRINCIPAL_EMAIL || CONTACT_EMAIL,
  },
  PHONE: {
    MAIN: process.env.NEXT_PUBLIC_PHONE || "0832-2954452",
    OFFICE: process.env.NEXT_PUBLIC_OFFICE_PHONE || "0832-2954452",
  },
  ADDRESS: {
    STREET: "Palmar, Pomburpa",
    CITY: "Bardez",
    STATE: "Goa",
    POSTAL_CODE: "403523",
    COUNTRY: "India",
  },
  OFFICE_HOURS: {
    WEEKDAY_OPEN: "07:30",
    WEEKDAY_CLOSE: "15:30",
    DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  },
} as const;

// ============================================================================
// SOCIAL MEDIA
// ============================================================================

export const SOCIAL_LINKS = {
  FACEBOOK: process.env.NEXT_PUBLIC_FACEBOOK_URL || FACEBOOK_URL,
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL || INSTAGRAM_URL,
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
  ENABLE_SEARCH: process.env.NEXT_PUBLIC_ENABLE_SEARCH !== "false",
  ENABLE_NEWSLETTER: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER !== "false",
} as const;

// ============================================================================
// THIRD-PARTY SERVICE KEYS (Public keys only — private keys stay in .env)
// ============================================================================

export const SERVICES = {
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
} as const;
