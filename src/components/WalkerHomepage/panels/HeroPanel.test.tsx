import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroPanel, heroPanelClass } from "./HeroPanel";
import React from "react";

// Mock data/homepage
vi.mock("@/data/homepage", () => ({
  HERO_CONTENT: {
    statement: "St. Elizabeth's High School inspires transformative learning...",
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
      screen.getByText(/St\. Elizabeth's High School inspires transformative learning/)
    ).toBeDefined();
  });

  it("renders a looping video background", () => {
    render(<HeroPanel />);
    const video = document.querySelector("video") as HTMLVideoElement;
    expect(video).toBeDefined();
    expect(video.getAttribute("src")).toBe("/videos/hero-video.mp4");
    expect(video.loop).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.autoplay).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
  });

  it("exports heroPanelClass for the orchestrator", () => {
    // Imported at the top — just verify it's a non-empty string
    expect(heroPanelClass).toBeDefined();
    expect(typeof heroPanelClass).toBe("string");
    expect(heroPanelClass.length).toBeGreaterThan(0);
  });
});
