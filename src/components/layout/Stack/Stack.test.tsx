import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders children", () => {
    render(
      <Stack>
        <p>First</p>
        <p>Second</p>
      </Stack>,
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders with custom element type", () => {
    render(
      <Stack as="section">
        <p>Section stack</p>
      </Stack>,
    );
    expect(screen.getByText("Section stack").parentElement?.tagName).toBe("SECTION");
  });

  it("merges className", () => {
    render(
      <Stack className="extra">
        <p>Extra</p>
      </Stack>,
    );
    expect(screen.getByText("Extra").parentElement?.className).toContain("extra");
  });
});
