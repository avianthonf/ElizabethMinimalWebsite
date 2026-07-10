# Sentry Error Monitoring Setup Guide

## Why Error Monitoring?

**Current problem:** Errors in production are logged to `console.error()`, which means:

- You don't know when errors happen until users report them
- No context about what the user was doing when it broke
- No stack traces, breadcrumbs, or environment info
- Cannot track error frequency or affected user count

**Sentry solves this by:**

- Capturing all errors automatically (client + server)
- Recording user sessions as video-like replays
- Providing full stack traces with source maps
- Tracking performance and slow operations
- Alerting you via email/Slack when critical errors occur

## Setup Instructions

### 1. Create a Sentry Account

1. Go to [sentry.io/signup](https://sentry.io/signup/)
2. Sign up (free tier includes 5,000 errors/month)
3. Create a new project:
   - Platform: **Next.js**
   - Alert frequency: **On every new issue**
   - Name: `st-elizabeths-website`

### 2. Get Your DSN

After project creation, copy your **DSN** (Data Source Name). It looks like:

```
https://abc123def456@o123456.ingest.sentry.io/7891011
```

This is **public** and safe to commit (it only allows sending data TO Sentry, not reading).

### 3. Install Sentry SDK

```bash
npm install @sentry/nextjs
```

**Already in package.json** - just run `npm install`.

### 4. Create Configuration Files

Create these files in your project root:

#### `sentry.client.config.ts`

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Disable in development to reduce noise
  enabled: process.env.NODE_ENV === "production",

  // Capture 10% of transactions for performance monitoring
  tracesSampleRate: 0.1,

  // Session Replay: 10% of sessions, 100% with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true, // Privacy: mask all text
      maskAllInputs: true, // Privacy: mask form inputs
      blockAllMedia: true, // Privacy: block images/video
    }),
  ],

  // Don't send sensitive data
  beforeSend(event) {
    // Filter out PII from breadcrumbs
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
        if (breadcrumb.data?.url) {
          // Remove query params that might contain emails/tokens
          breadcrumb.data.url = breadcrumb.data.url.split("?")[0];
        }
        return breadcrumb;
      });
    }
    return event;
  },
});
```

#### `sentry.server.config.ts`

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  enabled: process.env.NODE_ENV === "production",

  // Server-side performance monitoring
  tracesSampleRate: 0.1,

  // Don't send sensitive data
  beforeSend(event) {
    // Remove request bodies that might contain passwords
    if (event.request?.data) {
      delete event.request.data;
    }
    return event;
  },
});
```

#### `sentry.edge.config.ts`

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  enabled: process.env.NODE_ENV === "production",

  tracesSampleRate: 0.1,
});
```

#### `instrumentation.ts`

```typescript
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Capture errors from Server Components and middleware
export const onRequestError = Sentry.captureRequestError;
```

#### `app/global-error.tsx`

```tsx
"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
```

### 5. Update `next.config.ts`

Wrap your config with `withSentryConfig`:

```typescript
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // ... your existing config
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only log upload progress in CI
  silent: !process.env.CI,

  // Upload source maps for readable stack traces
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,

  // Tunnel through Next.js to bypass ad blockers
  tunnelRoute: "/monitoring",
});
```

### 6. Add Environment Variables

**Local (.env):**

```env
# Public DSN (safe to commit to .env.example)
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn-here@o123.ingest.sentry.io/456

# Private (for uploading source maps in CI/CD only)
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=st-elizabeths-website
SENTRY_AUTH_TOKEN=
```

**Vercel (Production):**

1. Go to project settings → Environment Variables
2. Add `NEXT_PUBLIC_SENTRY_DSN` (Production + Preview)
3. Add `SENTRY_AUTH_TOKEN` (Production only) - Get from [Sentry Settings → Auth Tokens](https://sentry.io/settings/account/api/auth-tokens/)

### 7. Instrument Server Actions

Wrap your contact form action:

```typescript
import * as Sentry from "@sentry/nextjs";

export async function submitInquiry(_prevState: FormState, formData: FormData): Promise<FormState> {
  return Sentry.withServerActionInstrumentation(
    "submitInquiry",
    {
      formData,
      recordResponse: true,
    },
    async () => {
      try {
        // ... existing logic
        return { success: true, message: "Sent!" };
      } catch (error) {
        Sentry.captureException(error, {
          tags: { action: "contact-form" },
          contexts: {
            form: {
              email: formData.get("email"),
              subject: formData.get("subject"),
            },
          },
        });

        return {
          success: false,
          message: "Something went wrong. Please try again.",
        };
      }
    },
  );
}
```

### 8. Test It Works

**Trigger a test error:**

Add this to any page:

```tsx
<button
  onClick={() => {
    throw new Error("Sentry Test Error");
  }}
