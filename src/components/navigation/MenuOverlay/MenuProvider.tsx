"use client";

import { createContext, useCallback, useContext, useState, useRef, type ReactNode, type RefObject } from "react";

interface MenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Ref to the menu trigger button — set by Header so focus can be restored on close */
  triggerButtonRef: RefObject<HTMLButtonElement | null>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export interface MenuProviderProps {
  children: ReactNode;
}

/**
 * Coordinates menu open/close state across the Header trigger and the
 * MenuOverlay component. Wraps the page so any Header inside the tree
 * can wire its button to a single overlay rendered elsewhere.
 */
export function MenuProvider({ children }: MenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <MenuContext.Provider value={{ isOpen, open, close, toggle, triggerButtonRef }}>
      {children}
    </MenuContext.Provider>
  );
}

/**
 * Hook to access the menu state from any descendant component.
 * Returns null if the component is rendered outside a MenuProvider — callers
 * must handle that case (Header falls back to prop-based API).
 */
export function useMenu(): MenuContextValue | null {
  return useContext(MenuContext);
}
