import { describe, it, expect } from "vitest";
import { GIVING_OPTIONS, SPONSORSHIP_TIERS, IMPACT_STORIES } from "../how-to-help";

describe("How to Help Data", () => {
  describe("GIVING_OPTIONS", () => {
    it("has 3 options", () => {
      expect(GIVING_OPTIONS).toHaveLength(3);
    });

    it("all options have title and description", () => {
      for (const option of GIVING_OPTIONS) {
        expect(option.title).toBeTruthy();
        expect(option.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Annual Fund, Sponsorship, and Volunteer", () => {
      const titles = GIVING_OPTIONS.map((o) => o.title);
      expect(titles).toContain("Annual Fund");
      expect(titles).toContain("Sponsorship");
      expect(titles).toContain("Volunteer");
    });
  });

  describe("SPONSORSHIP_TIERS", () => {
    it("has 4 tiers", () => {
      expect(SPONSORSHIP_TIERS).toHaveLength(4);
    });

    it("all tiers have name and description", () => {
      for (const tier of SPONSORSHIP_TIERS) {
        expect(tier.name).toBeTruthy();
        expect(tier.description.length).toBeGreaterThan(30);
      }
    });

    it("tiers are in ascending order of significance", () => {
      expect(SPONSORSHIP_TIERS[0].name).toBe("Friend of St. Elizabeth");
      expect(SPONSORSHIP_TIERS[1].name).toBe("Silver Patron");
      expect(SPONSORSHIP_TIERS[2].name).toBe("Gold Benefactor");
      expect(SPONSORSHIP_TIERS[3].name).toBe("Legacy Circle");
    });
  });

  describe("IMPACT_STORIES", () => {
    it("has 2 stories", () => {
      expect(IMPACT_STORIES).toHaveLength(2);
    });

    it("all stories have title and description", () => {
      for (const story of IMPACT_STORIES) {
        expect(story.title).toBeTruthy();
        expect(story.description.length).toBeGreaterThan(50);
      }
    });

    it("first story is about a scholarship", () => {
      expect(IMPACT_STORIES[0].title).toContain("Scholarship");
    });
  });
});
