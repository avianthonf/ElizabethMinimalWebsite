import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HeroCarousel } from "./HeroCarousel";
import type { HeroSlide } from "@/data/homepage-sections";

const mockSlides: HeroSlide[] = [
  {
    tagline: "Est. 1949",
    heading: "Nurturing Hearts, Building Futures",
    imageFilename: "DSC07397.jpg",
    imageAlt: "St. Elizabeth's campus main building",
    ctaText: "Learn more",
    ctaHref: "/about",
  },
  {
    tagline: "Academics",
    heading: "Academic Excellence",
    imageFilename: "DSC07460.jpg",
    imageAlt: "Students in classroom",
    ctaText: "Academics",
    ctaHref: "/academics",
  },
];

describe("HeroCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the carousel region with proper ARIA", () => {
    render(<HeroCarousel slides={mockSlides} ariaLabel="Featured highlights" />);
    const region = screen.getByRole("region", { name: /featured highlights/i });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("renders all slides with proper role and label", () => {
    render(<HeroCarousel slides={mockSlides} ariaLabel="Hero" />);
    const slides = screen.getAllByRole("group");
    // Each slide is announced as "Slide N of M: <heading>"
    expect(slides[0]).toHaveAttribute("aria-roledescription", "slide");
    expect(slides[0]).toHaveAttribute("aria-label", expect.stringMatching(/slide 1 of 2/i));
    expect(slides[1]).toHaveAttribute("aria-label", expect.stringMatching(/slide 2 of 2/i));
  });

  it("renders the first slide heading as visible text", () => {
    render(<HeroCarousel slides={mockSlides} />);
    expect(screen.getByText("Nurturing Hearts, Building Futures")).toBeInTheDocument();
  });

  it("renders navigation dots for each slide", () => {
    render(<HeroCarousel slides={mockSlides} />);
    // Each dot is a tab in a tablist
    const tablist = screen.getByRole("tablist", { name: /carousel navigation/i });
    const tabs = tablist.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(2);
  });

  it("marks the first dot as selected initially", () => {
    render(<HeroCarousel slides={mockSlides} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
  });

  it("renders slides with distinct alt text (LCP-friendly)", () => {
    render(<HeroCarousel slides={mockSlides} />);
    // Each slide image has a distinct, descriptive alt (not "image1", "image2", etc.)
    expect(screen.getByAltText("St. Elizabeth's campus main building")).toBeInTheDocument();
    expect(screen.getByAltText("Students in classroom")).toBeInTheDocument();
  });

  it("renders the correct number of images matching slide count", () => {
    render(<HeroCarousel slides={mockSlides} />);
    expect(screen.getAllByRole("img").length).toBe(mockSlides.length);
  });

  it("uses the next/image component for optimization", () => {
    render(<HeroCarousel slides={mockSlides} />);
    const images = screen.getAllByRole("img");
    // next/image renders a regular <img> with srcset
    for (const img of images) {
      expect(img).toHaveAttribute("srcset");
    }
  });

  it("includes a CTA link to the first slide's href", () => {
    render(<HeroCarousel slides={mockSlides} />);
    const link = screen.getByRole("link", { name: /learn more/i });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("uses a custom ariaLabel when provided", () => {
    render(<HeroCarousel slides={mockSlides} ariaLabel="Custom label" />);
    expect(screen.getByRole("region", { name: /custom label/i })).toBeInTheDocument();
  });

  it("falls back to default ariaLabel 'Hero carousel' when none provided", () => {
    render(<HeroCarousel slides={mockSlides} />);
    expect(screen.getByRole("region", { name: /hero carousel/i })).toBeInTheDocument();
  });

  it("uses image alt text for the slide images", () => {
    render(<HeroCarousel slides={mockSlides} />);
    expect(screen.getByAltText("St. Elizabeth's campus main building")).toBeInTheDocument();
    expect(screen.getByAltText("Students in classroom")).toBeInTheDocument();
  });

  it("the carousel region is keyboard focusable (tabindex=0)", () => {
    render(<HeroCarousel slides={mockSlides} />);
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("tabindex", "0");
  });
});