>
  Break the world
</button>
```

Click it, then check [Issues](https://sentry.io/organizations/YOUR_ORG/issues/) in Sentry.

## What You'll See in Sentry

### Error Details

- Full stack trace with source maps
- User's browser, OS, screen size
- URL path where error occurred
- Time and frequency of occurrence

### Session Replay

- Video-like replay of user's session
- Mouse movements, clicks, scrolling
- Console logs and network requests
- Exactly what the user saw when it broke

### Performance Monitoring

- Page load times
- API response times
- Slow database queries
- Resource loading issues

### Breadcrumbs

- User actions leading up to error
- API calls made
- Navigation history
- Console logs

## Privacy & Security

### What Sentry Captures

✅ **Safe to capture:**

- Error messages and stack traces
- Page URLs (query params stripped)
- Browser/device info
- Performance metrics

❌ **Never captured:**

- Form input values (masked in replay)
- Passwords or tokens
- Request bodies with sensitive data
- Personal information from URLs

### PII Filtering

The `beforeSend` hooks in our config:

1. Strip query parameters from URLs
2. Remove request bodies from server errors
3. Mask all text in session replays

### GDPR Compliance

Sentry is GDPR compliant. Configure:

1. Data residency: Choose EU region in Sentry settings
2. Retention: Auto-delete events after 90 days (configurable)
3. User consent: Only enable Sentry after cookie consent if required

## Monitoring & Alerts

### Email Alerts

Sentry sends email when:

- New error type appears (first occurrence)
- Error spike detected (10x normal rate)
- Error threshold exceeded (>100 in 1 hour)

Configure in: Project Settings → Alerts

### Slack Integration

1. Go to Settings → Integrations → Slack
2. Install Slack app
3. Choose channel for alerts
4. Set rules (e.g., "Alert on all high-priority errors")

### Weekly Digest

Enable in: Settings → Notifications

- Get weekly summary of errors
- Track error trends over time
- See most affected users

## Cost Estimate

**Free tier includes:**

- 5,000 errors per month
- 500 replays per month
- 10,000 performance transactions per month
- Unlimited team members

**St. Elizabeth's estimate:**

- ~50 visitors/day = 1,500/month
- ~2% hit errors = 30 errors/month
- ~5% have replays = 75 replays/month

**Well within free tier.** Unlikely to need paid plan.

## Troubleshooting

### "Event dropped due to error in beforeSend"

**Cause:** `beforeSend` function threw an error

**Fix:** Add try-catch in beforeSend:

```typescript
beforeSend(event) {
  try {
    // ... filtering logic
    return event;
  } catch (error) {
    console.error('Sentry beforeSend error:', error);
    return event; // Return unmodified event
  }
}
```

### "Source maps not uploading"

**Cause:** `SENTRY_AUTH_TOKEN` not set or wrong permissions

**Fix:**

1. Create auth token at [sentry.io/settings/account/api/auth-tokens/](https://sentry.io/settings/account/api/auth-tokens/)
2. Enable these scopes: `project:read`, `project:releases`, `org:read`
3. Add to Vercel environment variables

### "Too many events, quota exceeded"

**Cause:** Error loop sending thousands of events

**Fix:** Add `ignoreErrors` to Sentry config:

```typescript
Sentry.init({
  dsn: "...",
  ignoreErrors: [
    // Browser extensions that inject errors
    "top.GLOBALS",
    "ResizeObserver loop limit exceeded",
    // Network errors we can't control
    "NetworkError",
    "Failed to fetch",
  ],
});
```

### "Session replays not appearing"

**Check:**

1. Is `replaysSessionSampleRate` too low? (Try 1.0 for testing)
2. Did you trigger an error? (100% of error sessions are captured)
3. Is `NODE_ENV` set to "production"?

## Next Steps

Once Sentry is working:

1. **Set up alerts** - Configure Slack/email notifications
2. **Create releases** - Track which deploy introduced bugs
3. **Add user context** - Identify affected users (when you add auth)
4. **Monitor performance** - Identify slow pages/API routes
5. **Review weekly** - Make it a habit to check Sentry every Monday

## References

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Session Replay Privacy](https://docs.sentry.io/platforms/javascript/guides/nextjs/session-replay/privacy/)
- [Sentry Best Practices](https://docs.sentry.io/product/best-practices/)
- [PII Filtering Guide](https://docs.sentry.io/platforms/javascript/data-management/sensitive-data/)
