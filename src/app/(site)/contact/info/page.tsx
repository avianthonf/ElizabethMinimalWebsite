import { PageShell } from "@/components/layout";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/components/primitives/Link";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ContactForm } from "@/components/content/ContactForm";
import { MapEmbedLazy as MapEmbed } from "@/components/content/MapEmbed/MapEmbedLazy";
import { createPageMetadata } from "@/lib/page-utils";
import { SCHOOL_ADDRESS, SCHOOL_CONTACT } from "@/data/visits";
import { CONTACT_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "Contact Information",
  "Reach out to St. Elizabeth's High School in Pomburpa, Goa. Find our address, phone number, email, and send us an inquiry.",
  { ogImage: "/images/DSC07580.jpg" },
);

export default function ContactInfoPage() {
  return (
    <PageShell
      hero={
        <>
          <Breadcrumb href="/contact" label="Contact" currentLabel="Information" />
          <Hero
            eyebrow="Contact"
            heading="Contact Information"
            description="Get in touch with St. Elizabeth's High School in Pomburpa, Bardez, Goa."
            backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
          />
        </>
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel="Contact details and inquiry form">
        <Container width="wide">
          <SplitLayout
            ratio="2-1"
            left={
              <Stack gap="large">
                <Stack gap="medium">
                  <Text variant="eyebrow">Our Details</Text>
                  <Heading level="h2" variant="section">
                    School Contact Information
                  </Heading>
                  <Text variant="muted" size="medium">
                    St. Elizabeth&apos;s High School has been serving the Pomburpa community since
                    1949. Whether you have questions about admissions, academics, or school life,
                    we&apos;re here to help.
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
                  <Text variant="eyebrow">Phone &amp; Email</Text>
                  <Text variant="muted">
                    Phone:{" "}
                    <Link href={`tel:${SCHOOL_CONTACT.phone.replace(/\s/g, "")}`}>
                      {SCHOOL_CONTACT.phone}
                    </Link>
                  </Text>
                  <Text variant="muted">
                    Email:{" "}
                    <Link href={`mailto:${SCHOOL_CONTACT.email}`}>{SCHOOL_CONTACT.email}</Link>
                  </Text>
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
