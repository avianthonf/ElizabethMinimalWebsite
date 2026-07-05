import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { SplitLayout } from "@/shared/ui/split-layout";
import { PageShell } from "@/components/layout";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { SCHOOL_ADDRESS, SCHOOL_CONTACT } from "@/domains/contact/contact.data";
import { CONTACT_IMAGES } from "@/domains/media/images.data";
import { ContactForm } from "@/features/contact-form";
import { MapEmbedLazy as MapEmbed } from "@/features/map/map-embed-lazy";

export const metadata = createPageMetadata(
  "Contact",
  "Get in touch with St. Elizabeth's High School in Pomburpa, Goa. Find our address, phone number, email, and location on Google Maps.",
  { ogImage: "/images/DSC07580.jpg" },
);

export default function ContactPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Connect"
          heading="Contact Us"
          description="We'd love to hear from you. Reach out to St. Elizabeth's High School in Pomburpa, Bardez, Goa."
          backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
        />
      }
    >
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
                    {SCHOOL_ADDRESS.area}
                    <br />
                    {SCHOOL_ADDRESS.city} {SCHOOL_ADDRESS.pinCode}
                    <br />
                    {SCHOOL_ADDRESS.country}
                  </Text>
                </Stack>
                <Stack gap="medium">
                  <Text variant="eyebrow">Contact</Text>
                  <Text variant="muted">Phone: {SCHOOL_CONTACT.phone}</Text>
                  <Text variant="muted">Email: {SCHOOL_CONTACT.email}</Text>
                </Stack>
                <ContactForm />
              </Stack>
            }
            right={
              <Stack gap="medium">
                <Heading level="h3" variant="card">
                  Find Us
                </Heading>
                <MapEmbed />
              </Stack>
            }
          />
        </Container>
      </Section>
    </PageShell>
  );
}
