import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroPanel, heroPanelClass } from "./HeroPanel";
import React from "react";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt={props.alt as string} src={props.src as string} />;
  },
}));

// Mock data/images
vi.mock("@/data/images", () => ({
  HERO_IMAGES: [
    {
      filename: "hero-bg.jpg",
      alt: "Hero background image showing students on campus",
      section: "homepage-hero",
    },
  ],
}));

// Mock data/homepage
vi.mock("@/data/homepage", () => ({
  HERO_CONTENT: {
    statement: "St. Elizabeth High School inspires transformative learning...",
    heading: "Nurturing Hearts",
    loadOverlayText: "WE BELIEVE",
  },
}));

describe("HeroPanel", () => {
  it("renders the hero heading text", () => {
    render(<HeroPanel />);
    expect(screen.getByText("Nurturing Hearts")).toBeDefined();
  });

  it("renders the hero statement text", () => {
    render(<HeroPanel />);
    expect(
      screen.getByText(/St\. Elizabeth High School inspires transformative learning/),
    ).toBeDefined();
  });

  it("renders a background image with the hero alt text", () => {
    render(<HeroPanel />);
    const img = screen.getByAltText("Hero background image showing students on campus");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe("/images/hero-bg.jpg");
  });

  it("exports heroPanelClass for the orchestrator", () => {
    // Imported at the top — just verify it's a non-empty string
    expect(heroPanelClass).toBeDefined();
    expect(typeof heroPanelClass).toBe("string");
    expect(heroPanelClass.length).toBeGreaterThan(0);
  });
});
