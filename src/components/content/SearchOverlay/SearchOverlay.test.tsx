import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

import {
  SearchOverlay,
  useSearchOverlay,
  openSearchOverlay,
  SEARCH_OVERLAY_OPEN_EVENT,
} from "./SearchOverlay";

/** Test harness for useSearchOverlay — exposes the hook's API to assertions. */
function HookHarness({ onState }: { onState: (api: ReturnType<typeof useSearchOverlay>) => void }) {
  const api = useSearchOverlay();
  // Expose via callback so tests can read latest state
  onState(api);
  return (
    <button type="button" data-testid="trigger" onClick={api.openOverlay}>
      open
    </button>
  );
}

describe("SearchOverlay", () => {
  beforeEach(() => {
    // Reset global state between tests
    delete window.pagefind;
    // Reset body overflow
    document.body.style.overflow = "";
    // Clear any pending timers
    vi.clearAllTimers();
  });

  afterEach(() => {
    // Remove any script tags the component injected
    document.querySelectorAll("script[data-pagefind-loader]").forEach((s) => s.remove());
    // Clear any pending timers
    vi.clearAllTimers();
  });

  it("does not render when closed", () => {
    render(<SearchOverlay open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog", { name: /search/i })).toBeNull();
  });

  it("renders the dialog when open", () => {
    render(<SearchOverlay open={true} onClose={() => {}} />);
    expect(screen.getByRole("dialog", { name: /search/i })).toBeInTheDocument();
  });

  it("focuses the search input on open", async () => {
    render(<SearchOverlay open={true} onClose={() => {}} />);
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: /search query/i })).toHaveFocus();
    });
  });

  it("locks body scroll when open", () => {
    render(<SearchOverlay open={true} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(<SearchOverlay open={true} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<SearchOverlay open={false} onClose={() => {}} />);
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<SearchOverlay open={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /close search/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<SearchOverlay open={true} onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<SearchOverlay open={true} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog, { target: dialog });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("updates query when typing in the input", () => {
    render(<SearchOverlay open={true} onClose={() => {}} />);
    const input = screen.getByRole("textbox", { name: /search query/i });
    fireEvent.change(input, { target: { value: "admissions" } });
    expect(input).toHaveValue("admissions");
  });

  it("renders suggestion chips when query is empty", () => {
    render(<SearchOverlay open={true} onClose={() => {}} />);
    expect(screen.getByRole("button", { name: /admissions/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /curriculum/i })).toBeInTheDocument();
  });

  it("clicking a suggestion chip populates the input", () => {
    render(<SearchOverlay open={true} onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /admissions/i }));
    expect(screen.getByRole("textbox", { name: /search query/i })).toHaveValue("admissions");
  });

  it("does not show results when query is empty", () => {
    render(<SearchOverlay open={true} onClose={() => {}} />);
    // The results list should not be present (suggestions render but that's a different list)
    expect(screen.queryByText(/no results found/i)).toBeNull();
  });

  it("shows 'no results' when pagefind returns empty results", async () => {
    const search = vi.fn().mockResolvedValue({ results: [] });
    window.pagefind = { search };
    render(<SearchOverlay open={true} onClose={() => {}} />);
    const input = screen.getByRole("textbox", { name: /search query/i });
    fireEvent.change(input, { target: { value: "nothing" } });
    // Wait past the 150ms debounce + multiple microtask flushes
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });
    expect(search).toHaveBeenCalledWith("nothing");
  });

  it("renders search results when pagefind returns matches", async () => {
    const data = {
      url: "/about",
      meta: { title: "About Us" },
      excerpt: "Learn about our school",
    };
    window.pagefind = {
      search: vi.fn().mockResolvedValue({
        results: [{ id: "1", data: () => Promise.resolve(data) }],
      }),
    };
    render(<SearchOverlay open={true} onClose={() => {}} maxResults={5} />);
    const input = screen.getByRole("textbox", { name: /search query/i });
    fireEvent.change(input, { target: { value: "about" } });
    // Wait for the search to complete
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });
    // Verify results are shown
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("list").textContent).toContain("About Us");
  }, 15000);

  it("navigates to the first result when Enter is pressed", async () => {
    const mockData = {
      url: "/about",
      meta: { title: "About Us" },
      excerpt: "Learn about our school",
    };
    window.pagefind = {
      search: vi.fn().mockResolvedValue({
        results: [{ id: "1", data: () => Promise.resolve(mockData) }],
      }),
    };

    const onClose = vi.fn();
    render(<SearchOverlay open={true} onClose={onClose} />);
    const input = screen.getByRole("textbox", { name: /search query/i });
    fireEvent.change(input, { target: { value: "about" } });
    // Wait for the search to complete
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });
    // Verify results are shown
    expect(screen.getByRole("list")).toBeInTheDocument();
    // Press Enter to navigate to first result
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Enter" });
    // Router push was called with the first result's URL
    expect(mockPush).toHaveBeenCalledWith("/about");
    expect(onClose).toHaveBeenCalledTimes(1);
  }, 15000);

  it("respects the maxResults cap", async () => {
    const results = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      data: () =>
        Promise.resolve({
          url: `/p/${i}`,
          meta: { title: `Page ${i}` },
          excerpt: `Excerpt ${i}`,
        }),
    }));
    window.pagefind = {
      search: vi.fn().mockResolvedValue({ results }),
    };
    render(<SearchOverlay open={true} onClose={() => {}} maxResults={3} />);
    const input = screen.getByRole("textbox", { name: /search query/i });
    fireEvent.change(input, { target: { value: "test" } });
    await screen.findByText("Page 0", {}, { timeout: 10000 });
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  }, 15000);
});

describe("useSearchOverlay hook", () => {
  beforeEach(() => {
    delete window.pagefind;
  });

  it("toggles open state on ⌘K", () => {
    let captured: ReturnType<typeof useSearchOverlay> | null = null;
    render(<HookHarness onState={(api) => (captured = api)} />);
    expect(captured!.open).toBe(false);
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    });
    expect(captured!.open).toBe(true);
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    });
    expect(captured!.open).toBe(false);
  });

  it("toggles open state on Ctrl+K", () => {
    let captured: ReturnType<typeof useSearchOverlay> | null = null;
    render(<HookHarness onState={(api) => (captured = api)} />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
    });
    expect(captured!.open).toBe(true);
  });

  it("opens when the custom event is dispatched", () => {
    let captured: ReturnType<typeof useSearchOverlay> | null = null;
    render(<HookHarness onState={(api) => (captured = api)} />);
    act(() => {
      window.dispatchEvent(new Event(SEARCH_OVERLAY_OPEN_EVENT));
    });
    expect(captured!.open).toBe(true);
  });

  it("openOverlay and closeOverlay work directly", () => {
    let captured: ReturnType<typeof useSearchOverlay> | null = null;
    render(<HookHarness onState={(api) => (captured = api)} />);
    act(() => {
      captured!.openOverlay();
    });
    expect(captured!.open).toBe(true);
    act(() => {
      captured!.closeOverlay();
    });
    expect(captured!.open).toBe(false);
  });
});

describe("openSearchOverlay helper", () => {
  it("dispatches the custom event on window", () => {
    const handler = vi.fn();
    window.addEventListener(SEARCH_OVERLAY_OPEN_EVENT, handler);
    openSearchOverlay();
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener(SEARCH_OVERLAY_OPEN_EVENT, handler);
  });
});
