import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { useFocusTrap, type UseFocusTrapOptions } from "./useFocusTrap";
import React from "react";

/**
 * Minimal React component that wires the focus-trap hook to a real
 * container element so we can test Tab cycling, Escape, and restoration.
 *
 * NOTE: The hook's FOCUSABLE_SELECTOR is:
 *   a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])
 * Input elements WITHOUT an explicit tabindex are NOT matched by this
 * selector, so they won't be part of the Tab cycling sequence.
 */
function TestFocusTrap(props: UseFocusTrapOptions) {
  const ref = useFocusTrap(props);
  return (
    <div ref={ref} data-testid="trap-container">
      <a href="/link" id="trap-link">
        Link
      </a>
      <button id="trap-btn1">Button 1</button>
      <span id="trap-span">Not focusable</span>
      <button id="trap-btn2">Button 2</button>
    </div>
  );
}

function getEl(id: string): HTMLElement {
  return document.getElementById(id)!;
}

describe("useFocusTrap", () => {
  beforeEach(() => {
    document.body.style.minHeight = "100vh";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Active state: saves focus & focuses first element ────────────

  it("focuses the first focusable element when activated", async () => {
    const externalBtn = document.createElement("button");
    externalBtn.id = "before";
    document.body.appendChild(externalBtn);
    externalBtn.focus();

    const { rerender } = render(<TestFocusTrap isActive={false} />);

    rerender(<TestFocusTrap isActive={true} />);

    // Wait for the setTimeout(100ms) that auto-focuses
    await act(() => new Promise((r) => setTimeout(r, 150)));

    expect(document.activeElement).toBe(getEl("trap-link"));

    externalBtn.remove();
  });

  it("saves previously focused element for restoration", async () => {
    const externalBtn = document.createElement("button");
    externalBtn.id = "before";
    document.body.appendChild(externalBtn);
    externalBtn.focus();

    const { rerender } = render(<TestFocusTrap isActive={false} />);

    rerender(<TestFocusTrap isActive={true} />);
    await act(() => new Promise((r) => setTimeout(r, 150)));

    rerender(<TestFocusTrap isActive={false} />);
    expect(document.activeElement).toBe(externalBtn);
    externalBtn.remove();
  });

  // ── Escape key ───────────────────────────────────────────────────

  it("calls onEscape when Escape is pressed while active", () => {
    const onEscape = vi.fn();
    const { rerender } = render(
      <TestFocusTrap isActive={false} onEscape={onEscape} />,
    );

    // Inactive — Escape does nothing
    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(onEscape).not.toHaveBeenCalled();

    // Active — Escape fires callback
    rerender(<TestFocusTrap isActive={true} onEscape={onEscape} />);
    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(onEscape).toHaveBeenCalledOnce();
  });

  // ── Tab cycling ──────────────────────────────────────────────────
  // Focusable elements in TestFocusTrap:
  //   #trap-link (first), #trap-btn1, #trap-btn2 (last)
  //   (the span and input are skipped by the selector)

  it("wraps Tab from last focusable (#trap-btn2) to first (#trap-link)", () => {
    render(<TestFocusTrap isActive={true} />);

    const first = getEl("trap-link");
    const last = getEl("trap-btn2");

    // Focus the last focusable element
    last.focus();
    expect(document.activeElement).toBe(last);

    // Press Tab — should cycle to first
    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Tab",
          shiftKey: false,
          bubbles: true,
        }),
      );
    });

    expect(document.activeElement).toBe(first);
  });

  it("wraps Shift+Tab from first focusable (#trap-link) to last (#trap-btn2)", () => {
    render(<TestFocusTrap isActive={true} />);

    const first = getEl("trap-link");
    const last = getEl("trap-btn2");

    first.focus();
    expect(document.activeElement).toBe(first);

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Tab",
          shiftKey: true,
          bubbles: true,
        }),
      );
    });

    expect(document.activeElement).toBe(last);
  });

  // ── restoreFocus disabled ────────────────────────────────────────

  it("does not restore focus when restoreFocus is false", async () => {
    const externalBtn = document.createElement("button");
    externalBtn.id = "external-no-restore";
    document.body.appendChild(externalBtn);
    externalBtn.focus();

    const { rerender } = render(
      <TestFocusTrap isActive={false} restoreFocus={false} />,
    );

    rerender(<TestFocusTrap isActive={true} restoreFocus={false} />);
    await act(() => new Promise((r) => setTimeout(r, 150)));

    getEl("trap-btn1").focus();

    rerender(<TestFocusTrap isActive={false} restoreFocus={false} />);
    expect(document.activeElement).not.toBe(externalBtn);
    externalBtn.remove();
  });

  // ── Empty container ──────────────────────────────────────────────

  it("does not throw with an empty container", () => {
    function EmptyTrap() {
      const ref = useFocusTrap({ isActive: true });
      return <div ref={ref} data-testid="empty-trap" />;
    }

    expect(() => render(<EmptyTrap />)).not.toThrow();
  });
});
