import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders brand text", () => {
    render(<Header brandText="Test School" />);
    expect(screen.getByText("Test School")).toBeInTheDocument();
  });

  it("renders nav links", () => {
    render(
      <Header
        navLinks={[
          { text: "About", href: "/about" },
          { text: "Contact", href: "/contact" },
        ]}
      />,
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders as header element", () => {
    render(<Header showSearch={false} showMenu={false} />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders search button by default", () => {
    render(<Header showMenu={false} />);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("renders menu button by default", () => {
    render(<Header showSearch={false} />);
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });
});
