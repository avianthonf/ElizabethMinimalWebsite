/**
 * ⚠️ DEPRECATED BARREL — DO NOT IMPORT FROM @/data.
 *
 * No module in the codebase imports from this barrel. All consumers
 * import directly from `@/data/homepage`, `@/data/navigation`, etc.
 * Importing from this barrel pulls in the ENTIRE data layer (21 modules
 * including the heavy `images.ts`), causing unnecessary bundle bloat.
 *
 * If you need a single import point, use named imports from the specific
 * data modules instead.
 */
export * from "./navigation";
export * from "./homepage";
export * from "./about";
export * from "./about-motto";
export * from "./about-manager";
export * from "./about-achievements";
export * from "./admissions";
export * from "./admissions-infrastructure";
export * from "./academics";
export * from "./academics-teaching";
export * from "./academics-resource";
export * from "./academics-science";
export * from "./academics-computer";
export * from "./beyond-academics";
export * from "./visits";
export * from "./contact-hours";
export * from "./alumni";
export * from "./news";
export * from "./news-newsletter";
export * from "./news-video";
export * from "./images";
