import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";

export default function NewsPageLoading() {
  return (
    <>
      <Hero heading="News" subheading="Latest updates and announcements" />
      <Section background="soft" padding="xlarge">
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "280px",
                  borderRadius: "6px",
                  background: "var(--s-color-surface, #fafaf9)",
                  border: "1px solid var(--s-color-border, rgba(26,26,26,0.1))",
                }}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
