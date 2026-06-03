import type { ReactNode } from "react";
import styles from "./Grid.module.css";

export type GridColumns = 2 | 3 | 4;
export type GridGap = "small" | "medium" | "large";

export interface GridProps {
  children: ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  responsive?: boolean;
  className?: string;
}

const colClass: Record<GridColumns, string> = {
  2: styles.cols2,
  3: styles.cols3,
  4: styles.cols4,
};

const gapClass: Record<GridGap, string> = {
  small: styles.gapSmall,
  medium: styles.gapMedium,
  large: styles.gapLarge,
};

export function Grid({
  children,
  columns = 3,
  gap = "medium",
  responsive = true,
  className,
}: GridProps): ReactNode {
  const composedClassName = [
    styles.grid,
    colClass[columns],
    gapClass[gap],
    responsive && styles.responsive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={composedClassName}>{children}</div>;
}
