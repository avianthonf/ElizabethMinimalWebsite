"use client";

import type { ReactNode } from "react";
import { HorizontalPage } from "@/components/HorizontalScroll";
import { ValueCard } from "@/components/content/ValueCard";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { VALUES } from "@/data/homepage";
import { VALUES_IMAGES } from "@/data/images";
import shared from "./shared.module.css";
import styles from "./ValuesPanel.module.css";

interface ValuesPanelProps {
  layout?: "horizontal" | "vertical";
}

function ValuesPanelContent(): ReactNode {
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

export function ValuesPanel({ layout = "horizontal" }: ValuesPanelProps): ReactNode {
  return (
    <>
      {layout === "vertical" ? (
        <section
          className={`${shared.panel} ${styles.valuesPanel}`}
          aria-label="St. Elizabeth values — Faith, Excellence, Community"
        >
          <ValuesPanelContent />
        </section>
      ) : (
        <HorizontalPage
          width="clamp(960px, 85vw, 1400px)"
          tabletWidth="min(1040px, 110vw)"
          mobileWidth="max(760px, 180vw)"
          smallMobileWidth="max(720px, 200vw)"
          landscapeWidth="max(960px, 125vw)"
          headerTheme="dark"
          className={`${shared.panel} ${styles.valuesPanel}`}
          ariaLabel="St. Elizabeth values — Faith, Excellence, Community"
        >
          <ValuesPanelContent />
        </HorizontalPage>
      )}
    </>
  );
}
