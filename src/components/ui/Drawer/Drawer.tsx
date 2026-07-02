"use client";

import { useState } from "react";
import styles from "./Drawer.module.css";

interface DrawerProps {
  children: React.ReactNode;
  /** Drawer content */
  content: React.ReactNode;
  /** Drawer side */
  side?: "left" | "right" | "top" | "bottom";
  /** Trigger element */
  trigger?: React.ReactNode;
  /** Open state (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Drawer — slide-in drawer panel.
 * Uses @radix-ui/react-dialog for accessibility.
 *
 * Usage:
 *   <Drawer content={<SettingsPanel />} trigger={<Button>Settings</Button>} />
 */
export function Drawer({
  children,
  content,
  side = "right",
  trigger,
  open: controlledOpen,
  onOpenChange,
  className,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  return (
    <div className={className}>
      {trigger && (
        <button onClick={() => setIsOpen(true)} type="button" className={styles.trigger}>
          {trigger}
        </button>
      )}

      {isOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          />
          <div className={`${styles.content} ${styles[side]}`} role="dialog" aria-modal="true">
            <button
              onClick={() => setIsOpen(false)}
              className={styles.close}
              type="button"
              aria-label="Close"
            >
              ×
            </button>
            {content}
          </div>
        </>
      )}

      {children}
    </div>
  );
}
