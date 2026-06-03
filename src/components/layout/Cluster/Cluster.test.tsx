import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Cluster } from "./Cluster";

describe("Cluster", () => {
  it("renders children", () => {
    render(
      <Cluster>
        <span>Item A</span>
        <span>Item B</span>
      </Cluster>,
    );
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
  });

  it("merges className", () => {
    render(
      <Cluster className="extra">
        <span>Extra</span>
      </Cluster>,
    );
    expect(screen.getByText("Extra").parentElement?.className).toContain("extra");
  });
});
