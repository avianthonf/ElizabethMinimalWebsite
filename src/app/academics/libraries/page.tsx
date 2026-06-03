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
import { ACADEMICS_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Libraries | St. Elizabeth High School",
  description:
    "Explore the library and digital resource centre at St. Elizabeth High School — supporting research, reading, and lifelong learning.",
};

export default function LibrariesPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Discover"
          heading="Libraries"
          description="A well-stocked library and digital resource centre supporting research, reading, and lifelong learning habits."
          backgroundImage={`/images/${ACADEMICS_IMAGES[3].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Library and resources"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Our Library
              </Heading>
              <Grid columns={2} gap="medium" responsive>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Physical Collection
                    </Heading>
                    <Text variant="muted" size="small">
                      Our library houses thousands of books spanning fiction,
                      non-fiction, reference materials, and periodicals.
                      Students have access to age-appropriate reading materials
                      across all subject areas.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Digital Resources
                    </Heading>
                    <Text variant="muted" size="small">
                      Our digital resource centre provides access to online
                      databases, e-books, academic journals, and educational
                      software that support research and self-directed learning.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Reading Programmes
                    </Heading>
                    <Text variant="muted" size="small">
                      We foster a love of reading through structured reading
                      programmes, book clubs, author visits, and annual reading
                      challenges that engage students of all ages.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Study Spaces
                    </Heading>
                    <Text variant="muted" size="small">
                      The library offers quiet study areas, collaborative work
                      zones, and computer workstations where students can focus,
                      research, and create in a supportive environment.
                    </Text>
                  </Stack>
                </Card>
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
