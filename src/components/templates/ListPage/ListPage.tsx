import Link from "next/link";
import type { ReactNode } from "react";
import { Hero } from "@/components/content/Hero";
import { Container } from "@/components/layout/Container";
import { Grid, type GridColumns } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";

export interface ListPageProps<T> {
  /** Hero eyebrow text (optional) */
  heroEyebrow?: string;
  /** Hero heading (h1) text */
  heroHeading: string;
  /** Hero description paragraph (optional) */
  heroDescription?: string;
  /** Hero background image URL (optional) */
  heroBackgroundImage?: string;
  /** Optional breadcrumb rendered above the hero */
  breadcrumb?: { href: string; label: string; currentLabel: string };
  /** Section heading (h2) — required */
  sectionHeading: string;
  /** Optional descriptive paragraph below the section heading */
  sectionDescription?: string;
  /** Items to render */
  items: readonly T[];
  /** Render function for each item — receives item and index */
  renderItem: (item: T, index: number) => ReactNode;
  /** Layout mode: vertical "list" (default) or "grid" */
  layout?: "grid" | "list";
  /** Grid columns when layout="grid" (default: 2) */
  columns?: GridColumns;
  /** Container width constraint (default: "narrow") */
  containerWidth?: "narrow" | "default" | "wide";
  /** Accessible label for the content <section> */
  sectionAriaLabel: string;
}

/**
 * Generic template for pages that display a list or grid of people/items
 * behind a Hero banner. Supports both vertical list and card-grid layouts.
 */
export function ListPage<T>({
  heroEyebrow,
  heroHeading,
  heroDescription,
  heroBackgroundImage,
  breadcrumb,
  sectionHeading,
  sectionDescription,
  items,
  renderItem,
  layout = "list",
  columns = 2,
  containerWidth = "narrow",
  sectionAriaLabel,
}: ListPageProps<T>): ReactNode {
  return (
    <PageShell
      hero={
        <>
          {breadcrumb && (
            <nav
              aria-label="Breadcrumb"
              style={{
                padding: "var(--spacing-md) 0 0",
                fontSize: "calc(var(--text-scale) * 0.85rem)",
                color: "var(--s-color-text-muted)",
              }}
            >
              <Container width="narrow">
                <Link
                  href={breadcrumb.href}
                  style={{
                    color: "var(--s-color-text-muted)",
                    textDecoration: "underline",
                  }}
                >
                  {breadcrumb.label}
                </Link>
                {` / ${breadcrumb.currentLabel}`}
              </Container>
            </nav>
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
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {sectionHeading}
              </Heading>
              {sectionDescription && (
                <Text variant="muted" size="medium">
                  {sectionDescription}
                </Text>
              )}
            </Stack>
            {layout === "grid" ? (
              <Grid columns={columns} gap="medium" responsive>
                {items.map((item, index) => renderItem(item, index))}
              </Grid>
            ) : (
              <Stack gap="medium">
                {items.map((item, index) => renderItem(item, index))}
              </Stack>
            )}
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
