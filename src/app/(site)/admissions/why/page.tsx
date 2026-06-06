import { Hero } from "@/components/content/Hero";
import { IconCard } from "@/components/content/IconCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Icon } from "@/components/primitives/Icon";
import { SchoolIcon } from "@/components/icons/SchoolIcon";
import { createPageMetadata, getHeroImage } from "@/lib/page-utils";
import { WHY_ST_ELIZABETH_POINTS } from "@/data/admissions";

export const metadata = createPageMetadata(
  "Why St. Elizabeth?",
  "Discover what makes St. Elizabeth High School special — academic excellence, values-based education, holistic development, and a nurturing community.",
);

export default function WhyPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Discover"
          heading="Why St. Elizabeth?"
          description="Find out why families across North Goa choose St. Elizabeth High School for their children's education."
          backgroundImage={`/images/${heroImage.filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="Why choose St. Elizabeth"
      >
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              What Sets Us Apart
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {WHY_ST_ELIZABETH_POINTS.map((point) => (
                <IconCard
                  key={point.title}
                  icon={
                    <Icon size="medium">
                      <SchoolIcon variant="academic" />
                    </Icon>
                  }
                  title={point.title}
                  description={point.description}
                />
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
