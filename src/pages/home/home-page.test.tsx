import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./home-page";

// Mock next/navigation for useRouter / usePathname used by Header
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

/**
 * HomePage smoke tests.
 *
 * HomePage is the most complex page in the app — it composes 15+ sections
 * with skip link, announcement bar, header, and footer. These tests assert
 * the critical structural elements exist so a broken import or missing
 * section is caught immediately.
 */
describe("HomePage", () => {
  it("renders the skip link", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /skip to main content/i })).toBeInTheDocument();
  });

  it("renders main content with the correct id", () => {
    render(<HomePage />);
    expect(document.getElementById("main-content")).toBeInTheDocument();
  });

  it("renders the announcement bar", () => {
    render(<HomePage />);
    expect(screen.getByRole("region", { name: /announcement/i })).toBeInTheDocument();
  });

  it("renders the Header", () => {
    render(<HomePage />);
    // The Header is a <header> landmark
    const headers = screen.getAllByRole("banner");
    expect(headers.length).toBeGreaterThan(0);
  });

  it("renders the Footer", () => {
    render(<HomePage />);
    // Footer contains <footer> elements — at least one should exist
    const footers = screen.getAllByRole("contentinfo");
    expect(footers.length).toBeGreaterThan(0);
  });

  it("renders the hero carousel", () => {
    render(<HomePage />);
    expect(screen.getByRole("region", { name: /featured highlights/i })).toBeInTheDocument();
  });

  it("renders all major homepage sections", () => {
    render(<HomePage />);

    // The sections are wrapped in ScrollReveal, so we look for their
    // content landmarks / aria-labels.
    expect(screen.getByRole("region", { name: /welcome to st/i })).toBeInTheDocument();

    expect(screen.getByRole("region", { name: /why choose/i })).toBeInTheDocument();

    expect(screen.getByRole("region", { name: /programmes at a glance/i })).toBeInTheDocument();

    expect(
      screen.getByRole("region", { name: /achievements and milestones/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("region", { name: /latest news/i })).toBeInTheDocument();

    expect(screen.getByRole("region", { name: /locate us/i })).toBeInTheDocument();
  });
});
