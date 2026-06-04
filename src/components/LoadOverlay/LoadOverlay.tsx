"use client";

import { useId, useState, type AnimationEvent, type ReactNode } from "react";
import styles from "./LoadOverlay.module.css";

const LOAD_MESSAGE = "WE BELIEVE";

export function LoadOverlay(): ReactNode {
  const maskId = useId();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target && event.animationName.includes("revealOverlay")) {
      setIsVisible(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      aria-label="Homepage load overlay"
      aria-live="polite"
      onAnimationEnd={handleAnimationEnd}
    >
      <svg className={styles.maskStage} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <rect width="100" height="100" fill="white" />
            <g className={styles.maskGroup}>
              <text
                className={styles.maskText}
                x="50"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                vectorEffect="non-scaling-stroke"
              >
                {LOAD_MESSAGE}
              </text>
            </g>
          </mask>
        </defs>
        <rect width="100" height="100" fill="white" mask={`url(#${maskId})`} />
      </svg>
      <span className={styles.screenReaderText}>{LOAD_MESSAGE}</span>
    </div>
  );
}
