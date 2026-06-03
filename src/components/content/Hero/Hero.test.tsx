import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders heading", () => {
    render(<Hero heading="Welcome" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Welcome");
  });

  it("renders eyebrow", () => {
    render(<Hero eyebrow="Discover" heading="Our School" />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <Hero
        heading="Academics"
        description="A rigorous curriculum."
      />,
    );
    expect(screen.getByText("A rigorous curriculum.")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(
      <Hero
        heading="Join Us"
        primaryCTA={{ text: "Apply", href: "/apply" }}
        secondaryCTA={{ text: "Visit", href: "/visit" }}
      />,
    );
    expect(screen.getByText("Apply")).toBeInTheDocument();
    expect(screen.getByText("Visit")).toBeInTheDocument();
  });

  it("renders as section element", () => {
    const { container } = render(<Hero heading="Test" />);
    expect(container.firstElementChild?.tagName).toBe("SECTION");
  });
});
