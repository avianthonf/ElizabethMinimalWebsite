/**
 * Single source of truth for school brand identity.
 *
 * All user-facing URLs (domain, email, social) MUST be imported from this file
 * — never hardcoded. If the school rebrands, update here and the entire site
 * updates consistently.
 *
 * Decision history: prior to 2026-07-03, two domains were in use
 * (`stelizabeths.edu.in` for SEO/metadata, `stelizabethhighschool.in` for
 * contact/footer). Unified to `stelizabethhighschool.in` as the canonical
 * domain because:
 *  - It's the contact email used by the school's actual Resend account
 *  - It's the domain in the footer that real visitors see
 *  - `.in` matches the official Indian education registration format
 *  - All social handles use this slug
 */

/** Canonical public website URL — no trailing slash. */
export const SITE_URL = "https://www.stelizabethhighschool.in";

/** School name as it should appear in user-facing copy. */
export const SITE_NAME = "St. Elizabeth's High School";

/** Short tagline used in metadata and about sections. */
export const SITE_TAGLINE = "Guiding Minds, Nurturing Hearts, Building Futures";

/** Founding year. */
export const SITE_FOUNDED = 1954;

/** School board affiliation. */
export const SCHOOL_BOARD = "Goa Board of Secondary and Higher Secondary Education (GBSHSE)";

/** Short board acronym for compact display. */
export const SCHOOL_BOARD_SHORT = "GBSHSE";

/** Contact email for inquiries, contact form, and footer. */
export const CONTACT_EMAIL = "info@stelizabethhighschool.in";

/** Email used as the "from" address when sending transactional email. */
export const TRANSACTIONAL_EMAIL_FROM =
  "St. Elizabeth's Website <noreply@stelizabethhighschool.in>";

/** Facebook page URL. */
export const FACEBOOK_URL = "https://facebook.com/stelizabethhighschool";

/** Instagram profile URL. */
export const INSTAGRAM_URL = "https://instagram.com/stelizabethhighschool";

/** Social links used in footer + JSON-LD. */
export const SOCIAL_LINKS = {
  facebook: FACEBOOK_URL,
  instagram: INSTAGRAM_URL,
} as const;

/** Postal code — used in JSON-LD and contact pages. */
export const POSTAL_CODE = "403511";

/** Returns the absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalised}`;
}
