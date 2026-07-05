import { safeJsonStringify } from "@/shared/lib/safe-json";
import { createBreadcrumbSchema } from "@/shared/lib/structured-data";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * Renders JSON-LD structured data for BreadcrumbList schema.
 * Uses the centralized createBreadcrumbSchema factory from shared/lib/structured-data.
 *
 * CSP note: <script type="application/ld+json"> is a data block, not
 * executable JS.  It is not subject to script-src and passes CSP without
 * a nonce.
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = createBreadcrumbSchema(
    items.map((item) => ({
      name: item.label,
      url: item.href,
    })),
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonStringify(jsonLd) }}
    />
  );
}
