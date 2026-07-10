import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  COMPUTER_LAB_PAGE,
  COMPUTER_LAB_FACILITIES,
  DIGITAL_LITERACY,
} from "@/domains/academics/computer.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  COMPUTER_LAB_PAGE.metaTitle,
  COMPUTER_LAB_PAGE.metaDescription,
);

export default function ComputerLabPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          {
            label: COMPUTER_LAB_PAGE.breadcrumb.currentLabel,
            href: "/academics/computer-laboratory",
          },
        ]}
      />
      <Breadcrumb
        href={COMPUTER_LAB_PAGE.breadcrumb.href}
        label={COMPUTER_LAB_PAGE.breadcrumb.label}
        currentLabel={COMPUTER_LAB_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={COMPUTER_LAB_PAGE.heroEyebrow}
        heading={COMPUTER_LAB_PAGE.heroHeading}
        description={COMPUTER_LAB_PAGE.heroDescription}
        backgroundImage={`/images/${ACADEMICS_IMAGES[5].filename}`}
      />

      {/* Facilities Grid */}
      <Section background="paper" padding="xlarge" ariaLabel={COMPUTER_LAB_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {COMPUTER_LAB_PAGE.sectionHeading}
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {COMPUTER_LAB_FACILITIES.map((item) => (
                <Card key={item.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {item.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {item.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Digital Literacy Statement */}
      <Section background="soft" padding="xlarge" ariaLabel="Technology and values">
        <Container width="narrow">
          <Card variant="default" padding="large">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {DIGITAL_LITERACY.heading}
              </Heading>
              <Text variant="muted" size="medium">
                {DIGITAL_LITERACY.body}
              </Text>
            </Stack>
          </Card>
        </Container>
      </Section>
    </>
  );
}
