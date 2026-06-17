"use client";

import { useState, type AnimationEvent, type ReactNode } from "react";
import { motion, type Transition } from "framer-motion";
import styles from "./LoadOverlayMobile.module.css";

const BRAND_NAME = "St. Elizabeth's High School";

export interface LoadOverlayMobileProps {
  onComplete?: () => void;
}

export function LoadOverlayMobile({ onComplete }: LoadOverlayMobileProps): ReactNode {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (
      event.currentTarget === event.target &&
      event.animationName === "slideUpAndFade"
    ) {
      setIsVisible(false);
      onComplete?.();
    }
  };

  /* Heritage text: fade in → hold → fade out (framer-motion keyframes) */
  const textAnimate = {
    opacity: [0, 1, 1, 0, 0],
    y: [16, 0, 0, -12, -12],
    filter: ["blur(6px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(4px)"],
    scale: [0.96, 1.0, 1.0, 0.97, 0.97],
  };

  const textTransition: Transition = {
    duration: 3.0,
    times: [0, 0.17, 0.33, 0.47, 0.53],
    ease: ["linear", "easeOut", "linear", "easeIn", "linear"],
  };

  return (
    <div
      className={styles.overlay}
      aria-label="Homepage load overlay"
      aria-live="polite"
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Heritage text on white background */}
      <motion.div
        className={styles.heritageContainer}
        initial={{ opacity: 1, filter: "blur(0px)", scale: 1.0 }}
        animate={{
          opacity: [1, 1, 0, 0],
          filter: ["blur(0px)", "blur(0px)", "blur(3px)", "blur(3px)"],
          scale: [1.0, 1.0, 1.005, 1.005],
        }}
        transition={{
          duration: 3.0,
          times: [0, 0.33, 0.47, 1.0],
          ease: ["linear", "easeOut", "linear"],
        }}
        aria-hidden="true"
      >
        <motion.p
          className={styles.heritageMotto}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)", scale: 0.96 }}
          animate={textAnimate}
          transition={textTransition}
        >
          Truth and Honesty
        </motion.p>

        <motion.p
          className={styles.heritageYear}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)", scale: 0.96 }}
          animate={textAnimate}
          transition={{
            ...textTransition,
            delay: 0.1,
          }}
        >
          Est. 1949
        </motion.p>
      </motion.div>

      <span className={styles.screenReaderText}>{BRAND_NAME}</span>
    </div>
  );
}
