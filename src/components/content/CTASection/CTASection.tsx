import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Button } from "@/components/primitives/Button";
import type { SectionBackground } from "@/components/layout/Section";
import styles from "./CTASection.module.css";

export type CTABackground = "maroon" | "blue" | "soft";

export interface CTASectionProps {
  heading: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  background?: CTABackground;
  centered?: boolean;
  className?: string;
}

const bgMap: Record<CTABackground, SectionBackground> = {
  maroon: "maroon",
  blue: "blue",
  soft: "soft",
};

export function CTASection({
  heading,
  description,
  primaryCTA,
  secondaryCTA,
  background = "maroon",
  centered = true,
  className,
}: CTASectionProps): ReactNode {
  const isDark = background === "maroon" || background === "blue";

  return (
    <Section background={bgMap[background]} padding="xlarge" className={className}>
      <Container width="narrow">
        <div className={`${styles.content} ${centered ? styles.centered : ""}`}>
          <Stack gap="large">
            <Heading
              level="h2"
              variant="section"
              className={isDark ? styles.lightHeading : undefined}
            >
              {heading}
            </Heading>

            {description && (
              <Text variant={isDark ? "body" : "muted"} size="large" className={isDark ? styles.lightText : undefined}>
                {description}
              </Text>
            )}

            {(primaryCTA || secondaryCTA) && (
              <div className={`${styles.ctas} ${centered ? styles.ctasCentered : ""}`}>
                {primaryCTA && (
                  <Button href={primaryCTA.href} variant={isDark ? "secondary" : "primary"} size="large">
                    {primaryCTA.text}
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    href={secondaryCTA.href}
                    variant="ghost"
                    size="large"
                    className={isDark ? styles.ghostLight : undefined}
                  >
                    {secondaryCTA.text}
                  </Button>
                )}
              </div>
            )}
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
