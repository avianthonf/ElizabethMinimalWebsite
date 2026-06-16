import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsPanel } from "./StatsPanel";
import React from "react";

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

// Mock IntersectionObserver to fire immediately
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      private cb: IntersectionObserverCallback;
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
      }
      observe(node: Element) {
        mockObserve(node);
        // Immediately report as intersecting
        this.cb(
          [{ isIntersecting: true, target: node } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      }
      disconnect = mockDisconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
    },
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

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
    // StatValue wraps each stat — verify the elements exist via aria-labels
    expect(screen.getByLabelText("Founded: 1949")).toBeDefined();
    expect(screen.getByLabelText("Students: 1200+")).toBeDefined();
    expect(screen.getByLabelText("Affiliated: CBSE")).toBeDefined();
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
});
