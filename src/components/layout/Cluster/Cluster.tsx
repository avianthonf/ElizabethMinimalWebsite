import type { ReactNode } from "react";
import styles from "./Cluster.module.css";

export type ClusterAlign = "start" | "center" | "end" | "space-between";
export type ClusterGap = "small" | "medium" | "large";

export interface ClusterProps {
  children: ReactNode;
  align?: ClusterAlign;
  gap?: ClusterGap;
  wrap?: boolean;
  className?: string;
}

const alignClass: Record<ClusterAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  "space-between": styles.alignSpaceBetween,
};

const gapClass: Record<ClusterGap, string> = {
  small: styles.gapSmall,
  medium: styles.gapMedium,
  large: styles.gapLarge,
};

export function Cluster({
  children,
  align = "start",
  gap = "medium",
  wrap = false,
  className,
}: ClusterProps): ReactNode {
  const composedClassName = [
    styles.cluster,
    alignClass[align],
    gapClass[gap],
    wrap && styles.wrap,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={composedClassName}>
      {children}
    </div>
  );
}
