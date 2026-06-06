import type { ReactNode, RefObject } from "react";
import { Link } from "@/components/primitives/Link";
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
  /** Called when the menu button is clicked. If not provided, menu button is disabled. */
  onMenuClick?: () => void;
  /** Whether the menu is currently open (changes button aria-label and aria-expanded) */
  isMenuOpen?: boolean;
  /** Ref to attach to the menu button for focus restoration on overlay close */
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
}

/**
 * Default primary navigation for St. Elizabeth High School.
 * Can be overridden per-page via the `navLinks` prop.
 *
 * Note: The original Walker School defaults (Inquire, Visit, Summer, St. Elizabeth)
 * have been replaced with the St. Elizabeth site navigation from PAGE_ELEMENT_HIERARCHY.md §9.
 */
const DEFAULT_NAV: HeaderNavLink[] = [
  { text: "About", href: "/about" },
  { text: "Admissions", href: "/admissions" },
  { text: "Academics", href: "/academics" },
  { text: "Athletics", href: "/athletics" },
  { text: "Arts", href: "/arts" },
  { text: "Student Life", href: "/student-life" },
  { text: "Alumni", href: "/alumni" },
  { text: "News", href: "/news" },
  { text: "Contact", href: "/contact" },
];

export function Header({
  brandText = "St. Elizabeth High School",
  brandHref = "/",
  navLinks = DEFAULT_NAV,
  showMenu = true,
  fixed = true,
  transparent = true,
  className,
  onMenuClick,
  isMenuOpen = false,
  menuButtonRef,
}: HeaderProps): ReactNode {
  const composedClassName = [
    styles.titleBar,
    fixed && styles.fixed,
    transparent ? styles.transparent : styles.solid,
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
        <span
          className={styles.crest}
          aria-hidden="true"
        />
        <span>{brandText}</span>
      </Link>

      <nav className={styles.navLinks} aria-label="Audience navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} variant="nav">
            {link.text}
          </Link>
        ))}
      </nav>

      {showMenu && (
        <button
          ref={menuButtonRef}
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          disabled={!onMenuClick}
          onClick={onMenuClick}
        >
          <span>Menu</span>
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      )}
    </header>
  );
}
