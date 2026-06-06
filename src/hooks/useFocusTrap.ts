"use client";

import { useEffect, useRef } from "react";

/**
 * CSS selector that matches all focusable elements within a container.
 * Mirrors the existing getFocusableElements() function in MenuOverlay.
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface UseFocusTrapOptions {
  /** Whether the focus trap is currently active */
  isActive: boolean;
  /** Called when Escape is pressed while the trap is active */
  onEscape?: () => void;
  /**
   * Whether to restore focus to the previously focused element on deactivation.
   * @default true
   */
  restoreFocus?: boolean;
}

/**
 * Traps keyboard focus within a container element for accessibility.
 *
 * Handles:
 * - Tab / Shift+Tab cycling within the container
 * - Escape key to dismiss
 * - Focus restoration to the previously focused element on close
 *
 * @returns a ref to attach to the container element
 */
export function useFocusTrap({
  isActive,
  onEscape,
  restoreFocus = true,
}: UseFocusTrapOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Keep a stable ref for the escape callback so the keydown effect
  // doesn't re-attach the listener every time the callback identity changes.
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  // ── Activate: save focus + focus first element ──────────────────

  useEffect(() => {
    if (!isActive) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    // Small delay to ensure the DOM is painted before focusing
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const focusable =
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isActive]);

  // ── Deactivate: restore focus ───────────────────────────────────

  useEffect(() => {
    if (isActive) return;

    if (restoreFocus && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isActive, restoreFocus]);

  // ── Keydown: Escape + Tab cycling ───────────────────────────────

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscapeRef.current?.();
        return;
      }

      if (e.key === "Tab") {
        const container = containerRef.current;
        if (!container) return;

        const focusable =
          container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          // Shift+Tab: wrap from first to last
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab: wrap from last to first
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  return containerRef;
}
