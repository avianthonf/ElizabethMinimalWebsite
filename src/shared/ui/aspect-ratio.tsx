import type { CSSProperties, ReactNode } from "react";
import styles from "./aspect-ratio.module.css";

export type AspectRatioValue = "1/1" | "4/3" | "3/2" | "16/9" | "21/9";

export interface AspectRatioProps {
  /** CSS aspect-ratio value, e.g. "4/3" */
  ratio: AspectRatioValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const ratioClass: Record<AspectRatioValue, string> = {
  "1/1": styles.ratio1x1,
  "4/3": styles.ratio4x3,
  "3/2": styles.ratio3x2,
  "16/9": styles.ratio16x9,
  "21/9": styles.ratio21x9,
};

/**
 * Constrains its children to a fixed aspect ratio using the modern
 * `aspect-ratio` CSS property. Replaces ad-hoc aspect-ratio calculations
 * scattered across ImageCard, MediaBlock, and map embeds.
 */
export function AspectRatio({ ratio, children, className, style }: AspectRatioProps): ReactNode {
  const composedClassName = [styles.aspect, ratioClass[ratio], className].filter(Boolean).join(" ");

  return (
    <div className={composedClassName} style={style}>
      {children}
    </div>
  );
}
