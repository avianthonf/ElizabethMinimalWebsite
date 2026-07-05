import { act, render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useEffect } from "react";
import { MenuOverlay } from "./MenuOverlay";
import { MenuProvider, useMenu } from "./MenuProvider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

/**
 * Helper: opens the menu on mount via a useEffect. This is more reliable
 * than calling open() during render (which fires a React warning).
 */
function AutoOpen({ children }: { children: React.ReactNode }) {
  const menu = useMenu();
  const open = menu?.open;
  useEffect(() => {
    open?.();
  }, [open]);
  return <>{children}</>;
}

function renderOverlay({ initiallyOpen = false }: { initiallyOpen?: boolean } = {}) {
  if (initiallyOpen) {
    return render(
      <MenuProvider>
        <AutoOpen>
          <MenuOverlay />
        </AutoOpen>
      </MenuProvider>,
    );
  }
  return render(
    <MenuProvider>
      <MenuOverlay />
    </MenuProvider>,
  );
}

describe("MenuOverlay", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("does not render anything when closed", () => {
    renderOverlay();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders as a dialog with aria-modal when open", () => {
    renderOverlay({ initiallyOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Site navigation menu");
  });

  it("renders all 6 category headings when open", () => {
    renderOverlay({ initiallyOpen: true });
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    expect(screen.getByText("ACADEMICS")).toBeInTheDocument();
    expect(screen.getByText("ADMISSIONS")).toBeInTheDocument();
    expect(screen.getByText("BEYOND ACADEMICS")).toBeInTheDocument();
    expect(screen.getByText("NEWS & MEDIA")).toBeInTheDocument();
    expect(screen.getByText("CONTACT US")).toBeInTheDocument();
  });

  it("renders links for each category with correct hrefs", () => {
    renderOverlay({ initiallyOpen: true });
    expect(screen.getByRole("link", { name: "Vision, Mission & Values" })).toHaveAttribute(
      "href",
      "/about/mission",
    );
    expect(screen.getByRole("link", { name: "Curriculum" })).toHaveAttribute(
      "href",
      "/academics/curriculum",
    );
    expect(screen.getByRole("link", { name: "Latest News" })).toHaveAttribute("href", "/news");
  });

  it("calls close when the close button is clicked", () => {
    renderOverlay({ initiallyOpen: true });
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls close when the scrim is clicked", () => {
    const { container } = renderOverlay({ initiallyOpen: true });
    const scrim = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    fireEvent.click(scrim);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls close when a link is clicked", () => {
    renderOverlay({ initiallyOpen: true });
    fireEvent.click(screen.getByRole("link", { name: "Curriculum" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls close when Escape is pressed", () => {
    renderOverlay({ initiallyOpen: true });
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not call close on non-Escape keys", () => {
    renderOverlay({ initiallyOpen: true });
    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.keyDown(window, { key: " " });
    expect(screen.queryByRole("dialog")).toBeInTheDocument();
  });

  it("locks body scroll when open", () => {
    renderOverlay({ initiallyOpen: true });
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("unlocks body scroll when closed", () => {
    renderOverlay({ initiallyOpen: true });
    expect(document.body.style.overflow).toBe("hidden");
    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });
    // After the overlay closes, the body scroll lock is released.
    // (We don't assert the exact previous value because jsdom's render
    // manipulates body.innerHTML which clears inline styles.)
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
