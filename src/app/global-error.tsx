"use client";

import { useEffect } from "react";

/**
 * Root-level error boundary (Next.js 16 convention).
 *
 * Replaces the root layout when it fires — must include <html> and <body> tags.
 * Cannot access context providers (i18n, theme, auth) that live in layout.tsx.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs
 */

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log to your error tracking service
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong — St. Elizabeth&apos;s High School</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
              html, body { height: 100%; }
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                background: #fafaf9;
                color: #1a1a1a;
                padding: 24px;
              }
              .wrapper {
                text-align: center;
                max-width: 480px;
              }
              .code {
                font-size: 72px;
                font-weight: 700;
                color: #1b2a4a;
                line-height: 1;
                margin-bottom: 12px;
              }
              .heading {
                font-size: 24px;
                color: #1a1a1a;
                margin-bottom: 12px;
              }
              .description {
                color: #5a5f6b;
                margin-bottom: 24px;
                line-height: 1.6;
              }
              .retry {
                display: inline-block;
                padding: 10px 20px;
                background: #1b2a4a;
                color: #fafaf9;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
              }
              .retry:hover {
                opacity: 0.9;
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="wrapper">
          <p className="code">500</p>
          <h1 className="heading">Something Went Wrong</h1>
          <p className="description">
            We&apos;re sorry — an unexpected error occurred. Our team has been notified. Please try
            again or return to the homepage.
          </p>
          <button type="button" className="retry" onClick={reset}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
