import { Hero } from "@/shared/ui/hero";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { Stack } from "@/shared/ui/stack";
import { SplitLayout } from "@/shared/ui/split-layout";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Link } from "@/shared/ui/link";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { ContactForm } from "@/features/contact-form";
import { MapEmbedLazy as MapEmbed } from "@/features/map/map-embed-lazy";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { SCHOOL_ADDRESS, SCHOOL_CONTACT, SCHOOL_LEADERSHIP } from "@/domains/contact/contact.data";
import { CONTACT_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "Contact Information",
  "Reach out to St. Elizabeth's High School in Pomburpa, Goa. Find our address, phone number, email, and send us an inquiry.",
  "/contact/info",
  { ogImage: "/images/DSC07580.jpg" },
);

export default function ContactInfoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Information", href: "/contact/info" },
        ]}
      />
      <Breadcrumb href="/contact" label="Contact" currentLabel="Information" />
      <Hero
        eyebrow="Contact"
        heading="Contact Information"
        description="Get in touch with St. Elizabeth's High School in Pomburpa, Bardez, Goa."
        backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
      />

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
                    1954. Whether you have questions about admissions, academics, or school life,
                    we&apos;re here to help.
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
    </>
  );
}
