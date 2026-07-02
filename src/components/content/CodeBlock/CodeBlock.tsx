"use client";

import { Highlight, themes } from "prism-react-renderer";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  /** Code content */
  code: string;
  /** Language (e.g., "javascript", "python", "html") */
  language: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** File title */
  title?: string;
}

/**
 * CodeBlock — syntax-highlighted code block.
 * Uses prism-react-renderer for zero-dependency highlighting.
 *
 * Usage:
 *   <CodeBlock code="const x = 1;" language="javascript" title="example.ts" />
 */
export function CodeBlock({ code, language, showLineNumbers = false, title }: CodeBlockProps) {
  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.language}>{language}</span>
        </div>
      )}
      <Highlight theme={themes.github} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${styles.pre} ${className}`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {showLineNumbers && <span className={styles.lineNumber}>{i + 1}</span>}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
