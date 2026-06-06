"use client";

import type { ReactNode } from "react";
import { CTASection } from "@/components/content/CTASection";
import { CTA_CONTENT } from "@/data/homepage";
import shared from "./shared.module.css";
import styles from "./CTAPanel.module.css";

/** Composed className for the orchestrator's wrapping HorizontalPage. */
export const ctaPanelClass = `${shared.panel} ${styles.ctaPanel}`;

/** CTA section content. Wrapping HorizontalPage is applied by the orchestrator. */
export function CTAPanel(): ReactNode {
  return (
    <CTASection
      heading={CTA_CONTENT.heading}
      description={CTA_CONTENT.description}
      eyebrow={CTA_CONTENT.eyebrow}
      primaryCTA={CTA_CONTENT.primaryCTA}
      secondaryCTA={CTA_CONTENT.secondaryCTA}
      image={{
        src: "/images/DSC07306.jpg",
        alt: "Students engaged in a group activity at St. Elizabeth High School, warm and welcoming community atmosphere",
      }}
      background="blue"
      centered={false}
    />
  );
}
