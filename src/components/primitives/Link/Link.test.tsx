import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renders internal link", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
  });

  it("renders external link with rel and target", () => {
    render(<Link href="https://example.com">External</Link>);
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("respects explicit external prop", () => {
    render(
      <Link href="/api/data" external>
        API
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("applies aria label", () => {
    render(
      <Link href="/visit" ariaLabel="Plan your visit">
        Visit
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Plan your visit" })).toBeInTheDocument();
  });

  it("merges className", () => {
    render(
      <Link href="/" className="custom-link">
        Home
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("custom-link");
  });
});
