"use client";

import { useState } from "react";
import styles from "./MapEmbed.module.css";

export interface MapEmbedProps {
  /** Google Maps embed URL */
  src: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Center latitude for the map (default: Pomburpa, Goa) */
  lat?: number;
  /** Center longitude for the map */
  lng?: number;
  /** Zoom level (1-20, default 14) */
  zoom?: number;
  /** Custom className */
  className?: string;
}

/**
 * MapEmbed — lazy-loadable Google Maps iframe with loading state.
 *
 * Uses loading="lazy" for native browser lazy loading.
 * Disables scroll zoom by default for better mobile UX (tap to zoom).
 */
export function MapEmbed({
  src,
  title = "School location on Google Maps",
  className,
}: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {!loaded && (
        <div className={styles.skeleton} aria-hidden="true">
          <div className={styles.skeletonPulse} />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        className={`${styles.iframe} ${loaded ? styles.loaded : ""}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        allowFullScreen
      />
    </div>
  );
}
