import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WhySection } from "./WhySection";

const defaultPoints = [
  {
    title: "Values-Based Education",
    description: "Rooted in our Catholic heritage and the motto 'Truth and Honesty'.",
  },
  {
    title: "Academic Excellence",
    description: "Consistently strong results at the CBSE Class X and XII examinations.",
  },
  {
    title: "Nurturing Community",
    description: "A close-knit family where every student is known, valued, and supported.",
  },
];

describe("WhySection", () => {
  it("renders the section with default aria-label", () => {
    render(
      <WhySection eyebrow="Why us" heading="Why St. Elizabeth's" points={defaultPoints} />,
    );
    expect(screen.getByRole("region", { name: /why choose us/i })).toBeInTheDocument();
  });

  it("renders the eyebrow and heading", () => {
    render(
      <WhySection eyebrow="Why us" heading="Why St. Elizabeth's" points={defaultPoints} />,
    );
    expect(screen.getByText("Why us")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /why st\. elizabeth/i })).toBeInTheDocument();
  });

  it("renders all 3 cards with titles and descriptions", () => {
    render(
      <WhySection eyebrow="Why us" heading="Why St. Elizabeth's" points={defaultPoints} />,
    );
    for (const point of defaultPoints) {
      expect(screen.getByRole("heading", { level: 3, name: point.title })).toBeInTheDocument();
      expect(screen.getByText(point.description)).toBeInTheDocument();
    }
  });

  it("uses a custom ariaLabel when provided", () => {
    render(
      <WhySection
        eyebrow="Why us"
        heading="Why St. Elizabeth's"
        points={defaultPoints}
        ariaLabel="Why choose us section"
      />,
    );
    expect(
      screen.getByRole("region", { name: /why choose us section/i }),
    ).toBeInTheDocument();
  });

  it("limits display to 3 cards even if more are provided", () => {
    const manyPoints = [
      ...defaultPoints,
      { title: "Safe & Secure Campus", description: "CCTV-monitored campus with secure access." },
      { title: "Experienced Faculty", description: "Teachers with 10+ years average experience." },
    ];
    render(
      <WhySection eyebrow="Why us" heading="Why us" points={manyPoints} />,
    );
    // Should display 3, not 5
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(3);
  });

  it("hides icons from screen readers (decorative)", () => {
    const { container } = render(
      <WhySection eyebrow="Why us" heading="Why us" points={defaultPoints} />,
    );
    // The svg icons have aria-hidden="true" — they should not be in the accessibility tree
    const icons = container.querySelectorAll("svg[aria-hidden='true']");
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });
});
