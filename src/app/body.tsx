"use client";

import { Suspense } from "react";
import { MotionConfig } from "motion/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SmoothScrollProvider } from "@/shared/ui/smooth-scroll-provider";
import { RouteAnnouncer } from "@/shared/ui/route-announcer";
import { ToastProvider } from "@/features/contact-form/toast-provider";
import { GlobalSearchOverlay } from "@/features/search/global-search-overlay";
import { MenuProvider } from "@/features/menu/menu-provider";
import { MenuOverlay } from "@/features/menu/menu-overlay";
import { SafeSection } from "@/features/error-isolation/safe-section";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";

export function Body({ children }: { children: ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <MenuProvider>
          <Suspense fallback={null}>
            <RouteAnnouncer />
            <ToastProvider />
            <GlobalSearchOverlay />
          </Suspense>
          {children}
          <SafeSection label="navigation menu">
            <MenuOverlay />
          </SafeSection>
          <SafeSection label="analytics">
            <Analytics />
            <SpeedInsights />
          </SafeSection>
          {ENABLE_ANALYTICS && GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        </MenuProvider>
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
