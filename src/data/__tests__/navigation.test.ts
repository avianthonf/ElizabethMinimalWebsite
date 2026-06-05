import { describe, it, expect } from "vitest";
import {
  HEADER_NAV_LINKS,
  MENU_CATEGORIES,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_COPYRIGHT,
  FOOTER_SOCIAL_LINKS,
} from "../navigation";

describe("Navigation Data", () => {
  it("has 9 header nav links", () => {
    expect(HEADER_NAV_LINKS).toHaveLength(9);
  });

  it("all header links have text and href", () => {
    for (const link of HEADER_NAV_LINKS) {
      expect(link.text).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("has 10 menu categories", () => {
    expect(MENU_CATEGORIES).toHaveLength(10);
  });

  it("each menu category has title and at least one link", () => {
    for (const cat of MENU_CATEGORIES) {
      expect(cat.title).toBeTruthy();
      expect(cat.links.length).toBeGreaterThan(0);
      for (const link of cat.links) {
        expect(link.text).toBeTruthy();
        expect(link.href).toBeTruthy();
      }
    }
  });

  it("has 4 footer sections", () => {
    expect(FOOTER_SECTIONS).toHaveLength(4);
  });

  it("academics section has 4 links including College Counseling", () => {
    const academics = FOOTER_SECTIONS.find((s) => s.title === "Academics");
    expect(academics).toBeDefined();
    expect(academics!.links).toHaveLength(4);
    const counseling = academics!.links.find((l) => l.text === "College Counseling");
    expect(counseling).toBeDefined();
    expect(counseling!.href).toBe("/academics/college-counseling");
  });

  it("community section has 6 links including How to Help", () => {
    const community = FOOTER_SECTIONS.find((s) => s.title === "Community");
    expect(community).toBeDefined();
    expect(community!.links).toHaveLength(6);
    const howToHelp = community!.links.find((l) => l.text === "How to Help");
    expect(howToHelp).toBeDefined();
    expect(howToHelp!.href).toBe("/how-to-help");
  });

  it("footer intro has heading and body with address", () => {
    expect(FOOTER_INTRO.heading).toBeTruthy();
    expect(FOOTER_INTRO.body.length).toBeGreaterThan(20);
    expect(FOOTER_INTRO.body).toContain("Ven. Fr. Hilario Gonsalves Rd");
    expect(FOOTER_INTRO.body).toContain("Pomburpa, Bardez");
    expect(FOOTER_INTRO.body).toContain("Goa 403511, India");
    expect(FOOTER_INTRO.body).toContain("info@stelizabethhighschool.in");
  });

  it("footer copyright includes current or future year", () => {
    expect(FOOTER_COPYRIGHT).toMatch(/©\s*\d{4}/);
  });

  it("footer social links include facebook and instagram", () => {
    expect(FOOTER_SOCIAL_LINKS.length).toBeGreaterThanOrEqual(2);
    const platforms = FOOTER_SOCIAL_LINKS.map((l) => l.platform);
    expect(platforms).toContain("facebook");
    expect(platforms).toContain("instagram");
  });
});
