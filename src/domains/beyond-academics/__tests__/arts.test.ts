import { describe, it, expect } from "vitest";
import { CULTURAL_PROGRAMMES } from "../beyond.data";

describe("Cultural Activities (formerly Arts)", () => {
  describe("CULTURAL_PROGRAMMES", () => {
    it("has 6 programmes", () => {
      expect(CULTURAL_PROGRAMMES).toHaveLength(6);
    });

    it("all programmes have title and description", () => {
      for (const programme of CULTURAL_PROGRAMMES) {
        expect(programme.title).toBeTruthy();
        expect(programme.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Annual Day, Music & Dance, Drama & Theatre, and School Celebrations", () => {
      const titles = CULTURAL_PROGRAMMES.map((p) => p.title);
      expect(titles).toContain("Annual Day");
      expect(titles).toContain("Music & Dance");
      expect(titles).toContain("Drama & Theatre");
      expect(titles).toContain("School Celebrations");
    });
  });
});
