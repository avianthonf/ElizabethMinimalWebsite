"use client";

import { useId, type ReactNode } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "@/components/WalkerHomepage/hooks/useReducedMotion";
import styles from "./LottieAnimation.module.css";

export interface LottieAnimationProps {
  /** Path to .lottie or .json animation file in public/ */
  src: string;
  /** Width — CSS value or number (px). Default "100%" */
  width?: string | number;
  /** Height — CSS value or number (px). Default "auto" */
  height?: string | number;
  /** Alt text for accessibility */
  ariaLabel?: string;
  /** Extra className */
  className?: string;
}

/**
 * LottieAnimation — wrapper around @lottiefiles/dotlottie-react
 * with prefers-reduced-motion support.
 *
 * When reduced motion is preferred, the animation is paused
 * and shows a static frame.
 */
export function LottieAnimation({
  src,
  width = "100%",
  height = "auto",
  ariaLabel,
  className,
}: LottieAnimationProps): ReactNode {
  const reducedMotion = useReducedMotion();
  const a11yId = useId();

  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      style={{ width, height }}
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      id={a11yId}
    >
      <DotLottieReact
        src={src}
        className={styles.lottie}
        autoplay={!reducedMotion}
        loop={!reducedMotion}
        speed={reducedMotion ? 0 : 1}
        renderConfig={{
          devicePixelRatio: 1.5,
        }}
      />
    </div>
  );
}
