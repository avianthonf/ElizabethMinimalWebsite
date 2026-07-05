"use client";

import { Toaster } from "sonner";

/**
 * Toast provider — wraps the app with sonner's Toaster.
 * Import in root layout for global toast support.
 *
 * Usage:
 *   import { toast } from "sonner";
 *   toast.success("Saved!");
 *   toast.error("Something went wrong");
 */
export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--s-color-surface, #fff)",
          color: "var(--s-color-text, #171717)",
          border: "1px solid var(--s-color-border, rgba(23,23,23,0.14))",
          borderRadius: "var(--card-radius, 12px)",
          fontSize: "0.875rem",
          fontFamily: "var(--font-sans)",
        },
      }}
      richColors
      closeButton
    />
  );
}
