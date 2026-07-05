import { SITE_URL } from "@/lib/brand";
import { safeJsonStringify } from "@/lib/safe-json";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

const BASE_URL = SITE_URL;

/**
 * Renders JSON-LD structured data for BreadcrumbList schema.
 * Improves SEO by helping search engines understand page hierarchy.
 *
 * CSP note: <script type="application/ld+json"> is a data block, not
 * executable JS.  It is not subject to script-src and passes CSP without
 * a nonce.
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonStringify(jsonLd) }}
    />
  );
}
