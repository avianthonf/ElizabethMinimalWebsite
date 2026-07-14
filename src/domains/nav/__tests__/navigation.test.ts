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
  it("has 7 header nav links including Home", () => {
    expect(HEADER_NAV_LINKS).toHaveLength(7);
  });

  it("all header links have text and href", () => {
    for (const link of HEADER_NAV_LINKS) {
      expect(link.text).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("header links match the seven top-level IA sections including Home", () => {
    const texts = HEADER_NAV_LINKS.map((l) => l.text);
    expect(texts).toContain("Home");
    expect(texts).toContain("About Us");
    expect(texts).toContain("Academics");
    expect(texts).toContain("Admissions");
    expect(texts).toContain("Beyond Academics");
    expect(texts).toContain("News & Media");
    expect(texts).toContain("Contact Us");
  });

  it("has 6 menu categories", () => {
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

  it("about us menu includes Headmistress's Message", () => {
    const about = MENU_CATEGORIES.find((c) => c.title === "ABOUT US")!;
    const texts = about.links.map((l) => l.text);
    expect(texts).toContain("Headmistress's Message");
  });

  it("academics menu includes Vocational Education", () => {
    const academics = MENU_CATEGORIES.find((c) => c.title === "ACADEMICS")!;
    const texts = academics.links.map((l) => l.text);
    expect(texts).toContain("Vocational Education");
  });

  it("beyond academics menu includes Prahari Club", () => {
    const beyond = MENU_CATEGORIES.find((c) => c.title === "BEYOND ACADEMICS")!;
    const texts = beyond.links.map((l) => l.text);
    expect(texts).toContain("Prahari Club");
  });

  it("admissions menu includes Relocating to Goa", () => {
    const admissions = MENU_CATEGORIES.find((c) => c.title === "ADMISSIONS")!;
    const texts = admissions.links.map((l) => l.text);
    expect(texts).toContain("Relocating to Goa?");
  });

  it("admissions menu includes Class 5 Entry", () => {
    const admissions = MENU_CATEGORIES.find((c) => c.title === "ADMISSIONS")!;
    const texts = admissions.links.map((l) => l.text);
    expect(texts).toContain("Class 5 Entry");
  });

  it("has 6 footer sections", () => {
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

  it("about us footer section includes Headmistress's Message", () => {
    const about = FOOTER_SECTIONS.find((s) => s.title === "About Us")!;
    const texts = about.links.map((l) => l.text);
    expect(texts).toContain("Headmistress's Message");
  });

  it("footer intro has heading and body with address", () => {
    expect(FOOTER_INTRO.heading).toBeTruthy();
    expect(FOOTER_INTRO.body.length).toBeGreaterThan(20);
    expect(FOOTER_INTRO.body).toContain("Ven. Fr. Hilario Gonsalves Rd");
    expect(FOOTER_INTRO.body).toContain("Pomburpa, Bardez");
    expect(FOOTER_INTRO.body).toContain("Goa 403511, India");
    expect(FOOTER_INTRO.body).toContain("st.elizabethgoa@gmail.com");
  });

  it("footer intro shows since 1954 not 1949", () => {
    expect(FOOTER_INTRO.body).toContain("1954");
    expect(FOOTER_INTRO.body).not.toContain("1949");
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
