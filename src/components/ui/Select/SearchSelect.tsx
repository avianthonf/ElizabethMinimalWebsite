"use client";

import { useState } from "react";
import styles from "./SearchSelect.module.css";

interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}

/**
 * SearchSelect — searchable dropdown select.
 * Uses HTML select with search filter for better UX.
 *
 * Usage:
 *   <SearchSelect
 *     options={[
 *       { value: "math", label: "Mathematics" },
 *       { value: "science", label: "Science" },
 *     ]}
 *     onChange={setValue}
 *   />
 */
export function SearchSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  disabled,
  searchable = true,
  className,
}: SearchSelectProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = searchable
    ? options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.selectWrapper}>
        {searchable && (
          <input
            type="text"
            value={isOpen ? search : (selected?.label ?? "")}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              setIsOpen(true);
              setSearch("");
            }}
            placeholder={placeholder}
            disabled={disabled}
            className={`${styles.searchInput} ${error ? styles.inputError : ""}`}
          />
        )}

        {isOpen && (
          <div className={styles.dropdown}>
            {filtered.length === 0 ? (
              <div className={styles.noResults}>No results found</div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.option} ${opt.value === value ? styles.optionSelected : ""}`}
                  onClick={() => {
                    onChange?.(opt.value);
                    setSearch("");
                    setIsOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
