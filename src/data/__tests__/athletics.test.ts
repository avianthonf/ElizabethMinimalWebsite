import { describe, it, expect } from "vitest";
import { SPORTS, ATHLETICS_STATS, type Sport } from "../athletics";

describe("Athletics Data", () => {
  describe("SPORTS", () => {
    it("has 7 sports", () => {
      expect(SPORTS).toHaveLength(7);
    });

    it("all sports have name, description, and seasons array", () => {
      for (const sport of SPORTS) {
        expect(sport.name).toBeTruthy();
        expect(sport.description.length).toBeGreaterThan(20);
        expect(sport.seasons.length).toBeGreaterThan(0);
      }
    });

    it("includes Basketball, Football, Cricket, and Swimming", () => {
      const names = SPORTS.map((s) => s.name);
      expect(names).toContain("Basketball");
      expect(names).toContain("Football");
      expect(names).toContain("Cricket");
      expect(names).toContain("Swimming");
    });

    it("Cricket season is Summer", () => {
      const cricket = SPORTS.find((s) => s.name === "Cricket");
      expect(cricket).toBeDefined();
      expect(cricket!.seasons).toContain("Summer");
    });

    it("Athletics is year-round", () => {
      const athletics = SPORTS.find((s) => s.name === "Athletics");
      expect(athletics).toBeDefined();
      expect(athletics!.seasons).toContain("Year-round");
    });
  });

  describe("ATHLETICS_STATS", () => {
    it("has teams, athletes, and championships", () => {
      expect(ATHLETICS_STATS.teams).toBe("7");
      expect(ATHLETICS_STATS.athletes).toBe("300+");
      expect(ATHLETICS_STATS.championships).toBe("15+");
    });

    it("all stats are non-empty strings", () => {
      expect(ATHLETICS_STATS.teams.length).toBeGreaterThan(0);
      expect(ATHLETICS_STATS.athletes.length).toBeGreaterThan(0);
      expect(ATHLETICS_STATS.championships.length).toBeGreaterThan(0);
    });
  });
});
