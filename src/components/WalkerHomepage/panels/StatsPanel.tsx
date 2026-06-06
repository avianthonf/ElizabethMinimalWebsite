"use client";

import type { ReactNode } from "react";
import { HorizontalPage } from "@/components/HorizontalScroll";
import { Icon } from "@/components/primitives/Icon";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { STATS } from "@/data/homepage";
import shared from "./shared.module.css";
import styles from "./StatsPanel.module.css";

const STATS_ICONS: Record<string, ReactNode> = {
  "1949": (
    <Icon size="xlarge" decorative>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </Icon>
  ),
  "1200+": (
    <Icon size="xlarge" decorative>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" />
        <path d="M1 21v-2a4 4 0 0 1 4-4h4" />
        <circle cx="17" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    </Icon>
  ),
  CBSE: (
    <Icon size="xlarge" decorative>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    </Icon>
  ),
};

export function StatsPanel(): ReactNode {
  return (
    <HorizontalPage
      width="clamp(960px, 85vw, 1400px)"
      tabletWidth="min(1040px, 110vw)"
      mobileWidth="max(760px, 180vw)"
      smallMobileWidth="max(720px, 200vw)"
      headerTheme="dark"
      className={`${shared.panel} ${styles.statsPanel}`}
      ariaLabel="St. Elizabeth High School — key statistics"
    >
      <div className={styles.statsIntro}>
        <Text variant="eyebrow" as="p">By the Numbers</Text>
        <Heading level="h2" variant="section">Our School at a Glance</Heading>
        <Text variant="muted" as="p" size="medium">
          Seven decades of shaping young minds — here&rsquo;s what makes St. Elizabeth special.
        </Text>
      </div>
      <div className={styles.statsCards}>
        {STATS.map((stat) => (
          <article key={stat.label} className={styles.statsCard} aria-label={`${stat.label}: ${stat.value}`}>
            <div className={styles.statIcon}>{STATS_ICONS[stat.value]}</div>
            <p className={styles.statValue}>{stat.value}</p>
            <Heading level="h3" variant="card" className={styles.statLabel}>
              {stat.label}
            </Heading>
            <Text variant="muted" size="small" className={styles.statDescription}>
              {stat.description}
            </Text>
          </article>
        ))}
      </div>
    </HorizontalPage>
  );
}
