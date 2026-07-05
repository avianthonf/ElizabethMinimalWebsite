"use client";

import { type ReactNode, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Link } from "@/shared/ui/link";
import { openSearchOverlay } from "@/components/content/SearchOverlay/SearchOverlay";
import { useMenu } from "../MenuOverlay/MenuProvider";
import styles from "./Header.module.css";

export interface HeaderNavLink {
  text: string;
  href: string;
}

export interface HeaderProps {
  brandText?: string;
  brandHref?: string;
  navLinks?: HeaderNavLink[];
  showMenu?: boolean;
  fixed?: boolean;
  transparent?: boolean;
  className?: string;
  /**
   * @deprecated Use MenuProvider/MenuOverlay instead. If provided, the menu
   * button uses this callback. Falls back to the MenuProvider context if not set.
   */
  onMenuClick?: () => void;
  /**
   * @deprecated Use MenuProvider/MenuOverlay instead. If provided, the menu
   * button reflects this state. Falls back to the MenuProvider context if not set.
   */
  isMenuOpen?: boolean;
  /** Ref to attach to the menu button for focus restoration on overlay close */
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
  /** Suppress the scroll-driven white bar background (used on homepage) */
  noScrollBar?: boolean;
}

/**
 * Default primary navigation for St. Elizabeth's High School.
 * Can be overridden per-page via the `navLinks` prop.
 *
 * Note: The original Walker School defaults (Inquire, Visit, Summer, St. Elizabeth)
 * have been replaced with the St. Elizabeth site navigation from PAGE_ELEMENT_HIERARCHY.md §9.
 */
import { HEADER_NAV_LINKS } from "@/domains/nav/navigation.data";

const DEFAULT_NAV: HeaderNavLink[] = HEADER_NAV_LINKS;

export function Header({
  brandText = "St. Elizabeth's High School",
  brandHref = "/",
  navLinks = DEFAULT_NAV,
  showMenu = true,
  fixed = true,
  transparent = true,
  noScrollBar = false,
  className,
  onMenuClick: onMenuClickProp,
  isMenuOpen: isMenuOpenProp,
  menuButtonRef: menuButtonRefProp,
}: HeaderProps): ReactNode {
  const pathname = usePathname();

  // Read menu state from MenuProvider context. If the page is not wrapped in
  // a MenuProvider, useMenu returns null and we fall back to prop-based API.
  // (Prop API is deprecated; new code should wrap pages in MenuProvider.)
  const menuContext = useMenu();
  const contextIsOpen = menuContext?.isOpen ?? false;
  const contextToggle = menuContext?.toggle;
  const contextTriggerRef = menuContext?.triggerButtonRef ?? null;

  const isMenuOpen = isMenuOpenProp ?? contextIsOpen;
  const handleMenuClick = onMenuClickProp ?? contextToggle ?? (() => undefined);
  const menuButtonRef = menuButtonRefProp ?? contextTriggerRef;

  /** Check if a nav link's href matches the current pathname (top-level section match). */
  const isActive = (href: string): boolean => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };
  const composedClassName = [
    styles.titleBar,
    fixed && styles.fixed,
    transparent ? styles.transparent : styles.solid,
    noScrollBar && styles.noScrollBar,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={composedClassName} aria-label="Primary site navigation" data-header="true">
      <Link
        href={brandHref}
        className={styles.brand}
        variant="default"
        ariaLabel={`${brandText} home`}
      >
        <span className={styles.crest} aria-hidden="true" />
        <span>{brandText}</span>
      </Link>

      <nav className={styles.navLinks} aria-label="Audience navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            variant="nav"
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.text}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className={styles.searchButton}
        onClick={openSearchOverlay}
        aria-label="Open search (Ctrl+K)"
        title="Search (Ctrl+K)"
      >
        <Search size={18} aria-hidden="true" />
        <kbd className={styles.searchKbd} aria-hidden="true">
          ⌘K
        </kbd>
      </button>

      {showMenu && (
        <button
          ref={menuButtonRef ?? undefined}
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={handleMenuClick}
        >
          <span>Menu</span>
          <span
            className={`${styles.menuIcon} ${isMenuOpen ? styles.menuOpen : ""}`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
        </button>
      )}
    </header>
  );
}
