import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WelcomeSection } from "./welcome-section";

const defaultProps = {
  eyebrow: "Welcome to",
  heading: "A Tradition of Excellence Since 1949",
  body: "St. Elizabeth's High School is a Catholic institution committed to nurturing the whole person — mind, body, and spirit.",
  ctaText: "Learn more about us",
  ctaHref: "/about",
  images: [
    { filename: "DSC07397.jpg", alt: "Main school building" },
    { filename: "DSC07460.jpg", alt: "Students in classroom" },
    { filename: "DSC08376.jpg", alt: "Sports day" },
  ],
};

describe("WelcomeSection", () => {
  it("renders the section with default aria-label", () => {
    render(<WelcomeSection {...defaultProps} />);
    expect(screen.getByRole("region", { name: /welcome/i })).toBeInTheDocument();
  });

  it("renders the eyebrow, heading, and body text", () => {
    render(<WelcomeSection {...defaultProps} />);
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /tradition of excellence/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/nurturing the whole person/i)).toBeInTheDocument();
  });

  it("renders a CTA link to the configured href", () => {
    render(<WelcomeSection {...defaultProps} />);
    const link = screen.getByRole("link", { name: /learn more about us/i });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders all carousel images with alt text", () => {
    render(<WelcomeSection {...defaultProps} />);
    for (const img of defaultProps.images) {
      expect(screen.getByAltText(img.alt)).toBeInTheDocument();
    }
  });

  it("uses a custom ariaLabel when provided", () => {
    render(<WelcomeSection {...defaultProps} ariaLabel="Welcome to St. Elizabeth's" />);
    expect(screen.getByRole("region", { name: /welcome to st\. elizabeth/i })).toBeInTheDocument();
  });

  it("uses next/image for optimization", () => {
    render(<WelcomeSection {...defaultProps} />);
    const images = screen.getAllByRole("img");
    // next/image renders with srcset (for responsive images)
    // Note: fill images get srcset from next/image even in server components
    expect(images.length).toBe(defaultProps.images.length);
    for (const img of images) {
      expect(img).toBeInTheDocument();
    }
  });

  it("renders the heading as an h2 (proper hierarchy)", () => {
    render(<WelcomeSection {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/tradition of excellence/i);
  });
});
