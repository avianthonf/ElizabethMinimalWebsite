"use client";

import dynamic from "next/dynamic";
import { SafeSection } from "@/features/error-isolation/safe-section";

const PartnerScrollInner = dynamic(
  () => import("@/features/marquee").then((mod) => ({ default: mod.PartnerScroll })),
  { ssr: false },
);

export function PartnerScrollLazy() {
  return (
    <SafeSection label="partner scroll">
      <PartnerScrollInner />
    </SafeSection>
  );
}
