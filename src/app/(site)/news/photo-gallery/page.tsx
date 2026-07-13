import { Hero } from "@/shared/ui/hero";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { createWebPageSchema } from "@/shared/lib/structured-data";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import { HERO_IMAGES } from "@/domains/media/images.data";
import { GalleryPage } from "@/screens/news/gallery-page";

export const metadata = createPageMetadata(
  "Photo Gallery",
  "Browse photos of campus life, academics, athletics, arts, and community events at St. Elizabeth's High School in Pomburpa, Goa.",
  "/news/photo-gallery",
  { ogImage: `/images/${HERO_IMAGES[0]!.filename}` },
);

export default function PhotoGalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonStringify(
            createWebPageSchema(
              "Photo Gallery",
              "Browse photos of campus life, academics, athletics, arts, and community events at St. Elizabeth's High School in Pomburpa, Goa.",
              "/news/photo-gallery",
            ),
          ),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: "Photo Gallery", href: "/news/photo-gallery" },
        ]}
      />
      <Breadcrumb href="/news" label="News" currentLabel="Photo Gallery" />
      <Hero
        eyebrow="Explore"
        heading="Photo Gallery"
        description="A visual journey through the vibrant life at St. Elizabeth's High School."
        backgroundImage={`/images/${HERO_IMAGES[0]!.filename}`}
      />

      <GalleryPage />
    </>
  );
}
