import type { ReactNode } from "react";
import styles from "./Heading.module.css";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingVariant = "hero" | "section" | "card" | "default";

export interface HeadingProps {
  level: HeadingLevel;
  variant?: HeadingVariant;
  children: ReactNode;
  className?: string;
  uppercase?: boolean;
}

const HeadingTag = ({ level, children, className }: { level: HeadingLevel; children: ReactNode; className?: string }) => {
  switch (level) {
    case "h1": return <h1 className={className}>{children}</h1>;
    case "h2": return <h2 className={className}>{children}</h2>;
    case "h3": return <h3 className={className}>{children}</h3>;
    case "h4": return <h4 className={className}>{children}</h4>;
    case "h5": return <h5 className={className}>{children}</h5>;
    case "h6": return <h6 className={className}>{children}</h6>;
  }
};

export function Heading({
  level,
  variant = "default",
  children,
  className,
  uppercase = variant === "hero" || variant === "section",
}: HeadingProps): ReactNode {
  const composedClassName = [
    styles.heading,
    styles[level],
    styles[variant],
    uppercase && styles.uppercase,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <HeadingTag level={level} className={composedClassName}>{children}</HeadingTag>;
}
