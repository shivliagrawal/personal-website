// Text-first QA for the portfolio. Prints a compact report instead of screenshots.
//
//   node scripts/qa-check.mjs                     all devices x light/dark, all views
//   node scripts/qa-check.mjs --devices=quick     iphone-15-pro, ipad-mini, macbook-air
//   node scripts/qa-check.mjs --devices=iphone-se,ipad-pro --themes=dark --views=today,week
//   node scripts/qa-check.mjs --shots             also save one viewport screenshot per device/theme/view
//   node scripts/qa-check.mjs --json              full JSON instead of the text summary
//
// Exit code 1 if any check fails. Expects the dev server (node serve.mjs) on :3000
// unless --url is given.
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { DEVICES, pickDevices } from './devices.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const BASE = args.url || 'http://localhost:3000';
const deviceNames = pickDevices(args.devices === true ? 'all' : (args.devices || 'all'));
const themes = (args.themes || 'light,dark').split(',');
const views = (args.views || 'today,week,month,year').split(',');
const MIN_FONT = 12;      // px, HIG caption floor
const MIN_TAP_TOUCH = 44; // pt, HIG minimum hit target on touch devices
const MIN_TAP_POINTER = 28; // macOS minimum control size

const shotDir = './temporary screenshots';
let shotN = 0;
if (args.shots) {
  await mkdir(shotDir, { recursive: true });
  const nums = (await readdir(shotDir)).map((f) => f.match(/^screenshot-(\d+)/)).filter(Boolean).map((m) => Number(m[1]));
  shotN = nums.length ? Math.max(...nums) + 1 : 1;
}

const browser = await puppeteer.launch();
const results = [];

