"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, FileText, Loader2 } from "lucide-react";
import { renderHighlightedText } from "@/lib/safe-html";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import styles from "./SearchOverlay.module.css";

/** Custom event name used to open the search overlay from anywhere in the app. */
export const SEARCH_OVERLAY_OPEN_EVENT = "stelizabeths:search-open";

// Pagefind's public type surface (partial — only what we use)
type PagefindResultFragment = {
  url: string;
  meta: { title: string };
  excerpt: string;
};

type PagefindResult = {
  id: string;
  data: () => Promise<PagefindResultFragment>;
};

type PagefindAPI = {
  search: (q: string) => Promise<{ results: PagefindResult[] }>;
  options?: (opts: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    pagefind?: PagefindAPI;
    __PAGEFIND_SCRIPT_LOADED__?: boolean;
  }
}

interface SearchOverlayProps {
  /** Whether the overlay is open */
  open: boolean;
  /** Called when the user wants to close the overlay */
  onClose: () => void;
  /** Input placeholder */
  placeholder?: string;
  /** Maximum results to show */
  maxResults?: number;
}

interface ResultItem {
  id: string;
  title: string;
  url: string;
  excerpt: string;
}

/**
 * SearchOverlay — full-screen search dialog backed by Pagefind.
 * Triggered by ⌘K / Ctrl+K (handled by parent). Lazy-loads Pagefind
 * on first open to keep the homepage bundle small.
 */
export function SearchOverlay({
  open,
  onClose,
  placeholder = "Search the school website…",
  maxResults = 10,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagefindReady, setPagefindReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Lazy-load Pagefind on first open. Pagefind's index only exists in prod builds,
  // so this fails silently in dev.
  useEffect(() => {
    if (!open || pagefindReady) return;

    // In test environments (where window.pagefind is pre-set by the test),
    // skip the script injection — the global is already there.
    if (typeof window !== "undefined" && window.pagefind) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPagefindReady(true);
      return;
    }

    // Use script-tag injection — a real `import("/pagefind/pagefind.js")`
    // trips Vite's public-folder check, and Pagefind is a runtime artifact
    // that doesn't exist in dev/test. The script exposes a global on `window`.
    if (typeof document === "undefined") return;

    const existing = document.querySelector<HTMLScriptElement>("script[data-pagefind-loader]");
    if (existing) {
      existing.addEventListener("load", () => setPagefindReady(true), { once: true });
      existing.addEventListener(
        "error",
        () => {
          setPagefindReady(true);
          setError("Search index is being built. Please try again in a moment.");
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "/pagefind/pagefind.js";
    script.async = true;
    script.dataset.pagefindLoader = "true";
    script.onload = () => setPagefindReady(true);
    script.onerror = () => {
      setPagefindReady(true);
      setError("Search index is being built. Please try again in a moment.");
    };
    document.head.appendChild(script);
  }, [open, pagefindReady]);

  // Ref to track the previously focused element before opening the overlay,
  // so we can restore focus when it closes (WCAG 2.4.3).
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus input on open, reset state on close
  useEffect(() => {
    if (!open) {
      // Restore focus to the element that triggered the overlay
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
      return;
    }
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    // Defer to next tick so the dialog is in the DOM
    queueMicrotask(() => inputRef.current?.focus());
    // Reset state to defaults whenever the overlay opens.
    // The set-state-in-effect lint rule is bypassed here because this is a
    // legitimate effect: we synchronize internal state with the `open` prop change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery("");
    setResults([]);
    setError(null);
  }, [open]);

  // Run debounced search with stale-result cancellation.
  // The `cancelled` flag prevents a slower, in-flight search from
  // overwriting results after a faster, newer search has already resolved.
  useEffect(() => {
    if (!query.trim()) {
      // Defer to next microtask to avoid sync setState-in-effect
      queueMicrotask(() => setResults([]));
      return;
    }
    const pagefind = window.pagefind;
    if (!pagefind) {
      queueMicrotask(() => setResults([]));
      return;
    }

    let cancelled = false;
    queueMicrotask(() => setIsLoading(true));
    const handle = setTimeout(async () => {
      try {
        const response = await pagefind.search(query);
        if (cancelled) return;
        const fragments = await Promise.all(
          response.results.slice(0, maxResults).map(async (r) => {
            const data = await r.data();
            return {
              id: r.id,
              title: data.meta.title || "Untitled",
              url: data.url,
              excerpt: data.excerpt,
            } as ResultItem;
          }),
        );
        if (cancelled) return;
        setResults(fragments);
      } catch {
        if (cancelled) return;
        setError("Search failed. Please try again.");
        setResults([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, 150);

    return () => {
      clearTimeout(handle);
      cancelled = true;
    };
  }, [query, pagefindReady, maxResults]);

  // Keyboard handling: Esc to close, Enter to navigate to first result
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        router.push(results[0].url);
        onClose();
      }
    },
    [onClose, router, results],
  );

  // Focus trap — keeps keyboard navigation inside the overlay
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);

  // Lock body scroll with reference counting
  useEffect(() => {
    if (!open) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className={styles.dialog}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search query"
            autoComplete="off"
            spellCheck={false}
          />
          {isLoading && (
            <Loader2 size={18} className={styles.spinner} aria-label="Loading results" />
          )}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.body}>
          {!query.trim() && (
            <div className={styles.empty}>
              <p className={styles.hint}>
                Start typing to search. Press <kbd>Esc</kbd> to close, <kbd>Enter</kbd> to open the
                first result.
              </p>
              <div className={styles.suggestions}>
                <p className={styles.suggestionsTitle}>Try searching for:</p>
                <ul className={styles.suggestionsList}>
                  <li>
                    <button
                      type="button"
                      onClick={() => setQuery("admissions")}
                      className={styles.suggestionChip}
                    >
                      Admissions
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setQuery("curriculum")}
                      className={styles.suggestionChip}
                    >
                      Curriculum
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setQuery("sports")}
                      className={styles.suggestionChip}
                    >
                      Sports
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setQuery("news")}
                      className={styles.suggestionChip}
                    >
                      Latest News
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          {query.trim() && !error && results.length === 0 && !isLoading && (
            <div className={styles.empty}>
              <p className={styles.hint}>
                No results found for <strong>&ldquo;{query}&rdquo;</strong>.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul className={styles.results}>
              {results.map((r) => (
                <li key={r.id} className={styles.resultItem}>
                  <Link href={r.url} className={styles.resultLink} onClick={onClose}>
                    <FileText size={18} className={styles.resultIcon} aria-hidden="true" />
                    <div className={styles.resultContent}>
                      <div className={styles.resultTitle}>{renderHighlightedText(r.title)}</div>
                      <div className={styles.resultExcerpt}>{renderHighlightedText(r.excerpt)}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * useSearchOverlay — hook that returns { open, openOverlay, closeOverlay }.
 * Handles global ⌘K / Ctrl+K keyboard shortcut to open/close. Listens for the
 * custom event dispatched by the Header search button.
 */
export function useSearchOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(SEARCH_OVERLAY_OPEN_EVENT, onEvent as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(SEARCH_OVERLAY_OPEN_EVENT, onEvent as EventListener);
    };
  }, []);

  return {
    open,
    openOverlay: () => setOpen(true),
    closeOverlay: () => setOpen(false),
  };
}

/** Dispatch this from anywhere to open the global search overlay. */
export function openSearchOverlay(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SEARCH_OVERLAY_OPEN_EVENT));
  }
}
