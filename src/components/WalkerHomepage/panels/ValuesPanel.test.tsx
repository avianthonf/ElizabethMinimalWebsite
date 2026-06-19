import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ValuesPanel } from "./ValuesPanel";
import React from "react";

// Mock ValueCard to avoid complex framer-motion useMotionValue/useTransform chain
vi.mock("./ValueCard", () => ({
  ValueCard: ({ value, imageSrc, imageAlt, onExpand }: Record<string, unknown>) => {
    // Silently ignore onExpand for testing
    void onExpand;
    return (
      <div data-testid="value-card">
        <span>{imageAlt as string}</span>
        <span>{(value as Record<string, string>).number}</span>
        <span>{(value as Record<string, string>).title}</span>
        <span>{(value as Record<string, string>).body}</span>
      </div>
    );
  },
}));

// Mock ExpandedView to avoid layoutId issues
vi.mock("./ExpandedView", () => ({
  ExpandedView: () => null,
}));

// Mock framer-motion
vi.mock("framer-motion", () => {
  const htmlTags = ["div", "h1", "h2", "h3", "p", "span", "header", "button", "section", "img"];

  const motion: Record<string, React.ComponentType<Record<string, unknown>>> = {};
  for (const tag of htmlTags) {
    motion[tag] = ({ children, ...props }: Record<string, unknown>) => {
      const safeProps: Record<string, unknown> = {};
      const skip = new Set([
        "initial",
        "animate",
        "exit",
        "variants",
        "layoutId",
        "whileHover",
        "whileTap",
        "transition",
        "style",
      ]);
      for (const [k, v] of Object.entries(props)) {
        if (!skip.has(k)) safeProps[k] = v;
      }
      return React.createElement(tag, safeProps, children as React.ReactNode);
    };
  }

  return {
    motion,
    AnimatePresence: ({ children }: Record<string, unknown>) => <>{children}</>,
    useMotionValue: () => ({ get: () => 0, set: () => {} }),
    useTransform: () => ({ get: () => "50%" }),
    useSpring: (v: unknown) => v,
    useScroll: () => ({ scrollXProgress: 0 }),
  };
});

// Mock data
vi.mock("@/data/homepage", () => ({
  VALUES: [
    { number: "01", title: "Faith", body: "In God we trust, in Truth we stand..." },
    { number: "02", title: "Excellence", body: "Academic rigor and holistic growth..." },
    { number: "03", title: "Community", body: "Inclusive, nurturing, and committed..." },
  ],
}));

vi.mock("@/data/images", () => ({
  VALUES_IMAGES: {
    faith: { filename: "faith.jpg", alt: "Faith heritage image" },
    excellence: { filename: "excellence.jpg", alt: "Excellence academic image" },
    community: { filename: "community.jpg", alt: "Community gathering image" },
  },
}));

describe("ValuesPanel", () => {
  it("renders the 'We Believe' eyebrow text", () => {
    render(<ValuesPanel />);
    const eyebrows = screen.getAllByText("We Believe");
    expect(eyebrows.length).toBeGreaterThan(0);
  });

  it("renders the kinetic title words", () => {
    render(<ValuesPanel />);
    expect(screen.getByText("Values")).toBeDefined();
    expect(screen.getByText("Shape")).toBeDefined();
    const communityMatches = screen.getAllByText("Community");
    expect(communityMatches.length).toBeGreaterThanOrEqual(1);
  });

  it("renders all three value card titles via mock", () => {
    render(<ValuesPanel />);
    const cards = screen.getAllByTestId("value-card");
    expect(cards).toHaveLength(3);
  });

  it("renders value numbers", () => {
    render(<ValuesPanel />);
    expect(screen.getByText("01")).toBeDefined();
    expect(screen.getByText("02")).toBeDefined();
    expect(screen.getByText("03")).toBeDefined();
  });
});
