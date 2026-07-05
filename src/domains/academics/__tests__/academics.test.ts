import { describe, it, expect } from "vitest";
import {
  DEPARTMENTS,
  LANGUAGE_PROGRAMS,
  LIBRARY_RESOURCES,
  COLLEGE_COUNSELING_STEPS,
} from "../academics.data";

describe("Academics Data", () => {
  describe("DEPARTMENTS", () => {
    it("has 9 departments matching new IA", () => {
      expect(DEPARTMENTS).toHaveLength(9);
    });

    it("all departments have name, description, icon, and href", () => {
      for (const dept of DEPARTMENTS) {
        expect(dept.name).toBeTruthy();
        expect(dept.description.length).toBeGreaterThan(20);
        expect(dept.icon).toBeTruthy();
        expect(dept.href.startsWith("/")).toBe(true);
      }
    });

    it("includes core academic subjects", () => {
      const names = DEPARTMENTS.map((d) => d.name);
      expect(names).toContain("Science");
      expect(names).toContain("Mathematics");
      expect(names).toContain("English");
      expect(names).toContain("Social Studies");
    });

    it("includes teaching methods and facilities", () => {
      const names = DEPARTMENTS.map((d) => d.name);
      expect(names).toContain("Teaching Methods");
      expect(names).toContain("Library");
      expect(names).toContain("Resource Room");
      expect(names).toContain("Science Laboratory");
      expect(names).toContain("Computer Laboratory");
    });

    it("Science Laboratory links to /academics/science-laboratory", () => {
      const lab = DEPARTMENTS.find((d) => d.name === "Science Laboratory");
      expect(lab).toBeDefined();
      expect(lab!.href).toBe("/academics/science-laboratory");
    });

    it("Teaching Methods links to /academics/teaching-methods", () => {
      const tm = DEPARTMENTS.find((d) => d.name === "Teaching Methods");
      expect(tm).toBeDefined();
      expect(tm!.href).toBe("/academics/teaching-methods");
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
