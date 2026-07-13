/**
 * Production-grade Server Action result types.
 *
 * Every Server Action returns ActionResult<T>, never throws.
 * Thrown errors become unhandled RSC payload rejections;
 * returned errors render gracefully in the client.
 *
 * Pattern (July 2026 consensus: Viprasol, 72Tech, deepak.cnippet):
 *   - ok(data)     → { success: true,  data: T }
 *   - err(msg)     → { success: false, error: string }
 *   - err(msg, {}) → { success: false, error, fieldErrors }
 *
 * Zod integration:
 *   const parsed = schema.safeParse(input);
 *   if (!parsed.success) {
 *     return err("Validation failed", parsed.error.flatten().fieldErrors);
 *   }
 */

export type ActionResult<T = void> =
  | { readonly success: true; readonly data: T }
  | {
      readonly success: false;
      readonly error: string;
      readonly fieldErrors?: Record<string, string[]>;
    };

/** Wraps a successful result. */
export function ok(): ActionResult<void>;
export function ok<T>(data: T): ActionResult<T>;
export function ok<T>(data?: T): ActionResult<T | void> {
  return { success: true, data: data as T };
}

/** Wraps an error result. Optionally includes field-level Zod errors. */
export function err(error: string, fieldErrors?: Record<string, string[]>): ActionResult<never> {
  return { success: false, error, ...(fieldErrors && { fieldErrors }) };
}

/**
 * Maps a ZodError to field-level error messages.
 *
 * Usage:
 *   const parsed = CreateSchema.safeParse(input);
 *   if (!parsed.success) {
 *     return err("Validation failed", zodFieldErrors(parsed.error));
 *   }
 */
export function zodFieldErrors(error: import("zod").ZodError): Record<string, string[]> {
  return error.flatten().fieldErrors as Record<string, string[]>;
}

/**
 * Type guard: true if the result is a success.
 * Narrows the type to include `data`.
 */
export function isOk<T>(
  result: ActionResult<T>,
): result is { readonly success: true; readonly data: T } {
  return result.success === true;
}

/**
 * Type guard: true if the result is an error.
 * Narrows the type to include `error` and optional `fieldErrors`.
 */
export function isErr(result: ActionResult<unknown>): result is {
  readonly success: false;
  readonly error: string;
  readonly fieldErrors?: Record<string, string[]>;
} {
  return result.success === false;
}
