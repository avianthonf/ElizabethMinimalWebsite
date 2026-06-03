import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { STRATEGIC_PLAN_POINTS } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Strategic Plan | St. Elizabeth High School",
  description:
    "Explore the strategic plan for St. Elizabeth High School — academic innovation, campus development, community engagement, and sustainability.",
};

export default function StrategicPlanPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Our Future"
          heading="Strategic Plan"
          description="Charting the course for St. Elizabeth High School's next chapter — building on our legacy while embracing the opportunities ahead."
          backgroundImage={`/images/${COMMUNITY_IMAGES[3]?.filename ?? COMMUNITY_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Strategic plan"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Priorities for the Future
              </Heading>
              <Grid columns={2} gap="medium" responsive>
                {STRATEGIC_PLAN_POINTS.map((point) => (
                  <Card key={point.title} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {point.title}
                      </Heading>
                      <Text variant="muted" size="small">
                        {point.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer
        intro={FOOTER_INTRO}
        sections={FOOTER_SECTIONS}
        socialLinks={FOOTER_SOCIAL_LINKS}
        copyright={FOOTER_COPYRIGHT}
      />
    </>
  );
}
