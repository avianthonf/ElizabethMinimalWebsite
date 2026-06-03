import type { ReactNode } from "react";
import styles from "./Container.module.css";

export type ContainerWidth = "narrow" | "default" | "wide" | "full";

export interface ContainerProps {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
  as?: "div" | "section" | "article";
}

const widthClass: Record<ContainerWidth, string> = {
  narrow: styles.widthNarrow,
  default: styles.widthDefault,
  wide: styles.widthWide,
  full: styles.widthFull,
};

export function Container({
  children,
  width = "default",
  className,
  as: Tag = "div",
}: ContainerProps): ReactNode {
  const composedClassName = [styles.container, widthClass[width], className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={composedClassName}>{children}</Tag>;
}
