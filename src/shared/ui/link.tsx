import type { ReactNode, Ref } from "react";
import { Link as NextLink } from "next-view-transitions";
import styles from "./link.module.css";

export type LinkVariant = "default" | "nav" | "footer";

export interface LinkProps {
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaCurrent?: "page" | "step" | "location" | "date" | "time" | "true";
  ariaDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ref?: Ref<HTMLAnchorElement>;
}

const variantClass: Record<LinkVariant, string> = {
  default: styles.default!,
  nav: styles.nav!,
  footer: styles.footer!,
};

export function Link({
  href,
  children,
  variant = "default",
  external,
  className,
  ariaLabel,
  ariaCurrent,
  ariaDisabled,
  onClick,
  ref,
}: LinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  const composedClassName = [styles.link!, variantClass[variant]!, className]
    .filter(Boolean)
    .join(" ");

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        className={composedClassName}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-disabled={ariaDisabled}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      ref={ref}
      href={href}
      className={composedClassName}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      aria-disabled={ariaDisabled}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
}
