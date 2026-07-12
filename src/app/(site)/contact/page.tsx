import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { SplitLayout } from "@/shared/ui/split-layout";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  SCHOOL_ADDRESS,
  SCHOOL_CONTACT,
  SCHOOL_LEADERSHIP,
  GOOGLE_MAPS_DIRECTIONS_URL,
} from "@/domains/contact/contact.data";
import { CONTACT_IMAGES } from "@/domains/media/images.data";
import { ContactForm } from "@/features/contact-form";
import { MapEmbedLazy as MapEmbed } from "@/features/map/map-embed-lazy";
import { QRCard } from "@/features/qr";
import { SafeSection } from "@/features/error-isolation";

export const metadata = createPageMetadata(
  "Contact",
  "Get in touch with St. Elizabeth's High School in Pomburpa, Goa. Find our address, phone number, email, and location on Google Maps.",
  "/contact",
  { ogImage: "/images/DSC07580.jpg" },
);

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Connect"
        heading="Contact Us"
        description="We'd love to hear from you! Whether you have an enquiry about admissions, academics, or school activities, feel free to get in touch with us."
        backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel="Contact information">
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
                    Whether you have questions about admissions, want to schedule a visit, or simply
                    need directions to our campus, our team is ready to assist you.
                  </Text>
                </Stack>
                <Stack gap="medium">
                  <Text variant="eyebrow">Address</Text>
                  <Text variant="muted">
                    {SCHOOL_ADDRESS.street}
                    <br />
                    {SCHOOL_ADDRESS.area}, {SCHOOL_ADDRESS.city} \u2013 {SCHOOL_ADDRESS.pinCode}
                  </Text>
                </Stack>
                <Stack gap="medium">
                  <Text variant="eyebrow">Contact</Text>
                  <Text variant="muted">Phone: {SCHOOL_CONTACT.phone}</Text>
                  <Text variant="muted">Email: {SCHOOL_CONTACT.email}</Text>
                </Stack>
                <Stack gap="medium">
                  <Text variant="eyebrow">School Leadership</Text>
                  <Text variant="muted">
                    {SCHOOL_LEADERSHIP.managerRole}
                    <br />
                    {SCHOOL_LEADERSHIP.manager}
                  </Text>
                  <Text variant="muted">
                    {SCHOOL_LEADERSHIP.headmistressRole}
                    <br />
                    {SCHOOL_LEADERSHIP.headmistress}
                  </Text>
                </Stack>
                <SafeSection label="contact form">
                  <ContactForm />
                </SafeSection>
              </Stack>
            }
            right={
              <Stack gap="medium">
                <Heading level="h3" variant="card">
                  Find Us
                </Heading>
                <MapEmbed />
                <QRCard
                  value={GOOGLE_MAPS_DIRECTIONS_URL}
                  label="Scan for Google Maps directions"
                  size={140}
                />
              </Stack>
            }
          />
        </Container>
      </Section>
    </>
  );
}
