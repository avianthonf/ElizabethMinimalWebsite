import { PageShell } from "@/components/layout";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/components/primitives/Link";
import { MapEmbedLazy as MapEmbed } from "@/components/content/MapEmbed/MapEmbedLazy";
import {
  SCHOOL_ADDRESS,
  SCHOOL_CONTACT,
  SCHOOL_COORDINATES,
  GOOGLE_MAPS_DIRECTIONS_URL,
} from "@/data/visits";
import { CONTACT_IMAGES } from "@/data/images";
import { createPageMetadata } from "@/lib/page-utils";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  "Location & Map",
  "Find St. Elizabeth's High School in Pomburpa, Bardez, Goa. Get directions, view our campus on the map, and plan your visit.",
  { ogImage: "/images/DSC07580.jpg" },
);

export default function LocationMapPage() {
  return (
    <PageShell
      hero={
        <>
          <Breadcrumb href="/contact" label="Contact" currentLabel="Location & Map" />
          <Hero
            eyebrow="Visit"
            heading="Location & Map"
            description="Find us in the heart of Pomburpa, Bardez, Goa. We're easily accessible from both Panjim and Mapusa."
            backgroundImage={`/images/${CONTACT_IMAGES[0].filename}`}
          />
        </>
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel="School location map">
        <Container width="wide">
          <Stack gap="large">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                Our Campus
              </Heading>
              <Text variant="muted" size="medium">
                St. Elizabeth&apos;s High School is located on Ven. Fr. Hilario Gonsalves Road in
                Pomburpa, a quiet neighbourhood in Bardez, Goa. Our campus is easily reachable from
                major landmarks in the area.
              </Text>
            </Stack>

            <div className={styles.mapSection}>
              <MapEmbed lat={SCHOOL_COORDINATES.lat} lng={SCHOOL_COORDINATES.lng} zoom={14} />
            </div>

            <div className={styles.infoGrid}>
              <Stack gap="small">
                <Heading level="h3" variant="card">
                  Address
                </Heading>
                <Text variant="muted">
                  {SCHOOL_ADDRESS.street}
                  <br />
                  {SCHOOL_ADDRESS.area}
                  <br />
                  {SCHOOL_ADDRESS.city} {SCHOOL_ADDRESS.pinCode}
                  <br />
                  {SCHOOL_ADDRESS.country}
                </Text>
              </Stack>

              <Stack gap="small">
                <Heading level="h3" variant="card">
                  Contact
                </Heading>
                <Text variant="muted">
                  Phone:{" "}
                  <Link href={`tel:${SCHOOL_CONTACT.phone.replace(/[^+\d]/g, "")}`}>
                    {SCHOOL_CONTACT.phone}
                  </Link>
                </Text>
                <Text variant="muted">
                  Email: <Link href={`mailto:${SCHOOL_CONTACT.email}`}>{SCHOOL_CONTACT.email}</Link>
                </Text>
                <Text variant="muted">Hours: {SCHOOL_CONTACT.hours}</Text>
              </Stack>

              <Stack gap="small">
                <Heading level="h3" variant="card">
                  Getting Here
                </Heading>
                <Text variant="muted" size="small">
                  From Panjim: Take the NH66 north towards Mapusa, turn right at the Pomburpa
                  junction, and follow the signs to the school.
                </Text>
                <Text variant="muted" size="small">
                  From Mapusa: Head south on the road to Pomburpa. The school is located on Ven. Fr.
                  Hilario Gonsalves Road, near the Pomburpa church.
                </Text>
                <Link
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  external
                  className={styles.directionsButton}
                >
                  Get Directions on Google Maps
                </Link>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
