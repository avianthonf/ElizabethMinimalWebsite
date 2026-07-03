import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { SITE_URL } from "@/lib/brand";

export interface InquiryEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function InquiryEmail({ name, email, phone, subject, message }: InquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New website inquiry from {name}: {subject}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>New Website Inquiry</Heading>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={label}>From</Text>
            <Text style={value}>
              {name} &lt;{email}&gt;
            </Text>
            {phone && (
              <>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}
            <Text style={label}>Subject</Text>
            <Text style={value}>{subject}</Text>
          </Section>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Submitted via{" "}
            <Link href={SITE_URL} style={footerLink}>
              {SITE_URL.replace(/^https?:\/\//, "")}
            </Link>{" "}
            contact form
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#f4f1ed",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "585px",
  padding: "32px 24px",
  borderRadius: "6px",
  border: "1px solid #e5e5e5",
};

const heading: React.CSSProperties = {
  color: "#1B2A4A",
  fontSize: "22px",
  fontWeight: 700,
  margin: "0 0 16px 0",
  lineHeight: 1.3,
};

const hr: React.CSSProperties = {
  borderColor: "#e5e5e5",
  margin: "16px 0",
  border: "none",
  borderTop: "1px solid #e5e5e5",
};

const section: React.CSSProperties = {
  padding: "0",
  margin: 0,
};

const label: React.CSSProperties = {
  color: "#5f5f5f",
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 4px 0",
  lineHeight: 1.4,
};

const value: React.CSSProperties = {
  color: "#171717",
  fontSize: "15px",
  margin: "0 0 16px 0",
  lineHeight: 1.5,
};

const messageText: React.CSSProperties = {
  color: "#171717",
  fontSize: "15px",
  margin: "0 0 16px 0",
  lineHeight: 1.6,
  whiteSpace: "pre-wrap" as const,
};

const footer: React.CSSProperties = {
  color: "#5f5f5f",
  fontSize: "12px",
  margin: 0,
  lineHeight: 1.5,
};

const footerLink: React.CSSProperties = {
  color: "#1B2A4A",
  textDecoration: "underline",
};
