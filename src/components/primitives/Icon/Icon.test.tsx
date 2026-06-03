import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

function MockSvg() {
  return (
    <svg viewBox="0 0 24 24" data-testid="mock-svg">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

describe("Icon", () => {
  it("renders children", () => {
    render(
      <Icon>
        <MockSvg />
      </Icon>,
    );
    expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
  });

  it("hides from screen readers when decorative", () => {
    render(
      <Icon decorative>
        <MockSvg />
      </Icon>,
    );
    const wrapper = screen.getByTestId("mock-svg").parentElement;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("provides aria-label for meaningful icons", () => {
    render(
      <Icon ariaLabel="Search icon">
        <MockSvg />
      </Icon>,
    );
    expect(screen.getByLabelText("Search icon")).toBeInTheDocument();
  });

  it("merges className", () => {
    render(
      <Icon className="custom">
        <MockSvg />
      </Icon>,
    );
    const wrapper = screen.getByTestId("mock-svg").parentElement;
    expect(wrapper?.className).toContain("custom");
  });
});
