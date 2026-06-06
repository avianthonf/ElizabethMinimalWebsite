import type { ReactNode, ElementType } from "react";
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
  ...rest
}: ConditionalLinkProps & { [key: string]: unknown }) {
  if (href) {
    // Extract props relevant to the Link component; the rest are
    // silently dropped because Link has a strict interface that
    // doesn't accept arbitrary HTML attributes.
    const extra = rest as Record<string, unknown>;
    const onClick = extra.onClick as (() => void) | undefined;
    const ariaLabel = extra["aria-label"] as string | undefined;

    return (
      <Link
        href={href}
        className={className}
        onClick={onClick}
        ariaLabel={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  // No href — render as a plain element, forwarding all props.
  const Tag = Component as ElementType;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
