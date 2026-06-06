import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { DEPARTMENTS } from "@/data/academics";
import { ACADEMICS_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "Departments",
  "Explore all academic departments at St. Elizabeth High School — Science, Mathematics, English, Social Studies, World Languages, Libraries, and College Counseling.",
);

export default function DepartmentsPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Explore"
          heading="Academic Departments"
          description="Seven departments delivering a comprehensive CBSE curriculum designed to challenge and inspire every student."
          backgroundImage={`/images/${ACADEMICS_IMAGES[1].filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="All academic departments"
      >
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Our Departments
            </Heading>
            <Stack gap="medium">
              {DEPARTMENTS.map((dept) => (
                <Card key={dept.name} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {dept.name}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {dept.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
