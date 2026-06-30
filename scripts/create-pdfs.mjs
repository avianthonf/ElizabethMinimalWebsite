#!/usr/bin/env node

/**
 * create-pdfs.mjs
 *
 * Generates PDF versions of every page at desktop (1440px) and mobile (390px)
 * viewports. The desktop homepage uses a flattened horizontal-scroll capture
 * to produce a single ultra-wide PDF. All inner pages use standard page.pdf().
 *
 * Usage:  node scripts/create-pdfs.mjs
 *
 * Requires: Playwright browsers installed (`npx playwright install chromium`)
 *           Next.js dev server running on port 3000 (auto-started if absent)
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { spawn, execSync } from "child_process";
import { createServer } from "net";

// ── Paths ──────────────────────────────────────────────────────────────

const PDF_DIR = "pdf";
const DESKTOP_DIR = "pdf/desktop";
const MOBILE_DIR = "pdf/mobile";
const BASE_URL = "http://localhost:3000";
const DEV_SERVER_PORT = 3000;

// ── Viewport config ────────────────────────────────────────────────────

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;
const MOBILE_WIDTH = 390;
const MOBILE_HEIGHT = 844;

// ── All pages (37 routes) ──────────────────────────────────────────────

const PAGES = [
  // Homepage
  { route: "/", name: "homepage" },

  // About
  { route: "/about", name: "about" },
  { route: "/about/mission", name: "about-mission" },
  { route: "/about/history", name: "about-history" },
  { route: "/about/staff", name: "about-staff" },
  { route: "/about/strategic-plan", name: "about-strategic-plan" },

  // Admissions
  { route: "/admissions", name: "admissions" },
  { route: "/admissions/apply", name: "admissions-apply" },
  { route: "/admissions/faqs", name: "admissions-faqs" },
  { route: "/admissions/tuition", name: "admissions-tuition" },
  { route: "/admissions/visit", name: "admissions-visit" },
  { route: "/admissions/why", name: "admissions-why" },

  // Academics
  { route: "/academics", name: "academics" },
  { route: "/academics/departments", name: "academics-departments" },
  { route: "/academics/languages", name: "academics-languages" },
  { route: "/academics/libraries", name: "academics-libraries" },
  { route: "/academics/college-counseling", name: "academics-college-counseling" },

  // Athletics
  { route: "/athletics", name: "athletics" },
  { route: "/athletics/teams", name: "athletics-teams" },

  // Arts
  { route: "/arts", name: "arts" },
  { route: "/arts/visual-arts", name: "arts-visual-arts" },
  { route: "/arts/performing-arts", name: "arts-performing-arts" },

  // Student Life
  { route: "/student-life", name: "student-life" },
  { route: "/student-life/clubs", name: "student-life-clubs" },

  // Alumni
  { route: "/alumni", name: "alumni" },

  // How to Help
  { route: "/how-to-help", name: "how-to-help" },
  { route: "/how-to-help/give", name: "how-to-help-give" },

  // News listing
  { route: "/news", name: "news" },

  // News articles (dynamic routes — slug-based)
  { route: "/news/annual-day-2024", name: "news-annual-day-2024" },
  { route: "/news/sports-meet-xxii", name: "news-sports-meet-xxii" },
  { route: "/news/feast-day-2024", name: "news-feast-day-2024" },
  { route: "/news/cbse-results-2024", name: "news-cbse-results-2024" },
  { route: "/news/science-exhibition-2024", name: "news-science-exhibition-2024" },
  { route: "/news/basketball-championship-2025", name: "news-basketball-championship-2025" },

  // Contact
  { route: "/contact", name: "contact" },
  { route: "/contact/thank-you", name: "contact-thank-you" },
  { route: "/contact/visit", name: "contact-visit" },
];

// ── Helpers ────────────────────────────────────────────────────────────

/** Check if a TCP port is in use */
function isPortFree(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
    server.listen(port, "127.0.0.1");
  });
}

