import type { Metadata } from "next";
import { HomePage } from "@/components/home";
import { createPageMetadata, SITE_DESCRIPTION } from "@/lib/page-utils";

export const metadata: Metadata = createPageMetadata("Home", SITE_DESCRIPTION, {
  path: "/",
  ogImage: "/og-default.jpg",
});

export default function Home() {
  return <HomePage />;
}
