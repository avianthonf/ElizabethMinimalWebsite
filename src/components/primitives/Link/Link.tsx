import type { ReactNode } from "react";
import NextLink from "next/link";
import styles from "./Link.module.css";

export type LinkVariant = "default" | "nav" | "footer";

export interface LinkProps {
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const variantClass: Record<LinkVariant, string> = {
  default: styles.default,
  nav: styles.nav,
  footer: styles.footer,
};

export function Link({
  href,
  children,
  variant = "default",
  external,
  className,
  ariaLabel,
  onClick,
}: LinkProps): ReactNode {
  const isExternal = external ?? /^https?:\/\//.test(href);

  const composedClassName = [styles.link, variantClass[variant], className]
    .filter(Boolean)
    .join(" ");

  if (isExternal) {
    return (
      <a
        href={href}
        className={composedClassName}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={composedClassName} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </NextLink>
  );
}
