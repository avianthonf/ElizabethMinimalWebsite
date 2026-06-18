"use client";

import { useCallback, useEffect, useState, type ReactNode, type MouseEvent } from "react";
import Image from "next/image";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useAnimatedPresence } from "@/hooks/useAnimatedPresence";
import { Link } from "@/components/primitives/Link";
import { Text } from "@/components/primitives/Text";
import type { NavCategory } from "@/data/navigation";
import { MENU_CATEGORIES } from "@/data/navigation";
import {
  HERO_IMAGES,
  ACADEMICS_HERO,
  ATHLETICS_IMAGES,
  ARTS_IMAGES,
  STUDENT_LIFE_IMAGES,
  COMMUNITY_IMAGES,
  CONTACT_IMAGES,
  NEWS_IMAGES,
} from "@/data/images";
import type { ImageAsset } from "@/data/images";
import styles from "./MenuOverlay.module.css";

/** Default preview images assembled from the image registry. */
const DEFAULT_PREVIEW_IMAGES: Record<string, string> = {
  ABOUT: HERO_IMAGES.find((i: ImageAsset) => i.section === "about-hero")?.filename ?? "",
  ADMISSIONS: HERO_IMAGES.find((i: ImageAsset) => i.section === "admissions-hero")?.filename ?? "",
  ACADEMICS: ACADEMICS_HERO.filename,
  ATHLETICS: ATHLETICS_IMAGES[0]?.filename ?? "",
  ARTS: ARTS_IMAGES[0]?.filename ?? "",
  "STUDENT LIFE": STUDENT_LIFE_IMAGES[0]?.filename ?? "",
  ALUMNI: COMMUNITY_IMAGES[0]?.filename ?? "",
  NEWS: NEWS_IMAGES[0]?.filename ?? "",
  CONTACT: CONTACT_IMAGES[0]?.filename ?? "",
  "HOW TO HELP": COMMUNITY_IMAGES[1]?.filename ?? "",
};

export interface MenuOverlayProps {
  /** Navigation categories to display. Defaults to the primary site menu. */
  categories?: NavCategory[];
  /** Map of category title → image filename for hover preview. Auto-assembled when omitted. */
  previewImages?: Record<string, string>;
  /** Whether the overlay is currently open */
  isOpen: boolean;
  /** Called when the user requests to close the overlay */
  onClose: () => void;
  /** aria-label for the overlay */
  ariaLabel?: string;
}

export function MenuOverlay({
  categories = MENU_CATEGORIES,
  previewImages = DEFAULT_PREVIEW_IMAGES,
  isOpen,
  onClose,
  ariaLabel = "Site navigation menu",
}: MenuOverlayProps): ReactNode {
  // ── Hooks: focus trap + body scroll lock ──────────────────────────

  const overlayRef = useFocusTrap({ isActive: isOpen, onEscape: onClose });
  useBodyScrollLock(isOpen);

  // ── Animation lifecycle ─────────────────────────────────────────

  // mountKey forces remount of the categories grid on each open so that
  // CSS stagger animations replay from the start.
  const { shouldRender, isAnimating, mountKey } = useAnimatedPresence(isOpen);

  // ── Hover/focus image preview ─────────────────────────────────────

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Clear hovered category preview when overlay closes
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing local UI state when overlay closes is standard
      setActiveCategory(null);
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

  const overlayClassName = [styles.overlay, isAnimating ? styles.overlayOpen : styles.overlayClosed]
    .filter(Boolean)
    .join(" ");

  const currentPreviewImage = activeCategory ? previewImages[activeCategory] : null;

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
          <Image
            src={`/images/${currentPreviewImage}`}
            alt=""
            fill
            className={styles.previewImage}
            sizes="(min-width: 1100px) 300px, 0px"
          />
        </div>
      )}
    </div>
  );
}
