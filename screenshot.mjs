// node screenshot.mjs <url> [label] [--devices=quick|all|iphone-se,...] [--theme=light|dark] [--full]
// Saves ./temporary screenshots/screenshot-N[-label]-<device>.png (N auto-increments, never overwrites).
// Default: viewport-sized shots on the quick set (iphone-15-pro, ipad-mini, macbook-air).
// Use --full for a full-page capture (large images cost more to review).
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { DEVICES, pickDevices } from './scripts/devices.mjs';

const positional = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const flags = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => {
  const [k, v] = a.slice(2).split('=');
  return [k, v ?? true];
}));
const [url, label] = positional;

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label] [--devices=quick|all|name,...] [--theme=light|dark] [--full]');
  process.exit(1);
}

const outDir = './temporary screenshots';
await mkdir(outDir, { recursive: true });
const nums = (await readdir(outDir)).map((f) => f.match(/^screenshot-(\d+)/)).filter(Boolean).map((m) => Number(m[1]));
const nextN = nums.length ? Math.max(...nums) + 1 : 1;

const browser = await puppeteer.launch();
for (const name of pickDevices(flags.devices)) {
  const page = await browser.newPage();
  if (flags.theme) await page.evaluateOnNewDocument((t) => { try { localStorage.setItem('theme', t); } catch (e) {} }, flags.theme);
  await page.setViewport(DEVICES[name]);
  await page.goto(url, { waitUntil: 'networkidle0' });
  // Settle scroll-triggered reveals so captures show the final state.
  await page.evaluate(() => document.querySelectorAll('.reveal-chart, .reveal-img').forEach((el) => el.classList.add('is-in')));
  await new Promise((r) => setTimeout(r, 400));
  const suffix = [label, flags.theme, name].filter(Boolean).join('-');
  const filePath = `${outDir}/screenshot-${nextN}-${suffix}.png`;
  await page.screenshot({ path: filePath, fullPage: !!flags.full });
  console.log(`Saved ${filePath}`);
  await page.close();
}
await browser.close();
