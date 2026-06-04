import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const sizes = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

async function main() {
  const outDir = new URL('./screenshots/', import.meta.url).pathname;
  await mkdir(outDir, { recursive: true });

  // Use existing chromium-1223 binary since v1217 download keeps failing
  const executablePath = '/home/avinash/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome';

  const browser = await chromium.launch({
    headless: true,
    executablePath,
  });
  const page = await browser.newPage();

  for (const { name, width, height } of sizes) {
    await page.setViewportSize({ width, height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({
      path: `${outDir}/homepage-${name}.png`,
      fullPage: true,
    });
    console.log(`Screenshot saved: homepage-${name}.png (${width}x${height})`);
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
