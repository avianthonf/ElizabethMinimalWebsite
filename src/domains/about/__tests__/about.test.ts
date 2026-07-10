import { describe, it, expect } from "vitest";
import {
  VISION,
  MISSION,
  VALUES,
  VALUES_INTRO,
  HISTORY_INTRO,
  HISTORY_TIMELINE,
  HISTORY_CLOSING,
  CATCHMENT_IDENTITY,
  MANAGEMENT_INTRO,
  MANAGEMENT_INFO,
  MANAGEMENT_CLOSING,
  STAFF_MEMBERS,
  FACULTY_HIGHLIGHTS,
  TEACHING_TEAM,
  TEACHER_DEVELOPMENT,
} from "../about.data";

describe("About Data", () => {
  describe("VISION", () => {
    it("has heading and body", () => {
      expect(VISION.heading).toBeTruthy();
      expect(VISION.body.length).toBeGreaterThan(20);
    });
    it("mentions happy, caring and stimulating environment", () => {
      expect(VISION.body).toContain("stimulating");
    });
  });

  describe("MISSION", () => {
    it("has heading and body", () => {
      expect(MISSION.heading).toBeTruthy();
      expect(MISSION.body.length).toBeGreaterThan(20);
    });
    it("mentions intellectually and spiritually well balanced", () => {
      expect(MISSION.body).toContain("spiritually");
    });
  });

  describe("VALUES", () => {
    it("has 5 values", () => {
      expect(VALUES).toHaveLength(5);
    });

    it("all values have title and description", () => {
      for (const v of VALUES) {
        expect(v.title).toBeTruthy();
        expect(v.description.length).toBeGreaterThan(20);
      }
    });

    it("values include Faith, Humility, Compassion, Selfless Service, Integrity", () => {
      const titles = VALUES.map((v) => v.title);
      expect(titles).toContain("Faith");
      expect(titles).toContain("Humility");
      expect(titles).toContain("Compassion");
      expect(titles).toContain("Selfless Service");
      expect(titles).toContain("Integrity");
    });
  });

  describe("VALUES_INTRO", () => {
    it("has heading and body", () => {
      expect(VALUES_INTRO.heading).toBeTruthy();
      expect(VALUES_INTRO.body.length).toBeGreaterThan(20);
    });
    it("references St. Elizabeth of Hungary", () => {
      expect(VALUES_INTRO.body).toContain("St. Elizabeth of Hungary");
    });
  });

  describe("HISTORY_INTRO", () => {
    it("has heading and body", () => {
      expect(HISTORY_INTRO.heading).toBeTruthy();
      expect(HISTORY_INTRO.body.length).toBeGreaterThan(20);
    });
  });

  describe("HISTORY_TIMELINE", () => {
    it("has 3 entries", () => {
      expect(HISTORY_TIMELINE).toHaveLength(3);
    });

    it("all entries have year and event", () => {
      for (const entry of HISTORY_TIMELINE) {
        expect(entry.year).toBeTruthy();
        expect(entry.event.length).toBeGreaterThan(20);
      }
    });

    it("first entry is 1954 founding", () => {
      expect(HISTORY_TIMELINE[0].year).toBe("1954");
      expect(HISTORY_TIMELINE[0].event).toContain("Pomburpa");
    });

    it("last entry is 1982", () => {
      expect(HISTORY_TIMELINE[2].year).toBe("1982");
    });
  });

  describe("HISTORY_CLOSING", () => {
    it("has body with key facts", () => {
      expect(HISTORY_CLOSING.body.length).toBeGreaterThan(50);
      expect(HISTORY_CLOSING.body).toContain("Article 30(1)");
    });
  });

  describe("MANAGEMENT_INFO", () => {
    it("has 4 items", () => {
      expect(MANAGEMENT_INFO).toHaveLength(4);
    });
    it("references Diocesan Society of Education", () => {
      expect(MANAGEMENT_INFO[0]).toContain("Diocesan Society of Education");
    });
  });

  describe("STAFF_MEMBERS", () => {
    it("has 3 members", () => {
      expect(STAFF_MEMBERS).toHaveLength(3);
    });

    it("all members have role, department, and description", () => {
      for (const member of STAFF_MEMBERS) {
        expect(member.role).toBeTruthy();
        expect(member.department).toBeTruthy();
        expect(member.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Manager, Headmistress, and PTA Chairman", () => {
      const roles = STAFF_MEMBERS.map((m) => m.role);
      expect(roles).toContain("Manager");
      expect(roles).toContain("Headmistress");
      expect(roles).toContain("PTA Chairman");
    });
  });

  describe("MANAGEMENT_INTRO", () => {
    it("has heading and body", () => {
      expect(MANAGEMENT_INTRO.heading).toBeTruthy();
      expect(MANAGEMENT_INTRO.body.length).toBeGreaterThan(20);
    });
  });

  describe("MANAGEMENT_CLOSING", () => {
    it("has body", () => {
      expect(MANAGEMENT_CLOSING.body.length).toBeGreaterThan(20);
    });
  });

  describe("FACULTY_HIGHLIGHTS", () => {
    it("has heading and body", () => {
      expect(FACULTY_HIGHLIGHTS.heading).toBeTruthy();
      expect(FACULTY_HIGHLIGHTS.body.length).toBeGreaterThan(30);
    });

    it("mentions 12 teachers", () => {
      expect(FACULTY_HIGHLIGHTS.body).toContain("12 teachers");
    });
  });

  describe("CATCHMENT_IDENTITY", () => {
    it("has heading and body", () => {
      expect(CATCHMENT_IDENTITY.heading).toBeTruthy();
      expect(CATCHMENT_IDENTITY.body.length).toBeGreaterThan(50);
    });

    it("mentions Pomburpa and DSE", () => {
      expect(CATCHMENT_IDENTITY.body).toContain("Pomburpa");
      expect(CATCHMENT_IDENTITY.body).toContain("Diocesan Society of Education");
    });

    it("has 4 village highlights", () => {
      expect(CATCHMENT_IDENTITY.villageHighlights).toHaveLength(4);
    });
  });

  describe("TEACHING_TEAM", () => {
    it("has heading, intro, and categories", () => {
      expect(TEACHING_TEAM.heading).toBeTruthy();
      expect(TEACHING_TEAM.intro.length).toBeGreaterThan(30);
    });

    it("has 5 faculty categories", () => {
      expect(TEACHING_TEAM.categories).toHaveLength(5);
    });

    it("categories include Science and Mathematics", () => {
      const names = TEACHING_TEAM.categories.map((c) => c.name);
      expect(names).toContain("Science Faculty");
      expect(names).toContain("Mathematics Faculty");
    });
  });

  describe("TEACHER_DEVELOPMENT", () => {
    it("has heading and body", () => {
      expect(TEACHER_DEVELOPMENT.heading).toBeTruthy();
      expect(TEACHER_DEVELOPMENT.body.length).toBeGreaterThan(30);
    });

    it("mentions SCERT Goa and DSE", () => {
      expect(TEACHER_DEVELOPMENT.body).toContain("SCERT");
      expect(TEACHER_DEVELOPMENT.body).toContain("DSE");
    });
  });
});
