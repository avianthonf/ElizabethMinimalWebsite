import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CTASection } from "./CTASection";

describe("CTASection", () => {
  it("renders heading", () => {
    render(<CTASection heading="Ready to Join?" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Ready to Join?");
  });

  it("renders description and CTAs", () => {
    render(
      <CTASection
        heading="Apply Today"
        description="Start your journey."
        primaryCTA={{ text: "Apply Now", href: "/apply" }}
        secondaryCTA={{ text: "Learn More", href: "/about" }}
      />,
    );
    expect(screen.getByText("Start your journey.")).toBeInTheDocument();
    expect(screen.getByText("Apply Now")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders with blue background", () => {
    const { container } = render(
      <CTASection heading="Visit" background="blue" />,
    );
    // The section should have the blue background class
    expect(container.firstElementChild?.className).toContain("bgBlue");
  });
});
