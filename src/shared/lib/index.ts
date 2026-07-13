// Shared library utilities
export {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_FOUNDED,
  SCHOOL_BOARD,
  SCHOOL_BOARD_SHORT,
  CONTACT_EMAIL,
  TRANSACTIONAL_EMAIL_FROM,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SOCIAL_LINKS,
  POSTAL_CODE,
  absoluteUrl,
} from "./brand";
export { cn, blurPlaceholderSvg } from "./cn";
export { safeJsonStringify } from "./safe-json";
export { renderHighlightedText } from "./safe-html";
export { createPageMetadata, SITE_DESCRIPTION, getHeroImage, createPageId } from "./page-utils";
export {
  createBreadcrumbSchema,
  createNewsArticleSchema,
  createOrganizationSchema,
  createWebPageSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "./structured-data";
export type {
  BreadcrumbItem,
  BreadcrumbListSchema,
  NewsArticleSchema,
  OrganizationSchema,
  WebPageSchema,
  FAQItem,
  FAQPageSchema,
} from "./structured-data";
export { ok, err, isOk, isErr, zodFieldErrors } from "./actions";
export type { ActionResult } from "./actions";
