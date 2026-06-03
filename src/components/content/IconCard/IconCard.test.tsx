import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconCard } from "./IconCard";

function MockIcon() {
  return (
    <svg viewBox="0 0 24 24" data-testid="mock-icon">
      <rect width="24" height="24" />
    </svg>
  );
}

describe("IconCard", () => {
  it("renders icon, title, and description", () => {
    render(
      <IconCard
        icon={<MockIcon />}
        title="Academic Excellence"
        description="Rigorous curriculum with support."
      />,
    );
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("Academic Excellence")).toBeInTheDocument();
    expect(screen.getByText("Rigorous curriculum with support.")).toBeInTheDocument();
  });

  it("renders as link when href provided", () => {
    render(
      <IconCard
        icon={<MockIcon />}
        title="Athletics"
        description="Competitive sports."
        href="/athletics"
      />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/athletics");
  });
});
