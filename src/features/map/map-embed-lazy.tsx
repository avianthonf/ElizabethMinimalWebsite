"use client";

import { useState, useEffect, type ReactNode } from "react";
import styles from "./map-embed.module.css";

/**
 * Client-side wrapper that dynamically imports MapEmbed after mount.
 * This avoids SSR issues with Leaflet (which requires `window`).
 */
export function MapEmbedLazy(props: Record<string, unknown>): ReactNode {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<
    Record<string, unknown>
  > | null>(null);

  useEffect(() => {
    import("./map-embed").then((mod) => {
      setMapComponent(() => mod.MapEmbed);
    });
  }, []);

  if (!MapComponent) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.skeleton} aria-hidden="true">
          <div className={styles.skeletonPulse} />
        </div>
      </div>
    );
  }

  return <MapComponent {...props} />;
}
