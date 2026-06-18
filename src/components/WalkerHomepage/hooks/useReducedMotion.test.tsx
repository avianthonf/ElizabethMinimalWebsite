import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

describe("useReducedMotion", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when prefers-reduced-motion is not set", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when prefers-reduced-motion is reduce", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("updates when media query changes", () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | undefined;
    const addEventListener = vi.fn((_: string, handler: (e: MediaQueryListEvent) => void) => {
      changeHandler = handler;
    });

    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      addEventListener,
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    // Simulate media query change
    act(() => {
      changeHandler?.({ matches: true } as MediaQueryListEvent);
    });
    expect(result.current).toBe(true);
  });

  it("cleans up event listener on unmount", () => {
    const removeEventListener = vi.fn();
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    } as unknown as MediaQueryList);

    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });
});
