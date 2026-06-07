"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { HERO_CONTENT } from "@/data/homepage";
import { HERO_IMAGES } from "@/data/images";
import type { ImageAsset } from "@/data/images";
import shared from "./shared.module.css";
import styles from "./HeroPanel.module.css";

export interface HeroPanelProps {
  /** Callback for the menu button (forward-looking — not currently rendered). */
  onMenuOpen?: () => void;
}

/** Composed className for the orchestrator's wrapping HorizontalPage. */
export const heroPanelClass = `${shared.panel} ${styles.heroPanel}`;

const HERO_IMAGE = HERO_IMAGES[0] as ImageAsset;

/** Hero section content. Wrapping HorizontalPage is applied by the orchestrator. */
export function HeroPanel(props: HeroPanelProps): ReactNode {
  void props;
  return (
    <>
      <Image
        src={`/images/${HERO_IMAGE.filename}`}
        alt={HERO_IMAGE.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className={styles.heroBackground}
      />
      <div className={styles.heroGradient} role="presentation" aria-hidden="true" />
      <div className={styles.heroOverlay}>
        <p className={styles.heroStatement}>{HERO_CONTENT.statement}</p>
        <h1 className={styles.heroHeading}>{HERO_CONTENT.heading}</h1>
      </div>
    </>
  );
}
