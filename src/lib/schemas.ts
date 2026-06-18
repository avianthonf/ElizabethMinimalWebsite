import { z } from "zod";

/** Shared validators */
const nonEmptyString = z.string().min(1);

/** Image asset */
export const imageAssetSchema = z.object({
  filename: z.string().min(1, "Image filename is required"),
  alt: z.string().min(1, "Image alt text is required"),
  category: z.string(),
  section: z.string(),
  subCategory: z.string().optional(),
  date: z.string().optional(),
  profile: z.object({
    brightness: z.number(),
    contrast: z.number(),
    complexity: z.enum(["low", "medium", "high"]),
    temperature: z.enum(["warm", "neutral", "neutral-warm", "cool"]),
    moodTags: z.array(z.string()),
  }),
});

/** Homepage data */
export const heroContentSchema = z.object({
  statement: z.string().min(1),
  heading: z.string().min(1),
  loadOverlayText: z.string().min(1),
});

export const valueCardSchema = z.object({
  number: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const statDataSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  attribution: z.string().min(1),
  role: z.enum(["alumni", "student", "parent", "teacher"]),
});

export const ctaContentSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  description: z.string().min(1),
  primaryCTA: z.object({ text: z.string(), href: z.string().url() }),
  secondaryCTA: z.object({ text: z.string(), href: z.string().url() }),
});

export const newsItemSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  excerpt: z.string().min(1),
  imageFilename: z.string().min(1),
  href: z.string().min(1),
});

export const homepageDataSchema = z.object({
  HERO_CONTENT: heroContentSchema,
  VALUES: z.array(valueCardSchema).min(1),
  STATS: z.array(statDataSchema).min(1),
  TESTIMONIALS: z.array(testimonialSchema).min(1),
  CTA_CONTENT: ctaContentSchema,
  LATEST_NEWS: z.array(newsItemSchema).min(1),
});

/** Navigation */
export const navLinkSchema = z.object({
  text: nonEmptyString,
  href: nonEmptyString,
  previewImage: z.string().optional(),
});

export const navCategorySchema = z.object({
  title: nonEmptyString,
  links: z.array(navLinkSchema).min(1),
});

export const footerSectionSchema = z.object({
  title: nonEmptyString,
  links: z.array(navLinkSchema).min(1),
});

export const navigationDataSchema = z.object({
  headerLinks: z.array(navLinkSchema).min(1),
  headerCTAs: z.array(navLinkSchema).min(1),
  menuCategories: z.array(navCategorySchema).min(1),
  footerSections: z.array(footerSectionSchema).min(1),
  footerIntro: z.object({ heading: nonEmptyString, body: z.string() }),
  footerSocial: z.array(z.object({ platform: z.string(), href: z.string().url() })).min(1),
  footerCopyright: z.string().min(1),
});

/** Visit / Contact */
export const visitTypeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

export const mapConfigSchema = z.object({
  title: z.string().min(1),
  embedUrl: z.string().url(),
  addressLines: z.custom<React.ReactNode>().optional(),
});

export const schoolAddressSchema = z.object({
  street: z.string().min(1),
  area: z.string().min(1),
  city: z.string().min(1),
  pinCode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  country: z.string().min(1),
});

export const schoolContactSchema = z.object({
  phone: z.string().min(1),
  email: z.string().email(),
});
