import { describe, it, expect } from "vitest";
import {
  VALUES,
  STATS,
  TESTIMONIALS,
  LATEST_NEWS,
  HERO_CONTENT,
  getHomepageData,
} from "../homepage.data";

describe("Homepage Data", () => {
  it("getHomepageData() returns all page content", async () => {
    const data = await getHomepageData();
    expect(data.HERO_CONTENT).toBeTruthy();
    expect(data.VALUES).toHaveLength(5);
    expect(data.STATS).toHaveLength(3);
    expect(data.TESTIMONIALS).toHaveLength(3);
    expect(data.LATEST_NEWS).toHaveLength(3);
    expect(data.CTA_CONTENT.primaryCTA.text).toBe("Inquire Now");
  });
  it("has exactly 5 values", () => {
    expect(VALUES).toHaveLength(5);
  });

  it("values have numbers 01 through 05 in order", () => {
    expect(VALUES[0].number).toBe("01");
    expect(VALUES[1].number).toBe("02");
    expect(VALUES[2].number).toBe("03");
    expect(VALUES[3].number).toBe("04");
    expect(VALUES[4].number).toBe("05");
  });

  it("values have non-empty titles and bodies", () => {
    for (const v of VALUES) {
      expect(v.title).toBeTruthy();
      expect(v.body.length).toBeGreaterThan(50);
    }
  });

  it("values include Faith, Humility, Compassion, Selfless Service, Integrity", () => {
    const titles = VALUES.map((v) => v.title);
    expect(titles).toContain("Faith");
    expect(titles).toContain("Humility");
    expect(titles).toContain("Compassion");
    expect(titles).toContain("Selfless Service");
    expect(titles).toContain("Integrity");
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

  it("founded stat shows 1954", () => {
    const founded = STATS.find((s) => s.label === "Founded");
    expect(founded).toBeDefined();
    expect(founded!.value).toBe("1954");
  });

  it("affiliated stat shows GBSHSE", () => {
    const affiliated = STATS.find((s) => s.label === "Affiliated");
    expect(affiliated).toBeDefined();
    expect(affiliated!.value).toBe("GBSHSE");
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
