import type { ReactNode, Ref } from "react";
import styles from "./Heading.module.css";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingVariant = "hero" | "section" | "card" | "default";

export interface HeadingProps {
  level: HeadingLevel;
  variant?: HeadingVariant;
  children: ReactNode;
  className?: string;
  uppercase?: boolean;
  ref?: Ref<HTMLHeadingElement>;
}

const HeadingTag = ({
  level,
  children,
  className,
  ref,
}: {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLHeadingElement>;
}) => {
  switch (level) {
    case "h1":
      return (
        <h1 ref={ref} className={className}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 ref={ref} className={className}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={ref} className={className}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={ref} className={className}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 ref={ref} className={className}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 ref={ref} className={className}>
          {children}
        </h6>
      );
  }
};

export function Heading({
  level,
  variant = "default",
  children,
  className,
  uppercase = false,
  ref,
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

  return (
    <HeadingTag level={level} className={composedClassName} ref={ref}>
      {children}
    </HeadingTag>
  );
}
