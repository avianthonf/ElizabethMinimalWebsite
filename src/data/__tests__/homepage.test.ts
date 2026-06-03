import { describe, it, expect } from "vitest";
import { VALUES, STATS, TESTIMONIALS, LATEST_NEWS, HERO_CONTENT } from "../homepage";

describe("Homepage Data", () => {
  it("has exactly 3 values", () => {
    expect(VALUES).toHaveLength(3);
  });

  it("values have numbers 01, 02, 03 in order", () => {
    expect(VALUES[0].number).toBe("01");
    expect(VALUES[1].number).toBe("02");
    expect(VALUES[2].number).toBe("03");
  });

  it("values have non-empty titles and bodies", () => {
    for (const v of VALUES) {
      expect(v.title).toBeTruthy();
      expect(v.body.length).toBeGreaterThan(50);
    }
  });

  it("has exactly 3 stats", () => {
    expect(STATS).toHaveLength(3);
  });

  it("stats include Founded, Students, and Affiliated", () => {
    const labels = STATS.map((s) => s.label);
    expect(labels).toContain("Founded");
    expect(labels).toContain("Students");
    expect(labels).toContain("Affiliated");
  });

  it("has exactly 3 testimonials", () => {
    expect(TESTIMONIALS).toHaveLength(3);
  });

  it("testimonials have all three roles represented", () => {
    const roles = TESTIMONIALS.map((t) => t.role);
    expect(roles).toContain("alumni");
    expect(roles).toContain("student");
    expect(roles).toContain("parent");
  });

  it("has exactly 3 news items", () => {
    expect(LATEST_NEWS).toHaveLength(3);
  });

  it("hero content has all required fields", () => {
    expect(HERO_CONTENT.statement).toBeTruthy();
    expect(HERO_CONTENT.heading).toBeTruthy();
    expect(HERO_CONTENT.loadOverlayText).toBeTruthy();
  });
});
