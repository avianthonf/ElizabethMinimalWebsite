import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ValueCard } from "./ValueCard";

describe("ValueCard", () => {
  it("renders number, title, and body", () => {
    render(
      <ValueCard number="01" title="Curiosity" body="Ask better questions." />,
    );
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Curiosity")).toBeInTheDocument();
    expect(screen.getByText("Ask better questions.")).toBeInTheDocument();
  });
});
