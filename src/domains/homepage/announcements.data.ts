/**
 * Announcement data for the site-wide announcement bar.
 * Configure announcements here and enable/disable as needed.
 */

export interface Announcement {
  message: string;
  href?: string;
  linkText?: string;
  enabled: boolean;
  storageKey: string;
}

/**
 * Current active announcement.
 * Set enabled: true to display the announcement bar.
 */
export const CURRENT_ANNOUNCEMENT: Announcement = {
  message: "Admissions open for Academic Year 2026-27",
  href: "/admissions/apply",
  linkText: "Apply Now",
  enabled: true,
  storageKey: "stelizabeths-announcement-2026-admissions",
};