// In-page audit of the currently visible layout.
function audit(minTap) {
  const vw = document.documentElement.clientWidth;
  const out = { overflowPx: Math.max(0, document.documentElement.scrollWidth - vw), wide: [], smallText: [], smallTargets: [] };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.01;
  };
  const inScroller = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') return true;
    }
    return false;
  };
  const inHiddenLayer = (el) => !!el.closest('.hidden, [aria-hidden="true"]') || (el.closest('#sidebar') && getComputedStyle(document.getElementById('sidebar')).visibility === 'hidden');
  const label = (el) => {
    const id = el.id ? `#${el.id}` : '';
    const cls = el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : '';
    const txt = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 32);
    return `${el.tagName.toLowerCase()}${id}${cls}${txt ? ` "${txt}"` : ''}`;
  };

  for (const el of document.querySelectorAll('body *')) {
    if (inHiddenLayer(el) || !visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 && !inScroller(el) && out.wide.length < 6) out.wide.push(`${label(el)} right=${Math.round(r.right)}`);
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText) {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 12 - 0.01) out.smallText.push(`${label(el)} ${fs.toFixed(1)}px`);
    }
  }
  for (const el of document.querySelectorAll('a[href], button, [role="tab"]')) {
    if (inHiddenLayer(el) || !visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < minTap - 0.5 || r.height < minTap - 0.5) out.smallTargets.push(`${label(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
  }
  out.smallText = [...new Set(out.smallText)].slice(0, 8);
  out.smallTargets = [...new Set(out.smallTargets)].slice(0, 8);
  return out;
}

for (const name of deviceNames) {
  const dev = DEVICES[name];
  for (const theme of themes) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
    page.on('response', (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.evaluateOnNewDocument((t) => { try { localStorage.setItem('theme', t); } catch (e) {} }, theme);
    await page.setViewport(dev);

    const minTap = dev.hasTouch ? MIN_TAP_TOUCH : MIN_TAP_POINTER;
    for (const view of views) {
      await page.goto(`${BASE}/${view === 'today' ? '' : '#' + view}`, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.querySelectorAll('.reveal-chart, .reveal-img').forEach((el) => el.classList.add('is-in')));
      await new Promise((r) => setTimeout(r, 250));
      const a = await page.evaluate(audit, minTap);
      const activeView = await page.evaluate(() => document.body.dataset.view);
      if (activeView !== view) errors.push(`routing: #${view} rendered "${activeView}"`);
      results.push({ device: name, theme, view, ...a });
      if (args.shots) {
        const file = `${shotDir}/screenshot-${shotN}-${name}-${theme}-${view}.png`;
        await page.screenshot({ path: file });
      }
    }

    // Functional checks run once per device (theme-independent).
    if (theme === themes[0]) {
      await page.goto(BASE, { waitUntil: 'networkidle0' });
      const fn = await page.evaluate(async () => {
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const f = [];
        const overlay = document.getElementById('modal-overlay');
        // every event opens in the sheet
        for (const e of EVENTS) {
          openModal(e.id);
          if (overlay.classList.contains('hidden') || document.getElementById('modal-title').textContent !== e.title) f.push(`sheet failed for ${e.id}`);
          const card = document.getElementById('modal-card').getBoundingClientRect();
          if (card.right > document.documentElement.clientWidth + 1 || card.left < -1) f.push(`sheet overflows for ${e.id}`);
        }
        closeModal(); await wait(400);
        if (!overlay.classList.contains('hidden')) f.push('sheet did not close');
        // carousel steps
        openModal('nocturne'); await wait(50);
        const car = document.querySelector('.case-carousel');
        document.querySelector('.carousel-next').click();
        if (car.dataset.idx !== '1') f.push('carousel next failed');
        document.querySelector('.carousel-prev').click();
        if (car.dataset.idx !== '0') f.push('carousel prev failed');
        // lightbox
        document.querySelector('.case-img').click(); await wait(50);
        if (document.getElementById('lightbox-overlay').classList.contains('hidden')) f.push('lightbox did not open');
        document.getElementById('lightbox-overlay').click(); await wait(300);
        closeModal(); await wait(400);
        // resume link
        const r = document.getElementById('resume-btn');
        if (!r || r.getAttribute('download') !== 'Shivli_Agrawal_Resume.pdf') f.push('resume download attribute missing');
        const res = await fetch(r.getAttribute('href'), { method: 'HEAD' });
        if (!res.ok) f.push(`resume PDF HTTP ${res.status}`);
        // legend jump filters week
        const leg = document.querySelector('.legend-jump[data-cat="personal"]');
        leg.click(); await wait(300);
        if (document.body.dataset.view !== 'week') f.push('legend jump did not open Week');
        if (!document.querySelector('#week-cat-grid .event-chip[data-id="hp-trip"]')) f.push('legend jump did not filter to Personal');
        // keyboard shortcut
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'm' }));
        if (document.body.dataset.view !== 'month') f.push('keyboard M did not open Month');
        // no em dashes in rendered text
        if (document.body.innerText.includes('—')) f.push('em dash found in rendered text');
        return f;
      });
      results.push({ device: name, theme: 'n/a', view: 'functional', failures: fn });
    }
    if (errors.length) results.push({ device: name, theme, view: 'errors', errors });
    await page.close();
  }
}
await browser.close();

// ---- Report ----
let failed = 0;
const lines = [];
for (const r of results) {
  const problems = [];
  if (r.overflowPx) problems.push(`horizontal overflow ${r.overflowPx}px${r.wide?.length ? ` (${r.wide.join('; ')})` : ''}`);
  if (r.smallText?.length) problems.push(`text < ${MIN_FONT}px: ${r.smallText.join('; ')}`);
  if (r.smallTargets?.length) problems.push(`small targets: ${r.smallTargets.join('; ')}`);
  if (r.failures?.length) problems.push(...r.failures);
  if (r.view === 'errors' && r.errors?.length) problems.push(...r.errors);
  if (problems.length) { failed++; lines.push(`FAIL ${r.device} ${r.theme} ${r.view}\n  - ${problems.join('\n  - ')}`); }
}
if (args.json) console.log(JSON.stringify(results, null, 2));
else {
  const checked = results.filter((r) => r.view !== 'errors').length;
  console.log(lines.length ? lines.join('\n') : 'All checks passed.');
  console.log(`\n${checked} checks across ${deviceNames.length} devices x ${themes.length} themes, ${failed} failing.${args.shots ? ` Screenshots: screenshot-${shotN}-*` : ''}`);
}
process.exit(failed ? 1 : 0);
