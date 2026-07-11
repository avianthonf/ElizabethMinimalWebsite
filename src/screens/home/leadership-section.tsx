import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Button } from "@/shared/ui/button";
import { MANAGER_MESSAGE } from "@/domains/about/manager.data";
import { HEADMISTRESS_MESSAGE } from "@/domains/about/headmistress.data";

interface LeadershipMessage {
  name: string;
  title: string;
  excerpt: string;
  href: string;
}

interface LeadershipSectionProps {
  ariaLabel?: string;
}

// Extract first paragraph from full messages
const getExcerpt = (message: string): string => {
  const firstParagraph = message.split("\n\n")[0];
  return firstParagraph.length > 200 ? firstParagraph.slice(0, 200) + "..." : firstParagraph;
};

const LEADERSHIP_MESSAGES: LeadershipMessage[] = [
  {
    name: MANAGER_MESSAGE.name,
    title: MANAGER_MESSAGE.title,
    excerpt: getExcerpt(MANAGER_MESSAGE.message),
    href: "/about/manager-message",
  },
  {
    name: HEADMISTRESS_MESSAGE.name,
    title: HEADMISTRESS_MESSAGE.title,
    excerpt: getExcerpt(HEADMISTRESS_MESSAGE.message),
    href: "/about/headmistress-message",
  },
];

export function LeadershipSection({ ariaLabel = "Leadership messages" }: LeadershipSectionProps) {
  return (
    <Section background="paper" padding="xlarge" ariaLabel={ariaLabel}>
      <Container width="default">
        <Stack gap="large">
          <div style={{ textAlign: "center" }}>
            <Heading level="h2" variant="section">
              Messages from Our Leadership
            </Heading>
            <div style={{ marginTop: "0.5rem" }}>
              <Text variant="muted" size="large">
                Words of welcome and vision from those who guide St. Elizabeth&apos;s High School
              </Text>
            </div>
          </div>

          <Grid columns={2} gap="large" responsive>
            {LEADERSHIP_MESSAGES.map((message) => (
              <Card key={message.name} variant="elevated" padding="large">
                <Stack gap="medium">
                  <div>
                    <Heading level="h3" variant="card">
                      {message.name}
                    </Heading>
                    <div style={{ marginTop: "0.25rem" }}>
                      <Text variant="eyebrow">{message.title}</Text>
                    </div>
                  </div>
                  <Text variant="body" size="medium">
                    {message.excerpt}
                  </Text>
                  <div>
                    <Button href={message.href} variant="ghost" size="medium">
                      Read Full Message →
                    </Button>
                  </div>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}
