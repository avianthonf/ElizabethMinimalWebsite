#!/usr/bin/env node

/**
 * Bundle Size Tracker
 * 
 * Tracks bundle sizes after each build and compares them to previous builds.
 * Helps catch bundle size regressions early.
 * 
 * Usage:
 *   node scripts/track-bundle-size.js
 * 
 * Run this after `npm run build` to log current bundle sizes.
 */

const fs = require('fs');
const path = require('path');

const BUILD_MANIFEST_PATH = path.join(process.cwd(), '.next', 'build-manifest.json');
const STATS_PATH = path.join(process.cwd(), '.bundle-stats.json');

function getFileSizeInKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch {
    return 0;
  }
}

function analyzeBundleSizes() {
  if (!fs.existsSync(BUILD_MANIFEST_PATH)) {
    console.error('❌ Build manifest not found. Run `npm run build` first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf-8'));
  const nextDir = path.join(process.cwd(), '.next');

  const bundleSizes = {
    timestamp: new Date().toISOString(),
    pages: {},
    sharedChunks: {},
    totalSize: 0,
  };

  // Analyze page bundles
  for (const [page, files] of Object.entries(manifest.pages)) {
    let pageSize = 0;
    files.forEach((file) => {
      const filePath = path.join(nextDir, file);
      const size = parseFloat(getFileSizeInKB(filePath));
      pageSize += size;
    });
    bundleSizes.pages[page] = pageSize.toFixed(2);
    bundleSizes.totalSize += pageSize;
  }

  // Load previous stats if they exist
  let previousStats = null;
  if (fs.existsSync(STATS_PATH)) {
    previousStats = JSON.parse(fs.readFileSync(STATS_PATH, 'utf-8'));
  }

  // Save current stats
  fs.writeFileSync(STATS_PATH, JSON.stringify(bundleSizes, null, 2));

  // Display results
  console.log('\n📦 Bundle Size Analysis\n');
  console.log('─'.repeat(60));

  const sortedPages = Object.entries(bundleSizes.pages).sort(
    ([, a], [, b]) => parseFloat(b) - parseFloat(a)
  );

  console.log('\n📄 Top 10 Largest Pages:\n');
  sortedPages.slice(0, 10).forEach(([page, size], index) => {
    const sizeNum = parseFloat(size);
    const emoji = sizeNum > 100 ? '🔴' : sizeNum > 80 ? '🟡' : '🟢';
    
    let change = '';
    if (previousStats && previousStats.pages[page]) {
      const prevSize = parseFloat(previousStats.pages[page]);
      const diff = sizeNum - prevSize;
      const percent = ((diff / prevSize) * 100).toFixed(1);
      
      if (Math.abs(diff) > 0.1) {
        const arrow = diff > 0 ? '📈' : '📉';
        change = ` ${arrow} ${diff > 0 ? '+' : ''}${diff.toFixed(2)} KB (${percent}%)`;
      }
    }
    
    console.log(`  ${index + 1}. ${emoji} ${page.padEnd(35)} ${size.padStart(8)} KB${change}`);
  });

  console.log('\n📊 Total Bundle Size:\n');
  console.log(`  ${bundleSizes.totalSize.toFixed(2)} KB`);

  if (previousStats) {
    const diff = bundleSizes.totalSize - previousStats.totalSize;
    const percent = ((diff / previousStats.totalSize) * 100).toFixed(1);
    
    if (Math.abs(diff) > 1) {
      const emoji = diff > 0 ? '⚠️' : '✅';
      console.log(`  ${emoji} ${diff > 0 ? '+' : ''}${diff.toFixed(2)} KB (${percent}%) from last build`);
    } else {
      console.log('  ✅ No significant change from last build');
    }
  }

  console.log('\n─'.repeat(60));

  // Check against budgets
  const BUDGET_FIRST_LOAD = 200; // KB
  const BUDGET_PER_PAGE = 100; // KB

  const oversizedPages = sortedPages.filter(([, size]) => parseFloat(size) > BUDGET_PER_PAGE);
  
  if (oversizedPages.length > 0) {
    console.log('\n⚠️  Pages Exceeding Budget (100 KB):\n');
    oversizedPages.forEach(([page, size]) => {
      console.log(`  🔴 ${page}: ${size} KB`);
    });
  } else {
    console.log('\n✅ All pages within budget (< 100 KB)');
  }

  // Exit with error if budgets exceeded significantly
  const criticalOversize = sortedPages.filter(([, size]) => parseFloat(size) > BUDGET_FIRST_LOAD);
  
  if (criticalOversize.length > 0) {
    console.log('\n❌ CRITICAL: Some pages exceed 200 KB limit!\n');
    process.exit(1);
  }

  console.log('\n💡 Tip: Run `npm run analyze` for detailed bundle analysis\n');
}

try {
  analyzeBundleSizes();
} catch (error) {
  console.error('❌ Error analyzing bundle sizes:', error.message);
  process.exit(1);
}
