import { Hero } from "@/components/content/Hero";
import { IconCard } from "@/components/content/IconCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Icon } from "@/components/primitives/Icon";
import { SchoolIcon } from "@/components/icons/SchoolIcon";
import { createPageMetadata } from "@/lib/page-utils";
import { DEPARTMENTS } from "@/data/academics";
import { ACADEMICS_HERO } from "@/data/images";

export const metadata = createPageMetadata(
  "Academics",
  "Explore the academic departments at St. Elizabeth's High School — from Science and Mathematics to World Languages and College Counseling.",
);

export default function AcademicsPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Learn"
          heading="Academics"
          description="A rigorous CBSE curriculum delivered by dedicated faculty, designed to challenge and inspire every student to achieve their personal best."
          backgroundImage={`/images/${ACADEMICS_HERO.filename}`}
        />
      }
    >
      <Section
        background="soft"
        padding="xlarge"
        ariaLabel="Academic departments"
      >
        <Container>
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Text variant="eyebrow">Curriculum</Text>
              <Heading level="h2" variant="section">
                Our Departments
              </Heading>
              <Text variant="muted" size="medium">
                St. Elizabeth follows the Central Board of Secondary Education
                (CBSE) curriculum. Our seven academic departments provide a
                well-rounded education that prepares students for university
                and beyond.
              </Text>
            </Stack>
            <Grid columns={4} gap="medium" responsive>
              {DEPARTMENTS.map((dept) => (
                <IconCard
                  key={dept.name}
                  icon={
                    <Icon size="medium">
                      <SchoolIcon variant="academic" />
                    </Icon>
                  }
                  title={dept.name}
                  description={dept.description}
                  href={dept.href}
                />
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
