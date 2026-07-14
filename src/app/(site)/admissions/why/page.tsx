import { Hero } from "@/shared/ui/hero";
import { IconCard } from "@/shared/ui/icon-card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Icon } from "@/shared/ui/icon";
import { SchoolIcon } from "@/shared/ui/school-icon";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { createWebPageSchema } from "@/shared/lib/structured-data";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import { WHY_ST_ELIZABETH_POINTS } from "@/domains/admissions/admissions.data";
import { getAlumniTestimonials } from "@/domains/about/alumni.fetcher";

export const metadata = createPageMetadata(
  "Why St. Elizabeth?",
  "Discover what makes St. Elizabeth's High School special — academic excellence, values-based education, holistic development, and a nurturing community.",
  "/admissions/why",
  { ogImage: "/images/DSC07580.jpg" },
);

export default async function WhyPage() {
  const heroImage = getHeroImage("admissions-hero");
  const testimonials = await getAlumniTestimonials();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonStringify(
            createWebPageSchema(
              "Why St. Elizabeth?",
              "Discover what makes St. Elizabeth's High School special — academic excellence, values-based education, holistic development, and a nurturing community.",
              "/admissions/why",
            ),
          ),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Why St. Elizabeth?", href: "/admissions/why" },
        ]}
      />
      <Breadcrumb href="/admissions" label="Admissions" currentLabel="Why St. Elizabeth?" />
      <Hero
        eyebrow="Discover"
        heading="Why St. Elizabeth?"
        description="Find out why families across North Goa choose St. Elizabeth's High School for their children's education."
        backgroundImage={`/images/${heroImage.filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel="Why choose St. Elizabeth">
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Why Families Choose Us
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {WHY_ST_ELIZABETH_POINTS.map((point) => (
                <IconCard
                  key={point.title}
                  icon={
                    <Icon size="medium">
                      <SchoolIcon variant="academic" />
                    </Icon>
                  }
                  title={point.title}
                  description={point.description}
                />
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section background="paper" padding="xlarge" ariaLabel="Testimonials from our community">
        <Container width="default">
          <Stack gap="large">
            <div style={{ textAlign: "center" }}>
              <Heading level="h2" variant="section">
                Hear From Our Community
              </Heading>
              <div style={{ marginTop: "0.5rem" }}>
                <Text variant="muted" size="large">
                  The experiences of our students, parents, alumni, and teachers reflect the values
                  and spirit that make St. Elizabeth&apos;s High School a special place to learn and
                  grow.
                </Text>
              </div>
            </div>
            {/* Alumni Testimonials - First 2 */}
            <Stack gap="large">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <div
                  key={index}
                  style={{
                    padding: "2rem",
                    backgroundColor: "var(--p-color-paper)",
                    borderRadius: "var(--p-border-radius-large)",
                    borderLeft: "4px solid var(--p-color-navy)",
                  }}
                >
                  <Stack gap="medium">
                    <div
                      style={{
                        fontStyle: "italic",
                        lineHeight: "1.8",
                        color: "var(--p-color-text)",
                        fontSize: "var(--p-font-size-large)",
                      }}
                    >
                      &ldquo;{testimonial.quote}&rdquo;
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "var(--p-color-navy)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {testimonial.name}
                        {testimonial.credentials && ` (${testimonial.credentials})`}
                      </div>
                      <Text variant="muted" size="small">
                        {testimonial.designation}
                      </Text>
                      {testimonial.academicYears && (
                        <Text variant="muted" size="small">
                          Academic years {testimonial.academicYears}
                        </Text>
                      )}
                    </div>
                  </Stack>
                </div>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
