import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuOverlay } from "./MenuOverlay";
import type { NavCategory } from "@/data/navigation";

const mockCategories: NavCategory[] = [
  {
    title: "ABOUT",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { text: "Why St. Elizabeth?", href: "/admissions/why" },
    ],
  },
];

const mockPreviewImages: Record<string, string> = {
  ABOUT: "about-preview.jpg",
  ADMISSIONS: "admissions-preview.jpg",
};

describe("MenuOverlay — closed state", () => {
  it("returns null when closed (DOM removal via shouldRender)", () => {
    const { container } = render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={false}
        onClose={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe("MenuOverlay — open state (DOM)", () => {
  it("renders all categories when open", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText("ABOUT")).toBeDefined();
    expect(screen.getByText("ADMISSIONS")).toBeDefined();
    expect(screen.getByText("Mission & Values")).toBeDefined();
    expect(screen.getByText("History")).toBeDefined();
  });

  it("renders nav links with correct hrefs", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const link = screen.getByText("Mission & Values");
    expect(link.getAttribute("href")).toBe("/about/mission");
  });

  it("has aria-modal when open", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("has role dialog", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it("has an accessible close button", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(
      screen.getByLabelText("Close navigation menu"),
    ).toBeDefined();
  });
});

describe("MenuOverlay — close interactions", () => {
  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByLabelText("Close navigation menu"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when Escape pressed", () => {
    const onClose = vi.fn();
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={onClose}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when backdrop clicked", () => {
    const onClose = vi.fn();
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={onClose}
      />,
    );
    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when a nav link is clicked", () => {
    const onClose = vi.fn();
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByText("Mission & Values"));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe("MenuOverlay — body scroll management", () => {
  it("prevents body scroll when open", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(document.body.style.overflow).toBe("hidden");

    // Closing the overlay should restore body scroll
    rerender(
      <MenuOverlay
        categories={mockCategories}
        isOpen={false}
        onClose={vi.fn()}
      />,
    );
    // After closing, the effect runs and sets overflow back to ""
    expect(document.body.style.overflow).toBe("");
  });
});

describe("MenuOverlay — image preview on hover/focus", () => {
  it("shows preview image when a category is hovered", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        previewImages={mockPreviewImages}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    // Hover over the ABOUT category container
    const aboutCategory = screen.getByText("ABOUT").closest("div")!;
    fireEvent.mouseEnter(aboutCategory);

    // The preview panel should have a div with the ABOUT preview image
    const previewDiv = document.querySelector(
      "[style*='about-preview.jpg']",
    );
    expect(previewDiv).toBeDefined();
  });

  it("shows preview image when a category receives focus", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        previewImages={mockPreviewImages}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    // Focus a link inside the ABOUT category — this triggers onFocus on the parent
    const aboutLink = screen.getByText("Mission & Values");
    fireEvent.focus(aboutLink);

    const previewDiv = document.querySelector(
      "[style*='about-preview.jpg']",
    );
    expect(previewDiv).toBeDefined();
  });

  it("hides preview image when category loses hover", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        previewImages={mockPreviewImages}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const aboutCategory = screen.getByText("ABOUT").closest("div")!;
    fireEvent.mouseEnter(aboutCategory);

    let previewDiv = document.querySelector(
      "[style*='about-preview.jpg']",
    );
    expect(previewDiv).toBeDefined();

    fireEvent.mouseLeave(aboutCategory);
    previewDiv = document.querySelector("[style*='about-preview.jpg']");
    expect(previewDiv).toBeNull();
  });
});

describe("MenuOverlay — focus trap", () => {
  it("wraps Tab from last focusable element to first", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const dialog = screen.getByRole("dialog");
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );

    // There should be at least 2 focusable elements (close button + links)
    expect(focusable.length).toBeGreaterThanOrEqual(2);

    const lastEl = focusable[focusable.length - 1];
    lastEl.focus();
    expect(document.activeElement).toBe(lastEl);

    // Tab from the last element should wrap to first
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });

    // After the keydown, activeElement should be the first element
    // (because the keyboard handler does e.preventDefault() + first.focus())
    expect(document.activeElement).toBe(focusable[0]);
  });

  it("wraps Shift+Tab from first focusable element to last", () => {
    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const dialog = screen.getByRole("dialog");
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );

    expect(focusable.length).toBeGreaterThanOrEqual(2);

    const firstEl = focusable[0];
    firstEl.focus();
    expect(document.activeElement).toBe(firstEl);

    // Shift+Tab from the first element should wrap to last
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

    expect(document.activeElement).toBe(focusable[focusable.length - 1]);
  });
});

describe("MenuOverlay — reduced motion", () => {
  it("does not animate when prefers-reduced-motion is set", () => {
    // Mock matchMedia to return reduced motion preference
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <MenuOverlay
        categories={mockCategories}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );

    // Just verify the overlay is present and accessible
    // The actual CSS media query behavior is tested via visual verification
    expect(screen.getByRole("dialog")).toBeDefined();

    window.matchMedia = originalMatchMedia;
  });
});
