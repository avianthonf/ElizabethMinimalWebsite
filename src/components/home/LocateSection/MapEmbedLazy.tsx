"use client";

import dynamic from "next/dynamic";
import styles from "./LocateSection.module.css";

// Lazy-load Leaflet MapEmbed — Leaflet requires `window`
const MapEmbedLazy = dynamic(
  () => import("@/components/content/MapEmbed/MapEmbed").then((m) => m.MapEmbed),
  {
    ssr: false,
    loading: () => (
      <div className={styles.mapPlaceholder}>
        <div className={styles.mapContent}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.pinIcon}
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p className={styles.mapLabel}>Loading map…</p>
        </div>
      </div>
    ),
  },
);

export { MapEmbedLazy };
