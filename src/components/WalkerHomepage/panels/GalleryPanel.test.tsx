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
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt={props.alt as string} src={props.src as string} />;
  },
}));

vi.mock("@/components/HorizontalScroll", () => ({
  HorizontalPage: ({
    children,
    ariaLabel,
    headerTheme,
    className,
  }: {
    children: React.ReactNode;
    ariaLabel?: string;
    headerTheme?: string;
    className?: string;
  }) => (
    <div
      data-header-theme={headerTheme}
      aria-label={ariaLabel}
      className={className}
      data-testid="mock-horizontal-page"
    >
      {children}
    </div>
  ),
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
    // Filter pills are role="tab" — get them via the tablist
    const tablist = screen.getByRole("tablist", { name: "Filter gallery by category" });
    expect(tablist).toBeDefined();
    const tabs = tablist.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBeGreaterThanOrEqual(5); // All + Academics + Athletics + Community + Student Life + General
  });

  it("shows gallery cards for the default 'All' filter", () => {
    render(<GalleryPanel />);
    // Gallery cards have role="button" with aria-label="View full image: ..."
    const cards = screen.getAllByRole("button", { name: /View full image:/ });
    expect(cards.length).toBe(7); // All 7 images
  });

  it("filters cards when a category filter is clicked", async () => {
    render(<GalleryPanel />);

    // Get the Athletics filter pill (role="tab")
    const athleticsTab = screen.getByRole("tab", { name: "Athletics" });
    await act(() => {
      fireEvent.click(athleticsTab);
    });

    // After filtering, only Athletics cards should be visible
    const cards = screen.getAllByRole("button", { name: /View full image:/ });
    expect(cards.length).toBe(2); // img2 and img7 are both "athletics"
    // Each should have an Athletics-related aria-label
    for (const card of cards) {
      expect(card.getAttribute("aria-label")).toContain("Athletics");
    }
  });

  it("has an accessible label on the wrapping container", () => {
    render(<GalleryPanel />);
    expect(
      screen.getByLabelText(
        "Photo gallery — Academics, Athletics, Arts, Student Life",
      ),
    ).toBeDefined();
  });

  it("has the gallery section labelled by heading", () => {
    render(<GalleryPanel />);
    const section = document.querySelector("[aria-labelledby='gallery-heading']");
    expect(section).toBeDefined();
  });
});
