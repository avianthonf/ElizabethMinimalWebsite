import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CounterBar } from "./counter-bar";
import type { CounterStat } from "@/domains/homepage/sections.data";

const mockStats: CounterStat[] = [
  { value: 1954, label: "Founded", suffix: "" },
  { value: 15, label: "Student-Teacher Ratio", suffix: ":1" },
  { value: 185, label: "Students", suffix: "+" },
  { value: 72, label: "Years of Excellence", suffix: "" },
];

describe("CounterBar", () => {
  it("renders a section with proper ARIA label", () => {
    render(<CounterBar stats={mockStats} ariaLabel="Key statistics" />);
    expect(screen.getByRole("region", { name: /key statistics/i })).toBeInTheDocument();
  });

  it("uses a default ariaLabel when none provided", () => {
    render(<CounterBar stats={mockStats} />);
    expect(screen.getByRole("region", { name: /school statistics/i })).toBeInTheDocument();
  });

  it("renders all stat labels", () => {
    render(<CounterBar stats={mockStats} />);
    for (const stat of mockStats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it("renders prefix and suffix on the stats", () => {
    const statsWithPrefix: CounterStat[] = [
      { value: 95, label: "Pass Rate", prefix: "~", suffix: "%" },
    ];
    render(<CounterBar stats={statsWithPrefix} />);
    expect(screen.getByText("~")).toBeInTheDocument();
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("provides an aria-label on the value container for screen readers", () => {
    const stats: CounterStat[] = [{ value: 185, label: "Students", suffix: "+" }];
    render(<CounterBar stats={stats} />);
    // The final value should be reachable via aria-label (since the number is animated)
    const labeled = screen.getByLabelText("Students: 185+");
    expect(labeled).toBeInTheDocument();
  });

  it("renders the same number of stat items as stats provided", () => {
    render(<CounterBar stats={mockStats} />);
    // The value containers all share the same className; check via label count.
    const labels = screen.getAllByText(
      /^(Founded|Students|Student-Teacher Ratio|Years of Excellence)$/,
    );
    expect(labels.length).toBe(mockStats.length);
  });

  it("renders zero initially (animation hasn't fired in jsdom)", () => {
    const stats: CounterStat[] = [{ value: 100, label: "Count", suffix: "" }];
    render(<CounterBar stats={stats} />);
    // Without IntersectionObserver firing, the displayed value is "0"
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
