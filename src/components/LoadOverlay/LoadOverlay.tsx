"use client";

import {
  useId,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ReactNode,
} from "react";
import { motion, type Target, type Transition } from "framer-motion";
import styles from "./LoadOverlay.module.css";

const LOAD_MESSAGE = "WE BELIEVE";

/* ── Gap target configuration ──
   "WE BELIEVE": W=0 E=1 ' '=2 B=3 E=4 L=5 I=6 E=7 V=8 E=9
   Offsets are fractions of the character's bbox — tuned for Impact/Haettenschweiler. */
const GAP_TARGET = {
  charIndex: 3, // first B in BELIEVE — upper counter
  ox: 0.55, // horizontal offset within char (0.55 = just right of vertical center)
  oy: 0.28, // vertical offset within char (0.28 = upper third)
  cw: 0.35, // counter width as fraction of char width
  ch: 0.3, // counter height as fraction of char height
} as const;

export interface LoadOverlayProps {
  /** Called when the fade-out animation completes. Parent can use this to show Header etc. */
  onComplete?: () => void;
}

export function LoadOverlay({ onComplete }: LoadOverlayProps): ReactNode {
  const maskId = useId();
  const [isVisible, setIsVisible] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // useLayoutEffect so the isMobile correction runs before the
  // browser paints — prevents framer-motion from starting with
  // the wrong (4.5s) duration and then recomputing mid-flight.
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must read window width before paint to avoid animation glitch
    setIsMobile(window.innerWidth <= 760);
  }, []);

  const totalDuration = isMobile ? 2.8 : 4.5;

  /* Measure the target gap after fonts load and pin transform-origin to its
     exact screen position.  Scaling the entire SVG element (not just mask
     content) creates a true dolly-zoom through the chosen counter/hole. */
  useEffect(() => {
    const svg = svgRef.current;
    const text = textRef.current;
    if (!svg || !text) return;

    function measureAndApply() {
      // Letter counter — measured relative to the character's bounding box
      const extent = text!.getExtentOfChar(GAP_TARGET.charIndex);
      const gapCx = extent.x + extent.width * GAP_TARGET.ox;
      const gapCy = extent.y + extent.height * GAP_TARGET.oy;
      const gapW = extent.width * GAP_TARGET.cw;
      const gapH = extent.height * GAP_TARGET.ch;

      // ViewBox → viewport coordinates (xMidYMid slice)
      const vW = svg!.clientWidth;
      const vH = svg!.clientHeight;
      const s = Math.max(vW / 100, vH / 100);
      const offsetX = (vW - 100 * s) / 2;
      const offsetY = (vH - 100 * s) / 2;

      const screenX = gapCx * s + offsetX;
      const screenY = gapCy * s + offsetY;
      const pctX = (screenX / vW) * 100;
      const pctY = (screenY / vH) * 100;

      // Scale factor so the gap fills the viewport
      const gapScreenW = gapW * s;
      const gapScreenH = gapH * s;
      const scaleFactor = Math.max(vW / gapScreenW, vH / gapScreenH);

      svg!.style.transformOrigin = `${pctX}% ${pctY}%`;
      svg!.style.setProperty("--expand-scale", String(Math.ceil(scaleFactor * 4)));
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(measureAndApply);
    } else {
      measureAndApply();
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target && event.animationName.includes("revealOverlay")) {
      setIsVisible(false);
      onComplete?.();
    }
  };

  /* ── Shared keyframe definitions ── */

  const heritageTextAnimate: Target = {
    opacity: [0, 1, 1, 0, 0],
    y: [8, 0, 0, -8, -8],
    filter: ["blur(3px)", "blur(0px)", "blur(0px)", "blur(3px)", "blur(3px)"],
    scale: [0.98, 1.0, 1.0, 0.98, 0.98],
  };

  const heritageTextTransition: Transition = {
    duration: totalDuration,
    times: [0, 0.04, 0.13, 0.42, 0.5, 1.0],
    ease: ["linear", "easeOut", "linear", "easeIn", "linear"],
  };

  return (
    <div
      className={styles.overlay}
      aria-label="Homepage load overlay"
      aria-live="polite"
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Phase 3: SVG mask — always visible, underneath heritage white bg */}
      <motion.div
        className={styles.maskWrap}
        initial={{ filter: "blur(2px)", scale: 1.02 }}
        animate={{ filter: "blur(0px)", scale: 1.0 }}
        transition={{
          delay: totalDuration * 0.47,
          duration: totalDuration * 0.05,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <svg
          ref={svgRef}
          className={styles.maskStage}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect width="100" height="100" fill="white" />
              <text
                ref={textRef}
                className={styles.maskText}
                x="50"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                vectorEffect="non-scaling-stroke"
              >
                {LOAD_MESSAGE}
              </text>
            </mask>
          </defs>
          <rect width="100" height="100" fill="white" mask={`url(#${maskId})`} />
        </svg>
      </motion.div>

      {/* Phase 1 & 2: Heritage text on white background — covers the mask until the crossfade */}
      <motion.div
        className={styles.heritageContainer}
        initial={{ opacity: 1, filter: "blur(0px)", scale: 1.0 }}
        animate={{
          opacity: [1, 1, 0, 0],
          filter: ["blur(0px)", "blur(0px)", "blur(4px)", "blur(4px)"],
          scale: [1.0, 1.0, 1.01, 1.01],
        }}
        transition={{
          duration: totalDuration,
          times: [0, 0.47, 0.52, 1.0],
          ease: ["linear", "easeOut", "linear"],
        }}
        aria-hidden="true"
      >
        <motion.p
          className={styles.heritageMotto}
          initial={{ opacity: 0, y: 8, filter: "blur(3px)", scale: 0.98 }}
          animate={heritageTextAnimate}
          transition={heritageTextTransition}
        >
          Truth and Honesty
        </motion.p>

        <motion.p
          className={styles.heritageYear}
          initial={{ opacity: 0, y: 8, filter: "blur(3px)", scale: 0.98 }}
          animate={heritageTextAnimate}
          transition={heritageTextTransition}
        >
          Est. 1949
        </motion.p>
      </motion.div>

      <span className={styles.screenReaderText}>{LOAD_MESSAGE}</span>
    </div>
  );
}
