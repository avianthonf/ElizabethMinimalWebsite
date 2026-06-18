import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StatValue } from "./StatValue";

// Mock scroll reveal hook - isVisible: true so animation triggers
vi.mock("../hooks/useScrollReveal", () => ({
  useScrollReveal: () => ({ ref: { current: null }, isVisible: true }),
}));

// Mock reduced motion hook - true so no animation, immediate display
vi.mock("../hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

describe("StatValue", () => {
  it("renders the final value when reduced motion is preferred", () => {
    render(<StatValue value="1949" />);
    expect(screen.getByText("1,949")).toBeInTheDocument();
  });

  it("renders non-numeric values immediately", () => {
    render(<StatValue value="CBSE" />);
    expect(screen.getByText("CBSE")).toBeInTheDocument();
  });

  it("renders values with suffixes", () => {
    render(<StatValue value="1200+" />);
    expect(screen.getByText("1,200+")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<StatValue value="1949" className="custom" />);
    expect(container.firstElementChild?.className).toContain("custom");
  });
});
