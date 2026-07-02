"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import styles from "./CommandPalette.module.css";

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { id: "home", title: "Home", description: "School homepage", url: "/", category: "Pages" },
  {
    id: "about",
    title: "About Us",
    description: "Learn about our school",
    url: "/about",
    category: "Pages",
  },
  { id: "mission", title: "Mission & Vision", url: "/about/mission", category: "Pages" },
  { id: "history", title: "School History", url: "/about/history", category: "Pages" },
  { id: "staff", title: "Management & Staff", url: "/about/staff", category: "Pages" },
  {
    id: "academics",
    title: "Academics",
    description: "Academic programs",
    url: "/academics",
    category: "Pages",
  },
  { id: "departments", title: "Departments", url: "/academics/departments", category: "Pages" },
  {
    id: "admissions",
    title: "Admissions",
    description: "How to apply",
    url: "/admissions",
    category: "Pages",
  },
  { id: "apply", title: "Apply Now", url: "/admissions/apply", category: "Pages" },
  { id: "tuition", title: "Tuition & Fees", url: "/admissions/tuition", category: "Pages" },
  { id: "visit", title: "Schedule a Visit", url: "/admissions/visit", category: "Pages" },
  { id: "athletics", title: "Athletics", url: "/athletics", category: "Pages" },
  { id: "arts", title: "Arts", url: "/arts", category: "Pages" },
  { id: "student-life", title: "Student Life", url: "/student-life", category: "Pages" },
  { id: "clubs", title: "Clubs & Activities", url: "/student-life/clubs", category: "Pages" },
  { id: "news", title: "News & Events", url: "/news", category: "Pages" },
  { id: "gallery", title: "Photo Gallery", url: "/news/photo-gallery", category: "Pages" },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch",
    url: "/contact",
    category: "Pages",
  },
  {
    id: "how-to-help",
    title: "How to Help",
    description: "Support our school",
    url: "/how-to-help",
    category: "Pages",
  },
  { id: "alumni", title: "Alumni", url: "/alumni", category: "Pages" },
  {
    id: "strategic-plan",
    title: "Strategic Plan",
    url: "/about/strategic-plan",
    category: "Pages",
  },
  {
    id: "college-counseling",
    title: "College Counseling",
    url: "/academics/college-counseling",
    category: "Pages",
  },
  { id: "faqs", title: "FAQs", url: "/admissions/faqs", category: "Pages" },
];

/**
 * CommandPalette — keyboard-driven search overlay (⌘K / Ctrl+K).
 *
 * Uses cmdk for accessible, keyboard-navigable command menu.
 * Searches all site pages with fuzzy matching.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const filtered = search
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()),
      )
    : SEARCH_ITEMS;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={toggle}
        className={styles.trigger}
        aria-label="Search pages (⌘K)"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06l-3.04-3.04Z"
            fill="currentColor"
          />
        </svg>
        <span className={styles.triggerText}>Search...</span>
        <kbd className={styles.kbd}>⌘K</kbd>
      </button>

      {/* Dialog */}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Search pages"
          >
            <Command value={search} onValueChange={setSearch} loop>
              <div className={styles.inputWrapper}>
                <Command.Input placeholder="Search pages..." className={styles.input} autoFocus />
              </div>
              <Command.List className={styles.list}>
                <Command.Empty className={styles.empty}>No results found.</Command.Empty>
                {Object.entries(
                  filtered.reduce(
                    (acc, item) => {
                      (acc[item.category] ??= []).push(item);
                      return acc;
                    },
                    {} as Record<string, SearchItem[]>,
                  ),
                ).map(([category, items]) => (
                  <Command.Group key={category} heading={category} className={styles.group}>
                    {items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={item.title}
                        onSelect={() => {
                          router.push(item.url);
                          setOpen(false);
                        }}
                        className={styles.item}
                      >
                        <span className={styles.itemTitle}>{item.title}</span>
                        {item.description && (
                          <span className={styles.itemDescription}>{item.description}</span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
