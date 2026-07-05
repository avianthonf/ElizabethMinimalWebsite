import type { ReactNode } from "react";
import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Grid, type GridColumns } from "@/shared/ui/grid";
import { PageShell } from "@/components/layout";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";

export interface ContentPageProps<T> {
  /** Hero eyebrow text (optional — when omitted, no eyebrow renders) */
  heroEyebrow?: string;
  /** Hero heading (h1) text */
  heroHeading: string;
  /** Hero description paragraph (optional) */
  heroDescription?: string;
  /** Hero background image URL (optional) */
  heroBackgroundImage?: string;
  /** Optional breadcrumb rendered above the hero */
  breadcrumb?: { href: string; label: string; currentLabel: string };
  /** Section heading (h2) — when omitted, no section heading renders */
  sectionHeading?: string;
  /** Optional descriptive paragraph below the section heading */
  sectionDescription?: string;
  /** Items to render */
  items: readonly T[];
  /** Render function for each item — receives item and index */
  renderItem: (item: T, index: number) => ReactNode;
  /** Layout mode: "grid" (default) or "list" */
  layout?: "grid" | "list";
  /** Grid columns when layout="grid" (default: 2) */
  columns?: GridColumns;
  /** Container width constraint (default: "narrow") */
  containerWidth?: "narrow" | "default" | "wide";
  /** Accessible label for the content <section> */
  sectionAriaLabel: string;
}

/**
 * Unified template for pages that display a grid or list of items
 * behind a Hero banner. Replaces both CardGridPage and ListPage.
 */
export function ContentPage<T>({
  heroEyebrow,
  heroHeading,
  heroDescription,
  heroBackgroundImage,
  breadcrumb,
  sectionHeading,
  sectionDescription,
  items,
  renderItem,
  layout = "grid",
  columns = 2,
  containerWidth = "narrow",
  sectionAriaLabel,
}: ContentPageProps<T>): ReactNode {
  return (
    <PageShell
      hero={
        <>
          {breadcrumb && (
            <>
              <BreadcrumbJsonLd
                items={[
                  { label: "Home", href: "/" },
                  { label: breadcrumb.label, href: breadcrumb.href },
                  { label: breadcrumb.currentLabel, href: "#" },
                ]}
              />
              <Breadcrumb
                href={breadcrumb.href}
                label={breadcrumb.label}
                currentLabel={breadcrumb.currentLabel}
              />
            </>
          )}
          <Hero
            eyebrow={heroEyebrow}
            heading={heroHeading}
            description={heroDescription}
            backgroundImage={heroBackgroundImage}
          />
        </>
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel={sectionAriaLabel}>
        <Container width={containerWidth}>
          <Stack gap={layout === "grid" ? "large" : "xlarge"}>
            {(sectionHeading || sectionDescription) && (
              <Stack gap="medium">
                {sectionHeading && (
                  <Heading level="h2" variant="section">
                    {sectionHeading}
                  </Heading>
                )}
                {sectionDescription && (
                  <Text variant="muted" size="medium">
                    {sectionDescription}
                  </Text>
                )}
              </Stack>
            )}
            {layout === "grid" ? (
              <Grid columns={columns} gap="medium" responsive>
                {items.map((item, index) => renderItem(item, index))}
              </Grid>
            ) : (
              <Stack gap="medium">{items.map((item, index) => renderItem(item, index))}</Stack>
            )}
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
