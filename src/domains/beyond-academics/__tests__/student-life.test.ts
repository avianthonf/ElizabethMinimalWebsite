import { describe, it, expect } from "vitest";
import { CLUBS, BEYOND_ACADEMICS_INTRO } from "../beyond.data";

describe("Student Life Data", () => {
  describe("CLUBS", () => {
    it("has 8 clubs", () => {
      expect(CLUBS).toHaveLength(8);
    });

    it("all clubs have name, description, and category", () => {
      for (const club of CLUBS) {
        expect(club.name).toBeTruthy();
        expect(club.description.length).toBeGreaterThan(20);
        expect(club.category).toBeTruthy();
      }
    });

    it("categories cover all expected types", () => {
      const categories = [...new Set(CLUBS.map((c) => c.category))];
      expect(categories).toContain("Academic");
      expect(categories).toContain("Service");
      expect(categories).toContain("Arts");
      expect(categories).toContain("Cultural");
      expect(categories).toContain("Athletics");
    });

    it("includes Debate Society, Eco Club, and Heritage Club", () => {
      const names = CLUBS.map((c) => c.name);
      expect(names).toContain("Debate Society");
      expect(names).toContain("Eco Club");
      expect(names).toContain("Heritage Club");
    });

    it("Debate Society is Academic", () => {
      const debate = CLUBS.find((c) => c.name === "Debate Society");
      expect(debate).toBeDefined();
      expect(debate!.category).toBe("Academic");
    });
  });

  describe("BEYOND_ACADEMICS_INTRO", () => {
    it("has heading and body", () => {
      expect(BEYOND_ACADEMICS_INTRO.heading).toBe("Beyond the Classroom");
      expect(BEYOND_ACADEMICS_INTRO.body.length).toBeGreaterThan(50);
    });
  });
});
