import type { Metadata } from "next";
import { HomePage } from "@/screens/home";
import { createPageMetadata, SITE_DESCRIPTION } from "@/shared/lib/page-utils";

export const metadata: Metadata = createPageMetadata("Home", SITE_DESCRIPTION, "/", {
  ogImage: "/og-default.jpg",
});

import { cacheLife } from "next/cache";

export default async function Home() {
  "use cache";
  cacheLife("minutes");
  return <HomePage />;
}
