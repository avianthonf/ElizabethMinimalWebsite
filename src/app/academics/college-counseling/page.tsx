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
  title: "College Counseling | St. Elizabeth High School",
  description:
    "Our college counseling programme at St. Elizabeth High School guides students and families through university selection, applications, and career exploration.",
};

export default function CollegeCounselingPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Prepare"
          heading="College Counseling"
          description="Guiding students and families through university selection, application preparation, and career exploration."
          backgroundImage={`/images/${ACADEMICS_IMAGES[4].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="College counseling programme"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Planning for the Future
              </Heading>
              <Grid columns={2} gap="medium" responsive>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      University Guidance
                    </Heading>
                    <Text variant="muted" size="small">
                      Our counsellors help students identify universities that
                      match their academic interests, career goals, and personal
                      preferences — in India and abroad.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Application Support
                    </Heading>
                    <Text variant="muted" size="small">
                      From personal statements to recommendation letters, we
                      guide students through every component of the university
                      application process with individualised support.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Entrance Exam Preparation
                    </Heading>
                    <Text variant="muted" size="small">
                      We provide resources and guidance for CBSE board exams,
                      JEE, NEET, and other competitive entrance examinations
                      required by Indian universities.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Career Exploration
                    </Heading>
                    <Text variant="muted" size="small">
                      Through career days, alumni talks, and internships,
                      students explore diverse professional paths and discover
                      where their passions and talents intersect.
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
