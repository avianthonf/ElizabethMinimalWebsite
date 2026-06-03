import type { ReactNode } from "react";
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
  showSearch?: boolean;
  showMenu?: boolean;
  fixed?: boolean;
  transparent?: boolean;
  className?: string;
}

const DEFAULT_NAV: HeaderNavLink[] = [
  { text: "Inquire", href: "/inquire" },
  { text: "Visit", href: "/visit" },
  { text: "Summer", href: "/summer" },
  { text: "St. Elizabeth", href: "/about" },
];

export function Header({
  brandText = "St. Elizabeth High School",
  brandHref = "/",
  navLinks = DEFAULT_NAV,
  showSearch = true,
  showMenu = true,
  fixed = true,
  transparent = true,
  className,
}: HeaderProps): ReactNode {
  const composedClassName = [
    styles.titleBar,
    fixed && styles.fixed,
    transparent && styles.transparent,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={composedClassName} aria-label="Primary site navigation">
      <Link
        href={brandHref}
        className={styles.brand}
        variant="default"
        ariaLabel={`${brandText} home`}
      >
        <span className={styles.crest} aria-hidden="true">
          S
        </span>
        <span>{brandText}</span>
      </Link>

      <nav className={styles.navLinks} aria-label="Audience navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} variant="nav">
            {link.text}
          </Link>
        ))}
      </nav>

      {showSearch && (
        <button
          className={styles.searchButton}
          type="button"
          aria-label="Search"
          disabled
        >
          <span aria-hidden="true" />
        </button>
      )}

      {showMenu && (
        <button
          className={styles.menuButton}
          type="button"
          aria-label="Open menu"
          disabled
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
