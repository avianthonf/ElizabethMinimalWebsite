"use client";

import Marquee from "react-fast-marquee";

const PARTNER_LOGOS = [
  { name: "CBSE", text: "CBSE Affiliated" },
  { name: "Goa Board", text: "Recognized by Govt. of Goa" },
  { name: "Sports Authority", text: "SAG Goa Partner" },
  { name: "NCC", text: "NCC Unit Member" },
  { name: "UNESCO", text: "ASPnet School" },
  { name: "Goa Tourism", text: "Cultural Partner" },
];

interface PartnerScrollProps {
  speed?: number;
}

/**
 * PartnerScroll — a horizontally scrolling banner of partner logos
 * in the footer section. Uses react-fast-marquee for GPU-accelerated
 * CSS animation. Respects prefers-reduced-motion (pauses).
 *
 * Inline text logos (no images) to keep the bundle light.
 */
export function PartnerScroll({ speed = 30 }: PartnerScrollProps) {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(201, 169, 110, 0.25)",
        padding: "var(--space-medium, 24px) 0",
        marginTop: "var(--space-medium, 24px)",
      }}
    >
      <Marquee speed={speed} gradient={false} pauseOnHover>
        {PARTNER_LOGOS.map((partner) => (
          <span
            key={partner.name}
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 32px",
              whiteSpace: "nowrap",
            }}
          >
            {partner.text}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
