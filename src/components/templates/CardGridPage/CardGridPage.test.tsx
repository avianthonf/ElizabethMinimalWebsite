import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardGridPage } from "./CardGridPage";
import React from "react";

// Mock dependencies
vi.mock("@/components/layout/PageShell", () => ({
  PageShell: ({
    children,
    hero,
  }: {
    children: React.ReactNode;
    hero?: React.ReactNode;
  }) => (
    <div data-testid="mock-page-shell">
      <div data-testid="mock-hero">{hero}</div>
      <div data-testid="mock-content">{children}</div>
    </div>
  ),
}));

vi.mock("@/components/layout/Container", () => ({
  Container: ({
    children,
    width,
  }: {
    children: React.ReactNode;
    width?: string;
  }) => <div data-testid="mock-container" data-width={width}>{children}</div>,
}));

vi.mock("@/components/layout/Section", () => ({
  Section: ({
    children,
    ariaLabel,
  }: {
    children: React.ReactNode;
    ariaLabel?: string;
  }) => <section aria-label={ariaLabel} data-testid="mock-section">{children}</section>,
}));

vi.mock("@/components/layout/Grid", () => ({
  Grid: ({
    children,
    columns,
  }: {
    children: React.ReactNode;
    columns?: number;
  }) => <div data-testid="mock-grid" data-columns={columns}>{children}</div>,
}));

vi.mock("@/components/layout/Stack", () => ({
  Stack: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-stack">{children}</div>
  ),
}));

vi.mock("@/components/primitives/Heading", () => ({
  Heading: ({
    children,
    level,
    variant,
  }: {
    children: React.ReactNode;
    level?: "h1" | "h2";
    variant?: string;
  }) => {
    const Tag = level ?? "h2";
    return <Tag data-testid="mock-heading" data-variant={variant}>{children}</Tag>;
  },
}));

vi.mock("@/components/primitives/Text", () => ({
  Text: ({
    children,
    variant,
    size,
  }: {
    children: React.ReactNode;
    variant?: string;
    size?: string;
  }) => <p data-testid="mock-text" data-variant={variant} data-size={size}>{children}</p>,
}));

vi.mock("@/components/content/Hero", () => ({
  Hero: ({
    eyebrow,
    heading,
    description,
  }: {
    eyebrow?: string;
    heading: string;
    description?: string;
  }) => (
    <div data-testid="mock-hero-component">
      {eyebrow && <p data-testid="hero-eyebrow">{eyebrow}</p>}
      <h1 data-testid="hero-heading">{heading}</h1>
      {description && <p data-testid="hero-description">{description}</p>}
    </div>
  ),
}));

interface TestItem {
  id: string;
  name: string;
}

const TEST_ITEMS: TestItem[] = [
  { id: "1", name: "Item One" },
  { id: "2", name: "Item Two" },
  { id: "3", name: "Item Three" },
];

function renderItem(item: TestItem, _index: number) {
  return <div key={item.id} data-testid={`card-${item.id}`}>{item.name}</div>;
}

describe("CardGridPage", () => {
  it("renders the hero heading", () => {
    render(
      <CardGridPage
        heroHeading="About St. Elizabeth"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    expect(screen.getByTestId("hero-heading").textContent).toBe("About St. Elizabeth");
  });

  it("renders hero eyebrow when provided", () => {
    render(
      <CardGridPage
        heroEyebrow="Discover"
        heroHeading="About Us"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    expect(screen.getByTestId("hero-eyebrow").textContent).toBe("Discover");
  });

  it("does not render hero eyebrow when omitted", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    expect(screen.queryByTestId("hero-eyebrow")).toBeNull();
  });

  it("renders hero description when provided", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        heroDescription="Learn about our mission and values."
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    expect(screen.getByTestId("hero-description").textContent).toBe(
      "Learn about our mission and values.",
    );
  });

  it("renders section heading when provided", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        sectionHeading="Our Values"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="Our values"
      />,
    );
    // When sectionHeading is provided, there should be two headings:
    // 1. hero-heading (h1), 2. section heading (h2 with mock-heading)
    const headings = screen.getAllByTestId("mock-heading");
    // Filter to find the section heading (hero uses its own testid)
    const sectionHeading = headings.some((h) => h.textContent === "Our Values");
    expect(sectionHeading).toBe(true);
  });

  it("does not render section heading when omitted — heading elements only from hero", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    // No mock-heading elements should be present when sectionHeading is omitted
    // because the hero uses its own mock-hero-component testid
    expect(screen.queryByTestId("mock-heading")).toBeNull();
  });

  it("renders all items as cards via renderCard", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    expect(screen.getByText("Item One")).toBeDefined();
    expect(screen.getByText("Item Two")).toBeDefined();
    expect(screen.getByText("Item Three")).toBeDefined();
  });

  it("renders cards in a Grid when columns are provided", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        items={TEST_ITEMS}
        renderCard={renderItem}
        columns={3}
        sectionAriaLabel="About content"
      />,
    );
    const grid = screen.getByTestId("mock-grid");
    expect(grid).toBeDefined();
    expect(grid.getAttribute("data-columns")).toBe("3");
  });

  it("renders cards in a Stack when columns are omitted", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    expect(screen.queryByTestId("mock-grid")).toBeNull();
    const stacks = screen.getAllByTestId("mock-stack");
    expect(stacks.length).toBeGreaterThan(0);
  });

  it("renders with an empty items array", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        items={[]}
        renderCard={renderItem}
        columns={2}
        sectionAriaLabel="No items"
      />,
    );
    expect(screen.getByTestId("hero-heading")).toBeDefined();
    expect(screen.queryByTestId("card-1")).toBeNull();
  });

  it("sets aria-label on the content section", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="Department listing"
      />,
    );
    const section = screen.getByTestId("mock-section");
    expect(section.getAttribute("aria-label")).toBe("Department listing");
  });

  it("renders breadcrumb when provided", () => {
    render(
      <CardGridPage
        heroHeading="About Us"
        breadcrumb={{
          href: "/about",
          label: "About",
          currentLabel: "Mission & Values",
        }}
        items={TEST_ITEMS}
        renderCard={renderItem}
        sectionAriaLabel="About content"
      />,
    );
    const nav = document.querySelector("nav[aria-label='Breadcrumb']");
    expect(nav).toBeDefined();
    expect(nav?.textContent).toContain("Mission & Values");
  });
});
