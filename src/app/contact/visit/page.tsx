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
  title: "Visit St. Elizabeth | St. Elizabeth High School",
  description:
    "Visit St. Elizabeth High School in Pomburpa, Goa. Get directions, schedule a campus tour, and find our address and contact information.",
};

export default function VisitPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Welcome"
          heading="Visit St. Elizabeth"
          description="We invite you to experience our campus, meet our community, and discover what makes St. Elizabeth High School special."
          backgroundImage={`/images/${CONTACT_IMAGES[1]?.filename ?? CONTACT_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Visit information and directions"
        >
          <Container width="wide">
            <SplitLayout
              ratio="2-1"
              left={
                <Stack gap="large">
                  <Stack gap="medium">
                    <Heading level="h2" variant="section">
                      Directions
                    </Heading>
                    <Text variant="muted" size="medium">
                      St. Elizabeth High School is located in the village of
                      Pomburpa in Bardez taluka, North Goa. We&apos;re easily
                      accessible from Panjim (approximately 15 km), Mapusa
                      (approximately 10 km), and Calangute (approximately 12
                      km).
                    </Text>
                  </Stack>
                  <Card variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">Our Address</Text>
                      <Text variant="muted">
                        {SCHOOL_ADDRESS.street}
                        <br />
                        {SCHOOL_ADDRESS.area}
                        <br />
                        {SCHOOL_ADDRESS.city} {SCHOOL_ADDRESS.pinCode}
                        <br />
                        {SCHOOL_ADDRESS.country}
                      </Text>
                    </Stack>
                  </Card>
                  <Card variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">Getting Here</Text>
                      <Text variant="muted" size="small">
                        From Panjim: Take the NH66 north towards Mapusa, turn
                        right at the Pomburpa junction, and follow the signs to
                        the school. From Mapusa: Head south on the road to
                        Pomburpa. The school is located on Ven. Fr. Hilario
                        Gonsalves Road, near the Pomburpa church.
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              }
              right={
                <Stack gap="medium">
                  <Heading level="h3" variant="card">
                    Campus Map
                  </Heading>
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
