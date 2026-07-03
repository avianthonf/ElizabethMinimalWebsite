import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Header", () => {
  it("renders brand text", () => {
    render(<Header brandText="Test School" showMenu={false} />);
    expect(screen.getByText("Test School")).toBeInTheDocument();
  });

  it("renders default nav links (6 new IA links)", () => {
    render(<Header showMenu={false} />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Academics")).toBeInTheDocument();
    expect(screen.getByText("Admissions")).toBeInTheDocument();
    expect(screen.getByText("Beyond Academics")).toBeInTheDocument();
    expect(screen.getByText("News & Media")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
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
