import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { CTASection } from "@/components/content/CTASection";
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
import { GIVING_OPTIONS, SPONSORSHIP_TIERS, IMPACT_STORIES } from "@/data/how-to-help";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Donations & Sponsorship | St. Elizabeth High School",
  description:
    "Support St. Elizabeth High School through donations, sponsorship, or volunteering. Explore giving levels and see the impact of your contribution.",
};

export default function GivePage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Give"
          heading="Donations & Sponsorship"
          description="Your generosity transforms lives. Every contribution to St. Elizabeth High School directly supports our students and strengthens our community."
          backgroundImage={`/images/${COMMUNITY_IMAGES[2]?.filename ?? COMMUNITY_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Giving options"
        >
          <Container width="narrow">
            <Stack gap="xlarge">
              <Stack gap="medium">
                <Heading level="h2" variant="section">
                  Ways to Give
                </Heading>
                <Text variant="muted" size="medium">
                  Choose the giving option that best fits your capacity and
                  interest. Every contribution, large or small, makes a
                  meaningful difference.
                </Text>
              </Stack>

              <Stack gap="medium">
                {GIVING_OPTIONS.map((option) => (
                  <Card key={option.title} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {option.title}
                      </Heading>
                      <Text variant="muted" size="medium">
                        {option.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Section>

        <Section
          background="soft"
          padding="xlarge"
          ariaLabel="Giving levels"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Giving Levels
              </Heading>
              <Grid columns={2} gap="medium" responsive>
                {SPONSORSHIP_TIERS.map((tier) => (
                  <Card key={tier.name} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {tier.name}
                      </Heading>
                      <Text variant="muted" size="small">
                        {tier.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Impact stories"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Your Impact
              </Heading>
              <Stack gap="medium">
                {IMPACT_STORIES.map((story) => (
                  <Card key={story.title} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {story.title}
                      </Heading>
                      <Text variant="muted" size="medium">
                        {story.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Section>

        <CTASection
          heading="Ready to Make a Difference?"
          description="Contact our development office to discuss giving options or make a contribution."
          primaryCTA={{ text: "Contact Us", href: "/contact" }}
          background="blue"
        />
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
