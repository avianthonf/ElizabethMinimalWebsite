import { VisitPage } from "@/components/templates";
import type { VisitInfoCard, MapConfig } from "@/components/templates";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { CONTACT_VISIT_PAGE } from "@/data/contact";
import { SCHOOL_ADDRESS, GOOGLE_MAPS_EMBED_URL } from "@/data/visits";
import { CONTACT_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  CONTACT_VISIT_PAGE.metaTitle,
  CONTACT_VISIT_PAGE.metaDescription,
);

const visitInfoCards: VisitInfoCard[] = [
  {
    eyebrow: "Our Address",
    content: (
      <Text variant="muted">
        {SCHOOL_ADDRESS.street}
        <br />
        {SCHOOL_ADDRESS.area}
        <br />
        {SCHOOL_ADDRESS.city} {SCHOOL_ADDRESS.pinCode}
        <br />
        {SCHOOL_ADDRESS.country}
      </Text>
    ),
  },
  {
    eyebrow: "Getting Here",
    content: (
      <Text variant="muted" size="small">
        From Panjim: Take the NH66 north towards Mapusa, turn right at the Pomburpa junction, and follow the signs to the school. From Mapusa: Head south on the road to Pomburpa. The school is located on Ven. Fr. Hilario Gonsalves Road, near the Pomburpa church.
      </Text>
    ),
  },
];

const mapConfig: MapConfig = {
  title: "Campus Map",
  embedUrl: GOOGLE_MAPS_EMBED_URL,
};

export default function ContactVisitPage() {
  return (
    <VisitPage
      heroEyebrow={CONTACT_VISIT_PAGE.heroEyebrow}
      heroHeading={CONTACT_VISIT_PAGE.heroHeading}
      heroDescription={CONTACT_VISIT_PAGE.heroDescription}
      heroBackgroundImage={`/images/${CONTACT_IMAGES[1]?.filename ?? CONTACT_IMAGES[0].filename}`}
      sectionHeading={CONTACT_VISIT_PAGE.sectionHeading}
      introText={CONTACT_VISIT_PAGE.introText}
      infoCards={visitInfoCards}
      mapConfig={mapConfig}
      sectionAriaLabel={CONTACT_VISIT_PAGE.sectionAriaLabel}
    />
  );
}
