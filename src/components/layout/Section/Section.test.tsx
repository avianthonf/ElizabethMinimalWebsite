import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Section } from "./Section";

describe("Section", () => {
  it("renders children", () => {
    render(<Section><p>Section content</p></Section>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("renders as a section element", () => {
    render(<Section><p>Test</p></Section>);
    const el = screen.getByText("Test").parentElement;
    expect(el?.tagName).toBe("SECTION");
  });

  it("applies background class", () => {
    render(<Section background="soft"><p>Soft bg</p></Section>);
    const el = screen.getByText("Soft bg").parentElement;
    expect(el?.className).toContain("bgSoft");
  });

  it("applies aria-label", () => {
    render(<Section ariaLabel="Featured section"><p>Content</p></Section>);
    expect(screen.getByRole("region", { name: "Featured section" })).toBeInTheDocument();
  });

  it("merges className", () => {
    render(<Section className="extra"><p>With extra</p></Section>);
    const el = screen.getByText("With extra").parentElement;
    expect(el?.className).toContain("extra");
  });
});
