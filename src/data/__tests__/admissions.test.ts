import { describe, it, expect } from "vitest";
import {
  WHY_ST_ELIZABETH_POINTS,
  ADMISSION_STEPS,
  FAQS,
  TUITION_INFO,
} from "../admissions";

describe("Admissions Data", () => {
  describe("WHY_ST_ELIZABETH_POINTS", () => {
    it("has 5 points", () => {
      expect(WHY_ST_ELIZABETH_POINTS).toHaveLength(5);
    });

    it("all points have title and description", () => {
      for (const point of WHY_ST_ELIZABETH_POINTS) {
        expect(point.title).toBeTruthy();
        expect(point.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Academic Excellence and Values-Based Education", () => {
      const titles = WHY_ST_ELIZABETH_POINTS.map((p) => p.title);
      expect(titles).toContain("Academic Excellence");
      expect(titles).toContain("Values-Based Education");
    });
  });

  describe("ADMISSION_STEPS", () => {
    it("has 6 steps", () => {
      expect(ADMISSION_STEPS).toHaveLength(6);
    });

    it("steps are numbered 1 through 6 sequentially", () => {
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

    it("first step is Inquire, last step is Enroll", () => {
      expect(ADMISSION_STEPS[0].title).toBe("Inquire");
      expect(ADMISSION_STEPS[5].title).toBe("Enroll");
    });
  });

  describe("FAQS", () => {
    it("has 7 questions", () => {
      expect(FAQS).toHaveLength(7);
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
});
