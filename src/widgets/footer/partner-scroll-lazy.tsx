"use client";

import dynamic from "next/dynamic";

const PartnerScrollInner = dynamic(
  () => import("@/features/marquee").then((mod) => ({ default: mod.PartnerScroll })),
  { ssr: false },
);

export function PartnerScrollLazy() {
  return <PartnerScrollInner />;
}
