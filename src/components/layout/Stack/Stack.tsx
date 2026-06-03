import type { ReactNode } from "react";
import type { SpacingScale } from "@/components/shared/types";
import styles from "./Stack.module.css";

export type StackGap = SpacingScale;

export interface StackProps {
  children: ReactNode;
  gap?: StackGap;
  className?: string;
  as?: "div" | "section" | "article";
}

const gapClass: Record<StackGap, string> = {
  small: styles.gapSmall,
  medium: styles.gapMedium,
  large: styles.gapLarge,
  xlarge: styles.gapXlarge,
};

export function Stack({
  children,
  gap = "medium",
  className,
  as: Tag = "div",
}: StackProps): ReactNode {
  const composedClassName = [styles.stack, gapClass[gap], className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={composedClassName}>{children}</Tag>;
}
