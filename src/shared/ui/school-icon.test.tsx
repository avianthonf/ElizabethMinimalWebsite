import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SchoolIcon } from "./school-icon";

describe("SchoolIcon", () => {
  it("renders the academic icon", () => {
    const { container } = render(<SchoolIcon variant="academic" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the community icon", () => {
    const { container } = render(<SchoolIcon variant="community" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the arts icon", () => {
    const { container } = render(<SchoolIcon variant="arts" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the sports icon", () => {
    const { container } = render(<SchoolIcon variant="sports" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    const { container } = render(<SchoolIcon variant="academic" size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("has aria-hidden for decorative use", () => {
    const { container } = render(<SchoolIcon variant="academic" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
