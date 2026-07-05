/**
 * Structured Data (JSON-LD) helpers for SEO rich results.
 *
 * All schemas follow schema.org vocabulary and Google's structured data
 * requirements. Each helper returns a plain object that can be serialized
 * to JSON and rendered inside a <script type="application/ld+json"> tag.
 *
 * CSP note: <script type="application/ld+json"> elements are data blocks,
 * not executable JavaScript.  They are NOT subject to script-src directives
 * and pass CSP without a nonce or hash.
 */

import { SITE_URL, SOCIAL_LINKS, POSTAL_CODE } from "./brand";

const BASE_URL = SITE_URL;
const SCHOOL_NAME = "St. Elizabeth's High School";
const SCHOOL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Pomburpa, Bardez",
  addressLocality: "Goa",
  addressRegion: "Goa",
  postalCode: POSTAL_CODE,
  addressCountry: "IN",
};

// ── Organization (School) ──────────────────────────────────────────

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "EducationalOrganization";
  name: string;
  url: string;
  logo?: string;
  address: typeof SCHOOL_ADDRESS;
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType: string;
    availableLanguage?: string[];
  };
  sameAs?: string[];
}

export function createOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SCHOOL_NAME,
    url: BASE_URL,
    address: SCHOOL_ADDRESS,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      availableLanguage: ["English", "Hindi", "Konkani"],
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
  };
}

// ── BreadcrumbList ─────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

// ── WebPage ────────────────────────────────────────────────────────

export interface WebPageSchema {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
  isPartOf?: {
    "@type": "WebSite";
    name: string;
    url: string;
  };
}

export function createWebPageSchema(
  name: string,
  description: string,
  path: string,
): WebPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${BASE_URL}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: `${SCHOOL_NAME} — Official Website`,
      url: BASE_URL,
    },
  };
}

// ── NewsArticle ────────────────────────────────────────────────────

export interface NewsArticleSchema {
  "@context": "https://schema.org";
  "@type": "NewsArticle";
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    "@type": "Organization";
    name: string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
  image?: string;
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
}

export function createNewsArticleSchema(params: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): NewsArticleSchema {
  const schema: NewsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: params.title,
    description: params.description,
    url: `${BASE_URL}${params.path}`,
    datePublished: params.datePublished,
    author: {
      "@type": "Organization",
      name: SCHOOL_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SCHOOL_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${params.path}`,
    },
  };

  if (params.dateModified) schema.dateModified = params.dateModified;
  if (params.image) schema.image = `${BASE_URL}${params.image}`;

  return schema;
}

// ── FAQPage ────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export function createFAQSchema(items: FAQItem[]): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ── JSON-LD Renderer ───────────────────────────────────────────────
// JSON-LD data blocks (<script type="application/ld+json">) are not subject
// to script-src CSP directives.  Simply use dangerouslySetInnerHTML or a
// plain <script> tag — no nonce required.
