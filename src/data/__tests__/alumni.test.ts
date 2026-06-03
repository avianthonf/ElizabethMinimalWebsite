import { describe, it, expect } from "vitest";
import { NOTABLE_ALUMNI, ALUMNI_EVENTS, ALUMNI_INTRO } from "../alumni";

describe("Alumni Data", () => {
  describe("NOTABLE_ALUMNI", () => {
    it("has 6 alumni", () => {
      expect(NOTABLE_ALUMNI).toHaveLength(6);
    });

    it("all alumni have name, class, and achievement", () => {
      for (const alum of NOTABLE_ALUMNI) {
        expect(alum.name).toBeTruthy();
        expect(alum.class.startsWith("Class of")).toBe(true);
        expect(alum.achievement.length).toBeGreaterThan(30);
      }
    });

    it("includes Dr. Rajesh Naik and Anthony Fernandes", () => {
      const names = NOTABLE_ALUMNI.map((a) => a.name);
      expect(names).toContain("Dr. Rajesh Naik");
      expect(names).toContain("Anthony Fernandes");
    });

    it("class years are valid (1988–2012 range for listed alumni)", () => {
      const years = NOTABLE_ALUMNI.map((a) => {
        const match = a.class.match(/Class of (\d{4})/);
        return match ? parseInt(match[1], 10) : null;
      });
      for (const year of years) {
        expect(year).not.toBeNull();
        expect(year!).toBeGreaterThanOrEqual(1988);
        expect(year!).toBeLessThanOrEqual(2012);
      }
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

  describe("ALUMNI_INTRO", () => {
    it("has heading and body", () => {
      expect(ALUMNI_INTRO.heading).toBeTruthy();
      expect(ALUMNI_INTRO.body.length).toBeGreaterThan(50);
    });

    it("heading references St. Elizabeth", () => {
      expect(ALUMNI_INTRO.heading).toContain("St. Elizabeth");
    });
  });
});
