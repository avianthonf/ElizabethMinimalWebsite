"use client";

import type { ReactNode } from "react";
import { CTA_CONTENT } from "@/data/homepage";
import { LottieAnimation } from "@/components/decorations/LottieAnimation";
import shared from "./shared.module.css";
import styles from "./CTAPanel.module.css";

/** Composed className for the orchestrator's wrapping HorizontalPage. */
export const ctaPanelClass = `${shared.panel} ${styles.ctaPanel}`;

/** CTA section with radial spotlight, noise texture, and crest watermark. */
export function CTAPanel(): ReactNode {
  return (
    <>
      {/* Text column — left */}
      <div className={styles.ctaText}>
        <p className={styles.ctaEyebrow}>{CTA_CONTENT.eyebrow}</p>
        <h2 className={styles.ctaHeading}>{CTA_CONTENT.heading}</h2>
        <p className={styles.ctaDescription}>{CTA_CONTENT.description}</p>
        <div className={styles.ctaButtons}>
          <a
            href={CTA_CONTENT.primaryCTA.href}
            className={`${styles.ctaButton} ${styles.ctaButtonFilled}`}
          >
            {CTA_CONTENT.primaryCTA.text}
          </a>
          <a
            href={CTA_CONTENT.secondaryCTA.href}
            className={`${styles.ctaButton} ${styles.ctaButtonGhost}`}
          >
            {CTA_CONTENT.secondaryCTA.text}
          </a>
        </div>
      </div>

      {/* Visual column — right: Lottie + crest watermark */}
      <div className={styles.ctaVisual}>
        <div className={styles.ctaLottie} aria-hidden="true">
          <LottieAnimation
            src="/animations/graduation-hat.json"
            width="clamp(140px, 16vw, 280px)"
            height="clamp(140px, 16vw, 280px)"
            ariaLabel="Graduation hat animation"
          />
        </div>
        <div className={styles.ctaCrest} aria-hidden="true">
          <svg
            viewBox="0 0 100 114"
            width="100%"
            height="100%"
            fill="white"
            opacity="1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 2 L2 30 V84 L50 112 L98 84 V30 Z" fill="white" />
          </svg>
        </div>
      </div>
    </>
  );
}
