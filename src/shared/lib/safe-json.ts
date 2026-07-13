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
 * inside a <script> tag in HTML.
 *
 * **Only the "</" sequence matters.**  When the browser's HTML parser
 * sees `</script>` (case-insensitive) inside a script block, it closes
 * the tag — even inside a string literal.  This is the canonical XSS
 * vector for JSON-LD and inline state injection.
 *
 * Escaping `<` to `\u003c` prevents the sequence `</` from appearing
 * anywhere in the output (the `/` cannot be preceded by `<`).  Escaping
 * ALL `<` characters is required because JSON may reorder properties
 * or split the sequence across whitespace via JSON.stringify internals.
 *
 * `>` is NOT escaped — only `</` triggers script tag termination; `>`
 * alone inside a string is harmless.
 *
 * Reference: https://pragmaticwebsecurity.com/articles/spasecurity/json-stringify-xss
 *           OWASP: https://cheatsheetseries.owasp.org/cheatsheets/XSS_Prevention_Cheat_Sheet.html
 */
export function safeJsonStringify(value: unknown, space?: number): string {
  return JSON.stringify(value, null, space).replace(/</g, "\\u003c");
}
