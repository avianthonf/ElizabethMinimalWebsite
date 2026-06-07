import { Hero } from "@/components/content/Hero";
import { CTASection } from "@/components/content/CTASection";
import { IconCard } from "@/components/content/IconCard";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Grid } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Icon } from "@/components/primitives/Icon";
import { SchoolIcon } from "@/components/icons/SchoolIcon";
import { createPageMetadata } from "@/lib/page-utils";
import { GIVING_OPTIONS, SPONSORSHIP_TIERS } from "@/data/how-to-help";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "How to Help",
  "Support St. Elizabeth's High School through donations, sponsorship, or volunteering. Your contribution makes a difference in students' lives.",
);

export default function HowToHelpPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Support"
          heading="How to Help"
          description="Your generosity and involvement help us continue our mission of providing quality, values-based education to the children of North Goa."
          backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
        />
      }
    >
      <Section
        background="soft"
        padding="xlarge"
        ariaLabel="Ways to support"
      >
        <Container width="wide">
          <SplitLayout
            ratio="2-1"
            left={
              <Stack gap="large">
                <Stack gap="medium">
                  <Text variant="eyebrow">Give Back</Text>
                  <Heading level="h2" variant="section">
                    Make a Difference
                  </Heading>
                  <Text variant="muted" size="medium">
                    Your support helps us continue our mission of guiding
                    minds, nurturing hearts, and building futures. Whether
                    through a financial contribution, sponsorship, or
                    volunteering your time, every act of generosity has a
                    lasting impact on our students.
                  </Text>
                </Stack>
                <Grid columns={2} gap="medium" responsive>
                  {GIVING_OPTIONS.map((option) => (
                    <IconCard
                      key={option.title}
                      icon={
                        <Icon size="medium">
                          <SchoolIcon variant="community" />
                        </Icon>
                      }
                      title={option.title}
                      description={option.description}
                      href="/how-to-help/give"
                    />
                  ))}
                </Grid>
              </Stack>
            }
            right={
              <Stack gap="medium">
                <Heading level="h3" variant="card">
                  Giving Levels
                </Heading>
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
              </Stack>
            }
          />
        </Container>
      </Section>

      <CTASection
        heading="Support Our Mission"
        description="Every contribution, no matter the size, helps us provide the best education for our students."
        primaryCTA={{ text: "Give Now", href: "/how-to-help/give" }}
        background="blue"
      />
    </PageShell>
  );
}
