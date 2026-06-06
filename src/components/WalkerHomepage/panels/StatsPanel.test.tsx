import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsPanel } from "./StatsPanel";
import React from "react";

// Mock HorizontalPage
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
    <div data-header-theme={headerTheme} aria-label={ariaLabel} className={className}>
      {children}
    </div>
  ),
}));

// Mock data
vi.mock("@/data/homepage", () => ({
  STATS: [
    {
      value: "1949",
      label: "Founded",
      description: "Over seven decades of educational excellence.",
    },
    { value: "1200+", label: "Students", description: "A vibrant student body." },
    { value: "CBSE", label: "Affiliated", description: "CBSE curriculum." },
  ],
}));

describe("StatsPanel", () => {
  it("renders the 'By the Numbers' eyebrow text", () => {
    render(<StatsPanel />);
    const eyebrows = screen.getAllByText("By the Numbers");
    expect(eyebrows.length).toBeGreaterThan(0);
  });

  it("renders the stats section heading", () => {
    render(<StatsPanel />);
    expect(screen.getByText("Our School at a Glance")).toBeDefined();
  });

  it("renders all three stat values", () => {
    render(<StatsPanel />);
    expect(screen.getByText("1949")).toBeDefined();
    expect(screen.getByText("1200+")).toBeDefined();
    expect(screen.getByText("CBSE")).toBeDefined();
  });

  it("renders all three stat labels", () => {
    render(<StatsPanel />);
    expect(screen.getByText("Founded")).toBeDefined();
    expect(screen.getByText("Students")).toBeDefined();
    expect(screen.getByText("Affiliated")).toBeDefined();
  });

  it("renders stat descriptions", () => {
    render(<StatsPanel />);
    expect(screen.getByText("Over seven decades of educational excellence.")).toBeDefined();
    expect(screen.getByText("A vibrant student body.")).toBeDefined();
  });

  it("has an aria-label describing the panel purpose", () => {
    render(<StatsPanel />);
    expect(
      screen.getByLabelText("St. Elizabeth High School — key statistics"),
    ).toBeDefined();
  });

  it("sets data-header-theme to dark", () => {
    render(<StatsPanel />);
    const container = screen.getByLabelText(
      "St. Elizabeth High School — key statistics",
    );
    expect(container.getAttribute("data-header-theme")).toBe("dark");
  });
});
