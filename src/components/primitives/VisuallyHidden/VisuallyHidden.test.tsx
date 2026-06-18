import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("renders children text that is accessible to screen readers", () => {
    render(<VisuallyHidden>Hidden content</VisuallyHidden>);

    expect(screen.getByText("Hidden content")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<VisuallyHidden>Accessible text</VisuallyHidden>);

    const element = screen.getByText("Accessible text");
    expect(element.tagName).toBe("SPAN");
  });

  it("applies visually-hidden CSS class", () => {
    render(<VisuallyHidden>Screen reader only</VisuallyHidden>);

    const element = screen.getByText("Screen reader only");
    // CSS Module compiles the class name — check it contains the module prefix
    expect(element.className).toMatch(/visuallyHidden/);
  });
});
