import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAnimatedPresence } from "./useAnimatedPresence";

describe("useAnimatedPresence", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns shouldRender=false and isAnimating=false when closed initially", () => {
    const { result } = renderHook(() => useAnimatedPresence(false));
    expect(result.current.shouldRender).toBe(false);
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.mountKey).toBe(0);
  });

  it("sets shouldRender=true immediately when opened", () => {
    const { result, rerender } = renderHook(
      ({ isOpen }: { isOpen: boolean }) => useAnimatedPresence(isOpen),
      { initialProps: { isOpen: false } },
    );

    rerender({ isOpen: true });
    expect(result.current.shouldRender).toBe(true);
  });

  it("increments mountKey on each open", () => {
    const { result, rerender } = renderHook(
      ({ isOpen }: { isOpen: boolean }) => useAnimatedPresence(isOpen),
      { initialProps: { isOpen: false } },
    );

    const key1 = result.current.mountKey;
    rerender({ isOpen: true });
    expect(result.current.mountKey).toBeGreaterThan(key1);

    rerender({ isOpen: false });
    act(() => vi.advanceTimersByTime(250));

    const key2 = result.current.mountKey;
    rerender({ isOpen: true });
    expect(result.current.mountKey).toBeGreaterThan(key2);
  });

  it("resets isAnimating to false on close and removes from DOM after timeout", () => {
    const { result, rerender } = renderHook(
      ({ isOpen }: { isOpen: boolean }) => useAnimatedPresence(isOpen),
      { initialProps: { isOpen: true } },
    );

    expect(result.current.shouldRender).toBe(true);

    // Close
    rerender({ isOpen: false });
    // Animation flags to false, but still in DOM
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.shouldRender).toBe(true);

    // After exit duration + buffer (default 200 + 20 = 220ms)
    act(() => vi.advanceTimersByTime(250));
    expect(result.current.shouldRender).toBe(false);
  });

  it("starts rendered when initial isOpen=true", () => {
    const { result } = renderHook(() => useAnimatedPresence(true));
    expect(result.current.shouldRender).toBe(true);
    expect(result.current.isAnimating).toBe(false);
  });

  it("respects custom exit duration", () => {
    const { result, rerender } = renderHook(
      ({ isOpen }: { isOpen: boolean }) => useAnimatedPresence(isOpen, { exitDuration: 500 }),
      { initialProps: { isOpen: false } },
    );

    rerender({ isOpen: true });
    rerender({ isOpen: false });

    // Still in DOM before exit duration
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.shouldRender).toBe(true);

    // Removed after exit duration + buffer
    act(() => vi.advanceTimersByTime(450));
    expect(result.current.shouldRender).toBe(false);
  });
});
