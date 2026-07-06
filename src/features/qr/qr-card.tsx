"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCardProps {
  /** The value / URL encoded in the QR code */
  value: string;
  /** Accessible label for screen readers */
  label: string;
  /** Size in pixels */
  size?: number;
  /** Foreground color (hex) */
  fgColor?: string;
  /** Background color (hex) */
  bgColor?: string;
}

/**
 * QRCard — renders a QR code in school-branded colors with a label.
 *
 * School navy (#1B2A4A) foreground on warm white (#FFFAF0) background.
 * Accessible: includes a title attribute on the SVG for screen readers.
 *
 * @example
 * <QRCard
 *   value="https://maps.google.com/?q=15.5449,73.9723"
 *   label="Scan for directions"
 * />
 */
export function QRCard({
  value,
  label,
  size = 160,
  fgColor = "#1B2A4A",
  bgColor = "#FFFAF0",
}: QRCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-xsmall, 8px)",
        padding: "var(--space-small, 16px)",
        background: bgColor,
        borderRadius: "8px",
        border: "1px solid var(--color-accent-gold, #c9a96e)",
        maxWidth: size + 40,
      }}
    >
      <QRCodeSVG
        value={value}
        size={size}
        level="M"
        fgColor={fgColor}
        bgColor={bgColor}
        title={label}
        marginSize={4}
      />
      <span
        style={{
          fontSize: "0.75rem",
          color: "var(--color-text-muted, #555)",
          fontFamily: "var(--font-sans)",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}
