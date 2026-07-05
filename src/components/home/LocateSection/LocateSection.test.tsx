import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LocateSection } from "./LocateSection";
import { CONTACT_EMAIL } from "@/shared/lib/brand";

const defaultProps = {
  eyebrow: "Find Us",
  heading: "Locate Us",
  address: "St. Elizabeth's High School, Pomburpa, Bardez, Goa 403511",
  phone: "+91 832 241 0654",
  email: CONTACT_EMAIL,
  ctaText: "Get Directions",
  ctaHref: "https://maps.google.com/?q=St+Elizabeths+High+School",
};

describe("LocateSection", () => {
  it("renders the section with default aria-label", () => {
    render(<LocateSection {...defaultProps} />);
    expect(screen.getByRole("region", { name: /locate us/i })).toBeInTheDocument();
  });

  it("renders the address", () => {
    render(<LocateSection {...defaultProps} />);
    expect(screen.getByText(defaultProps.address)).toBeInTheDocument();
  });

  it("renders the phone as a tel: link", () => {
    render(<LocateSection {...defaultProps} />);
    const phoneLink = screen.getByRole("link", { name: defaultProps.phone });
    expect(phoneLink).toHaveAttribute("href", `tel:${defaultProps.phone.replace(/\s/g, "")}`);
  });

  it("renders the email as a mailto: link", () => {
    render(<LocateSection {...defaultProps} />);
    const emailLink = screen.getByRole("link", { name: defaultProps.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${defaultProps.email}`);
  });

  it("renders the directions CTA as a link to the configured href", () => {
    render(<LocateSection {...defaultProps} />);
    const cta = screen.getByRole("link", { name: /get directions/i });
    expect(cta).toHaveAttribute("href", defaultProps.ctaHref);
  });

  it("the directions CTA opens in a new tab with security attributes", () => {
    render(<LocateSection {...defaultProps} />);
    const cta = screen.getByRole("link", { name: /get directions/i });
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the heading as an h2 (proper hierarchy)", () => {
    render(<LocateSection {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 2, name: /locate us/i })).toBeInTheDocument();
  });

  it("hides decorative icons from screen readers", () => {
    const { container } = render(<LocateSection {...defaultProps} />);
    // All info icons should have aria-hidden="true"
    const icons = container.querySelectorAll("svg[aria-hidden='true']");
    expect(icons.length).toBeGreaterThanOrEqual(4);
  });
});