/** Start the Next.js dev server and resolve when it's ready */
function startDevServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["next", "dev", "-p", String(DEV_SERVER_PORT)], {
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    const timeout = setTimeout(() => {
      reject(new Error("Dev server did not start within 60 seconds"));
    }, 60_000);

    proc.stdout.on("data", (data) => {
      const text = data.toString();
      process.stdout.write(text);
      if (text.includes("http://localhost") || text.includes("ready started server")) {
        clearTimeout(timeout);
        resolve(proc);
      }
    });

    proc.stderr.on("data", (data) => {
      process.stderr.write(data.toString());
    });

    proc.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Embed a JPEG screenshot into a proper PDF via Chromium's native page.pdf().
 *
 * We avoid hand-crafting PDFs (xref table offsets are brittle and error-prone).
 * Instead we inject the JPEG as a data: URI into a clean HTML page, let
 * Chromium render and paginate it via page.pdf(), which produces a structurally
 * valid PDF every time.
 */
async function pdfFromJpegViaPage(page, jpegBuffer, widthPx, heightPx, outputPath) {
  const base64 = jpegBuffer.toString("base64");
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @page { margin: 0; size: ${widthPx}px ${heightPx}px; }
    html, body { margin: 0; padding: 0; width: ${widthPx}px; height: ${heightPx}px; overflow: hidden; }
    img { display: block; width: ${widthPx}px; height: ${heightPx}px; object-fit: fill; }
  </style>
</head>
<body>
  <img src="data:image/jpeg;base64,${base64}" width="${widthPx}" height="${heightPx}" alt="Homepage">
</body>
</html>`;

  await page.setContent(html, { waitUntil: "load", timeout: 30_000 });
  await page.setViewportSize({ width: widthPx, height: heightPx });
  await page.waitForTimeout(500);

  // Use px units for page.pdf() — Chromium rejects decimal pt values
  await page.pdf({
    path: outputPath,
    width: `${widthPx}px`,
    height: `${heightPx}px`,
    printBackground: true,
    timeout: 60_000,
  });

  const stat = statSync(outputPath);
  console.log(`    PDF-from-JPEG — ${(stat.size / 1024).toFixed(1)} KB`);
}

// ── PDF Generation Functions ───────────────────────────────────────────

/**
 * Generate the desktop homepage PDF.
 *
 * The homepage uses a scroll-driven horizontal carousel where 8 panels
 * are laid out in a horizontal flex track, translated via window.scrollY.
 *
 * Strategy (two-pass):
 *   Pass 1 — Navigate at 1440px viewport, wait for LoadOverlay, flatten
 *            the carousel DOM, freeze every panel's width to its computed
 *            pixel value (so later viewport resize won't change vw-based panels).
 *   Pass 2 — Compute total content width, set viewport to that width,
 *            generate a single ultra-wide page.pdf() or screenshot fallback.
 */
async function generateDesktopHomepage(page) {
  const outputPath = join(DESKTOP_DIR, "homepage.pdf");
  console.log("  → Desktop homepage (horizontal scroll flattening)...");

  // ═══════════════════════════════════════════════════════════════════
  // Pass 1 — Render at design viewport, flatten, freeze widths
  // ═══════════════════════════════════════════════════════════════════

  await page.setViewportSize({ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });

  // Wait for LoadOverlay (4.5s desktop animation) to finish
  try {
    await page.waitForFunction(
      () => !document.querySelector('[aria-label="Homepage load overlay"]'),
      { timeout: 15_000 },
    );
    console.log("    LoadOverlay dismissed.");
  } catch {
    console.log("    (LoadOverlay timed out — forcing hide)");
  }

  // Let images + framer-motion settle
  await page.waitForTimeout(3000);
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});

  // Force-remove any remaining overlay, then flatten the carousel
  const flattenResult = await page.evaluate(() => {
    // Remove any lingering LoadOverlay
    const overlay = document.querySelector('[aria-label="Homepage load overlay"]');
    if (overlay) overlay.remove();

    // ── Flatten HorizontalScroll carousel ──
    const carousel = document.querySelector('[aria-roledescription="carousel"]');
    if (!carousel) return { ok: false, reason: "carousel not found" };

    // Flatten stage (the scroll spacer)
    carousel.style.position = "relative";
    carousel.style.height = "auto";

    // Find viewport (first <div> child, after the sr-only <span>)
    const viewport = carousel.querySelector(':scope > div');
    if (!viewport) return { ok: false, reason: "viewport not found" };

    // Un-sticky so it flows normally
    viewport.style.position = "relative";
    viewport.style.top = "auto";
    viewport.style.height = "auto";
    viewport.style.overflow = "visible";

    // Find track (first <div> inside viewport)
    const track = viewport.querySelector(':scope > div');
    if (!track) return { ok: false, reason: "track not found" };

    // Freeze track: kill transform, keep flex
    track.style.transform = "none";
    track.style.willChange = "auto";
    track.style.height = `${window.innerHeight}px`;

    // Freeze each panel's width to its current computed pixel width.
    // This prevents vw/clamp-based widths from changing when we resize
    // the viewport for PDF capture.
    const panelWidths = [];
    for (const child of track.children) {
      const rect = child.getBoundingClientRect();
      const w = Math.round(rect.width);
      panelWidths.push(w);
      child.style.width = `${w}px`;
      child.style.minWidth = "0";
      child.style.flex = "0 0 auto";
      child.style.height = `${window.innerHeight}px`;
    }

    // Hide scroll nav buttons
    for (const btn of viewport.querySelectorAll("button")) {
      btn.style.display = "none";
    }

    // Un-fix sticky header so it doesn't float
    const header = document.querySelector("header");
    if (header) {
      header.style.position = "relative";
    }

    // Make html/body wide enough
    document.documentElement.style.width = "max-content";
    document.documentElement.style.overflow = "visible";
    document.body.style.width = "max-content";
    document.body.style.overflow = "visible";

    const totalWidth = panelWidths.reduce((a, b) => a + b, 0);
    return {
      ok: true,
      totalWidth,
      panelCount: panelWidths.length,
      height: Math.round(window.innerHeight),
    };
  });

  if (!flattenResult.ok) {
    throw new Error(`Homepage flatten failed: ${flattenResult.reason}`);
  }

  console.log(
    `    ${flattenResult.panelCount} panels, total: ${flattenResult.totalWidth}px, height: ${flattenResult.height}px`,
  );

  const contentWidth = Math.min(flattenResult.totalWidth, 30000);
  const contentHeight = flattenResult.height;

  // ═══════════════════════════════════════════════════════════════════
  // Pass 2 — Wide viewport, capture
  // ═══════════════════════════════════════════════════════════════════

  await page.setViewportSize({
    width: Math.max(contentWidth, 100), // must be at least 1
    height: contentHeight,
  });
  await page.waitForTimeout(500);

  // Use JPEG screenshot → make Chromium render it as a proper PDF.
  // This avoids the hand-crafted PDF wrapper which had broken xref offsets
  // (causing Google Drive mobile to fail). Chromium's own PDF engine
  // produces structurally valid output every time.
  const screenshot = await page.screenshot({
    type: "jpeg",
    quality: 85,
    clip: { x: 0, y: 0, width: contentWidth, height: contentHeight },
  });

  await pdfFromJpegViaPage(page, screenshot, contentWidth, contentHeight, outputPath);

  return outputPath;
}

/**
 * Generate a standard page PDF (desktop inner pages or mobile pages).
 * Uses page.pdf() with content height measurement for full-page capture.
 */
async function generateStandardPdf(page, route, name, device) {
  const width = device === "desktop" ? DESKTOP_WIDTH : MOBILE_WIDTH;
  const height = device === "desktop" ? DESKTOP_HEIGHT : MOBILE_HEIGHT;
  const outputDir = device === "desktop" ? DESKTOP_DIR : MOBILE_DIR;
  const outputPath = join(outputDir, `${name}.pdf`);

  await page.setViewportSize({ width, height });

  // Mobile homepage uses framer-motion whileInView animations — panels
  // start invisible and only animate in on scroll. In headless Playwright
  // no scroll happens, so panels 2-7 stay at opacity:0 (white bars).
  // Emulating prefers-reduced-motion: reduce makes useReducedMotion()
  // return true, which sets initial="visible" on every motion section,
  // rendering all panels immediately visible for PDF capture.
  if (route === "/" && device === "mobile") {
    await page.emulateMedia({ reducedMotion: "reduce" });
  }

  // Navigate
  await page.goto(BASE_URL + route, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });

  // Wait for the page content to render and images to start loading
  await page.waitForTimeout(1000);

  // Wait for network idle (images, etc.)
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {
    // Some pages have streaming or long-polling — don't fail
  });

  // Extra settling time for framer-motion animations
  await page.waitForTimeout(500);

  // ── Ensure full page height is captured ──
  await page.evaluate(() => {
    document.documentElement.style.height = "auto";
    document.documentElement.style.overflow = "visible";
    document.body.style.height = "auto";
    document.body.style.overflow = "visible";
  });

  // Get full page height
  const pageHeight = await page.evaluate(() => {
    return Math.max(
      document.body.scrollHeight || 0,
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0,
      document.documentElement.offsetHeight || 0,
      document.documentElement.clientHeight || 0,
      800, // minimum fallback
    );
  });

  const finalHeight = Math.round(pageHeight);
  const finalWidth = Math.round(width);

  try {
    await page.pdf({
      path: outputPath,
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
      printBackground: true,
      timeout: 30_000,
    });
  } catch (pdfErr) {
    // Fallback: screenshot → Chromium PDF (same approach as desktop homepage)
    console.log(`    page.pdf() failed for ${route}: ${pdfErr.message}. Screenshot fallback.`);
    const screenshot = await page.screenshot({
      type: "jpeg",
      quality: 85,
      fullPage: true,
    });

    const vpSize = page.viewportSize();
    const imgHeight = Math.round(finalHeight);

    await pdfFromJpegViaPage(page, screenshot, vpSize.width, imgHeight, outputPath);
  }

  return outputPath;
}

// ── Verification ───────────────────────────────────────────────────────

function verifyPdf(filePath, label) {
  const exists = existsSync(filePath);
  if (!exists) {
    return { ok: false, reason: "file missing", path: filePath };
  }

  const buffer = readFileSync(filePath);
  const sizeKB = (buffer.length / 1024).toFixed(1);

  // Check PDF magic bytes
  const header = buffer.slice(0, 5).toString();
  if (header !== "%PDF-") {
    return { ok: false, reason: `not a PDF (header: ${header})`, path: filePath, sizeKB };
  }

  if (buffer.length < 500) {
    return { ok: false, reason: `too small (${sizeKB} KB)`, path: filePath, sizeKB };
  }

  return { ok: true, sizeKB, path: filePath };
}

function verifyHomepageDesktop(filePath) {
  const result = verifyPdf(filePath, "homepage-desktop");
  if (!result.ok) return result;

  const buffer = readFileSync(filePath);
  const sizeKB = parseFloat(result.sizeKB);

  // The desktop homepage should be wide — check that it's larger than
  // a typical single-page PDF
  if (sizeKB < 100) {
    return { ...result, ok: false, reason: `desktop homepage too small (${sizeKB} KB — expected >100 KB for image-heavy wide page)`, sizeKB };
  }

  // Quick structural check: does the PDF contain at least one page object?
  const content = buffer.toString("latin1");
  if (!content.includes("/Type /Page") && !content.includes("/Type/Page")) {
    return { ...result, ok: false, reason: "no page object found in PDF", sizeKB };
  }

  return { ...result, ok: true, note: `wide homepage — ${sizeKB} KB` };
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log("📄 St. Elizabeth's High School — PDF Generator");
  console.log("═══════════════════════════════════════════════\n");

  // ── Ensure output directories ──
  mkdirSync(PDF_DIR, { recursive: true });
  mkdirSync(DESKTOP_DIR, { recursive: true });
  mkdirSync(MOBILE_DIR, { recursive: true });

  // ── Ensure dev server is running ──
  let serverProc = null;

  const portFree = await isPortFree(DEV_SERVER_PORT);
  if (portFree) {
    console.log(`Starting Next.js dev server on port ${DEV_SERVER_PORT}...`);
    serverProc = await startDevServer();
    console.log("Dev server ready.\n");
  } else {
    console.log(`Dev server already running on port ${DEV_SERVER_PORT}.\n`);
  }

  // ── Launch Playwright browser ──
  console.log("Launching Chromium (headless)...");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
  });

  let failures = 0;

  try {
    const total = PAGES.length * 2;
    let completed = 0;

    for (const { route, name } of PAGES) {
      const page = await context.newPage();

      try {
        // ── Desktop ──
        const isHomepage = route === "/";
        if (isHomepage) {
          await generateDesktopHomepage(page);
        } else {
          await generateStandardPdf(page, route, name, "desktop");
        }
        completed++;
        console.log(
          `  [${completed}/${total}] ✓ ${name} (desktop)`,
        );
      } catch (err) {
        completed++;
        failures++;
        console.error(`  [${completed}/${total}] ✗ ${name} (desktop): ${err.message}`);
      }

      // Close and reopen a fresh page for mobile (clean state)
      await page.close();

      const page2 = await context.newPage();
      try {
        await generateStandardPdf(page2, route, name, "mobile");
        completed++;
        console.log(
          `  [${completed}/${total}] ✓ ${name} (mobile)`,
        );
      } catch (err) {
        completed++;
        failures++;
        console.error(`  [${completed}/${total}] ✗ ${name} (mobile): ${err.message}`);
      }

      await page2.close();
    }
  } finally {
    await context.close();
    await browser.close();
  }

  // ── Post-process with qpdf ────────────────────────────────────────
  // Chromium's page.pdf() output is valid but not linearized — missing
  // the "web-optimized" cross-reference tables that mobile PDF viewers
  // (including Google Drive on mobile) require. qpdf --linearize rebuilds
  // every PDF with proper streaming xref tables and fixes any Chromium
  // quirks in one pass.
  console.log("\n═══════════════════════════════════════════════");
  console.log("Post-processing with qpdf --linearize...\n");

  const allPdfPaths = [];
  for (const { name } of PAGES) {
    allPdfPaths.push(join(DESKTOP_DIR, `${name}.pdf`));
    allPdfPaths.push(join(MOBILE_DIR, `${name}.pdf`));
  }

  let qpdfFailures = 0;
  for (const pdfPath of allPdfPaths) {
    try {
      execSync(`qpdf --linearize --replace-input "${pdfPath}"`, {
        stdio: "pipe",
        timeout: 30_000,
      });
      process.stdout.write(".");
    } catch (e) {
      qpdfFailures++;
      // If linearize fails, try a simple rebuild (qpdf infile outfile)
      try {
        const tmp = pdfPath + ".tmp";
        execSync(`qpdf "${pdfPath}" "${tmp}"`, { stdio: "pipe", timeout: 30_000 });
        const buf = readFileSync(tmp);
        writeFileSync(pdfPath, buf);
        try { execSync(`rm "${tmp}"`); } catch {}
        // Then try linearize the rebuilt file
        execSync(`qpdf --linearize --replace-input "${pdfPath}"`, {
          stdio: "pipe",
          timeout: 30_000,
        });
        process.stdout.write("R");
        qpdfFailures--;
      } catch {
        process.stdout.write("F");
      }
    }
  }
  console.log(`\n\n  qpdf linearized ${allPdfPaths.length - qpdfFailures}/${allPdfPaths.length} PDFs`);
  if (qpdfFailures > 0) {
    console.log(`  ${qpdfFailures} files could not be linearized`);
  }

  // ── Verification ──
  console.log("\n═══════════════════════════════════════════════");
  console.log("Verifying generated PDFs...\n");

  const verificationResults = [];

  for (const { name } of PAGES) {
    // Desktop
    if (name === "homepage") {
      verificationResults.push(
        verifyHomepageDesktop(join(DESKTOP_DIR, `${name}.pdf`)),
      );
    } else {
      verificationResults.push(
        verifyPdf(join(DESKTOP_DIR, `${name}.pdf`), `${name}-desktop`),
      );
    }

    // Mobile
    verificationResults.push(
      verifyPdf(join(MOBILE_DIR, `${name}.pdf`), `${name}-mobile`),
    );
  }

  let verifyFailures = 0;
  for (const r of verificationResults) {
    if (r.ok) {
      console.log(`  ✓ ${r.path} — ${r.note || r.sizeKB + " KB"}`);
    } else {
      verifyFailures++;
      console.error(`  ✗ ${r.path}: ${r.reason}`);
    }
  }

  // ── Summary ──
  const totalPdfs = PAGES.length * 2;
  const generatedOk = totalPdfs - verifyFailures;

  console.log(`\n═══════════════════════════════════════════════`);
  console.log(`Summary:`);
  console.log(`  Total pages:      ${PAGES.length}`);
  console.log(`  Total PDFs:       ${totalPdfs}`);
  console.log(`  Generation errors: ${failures}`);
  console.log(`  Verified OK:       ${generatedOk}/${totalPdfs}`);
  console.log(`  Verification fails: ${verifyFailures}`);
  console.log(`═══════════════════════════════════════════════`);

  // Cleanup dev server
  if (serverProc) {
    serverProc.kill("SIGTERM");
  }

  process.exit(verifyFailures > 0 || failures > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
