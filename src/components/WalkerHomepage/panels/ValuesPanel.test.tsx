import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ValuesPanel } from "./ValuesPanel";
import React from "react";

// Mock next/image (used by ValueCard → ImageCard)
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt={props.alt as string} src={props.src as string} />;
  },
}));

// Mock HorizontalPage — ValuesPanel wraps itself in one
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

  it("renders the values section heading", () => {
    render(<ValuesPanel />);
    expect(screen.getByText("Values That Shape Our Community")).toBeDefined();
  });

  it("renders all three value card titles", () => {
    render(<ValuesPanel />);
    expect(screen.getByText("Faith")).toBeDefined();
    expect(screen.getByText("Excellence")).toBeDefined();
    expect(screen.getByText("Community")).toBeDefined();
  });

  it("renders value numbers", () => {
    render(<ValuesPanel />);
    expect(screen.getByText("01")).toBeDefined();
    expect(screen.getByText("02")).toBeDefined();
    expect(screen.getByText("03")).toBeDefined();
  });

  it("has an aria-label describing the panel purpose", () => {
    render(<ValuesPanel />);
    expect(
      screen.getByLabelText(
        "St. Elizabeth values — Faith, Excellence, Community",
      ),
    ).toBeDefined();
  });

  it("sets data-header-theme to dark", () => {
    render(<ValuesPanel />);
    const container = screen.getByLabelText(
      "St. Elizabeth values — Faith, Excellence, Community",
    );
    expect(container.getAttribute("data-header-theme")).toBe("dark");
  });
});
