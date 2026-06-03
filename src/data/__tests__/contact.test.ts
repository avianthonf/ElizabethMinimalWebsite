import { describe, it, expect } from "vitest";
import {
  SCHOOL_ADDRESS,
  SCHOOL_CONTACT,
  GOOGLE_MAPS_EMBED_URL,
  CONTACT_FORM_FIELDS,
} from "../contact";

describe("Contact Data", () => {
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

  describe("CONTACT_FORM_FIELDS", () => {
    it("has 4 fields", () => {
      expect(CONTACT_FORM_FIELDS).toHaveLength(4);
    });

    it("all fields have name, label, type, and required flag", () => {
      for (const field of CONTACT_FORM_FIELDS) {
        expect(field.name).toBeTruthy();
        expect(field.label).toBeTruthy();
        expect(field.type).toBeTruthy();
        expect(typeof field.required).toBe("boolean");
      }
    });

    it("name and email are required, phone is not", () => {
      const nameField = CONTACT_FORM_FIELDS.find((f) => f.name === "name");
      const emailField = CONTACT_FORM_FIELDS.find((f) => f.name === "email");
      const phoneField = CONTACT_FORM_FIELDS.find((f) => f.name === "phone");
      expect(nameField!.required).toBe(true);
      expect(emailField!.required).toBe(true);
      expect(phoneField!.required).toBe(false);
    });
  });
});
