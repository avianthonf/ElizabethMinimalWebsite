import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMenuState } from "./useMenuState";

describe("useMenuState", () => {
  it("returns isOpen false initially", () => {
    const { result } = renderHook(() => useMenuState());
    expect(result.current.isOpen).toBe(false);
  });

  // ── open / close ─────────────────────────────────────────────────

  it("open() sets isOpen to true", () => {
    const { result } = renderHook(() => useMenuState());

    act(() => result.current.open());

    expect(result.current.isOpen).toBe(true);
  });

  it("close() sets isOpen to false", () => {
    const { result } = renderHook(() => useMenuState());

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  // ── toggle ───────────────────────────────────────────────────────

  it("toggle() flips isOpen from false→true→false", () => {
    const { result } = renderHook(() => useMenuState());

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  // ── triggerRef ───────────────────────────────────────────────────

  it("returns a triggerRef", () => {
    const { result } = renderHook(() => useMenuState());

    expect(result.current.triggerRef).toBeDefined();
    expect(result.current.triggerRef).toHaveProperty("current");
  });

  // ── Focus restoration on close ───────────────────────────────────

  it("focuses the trigger element when close() is called", () => {
    // Create a real button element in the DOM for the ref
    const button = document.createElement("button");
    document.body.appendChild(button);

    const { result } = renderHook(() => useMenuState());

    // Manually assign the ref to our button (simulating how Header attaches it)
    (result.current.triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = button;

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    const focusSpy = vi.spyOn(button, "focus");

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    expect(focusSpy).toHaveBeenCalledOnce();

    button.remove();
  });

  // ── Idempotent close ─────────────────────────────────────────────

  it("close() on already-closed state stays false", () => {
    const { result } = renderHook(() => useMenuState());

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  // ── Idempotent open ──────────────────────────────────────────────

  it("open() on already-open state stays true", () => {
    const { result } = renderHook(() => useMenuState());

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  // ── Stable identity ──────────────────────────────────────────────

  it("returns stable callback identities across renders", () => {
    const { result, rerender } = renderHook(() => useMenuState());

    const { open, close, toggle } = result.current;

    rerender();

    expect(result.current.open).toBe(open);
    expect(result.current.close).toBe(close);
    expect(result.current.toggle).toBe(toggle);
  });
});
