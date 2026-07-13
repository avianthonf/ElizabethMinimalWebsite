/**
 * Safe HTML rendering for Pagefind search results.
 *
 * Pagefind returns HTML strings with <mark> tags wrapping matched terms.
 * We can't trust the HTML as-is (any user-content in the future could
 * inject XSS), so we parse it and render only <mark> as a highlight;
 * everything else is rendered as text.
 */

import { Fragment, type ReactNode } from "react";

/**
 * Parse a Pagefind HTML excerpt/title and split it into React nodes,
 * converting <mark>...</mark> spans to <mark> elements. All other HTML
 * is stripped (rendered as text). The output is safe to render directly.
 *
 * Example input:  `Welcome to <mark>our</mark> <em>school</em>`
 * Example output: ["Welcome to ", <mark key>our</mark>, " school"]
 */
export function renderHighlightedText(html: string): ReactNode {
  if (!html) return "";

  // Match <mark>...</mark> spans (non-greedy, no nested).
  // We deliberately do not match any other tags.
  const parts: ReactNode[] = [];
  const regex = /<mark\b[^>]*>([\s\S]*?)<\/mark>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(html)) !== null) {
    // Append the text before the match (stripped of any other HTML)
    if (match.index > lastIndex) {
      const text = stripTags(html.slice(lastIndex, match.index));
      if (text) parts.push(text);
    }
    // Append the highlighted text (strip nested HTML inside <mark> too)
    const highlight = stripTags(match[1]!);
    parts.push(
      <mark key={`hl-${key++}`} className="pagefind-highlight">
        {highlight}
      </mark>,
    );
    lastIndex = regex.lastIndex;
  }

  // Append any remaining text after the last match
  if (lastIndex < html.length) {
    const text = stripTags(html.slice(lastIndex));
    if (text) parts.push(text);
  }

  return <Fragment>{parts}</Fragment>;
}

/** Strip all HTML tags from a string, returning plain text. */
function stripTags(html: string): string {
  return (
    html
      // Strip entire <script>...</script> and <style>...</style> blocks
      .replace(/<script\b[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[\s\S]*?<\/style>/gi, "")
      // Replace block-level tags with spaces so words don't run together
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|div|h[1-6]|li|tr|td)>/gi, " ")
      .replace(/<[^>]+>/g, "")
      // Decode the most common HTML entities Pagefind emits.
      // Entity decoding MUST come AFTER tag stripping because decoded
      // angle brackets (e.g., &lt; → <) would otherwise be consumed by
      // the tag regex above.  Output is consumed as React children, which
      // auto-escape < and >, so this is safe.
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
  );
}
