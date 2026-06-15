import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";

// ── Mocks ─────────────────────────────────────────────────────────────

const MOCK_GRID = vi.hoisted(() => [
  { filename: "img1.jpg", alt: "Image 1", category: "academics", section: "homepage-grid" as const },
  { filename: "img2.jpg", alt: "Image 2", category: "athletics", section: "homepage-grid" as const },
  { filename: "img3.jpg", alt: "Image 3", category: "community", section: "homepage-grid" as const },
  { filename: "img4.jpg", alt: "Image 4", category: "student-life", section: "homepage-grid" as const },
  { filename: "img5.jpg", alt: "Image 5", category: "general", section: "homepage-grid" as const },
  { filename: "img6.jpg", alt: "Image 6", category: "academics", section: "homepage-grid" as const },
  { filename: "img7.jpg", alt: "Image 7", category: "athletics", section: "homepage-grid" as const },
]);

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt as string} src={props.src as string} />;
  },
}));

vi.mock("@/data/images", () => ({
  HOMEPAGE_GRID_IMAGES: MOCK_GRID,
  HOMEPAGE_GRID_HERO_FILENAMES: ["img1.jpg", "img3.jpg"],
}));

// Mock IntersectionObserver so useScrollReveal doesn't crash
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = () => [];
  root = null;
  rootMargin = "0px 0px -40px 0px";
  thresholds = [0.15];
  constructor(_callback: (entries: { isIntersecting: boolean }[]) => void) {
    setTimeout(() => {
      _callback([{ isIntersecting: true }]);
    }, 0);
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// Import after all mocks
import { GalleryPanel } from "./GalleryPanel";

describe("GalleryPanel", () => {
  it("renders the gallery heading", () => {
    render(<GalleryPanel />);
    expect(screen.getByText("Life at Our School")).toBeDefined();
  });

  it("renders the gallery eyebrow text", () => {
    render(<GalleryPanel />);
    expect(screen.getByText("Experience St. Elizabeth")).toBeDefined();
  });

  it("renders the GalleryFilter with 'All' and category pills", () => {
    render(<GalleryPanel />);
    const tablist = screen.getByRole("tablist", { name: "Filter gallery by category" });
    expect(tablist).toBeDefined();
    const tabs = tablist.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBeGreaterThanOrEqual(5);
  });

  it("shows gallery cards for the default 'All' filter", () => {
    render(<GalleryPanel />);
    const cards = screen.getAllByRole("button", { name: /View full image:/ });
    expect(cards.length).toBe(7);
  });

  it("filters cards when a category filter is clicked", async () => {
    render(<GalleryPanel />);

    const athleticsTab = screen.getByRole("tab", { name: "Athletics" });
    await act(() => {
      fireEvent.click(athleticsTab);
    });

    const cards = screen.getAllByRole("button", { name: /View full image:/ });
    expect(cards.length).toBe(2);
    for (const card of cards) {
      expect(card.getAttribute("aria-label")).toContain("Athletics");
    }
  });

  it("has the gallery section labelled by heading", () => {
    render(<GalleryPanel />);
    const section = document.querySelector("[aria-labelledby='gallery-heading']");
    expect(section).toBeDefined();
  });

  it("uses the className prop when provided", () => {
    render(<GalleryPanel className="custom-gallery-class" />);
    const section = document.querySelector(".custom-gallery-class");
    expect(section).toBeDefined();
  });
});
