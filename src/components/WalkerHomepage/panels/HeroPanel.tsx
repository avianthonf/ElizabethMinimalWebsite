"use client";

import type { ReactNode } from "react";
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
  return (
    <>
      {/* Looping hero video — plays immediately, muted for autoplay policies */}
      <video
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
        <h1 className={styles.heroHeading}>{HERO_CONTENT.heading}</h1>
      </div>
    </>
  );
}
