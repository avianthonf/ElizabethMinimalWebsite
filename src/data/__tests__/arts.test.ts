import { describe, it, expect } from "vitest";
import { VISUAL_ARTS_PROGRAMS, PERFORMING_ARTS_PROGRAMS } from "../arts";

describe("Arts Data", () => {
  describe("VISUAL_ARTS_PROGRAMS", () => {
    it("has 3 programs", () => {
      expect(VISUAL_ARTS_PROGRAMS).toHaveLength(3);
    });

    it("all programs have title and description", () => {
      for (const program of VISUAL_ARTS_PROGRAMS) {
        expect(program.title).toBeTruthy();
        expect(program.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Drawing & Painting and Sculpture & 3D Design", () => {
      const titles = VISUAL_ARTS_PROGRAMS.map((p) => p.title);
      expect(titles).toContain("Drawing & Painting");
      expect(titles).toContain("Sculpture & 3D Design");
      expect(titles).toContain("Art History & Appreciation");
    });
  });

  describe("PERFORMING_ARTS_PROGRAMS", () => {
    it("has 4 programs", () => {
      expect(PERFORMING_ARTS_PROGRAMS).toHaveLength(4);
    });

    it("all programs have title and description", () => {
      for (const program of PERFORMING_ARTS_PROGRAMS) {
        expect(program.title).toBeTruthy();
        expect(program.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Music, Dance, Drama & Theatre, and Annual Arts Festival", () => {
      const titles = PERFORMING_ARTS_PROGRAMS.map((p) => p.title);
      expect(titles).toContain("Music");
      expect(titles).toContain("Dance");
      expect(titles).toContain("Drama & Theatre");
      expect(titles).toContain("Annual Arts Festival");
    });
  });
});
