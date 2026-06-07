import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WalkerHomepage } from "./WalkerHomepage";

// Mock the horizontal scroll components (they use client-side APIs)
vi.mock("@/components/HorizontalScroll", () => ({
  HorizontalScroll: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="horizontal-scroll">{children}</div>
  ),
  HorizontalPage: ({ children }: { children: React.ReactNode; screen?: boolean; width?: string }) => (
    <div data-testid="horizontal-page">{children}</div>
  ),
}));

// Mock LoadOverlay — renders normally, onComplete is tested indirectly
// by checking that content behind the overlay gate still renders
vi.mock("@/components/LoadOverlay", () => ({
  LoadOverlay: () => <div data-testid="load-overlay" />,
}));

// Mock MenuOverlay (uses browser APIs)
vi.mock("@/components/navigation/MenuOverlay", () => ({
  MenuOverlay: () => <div data-testid="menu-overlay" />,
}));

// Mock Header (uses browser APIs)
vi.mock("@/components/navigation/Header", () => ({
  Header: () => <header data-testid="header" />,
}));

// Mock HeaderThemeController (uses document/window)
vi.mock("@/components/HeaderThemeController", () => ({
  HeaderThemeController: () => null,
}));

// Mock next/image (used by ImageCard)
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock data modules
vi.mock("@/data/homepage", () => ({
  HERO_CONTENT: {
    statement: "St. Elizabeth's High School inspires transformative learning...",
    heading: "Nurturing Hearts",
    loadOverlayText: "WE BELIEVE",
  },
  VALUES: [
    { number: "01", title: "Faith", body: "In God we trust, in Truth we stand..." },
    { number: "02", title: "Excellence", body: "Academic rigor and holistic growth..." },
    { number: "03", title: "Community", body: "Inclusive, nurturing, and committed..." },
  ],
  STATS: [
    { value: "1949", label: "Founded", description: "Over seven decades of educational excellence." },
    { value: "1200+", label: "Students", description: "A vibrant student body." },
    { value: "CBSE", label: "Affiliated", description: "CBSE curriculum." },
  ],
  TESTIMONIALS: [
    { quote: "St. Elizabeth shaped me into the person I am today.", attribution: "Alumni, Class of 2020", role: "alumni" as const },
    { quote: "The teachers here don't just teach — they inspire.", attribution: "Current Student, Class XII", role: "student" as const },
    { quote: "A nurturing environment where every child finds their voice.", attribution: "Parent of Class VIII Student", role: "parent" as const },
  ],
  CTA_CONTENT: {
    heading: "Ready to Join Our Community?",
    description: "Start your St. Elizabeth journey today.",
    primaryCTA: { text: "Inquire Now" as const, href: "/admissions" as const },
    secondaryCTA: { text: "Plan a Visit" as const, href: "/contact/visit" as const },
  },
  LATEST_NEWS: [
    { title: "Annual Day Celebration 2024", date: "November 15, 2024", excerpt: "Students, staff, and families gathered...", imageFilename: "test.jpg", href: "/news/1" },
    { title: "Sports Meet XXII — A Display of Spirit", date: "November 22, 2024", excerpt: "Houses competed with passion...", imageFilename: "test.jpg", href: "/news/2" },
    { title: "Feast Day Celebrations at St. Elizabeth", date: "November 19, 2024", excerpt: "The school community came together...", imageFilename: "test.jpg", href: "/news/3" },
  ],
}));

vi.mock("@/data/navigation", () => ({
  HEADER_NAV_LINKS: [
    { text: "About", href: "/about" },
    { text: "Admissions", href: "/admissions" },
    { text: "Academics", href: "/academics" },
    { text: "Athletics", href: "/athletics" },
    { text: "Arts", href: "/arts" },
    { text: "Student Life", href: "/student-life" },
    { text: "Alumni", href: "/alumni" },
    { text: "News", href: "/news" },
    { text: "Contact", href: "/contact" },
  ],
  FOOTER_SECTIONS: [
    { title: "About", links: [{ text: "Mission", href: "/about/mission" }] },
  ],
  FOOTER_INTRO: { heading: "St. Elizabeth's High School", body: "Guiding Minds..." },
  FOOTER_SOCIAL_LINKS: [],
  FOOTER_COPYRIGHT: "© 2026 St. Elizabeth's High School",
  MENU_CATEGORIES: [
    { title: "ABOUT", links: [{ text: "Mission & Values", href: "/about/mission" }] },
  ],
}));

