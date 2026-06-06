import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders brand text", () => {
    render(<Header brandText="Test School" showMenu={false} />);
    expect(screen.getByText("Test School")).toBeInTheDocument();
  });

  it("renders default nav links (9 St. Elizabeth links)", () => {
    render(<Header showMenu={false} />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Admissions")).toBeInTheDocument();
    expect(screen.getByText("Academics")).toBeInTheDocument();
    expect(screen.getByText("Athletics")).toBeInTheDocument();
    expect(screen.getByText("Arts")).toBeInTheDocument();
    expect(screen.getByText("Student Life")).toBeInTheDocument();
    expect(screen.getByText("Alumni")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders as header element", () => {
    render(<Header showMenu={false} />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders menu button by default (disabled when no onMenuClick)", () => {
    render(<Header />);
    const btn = screen.getByRole("button", { name: "Open menu" });
    expect(btn).toBeInTheDocument();
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it("menu button is enabled when onMenuClick provided", () => {
    render(<Header onMenuClick={() => {}} />);
    const btn = screen.getByRole("button", { name: "Open menu" });
    expect((btn as HTMLButtonElement).disabled).toBe(false);
  });

  it("menu button shows correct aria when open", () => {
    render(<Header onMenuClick={() => {}} isMenuOpen={true} />);
    const btn = screen.getByRole("button", { name: "Close menu" });
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("allows custom nav links via props", () => {
    render(
      <Header
        showMenu={false}
        navLinks={[
          { text: "Custom 1", href: "/custom1" },
          { text: "Custom 2", href: "/custom2" },
        ]}
      />,
    );
    expect(screen.getByText("Custom 1")).toBeInTheDocument();
    expect(screen.getByText("Custom 2")).toBeInTheDocument();
  });
});
