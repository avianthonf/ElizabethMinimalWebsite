"use client";

import type { ReactNode } from "react";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { TESTIMONIALS } from "@/data/homepage";
import styles from "./TestimonialsPanel.module.css";

/**
 * Composed className for the orchestrator to use when wrapping
 * this panel (e.g. in a HorizontalPage or vertical section).
 */
export const testimonialsPanelClass = styles.testimonialsPanel;

/**
 * TestimonialsPanel — pure content component.
 * Layout wrapping (HorizontalPage on desktop, section on mobile)
 * is handled by the orchestrator.
 */
export function TestimonialsPanel(): ReactNode {
  return (
    <>
      {/* Sidebar — left column */}
      <div className={styles.sidebar}>
        <Text variant="eyebrow" as="p">
          Voices of Our Community
        </Text>
        <Heading level="h2" variant="section">
          What They Say
        </Heading>
      </div>

      {/* Card row — right column */}
      <div className={styles.cardsRow}>
        {TESTIMONIALS.map((t) => (
          <TestimonialCard
            key={t.attribution}
            quote={t.quote}
            attribution={t.attribution}
            role={t.role}
          />
        ))}
      </div>
    </>
  );
}
