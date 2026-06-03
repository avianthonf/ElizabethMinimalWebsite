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
import { SCHOOL_ADDRESS, SCHOOL_CONTACT, GOOGLE_MAPS_EMBED_URL } from "@/data/contact";
import { CONTACT_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact | St. Elizabeth High School",
  description:
    "Get in touch with St. Elizabeth High School in Pomburpa, Goa. Find our address, phone number, email, and location on Google Maps.",
};

export default function ContactPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Connect"
          heading="Contact Us"
          description="We'd love to hear from you. Reach out to St. Elizabeth High School in Pomburpa, Bardez, Goa."
          backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Contact information"
        >
          <Container width="wide">
            <SplitLayout
              ratio="2-1"
              left={
                <Stack gap="large">
                  <Stack gap="medium">
                    <Text variant="eyebrow">Get in Touch</Text>
                    <Heading level="h2" variant="section">
                      We&apos;re Here to Help
                    </Heading>
                    <Text variant="muted" size="medium">
                      Whether you have questions about admissions, want to
                      schedule a visit, or simply need directions to our campus,
                      our team is ready to assist you.
                    </Text>
                  </Stack>
                  <Stack gap="medium">
                    <Text variant="eyebrow">Address</Text>
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
                  <Stack gap="medium">
                    <Text variant="eyebrow">Contact</Text>
                    <Text variant="muted">
                      Phone: {SCHOOL_CONTACT.phone}
                    </Text>
                    <Text variant="muted">
                      Email: {SCHOOL_CONTACT.email}
                    </Text>
                  </Stack>
                  <Card variant="default" padding="large">
                    <Text variant="caption">
                      Inquiry form coming soon. In the meantime, please call or
                      email us directly — we respond to all inquiries within two
                      business days.
                    </Text>
                  </Card>
                </Stack>
              }
              right={
                <Stack gap="medium">
                  <Heading level="h3" variant="card">
                    Find Us
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
