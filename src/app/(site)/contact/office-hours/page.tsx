import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/pages/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { OFFICE_HOURS_PAGE, OFFICE_HOURS, HOLIDAY_SCHEDULE } from "@/domains/contact/hours.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  OFFICE_HOURS_PAGE.metaTitle,
  OFFICE_HOURS_PAGE.metaDescription,
);

export default function OfficeHoursPage() {
  return (
    <ContentPage
      breadcrumb={OFFICE_HOURS_PAGE.breadcrumb}
      heroEyebrow={OFFICE_HOURS_PAGE.heroEyebrow}
      heroHeading={OFFICE_HOURS_PAGE.heroHeading}
      heroDescription={OFFICE_HOURS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("contact-hero").filename}`}
      sectionHeading="When to Reach Us"
      items={[
        ...OFFICE_HOURS,
        {
          label: "Holiday Schedule",
          hours: "",
          days: "",
          description: HOLIDAY_SCHEDULE.join(" / "),
        },
      ]}
      layout="list"
      renderItem={(item) => (
        <Card key={item.label} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {item.label}
            </Heading>
            {item.hours && (
              <Text variant="eyebrow">
                {item.hours} · {item.days}
              </Text>
            )}
            <Text variant="muted" size="medium">
              {item.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={OFFICE_HOURS_PAGE.sectionAriaLabel}
    />
  );
}
