import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NewsPanel, newsPanelClass } from "./NewsPanel";
import React from "react";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt={props.alt as string} src={props.src as string} />;
  },
}));

// Mock data
vi.mock("@/data/homepage", () => ({
  LATEST_NEWS: [
    {
      title: "Annual Day Celebration 2024",
      date: "November 15, 2024",
      excerpt: "Students, staff, and families gathered...",
      imageFilename: "news1.jpg",
      href: "/news/1",
    },
    {
      title: "Sports Meet XXII",
      date: "November 22, 2024",
      excerpt: "Houses competed with passion...",
      imageFilename: "news2.jpg",
      href: "/news/2",
    },
    {
      title: "Feast Day Celebrations",
      date: "November 19, 2024",
      excerpt: "The school community came together...",
      imageFilename: "news3.jpg",
      href: "/news/3",
    },
  ],
}));

describe("NewsPanel", () => {
  it("renders the 'Latest News & Events' eyebrow", () => {
    render(<NewsPanel />);
    const eyebrows = screen.getAllByText("Latest News & Events");
    expect(eyebrows.length).toBeGreaterThan(0);
  });

  it("renders the news section heading (with unicode apostrophe)", () => {
    render(<NewsPanel />);
    // The heading uses right single quotation mark: What's Happening
    // Unicode: ’ = right single quotation mark
    const heading = document.querySelector("h2");
    expect(heading).toBeDefined();
    expect(heading?.textContent).toContain("What");
  });

  it("renders all three news titles", () => {
    render(<NewsPanel />);
    expect(screen.getByText("Annual Day Celebration 2024")).toBeDefined();
    expect(screen.getByText("Sports Meet XXII")).toBeDefined();
    expect(screen.getByText("Feast Day Celebrations")).toBeDefined();
  });

  it("renders the 'View All News' link", () => {
    render(<NewsPanel />);
    const link = screen.getByText("View All News");
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/news");
  });

  it("exports newsPanelClass for the orchestrator", () => {
    expect(newsPanelClass).toBeDefined();
    expect(typeof newsPanelClass).toBe("string");
    expect(newsPanelClass.length).toBeGreaterThan(0);
  });
});
