import { describe, it, expect } from "vitest";
import {
  HERO_SLIDES,
  COUNTER_STATS,
  WELCOME_CONTENT,
  WHY_CONTENT,
  ACHIEVEMENTS_CONTENT,
  ADMISSIONS_CTA_CONTENT,
} from "../sections.data";
import { HeroSlidesSchema, CounterStatsSchema, WelcomeContentSchema } from "../sections.validation";

/**
 * Homepage data validation tests.
 *
 * These tests ensure all homepage content data is valid, complete,
 * and follows expected patterns. Catches configuration errors early.
 */
describe("Homepage Data Validation", () => {
  describe("Hero Slides", () => {
    it("should validate with Zod schema", () => {
      const result = HeroSlidesSchema.safeParse(HERO_SLIDES);
      if (!result.success) {
        console.error("Validation errors:", result.error.issues);
      }
      expect(result.success).toBe(true);
    });

    it("should have at least one slide", () => {
      expect(HERO_SLIDES.length).toBeGreaterThan(0);
    });

    it("should have valid image filenames", () => {
      HERO_SLIDES.forEach((slide, i) => {
        expect(slide.imageFilename, `Slide ${i} image`).toMatch(/\.(jpg|jpeg|png|webp)$/i);
      });
    });

    it("should have descriptive alt text (min 10 chars)", () => {
      HERO_SLIDES.forEach((slide, i) => {
        expect(slide.imageAlt.length, `Slide ${i} alt text`).toBeGreaterThanOrEqual(10);
      });
    });

    it("should have relative CTA hrefs", () => {
      HERO_SLIDES.forEach((slide, i) => {
        expect(slide.ctaHref, `Slide ${i} CTA href`).toMatch(/^\//);
      });
    });

    it("should have no empty strings", () => {
      HERO_SLIDES.forEach((slide, i) => {
        expect(slide.tagline.trim(), `Slide ${i} tagline`).not.toBe("");
        expect(slide.heading.trim(), `Slide ${i} heading`).not.toBe("");
        expect(slide.ctaText.trim(), `Slide ${i} CTA text`).not.toBe("");
        expect(slide.ctaHref.trim(), `Slide ${i} CTA href`).not.toBe("");
        expect(slide.imageFilename.trim(), `Slide ${i} image`).not.toBe("");
        expect(slide.imageAlt.trim(), `Slide ${i} alt`).not.toBe("");
      });
    });

    it("should have unique images", () => {
      const filenames = HERO_SLIDES.map((s) => s.imageFilename);
      const unique = new Set(filenames);
      expect(unique.size).toBe(filenames.length);
    });

    it("should have reasonable heading lengths (max 100)", () => {
      HERO_SLIDES.forEach((slide, i) => {
        expect(slide.heading.length, `Slide ${i} heading`).toBeLessThanOrEqual(100);
      });
    });

    it("should have reasonable CTA text lengths (max 30)", () => {
      HERO_SLIDES.forEach((slide, i) => {
        expect(slide.ctaText.length, `Slide ${i} CTA`).toBeLessThanOrEqual(30);
      });
    });
  });

  describe("Counter Stats", () => {
    it("should validate with Zod schema", () => {
      const result = CounterStatsSchema.safeParse(COUNTER_STATS);
      if (!result.success) {
        console.error("Validation errors:", result.error.issues);
      }
      expect(result.success).toBe(true);
    });

    it("should have at least one stat", () => {
      expect(COUNTER_STATS.length).toBeGreaterThan(0);
    });

    it("should have positive values", () => {
      COUNTER_STATS.forEach((stat, i) => {
        expect(stat.value, `Stat ${i} value`).toBeGreaterThan(0);
      });
    });

    it("should have labels", () => {
      COUNTER_STATS.forEach((stat, i) => {
        expect(stat.label.length, `Stat ${i} label`).toBeGreaterThan(0);
      });
    });
  });

  describe("Welcome Content", () => {
    it("should validate with Zod schema", () => {
      const result = WelcomeContentSchema.safeParse(WELCOME_CONTENT);
      if (!result.success) {
        console.error("Validation errors:", result.error.issues);
      }
      expect(result.success).toBe(true);
    });

    it("should have sufficient body text (min 50 chars)", () => {
      expect(WELCOME_CONTENT.body.length).toBeGreaterThanOrEqual(50);
    });

    it("should have relative CTA href", () => {
      expect(WELCOME_CONTENT.ctaHref).toMatch(/^\//);
    });

    it("should have all required fields", () => {
      expect(WELCOME_CONTENT.eyebrow.length).toBeGreaterThan(0);
      expect(WELCOME_CONTENT.heading.length).toBeGreaterThan(0);
      expect(WELCOME_CONTENT.body.length).toBeGreaterThan(0);
      expect(WELCOME_CONTENT.ctaText.length).toBeGreaterThan(0);
      expect(WELCOME_CONTENT.ctaHref.length).toBeGreaterThan(0);
    });
  });

  describe("Why Content", () => {
    it("should have valid section metadata", () => {
      expect(WHY_CONTENT.eyebrow.length).toBeGreaterThan(0);
      expect(WHY_CONTENT.heading.length).toBeGreaterThan(0);
      expect(WHY_CONTENT.sectionAriaLabel.length).toBeGreaterThan(0);
    });
  });

  describe("Achievements Content", () => {
    it("should have valid section metadata", () => {
      expect(ACHIEVEMENTS_CONTENT.eyebrow.length).toBeGreaterThan(0);
      expect(ACHIEVEMENTS_CONTENT.heading.length).toBeGreaterThan(0);
    });
  });

  describe("Admissions CTA Content", () => {
    it("should have valid content", () => {
      expect(ADMISSIONS_CTA_CONTENT.heading.length).toBeGreaterThan(0);
      expect(ADMISSIONS_CTA_CONTENT.description.length).toBeGreaterThan(0);
    });

    it("should have description at least 20 chars", () => {
      expect(ADMISSIONS_CTA_CONTENT.description.length).toBeGreaterThanOrEqual(20);
    });
  });
});
