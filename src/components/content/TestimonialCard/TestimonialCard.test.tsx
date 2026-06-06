import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestimonialCard } from "./TestimonialCard";

describe("TestimonialCard", () => {
  const props = {
    quote: "Test quote text",
    attribution: "Test Author",
    role: "student" as const,
  };

  it("renders the quote text", () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByText(/Test quote text/)).toBeInTheDocument();
  });

  it("renders the attribution", () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders the role badge", () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByText("student")).toBeInTheDocument();
  });

  it("has an aria-label on the role badge", () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByLabelText("Role: student")).toBeInTheDocument();
  });

  const roles = ["alumni", "student", "parent", "teacher"] as const;

  it.each(roles)("renders role badge for '%s'", (role) => {
    render(<TestimonialCard {...props} role={role} />);
    expect(screen.getByText(role)).toBeInTheDocument();
    expect(screen.getByLabelText(`Role: ${role}`)).toBeInTheDocument();
  });
});
