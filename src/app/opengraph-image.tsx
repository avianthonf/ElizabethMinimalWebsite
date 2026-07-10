import { ImageResponse } from "next/og";
import { SCHOOL_CONFIG } from "@/shared/config";

// Image metadata
export const alt = "St. Elizabeth's High School";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Font loading will be handled by ImageResponse
export const runtime = "edge";

/**
 * Default Open Graph image for the homepage
 * Features: School name, tagline, and established year
 */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1B2A4A", // Navy blue from brand
        backgroundImage: "linear-gradient(135deg, #1B2A4A 0%, #2E5090 100%)",
      }}
    >
      {/* School Logo/Emblem Circle */}
      <div
        style={{
          display: "flex",
          width: "120px",
          height: "120px",
          borderRadius: "60px",
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          border: "4px solid #D4AF37",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#1B2A4A",
          }}
        >
          SE
        </div>
      </div>

      {/* School Name */}
      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: "16px",
          padding: "0 60px",
        }}
      >
        {SCHOOL_CONFIG.NAME}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: "32px",
          color: "#D4AF37", // Gold
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Truth and Honesty
      </div>

      {/* Location & Year */}
      <div
        style={{
          fontSize: "24px",
          color: "rgba(255, 255, 255, 0.8)",
          textAlign: "center",
        }}
      >
        Pomburpa, Goa • Est. {SCHOOL_CONFIG.FOUNDED_YEAR}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
