"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  /** Toast message after copy */
  copiedMessage?: string;
}

/**
 * CopyButton — copies text to clipboard with visual feedback.
 * Uses navigator.clipboard API + lucide-react icon.
 *
 * Usage:
 *   <CopyButton text="Hello World" label="Copy greeting" />
 */
export function CopyButton({
  text,
  label = "Copy",
  className,
  copiedMessage = "Copied!",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      type="button"
      aria-label={copied ? copiedMessage : label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.375rem 0.75rem",
        border: "1px solid var(--s-color-border, rgba(23,23,23,0.14))",
        borderRadius: 8,
        background: copied ? "#059669" : "var(--s-color-surface, #fff)",
        color: copied ? "#fff" : "var(--s-color-text, #171717)",
        fontSize: "0.8125rem",
        cursor: "pointer",
        transition: "all 150ms ease",
      }}
    >
      <Copy size={14} />
      {copied ? copiedMessage : label}
    </button>
  );
}
