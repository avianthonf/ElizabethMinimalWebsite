"use client";

import dynamic from "next/dynamic";
import styles from "./map-embed.module.css";

/**
 * Client-side wrapper that lazy-loads MapEmbed using Next.js `dynamic()`.
 * This avoids SSR issues with Leaflet (which requires `window`).
 */
export const MapEmbedLazy = dynamic(() => import("./map-embed").then((mod) => mod.MapEmbed), {
  ssr: false,
  loading: () => (
    <div className={styles.wrapper}>
      <div className={styles.skeleton} aria-hidden="true">
        <div className={styles.skeletonPulse} />
      </div>
    </div>
  ),
});