vi.mock("@/data/images", () => ({
  HERO_IMAGES: [
    { filename: "DSC07580.jpg", alt: "Hero image", section: "homepage-hero" },
    { filename: "DSC07548.jpg", alt: "About hero image", section: "about-hero" },
    { filename: "DSC07360.jpg", alt: "Admissions hero image", section: "admissions-hero" },
  ],
  HOMEPAGE_GRID_IMAGES: [
    { filename: "DSC07290.jpg", alt: "Grid image", category: "community", section: "homepage-grid" },
    { filename: "DSC07292.jpg", alt: "Grid image", category: "student-life", section: "homepage-grid" },
    { filename: "DSC07294.jpg", alt: "Grid image", category: "student-life", section: "homepage-grid" },
    { filename: "DSC07300.jpg", alt: "Grid image", category: "community", section: "homepage-grid" },
    { filename: "DSC07301.jpg", alt: "Grid image", category: "athletics", section: "homepage-grid" },
    { filename: "DSC07305.jpg", alt: "Grid image", category: "athletics", section: "homepage-grid" },
    { filename: "DSC07317.jpg", alt: "Grid image", category: "general", section: "homepage-grid" },
    { filename: "DSC07328.jpg", alt: "Grid image", category: "academics", section: "homepage-grid" },
    { filename: "DSC07335.jpg", alt: "Grid image", category: "student-life", section: "homepage-grid" },
    { filename: "DSC07346.jpg", alt: "Grid image", category: "student-life", section: "homepage-grid" },
    { filename: "DSC07351.jpg", alt: "Grid image", category: "student-life", section: "homepage-grid" },
    { filename: "DSC07370.jpg", alt: "Grid image", category: "community", section: "homepage-grid" },
  ],
  HOMEPAGE_GRID_HERO_FILENAMES: ["DSC07290.jpg", "DSC07301.jpg"],
  VALUES_IMAGES: {
    faith: { filename: "DSC07463.jpg", alt: "Faith heritage image" },
    excellence: { filename: "DSC07497.jpg", alt: "Excellence academic image" },
    community: { filename: "DSC07378.jpg", alt: "Community gathering image" },
  },
  ACADEMICS_HERO: { filename: "DSC07576.jpg", alt: "Academics hero" },
  ATHLETICS_IMAGES: [{ filename: "DSC07495.jpg", alt: "Athletics" }],
  ARTS_IMAGES: [{ filename: "DSC07565.jpg", alt: "Arts" }],
  STUDENT_LIFE_IMAGES: [{ filename: "DSC07504.jpg", alt: "Student Life" }],
  COMMUNITY_IMAGES: [
    { filename: "DSC07619.jpg", alt: "Community" },
    { filename: "DSC07469.jpg", alt: "Community 2" },
  ],
  CONTACT_IMAGES: [{ filename: "DSC07557.jpg", alt: "Contact" }],
  NEWS_IMAGES: [{ filename: "DSC07504.jpg", alt: "News" }],
}));

describe("WalkerHomepage", () => {
  it("renders the LoadOverlay", () => {
    render(<WalkerHomepage />);
    expect(screen.getByTestId("load-overlay")).toBeDefined();
  });

  it("renders the HorizontalScroll", () => {
    render(<WalkerHomepage />);
    expect(screen.getByTestId("horizontal-scroll")).toBeDefined();
  });

  it("renders the hero heading from data", () => {
    render(<WalkerHomepage />);
    expect(
      screen.getByText("Nurturing Hearts")
    ).toBeDefined();
  });

  it("renders all three value cards", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText("Faith")).toBeDefined();
    expect(screen.getByText("Excellence")).toBeDefined();
    // "Community" appears in both value cards and footer — use getAllByText
    expect(screen.getAllByText("Community").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the We Believe eyebrow text", () => {
    render(<WalkerHomepage />);
    const eyebrows = screen.getAllByText("We Believe");
    expect(eyebrows.length).toBeGreaterThan(0);
  });

  it("renders all three testimonials", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText(/St. Elizabeth shaped me/)).toBeDefined();
    expect(screen.getByText(/The teachers here/)).toBeDefined();
    expect(screen.getByText(/A nurturing environment/)).toBeDefined();
  });

  it("renders CTA buttons", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText("Inquire Now")).toBeDefined();
    expect(screen.getByText("Plan a Visit")).toBeDefined();
  });

  it("renders news items", () => {
    render(<WalkerHomepage />);
    expect(screen.getByText("Annual Day Celebration 2024")).toBeDefined();
    expect(screen.getByText("Sports Meet XXII — A Display of Spirit")).toBeDefined();
    expect(screen.getByText("Feast Day Celebrations at St. Elizabeth")).toBeDefined();
  });

  it("renders the MenuOverlay", () => {
    render(<WalkerHomepage />);
    expect(screen.getByTestId("menu-overlay")).toBeDefined();
  });
});
