import { VisitPage } from "@/components/templates";
import type { VisitInfoCard, MapConfig } from "@/components/templates";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata, getHeroImage } from "@/lib/page-utils";
import { ADMISSIONS_VISIT_PAGE } from "@/data/admissions";
import { SCHOOL_ADDRESS, GOOGLE_MAPS_EMBED_URL } from "@/data/visits";

export const metadata = createPageMetadata(
  ADMISSIONS_VISIT_PAGE.metaTitle,
  ADMISSIONS_VISIT_PAGE.metaDescription,
);

const visitInfoCards: VisitInfoCard[] = [
  {
    eyebrow: "Visit Information",
    content: (
      <Text variant="muted" size="small">
        Tours are conducted on weekdays from 9:00 AM to 2:00 PM. Please contact the admissions office at least one week in advance to schedule your visit. We recommend allowing 90 minutes for a complete campus tour.
      </Text>
    ),
  },
  {
    eyebrow: "What to Expect",
    content: (
      <Text variant="muted" size="small">
        Your visit will include a guided campus tour, classroom observations, a meeting with an admissions counsellor, and an opportunity to speak with current students and faculty.
      </Text>
    ),
  },
];

const mapConfig: MapConfig = {
  title: "Our Location",
  addressLines: (
    <Text variant="muted" size="small">
      {SCHOOL_ADDRESS.street}
      <br />
      {SCHOOL_ADDRESS.area}
      <br />
      {SCHOOL_ADDRESS.city} {SCHOOL_ADDRESS.pinCode}
    </Text>
  ),
  embedUrl: GOOGLE_MAPS_EMBED_URL,
};

export default function AdmissionsVisitPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <VisitPage
      heroEyebrow={ADMISSIONS_VISIT_PAGE.heroEyebrow}
      heroHeading={ADMISSIONS_VISIT_PAGE.heroHeading}
      heroDescription={ADMISSIONS_VISIT_PAGE.heroDescription}
      heroBackgroundImage={`/images/${heroImage.filename}`}
      sectionHeading={ADMISSIONS_VISIT_PAGE.sectionHeading}
      introText={ADMISSIONS_VISIT_PAGE.introText}
      infoCards={visitInfoCards}
      mapConfig={mapConfig}
      sectionAriaLabel={ADMISSIONS_VISIT_PAGE.sectionAriaLabel}
    />
  );
}
