import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnnouncementBar } from "./announcement-bar";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

describe("AnnouncementBar", () => {
  const defaultProps = {
    message: "Admissions Open for 2026-27",
    href: "/admissions/apply",
    linkText: "Apply Now",
  };

  it("renders the announcement message", () => {
    render(<AnnouncementBar {...defaultProps} />);
    expect(screen.getByText(/Admissions Open/i)).toBeInTheDocument();
  });

  it("renders a link when href and linkText are provided", () => {
    render(<AnnouncementBar {...defaultProps} />);
    const link = screen.getByRole("link", { name: /Apply Now/i });
    expect(link).toHaveAttribute("href", defaultProps.href);
  });

  it("does not render a link when href is not provided", () => {
    render(<AnnouncementBar message="Admissions Open" />);
    const link = screen.queryByRole("link");
    expect(link).not.toBeInTheDocument();
  });

  it("renders the close button", () => {
    render(<AnnouncementBar {...defaultProps} />);
    expect(screen.getByRole("button", { name: /dismiss/i })).toBeInTheDocument();
  });

  it("dismisses when close is clicked", () => {
    render(<AnnouncementBar {...defaultProps} />);
    const banner = screen.getByRole("region", { name: /announcement/i });
    expect(banner).not.toHaveAttribute("data-hidden", "true");
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    // Bar is hidden via data-hidden attribute — CSS handles opacity/max-height
    expect(banner).toHaveAttribute("data-hidden", "true");
  });

  it("persists dismissal to localStorage", () => {
    render(<AnnouncementBar {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it("has role region", () => {
    render(<AnnouncementBar {...defaultProps} />);
    expect(screen.getByRole("region", { name: /announcement/i })).toBeInTheDocument();
  });
});
