import { z } from "zod";

/**
 * Zod validation schemas for homepage section data.
 *
 * Validates all data at runtime to catch configuration errors early.
 * Use these schemas to validate data imports in components.
 */

// ── Hero Carousel Schemas ──────────────────────────────────────────────

export const HeroSlideSchema = z.object({
  tagline: z.string().min(1, "Tagline cannot be empty"),
  heading: z.string().min(1, "Heading cannot be empty").max(100, "Heading too long"),
  ctaText: z.string().min(1, "CTA text cannot be empty").max(30, "CTA text too long"),
  ctaHref: z.string().startsWith("/", "CTA href must be a relative path"),
  imageFilename: z.string().regex(/\.(jpg|jpeg|png|webp)$/i, "Invalid image format"),
  imageAlt: z.string().min(10, "Alt text should be descriptive (min 10 chars)"),
});

export const HeroSlidesSchema = z
  .array(HeroSlideSchema)
  .min(1, "At least one hero slide required")
  .max(10, "Too many hero slides");

export type HeroSlide = z.infer<typeof HeroSlideSchema>;

// ── Counter Stats Schemas ──────────────────────────────────────────────

export const CounterStatSchema = z.object({
  value: z.number().positive("Counter value must be positive"),
  suffix: z.string(),
  label: z.string().min(1, "Counter label cannot be empty"),
  prefix: z.string().optional(),
});

export const CounterStatsSchema = z
  .array(CounterStatSchema)
  .min(1, "At least one counter stat required")
  .max(6, "Too many counter stats");

export type CounterStat = z.infer<typeof CounterStatSchema>;

// ── Welcome Section Schemas ────────────────────────────────────────────

export const WelcomeContentSchema = z.object({
  eyebrow: z.string().min(1, "Eyebrow cannot be empty"),
  heading: z.string().min(1, "Heading cannot be empty"),
  body: z.string().min(50, "Body text too short (min 50 chars)"),
  ctaText: z.string().min(1, "CTA text cannot be empty"),
  ctaHref: z.string().startsWith("/", "CTA href must be a relative path"),
});

export type WelcomeContent = z.infer<typeof WelcomeContentSchema>;

// ── Values Section Schemas ─────────────────────────────────────────────

export const ValueSchema = z.object({
  icon: z.enum(["heart", "star", "users", "book", "globe", "award", "shield", "sun"], {
    errorMap: () => ({ message: "Invalid icon type" }),
  }),
  title: z.string().min(1, "Value title cannot be empty"),
  description: z.string().min(20, "Value description too short"),
});

export const ValuesSchema = z
  .array(ValueSchema)
  .min(3, "At least 3 values required")
  .max(6, "Too many values");

export type Value = z.infer<typeof ValueSchema>;

// ── Achievement Schemas ────────────────────────────────────────────────

export const AchievementSchema = z.object({
  year: z.string().regex(/^\d{4}$/, "Year must be 4 digits"),
  title: z.string().min(1, "Achievement title cannot be empty"),
  description: z.string().min(20, "Achievement description too short"),
  icon: z.enum(["award", "trophy", "medal", "star", "graduation-cap", "certificate"], {
    errorMap: () => ({ message: "Invalid achievement icon" }),
  }),
});

export const AchievementsSchema = z
  .array(AchievementSchema)
  .min(1, "At least one achievement required")
  .max(10, "Too many achievements");

export type Achievement = z.infer<typeof AchievementSchema>;

// ── Testimonial Schemas ────────────────────────────────────────────────

export const TestimonialSchema = z.object({
  quote: z.string().min(50, "Quote too short (min 50 chars)").max(500, "Quote too long"),
  author: z.string().min(1, "Author name cannot be empty"),
  role: z.string().min(1, "Author role cannot be empty"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be 4 digits")
    .optional(),
});

export const TestimonialsSchema = z
  .array(TestimonialSchema)
  .min(1, "At least one testimonial required")
  .max(10, "Too many testimonials");

export type Testimonial = z.infer<typeof TestimonialSchema>;

// ── CTA Section Schemas ────────────────────────────────────────────────

export const CTAContentSchema = z.object({
  eyebrow: z.string().min(1, "CTA eyebrow cannot be empty"),
  heading: z.string().min(1, "CTA heading cannot be empty"),
  body: z.string().min(20, "CTA body too short"),
  primaryCTA: z.object({
    text: z.string().min(1, "Primary CTA text cannot be empty"),
    href: z.string().startsWith("/", "CTA href must be a relative path"),
  }),
  secondaryCTA: z.object({
    text: z.string().min(1, "Secondary CTA text cannot be empty"),
    href: z.string().startsWith("/", "CTA href must be a relative path"),
  }),
});

export type CTAContent = z.infer<typeof CTAContentSchema>;

// ── News Item Schemas ──────────────────────────────────────────────────

export const NewsItemSchema = z.object({
  id: z.string().min(1, "News ID cannot be empty"),
  title: z.string().min(1, "News title cannot be empty"),
  excerpt: z.string().min(20, "News excerpt too short"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD format"),
  category: z.enum(["event", "achievement", "announcement", "news"], {
    errorMap: () => ({ message: "Invalid news category" }),
  }),
  imageUrl: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
});

export const NewsItemsSchema = z
  .array(NewsItemSchema)
  .min(1, "At least one news item required")
  .max(20, "Too many news items");

export type NewsItem = z.infer<typeof NewsItemSchema>;

// ── Helper Functions ───────────────────────────────────────────────────

/**
 * Validate data with a Zod schema and throw descriptive error.
 * Use this in data files to validate at import time.
 *
 * @example
 * ```ts
 * export const HERO_SLIDES = validateData(
 *   HeroSlidesSchema,
 *   rawHeroSlides,
 *   "HERO_SLIDES"
 * );
 * ```
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown, name: string): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`);
      throw new Error(`❌ Validation failed for ${name}:\n${issues.join("\n")}`);
    }
    throw error;
  }
}

/**
 * Safely validate data and return with type safety.
 * Returns validation result with success/error.
 *
 * @example
 * ```ts
 * const result = safeValidateData(HeroSlidesSchema, data);
 * if (!result.success) {
 *   console.error(result.error);
 * }
 * ```
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
