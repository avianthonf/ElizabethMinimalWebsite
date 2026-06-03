"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { Link } from "@/components/primitives/Link";
import { Text } from "@/components/primitives/Text";
import type { NavCategory } from "@/data/navigation";
import styles from "./MenuOverlay.module.css";

export interface MenuOverlayProps {
  /** Navigation categories to display */
  categories: NavCategory[];
  /** Map of category title → image filename for hover preview */
  previewImages?: Record<string, string>;
  /** Whether the overlay is currently open */
  isOpen: boolean;
  /** Called when the user requests to close the overlay */
  onClose: () => void;
  /** aria-label for the overlay */
  ariaLabel?: string;
}

/**
 * Query all focusable elements within the overlay container.
 * Used by the focus-trap keyboard handler.
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function MenuOverlay({
  categories,
  previewImages = {},
  isOpen,
  onClose,
  ariaLabel = "Site navigation menu",
}: MenuOverlayProps): ReactNode {
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Animation lifecycle state ─────────────────────────────────────

  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // mountKey increments each time the overlay opens, forcing React to
  // remount the categories grid so that stagger animations replay.
  const [mountKey, setMountKey] = useState(0);

  // ── Hover/focus image preview ─────────────────────────────────────

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // ── Open / Close lifecycle ────────────────────────────────────────

  useEffect(() => {
    if (isOpen) {
      // 1. Insert into DOM
      setShouldRender(true);
      setMountKey((prev) => prev + 1);

      // 2. Prevent body scroll
      document.body.style.overflow = "hidden";

      // 3. Trigger entrance animation on next paint
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
        return () => cancelAnimationFrame(raf2);
      });

      return () => cancelAnimationFrame(raf1);
    }

    // ── Close sequence ────────────────────────────────────────────
    // 1. Start exit animation
    setIsAnimating(false);

    // 2. Restore body scroll immediately (the overlay is fading out
    //    but the underlying page should be scrollable again)
    document.body.style.overflow = "";

    // 3. Remove from DOM after exit animation completes (200ms)
    const exitTimer = setTimeout(() => {
      setShouldRender(false);
      setActiveCategory(null);
    }, 220); // 200ms exit + 20ms buffer

    return () => clearTimeout(exitTimer);
  }, [isOpen]);

  // ── Cleanup body scroll on unmount ───────────────────────────────

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── Keyboard: Escape to close + Focus trap ───────────────────────

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && overlayRef.current) {
        const focusable = getFocusableElements(overlayRef.current);
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
  }, [isOpen, onClose]);

  // ── Focus first link on open ──────────────────────────────────────

  useEffect(() => {
    if (isOpen && overlayRef.current) {
      // Small delay to ensure the DOM is painted before focusing
      const timer = setTimeout(() => {
        const firstLink =
          overlayRef.current?.querySelector<HTMLAnchorElement>("a[href]");
        firstLink?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ── Handlers ──────────────────────────────────────────────────────

  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleCategoryHover = useCallback((categoryTitle: string) => {
    setActiveCategory(categoryTitle);
  }, []);

  const handleCategoryHoverEnd = useCallback(() => {
    setActiveCategory(null);
  }, []);

  // ── Don't render anything when fully closed ───────────────────────

  if (!shouldRender) {
    return null;
  }

  const overlayClassName = [
    styles.overlay,
    isAnimating ? styles.overlayOpen : styles.overlayClosed,
  ]
    .filter(Boolean)
    .join(" ");

  const currentPreviewImage =
    activeCategory ? previewImages[activeCategory] : null;

  return (
    <div
      ref={overlayRef}
      className={overlayClassName}
      role="dialog"
      aria-modal={isOpen ? "true" : undefined}
      aria-hidden={!isOpen ? "true" : undefined}
      aria-label={isOpen ? ariaLabel : undefined}
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <span className={styles.closeIcon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </span>
        <span className={styles.closeLabel}>Close</span>
      </button>

      {/* Navigation grid — key changes on each open to replay stagger */}
      <nav className={styles.nav} aria-label="Site navigation menu">
        <div className={styles.categoriesGrid} key={mountKey}>
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={styles.category}
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => handleCategoryHover(category.title)}
              onMouseLeave={handleCategoryHoverEnd}
              onFocus={() => handleCategoryHover(category.title)}
              onBlur={handleCategoryHoverEnd}
            >
              <Text variant="eyebrow" as="span" className={styles.categoryTitle}>
                {category.title}
              </Text>
              <ul className={styles.categoryLinks}>
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      variant="nav"
                      className={styles.menuLink}
                      onClick={onClose}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Image preview panel (desktop only) */}
      {currentPreviewImage && (
        <div className={styles.previewPanel} aria-hidden="true">
          <div
            className={styles.previewImage}
            style={{
              backgroundImage: `url('/images/${currentPreviewImage}')`,
            }}
          />
        </div>
      )}
    </div>
  );
}
