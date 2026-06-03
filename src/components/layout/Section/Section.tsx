import type { ReactNode } from "react";
import type { BackgroundColor, SpacingScale } from "@/components/shared/types";
import styles from "./Section.module.css";

export type SectionBackground = BackgroundColor;
export type SectionPadding = "none" | SpacingScale;

export interface SectionProps {
  children: ReactNode;
  background?: SectionBackground;
  padding?: SectionPadding;
  className?: string;
  ariaLabel?: string;
  id?: string;
}

const bgClass: Record<SectionBackground, string> = {
  paper: styles.bgPaper,
  soft: styles.bgSoft,
  maroon: styles.bgMaroon,
  ink: styles.bgInk,
  blue: styles.bgBlue,
};

const padClass: Record<SectionPadding, string> = {
  none: styles.padNone,
  small: styles.padSmall,
  medium: styles.padMedium,
  large: styles.padLarge,
  xlarge: styles.padXlarge,
};

export function Section({
  children,
  background = "paper",
  padding = "large",
  className,
  ariaLabel,
  id,
}: SectionProps): ReactNode {
  const composedClassName = [
    styles.section,
    bgClass[background],
    padClass[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={composedClassName} aria-label={ariaLabel} id={id}>
      {children}
    </section>
  );
}
