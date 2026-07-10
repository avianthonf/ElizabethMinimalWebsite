# Upstash Redis Setup Guide

## Why Upstash Redis?

The contact form uses rate limiting to prevent abuse. In development, an in-memory Map is sufficient. **In production on serverless platforms (Vercel, AWS Lambda), in-memory rate limiting doesn't work** because:

1. **Each serverless instance has its own memory** - Your limit of "3 requests per hour" becomes "3 requests per hour per instance"
2. **Cold starts reset the counter** - Vercel aggressively cold-starts functions, giving attackers unlimited attempts
3. **Concurrent requests bypass limits** - Multiple instances can process requests simultaneously without sharing state

Upstash Redis solves this by providing **shared state across all serverless instances** using HTTP-based Redis.

## Setup Instructions

### 1. Create an Upstash Account

Visit [console.upstash.com](https://console.upstash.com/) and sign up (free tier available).

### 2. Create a Redis Database

1. Click "Create Database"
2. Name it something like `st-elizabeths-prod`
3. Select the region closest to your Vercel deployment (e.g., US East for `iad1.vercel-dns.com`)
4. Choose the **Global** type for multi-region support (optional but recommended)
5. Click "Create"

### 3. Get Your Credentials

After creation, you'll see two values:

- `UPSTASH_REDIS_REST_URL` - The HTTP endpoint for your database
- `UPSTASH_REDIS_REST_TOKEN` - Your authentication token

### 4. Add to Environment Variables

**Local development (.env):**

```env
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

**Vercel (Production):**

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add both variables with type "Production"
4. Redeploy your application

### 5. Install Dependencies

The rate limiting library has optional peer dependencies:

```bash
npm install @upstash/ratelimit @upstash/redis
```

**These are already in `package.json`** - just run `npm install`.

### 6. Verify It Works

Deploy your changes to Vercel and test the contact form:

1. Submit 3 valid inquiries from the same IP within an hour
2. The 4th attempt should be blocked with: "Too many submissions. Please wait an hour and try again."

**To verify Redis is being used (not in-memory):**

Check your Vercel deployment logs. You should **NOT** see:

```
[rate-limit] Upstash Redis credentials not configured. Using in-memory fallback.
```

If you see that warning, your environment variables aren't set correctly.

## How It Works

### Rate Limiting by IP Address

```typescript
import { headers } from "next/headers";
import { rateLimit, getClientIP } from "@/shared/lib/rate-limit";

const headersList = await headers();
const ip = getClientIP(headersList);

// 3 requests per hour (3600 seconds) per IP
const { success } = await rateLimit(`contact:${ip}`, 3, 3600);

if (!success) {
  return { error: "Too many submissions. Try again later." };
}
```

### Current Rate Limits

| Action       | Limit      | Window | Identifier |
| ------------ | ---------- | ------ | ---------- |
| Contact form | 3 requests | 1 hour | IP address |

### Future Extensions

When you add authentication (login, signup), use these patterns:

```typescript
// Login - rate limit by IP (public endpoint)
const { success } = await rateLimit(`login:${ip}`, 5, 60);

// Checkout - rate limit by user ID (authenticated)
const { success } = await rateLimit(`checkout:${user.id}`, 10, 60);
```

## Monitoring

### Upstash Dashboard

Visit your Upstash dashboard to monitor:

- **Request count** - How many rate limit checks per day
- **Active keys** - How many unique IPs/users are being tracked
- **Hit rate** - Percentage of requests served from cache

### Cost Estimate

**Free tier limits:**

- 10,000 commands per day
- 256 MB storage

**St. Elizabeth's traffic estimate:**

- ~50 visitors/day × 3 actions/visitor = 150 rate limit checks/day
- Well within free tier

Upstash's pricing is pay-as-you-go after free tier. Even high-traffic sites stay under $5/month.

## Fallback Behavior

If Redis is unavailable (credentials not set, network issue, service down):

1. The app logs a warning
2. Falls back to in-memory rate limiting
3. **Contact form still works** - No user-facing errors
4. Rate limiting is weaker (per-instance instead of global) but still present

This graceful degradation means **you can deploy without Redis** and add it later when traffic grows.

## Security Notes

### Why IP-based Rate Limiting?

The contact form is **public** (pre-authentication), so IP is the only stable identifier. Alternatives considered:

- ❌ **Email address** - Attacker can rotate emails
- ❌ **Session cookie** - Attacker can clear cookies
- ✅ **IP address** - Harder to rotate, especially for scripted bots

### IPv6 and VPN Concerns

**Concern:** Users behind VPNs or large NAT gateways share an IP.

**Mitigation:** The limit is generous (3 requests/hour). Legitimate users from the same office/school won't hit it unless they're submitting multiple forms simultaneously, which is unusual for a contact form.

### Combined Defenses

Rate limiting is **one layer** of defense. The contact form also has:

1. **Honeypot field** - Catches bots that auto-fill forms
2. **Timing check** - Rejects submissions faster than humans can type (< 3 seconds)
3. **Rate limiting** - Prevents brute force and spam
4. **Zod validation** - Ensures data structure is valid
5. **Resend email sending** - Deliverability and spam protection

Attackers must bypass **all five layers** to succeed.

## Troubleshooting

### "Using in-memory fallback" warning in production

**Cause:** Environment variables not set in Vercel.

**Fix:**

1. Go to Vercel project → Settings → Environment Variables
2. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
3. Select "Production" environment
4. Redeploy

### Rate limit not working across multiple requests

**Check:**

1. Are you testing from the same IP? (Use `curl` with a fixed IP)
2. Are you testing in production? (Development uses localhost IP)
3. Is Redis configured? (Check for fallback warning in logs)

### Redis connection errors

**Upstash uses HTTP, not TCP**, so connection issues are rare. If you see errors:

1. Verify credentials are correct (copy-paste from Upstash dashboard)
2. Check Upstash status page: [status.upstash.com](https://status.upstash.com/)
3. Review Vercel deployment logs for specific error messages

## References

- [Upstash Redis Documentation](https://upstash.com/docs/redis)
- [Upstash Ratelimit SDK](https://upstash.com/docs/oss/sdks/ts/ratelimit/overview)
- [SecureStartKit Guide](https://securestartkit.com/blog/how-to-rate-limit-nextjs-server-actions-before-they-get-abused)
- [Next.js Server Actions Security](https://nextjs.org/blog/security-nextjs-server-components-actions)
