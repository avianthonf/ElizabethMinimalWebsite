import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NewsSection } from "./NewsSection";
import type { NewsItemData } from "@/domains/homepage/homepage.data";

const mockNews: NewsItemData[] = [
  {
    title: "Annual Day 2024",
    excerpt: "Students performed at the annual day celebration.",
    date: "2024-07-02",
    href: "/news/annual-day-2024",
    imageFilename: "DSC07460.jpg",
  },
  {
    title: "Sports Meet XXII",
    excerpt: "The 22nd Inter-House Sports Meet concluded with a colourful prize distribution.",
    date: "2024-11-20",
    href: "/news/sports-meet-xxii",
    imageFilename: "DSC08376.jpg",
  },
  {
    title: "Science Fair 2025",
    excerpt: "Students presented their working models at the annual science fair.",
    date: "2025-01-30",
    href: "/news/science-fair-2025",
    imageFilename: "DSC07396.jpg",
  },
  {
    title: "Christmas Concert",
    excerpt: "The choir and drama club presented a heartwarming Christmas performance.",
    date: "2024-12-22",
    href: "/news/christmas-concert",
    imageFilename: "DSC07416.jpg",
  },
];

describe("NewsSection", () => {
  it("renders the section with default aria-label", () => {
    render(
      <NewsSection
        eyebrow="Latest"
        heading="News & Events"
        news={mockNews}
        ctaText="View all news"
        ctaHref="/news"
      />,
    );
    expect(screen.getByRole("region", { name: /latest news/i })).toBeInTheDocument();
  });

  it("renders the eyebrow and heading", () => {
    render(
      <NewsSection
        eyebrow="Latest"
        heading="News & Events"
        news={mockNews}
        ctaText="View all news"
        ctaHref="/news"
      />,
    );
    expect(screen.getByText("Latest")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /news & events/i })).toBeInTheDocument();
  });

  it("limits display to 3 news items even if more are provided", () => {
    render(
      <NewsSection
        eyebrow="Latest"
        heading="News & Events"
        news={mockNews}
        ctaText="View all news"
        ctaHref="/news"
      />,
    );
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(3);
    // The 4th item should not be rendered
    expect(screen.queryByText("Christmas Concert")).not.toBeInTheDocument();
  });

  it("renders each news item as a link to its href", () => {
    render(
      <NewsSection
        eyebrow="Latest"
        heading="News"
        news={mockNews}
        ctaText="View all"
        ctaHref="/news"
      />,
    );
    expect(screen.getByRole("link", { name: /annual day 2024/i })).toHaveAttribute(
      "href",
      "/news/annual-day-2024",
    );
    expect(screen.getByRole("link", { name: /sports meet xxii/i })).toHaveAttribute(
      "href",
      "/news/sports-meet-xxii",
    );
  });

  it("renders the dates", () => {
    render(
      <NewsSection
        eyebrow="Latest"
        heading="News"
        news={mockNews}
        ctaText="View all"
        ctaHref="/news"
      />,
    );
    expect(screen.getByText("2024-07-02")).toBeInTheDocument();
  });

  it("renders the CTA link to all news", () => {
    render(
      <NewsSection
        eyebrow="Latest"
        heading="News"
        news={mockNews}
        ctaText="View all news"
        ctaHref="/news"
      />,
    );
    const cta = screen.getByRole("link", { name: /view all news/i });
    expect(cta).toHaveAttribute("href", "/news");
  });

  it("uses lazy loading on images (not LCP candidates)", () => {
    render(
      <NewsSection
        eyebrow="Latest"
        heading="News"
        news={mockNews}
        ctaText="View all"
        ctaHref="/news"
      />,
    );
    const images = screen.getAllByRole("img");
    for (const img of images) {
      expect(img).toHaveAttribute("loading", "lazy");
    }
  });
});
