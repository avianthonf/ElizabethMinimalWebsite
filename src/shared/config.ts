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

import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL, SITE_URL } from "@/shared/lib/brand";

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
// RATE LIMITING
// ============================================================================

export const RATE_LIMIT_CONFIG = {
  CONTACT_FORM: {
    MAX_SUBMISSIONS: parseInt(process.env.RATE_LIMIT_MAX || "3"),
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "3600000"), // 1 hour
  },
  SEARCH: {
    MAX_REQUESTS: parseInt(process.env.SEARCH_RATE_LIMIT || "60"),
    WINDOW_MS: 60000, // 1 minute
  },
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  ENABLE_SEARCH: process.env.NEXT_PUBLIC_ENABLE_SEARCH !== "false",
  ENABLE_NEWSLETTER: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER !== "false",
} as const;

// ============================================================================
// DESIGN TOKENS (Z-INDEX SCALE)
// ============================================================================

export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 1000,
  STICKY: 2000,
  FIXED: 3000,
  MODAL_BACKDROP: 4000,
  MODAL: 5000,
  POPOVER: 6000,
  TOAST: 7000,
  TOOLTIP: 8000,
} as const;

// ============================================================================
// PAGINATION & LIMITS
// ============================================================================

export const PAGINATION = {
  NEWS_PER_PAGE: 12,
  EVENTS_PER_PAGE: 20,
  GALLERY_IMAGES_PER_PAGE: 24,
  SEARCH_RESULTS_MAX: 10,
} as const;

// ============================================================================
// MEDIA BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280,
} as const;

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// ============================================================================
// THIRD-PARTY SERVICE KEYS (Public keys only - private keys stay in .env)
// ============================================================================

export const SERVICES = {
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID || "",
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
} as const;

// ============================================================================
// SEO DEFAULTS
// ============================================================================

export const SEO_CONFIG = {
  DEFAULT_TITLE: "St. Elizabeth's High School - Pomburpa, Goa",
  TITLE_TEMPLATE: "%s | St. Elizabeth's High School",
  DEFAULT_DESCRIPTION:
    "A Catholic English Medium Secondary School in Pomburpa, Goa, founded in 1954. Providing quality education with values since 1954.",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || SITE_URL,
  DEFAULT_OG_IMAGE: "/og-default.jpg",
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
  EMAIL_MAX_LENGTH: 254,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
  PHONE_PATTERN: /^[\d\s\-\+\(\)]+$/,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ZIndex = (typeof Z_INDEX)[keyof typeof Z_INDEX];
export type Breakpoint = (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
export type AnimationDuration = (typeof ANIMATION)[keyof typeof ANIMATION];
