import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";
import { MotionConfig } from "motion/react";
import { Playfair_Display, Inter } from "next/font/google";
import { AxeProvider } from "@/shared/ui/axe-provider";
import { SmoothScrollProvider } from "@/shared/ui/smooth-scroll-provider";
import { RouteAnnouncer } from "@/shared/ui/route-announcer";
import { ToastProvider } from "@/features/contact-form/toast-provider";
import { GlobalSearchOverlay } from "@/features/search/global-search-overlay";
import { MenuProvider } from "@/features/menu/menu-provider";
import { MenuOverlay } from "@/features/menu/menu-overlay";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/shared/lib/brand";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import {
  createSchoolOrganizationSchema,
  createWebSiteSchema,
  createBreadcrumbSchema,
} from "@/shared/lib/enhanced-structured-data";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "St. Elizabeth's High School — Pomburpa, Goa",
    template: "%s | St. Elizabeth's High School",
  },
  description:
    "St. Elizabeth's High School in Pomburpa, Goa — nurturing hearts since 1954. Catholic education affiliated with GBSHSE with an average class size of 15 students.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "St. Elizabeth's High School",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "St. Elizabeth's High School campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

// Enhanced structured data combining multiple schema types for maximum SEO value
const enhancedSchemas = [
  // Primary: School + EducationalOrganization + LocalBusiness (combined schema)
  createSchoolOrganizationSchema(),

  // WebSite schema with search action for Google Search integration
  createWebSiteSchema(),

  // BreadcrumbList for homepage (root level)
  createBreadcrumbSchema([{ name: "Home", url: SITE_URL }]),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        {enhancedSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonStringify(schema) }}
          />
        ))}
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <ViewTransitions>
            <AxeProvider>
              <SmoothScrollProvider>
                <MenuProvider>
                  <Suspense fallback={null}>
                    <RouteAnnouncer />
                    <ToastProvider />
                    <GlobalSearchOverlay />
                  </Suspense>
                  {children}
                  <MenuOverlay />
                  <Analytics />
                  <SpeedInsights />
                </MenuProvider>
              </SmoothScrollProvider>
            </AxeProvider>
          </ViewTransitions>
        </MotionConfig>
      </body>
    </html>
  );
}
