import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as article", () => {
    render(<Card><p>Article card</p></Card>);
    const el = screen.getByText("Article card").parentElement;
    expect(el?.tagName).toBe("ARTICLE");
  });

  it("applies variant class", () => {
    const { container } = render(<Card variant="icon"><p>Icon card</p></Card>);
    expect(container.firstElementChild?.className).toContain("icon");
  });

  it("merges className", () => {
    const { container } = render(<Card className="custom"><p>Custom</p></Card>);
    expect(container.firstElementChild?.className).toContain("custom");
  });

  it("renders without border when border is false", () => {
    const { container } = render(<Card border={false}><p>No border</p></Card>);
    expect(container.firstElementChild?.className).toContain("noBorder");
  });
});
