#!/usr/bin/env node

/**
 * WCAG Contrast Checker for St. Elizabeth's High School Design System
 * 
 * Checks all color combinations for WCAG AA compliance.
 * WCAG AA requires:
 * - 4.5:1 for normal text (< 18px or < 14px bold)
 * - 3:1 for large text (≥ 18px or ≥ 14px bold)
 * - 3:1 for UI components and graphics
 */

// Color definitions from globals.css
const colors = {
  // Primitives
  'p-color-navy': '#1b2a4a',
  'p-color-navy-dark': '#0f1d35',
  'p-color-ink': '#1a1a1a',
  'p-color-muted': '#5a5f6b', // Updated for WCAG AA
  'p-color-paper': '#fafaf9',
  'p-color-soft': '#f4f1ed',
  'p-color-line': 'rgba(26, 26, 26, 0.1)',
  'p-color-deep-blue': '#2d4373',
  'p-color-deep-blue-light': '#e8edf5',
  'p-color-gold': '#c9a96e',
  'p-color-gold-text': '#655537', // Updated for WCAG AA
  'p-color-gold-hover': '#b8954f',
  'p-color-dark': '#1a1a2e',
  'p-color-gallery-bg': '#fafaf9',
};

// Common color combinations used in the design
const combinations = [
  // Text on backgrounds
  { fg: 'p-color-ink', bg: 'p-color-paper', usage: 'Body text on page background' },
  { fg: 'p-color-ink', bg: 'p-color-soft', usage: 'Text on alt background' },
  { fg: 'p-color-muted', bg: 'p-color-paper', usage: 'Muted text on page background' },
  { fg: 'p-color-muted', bg: 'p-color-soft', usage: 'Muted text on alt background' },
  { fg: 'p-color-navy', bg: 'p-color-paper', usage: 'Primary color text' },
  { fg: 'p-color-gold-text', bg: 'p-color-paper', usage: 'Accent text (updated for accessibility)' },
  { fg: 'p-color-ink', bg: 'p-color-gold', usage: 'Dark text on gold CTA' },
  { fg: '#ffffff', bg: 'p-color-navy', usage: 'White text on navy' },
  { fg: '#ffffff', bg: 'p-color-deep-blue', usage: 'White text on deep blue' },
  { fg: 'p-color-navy', bg: 'p-color-deep-blue-light', usage: 'Navy on light blue badge' },
  { fg: 'p-color-gold-text', bg: 'p-color-soft', usage: 'Gold eyebrow on alt bg (updated)' },
];

// Convert hex to RGB
function hexToRgb(hex) {
  // Handle rgba
  if (hex.startsWith('rgba')) {
    const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
  }
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 1
  } : null;
}

// Calculate relative luminance
function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function contrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Check WCAG compliance
function checkWCAG(ratio) {
  return {
    normalAA: ratio >= 4.5,
    largeAA: ratio >= 3.0,
    normalAAA: ratio >= 7.0,
    largeAAA: ratio >= 4.5,
  };
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('   WCAG CONTRAST CHECKER - St. Elizabeth\'s High School');
console.log('═══════════════════════════════════════════════════════════════\n');

let allPass = true;
let failures = [];

combinations.forEach(({ fg, bg, usage }) => {
  const fgColor = colors[fg] || fg;
  const bgColor = colors[bg] || bg;
  
  const ratio = contrastRatio(fgColor, bgColor);
  const wcag = checkWCAG(ratio);
  
  const status = wcag.normalAA ? '✓ PASS' : '✗ FAIL';
  const color = wcag.normalAA ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';
  
  console.log(`${color}${status}${reset} ${usage}`);
  console.log(`  Foreground: ${fg} (${fgColor})`);
  console.log(`  Background: ${bg} (${bgColor})`);
  console.log(`  Contrast: ${ratio.toFixed(2)}:1`);
  console.log(`  WCAG AA Normal Text: ${wcag.normalAA ? '✓' : '✗'} (needs 4.5:1)`);
  console.log(`  WCAG AA Large Text:  ${wcag.largeAA ? '✓' : '✗'} (needs 3.0:1)`);
  console.log('');
  
  if (!wcag.normalAA) {
    allPass = false;
    failures.push({ usage, ratio: ratio.toFixed(2), fg: fgColor, bg: bgColor });
  }
});

console.log('═══════════════════════════════════════════════════════════════');
if (allPass) {
  console.log('\x1b[32m✓ ALL CHECKS PASSED\x1b[0m - Design system is WCAG AA compliant!');
} else {
  console.log(`\x1b[31m✗ ${failures.length} FAILURES\x1b[0m - Action required:\n`);
  failures.forEach(f => {
    console.log(`  • ${f.usage}`);
    console.log(`    Ratio: ${f.ratio}:1 (needs 4.5:1)`);
    console.log(`    Consider: Darken foreground or lighten background`);
    console.log('');
  });
}
console.log('═══════════════════════════════════════════════════════════════\n');

process.exit(allPass ? 0 : 1);
