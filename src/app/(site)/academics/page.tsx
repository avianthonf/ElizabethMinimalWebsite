import { Hero } from "@/shared/ui/hero";
import { IconCard } from "@/shared/ui/icon-card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Icon } from "@/shared/ui/icon";
import { SchoolIcon } from "@/shared/ui/school-icon";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { DEPARTMENTS } from "@/domains/academics/academics.data";
import { ACADEMICS_HERO } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "Academics",
  "Explore the academic departments at St. Elizabeth's High School — from Science and Mathematics to World Languages and College Counseling.",
  "/academics",
);

export default function AcademicsPage() {
  return (
    <>
      <Hero
        eyebrow="Learn"
        heading="Academics"
        description="A rigorous GBSHSE curriculum delivered by dedicated faculty, designed to challenge and inspire every student to achieve their personal best."
        backgroundImage={`/images/${ACADEMICS_HERO.filename}`}
      />

      <Section background="soft" padding="xlarge" ariaLabel="Academic departments">
        <Container>
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Text variant="eyebrow">Curriculum</Text>
              <Heading level="h2" variant="section">
                Our Departments
              </Heading>
              <Text variant="muted" size="medium">
                St. Elizabeth follows the Goa Board of Secondary and Higher Secondary Education
                (GBSHSE) curriculum, aligned with the vision of the National Education Policy (NEP)
                2020. Our nine academic departments provide a well-rounded education that prepares
                students for university and beyond.
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
    </>
  );
}
