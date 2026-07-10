import { Hero } from "@/shared/ui/hero";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { Stack } from "@/shared/ui/stack";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { HEADMISTRESS_MESSAGE_PAGE, HEADMISTRESS_MESSAGE } from "@/domains/about/headmistress.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  HEADMISTRESS_MESSAGE_PAGE.metaTitle,
  HEADMISTRESS_MESSAGE_PAGE.metaDescription,
);

export default function HeadmistressMessagePage() {
  return (
    <>
      <Hero
        eyebrow={HEADMISTRESS_MESSAGE_PAGE.heroEyebrow}
        heading={HEADMISTRESS_MESSAGE_PAGE.heroHeading}
        description={HEADMISTRESS_MESSAGE_PAGE.heroDescription}
        backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
      />

      <Section
        background="paper"
        padding="xlarge"
        ariaLabel={HEADMISTRESS_MESSAGE_PAGE.sectionAriaLabel}
      >
        <Container width="narrow">
          <Stack gap="large">
            <Breadcrumb
              href={HEADMISTRESS_MESSAGE_PAGE.breadcrumb.href}
              label={HEADMISTRESS_MESSAGE_PAGE.breadcrumb.label}
              currentLabel={HEADMISTRESS_MESSAGE_PAGE.breadcrumb.currentLabel}
            />
            <BreadcrumbJsonLd
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Headmistress's Message", href: "/about/headmistress-message" },
              ]}
            />
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {HEADMISTRESS_MESSAGE.name}
              </Heading>
              <Text variant="eyebrow">{HEADMISTRESS_MESSAGE.title}</Text>
              <div style={{ maxWidth: "65ch" }}>
                {HEADMISTRESS_MESSAGE.message.split("\n\n").map((paragraph, i) => (
                  <div key={i} style={{ marginBottom: "1em" }}>
                    <Text variant="muted" size="medium">
                      {paragraph}
                    </Text>
                  </div>
                ))}
              </div>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
