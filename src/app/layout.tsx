import type { Metadata, Viewport } from "next";
import { NonceScript } from "@/components/primitives/NonceScript/NonceScript";
import "./globals.css";

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
  metadataBase: new URL("https://www.stelizabeths.edu.in"),
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
  url: "https://www.stelizabeths.edu.in",
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
  email: "info@stelizabeths.edu.in",
  foundingDate: "1949",
  slogan: "Truth and Honesty",
  educationalLevel: "Secondary",
  curriculum: "CBSE",
  numberOfStudents: {
    "@type": "QuantitativeValue",
    value: 1200,
  },
  sameAs: [
    "https://www.facebook.com/stelizabethspomburpa",
    "https://www.instagram.com/stelizabethspomburpa",
  ],
};

const cspNonce = process.env.NEXT_PUBLIC_CSP_NONCE ?? "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <NonceScript nonce={cspNonce} jsonLd={jsonLd} />
      </head>
      <body>{children}</body>
    </html>
  );
}
