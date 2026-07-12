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

// Mock the async import in events.fetcher to avoid dynamic import issues
vi.mock("@/domains/homepage/events.fetcher", () => ({
  getUpcomingEvents: async () => [
    { title: "Annual Day", date: "2026-12-15", type: "cultural" as const },
    { title: "Sports Meet", date: "2026-11-20", type: "sports" as const },
  ],
}));

/**
 * HomePage smoke tests.
 *
 * HomePage composes 15+ sections. The shell (Header, Footer,
 * AnnouncementBar, SkipLink, <main>) is rendered by the (home)/layout.
 * These tests assert the page sections are present.
 */
describe("HomePage", () => {
  it("renders the hero carousel", async () => {
    render(await HomePage());
    expect(screen.getByRole("region", { name: /featured highlights/i })).toBeInTheDocument();
  });

  it("renders all major homepage sections", async () => {
    render(await HomePage());

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
