import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgramsGrid } from "./ProgramsGrid";
import type { ProgramBox } from "@/domains/homepage/sections.data";

const mockBoxes: ProgramBox[] = [
  {
    title: "75+ Year Legacy",
    description: "A rich tradition of holistic education since 1949.",
    href: "/about/history",
    color: "var(--p-color-navy)",
  },
  {
    title: "Modern Facilities",
    description: "Well-equipped labs, library, and smart classrooms.",
    href: "/admissions/infrastructure",
    color: "var(--p-color-gold)",
  },
  {
    title: "Safe Campus",
    description: "CCTV-monitored campus with secure entry.",
    href: "/admissions/infrastructure",
    color: "var(--p-color-navy)",
  },
  {
    title: "Holistic Development",
    description: "Arts, sports, and values alongside academics.",
    href: "/beyond-academics",
    color: "var(--p-color-gold)",
  },
  {
    title: "15:1 Student-Teacher Ratio",
    description: "Personalised attention for every child.",
    href: "/academics",
    color: "var(--p-color-navy)",
  },
  {
    title: "CBSE Curriculum",
    description: "Nationally recognised board with structured assessments.",
    href: "/academics/curriculum",
    color: "var(--p-color-gold)",
  },
  {
    title: "Values + Academics",
    description: "Rooted in the motto 'Truth and Honesty'.",
    href: "/about/mission",
    color: "var(--p-color-navy)",
  },
];

describe("ProgramsGrid", () => {
  it("renders the section with default aria-label", () => {
    render(<ProgramsGrid eyebrow="Programs" heading="At a Glance" boxes={mockBoxes} />);
    expect(screen.getByRole("region", { name: /programmes at a glance/i })).toBeInTheDocument();
  });

  it("renders the eyebrow and heading", () => {
    render(<ProgramsGrid eyebrow="Programs" heading="At a Glance" boxes={mockBoxes} />);
    expect(screen.getByText("Programs")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /at a glance/i })).toBeInTheDocument();
  });

  it("renders all 7 boxes with titles and descriptions", () => {
    render(<ProgramsGrid eyebrow="Programs" heading="At a Glance" boxes={mockBoxes} />);
    for (const box of mockBoxes) {
      expect(screen.getByRole("heading", { level: 3, name: box.title })).toBeInTheDocument();
      expect(screen.getByText(box.description)).toBeInTheDocument();
    }
  });

  it("renders the correct number of boxes (7)", () => {
    render(<ProgramsGrid eyebrow="Programs" heading="At a Glance" boxes={mockBoxes} />);
    const boxHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(boxHeadings.length).toBe(7);
  });

  it("renders each box as a link to its href", () => {
    render(<ProgramsGrid eyebrow="Programs" heading="At a Glance" boxes={mockBoxes} />);
    expect(screen.getByRole("link", { name: /75\+ year legacy/i })).toHaveAttribute(
      "href",
      "/about/history",
    );
  });

  it("renders numbered boxes (01, 02, ...)", () => {
    render(<ProgramsGrid eyebrow="Programs" heading="At a Glance" boxes={mockBoxes} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("07")).toBeInTheDocument();
  });

  it("uses a custom ariaLabel when provided", () => {
    render(
      <ProgramsGrid
        eyebrow="Programs"
        heading="At a Glance"
        boxes={mockBoxes}
        ariaLabel="Programs overview"
      />,
    );
    expect(screen.getByRole("region", { name: /programs overview/i })).toBeInTheDocument();
  });
});
