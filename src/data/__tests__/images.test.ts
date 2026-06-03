import { describe, it, expect } from "vitest";
import {
  HERO_IMAGES,
  ACADEMICS_HERO,
  HOMEPAGE_GRID_IMAGES,
  VALUES_IMAGES,
  STATS_IMAGES,
  TESTIMONIAL_IMAGES,
  NEWS_IMAGES,
  ACADEMICS_IMAGES,
  ATHLETICS_IMAGES,
  ARTS_IMAGES,
  STUDENT_LIFE_IMAGES,
  COMMUNITY_IMAGES,
  CONTACT_IMAGES,
  OVERFLOW_IMAGES,
  TOTAL_IMAGES,
  getImageByFilename,
} from "../images";

describe("Image Registry", () => {
  // ── Count verification ────────────────────────────────────────────

  it("catalogues exactly 71 images", () => {
    expect(TOTAL_IMAGES).toBe(71);
  });

  it("has 5 hero images", () => {
    expect(HERO_IMAGES).toHaveLength(5);
  });

  it("has 12 homepage grid images", () => {
    expect(HOMEPAGE_GRID_IMAGES).toHaveLength(12);
  });

  it("has 3 values background images", () => {
    expect(Object.keys(VALUES_IMAGES)).toHaveLength(3);
  });

  it("has 3 stats images", () => {
    expect(STATS_IMAGES).toHaveLength(3);
  });

  it("has 3 testimonial images", () => {
    expect(TESTIMONIAL_IMAGES).toHaveLength(3);
  });

  it("has 3 news images", () => {
    expect(NEWS_IMAGES).toHaveLength(3);
  });

  it("has academics hero as a separate entry", () => {
    expect(ACADEMICS_HERO.filename).toBe("DSC07576.jpg");
    expect(ACADEMICS_HERO.profile.temperature).toBe("cool");
  });

  it("has 7 academics section images", () => {
    expect(ACADEMICS_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has 7 athletics section images", () => {
    expect(ATHLETICS_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has at least 4 arts section images", () => {
    expect(ARTS_IMAGES.length).toBeGreaterThanOrEqual(4);
  });

  it("has at least 7 student life images", () => {
    expect(STUDENT_LIFE_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has at least 7 community/heritage images", () => {
    expect(COMMUNITY_IMAGES.length).toBeGreaterThanOrEqual(7);
  });

  it("has at least 2 contact page images", () => {
    expect(CONTACT_IMAGES.length).toBeGreaterThanOrEqual(2);
  });

  // ── Data integrity ─────────────────────────────────────────────────

  it("every image has non-empty alt text (10+ chars)", () => {
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    for (const img of allImages) {
      expect(img.alt).toBeTruthy();
      expect(
        img.alt.length,
        `Image ${img.filename} has alt text shorter than 10 chars: "${img.alt}"`
      ).toBeGreaterThan(10);
    }
  });

  it("every image filename ends with .jpg", () => {
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    for (const img of allImages) {
      expect(
        img.filename.endsWith(".jpg"),
        `Image ${img.filename} does not end with .jpg`
      ).toBe(true);
    }
  });

  it("every image has a valid section", () => {
    const validSections = [
      "homepage-hero", "homepage-grid", "homepage-values",
      "homepage-stats", "homepage-testimonials", "homepage-news",
      "about-hero", "about-mission", "about-history", "about-staff",
      "admissions-hero", "admissions-why", "admissions-visit",
      "academics-hero", "academics-departments",
      "athletics-hero", "athletics-teams",
      "arts-hero", "arts-visual", "arts-performing",
      "student-life-hero", "student-life-clubs",
      "contact-hero",
      "how-to-help-hero",
      "news-hero",
      "alumni-hero",
      "overflow",
    ];
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    for (const img of allImages) {
      expect(
        validSections.includes(img.section),
        `Image ${img.filename} has invalid section: "${img.section}"`
      ).toBe(true);
    }
  });

  it("getImageByFilename returns correct image", () => {
    const img = getImageByFilename("DSC07580.jpg");
    expect(img).toBeDefined();
    expect(img!.section).toBe("homepage-hero");
  });

  it("getImageByFilename returns undefined for nonexistent file", () => {
    expect(getImageByFilename("nonexistent.jpg")).toBeUndefined();
  });

  // ── Uniqueness ─────────────────────────────────────────────────────

  it("all unique filenames total 71 images", () => {
    const allImages = [
      ...HERO_IMAGES,
      ACADEMICS_HERO,
      ...HOMEPAGE_GRID_IMAGES,
      ...Object.values(VALUES_IMAGES),
      ...STATS_IMAGES,
      ...TESTIMONIAL_IMAGES,
      ...NEWS_IMAGES,
      ...ACADEMICS_IMAGES,
      ...ATHLETICS_IMAGES,
      ...ARTS_IMAGES,
      ...STUDENT_LIFE_IMAGES,
      ...COMMUNITY_IMAGES,
      ...CONTACT_IMAGES,
      ...OVERFLOW_IMAGES,
    ];
    const uniqueFilenames = new Set(allImages.map((img) => img.filename));
    expect(uniqueFilenames.size).toBe(71);
  });
});
