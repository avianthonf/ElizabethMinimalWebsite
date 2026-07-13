import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";

export default function EventsCalendarLoading() {
  return (
    <>
      <Hero heading="Events Calendar" subheading="Upcoming school events and activities" />
      <Section background="soft" padding="xlarge">
        <Container>
          <div
            style={{
              height: "500px",
              borderRadius: "6px",
              background: "var(--s-color-surface, #fafaf9)",
              border: "1px solid var(--s-color-border, rgba(26,26,26,0.1))",
            }}
          />
        </Container>
      </Section>
    </>
  );
}
