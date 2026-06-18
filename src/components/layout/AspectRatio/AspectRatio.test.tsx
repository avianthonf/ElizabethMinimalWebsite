import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders children", () => {
    const { getByText } = render(
      <AspectRatio ratio="16/9">
        <div>Content</div>
      </AspectRatio>,
    );
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("applies the correct ratio class", () => {
    const { container } = render(
      <AspectRatio ratio="4/3">
        <div>Content</div>
      </AspectRatio>,
    );
    expect(container.firstElementChild?.className).toMatch(/ratio/);
  });

  it("renders as a div by default", () => {
    const { container } = render(
      <AspectRatio ratio="1/1">
        <div>Content</div>
      </AspectRatio>,
    );
    expect(container.firstElementChild?.tagName).toBe("DIV");
  });

  it("accepts a custom className", () => {
    const { container } = render(
      <AspectRatio ratio="16/9" className="custom-class">
        <div>Content</div>
      </AspectRatio>,
    );
    expect(container.firstElementChild?.className).toContain("custom-class");
  });
});
