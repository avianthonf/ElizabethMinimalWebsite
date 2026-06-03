import type { ReactNode } from "react";
import styles from "./SplitLayout.module.css";

export type SplitRatio = "equal" | "1-2" | "2-1" | "1-3" | "3-1";
export type SplitGap = "small" | "medium" | "large";

export interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
  ratio?: SplitRatio;
  gap?: SplitGap;
  reverse?: boolean;
  className?: string;
}

const ratioClass: Record<SplitRatio, string> = {
  equal: styles.ratioEqual,
  "1-2": styles.ratioOneTwo,
  "2-1": styles.ratioTwoOne,
  "1-3": styles.ratioOneThree,
  "3-1": styles.ratioThreeOne,
};

export function SplitLayout({
  left,
  right,
  ratio = "1-2",
  gap = "large",
  reverse = false,
  className,
}: SplitLayoutProps): ReactNode {
  const composedClassName = [
    styles.split,
    ratioClass[ratio],
    reverse && styles.reverse,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={composedClassName} style={{ gap: `var(--spacing-${gap})` }}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>{right}</div>
    </div>
  );
}
