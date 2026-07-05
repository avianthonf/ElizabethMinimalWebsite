import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb } from "./breadcrumb";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/about/staff",
}));

describe("Breadcrumb", () => {
  it("renders parent link and current page label", () => {
    render(<Breadcrumb href="/about" label="About" currentLabel="Staff" />);

    const nav = screen.getByLabelText("Breadcrumb");
    expect(nav).toBeInTheDocument();

    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toHaveAttribute("href", "/about");

    const staffText = screen.getByText("Staff");
    expect(staffText).toBeInTheDocument();
  });

  it("marks current page with aria-current", () => {
    render(<Breadcrumb href="/about" label="About" currentLabel="Staff" />);

    const staffText = screen.getByText("Staff");
    expect(staffText.closest("[aria-current]")).toHaveAttribute("aria-current", "page");
  });

  it("renders as nav element with correct aria-label", () => {
    render(<Breadcrumb href="/academics" label="Academics" currentLabel="Departments" />);

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });
});
