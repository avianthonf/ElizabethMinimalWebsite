/**
 * Safe JSON serialization for embedding in HTML <script> tags.
 *
 * JSON.stringify() does NOT escape the "</script>" sequence. If JSON data
 * containing "</script>" is embedded inside a <script> tag (e.g., JSON-LD
 * structured data), the browser's HTML parser prematurely closes the script
 * tag and treats the remainder as HTML — an XSS vector.
 *
 * This is the same vulnerability that affected Redux's SSR documentation,
 * Angular's Scully static site generator, and countless other frameworks.
 *
 * Reference: https://pragmaticwebsecurity.com/articles/spasecurity/json-stringify-xss
 *           OWASP: https://cheatsheetseries.owasp.org/cheatsheets/XSS_Prevention_Cheat_Sheet.html
 */

/**
 * Serializes a JavaScript value to a JSON string that is safe to embed
 * inside a <script> tag in HTML. Escapes "</" → "<\/" to prevent the
 * browser's HTML parser from prematurely closing the script tag.
 *
 * Also escapes "]]>" for the (exceedingly rare) case of embedding JSON
 * inside a CDATA section within XHTML.
 */
export function safeJsonStringify(value: unknown, space?: number): string {
  return JSON.stringify(value, null, space).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}
