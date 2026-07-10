import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Link } from "@/shared/ui/link";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { createWebPageSchema } from "@/shared/lib/structured-data";
import { generateFAQSchema } from "@/shared/lib/seo";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import {
  RELOCATION_PAGE,
  WHY_RELOCATING_FAMILIES_CHOOSE_US,
  RELOCATION_FAQ,
} from "@/domains/admissions/relocation.data";

export const metadata = createPageMetadata(
  RELOCATION_PAGE.metaTitle,
  RELOCATION_PAGE.metaDescription,
  { path: "/admissions/relocating-to-goa" },
);

export default function RelocatingToGoaPage() {
  const heroImage = getHeroImage("admissions-hero");

  const webPageSchema = createWebPageSchema(
    RELOCATION_PAGE.metaTitle,
    RELOCATION_PAGE.metaDescription,
    "/admissions/relocating-to-goa",
  );

  const faqSchema = generateFAQSchema(RELOCATION_FAQ);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: RELOCATION_PAGE.breadcrumb.currentLabel, href: "/admissions/relocating-to-goa" },
        ]}
      />
      <Breadcrumb
        href={RELOCATION_PAGE.breadcrumb.href}
        label={RELOCATION_PAGE.breadcrumb.label}
        currentLabel={RELOCATION_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={RELOCATION_PAGE.heroEyebrow}
        heading={RELOCATION_PAGE.heroHeading}
        description={RELOCATION_PAGE.heroDescription}
        backgroundImage={`/images/${heroImage.filename}`}
      />

      {/* Why Choose Us */}
      <Section background="paper" padding="xlarge" ariaLabel={RELOCATION_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {RELOCATION_PAGE.sectionHeading}
            </Heading>
            <Grid columns={3} gap="medium" responsive>
              {WHY_RELOCATING_FAMILIES_CHOOSE_US.map((reason) => (
                <Card key={reason.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {reason.title}
                    </Heading>
                    <Text variant="muted" size="small">
                      {reason.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="soft" padding="xlarge" ariaLabel="Relocation frequently asked questions">
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Frequently Asked Questions
            </Heading>
            <Stack gap="medium">
              {RELOCATION_FAQ.map((faq) => (
                <Card key={faq.question} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {faq.question}
                    </Heading>
                    <Text variant="muted" size="small">
                      {faq.answer}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
            <div style={{ textAlign: "center" }}>
              <Link href="/contact" variant="default">
                Get in Touch →
              </Link>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
