import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { DEPARTMENTS } from "@/data/academics";
import { ACADEMICS_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Departments | St. Elizabeth High School",
  description:
    "Explore all academic departments at St. Elizabeth High School — Science, Mathematics, English, Social Studies, World Languages, Libraries, and College Counseling.",
};

export default function DepartmentsPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Explore"
          heading="Academic Departments"
          description="Seven departments delivering a comprehensive CBSE curriculum designed to challenge and inspire every student."
          backgroundImage={`/images/${ACADEMICS_IMAGES[1].filename}`}
        />

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
