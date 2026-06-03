import { describe, it, expect } from "vitest";
import {
  MISSION_STATEMENT,
  HISTORY_TIMELINE,
  STAFF_MEMBERS,
  STRATEGIC_PLAN_POINTS,
} from "../about";

describe("About Data", () => {
  describe("MISSION_STATEMENT", () => {
    it("has heading and body", () => {
      expect(MISSION_STATEMENT.heading).toBeTruthy();
      expect(MISSION_STATEMENT.body.length).toBeGreaterThan(50);
    });

    it("has 4 values", () => {
      expect(MISSION_STATEMENT.values).toHaveLength(4);
    });

    it("all values have title and description", () => {
      for (const v of MISSION_STATEMENT.values) {
        expect(v.title).toBeTruthy();
        expect(v.description.length).toBeGreaterThan(20);
      }
    });

    it("values include Truth and Honesty and Academic Excellence", () => {
      const titles = MISSION_STATEMENT.values.map((v) => v.title);
      expect(titles).toContain("Truth and Honesty");
      expect(titles).toContain("Academic Excellence");
      expect(titles).toContain("Faith in Action");
      expect(titles).toContain("Community & Service");
    });
  });

  describe("HISTORY_TIMELINE", () => {
    it("has 5 entries", () => {
      expect(HISTORY_TIMELINE).toHaveLength(5);
    });

    it("all entries have year and event", () => {
      for (const entry of HISTORY_TIMELINE) {
        expect(entry.year).toBeTruthy();
        expect(entry.event.length).toBeGreaterThan(20);
      }
    });

    it("first entry is 1949 founding", () => {
      expect(HISTORY_TIMELINE[0].year).toBe("1949");
      expect(HISTORY_TIMELINE[0].event).toContain("Pomburpa");
    });

    it("last entry is Today", () => {
      expect(HISTORY_TIMELINE[4].year).toBe("Today");
    });
  });

  describe("STAFF_MEMBERS", () => {
    it("has 3 members", () => {
      expect(STAFF_MEMBERS).toHaveLength(3);
    });

    it("all members have name, title, and description", () => {
      for (const member of STAFF_MEMBERS) {
        expect(member.name).toBeTruthy();
        expect(member.title).toBeTruthy();
        expect(member.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Board of Trustees", () => {
      const trustees = STAFF_MEMBERS.find((m) => m.name === "Board of Trustees");
      expect(trustees).toBeDefined();
      expect(trustees!.title).toBe("Governance");
    });
  });

  describe("STRATEGIC_PLAN_POINTS", () => {
    it("has 4 points", () => {
      expect(STRATEGIC_PLAN_POINTS).toHaveLength(4);
    });

    it("all points have title and description", () => {
      for (const point of STRATEGIC_PLAN_POINTS) {
        expect(point.title).toBeTruthy();
        expect(point.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Academic Innovation and Sustainability", () => {
      const titles = STRATEGIC_PLAN_POINTS.map((p) => p.title);
      expect(titles).toContain("Academic Innovation");
      expect(titles).toContain("Sustainability");
    });
  });
});
