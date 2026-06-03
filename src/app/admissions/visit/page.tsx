import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { SCHOOL_ADDRESS, GOOGLE_MAPS_EMBED_URL } from "@/data/contact";
import { CONTACT_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Plan Your Visit | St. Elizabeth High School",
  description:
    "Plan your visit to St. Elizabeth High School in Pomburpa, Goa. Tour our campus, meet our faculty, and experience our community firsthand.",
};

export default function VisitPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Visit Us"
          heading="Plan Your Visit"
          description="Experience St. Elizabeth High School firsthand — walk our campus, meet our faculty, and discover what makes our community special."
          backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Visit information"
        >
          <Container width="wide">
            <SplitLayout
              ratio="2-1"
              left={
                <Stack gap="large">
                  <Stack gap="medium">
                    <Heading level="h2" variant="section">
                      Schedule a Campus Tour
                    </Heading>
                    <Text variant="muted" size="medium">
                      We welcome families to visit our campus and experience the
                      St. Elizabeth difference. Tours are available Monday
                      through Friday by appointment. During your visit,
                      you&apos;ll tour our facilities, observe classes in
                      session, and meet with our admissions team.
                    </Text>
                  </Stack>
                  <Card variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">Visit Information</Text>
                      <Text variant="muted" size="small">
                        Tours are conducted on weekdays from 9:00 AM to 2:00 PM.
                        Please contact the admissions office at least one week
                        in advance to schedule your visit. We recommend allowing
                        90 minutes for a complete campus tour.
                      </Text>
                    </Stack>
                  </Card>
                  <Card variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">What to Expect</Text>
                      <Text variant="muted" size="small">
                        Your visit will include a guided campus tour, classroom
                        observations, a meeting with an admissions counsellor,
                        and an opportunity to speak with current students and
                        faculty.
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              }
              right={
                <Stack gap="medium">
                  <Heading level="h3" variant="card">
                    Our Location
                  </Heading>
                  <Text variant="muted" size="small">
                    {SCHOOL_ADDRESS.street}
                    <br />
                    {SCHOOL_ADDRESS.area}
                    <br />
                    {SCHOOL_ADDRESS.city} {SCHOOL_ADDRESS.pinCode}
                  </Text>
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4/3",
                      border: "1px solid var(--color-line)",
                    }}
                  >
                    <iframe
                      src={GOOGLE_MAPS_EMBED_URL}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="St. Elizabeth High School on Google Maps"
                    />
                  </div>
                </Stack>
              }
            />
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
