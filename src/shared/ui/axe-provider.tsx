"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * AxeProvider — runs @axe-core/react accessibility audits in development.
 * Only activates in dev mode; the entire axe-core/react-dom chain is lazy-loaded.
 */
export function AxeProvider({ children }: { children: ReactNode }) {
  const ran = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || ran.current) return;
    ran.current = true;

    // Load everything dynamically — keeps axe-core + react-dom out of prod bundle
    Promise.all([import("react"), import("react-dom"), import("@axe-core/react")]).then(
      ([React, ReactDOM, { default: axe }]) => {
        axe(React, ReactDOM, 1000).catch(() => {
          // axe-core init failed — non-critical in dev
        });
      },
    );
  }, []);

  return <>{children}</>;
}
