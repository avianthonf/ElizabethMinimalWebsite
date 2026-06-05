import type { Metadata } from "next";
import Link from "next/link";
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
import { MISSION_STATEMENT } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Mission & Values | St. Elizabeth High School",
  description:
    "Discover the mission and values that guide St. Elizabeth High School — Truth, Honesty, academic excellence, and faith in action.",
};

export default function MissionPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <nav
          aria-label="Breadcrumb"
          style={{
            padding: "var(--spacing-md) 0 0",
            fontSize: "calc(var(--text-scale) * 0.85rem)",
            color: "var(--color-muted)",
          }}
        >
          <Container width="narrow">
            <Link href="/about" style={{ color: "var(--color-muted)", textDecoration: "underline" }}>
              About
            </Link>
            {" / Mission & Values"}
          </Container>
        </nav>
        <Hero
          eyebrow="Our Purpose"
          heading="Mission & Values"
          description="A nurturing Catholic school community dedicated to academic excellence, character formation, and service to others."
          backgroundImage={`/images/${COMMUNITY_IMAGES[2].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Mission and values"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level="h2" variant="section">
                  {MISSION_STATEMENT.heading}
                </Heading>
                <Text variant="muted" size="medium">
                  {MISSION_STATEMENT.body}
                </Text>
              </Stack>
              <Grid columns={2} gap="medium" responsive>
                {MISSION_STATEMENT.values.map((value) => (
                  <Card key={value.title} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {value.title}
                      </Heading>
                      <Text variant="muted" size="medium">
                        {value.description}
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
