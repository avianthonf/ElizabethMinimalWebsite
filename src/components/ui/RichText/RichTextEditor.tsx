"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./RichTextEditor.module.css";

interface RichTextEditorProps {
  /** Initial content */
  value?: string;
  /** Content change handler */
  onChange?: (value: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Label */
  label?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Minimum height */
  minHeight?: number;
  className?: string;
}

/**
 * RichTextEditor — simple rich text editor with toolbar.
 * Uses contentEditable with execCommand for formatting.
 *
 * Usage:
 *   <RichTextEditor value={content} onChange={setContent} />
 */
export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  label,
  error,
  disabled,
  minHeight = 200,
  className,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange?.(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.toolbar}>
        <button type="button" onClick={() => execCommand("bold")} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => execCommand("italic")} title="Italic">
          <em>I</em>
        </button>
        <button type="button" onClick={() => execCommand("underline")} title="Underline">
          <u>U</u>
        </button>
        <span className={styles.divider} />
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
        >
          1. List
        </button>
        <span className={styles.divider} />
        <button type="button" onClick={() => execCommand("formatBlock", "<h2>")} title="Heading">
          H2
        </button>
        <button type="button" onClick={() => execCommand("formatBlock", "<h3>")} title="Subheading">
          H3
        </button>
        <button type="button" onClick={() => execCommand("formatBlock", "<p>")} title="Paragraph">
          ¶
        </button>
      </div>

      <div
        ref={editorRef}
        className={`${styles.editor} ${isFocused ? styles.editorFocused : ""} ${error ? styles.editorError : ""}`}
        contentEditable={!disabled}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
        style={{ minHeight }}
        suppressContentEditableWarning
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
