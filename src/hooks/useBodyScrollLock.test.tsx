import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBodyScrollLock } from "./useBodyScrollLock";
import React from "react";

describe("useBodyScrollLock", () => {
  beforeEach(() => {
    // Reset body styles before each test
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  // ── Lock ─────────────────────────────────────────────────────────

  it("sets overflow: hidden on document.body when locked", () => {
    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");
  });

  // ── Idle (not locked) ────────────────────────────────────────────

  it("does not modify body styles when isLocked is false", () => {
    const originalOverflow = document.body.style.overflow || "";
    const originalPadding = document.body.style.paddingRight || "";

    renderHook(() => useBodyScrollLock(false));

    expect(document.body.style.overflow).toBe(originalOverflow);
    expect(document.body.style.paddingRight).toBe(originalPadding);
  });

  // ── Unlock restores original values ──────────────────────────────

  it("restores original body overflow when unlocked (rerender)", () => {
    document.body.style.overflow = "scroll";
    const original = document.body.style.overflow;

    const { rerender } = renderHook(
      ({ isLocked }) => useBodyScrollLock(isLocked),
      { initialProps: { isLocked: true } },
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender({ isLocked: false });

    expect(document.body.style.overflow).toBe(original);
  });

  it("restores original paddingRight when unlocked", () => {
    document.body.style.paddingRight = "15px";
    const original = document.body.style.paddingRight;

    const { rerender } = renderHook(
      ({ isLocked }) => useBodyScrollLock(isLocked),
      { initialProps: { isLocked: true } },
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender({ isLocked: false });

    expect(document.body.style.paddingRight).toBe(original);
  });

  // ── Cleanup on unmount ───────────────────────────────────────────

  it("restores body overflow on unmount while locked", () => {
    document.body.style.overflow = "auto";
    const original = document.body.style.overflow;

    const { unmount } = renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe(original);
  });

  // ── Padding-right compensation ───────────────────────────────────

  it("compensates for scrollbar width with paddingRight", () => {
    // Simulate a scrollbar being present by making
    // window.innerWidth larger than documentElement.clientWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      writable: true,
      configurable: true,
      value: 1007, // 17px scrollbar
    });

    // Reset padding for clean measurement
    document.body.style.paddingRight = "";

    renderHook(() => useBodyScrollLock(true));

    // Should have added scrollbar compensation
    expect(document.body.style.paddingRight).not.toBe("");
    // 17px scrollbar width → padding-right should reflect that
    expect(document.body.style.paddingRight).toContain("px");
  });

  // ── No scrollbar = no padding change ─────────────────────────────

  it("does not modify paddingRight when there is no scrollbar", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      writable: true,
      configurable: true,
      value: 1024, // No scrollbar
    });

    document.body.style.paddingRight = "0px";
    const original = document.body.style.paddingRight;

    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.paddingRight).toBe(original);
  });
});
