import { describe, it, expect } from "vitest";
import { DEPARTMENTS, LANGUAGE_PROGRAMS, LIBRARY_RESOURCES, COLLEGE_COUNSELING_STEPS, type Department, type LanguageProgram, type LibraryResource, type CollegeCounselingStep } from "../academics";

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

  describe("LANGUAGE_PROGRAMS", () => {
    it("has exactly 4 language programs", () => {
      expect(LANGUAGE_PROGRAMS).toHaveLength(4);
    });

    it("all programs have name and description", () => {
      for (const program of LANGUAGE_PROGRAMS) {
        expect(program.name).toBeTruthy();
        expect(program.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Hindi, Konkani, Sanskrit, and English", () => {
      const names = LANGUAGE_PROGRAMS.map((p) => p.name);
      expect(names).toContain("Hindi");
      expect(names).toContain("Konkani");
      expect(names).toContain("Sanskrit");
      expect(names).toContain("English");
    });
  });

  describe("LIBRARY_RESOURCES", () => {
    it("has exactly 4 library resources", () => {
      expect(LIBRARY_RESOURCES).toHaveLength(4);
    });

    it("all resources have title and description", () => {
      for (const resource of LIBRARY_RESOURCES) {
        expect(resource.title).toBeTruthy();
        expect(resource.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Physical Collection, Digital Resources, Reading Programmes, and Study Spaces", () => {
      const titles = LIBRARY_RESOURCES.map((r) => r.title);
      expect(titles).toContain("Physical Collection");
      expect(titles).toContain("Digital Resources");
      expect(titles).toContain("Reading Programmes");
      expect(titles).toContain("Study Spaces");
    });
  });

  describe("COLLEGE_COUNSELING_STEPS", () => {
    it("has exactly 4 counseling steps", () => {
      expect(COLLEGE_COUNSELING_STEPS).toHaveLength(4);
    });

    it("all steps have title and description", () => {
      for (const step of COLLEGE_COUNSELING_STEPS) {
        expect(step.title).toBeTruthy();
        expect(step.description.length).toBeGreaterThan(20);
      }
    });

    it("includes University Guidance, Application Support, Entrance Exam Preparation, and Career Exploration", () => {
      const titles = COLLEGE_COUNSELING_STEPS.map((s) => s.title);
      expect(titles).toContain("University Guidance");
      expect(titles).toContain("Application Support");
      expect(titles).toContain("Entrance Exam Preparation");
      expect(titles).toContain("Career Exploration");
    });
  });
});
