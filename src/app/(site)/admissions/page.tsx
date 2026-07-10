import { Hero } from "@/shared/ui/hero";
import { IconCard } from "@/shared/ui/icon-card";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { SplitLayout } from "@/shared/ui/split-layout";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Icon } from "@/shared/ui/icon";
import { Link } from "@/shared/ui/link";
import { SchoolIcon } from "@/shared/ui/school-icon";
import { QRCard } from "@/features/qr";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { generateFAQSchema } from "@/shared/lib/seo";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import { WHATSAPP_INQUIRY, ADMISSIONS_TIMELINE, FAQS } from "@/domains/admissions/admissions.data";

export const metadata = createPageMetadata(
  "Admissions",
  "Begin your journey at St. Elizabeth's High School. Learn about admissions, tuition, and how to apply.",
);

export default function AdmissionsPage() {
  const heroImage = getHeroImage("admissions-hero");
  const faqSchema = generateFAQSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(faqSchema) }}
      />
      <Hero
        eyebrow="Join Us"
        heading="Admissions at St. Elizabeth"
        description="Discover a nurturing school community where your child will be known, challenged, and supported to reach their full potential."
        backgroundImage={`/images/${heroImage.filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel="Admissions information">
        <Container>
          <SplitLayout
            ratio="2-1"
            left={
              <Stack gap="large">
                <Stack gap="medium">
                  <Text variant="eyebrow">Welcome</Text>
                  <Heading level="h2" variant="section">
                    Begin Your Journey
                  </Heading>
                  <Text variant="muted" size="medium">
                    Choosing the right school is one of the most important decisions a family makes.
                    At St. Elizabeth&apos;s High School, we&apos;re here to guide you through every
                    step of the admissions process.
                  </Text>
                </Stack>
                <Grid columns={2} gap="medium" responsive>
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="community" />
                      </Icon>
                    }
                    title="Why St. Elizabeth?"
                    description="Discover what sets our school apart from the rest."
                    href="/admissions/why"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="academic" />
                      </Icon>
                    }
                    title="Infrastructure"
                    description="Explore our campus facilities and amenities."
                    href="/admissions/infrastructure"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="arts" />
                      </Icon>
                    }
                    title="Apply"
                    description="Complete your application and take the first step."
                    href="/admissions/apply"
                  />
                </Grid>
              </Stack>
            }
            right={
              <Stack gap="medium">
                <QRCard
                  value={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://stelizabeths.in"}/admissions/apply`}
                  label="Scan to apply"
                  size={140}
                />
                <Heading level="h3" variant="card">
                  Key Dates
                </Heading>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Text variant="eyebrow">Admissions Open</Text>
                    <Text variant="muted" size="small">
                      Applications open in January for the upcoming academic year beginning in June.
                    </Text>
                  </Stack>
                </Card>
                <Card variant="default" padding="medium">
                  <Stack gap="small">
                    <Text variant="eyebrow">Open House</Text>
                    <Text variant="muted" size="small">
                      Join us for our annual Open House to tour the campus and meet our faculty.
                    </Text>
                  </Stack>
                </Card>
                <Link href="/contact/office-hours" variant="default">
                  View Office Hours →
                </Link>
              </Stack>
            }
          />
        </Container>
      </Section>

      {/* Admissions Timeline + WhatsApp */}
      <Section background="soft" padding="xlarge" ariaLabel="Admissions timeline and contact">
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Admissions Timeline
            </Heading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "var(--p-space-medium)",
              }}
            >
              {ADMISSIONS_TIMELINE.map((item) => (
                <Card key={item.month} variant="default" padding="medium">
                  <Stack gap="small">
                    <Text variant="eyebrow">{item.month}</Text>
                    <Text variant="muted" size="small">
                      {item.event}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </div>
            <Card variant="default" padding="medium">
              <div style={{ textAlign: "center" }}>
                <Stack gap="small">
                  <Heading level="h3" variant="card">
                    Quick Inquiry via WhatsApp
                  </Heading>
                  <Text variant="muted" size="small">
                    Have a quick question? Reach us directly on WhatsApp.
                  </Text>
                  <Link href={WHATSAPP_INQUIRY.link} variant="default">
                    Chat on WhatsApp →
                  </Link>
                </Stack>
              </div>
            </Card>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
