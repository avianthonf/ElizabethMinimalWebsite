import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { ContentPage } from "@/screens/generic";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  STAFF_PAGE,
  STAFF_MEMBERS,
  TEACHING_TEAM,
  TEACHER_DEVELOPMENT,
  MANAGEMENT_INTRO,
  MANAGEMENT_INFO,
  MANAGEMENT_CLOSING,
  FACULTY_HIGHLIGHTS,
} from "@/domains/about/about.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  STAFF_PAGE.metaTitle,
  STAFF_PAGE.metaDescription,
  "/about/staff",
);

export default function StaffPage() {
  return (
    <>
      <ContentPage
        breadcrumb={STAFF_PAGE.breadcrumb}
        heroEyebrow={STAFF_PAGE.heroEyebrow}
        heroHeading={STAFF_PAGE.heroHeading}
        heroDescription={STAFF_PAGE.heroDescription}
        heroBackgroundImage={`/images/${COMMUNITY_IMAGES[1].filename}`}
        sectionHeading={STAFF_PAGE.sectionHeading}
        items={STAFF_MEMBERS}
        layout="list"
        renderItem={(member) => (
          <Card key={member.role} variant="default" padding="medium">
            <Stack gap="small">
              {member.name && (
                <Heading level="h3" variant="card">
                  {member.name}
                </Heading>
              )}
              <Text variant="eyebrow">{member.role}</Text>
              <Text variant="muted" size="small">
                {member.department}
              </Text>
              <Text variant="muted" size="medium">
                {member.description}
              </Text>
            </Stack>
          </Card>
        )}
        sectionAriaLabel={STAFF_PAGE.sectionAriaLabel}
      />

      {/* Management & Governance */}
      <Section background="paper" padding="xlarge" ariaLabel="School management and governance">
        <Container width="wide">
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                {MANAGEMENT_INTRO.heading}
              </Heading>
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "var(--p-color-muted)",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.7",
                }}
              >
                {MANAGEMENT_INTRO.body}
              </p>
            </div>
            <div>
              {MANAGEMENT_INFO.map((info, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--p-color-muted)",
                    fontSize: "var(--p-font-size-base)",
                    lineHeight: "1.7",
                    marginBottom: "1rem",
                  }}
                >
                  {info}
                </p>
              ))}
            </div>
            <div
              style={{
                borderLeft: "3px solid var(--color-accent-gold, #c9a96e)",
                paddingLeft: "var(--p-space-medium)",
                marginTop: "var(--p-space-small)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.7",
                  fontStyle: "italic",
                  color: "var(--p-color-body)",
                }}
              >
                {MANAGEMENT_CLOSING.body}
              </p>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* Teaching Team */}
      <Section background="soft" padding="xlarge" ariaLabel="Teaching team">
        <Container width="wide">
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                {FACULTY_HIGHLIGHTS.heading}
              </Heading>
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "var(--p-color-muted)",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.7",
                }}
              >
                {FACULTY_HIGHLIGHTS.body}
              </p>
            </div>
            <div>
              <Heading level="h3" variant="section">
                {TEACHING_TEAM.heading}
              </Heading>
              <Text variant="muted" size="large">
                {TEACHING_TEAM.intro}
              </Text>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "var(--p-space-medium)",
              }}
            >
              {TEACHING_TEAM.categories.map((category) => (
                <Card key={category.name} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {category.name}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {category.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </div>
            <div style={{ marginTop: "var(--p-space-medium)" }}>
              <Heading level="h3" variant="section">
                {TEACHER_DEVELOPMENT.heading}
              </Heading>
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "var(--p-color-muted)",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.7",
                }}
              >
                {TEACHER_DEVELOPMENT.body}
              </p>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
