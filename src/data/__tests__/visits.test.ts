import { describe, it, expect } from "vitest";
import {
  VISIT_TYPES,
  SCHOOL_ADDRESS,
  SCHOOL_CONTACT,
  GOOGLE_MAPS_EMBED_URL,
} from "../visits";

describe("Visits Data", () => {
  describe("SCHOOL_ADDRESS", () => {
    it("has all 5 address fields", () => {
      expect(SCHOOL_ADDRESS.street).toBeTruthy();
      expect(SCHOOL_ADDRESS.area).toBeTruthy();
      expect(SCHOOL_ADDRESS.city).toBe("Goa");
      expect(SCHOOL_ADDRESS.pinCode).toBeTruthy();
      expect(SCHOOL_ADDRESS.country).toBe("India");
    });

    it("street contains the school road name", () => {
      expect(SCHOOL_ADDRESS.street).toContain("Ven. Fr. Hilario Gonsalves Rd");
    });

    it("area is Pomburpa, Bardez", () => {
      expect(SCHOOL_ADDRESS.area).toContain("Pomburpa");
      expect(SCHOOL_ADDRESS.area).toContain("Bardez");
    });
  });

  describe("SCHOOL_CONTACT", () => {
    it("has phone and email", () => {
      expect(SCHOOL_CONTACT.phone).toBeTruthy();
      expect(SCHOOL_CONTACT.email).toBeTruthy();
    });

    it("email is the correct school address", () => {
      expect(SCHOOL_CONTACT.email).toBe("info@stelizabethhighschool.in");
    });

    it("email contains @ symbol", () => {
      expect(SCHOOL_CONTACT.email).toContain("@");
    });
  });

  describe("GOOGLE_MAPS_EMBED_URL", () => {
    it("is a non-empty URL", () => {
      expect(GOOGLE_MAPS_EMBED_URL.length).toBeGreaterThan(10);
      expect(GOOGLE_MAPS_EMBED_URL.startsWith("https://")).toBe(true);
    });

    it("references St. Elizabeth in the query", () => {
      expect(GOOGLE_MAPS_EMBED_URL).toMatch(/St.*Elizabeth/i);
    });
  });

  describe("VISIT_TYPES", () => {
    it("has at least one visit type", () => {
      expect(VISIT_TYPES.length).toBeGreaterThan(0);
    });

    it("all visit types have id, label, and description", () => {
      for (const vt of VISIT_TYPES) {
        expect(vt.id).toBeTruthy();
        expect(vt.label).toBeTruthy();
        expect(vt.description.length).toBeGreaterThan(20);
      }
    });

    it("all visit types have unique ids", () => {
      const ids = VISIT_TYPES.map((vt) => vt.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("includes a campus tour visit type", () => {
      const labels = VISIT_TYPES.map((vt) => vt.label);
      expect(labels).toContain("Campus Tour");
    });
  });
});
