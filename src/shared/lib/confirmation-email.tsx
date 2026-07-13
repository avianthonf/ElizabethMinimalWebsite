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
import { SITE_URL, CONTACT_EMAIL } from "@/shared/lib/brand";

export interface ConfirmationEmailProps {
  name: string;
  subject: string;
  message: string;
}

/**
 * Confirmation email sent to the user after submitting a contact form inquiry.
 *
 * Provides:
 * - Receipt confirmation with inquiry details
 * - Expected response timeline
 * - Alternative contact methods
 * - Copy of their submitted message for their records
 */
export function ConfirmationEmail({ name, subject, message }: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting St. Elizabeth&apos;s High School</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Thank You for Your Inquiry</Heading>
          <Text style={paragraph}>Dear {name},</Text>
          <Text style={paragraph}>
            We have received your message and will respond within two business days. A member of our
            team will review your inquiry and get back to you as soon as possible.
          </Text>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={label}>Your Message</Text>
            <Text style={subjectText}>{subject}</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={contactHeading}>Other Ways to Reach Us</Text>
            <Text style={contactItem}>
              <strong>Email:</strong>{" "}
              <Link href={`mailto:${CONTACT_EMAIL}`} style={link}>
                {CONTACT_EMAIL}
              </Link>
            </Text>
            <Text style={contactItem}>
              <strong>Phone:</strong> {process.env.NEXT_PUBLIC_PHONE || "0832-2954452"}
            </Text>
            <Text style={contactItem}>
              <strong>Address:</strong> Ven. Fr. Hilario Gonsalves Rd, Pomburpa, Bardez, Goa 403521,
              India
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            This is an automated confirmation email. Please do not reply to this message.
          </Text>
          <Text style={footer}>
            <Link href={SITE_URL} style={footerLink}>
              St. Elizabeth&apos;s High School
            </Link>
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

const paragraph: React.CSSProperties = {
  color: "#171717",
  fontSize: "15px",
  margin: "0 0 16px 0",
  lineHeight: 1.6,
};

const hr: React.CSSProperties = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
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
  margin: "0 0 8px 0",
  lineHeight: 1.4,
};

const subjectText: React.CSSProperties = {
  color: "#1B2A4A",
  fontSize: "16px",
  fontWeight: 600,
  margin: "0 0 12px 0",
  lineHeight: 1.5,
};

const messageText: React.CSSProperties = {
  color: "#171717",
  fontSize: "15px",
  margin: "0 0 16px 0",
  lineHeight: 1.6,
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#f9f9f9",
  padding: "12px",
  borderRadius: "4px",
  border: "1px solid #e5e5e5",
};

const contactHeading: React.CSSProperties = {
  color: "#1B2A4A",
  fontSize: "14px",
  fontWeight: 600,
  margin: "0 0 12px 0",
  lineHeight: 1.4,
};

const contactItem: React.CSSProperties = {
  color: "#171717",
  fontSize: "14px",
  margin: "0 0 8px 0",
  lineHeight: 1.5,
};

const link: React.CSSProperties = {
  color: "#1B2A4A",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  color: "#5f5f5f",
  fontSize: "12px",
  margin: "0 0 4px 0",
  lineHeight: 1.5,
};

const footerLink: React.CSSProperties = {
  color: "#1B2A4A",
  textDecoration: "underline",
};
