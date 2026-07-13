import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";

export default function PhotoGalleryLoading() {
  return (
    <>
      <Hero heading="Photo Gallery" subheading="Moments from our school" />
      <Section background="soft" padding="xlarge">
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "4/3",
                  borderRadius: "4.5px",
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
