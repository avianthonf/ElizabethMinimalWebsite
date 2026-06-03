import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>01</Badge>);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders number variant as default", () => {
    render(<Badge>02</Badge>);
    const el = screen.getByText("02");
    expect(el.tagName).toBe("SPAN");
  });

  it("renders status variant", () => {
    render(<Badge variant="status" color="muted">New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("merges className", () => {
    render(<Badge className="extra">03</Badge>);
    expect(screen.getByText("03").className).toContain("extra");
  });
});
