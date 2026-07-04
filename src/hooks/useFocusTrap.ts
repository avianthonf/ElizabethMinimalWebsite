"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Custom hook that traps keyboard focus within a container element.
 *
 * Usage:
 *   useFocusTrap(containerRef, isActive);
 *
 * When `isActive` is true, Tab and Shift+Tab cycle focus among
 * all focusable elements within `containerRef.current`.
 *
 * Exported as a standalone utility so it can be consumed by
 * MenuOverlay, SearchOverlay, and any future dialog/modal.
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, isActive: boolean) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Capture the currently focused element so we can restore focus later
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // Focus the first focusable element inside the container
    const firstFocusable = container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    function getFocusableElements(): HTMLElement[] {
      const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      return Array.from(elements).filter(
        (el) => el.offsetParent !== null, // visible
      );
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: wrap from first → last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: wrap from last → first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus to the element that was focused before the trap
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [isActive, containerRef]);
}
