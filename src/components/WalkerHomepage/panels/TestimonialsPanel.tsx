"use client";

import type { ReactNode } from "react";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
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
    <Section background="soft" padding="xlarge" className={styles.testimonialsSection}>
      <Container>
        <Stack gap="xlarge">
          <div className={styles.testimonialsHeader}>
            <Text variant="eyebrow">Voices of Our Community</Text>
            <Heading level="h2" variant="section">What They Say</Heading>
          </div>
          <Grid columns={3} gap="large" responsive>
            {TESTIMONIALS.map((t) => (
              <TestimonialCard
                key={t.attribution}
                quote={t.quote}
                attribution={t.attribution}
                role={t.role}
              />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}
