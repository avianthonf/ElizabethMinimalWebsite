import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children", () => {
    render(
      <Grid columns={2}>
        <p>Item 1</p>
        <p>Item 2</p>
      </Grid>,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies column class", () => {
    render(
      <Grid columns={4}>
        <p>A</p>
      </Grid>,
    );
    const el = screen.getByText("A").parentElement;
    expect(el?.className).toContain("cols4");
  });

  it("merges className", () => {
    render(
      <Grid className="extra">
        <p>X</p>
      </Grid>,
    );
    expect(screen.getByText("X").parentElement?.className).toContain("extra");
  });
});
