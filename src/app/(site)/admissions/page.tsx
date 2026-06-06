import { Hero } from "@/components/content/Hero";
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
import { Link } from "@/components/primitives/Link";
import { SchoolIcon } from "@/components/icons/SchoolIcon";
import { createPageMetadata, getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(
  "Admissions",
  "Begin your journey at St. Elizabeth High School. Learn about admissions, tuition, and how to apply.",
);

export default function AdmissionsPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Join Us"
          heading="Admissions at St. Elizabeth"
          description="Discover a nurturing school community where your child will be known, challenged, and supported to reach their full potential."
          backgroundImage={`/images/${heroImage.filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="Admissions information"
      >
        <Container>
          <SplitLayout
            ratio="2-1"
            left={
              <Stack gap="large">
                <Stack gap="medium">
                  <Text variant="eyebrow">Welcome</Text>
                  <Heading level="h2" variant="section">
                    Begin Your Journey
                  </Heading>
                  <Text variant="muted" size="medium">
                    Choosing the right school is one of the most important
                    decisions a family makes. At St. Elizabeth High School,
                    we&apos;re here to guide you through every step of the
                    admissions process.
                  </Text>
                </Stack>
                <Grid columns={2} gap="medium" responsive>
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="academic" />
                      </Icon>
                    }
                    title="Why St. Elizabeth?"
                    description="Discover what sets our school apart from the rest."
                    href="/admissions/why"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="community" />
                      </Icon>
                    }
                    title="Plan Your Visit"
                    description="Experience our campus and community firsthand."
                    href="/admissions/visit"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="arts" />
                      </Icon>
                    }
                    title="Apply"
                    description="Complete your application and take the first step."
                    href="/admissions/apply"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="sports" />
                      </Icon>
                    }
                    title="Tuition & Assistance"
                    description="Learn about tuition fees and financial aid options."
                    href="/admissions/tuition"
                  />
                </Grid>
              </Stack>
            }
            right={
              <Stack gap="medium">
                <Heading level="h3" variant="card">
                  Key Dates
                </Heading>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Text variant="eyebrow">Admissions Open</Text>
                    <Text variant="muted" size="small">
                      Applications open in January for the upcoming academic
                      year beginning in June.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Text variant="eyebrow">Open House</Text>
                    <Text variant="muted" size="small">
                      Join us for our annual Open House to tour the campus and
                      meet our faculty.
                    </Text>
                  </Stack>
                </Card>
                <Link href="/admissions/faqs" variant="default">
                  View Frequently Asked Questions →
                </Link>
              </Stack>
            }
          />
        </Container>
      </Section>
    </PageShell>
  );
}
