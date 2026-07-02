"use client";

import QRCode from "react-qr-code";

interface QRCodeDisplayProps {
  /** URL or text to encode */
  value: string;
  /** QR code size in pixels */
  size?: number;
  /** Background color */
  bgColor?: string;
  /** Foreground color */
  fgColor?: string;
  /** Optional label below QR code */
  label?: string;
  className?: string;
}

/**
 * QRCodeDisplay — generates a QR code for URLs/text.
 * Uses react-qr-code for rendering.
 *
 * Usage:
 *   <QRCodeDisplay value="https://stelizabeths.edu.in" label="Scan to visit" />
 */
export function QRCodeDisplay({
  value,
  size = 128,
  bgColor = "#ffffff",
  fgColor = "#0c217c",
  label,
  className,
}: QRCodeDisplayProps) {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          padding: 8,
          background: bgColor,
          borderRadius: 8,
          border: "1px solid var(--s-color-border, rgba(23,23,23,0.14))",
        }}
      >
        <QRCode value={value} size={size} bgColor={bgColor} fgColor={fgColor} level="M" />
      </div>
      {label && (
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--s-color-text-muted, #5f5f5f)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
