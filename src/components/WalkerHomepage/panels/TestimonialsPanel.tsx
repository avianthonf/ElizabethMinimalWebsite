"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { RoughBorder } from "@/components/decorations/RoughBorder";
import { useReducedMotion } from "@/components/WalkerHomepage/hooks/useReducedMotion";
import { useGsapStaggerReveal } from "@/hooks/useGsapStaggerReveal";
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
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGsapStaggerReveal({
    container: cardsRef,
    disabled: prefersReduced,
    stagger: 0.15,
    duration: 0.8,
    y: 24,
  });

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
      <div ref={cardsRef} className={styles.cardsRow}>
        {TESTIMONIALS.map((t) => (
          <RoughBorder
            key={t.attribution}
            color="rgba(12, 33, 124, 0.18)"
            roughness={1.2}
            strokeWidth={1.2}
            borderRadius={6}
          >
            <TestimonialCard quote={t.quote} attribution={t.attribution} role={t.role} />
          </RoughBorder>
        ))}
      </div>
    </>
  );
}
