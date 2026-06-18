"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { HERO_CONTENT } from "@/data/homepage";
import shared from "./shared.module.css";
import styles from "./HeroPanel.module.css";

export interface HeroPanelProps {
  /** Callback for the menu button (forward-looking — not currently rendered). */
  onMenuOpen?: () => void;
}

/** Composed className for the orchestrator's wrapping HorizontalPage. */
export const heroPanelClass = `${shared.panel} ${styles.heroPanel}`;

/** Hero section content. Wrapping HorizontalPage is applied by the orchestrator. */
export function HeroPanel(props: HeroPanelProps): ReactNode {
  void props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [seekTime, setSeekTime] = useState(2.7);

  // SSR-safe mobile detection — matches the 760px breakpoint
  // used by LoadOverlayMobile
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must read window width before paint to sync video seek time
    setSeekTime(window.innerWidth <= 760 ? 1.0 : 2.7);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <>
      {/* Looping hero video — plays immediately, muted for autoplay policies */}
      <video
        ref={videoRef}
        className={styles.heroVideo}
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className={styles.heroOverlay}>
        <p className={styles.heroStatement}>{HERO_CONTENT.statement}</p>
        <h1 className={styles.heroHeading}>
          {HERO_CONTENT.heading.split(" ").map((word, i, arr) => (
            <span key={word}>
              {word}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>
    </>
  );
}
