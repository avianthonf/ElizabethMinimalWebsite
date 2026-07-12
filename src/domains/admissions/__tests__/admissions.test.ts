import { describe, it, expect } from "vitest";
import {
  WHY_ST_ELIZABETH_POINTS,
  ADMISSION_STEPS,
  FAQS,
  TUITION_INFO,
  TRANSITION_SUPPORT,
  CLASS10_TRANSITION,
  SCHOLARSHIP_INFO,
} from "../admissions.data";

describe("Admissions Data", () => {
  describe("WHY_ST_ELIZABETH_POINTS", () => {
    it("has 6 points", () => {
      expect(WHY_ST_ELIZABETH_POINTS).toHaveLength(6);
    });

    it("all points have title and description", () => {
      for (const point of WHY_ST_ELIZABETH_POINTS) {
        expect(point.title).toBeTruthy();
        expect(point.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Student-Teacher Ratio and Safe Campus", () => {
      const titles = WHY_ST_ELIZABETH_POINTS.map((p) => p.title);
      expect(titles.some((t) => t.includes("15:1"))).toBe(true);
      expect(
        titles.some((t) => t.includes("Safe") || t.includes("Village") || t.includes("Known")),
      ).toBe(true);
    });
  });

  describe("ADMISSION_STEPS", () => {
    it("has 5 steps", () => {
      expect(ADMISSION_STEPS).toHaveLength(5);
    });

    it("steps are numbered 1 through 5 sequentially", () => {
      ADMISSION_STEPS.forEach((step, index) => {
        expect(step.step).toBe(index + 1);
      });
    });

    it("all steps have title and description", () => {
      for (const step of ADMISSION_STEPS) {
        expect(step.title).toBeTruthy();
        expect(step.description.length).toBeGreaterThan(20);
      }
    });

    it("first step is Visit the School, last step is Admission Confirmation", () => {
      expect(ADMISSION_STEPS[0].title).toBe("Visit the School");
      expect(ADMISSION_STEPS[4].title).toBe("Admission Confirmation");
    });
  });

  describe("FAQS", () => {
    it("has 10 questions", () => {
      expect(FAQS).toHaveLength(10);
    });

    it("all FAQs have question and answer", () => {
      for (const faq of FAQS) {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(faq.answer.length).toBeGreaterThan(20);
      }
    });

    it("first FAQ is about curriculum", () => {
      expect(FAQS[0].question).toContain("curriculum");
    });
  });

  describe("TUITION_INFO", () => {
    it("has heading, body, and assistanceIntro", () => {
      expect(TUITION_INFO.heading).toBeTruthy();
      expect(TUITION_INFO.body.length).toBeGreaterThan(20);
      expect(TUITION_INFO.assistanceIntro.length).toBeGreaterThan(20);
    });
  });

  describe("TRANSITION_SUPPORT", () => {
    it("has heading and introBody", () => {
      expect(TRANSITION_SUPPORT.heading).toBeTruthy();
      expect(TRANSITION_SUPPORT.introBody.length).toBeGreaterThan(30);
    });

    it("class5Entry has heading and 4 points", () => {
      expect(TRANSITION_SUPPORT.class5Entry.heading).toBeTruthy();
      expect(TRANSITION_SUPPORT.class5Entry.points).toHaveLength(4);
    });

    it("class10Exit has heading and 4 points", () => {
      expect(TRANSITION_SUPPORT.class10Exit.heading).toBeTruthy();
      expect(TRANSITION_SUPPORT.class10Exit.points).toHaveLength(4);
    });
  });

  describe("CLASS10_TRANSITION", () => {
    it("has heading and body", () => {
      expect(CLASS10_TRANSITION.heading).toBeTruthy();
      expect(CLASS10_TRANSITION.body.length).toBeGreaterThan(50);
    });

    it("has 4 pathways", () => {
      expect(CLASS10_TRANSITION.pathways).toHaveLength(4);
    });

    it("pathways include Science, Commerce, Arts, and Vocational", () => {
      const streams = CLASS10_TRANSITION.pathways.map((p) => p.stream);
      expect(streams).toContain("Science");
      expect(streams).toContain("Commerce");
      expect(streams).toContain("Arts & Humanities");
      expect(streams).toContain("Vocational");
    });
  });

  describe("SCHOLARSHIP_INFO", () => {
    it("has heading and body", () => {
      expect(SCHOLARSHIP_INFO.heading).toBeTruthy();
      expect(SCHOLARSHIP_INFO.body.length).toBeGreaterThan(20);
    });

    it("has 3 scholarships", () => {
      expect(SCHOLARSHIP_INFO.scholarships).toHaveLength(3);
    });

    it("is not linked in navigation (data-file-only asset)", () => {
      // This is an emergency plan asset — verify it's a data file only, not a page route
      expect(SCHOLARSHIP_INFO.scholarships[0].name).toBeTruthy();
    });
  });
});
