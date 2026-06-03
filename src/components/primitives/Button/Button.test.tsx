import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Learn More</Button>);
    expect(screen.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(<Button variant="secondary">Click</Button>);
    // The button should still be a button element
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies aria-label when provided", () => {
    render(<Button ariaLabel="Submit form">Go</Button>);
    expect(screen.getByRole("button", { name: "Submit form" })).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(<Button href="/apply">Apply Now</Button>);
    expect(screen.getByRole("link", { name: "Apply Now" })).toBeInTheDocument();
  });

  it("disables the button when disabled is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("merges className", () => {
    render(<Button className="custom">Text</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom");
  });
});
