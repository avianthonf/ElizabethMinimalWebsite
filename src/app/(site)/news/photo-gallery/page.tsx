import { Hero } from "@/shared/ui/hero";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { HERO_IMAGES } from "@/domains/media/images.data";
import { GalleryPage } from "./GalleryPage";

export const metadata = createPageMetadata(
  "Photo Gallery",
  "Browse photos of campus life, academics, athletics, arts, and community events at St. Elizabeth's High School in Pomburpa, Goa.",
  { ogImage: `/images/${HERO_IMAGES[0].filename}` },
);

export default function PhotoGalleryPage() {
  return (
    <>
      <Hero
        eyebrow="Explore"
        heading="Photo Gallery"
        description="A visual journey through the vibrant life at St. Elizabeth's High School."
        backgroundImage={`/images/${HERO_IMAGES[0].filename}`}
      />

      <GalleryPage />
    </>
  );
}
