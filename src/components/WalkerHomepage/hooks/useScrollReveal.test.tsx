import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollReveal } from "./useScrollReveal";

type ObserverEntrySubset = { isIntersecting: boolean };
type ObserverCallback = (entries: ObserverEntrySubset[]) => void;

describe("useScrollReveal", () => {
  let observerCallback: ObserverCallback | null = null;
  let disconnectSpy: ReturnType<typeof vi.fn>;
  let observeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observerCallback = null;
    disconnectSpy = vi.fn();
    observeSpy = vi.fn();

    // `vi.fn()` with arrow functions doesn't work as a constructor.
    // Use a proper class mock so `new IntersectionObserver(...)` succeeds.
    class MockIntersectionObserver {
      callback: ObserverCallback;
      observe = observeSpy;
      disconnect = disconnectSpy;
      unobserve = vi.fn();
      takeRecords = () => [];
      root = null;
      rootMargin = "0px 0px -40px 0px";
      thresholds = [0.15];

      constructor(callback: ObserverCallback) {
        observerCallback = callback;
        this.callback = callback;
      }
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  // ── Initial state ────────────────────────────────────────────────

  it("returns isVisible=false initially", () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.isVisible).toBe(false);
  });

  // ── Observer fires → visible ─────────────────────────────────────

  it("sets isVisible true when intersection occurs", () => {
    const { result } = renderHook(() => useScrollReveal());

    const node = document.createElement("div");

    act(() => {
      result.current.ref(node);
    });

    expect(observeSpy).toHaveBeenCalledWith(node);

    act(() => {
      observerCallback!([{ isIntersecting: true }]);
    });

    expect(result.current.isVisible).toBe(true);
  });

  // ── One-shot: disconnects after first intersection ───────────────

  it("disconnects the observer after becoming visible", () => {
    const { result } = renderHook(() => useScrollReveal());

    const node = document.createElement("div");
    act(() => {
      result.current.ref(node);
    });

    act(() => {
      observerCallback!([{ isIntersecting: true }]);
    });

    expect(disconnectSpy).toHaveBeenCalled();
    expect(result.current.isVisible).toBe(true);
  });

  // ── Non-intersecting keeps isVisible false ───────────────────────

  it("keeps isVisible false when intersection entry is false", () => {
    const { result } = renderHook(() => useScrollReveal());

    const node = document.createElement("div");
    act(() => {
      result.current.ref(node);
    });

    act(() => {
      observerCallback!([{ isIntersecting: false }]);
    });

    expect(result.current.isVisible).toBe(false);
    expect(disconnectSpy).not.toHaveBeenCalled();
  });

  // ── Ref cleanup on unmount ───────────────────────────────────────

  it("disconnects observer on unmount", () => {
    const { result, unmount } = renderHook(() => useScrollReveal());

    const node = document.createElement("div");
    act(() => {
      result.current.ref(node);
    });

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  // ── Ref called with null (detach) ────────────────────────────────

  it("handles ref=null without throwing", () => {
    const { result } = renderHook(() => useScrollReveal());

    const node = document.createElement("div");
    act(() => {
      result.current.ref(node);
    });

    act(() => {
      result.current.ref(null);
    });

    // Should not throw — disconnect is called for the previous observer
    expect(disconnectSpy).toHaveBeenCalled();
  });

  // ── Already visible — skips observing new nodes ──────────────────

  it("does not create or observe a new element when already visible", () => {
    const { result } = renderHook(() => useScrollReveal());

    const node1 = document.createElement("div");
    act(() => {
      result.current.ref(node1);
    });

    // Make visible via intersection
    act(() => {
      observerCallback!([{ isIntersecting: true }]);
    });

    expect(result.current.isVisible).toBe(true);
    const observeCallCount = observeSpy.mock.calls.length;

    // Attach a new node — should NOT observe since already visible
    const node2 = document.createElement("div");
    act(() => {
      result.current.ref(node2);
    });

    // observeSpy should not have been called additional times
    expect(observeSpy.mock.calls.length).toBe(observeCallCount);
  });
});
