import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EventsPreview } from "./EventsPreview";

describe("EventsPreview", () => {
  it("renders the section with accessible label", () => {
    render(<EventsPreview />);
    expect(screen.getByRole("region", { name: /upcoming events/i })).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<EventsPreview />);
    expect(screen.getByRole("heading", { level: 2, name: /upcoming events/i })).toBeInTheDocument();
  });

  it("renders at least one event card", () => {
    render(<EventsPreview />);
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders a view full calendar CTA link", () => {
    render(<EventsPreview />);
    const cta = screen.getByRole("link", { name: /view full calendar/i });
    expect(cta).toHaveAttribute("href", "/news");
  });

  it("renders date information for events", () => {
    render(<EventsPreview />);
    const timeElements = document.querySelectorAll("time");
    expect(timeElements.length).toBeGreaterThan(0);
  });

  it("renders decorative icons that are hidden from screen readers", () => {
    const { container } = render(<EventsPreview />);
    const icons = container.querySelectorAll("svg[aria-hidden='true']");
    expect(icons.length).toBeGreaterThan(0);
  });
});
