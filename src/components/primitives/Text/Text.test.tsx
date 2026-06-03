import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders body variant as paragraph by default", () => {
    render(<Text>Hello world</Text>);
    const el = screen.getByText("Hello world");
    expect(el.tagName).toBe("P");
  });

  it("renders eyebrow variant", () => {
    render(<Text variant="eyebrow">We Value</Text>);
    const el = screen.getByText("We Value");
    expect(el).toBeInTheDocument();
    // Eyebrow is typically a span for inline usage
  });

  it("renders muted variant", () => {
    render(<Text variant="muted">Supporting text</Text>);
    expect(screen.getByText("Supporting text")).toBeInTheDocument();
  });

  it("renders with custom element type", () => {
    render(<Text as="span">Inline text</Text>);
    const el = screen.getByText("Inline text");
    expect(el.tagName).toBe("SPAN");
  });

  it("merges className", () => {
    render(<Text className="extra">With class</Text>);
    expect(screen.getByText("With class").className).toContain("extra");
  });
});
