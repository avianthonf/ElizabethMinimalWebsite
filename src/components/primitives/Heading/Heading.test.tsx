import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders correct heading level", () => {
    render(<Heading level="h2">Section Title</Heading>);
    const heading = screen.getByRole("heading", { level: 2, name: "Section Title" });
    expect(heading).toBeInTheDocument();
  });

  it("renders hero variant as h1 with uppercase", () => {
    render(
      <Heading level="h1" variant="hero">
        Known
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Known");
  });

  it("respects uppercase prop override", () => {
    render(
      <Heading level="h2" variant="section" uppercase={false}>
        Lowercase Title
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("merges className", () => {
    render(
      <Heading level="h3" className="extra">
        Card Heading
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 3 }).className).toContain("extra");
  });

  it("renders all heading levels", () => {
    for (const level of ["h1", "h2", "h3", "h4", "h5", "h6"] as const) {
      const { unmount } = render(<Heading level={level}>Level {level}</Heading>);
      expect(
        screen.getByRole("heading", {
          level: Number(level[1]) as 1 | 2 | 3 | 4 | 5 | 6,
        }),
      ).toBeInTheDocument();
      unmount();
    }
  });
});
