import type { CSSProperties, ElementType, ReactNode } from "react";

export interface BoxProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * A bare `Box` primitive that renders as a `div` by default,
 * accepts any valid element via `as`, and forwards
 * `className` / `style` / `children`.  Used wherever a plain
 * wrapper element is needed to avoid   HtmlStructure `div` + style prop patterns across pages.
 */
export function Box({ as: Tag = "div", children, ...rest }: BoxProps): ReactNode {
  return <Tag {...rest}>{children}</Tag>;
}
