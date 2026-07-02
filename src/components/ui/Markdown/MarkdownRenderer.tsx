"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  /** Markdown content */
  content: string;
  /** Additional className */
  className?: string;
}

/**
 * MarkdownRenderer — renders markdown with GFM support.
 * Uses react-markdown + remark-gfm + rehype-raw.
 *
 * Usage:
 *   <MarkdownRenderer content="# Hello\n\n**Bold** text" />
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const plugins = useMemo(() => [remarkGfm], []);
  const rehypePlugins = useMemo(() => [rehypeRaw], []);

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={plugins} rehypePlugins={rehypePlugins}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
