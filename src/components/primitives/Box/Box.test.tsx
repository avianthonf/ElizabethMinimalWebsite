import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  it("renders children", () => {
    render(<Box>Content</Box>);

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders as a div by default", () => {
    render(<Box>Default element</Box>);

    const element = screen.getByText("Default element");
    expect(element.tagName).toBe("DIV");
  });

  it("renders as a custom element via the as prop", () => {
    render(<Box as="section">Section content</Box>);

    const element = screen.getByText("Section content");
    expect(element.tagName).toBe("SECTION");
  });

  it("applies className", () => {
    render(<Box className="custom-class">Styled</Box>);

    const element = screen.getByText("Styled");
    expect(element.className).toContain("custom-class");
  });

  it("forwards data attributes", () => {
    render(
      <Box data-testid="test-box" data-custom="value">
        Attributed
      </Box>,
    );

    const element = screen.getByTestId("test-box");
    expect(element).toHaveAttribute("data-custom", "value");
  });
});
