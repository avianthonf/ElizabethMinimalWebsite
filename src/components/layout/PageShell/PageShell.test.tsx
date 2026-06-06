import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageShell } from "./PageShell";
import React from "react";

// Mock sub-components
vi.mock("@/components/navigation/Header", () => ({
  Header: (props: Record<string, unknown>) => (
    <header data-testid="mock-header" data-transparent={String(props.transparent)}>
      Header
    </header>
  ),
}));

vi.mock("@/components/navigation/Footer", () => ({
  Footer: () => <footer data-testid="mock-footer">Footer</footer>,
}));

// Mock data
vi.mock("@/data/navigation", () => ({
  HEADER_NAV_LINKS: [
    { text: "About", href: "/about" },
    { text: "Admissions", href: "/admissions" },
  ],
  FOOTER_SECTIONS: [{ title: "About", links: [{ text: "Mission", href: "/about/mission" }] }],
  FOOTER_INTRO: { heading: "St. Elizabeth High School", body: "Guiding Minds..." },
  FOOTER_SOCIAL_LINKS: [],
  FOOTER_COPYRIGHT: "© 2026 St. Elizabeth High School",
}));

describe("PageShell", () => {
  it("renders the Header", () => {
    render(
      <PageShell>
        <p>Page content</p>
      </PageShell>,
    );
    expect(screen.getByTestId("mock-header")).toBeDefined();
  });

  it("renders the Footer", () => {
    render(
      <PageShell>
        <p>Page content</p>
      </PageShell>,
    );
    expect(screen.getByTestId("mock-footer")).toBeDefined();
  });

  it("renders children inside the main element", () => {
    render(
      <PageShell>
        <p>Page content</p>
      </PageShell>,
    );
    const main = document.querySelector("main");
    expect(main).toBeDefined();
    expect(main?.textContent).toContain("Page content");
  });

  it("renders a skip link by default", () => {
    render(
      <PageShell>
        <p>Content</p>
      </PageShell>,
    );
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeDefined();
    expect(skipLink.getAttribute("href")).toBe("#main-content");
    expect(skipLink.className).toContain("skipLink");
  });

  it("does not render skip link when skipLink=false", () => {
    render(
      <PageShell skipLink={false}>
        <p>Content</p>
      </PageShell>,
    );
    expect(screen.queryByText("Skip to main content")).toBeNull();
  });

  it("renders main with id='main-content' and tabIndex=-1", () => {
    render(
      <PageShell>
        <p>Content</p>
      </PageShell>,
    );
    const main = document.getElementById("main-content");
    expect(main).toBeDefined();
    expect(main?.tagName).toBe("MAIN");
    expect(main?.tabIndex).toBe(-1);
  });

  it("renders hero content when provided", () => {
    render(
      <PageShell hero={<div data-testid="hero-section">Hero</div>}>
        <p>Content</p>
      </PageShell>,
    );
    expect(screen.getByTestId("hero-section")).toBeDefined();
    expect(screen.getByText("Hero")).toBeDefined();
  });

  it("renders hero before main content", () => {
    render(
      <PageShell hero={<div data-testid="hero-section">Hero</div>}>
        <p>Content</p>
      </PageShell>,
    );
    const heroEl = screen.getByTestId("hero-section");
    const mainEl = document.getElementById("main-content")!;
    // hero element appears before main element in DOM order
    expect(heroEl.compareDocumentPosition(mainEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("does not render hero when not provided", () => {
    render(
      <PageShell>
        <p>Content</p>
      </PageShell>,
    );
    expect(screen.queryByTestId("hero-section")).toBeNull();
  });

  it("defaults header theme to light (Header transparent=false)", () => {
    render(
      <PageShell>
        <p>Content</p>
      </PageShell>,
    );
    const header = screen.getByTestId("mock-header");
    expect(header.getAttribute("data-transparent")).toBe("false");
  });

  it("passes transparent=true to Header when headerTheme='dark'", () => {
    render(
      <PageShell headerTheme="dark">
        <p>Content</p>
      </PageShell>,
    );
    const header = screen.getByTestId("mock-header");
    expect(header.getAttribute("data-transparent")).toBe("true");
  });
});
