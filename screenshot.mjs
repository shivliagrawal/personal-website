import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';

const url = process.argv[2];
const label = process.argv[3];

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

const outDir = './temporary screenshots';
await mkdir(outDir, { recursive: true });

const existing = await readdir(outDir);
const nums = existing
  .map((f) => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map((m) => Number(m[1]));
const nextN = nums.length ? Math.max(...nums) + 1 : 1;

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 834, height: 1194 },
  { name: 'desktop', width: 1440, height: 900 },
];

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle0' });

// Force-reveal any scroll-triggered animation state so full-page screenshots
// show the settled page rather than depending on IntersectionObserver timing
// in headless Chrome.
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
});

for (const vp of viewports) {
  await page.setViewport({ width: vp.width, height: vp.height });
  const suffix = label ? `${label}-${vp.name}` : vp.name;
  const filePath = `${outDir}/screenshot-${nextN}-${suffix}.png`;
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Saved ${filePath}`);
}

await browser.close();
