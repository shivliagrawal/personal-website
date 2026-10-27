# CLAUDE.md: Frontend Website Rules

## Always Do First
- **Read `memory.md`** for history, decisions, the architecture map, and the user's standing preferences. Do not read `index.html` top to bottom; grep for the `==== X ====` / `// ---- X ----` markers and read only those ranges.
- **Invoke the `frontend-design` skill** before writing frontend code. Skills live in `.claude/skills/`: `frontend-design`, `webapp-testing`, `site-qa`.
- Check `brand_assets/` before designing (currently empty).

## Where Things Live
- `content.js`: all content (`CATEGORIES`, `EVENTS`). Text, dates, images, and links change here only.
- `index.html`: layout, styles, and behavior. Tailwind CDN plus one inline `<style>` with the design tokens.
- `assets/`: optimized images and the resume PDF.
- `scripts/qa-check.mjs`, `scripts/devices.mjs`, `screenshot.mjs`, `serve.mjs`: tooling.

## Design System: Apple Human Interface Guidelines
- **Font:** the system stack (`-apple-system, BlinkMacSystemFont, "SF Pro Text", …`). Caveat is used only for the polaroid captions.
- **Type:** use the HIG text-style classes (`.t-hero`, `.t-title1/2/3`, `.t-headline`, `.t-body`, `.t-callout`, `.t-subhead`, `.t-footnote`, `.t-caption`). All sizes are rem on a **fixed 16px root** (the user rejected the fluid 16–18px root as "too zoomed in" on 2026-10-26). Token sizes match the pre-overhaul site: body 14px, small labels 11–12px, nothing under 11px. The header and sidebar use `zoom: var(--chrome-zoom)` (1.05 at ≥768px, 1.13 at ≥1600px) as before; the main content stays at 1.0×. No fixed `text-[Npx]` sizes.
- **Color:** only the semantic tokens on `:root` / `[data-theme="dark"]`:
  - surfaces: `--bg`, `--surface`, `--fill`
  - text: `--ink`, `--muted`, `--separator`
  - accents: `--tint` (systemOrange), `--cat-*` (Apple system colors, increased contrast)
  - Never hard-code a hex in markup. Tints use `color-mix(in srgb, var(--x) N%, transparent)`.
- **Materials:** frosted chrome via the `.material` class, with a solid fallback under `prefers-reduced-transparency`.
- **Components:**
  - `.btn` with `.btn-filled`, `.btn-gray`, or `.btn-plain`
  - `.icon-btn` (44×44)
  - `.segmented`
  - `.list-row`
  - `.event-card` (tinted fill plus leading color bar)
  - `.filter-chip`
  - sheet (`.sheet-overlay` / `.sheet`)
- **Touch targets:** ≥44×44 on touch devices. ≥28 is fine on desktop pointers.
- **Motion:** animate only `transform` and `opacity`. Never `transition-all`. Use the `--spring` / `--pop` curves. `prefers-reduced-motion` is respected globally.
- **Interactive states:** every clickable element has hover, `:focus-visible`, and active states.
- **Copy:** sentence-case labels (no all-caps eyebrows), chevron icons instead of `→`, and **no em dashes**. En dashes in date ranges are fine.
- The steel-door gallery is the one deliberate textured surface. Keep it.
- Keep the dark/light toggle. With no saved choice, the theme follows the system.

## Responsive Layout
| Width | Layout |
|---|---|
| <600 | Phone: bottom tab bar, time labels stacked above cards, bottom sheets |
| 600–1023 | iPad portrait, phone landscape: segmented control in the nav bar, sidebar is a slide-over drawer |
| ≥1024 | Persistent sidebar |
| ≥1440 | Content max-width 75rem, centered |

Use `100dvh`, `env(safe-area-inset-*)`, and `viewport-fit=cover`. Custom Tailwind screens: `sm` 600, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440.

## Local Server
- Serve on localhost only, never `file:///`. Run `node serve.mjs` (http://localhost:3000) in the background. If port 3000 is already listening, do not start a second instance.

## Verification (see the `site-qa` skill)
1. `node scripts/qa-check.mjs`. It covers 9 devices × light/dark × 4 views plus functional checks. It must exit 0.
2. Take targeted screenshots of what changed:
   - `node screenshot.mjs http://localhost:3000 label [--devices=quick|all|name] [--theme=dark] [--full]`
   - Images save to `./temporary screenshots/screenshot-N-…png`. Read them with the Read tool and be specific about mismatches.
3. Do at least 2 fix-and-recheck rounds for visual work.
4. **The user reviews on localhost first.** Deploy only after approval or an explicit "deploy": `git push` and `npx vercel --prod --yes`, then verify with `curl -sI https://shivliagrawal.com`.
5. Add a changelog line to `memory.md`.

## Reference Images
- If a reference image is provided, match its layout, spacing, typography, and color exactly. Do not improve or add to it.

## Hard Rules
- Do not add sections, features, or content the user didn't ask for.
- Never fabricate metrics. The Win/Loss chart numbers are illustrative and captioned as such.
- Do not use `transition-all`. Do not stop after one screenshot pass.
