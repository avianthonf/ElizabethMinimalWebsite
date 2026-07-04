import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AxeProvider } from "@/components/primitives/AxeProvider/AxeProvider";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider/SmoothScrollProvider";
import { RouteAnnouncer } from "@/components/navigation/RouteAnnouncer/RouteAnnouncer";
import { ToastProvider } from "@/components/ui/Toast/ToastProvider";
import { WebVitals } from "@/components/ui/WebVitals/WebVitals";
import { GlobalSearchOverlay } from "@/components/content/SearchOverlay/GlobalSearchOverlay";
import { MenuProvider } from "@/components/navigation/MenuOverlay/MenuProvider";
import { MenuOverlay } from "@/components/navigation/MenuOverlay/MenuOverlay";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/brand";
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
    "St. Elizabeth's High School in Pomburpa, Goa — nurturing hearts since 1949. Catholic education affiliated with CBSE with an average class size of 15 students.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "St. Elizabeth's High School",
  alternateName: "St. Elizabeth's High School, Pomburpa",
  url: SITE_URL,
  logo: "/logo.png",
  description:
    "Catholic school affiliated with CBSE in Pomburpa, Bardez, Goa. Nurturing hearts since 1949 with an average class size of 15 students.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pomburpa",
    addressLocality: "Bardez",
    addressRegion: "Goa",
    postalCode: "403511",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 15.5449,
    longitude: 73.9723,
  },
  telephone: "+91-832-241-0654",
  email: CONTACT_EMAIL,
  foundingDate: "1949",
  slogan: "Truth and Honesty",
  educationalLevel: "Secondary",
  curriculum: "CBSE",
  numberOfStudents: {
    "@type": "QuantitativeValue",
    value: 1200,
  },
  sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AxeProvider>
          <SmoothScrollProvider>
            <MenuProvider>
              <RouteAnnouncer />
              <ToastProvider />
              <WebVitals />
              <GlobalSearchOverlay />
              {children}
              <MenuOverlay />
              <Analytics />
              <SpeedInsights />
            </MenuProvider>
          </SmoothScrollProvider>
        </AxeProvider>
      </body>
    </html>
  );
}
