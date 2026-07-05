import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StudentLifeSection } from "./student-life-section";
import type { ProgramBox } from "@/domains/homepage/sections.data";

const mockCards: ProgramBox[] = [
  {
    title: "Clubs & Organizations",
    description: "Join a variety of student-led clubs.",
    href: "/beyond-academics/clubs",
    color: "var(--p-color-navy)",
  },
  {
    title: "Sports",
    description: "Athletics, football, cricket, and more.",
    href: "/beyond-academics/sports",
    color: "var(--p-color-gold)",
  },
  {
    title: "Student Council",
    description: "Leadership opportunities for students.",
    href: "/beyond-academics/student-council",
    color: "var(--p-color-navy)",
  },
  {
    title: "Cultural Activities",
    description: "Dance, music, drama, and art.",
    href: "/beyond-academics/cultural-activities",
    color: "var(--p-color-gold)",
  },
];

describe("StudentLifeSection", () => {
  it("renders the section with default aria-label", () => {
    render(
      <StudentLifeSection
        eyebrow="Explore"
        heading="Student Life"
        cards={mockCards}
        ctaText="Learn more"
        ctaHref="/beyond-academics"
      />,
    );
    expect(screen.getByRole("region", { name: /student life/i })).toBeInTheDocument();
  });

  it("renders the eyebrow and heading", () => {
    render(
      <StudentLifeSection
        eyebrow="Explore"
        heading="Student Life"
        cards={mockCards}
        ctaText="Learn more"
        ctaHref="/beyond-academics"
      />,
    );
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /student life/i })).toBeInTheDocument();
  });

  it("renders all card titles and descriptions", () => {
    render(
      <StudentLifeSection
        eyebrow="Explore"
        heading="Student Life"
        cards={mockCards}
        ctaText="Learn more"
        ctaHref="/beyond-academics"
      />,
    );
    for (const card of mockCards) {
      expect(screen.getByRole("heading", { level: 3, name: card.title })).toBeInTheDocument();
      expect(screen.getByText(card.description)).toBeInTheDocument();
    }
  });

  it("renders each card as a link to its href", () => {
    render(
      <StudentLifeSection
        eyebrow="Explore"
        heading="Student Life"
        cards={mockCards}
        ctaText="Learn more"
        ctaHref="/beyond-academics"
      />,
    );
    expect(screen.getByRole("link", { name: /clubs & organizations/i })).toHaveAttribute(
      "href",
      "/beyond-academics/clubs",
    );
  });

  it("renders the CTA link", () => {
    render(
      <StudentLifeSection
        eyebrow="Explore"
        heading="Student Life"
        cards={mockCards}
        ctaText="Explore Student Life"
        ctaHref="/beyond-academics"
      />,
    );
    const cta = screen.getByRole("link", { name: /explore student life/i });
    expect(cta).toHaveAttribute("href", "/beyond-academics");
  });

  it("limits display to 5 cards", () => {
    const manyCards = [...mockCards, ...mockCards]; // 8 total
    render(
      <StudentLifeSection
        eyebrow="Explore"
        heading="Student Life"
        cards={manyCards}
        ctaText="Learn more"
        ctaHref="/beyond-academics"
      />,
    );
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(5);
  });

  it("uses decorative icons (aria-hidden)", () => {
    const { container } = render(
      <StudentLifeSection
        eyebrow="Explore"
        heading="Student Life"
        cards={mockCards}
        ctaText="Learn more"
        ctaHref="/beyond-academics"
      />,
    );
    // The icon wrapper div has aria-hidden='true' — the SVG is inside it
    const iconWrappers = container.querySelectorAll("div[aria-hidden='true'] svg");
    expect(iconWrappers.length).toBeGreaterThanOrEqual(4);
  });
});
