#!/usr/bin/env node
/**
 * Generate static assets from the school logo.
 *
 * Creates:
 * - public/favicon.ico (16x16, 32x32, 48x48 multi-resolution)
 * - public/og-default.jpg (1200x630 Open Graph image)
 *
 * Usage: node scripts/generate-assets.mjs
 * Requires: npm install --save-dev sharp
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const PUBLIC = join(ROOT, "public");

async function generateFavicon() {
  const sharp = (await import("sharp")).default;
  const logoPath = join(PUBLIC, "logo.png");
  const logoBuffer = readFileSync(logoPath);

  // Create multi-resolution ICO (16, 32, 48)
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(logoBuffer)
        .resize(size, size, { fit: "contain", background: { r: 12, g: 33, b: 124, alpha: 1 } })
        .png()
        .toBuffer()
    )
  );

  // ICO format: header + directory entries + PNG data
  const numImages = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: ICO
  header.writeUInt16LE(numImages, 4); // Number of images

  let dataOffset = 6 + numImages * 16; // Header + directory entries
  const directory = Buffer.alloc(numImages * 16);

  pngBuffers.forEach((png, i) => {
    const size = sizes[i];
    const offset = i * 16;
    directory.writeUInt8(size === 256 ? 0 : size, offset); // Width (0 = 256)
    directory.writeUInt8(size === 256 ? 0 : size, offset + 1); // Height
    directory.writeUInt8(0, offset + 2); // Color palette
    directory.writeUInt8(0, offset + 3); // Reserved
    directory.writeUInt16LE(1, offset + 4); // Color planes
    directory.writeUInt16LE(32, offset + 6); // Bits per pixel
    directory.writeUInt32LE(png.length, offset + 8); // Image size
    directory.writeUInt32LE(dataOffset, offset + 12); // Image offset
    dataOffset += png.length;
  });

  const ico = Buffer.concat([header, directory, ...pngBuffers]);
  writeFileSync(join(PUBLIC, "favicon.ico"), ico);
  console.log(`✅ favicon.ico generated (${ico.length} bytes, ${sizes.join("x")} multi-resolution)`);
}

async function generateOGImage() {
  const sharp = (await import("sharp")).default;
  const logoPath = join(PUBLIC, "logo.png");
  const logoBuffer = readFileSync(logoPath);

  const WIDTH = 1200;
  const HEIGHT = 630;

  // Create the OG image: royal blue background + school logo
  const logo = await sharp(logoBuffer)
    .resize(200, 200, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Build the image with SVG overlay
  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0c217c"/>
          <stop offset="100%" style="stop-color:#060f45"/>
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
      <text x="${WIDTH / 2}" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="white">
        St. Elizabeth's High School
      </text>
      <text x="${WIDTH / 2}" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)">
        Pomburpa, Goa — Nurturing Hearts Since 1949
      </text>
      <text x="${WIDTH / 2}" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.6)">
        CBSE Affiliated · Average Class Size: 15 Students
      </text>
    </svg>
  `;

  const bgImage = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  // Composite logo on top (centered horizontally)
  const ogImage = await sharp(bgImage)
    .composite([{
      input: logo,
      left: Math.floor((WIDTH - 200) / 2),
      top: 40,
    }])
    .jpeg({ quality: 90 })
    .toBuffer();

  writeFileSync(join(PUBLIC, "og-default.jpg"), ogImage);
  console.log(`✅ og-default.jpg generated (${ogImage.length} bytes, ${WIDTH}x${HEIGHT})`);
}

async function main() {
  try {
    await generateFavicon();
    await generateOGImage();
    console.log("\n🎉 All assets generated successfully!");
  } catch (err) {
    console.error("❌ Error generating assets:", err.message);
    process.exit(1);
  }
}

main();
