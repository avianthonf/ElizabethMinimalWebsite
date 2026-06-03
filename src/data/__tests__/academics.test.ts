import { describe, it, expect } from "vitest";
import { DEPARTMENTS, type Department } from "../academics";

describe("Academics Data", () => {
  describe("DEPARTMENTS", () => {
    it("has exactly 7 departments", () => {
      expect(DEPARTMENTS).toHaveLength(7);
    });

    it("all departments have name, description, icon, and href", () => {
      for (const dept of DEPARTMENTS) {
        expect(dept.name).toBeTruthy();
        expect(dept.description.length).toBeGreaterThan(20);
        expect(dept.icon).toBeTruthy();
        expect(dept.href.startsWith("/")).toBe(true);
      }
    });

    it("includes Science, Mathematics, English, Social Studies", () => {
      const names = DEPARTMENTS.map((d) => d.name);
      expect(names).toContain("Science");
      expect(names).toContain("Mathematics");
      expect(names).toContain("English");
      expect(names).toContain("Social Studies");
    });

    it("includes World Languages, Libraries, College Counseling", () => {
      const names = DEPARTMENTS.map((d) => d.name);
      expect(names).toContain("World Languages");
      expect(names).toContain("Libraries");
      expect(names).toContain("College Counseling");
    });

    it("World Languages links to /academics/languages", () => {
      const langs = DEPARTMENTS.find((d) => d.name === "World Languages");
      expect(langs).toBeDefined();
      expect(langs!.href).toBe("/academics/languages");
    });

    it("College Counseling links to /academics/college-counseling", () => {
      const counseling = DEPARTMENTS.find((d) => d.name === "College Counseling");
      expect(counseling).toBeDefined();
      expect(counseling!.href).toBe("/academics/college-counseling");
    });
  });
});
