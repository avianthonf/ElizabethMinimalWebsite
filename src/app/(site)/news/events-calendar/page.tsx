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
import { createEventSchema } from "@/shared/lib/enhanced-structured-data";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import { SITE_NAME } from "@/shared/lib";

/** Composes a venue location string for structured data event schemas. */
function venue(area: string): string {
  return `${area}, ${SITE_NAME}, Pomburpa, Goa`;
}

export const metadata: Metadata = createPageMetadata(
  "Events Calendar",
  "Upcoming events and important dates at St. Elizabeth's High School. View our academic calendar, sports meets, cultural celebrations, and school holidays for 2026-27.",
  "/news/events-calendar",
  { ogImage: "/images/DSC07580.jpg" },
);

// Pre-generate Event schemas for SEO (static data)
const eventSchemas = [
  createEventSchema({
    name: "Admissions Open House",
    description: "Admissions event at St. Elizabeth's High School",
    startDate: "2026-08-01",
    endDate: "2026-08-01",
    location: venue("Main Campus"),
  }),
  createEventSchema({
    name: "First Day of School",
    description: "Academic event at St. Elizabeth's High School",
    startDate: "2026-09-01",
    endDate: "2026-09-01",
    location: venue("All Classrooms"),
  }),
  createEventSchema({
    name: "Teacher's Day Celebration",
    description: "Cultural event at St. Elizabeth's High School",
    startDate: "2026-09-05",
    endDate: "2026-09-05",
    location: venue("Assembly Hall"),
  }),
  createEventSchema({
    name: "Inter-House Sports Meet XXIII",
    description: "Sports event at St. Elizabeth's High School",
    startDate: "2026-10-10",
    endDate: "2026-10-12",
    location: venue("Sports Ground"),
  }),
  createEventSchema({
    name: "Annual Day Celebrations",
    description: "Cultural event at St. Elizabeth's High School",
    startDate: "2026-11-15",
    endDate: "2026-11-15",
    location: venue("Auditorium"),
  }),
  createEventSchema({
    name: "Christmas Celebrations & Vacation",
    description: "Community event at St. Elizabeth's High School",
    startDate: "2026-12-22",
    endDate: "2026-12-31",
    location: venue("Main Campus"),
  }),
];

export default function EventsCalendarPage() {
  return (
    <>
      {/* Add Event structured data for each calendar event */}
      {eventSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonStringify(schema) }}
        />
      ))}
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
