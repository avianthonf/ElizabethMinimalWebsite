import { Card } from "@/shared/ui/card";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Button } from "@/shared/ui/button";
import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Grid } from "@/shared/ui/grid";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { VISIT_TYPES, SCHOOL_CONTACT } from "@/domains/contact/contact.data";
import { createWebPageSchema } from "@/shared/lib/structured-data";
import { safeJsonStringify } from "@/shared/lib/safe-json";

const VISIT_PAGE = {
  metaTitle: "Visit Our Campus",
  metaDescription:
    "Experience St. Elizabeth's High School firsthand. Explore our learning spaces, meet our staff, and discover what makes our school a happy, caring, and inspiring place to learn.",
  breadcrumb: { href: "/contact", label: "Contact Us", currentLabel: "Visit Our Campus" },
  heroEyebrow: "Experience Our School",
  heroHeading: "Visit Our Campus",
  heroDescription:
    "There's no better way to experience St. Elizabeth's High School than by visiting our campus. We warmly welcome parents and prospective students to explore our learning spaces, meet our staff, and discover what makes our school a happy, caring, and inspiring place to learn.",
  sectionAriaLabel: "Visit our campus information",
} as const;

export const metadata = createPageMetadata(
  VISIT_PAGE.metaTitle,
  VISIT_PAGE.metaDescription,
  "/contact/visit-our-campus",
);

const WHAT_TO_EXPECT = [
  {
    icon: "🏫",
    title: "Explore Our Campus",
    description: "Discover the spaces where learning, creativity, and growth come together.",
  },
  {
    icon: "👩‍🏫",
    title: "Meet the Headmistress",
    description: "Learn about our academic programmes, school values, and the admission process.",
  },
  {
    icon: "🌱",
    title: "Experience the School Environment",
    description: "Discover our safe, inclusive, and student-friendly campus.",
  },
  {
    icon: "❓",
    title: "Ask Your Questions",
    description:
      "Our team will be happy to answer your queries and guide you through the admission process.",
  },
];

export default function VisitCampusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonStringify(
            createWebPageSchema(
              VISIT_PAGE.heroHeading,
              VISIT_PAGE.heroDescription,
              "/contact/visit-our-campus",
            ),
          ),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: VISIT_PAGE.breadcrumb.label, href: VISIT_PAGE.breadcrumb.href },
          { label: VISIT_PAGE.breadcrumb.currentLabel, href: "#" },
        ]}
      />
      <Breadcrumb
        href={VISIT_PAGE.breadcrumb.href}
        label={VISIT_PAGE.breadcrumb.label}
        currentLabel={VISIT_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={VISIT_PAGE.heroEyebrow}
        heading={VISIT_PAGE.heroHeading}
        description={VISIT_PAGE.heroDescription}
        backgroundImage={`/images/${getHeroImage("contact-hero").filename}`}
      />

      {/* What You Can Expect Section */}
      <Section background="paper" padding="xlarge" ariaLabel="What to expect when visiting">
        <Container width="narrow">
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                What You Can Expect
              </Heading>
            </div>
            <Grid columns={2} gap="medium" responsive>
              {WHAT_TO_EXPECT.map((item) => (
                <Card key={item.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                    <Heading level="h3" variant="card">
                      {item.title}
                    </Heading>
                    <Text variant="body" size="medium">
                      {item.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Visit Types Section */}
      <Section background="paper" padding="xlarge" ariaLabel="Types of campus visits">
        <Container width="narrow">
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                Types of Visits
              </Heading>
              <div style={{ marginTop: "0.5rem" }}>
                <Text variant="muted" size="large">
                  Choose the visit format that works best for you
                </Text>
              </div>
            </div>

            <Stack gap="medium">
              {VISIT_TYPES.map((type) => (
                <Card key={type.id} variant="default" padding="large">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {type.label}
                    </Heading>
                    <Text variant="body" size="medium">
                      {type.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section background="paper" padding="xlarge" ariaLabel="Schedule your visit">
        <Container width="narrow">
          <Card variant="elevated" padding="large">
            <Stack gap="medium">
              <Heading level="h2" variant="card">
                Schedule Your Visit
              </Heading>
              <Text variant="body" size="large">
                To arrange a campus visit, please contact us:
              </Text>
              <Stack gap="small">
                <Text variant="body" size="medium">
                  📞 <strong>Phone:</strong> {SCHOOL_CONTACT.phone}
                </Text>
                <Text variant="body" size="medium">
                  ✉️ <strong>Email:</strong> {SCHOOL_CONTACT.email}
                </Text>
                <Text variant="body" size="medium">
                  🕐 <strong>Office Hours:</strong> {SCHOOL_CONTACT.hours}
                </Text>
              </Stack>
              <div style={{ marginTop: "1rem" }}>
                <Button href="/contact/info" variant="primary" size="large">
                  Get Directions
                </Button>
              </div>
            </Stack>
          </Card>
        </Container>
      </Section>
    </>
  );
}
