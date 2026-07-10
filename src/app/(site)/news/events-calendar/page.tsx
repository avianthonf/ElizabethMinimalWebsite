import type { Metadata } from "next";
import { Hero } from "@/shared/ui/hero";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { Stack } from "@/shared/ui/stack";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { EventsCalendar } from "@/features/calendar";
import { SafeSection } from "@/features/error-isolation";
import { createPageMetadata } from "@/shared/lib/page-utils";

export const metadata: Metadata = createPageMetadata(
  "Events Calendar",
  "Upcoming events and important dates at St. Elizabeth's High School. View our academic calendar, sports meets, cultural celebrations, and school holidays for 2026-27.",
  { ogImage: "/images/DSC07580.jpg" },
);

export default function EventsCalendarPage() {
  return (
    <>
      <Breadcrumb href="/news" label="News" currentLabel="Events Calendar" />
      <Hero
        eyebrow="Stay Connected"
        heading="Events Calendar"
        description="Plan ahead for the academic year 2026-27. From admissions open houses to sports meets, cultural celebrations, and holidays — never miss an important date."
        backgroundImage="/images/DSC07580.jpg"
      />

      <Section background="paper" padding="xlarge" ariaLabel="School events calendar">
        <Container width="default">
          <Stack gap="large">
            <Stack gap="medium">
              <Text variant="eyebrow">Academic Year 2026-27</Text>
              <Heading level="h2" variant="section">
                Upcoming Events
              </Heading>
              <Text variant="muted" size="medium">
                All important school dates at a glance. Switch between month and year views using
                the toolbar above the calendar. Gold events are admissions-related, green are
                sports, purple and blue are cultural.
              </Text>
            </Stack>
            <SafeSection label="events calendar">
              <EventsCalendar />
            </SafeSection>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
