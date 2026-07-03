import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/navigation/Breadcrumb/BreadcrumbJsonLd";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { MANAGER_MESSAGE_PAGE, MANAGER_MESSAGE } from "@/data/about-manager";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(MANAGER_MESSAGE_PAGE.metaTitle, MANAGER_MESSAGE_PAGE.metaDescription);

export default function ManagerMessagePage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow={MANAGER_MESSAGE_PAGE.heroEyebrow}
          heading={MANAGER_MESSAGE_PAGE.heroHeading}
          description={MANAGER_MESSAGE_PAGE.heroDescription}
          backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
        />
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel={MANAGER_MESSAGE_PAGE.sectionAriaLabel}>
        <Container width="narrow">
          <Stack gap="large">
            <Breadcrumb
              href={MANAGER_MESSAGE_PAGE.breadcrumb.href}
              label={MANAGER_MESSAGE_PAGE.breadcrumb.label}
              currentLabel={MANAGER_MESSAGE_PAGE.breadcrumb.currentLabel}
            />
            <BreadcrumbJsonLd
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Manager's Message", href: "/about/manager-message" },
              ]}
            />
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {MANAGER_MESSAGE.name}
              </Heading>
              <Text variant="eyebrow">{MANAGER_MESSAGE.title}</Text>
              <div style={{ maxWidth: "65ch" }}>
                {MANAGER_MESSAGE.message.split("\n\n").map((paragraph, i) => (
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
    </PageShell>
  );
}
