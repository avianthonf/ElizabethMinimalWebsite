import { describe, it, expect } from "vitest";
import {
  ALUMNI_INTRO,
  ALUMNI_NETWORK,
  ALUMNI_STATISTICS,
  ALUMNI_TESTIMONIALS,
  ALUMNI_EVENTS,
} from "../alumni.data";

describe("Alumni Data", () => {
  describe("ALUMNI_INTRO", () => {
    it("has heading and body", () => {
      expect(ALUMNI_INTRO.heading).toBeTruthy();
      expect(ALUMNI_INTRO.body.length).toBeGreaterThan(50);
    });

    it("heading references St. Elizabeth", () => {
      expect(ALUMNI_INTRO.heading).toContain("St. Elizabeth");
    });
  });

  describe("ALUMNI_NETWORK", () => {
    it("has heading, body, and cta", () => {
      expect(ALUMNI_NETWORK.heading).toBeTruthy();
      expect(ALUMNI_NETWORK.body.length).toBeGreaterThan(50);
      expect(ALUMNI_NETWORK.cta.text).toBeTruthy();
      expect(ALUMNI_NETWORK.cta.href).toBeTruthy();
    });
  });

  describe("ALUMNI_STATISTICS", () => {
    it("has 3 statistics", () => {
      expect(ALUMNI_STATISTICS).toHaveLength(3);
    });

    it("all stats have value, label, and description", () => {
      for (const stat of ALUMNI_STATISTICS) {
        expect(stat.value).toBeTruthy();
        expect(stat.label).toBeTruthy();
        expect(stat.description.length).toBeGreaterThan(10);
      }
    });
  });

  describe("ALUMNI_TESTIMONIALS", () => {
    it("has 3 alumni testimonials", () => {
      expect(ALUMNI_TESTIMONIALS).toHaveLength(3);
    });

    it("has testimonial quotes and names", () => {
      expect(ALUMNI_TESTIMONIALS[0].quote.length).toBeGreaterThan(50);
      expect(ALUMNI_TESTIMONIALS[0].name).toBeTruthy();
    });
  });

  describe("ALUMNI_EVENTS", () => {
    it("has 3 events", () => {
      expect(ALUMNI_EVENTS).toHaveLength(3);
    });

    it("all events have title, date, description, and location", () => {
      for (const event of ALUMNI_EVENTS) {
        expect(event.title).toBeTruthy();
        expect(event.date).toBeTruthy();
        expect(event.description.length).toBeGreaterThan(20);
        expect(event.location).toBeTruthy();
      }
    });

    it("includes Annual Alumni Reunion", () => {
      const reunion = ALUMNI_EVENTS.find((e) => e.title === "Annual Alumni Reunion");
      expect(reunion).toBeDefined();
      expect(reunion!.date).toBe("December 28, 2026");
    });
  });
});
