"use client";

import { HexColorPicker } from "react-colorful";
import styles from "./ColorPicker.module.css";

interface ColorPickerProps {
  color: string;
  onChange?: (color: string) => void;
  label?: string;
  showInput?: boolean;
  presets?: string[];
  className?: string;
}

/**
 * ColorPicker — hex color picker with presets.
 * Uses react-colorful for the color wheel.
 *
 * Usage:
 *   <ColorPicker
 *     color={selectedColor}
 *     onChange={setSelectedColor}
 *     presets={["#0c217c", "#c9a84c", "#ffffff"]}
 *   />
 */
export function ColorPicker({
  color,
  onChange,
  label,
  showInput = true,
  presets = [],
  className,
}: ColorPickerProps) {
  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.picker}>
        <HexColorPicker color={color} onChange={onChange} />
      </div>

      {showInput && (
        <div className={styles.inputRow}>
          <span className={styles.hash}>#</span>
          <input
            type="text"
            value={color.replace("#", "")}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
              onChange?.(`#${val}`);
            }}
            maxLength={6}
            className={styles.input}
          />
          <div className={styles.swatch} style={{ background: color }} />
        </div>
      )}

      {presets.length > 0 && (
        <div className={styles.presets}>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`${styles.preset} ${color === preset ? styles.presetActive : ""}`}
              style={{ background: preset }}
              onClick={() => onChange?.(preset)}
              aria-label={`Select ${preset}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
