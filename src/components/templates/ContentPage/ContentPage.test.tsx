import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("next/navigation", () => ({
  usePathname: () => "/about/staff",
}));

vi.mock("@/components/layout/PageShell", () => ({
  PageShell: ({ children, hero }: { children: React.ReactNode; hero?: React.ReactNode }) => (
    <div data-testid="pageshell">
      {hero}
      {children}
    </div>
  ),
}));

vi.mock("@/components/content/Hero", () => ({
  Hero: ({ heading }: { heading: string }) => <h1 data-testid="mock-hero">{heading}</h1>,
}));

vi.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => <nav data-testid="mock-breadcrumb">Breadcrumb</nav>,
}));

vi.mock("@/components/navigation/Breadcrumb/BreadcrumbJsonLd", () => ({
  BreadcrumbJsonLd: () => <div data-testid="mock-jsonld" />,
}));

// Import after mocks
import { ContentPage } from "./ContentPage";

const items = [
  { name: "Item 1", description: "First item" },
  { name: "Item 2", description: "Second item" },
];

describe("ContentPage", () => {
  it("renders the hero heading via mocked Hero", () => {
    render(
      <ContentPage
        heroHeading="Test Page"
        items={items}
        renderItem={(item) => <div key={item.name}>{item.name}</div>}
        sectionAriaLabel="Test section"
      />,
    );
    expect(screen.getByTestId("mock-hero")).toHaveTextContent("Test Page");
  });

  it("renders all items", () => {
    render(
      <ContentPage
        heroHeading="Test Page"
        items={items}
        renderItem={(item) => <div key={item.name}>{item.name}</div>}
        sectionAriaLabel="Test section"
      />,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders section heading when provided", () => {
    render(
      <ContentPage
        heroHeading="Test Page"
        sectionHeading="Section Title"
        items={items}
        renderItem={(item) => <div key={item.name}>{item.name}</div>}
        sectionAriaLabel="Test section"
      />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Section Title");
  });

  it("wraps content in PageShell", () => {
    render(
      <ContentPage
        heroHeading="Test Page"
        items={items}
        renderItem={(item) => <div key={item.name}>{item.name}</div>}
        sectionAriaLabel="Test section"
      />,
    );
    expect(screen.getByTestId("pageshell")).toBeInTheDocument();
  });

  it("renders in list layout when specified", () => {
    render(
      <ContentPage
        heroHeading="Test Page"
        items={items}
        renderItem={(item) => <div key={item.name}>{item.name}</div>}
        sectionAriaLabel="Test section"
        layout="list"
      />,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders breadcrumb when breadcrumb prop is provided", () => {
    render(
      <ContentPage
        heroHeading="Test Page"
        breadcrumb={{ href: "/about", label: "About", currentLabel: "Staff" }}
        items={items}
        renderItem={(item) => <div key={item.name}>{item.name}</div>}
        sectionAriaLabel="Test section"
      />,
    );
    expect(screen.getByTestId("mock-breadcrumb")).toBeInTheDocument();
  });

  it("renders JSON-LD when breadcrumb prop is provided", () => {
    render(
      <ContentPage
        heroHeading="Test Page"
        breadcrumb={{ href: "/about", label: "About", currentLabel: "Staff" }}
        items={items}
        renderItem={(item) => <div key={item.name}>{item.name}</div>}
        sectionAriaLabel="Test section"
      />,
    );
    expect(screen.getByTestId("mock-jsonld")).toBeInTheDocument();
  });
});
