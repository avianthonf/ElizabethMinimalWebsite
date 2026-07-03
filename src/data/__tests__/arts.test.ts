import { describe, it, expect } from "vitest";
import { CULTURAL_PROGRAMMES } from "../beyond-academics";

describe("Cultural Activities (formerly Arts)", () => {
  describe("CULTURAL_PROGRAMMES", () => {
    it("has 5 programmes", () => {
      expect(CULTURAL_PROGRAMMES).toHaveLength(5);
    });

    it("all programmes have title and description", () => {
      for (const programme of CULTURAL_PROGRAMMES) {
        expect(programme.title).toBeTruthy();
        expect(programme.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Visual Arts, Music, Dance, Drama & Theatre, and Annual Arts Festival", () => {
      const titles = CULTURAL_PROGRAMMES.map((p) => p.title);
      expect(titles).toContain("Visual Arts");
      expect(titles).toContain("Music");
      expect(titles).toContain("Dance");
      expect(titles).toContain("Drama & Theatre");
      expect(titles).toContain("Annual Arts Festival");
    });
  });
});
