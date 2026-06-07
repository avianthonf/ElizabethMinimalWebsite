import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CTASection } from "./CTASection";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={String(alt ?? "")} />,
}));

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

  it("renders eyebrow when provided", () => {
    render(<CTASection heading="Apply Today" eyebrow="Discover Us" />);
    expect(screen.getByText("Discover Us")).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(
      <CTASection
        heading="Apply Today"
        image={{ src: "/images/test.jpg", alt: "Test image" }}
      />,
    );
    const img = screen.getByRole("img", { name: /Test image/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/test.jpg");
  });

  it("uses lightButton variant for primary CTA", () => {
    const { container } = render(
      <CTASection
        heading="Apply Today"
        background="blue"
        primaryCTA={{ text: "Apply Now", href: "/apply" }}
      />,
    );
    const btn = container.querySelector("a[href='/apply']");
    expect(btn?.className).toContain("lightButton");
  });

  it("renders with blue background", () => {
    const { container } = render(
      <CTASection heading="Visit" background="blue" />,
    );
    // The section should have the blue background class
    expect(container.firstElementChild?.className).toContain("bgBlue");
  });
});
