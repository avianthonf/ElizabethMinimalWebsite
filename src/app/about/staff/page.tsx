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
import { STAFF_MEMBERS } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Staff & Leadership | St. Elizabeth High School",
  description:
    "Meet the leadership team at St. Elizabeth High School — dedicated educators and administrators committed to Truth and Honesty.",
};

export default function StaffPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Our Leaders"
          heading="Staff & Leadership"
          description="The dedicated educators and administrators who bring the mission of St. Elizabeth High School to life every day."
          backgroundImage={`/images/${COMMUNITY_IMAGES[1].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Staff and leadership"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Leadership Team
              </Heading>
              <Stack gap="medium">
                {STAFF_MEMBERS.map((member) => (
                  <Card key={member.name} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {member.name}
                      </Heading>
                      <Text variant="eyebrow">{member.title}</Text>
                      <Text variant="muted" size="medium">
                        {member.description}
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
