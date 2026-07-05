import type { Metadata } from "next";
import { Suspense } from "react";
import { HomePage } from "@/components/home";
import { createPageMetadata, SITE_DESCRIPTION } from "@/shared/lib/page-utils";

export const metadata: Metadata = createPageMetadata("Home", SITE_DESCRIPTION, {
  path: "/",
  ogImage: "/og-default.jpg",
});

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  );
}
