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
  title: "World Languages | St. Elizabeth High School",
  description:
    "Explore the World Languages programme at St. Elizabeth High School — Hindi, Konkani, and Sanskrit, connecting students to India's rich linguistic heritage.",
};

export default function LanguagesPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Explore"
          heading="World Languages"
          description="Expanding horizons through language learning, connecting students to India's rich linguistic and cultural heritage."
          backgroundImage={`/images/${ACADEMICS_IMAGES[2].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="World languages programme"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Language Programmes
              </Heading>
              <Grid columns={2} gap="medium" responsive>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Hindi
                    </Heading>
                    <Text variant="muted" size="small">
                      As India&apos;s official language, Hindi is a core part of
                      our curriculum. Students develop reading, writing, and
                      conversational fluency through immersive instruction.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Konkani
                    </Heading>
                    <Text variant="muted" size="small">
                      Honouring Goa&apos;s mother tongue, our Konkani programme
                      preserves and promotes the linguistic heritage of our
                      region through literature, poetry, and oral tradition.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      Sanskrit
                    </Heading>
                    <Text variant="muted" size="small">
                      The ancient language of India&apos;s classical texts.
                      Students explore Sanskrit grammar, literature, and the
                      philosophical traditions that shaped Indian civilisation.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      English
                    </Heading>
                    <Text variant="muted" size="small">
                      As the medium of instruction, English is woven throughout
                      the curriculum. Our dedicated English department ensures
                      students achieve advanced proficiency in reading, writing,
                      and literary analysis.
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
