import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container><p>Content</p></Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with custom element type", () => {
    render(<Container as="section"><p>Section</p></Container>);
    const el = screen.getByText("Section").parentElement;
    expect(el?.tagName).toBe("SECTION");
  });

  it("merges className", () => {
    render(<Container className="custom"><p>Text</p></Container>);
    const el = screen.getByText("Text").parentElement;
    expect(el?.className).toContain("custom");
  });
});
