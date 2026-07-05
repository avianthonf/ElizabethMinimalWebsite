import { PageShell } from "@/components/layout";
import { Hero } from "@/shared/ui/hero";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { CONTACT_EMAIL } from "@/shared/lib/brand";
import { CONTACT_IMAGES } from "@/domains/media/images.data";
import { createPageMetadata } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  "Thank You",
  "Thank you for contacting St. Elizabeth's High School. We will respond within two business days.",
);

export default function ContactThankYouPage() {
  return (
    <PageShell
      hero={
        <>
          <Breadcrumb href="/contact" label="Contact" currentLabel="Thank You" />
          <Hero
            eyebrow="Received"
            heading="Thank You"
            backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
          />
        </>
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel="Inquiry confirmation">
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Your Inquiry Has Been Sent
            </Heading>
            <Text variant="muted" size="large">
              Thank you for reaching out to St. Elizabeth&apos;s High School. We have received your
              inquiry and will respond within two business days.
            </Text>
            <Text variant="muted">
              If your matter is urgent, please call us directly at{" "}
              <Link href="tel:+918322410654">+91 832-241-0654</Link> or email{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>.
            </Text>
            <Stack gap="small">
              <Button href="/" variant="primary">
                Back to Homepage
              </Button>
              <Link href="/contact" variant="default">
                Contact Us Again
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
