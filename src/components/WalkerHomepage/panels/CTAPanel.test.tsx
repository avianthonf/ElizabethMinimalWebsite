import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTAPanel, ctaPanelClass } from "./CTAPanel";
import React from "react";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

// Mock data
vi.mock("@/data/homepage", () => ({
  CTA_CONTENT: {
    heading: "Ready to Join Our Community?",
    eyebrow: "Ready to Discover St. Elizabeth?",
    description: "Start your St. Elizabeth journey today.",
    primaryCTA: { text: "Inquire Now" as const, href: "/admissions" as const },
    secondaryCTA: { text: "Plan a Visit" as const, href: "/contact/visit" as const },
  },
}));

describe("CTAPanel", () => {
  it("renders the CTA heading", () => {
    render(<CTAPanel />);
    expect(screen.getByText("Ready to Join Our Community?")).toBeDefined();
  });

  it("renders the CTA description", () => {
    render(<CTAPanel />);
    expect(
      screen.getByText("Start your St. Elizabeth journey today."),
    ).toBeDefined();
  });

  it("renders the primary CTA button", () => {
    render(<CTAPanel />);
    const btn = screen.getByText("Inquire Now");
    expect(btn).toBeDefined();
    expect(btn.closest("a")?.getAttribute("href")).toBe("/admissions");
  });

  it("renders the secondary CTA button", () => {
    render(<CTAPanel />);
    const btn = screen.getByText("Plan a Visit");
    expect(btn).toBeDefined();
    expect(btn.closest("a")?.getAttribute("href")).toBe("/contact/visit");
  });

  it("exports ctaPanelClass for the orchestrator", () => {
    expect(ctaPanelClass).toBeDefined();
    expect(typeof ctaPanelClass).toBe("string");
  });

  it("passes eyebrow to CTASection", () => {
    render(<CTAPanel />);
    expect(screen.getByText("Ready to Discover St. Elizabeth?")).toBeDefined();
  });

  it("passes image to CTASection", () => {
    render(<CTAPanel />);
    const img = screen.getByRole("img");
    expect(img).toBeDefined();
    expect(img).toHaveAttribute("src", expect.stringContaining("DSC07306"));
  });
});
