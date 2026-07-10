import { ImageResponse } from "next/og";
import { SCHOOL_CONFIG } from "@/shared/config";

export const alt = "Contact St. Elizabeth's High School";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const runtime = "edge";

/**
 * Open Graph image for Contact section
 */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#1B2A4A",
        backgroundImage: "linear-gradient(135deg, #2E5090 0%, #1B2A4A 100%)",
        padding: "80px",
      }}
    >
      {/* Section Label */}
      <div
        style={{
          fontSize: "32px",
          color: "#D4AF37",
          marginBottom: "16px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Contact Us
      </div>

      {/* Page Title */}
      <div
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: "24px",
          maxWidth: "900px",
        }}
      >
        Get in Touch
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "32px",
          color: "rgba(255, 255, 255, 0.8)",
          marginBottom: "32px",
          maxWidth: "800px",
        }}
      >
        We&apos;re here to answer your questions
      </div>

      {/* School Name & Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60px",
            height: "60px",
            borderRadius: "30px",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #D4AF37",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1B2A4A",
            }}
          >
            SE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            {SCHOOL_CONFIG.NAME}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Pomburpa, Goa
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
