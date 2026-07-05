import type { ReactNode, ElementType, Ref, MouseEventHandler } from "react";
import { Link } from "@/components/primitives/Link";

export interface ConditionalLinkProps {
  /** When provided, renders a Next.js Link. Otherwise renders the `as` element (default: span). */
  href?: string;
  children: ReactNode;
  className?: string;
  /**
   * The HTML element or component to render when `href` is absent.
   * @default "span"
   */
  as?: ElementType;
  /** Ref forwarded to the underlying element (button/link/span). */
  ref?: Ref<HTMLAnchorElement>;
  /** Click handler (forwarded to Link when href is present, or native element when absent). */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLElement>;
  /** Accessible label (forwarded to Link when href is present). */
  "aria-label"?: string;
  /** HTML type attribute (forwarded to native element when href is absent). */
  type?: string;
  /** Disabled state (forwarded to native element when href is absent). */
  disabled?: boolean;
}

/**
 * Conditionally wraps children in a Next.js `<Link>` when `href` is provided,
 * otherwise renders them inside a `<span>` (or a custom element via `as`).
 *
 * Extracts the "wrap in Link if href, otherwise render plain element" pattern
 * shared by IconCard, ImageCard, and Button.
 */
export function ConditionalLink({
  href,
  children,
  className,
  as: Component = "span",
  ref,
  onClick,
  "aria-label": ariaLabel,
  type,
  disabled,
}: ConditionalLinkProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={className}
        onClick={disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick}
        ariaLabel={ariaLabel}
        ariaDisabled={disabled ? true : undefined}
        ref={ref}
      >
        {children}
      </Link>
    );
  }

  // No href — render as a plain element, forwarding relevant props.
  const Tag = Component as ElementType;
  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
