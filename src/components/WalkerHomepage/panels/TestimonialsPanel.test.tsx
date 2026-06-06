import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsPanel } from "./TestimonialsPanel";
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
  TESTIMONIALS: [
    {
      quote: "St. Elizabeth shaped me into the person I am today.",
      attribution: "Alumni, Class of 2020",
      role: "alumni" as const,
    },
    {
      quote: "The teachers here don't just teach — they inspire.",
      attribution: "Current Student, Class XII",
      role: "student" as const,
    },
    {
      quote: "A nurturing environment where every child finds their voice.",
      attribution: "Parent of Class VIII Student",
      role: "parent" as const,
    },
  ],
}));

describe("TestimonialsPanel", () => {
  it("renders the 'Voices of Our Community' eyebrow", () => {
    render(<TestimonialsPanel />);
    const eyebrows = screen.getAllByText("Voices of Our Community");
    expect(eyebrows.length).toBeGreaterThan(0);
  });

  it("renders the section heading", () => {
    render(<TestimonialsPanel />);
    expect(screen.getByText("What They Say")).toBeDefined();
  });

  it("renders all three testimonial quotes", () => {
    render(<TestimonialsPanel />);
    expect(
      screen.getByText(/St\. Elizabeth shaped me into the person I am today\./),
    ).toBeDefined();
    expect(
      screen.getByText(/The teachers here don't just teach — they inspire\./),
    ).toBeDefined();
    expect(
      screen.getByText(
        /A nurturing environment where every child finds their voice\./,
      ),
    ).toBeDefined();
  });

  it("renders all three attributions", () => {
    render(<TestimonialsPanel />);
    expect(screen.getByText("Alumni, Class of 2020")).toBeDefined();
    expect(screen.getByText("Current Student, Class XII")).toBeDefined();
    expect(screen.getByText("Parent of Class VIII Student")).toBeDefined();
  });

  it("has an aria-label describing the panel purpose", () => {
    render(<TestimonialsPanel />);
    expect(
      screen.getByLabelText("Testimonials from students, alumni, and parents"),
    ).toBeDefined();
  });
});
