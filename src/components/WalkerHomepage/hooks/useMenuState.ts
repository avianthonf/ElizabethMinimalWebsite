"use client";

import { useState, useCallback, useRef } from "react";

export interface UseMenuStateReturn {
  /** Whether the menu overlay is currently open */
  isOpen: boolean;
  /** Open the menu overlay */
  open: () => void;
  /** Close the menu overlay and restore focus to the trigger */
  close: () => void;
  /** Toggle the menu overlay open/closed */
  toggle: () => void;
  /** Ref to attach to the button that triggers the menu, for focus restoration */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Manages menu open/close/toggle state with focus restoration.
 *
 * On close, focus is returned to the element referenced by `triggerRef`
 * so keyboard users land back on the Menu button.
 */
export function useMenuState(): UseMenuStateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Restore focus to the Menu button when overlay closes
    triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, open, close, toggle, triggerRef };
}
