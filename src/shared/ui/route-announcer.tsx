"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteAnnouncer() {
  const pathname = usePathname();
  const announcerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Small delay to let document.title update after navigation
    const timeout = setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = `Navigated to ${document.title}`;
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <p ref={announcerRef} aria-live="polite" aria-atomic="true" className="sr-only" role="status" />
  );
}
