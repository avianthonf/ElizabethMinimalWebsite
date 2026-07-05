import { describe, it, expect } from "vitest";
import {
  HEADER_NAV_LINKS,
  MENU_CATEGORIES,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_COPYRIGHT,
  FOOTER_SOCIAL_LINKS,
} from "../navigation.data";

describe("Navigation Data", () => {
  it("has 6 header nav links matching new IA", () => {
    expect(HEADER_NAV_LINKS).toHaveLength(6);
  });

  it("all header links have text and href", () => {
    for (const link of HEADER_NAV_LINKS) {
      expect(link.text).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("header links match the six top-level IA sections", () => {
    const texts = HEADER_NAV_LINKS.map((l) => l.text);
    expect(texts).toContain("About Us");
    expect(texts).toContain("Academics");
    expect(texts).toContain("Admissions");
    expect(texts).toContain("Beyond Academics");
    expect(texts).toContain("News & Media");
    expect(texts).toContain("Contact Us");
  });

  it("has 6 menu categories matching six IA sections", () => {
    expect(MENU_CATEGORIES).toHaveLength(6);
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

  it("menu categories use the correct uppercase titles", () => {
    const titles = MENU_CATEGORIES.map((c) => c.title);
    expect(titles).toContain("ABOUT US");
    expect(titles).toContain("ACADEMICS");
    expect(titles).toContain("ADMISSIONS");
    expect(titles).toContain("BEYOND ACADEMICS");
    expect(titles).toContain("NEWS & MEDIA");
    expect(titles).toContain("CONTACT US");
  });

  it("has 6 footer sections matching the new IA", () => {
    expect(FOOTER_SECTIONS).toHaveLength(6);
  });

  it("footer sections match the new IA titles", () => {
    const titles = FOOTER_SECTIONS.map((s) => s.title);
    expect(titles).toContain("About Us");
    expect(titles).toContain("Academics");
    expect(titles).toContain("Admissions");
    expect(titles).toContain("Beyond Academics");
    expect(titles).toContain("News & Media");
    expect(titles).toContain("Contact Us");
  });

  it("academics footer section has 5 links", () => {
    const academics = FOOTER_SECTIONS.find((s) => s.title === "Academics");
    expect(academics).toBeDefined();
    expect(academics!.links).toHaveLength(5);
  });

  it("academics footer section includes teaching methods and labs", () => {
    const academics = FOOTER_SECTIONS.find((s) => s.title === "Academics")!;
    const linkTexts = academics.links.map((l) => l.text);
    expect(linkTexts).toContain("Curriculum");
    expect(linkTexts).toContain("Teaching Methods");
    expect(linkTexts).toContain("Library");
    expect(linkTexts).toContain("Science Lab");
    expect(linkTexts).toContain("Computer Lab");
  });

  it("beyond academics footer section has 5 links", () => {
    const beyond = FOOTER_SECTIONS.find((s) => s.title === "Beyond Academics");
    expect(beyond).toBeDefined();
    expect(beyond!.links).toHaveLength(5);
  });

  it("footer intro has heading and body with address", () => {
    expect(FOOTER_INTRO.heading).toBeTruthy();
    expect(FOOTER_INTRO.body.length).toBeGreaterThan(20);
    expect(FOOTER_INTRO.body).toContain("Ven. Fr. Hilario Gonsalves Rd");
    expect(FOOTER_INTRO.body).toContain("Pomburpa, Bardez");
    expect(FOOTER_INTRO.body).toContain("Goa 403511, India");
    expect(FOOTER_INTRO.body).toContain("info@stelizabethhighschool.in");
  });

  it("footer copyright contains {year} placeholder", () => {
    expect(FOOTER_COPYRIGHT).toContain("{year}");
    expect(FOOTER_COPYRIGHT).toContain("St. Elizabeth's");
  });

  it("footer social links include facebook and instagram", () => {
    expect(FOOTER_SOCIAL_LINKS.length).toBeGreaterThanOrEqual(2);
    const platforms = FOOTER_SOCIAL_LINKS.map((l) => l.platform);
    expect(platforms).toContain("facebook");
    expect(platforms).toContain("instagram");
  });
});
