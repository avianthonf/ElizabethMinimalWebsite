import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SplitLayout } from "./SplitLayout";

describe("SplitLayout", () => {
  it("renders both sides", () => {
    render(<SplitLayout left={<p>Left content</p>} right={<p>Right content</p>} />);
    expect(screen.getByText("Left content")).toBeInTheDocument();
    expect(screen.getByText("Right content")).toBeInTheDocument();
  });

  it("renders with 1-2 ratio by default", () => {
    const { container } = render(
      <SplitLayout left={<p>A</p>} right={<p>B</p>} />,
    );
    const split = container.firstElementChild;
    expect(split?.className).toContain("ratioOneTwo");
  });

  it("merges className", () => {
    const { container } = render(
      <SplitLayout
        left={<p>A</p>}
        right={<p>B</p>}
        className="custom-split"
      />,
    );
    expect(container.firstElementChild?.className).toContain("custom-split");
  });
});
