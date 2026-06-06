"use client";

import type { ReactNode } from "react";
import { HorizontalPage } from "@/components/HorizontalScroll";
import { TestimonialCard } from "@/components/content/TestimonialCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { TESTIMONIALS } from "@/data/homepage";
import shared from "./shared.module.css";
import styles from "./TestimonialsPanel.module.css";

export function TestimonialsPanel(): ReactNode {
  return (
    <HorizontalPage
      width="clamp(960px, 80vw, 1400px)"
      tabletWidth="min(900px, 110vw)"
      mobileWidth="max(760px, 200vw)"
      smallMobileWidth="max(720px, 220vw)"
      landscapeWidth="max(1000px, 130vw)"
      headerTheme="dark"
      className={`${shared.panel} ${styles.testimonialsPanel}`}
      ariaLabel="Testimonials from students, alumni, and parents"
    >
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
    </HorizontalPage>
  );
}
