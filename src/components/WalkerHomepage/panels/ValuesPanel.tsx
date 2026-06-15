"use client";

import type { ReactNode } from "react";
import { ValueCard } from "@/components/content/ValueCard";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { VALUES } from "@/data/homepage";
import { VALUES_IMAGES } from "@/data/images";
import styles from "./ValuesPanel.module.css";

/**
 * Composed className for the orchestrator to use when wrapping
 * this panel (e.g. in a HorizontalPage or vertical section).
 */
export const valuesPanelClass = styles.valuesPanel;

/**
 * ValuesPanel — pure content component.
 * Layout wrapping (HorizontalPage on desktop, section on mobile)
 * is handled by the orchestrator.
 */
export function ValuesPanel(): ReactNode {
  return (
    <>
      <div className={styles.valuesIntro}>
        <Text variant="eyebrow" as="p">We Believe</Text>
        <Heading level="h2" variant="section">Values That Shape Our Community</Heading>
        <Text variant="muted" as="p" size="medium">
          At St. Elizabeth&apos;s High School, we are guided by our motto &lsquo;Truth and Honesty&rsquo;
          and the principle of &lsquo;Guiding Minds, Nurturing Hearts, Building Futures.&rsquo;
        </Text>
      </div>
      <div className={styles.valuesCards}>
        {VALUES.map((value) => {
          const imageKey = value.title.toLowerCase() as keyof typeof VALUES_IMAGES;
          const asset = VALUES_IMAGES[imageKey];
          return (
            <ValueCard
              key={value.number}
              number={value.number}
              title={value.title}
              body={value.body}
              image={`/images/${asset.filename}`}
              imageAlt={asset.alt}
            />
          );
        })}
      </div>
    </>
  );
}
