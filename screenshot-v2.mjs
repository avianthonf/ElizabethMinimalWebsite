import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  try {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await page.waitForTimeout(4000);

    await page.evaluate(() => {
      window.scrollBy(0, window.innerWidth + 1000);
    });
    await page.waitForTimeout(1000);

    const screenshotPath = path.join(process.cwd(), 'e2e/screenshots/values-panel-desktop.png');
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Screenshot saved to', screenshotPath);
  } finally {
    await browser.close();
  }
})();
