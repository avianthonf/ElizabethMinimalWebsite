import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Body } from "./body";
import { SITE_URL } from "@/shared/lib";
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
  createSchoolOrganizationSchema(),
  createWebSiteSchema(),
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        {enhancedSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonStringify(schema) }}
          />
        ))}
      </head>
      <body>
        <Body>{children}</Body>
      </body>
    </html>
  );
}
