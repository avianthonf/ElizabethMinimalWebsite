"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Link } from "@/shared/ui/link";
import { MENU_CATEGORIES } from "@/domains/nav/navigation.data";
import { useMenu } from "./menu-provider";
import { lockBodyScroll, unlockBodyScroll } from "@/shared/hooks/use-scroll-lock";
import { useFocusTrap } from "@/shared/hooks/use-focus-trap";
import styles from "./menu-overlay.module.css";

/**
 * Full-screen navigation overlay. Triggered by the menu button in the Header.
 * Renders all 6 top-level IA categories with their sub-links.
 *
 * Reads its open/close state from MenuContext. Wrap your page (or layout)
 * in <MenuProvider> and render this overlay once.
 *
 * Accessibility:
 * - Closes on Escape
 * - Returns focus to the trigger button on close
 * - Locks body scroll while open (reference-counted)
 * - Traps keyboard focus inside the dialog
 * - Uses role="dialog" with aria-modal
 */
const noop = () => undefined;
export function MenuOverlay() {
  const menu = useMenu();
  const isOpen = menu?.isOpen ?? false;
  const close = menu?.close ?? noop;
  const triggerButtonRef = menu?.triggerButtonRef;
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap — keeps keyboard navigation inside the overlay
  useFocusTrap(dialogRef, isOpen);

  // Focus the close button when opening; restore focus to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else if (triggerButtonRef?.current) {
      triggerButtonRef.current.focus();
    }
  }, [isOpen, triggerButtonRef]);

  // Lock body scroll with reference counting
  useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
    >
      <div className={styles.scrim} onClick={close} aria-hidden="true" />

      <div className={styles.panel}>
        <div className={styles.head}>
          <h2 className={styles.heading}>Explore</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={close}
            aria-label="Close menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Full site navigation">
          {MENU_CATEGORIES.map((category) => (
            <div key={category.title} className={styles.column}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.linkList}>
                {category.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        variant="default"
                        className={isActive ? styles.activeLink : styles.link}
                        aria-current={isActive ? "page" : undefined}
                        onClick={close}
                      >
                        {link.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
