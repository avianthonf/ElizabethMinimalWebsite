/**
 * Rate limiting utilities for Server Actions.
 *
 * Uses Upstash Redis for shared state across serverless instances.
 * If Redis credentials are not configured, falls back to in-memory
 * (development-only) rate limiting with a warning.
 *
 * @see https://securestartkit.com/blog/how-to-rate-limit-nextjs-server-actions-before-they-get-abused
 * @see https://upstash.com/docs/oss/sdks/ts/ratelimit/overview
 */

/**
 * Rate limit result from both Upstash and in-memory implementations.
 */
export interface RateLimitResult {
  /** Whether the request is allowed (under limit) */
  success: boolean;
  /** Number of requests remaining in current window */
  remaining: number;
  /** Time until the limit resets (milliseconds) */
  reset?: number;
}

// ── Upstash Redis Rate Limiter (Production) ─────────────────────────────

type UpstashRatelimit = {
  limit: (key: string) => Promise<{
    success: boolean;
    remaining: number;
    reset: number;
  }>;
};

let upstashRatelimit: UpstashRatelimit | null = null;
let upstashInitialized = false;

async function getUpstashRatelimit() {
  if (upstashInitialized) return upstashRatelimit;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "[rate-limit] Upstash Redis credentials not configured. " +
          "Rate limiting is REQUIRED in production. " +
          "Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to .env",
      );
    }

    console.warn(
      "[rate-limit] Upstash Redis credentials not configured. Using in-memory fallback. " +
        "This is NOT production-safe on serverless (Vercel).",
    );
    upstashInitialized = true;
    upstashRatelimit = null;
    return null;
  }

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");

    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    // Sliding window algorithm prevents burst attacks at window boundaries
    // https://upstash.com/docs/oss/sdks/ts/ratelimit/algorithms
    upstashRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "rl",
    });

    upstashInitialized = true;
    return upstashRatelimit;
  } catch (error) {
    console.error("[rate-limit] Failed to initialize Upstash. Falling back to in-memory:", error);
    upstashInitialized = true;
    upstashRatelimit = null;
    return null;
  }
}

// ── In-Memory Rate Limiter (Development Fallback) ───────────────────────

/**
 * In-memory rate limiter for development and testing.
 *
 * ⚠️ WARNING: NOT production-safe on serverless platforms (Vercel).
 * Each serverless instance has its own Map, so concurrent requests
 * may bypass limits. The Map resets on cold start (~5 min on Vercel).
 *
 * Use Upstash Redis for production.
 */
const inMemoryStore = new Map<
  string,
  {
    count: number;
    resetTime: number;
  }
>();

function inMemoryRateLimit(key: string, limit: number, windowSeconds: number): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const current = inMemoryStore.get(key);

  if (!current || now > current.resetTime) {
    inMemoryStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      reset: windowMs,
    };
  }

  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
      reset: current.resetTime - now,
    };
  }

  current.count++;
  return {
    success: true,
    remaining: limit - current.count,
    reset: current.resetTime - now,
  };
}

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Rate limit a request by identifier.
 *
 * Uses Upstash Redis if configured, otherwise falls back to in-memory
 * (development-only) rate limiting.
 *
 * @param key - Unique identifier for rate limiting (e.g., `login:${ip}`, `checkout:${userId}`)
 * @param limit - Maximum requests allowed in the window (default: 10)
 * @param windowSeconds - Time window in seconds (default: 60)
 *
 * @example
 * ```ts
 * // Rate limit by IP for public endpoints
 * const ip = headers().get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
 * const { success } = await rateLimit(`login:${ip}`, 5, 60);
 * if (!success) {
 *   return { error: 'Too many attempts. Try again later.' };
 * }
 * ```
 *
 * @example
 * ```ts
 * // Rate limit by user ID for authenticated endpoints
 * const user = await getUser();
 * const { success } = await rateLimit(`checkout:${user.id}`, 10, 60);
 * if (!success) {
 *   return { error: 'Too many checkout attempts.' };
 * }
 * ```
 */
export async function rateLimit(
  key: string,
  limit = 10,
  windowSeconds = 60,
): Promise<RateLimitResult> {
  const upstash = await getUpstashRatelimit();

  if (upstash) {
    // Production: Use Upstash Redis with sliding window
    const result = await upstash.limit(key);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  // Development: Use in-memory fallback
  return inMemoryRateLimit(key, limit, windowSeconds);
}

/**
 * Get the client's IP address from Next.js headers.
 *
 * Extracts the first IP from the x-forwarded-for header, which Vercel
 * sets on every request. Falls back to 127.0.0.1 for local development.
 *
 * @example
 * ```ts
 * import { headers } from 'next/headers';
 * const ip = getClientIP(await headers());
 * const { success } = await rateLimit(`action:${ip}`, 5, 60);
 * ```
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (!forwarded) return "127.0.0.1";

  // x-forwarded-for can be a comma-separated list: "client, proxy1, proxy2"
  // We want the originating client IP, not intermediate proxies
  return forwarded.split(",")[0]!.trim();
}
