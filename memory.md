# memory.md: Project memory for shivliagrawal.com

Read this first in every new session. It replaces re-reading `index.html` or the chat history.
Last updated: 2026-10-12 (Apple HIG overhaul).

---

## 1. Snapshot
- **Owner:** Shivli Agrawal (GitHub `shivliagrawal`).
  - Current role: AI Solutions Engineer, Cummins Inc., Power Systems Business Unit, Minneapolis, Dec 2025 to present.
  - Education: Purdue B.S. Computer Science, Dec 2025.
  - Targeting Forward Deployed Engineer, Technical PM, and Technical Solutions roles.
- **What the site is:** a personal portfolio laid out as a calendar app (Today / Week / Month / Year), styled after Apple Calendar.
- **Live:** https://shivliagrawal.com (apex domain; DNS at Namecheap; hosting on Vercel).
  - Vercel project: `shivliagrawal-github-io`; team: `shivli-agrawals-projects`.
  - `shivliagrawal.vercel.app` also points here. The user's older site there was overwritten.
- **Repo:** https://github.com/shivliagrawal/personal-website. It's public for now; the user plans to make it private. `memory.md` is committed but excluded from deploys through `.vercelignore`.
- **Stack:** a static `index.html`, `content.js`, Tailwind via CDN, and vanilla JS. There is **no build step**. `vercel.json` sets `framework: null, buildCommand: null, outputDirectory: "."`.
- **Run locally:** `node serve.mjs` serves http://localhost:3000. If port 3000 is already listening, don't start a second instance.
- **Verify:**
  - `node scripts/qa-check.mjs` for text-only QA across 9 devices × 2 themes.
  - `node screenshot.mjs http://localhost:3000 label [--devices=…] [--theme=…] [--full]` for screenshots.
- **Deploy (only after the user approves on localhost):** `git push` and `npx vercel --prod --yes`, then `curl -sI https://shivliagrawal.com`.
- **Python Playwright** (for the `webapp-testing` skill) is installed in `.venv`, which is gitignored. Use `.venv/bin/python`.

## 2. User preferences and standing rules
1. Keep the **dark/light toggle** in every iteration. Her words: "for all the future website iterations".
2. **No em dashes** in copy. She does not want the site to "look AI generated". En dashes in date ranges are fine.
3. **Never fabricate metrics.** The Win/Loss chart numbers are illustrative and captioned "(actual numbers are different)".
4. **Show on localhost first.** Deploy only after approval or an explicit "deploy".
5. **Cummins project content is sample data she approved for full display.** Show it as-is; don't sanitize it. Exception: `winloss_graph.png` stays out because it shows an account ID.
6. Commit attribution line: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
7. Ask before large scope changes. She answers clarifying questions quickly and prefers being asked to being surprised.
8. Design direction since 2026-10-12: **full Apple HIG style with the Apple system font**.

## 3. Architecture map (find sections by grep, not line numbers)
**`index.html` markers** (`grep -n "==== " index.html`):

| Marker | Contents |
|---|---|
| `==== TOKENS ====` | All color and shadow tokens. Light is the default; dark is under `:root[data-theme="dark"]`. |
| `==== BASE + TYPE SCALE ====` | Fluid root size and the HIG text classes |
| `==== CONTROLS ====` | `.btn`, `.icon-btn`, `.segmented` with its sliding `.seg-thumb` |
| `==== CHROME ====` | Nav bar, sidebar or drawer, tab bar, `.material` |
| `==== MAIN + VIEWS ====` | Today rail, event cards, filter chips, Gantt, Year columns, charts |
| `==== SHEET (modal) ====` | Sheet, carousel, lightbox |
| `==== GALLERY ====` | Steel door and polaroids |
| Markup markers | `TOP CHROME`, `SIDEBAR`, `CALENDAR`, `VIEW: TODAY/WEEK/MONTH/YEAR`, `GALLERY`, `TAB BAR`, `EVENT SHEET`, `IMAGE LIGHTBOX` |

**JS sections** (`// ---- X ----`):
- **Theme init:** in `<head>`, runs before paint.
- **Dynamic "today":**
  - Date constants: `NOW`, `WEEK_START`, `TODAY_INDEX`, `CURRENT_MONTH`, `CURRENT_YEAR`.
  - Helpers: `mondayIndex`, `startOfWeek`, `fmtDate`.
- **Sidebar and calendars:** Mini calendar, Sidebar drawer (`setSidebar`), Legend.
- **Views:** Week view (`renderWeekTabs`, `renderWeekGrid`), Year view (`renderYearView`), Month view (`renderMonthView`).
- **Sheet:** `openModal(id)` and `closeModal()`.
- **Navigation:** View switching (`switchView(view)`, which sets `body[data-view]` and the hash), Keyboard shortcuts.
- **Media:** Project image carousel (`stepCarousel`), Resume button, Image lightbox.
- **Small behaviors:** Chart/image reveal, the snapshots button, the theme toggle (`applyTheme`).

**`content.js`:**
- `CATEGORIES` maps a key to `{label, color: 'var(--cat-…)'}`.
- `EVENTS` is the array. The schema is documented at the top of the file.
- `startMonth` plus `endMonth` puts an event in the Month roadmap. `year` puts it in a Year column. `current: true` shows the pulsing "Now" marker. `images[]` makes a carousel.

**Routing:**
- No hash means Today (the default). `#week`, `#month`, and `#year` select the other views.
- Keys: T or D (Today), W, M, Y.
- The legend buttons (`.legend-jump[data-cat]`) open Week filtered to that category.
- Any element with `.event-chip[data-id]` opens that event's sheet.

**Assets (`assets/`):**
- Profile photos: `mainpic1`, `mainpic2` (hero).
- Gallery: `snaps1`–`snaps8` are shown (`snaps9`–`11` are unused).
- Work-project infographics: `winloss_infograph`, `smoke_testing_infograph`, `market_int`, `sales_enablement_infographic`, `specsheet_infographic`.
- College-project images: `nocturne1-3`, `boilertutors1-4`, `databaselms1-3`, `sysmonitor1`.
- Other images: `teaching_experience`, `5k`, `matchacorner`, `wizardingworld`.
- Resume: `resume.jpg` (preview) and `Shivli_Agrawal_Resume.pdf` (download).
- Images are optimized with macOS `sips`.

**Ignored source material:**
- Git-ignored and Vercel-ignored: `notes.md`, `projects.md`, `descriptions.md`, `project-images/`, `personal-images/`, `other-images/`.
- In the repo but not deployed: `reference/refer1.jpg` and `refer2.jpg` (Outlook-calendar inspiration), `Resume-work.png`, and `Resume-college.pdf` (stale).

## 4. Decision log (what, then why)
### Concept and structure
- **Calendar metaphor**, with an Outlook-style first version from `reference/` images. Why: it gives a memorable frame where every experience is an "event", and it shows PM-style organization.
- **Week was the default at first, then Today became the homepage.** Why: Week was too dense as a first impression. Today reads as a time-rail story: hero, What I Bring, College Highlights, Career Highlights, two Selected Work case studies (Market Intelligence first), How I Think, and a contact invite.
- **Week view uses category tabs instead of a day grid.** Why: the 7-day grid crammed cards and was hard to scan on mobile.
- **Month view is a 2026 Gantt roadmap**, and **Year view has 2022–2026 columns.** Why: work projects all run in 2026 (Jan start). Earlier years hold roles and college work.
- **Dates are computed from the real current date** (mini calendar, "Today" label, current month highlight). Why: hard-coded dates went stale.
- **Contact form removed.** Why: the user asked for it to go. LinkedIn and email links replace it.
- **Separate Work Projects and College Projects categories**, plus **College Coursework** as text-only with course tags and a GitHub link.
- **Teaching Experience** event with a photo, and an **About** section in the user's own voice (debate, asking "why", AI/LLM, FDE).
- **Career Highlights** (renamed from Work Highlights). Each line names its role.
- **Polaroid gallery on a steel cupboard door**, 8 photos, 4 per row (2 on phones), with handwritten Caveat captions. A camera button in the nav scrolls to it.

### Content corrections
- Timeline corrected so all Cummins projects are in 2026 and the location is Minneapolis.
  - The current role became "AI Solutions Engineer", Dec 2025, in the 2025 Year column with the NOW marker.
- Early on, internal Cummins notes were sanitized. The user then said it is sample data meant to be shown, so full detail was restored.
- All em dashes were removed site-wide (user rule).
- The Win/Loss chart is illustrative, captioned "(actual numbers are different)".

### Images
- Images first cropped badly with `object-fit: cover`. Fixed with natural aspect ratio (`width:100%; height:auto`).
- Then the user wanted them "tiny when open, expand on click". Case images are capped at 360px, with a click-to-zoom lightbox (78vw/78vh desktop, 94vw/80dvh phones).
- College projects have arrow carousels.

### Resume
- The resume button is a native `<a href="assets/Shivli_Agrawal_Resume.pdf" download>`. A click handler also opens `assets/resume.jpg` in a new tab.
- Why: a synthetic second anchor-click download was unreliable (blocked in the user's browser). The native href is the dependable path.

### Deploy and DNS
- `vercel.json` was added because the Vercel project kept a stale Create React App preset (`react-scripts build` failed).
- SSL for the apex domain failed because a Namecheap URL Redirect record injected a second A record (`192.64.119.23`). The user deleted it, then `vercel certs issue shivliagrawal.com` was run manually.

### Sizing history
- CSS `zoom` was tried first: 1.05× on ≥768px, 1.13× on ≥1600px. The user then wanted the main panel at 1.0×, so zoom was scoped to the header and sidebar only.
- **Replaced on 2026-10-12** by fluid rem typography. See below.

### 2026-10-12: Apple HIG overhaul (this session)
- **Why:** the user asked to follow Apple's design rules and to fit every device (phones, iPads, laptops) with font sizes that adapt.
  - User choices: full Apple-style overhaul, Apple system font, memory.md committed, and all three skills.
- **Type:**
  - The system font stack replaced Hanken Grotesk.
  - The root font size is `clamp(16px, 15.2px + 0.15vw, 18px)`.
  - HIG text-style classes replaced 52 fixed `text-[10/11/13/15px]` sizes. The floor is 12px.
  - The `zoom` hacks were deleted.
- **Color:**
  - Apple semantic colors.
  - Tint: systemOrange, increased-contrast `#C93400` in light and `#FF9F0A` in dark. This replaced the terracotta `#D96B43`, which the frontend-design skill flags as an AI-generated tell.
  - Categories map to Apple system colors (increased-contrast variants so they read as text): About→indigo, Experience→purple, Leadership→yellow, Work→green, College→cyan, Skills→brown, Personal→pink, Contact→orange.
  - Tints use `color-mix()`, so `hexToRgba` and `CATEGORIES.hex` were removed.
- **Theme:**
  - With no saved choice, the theme now follows the system (HIG behavior). Previously the default was always dark. The toggle still overrides and persists.
  - Theme init moved into `<head>` to prevent a flash.
- **Components:**
  - Segmented control with a sliding thumb.
  - Bottom tab bar on phones.
  - Sidebar as a frosted slide-over drawer below 1024px. The old mobile legend chip row was dropped; the drawer replaces it.
  - Modal became a sheet: a bottom sheet with grabber on phones, a centered form sheet otherwise. It has a sticky header with the close button, and focus moves to the dialog.
  - Event cards are Apple Calendar style: tinted fill plus a leading color bar.
  - Buttons: filled, gray, and plain. All all-caps eyebrows and `→` arrows became sentence case and chevrons.
  - The pulsing dot now animates transform and opacity (it used to animate box-shadow).
  - Chart bars now animate `scaleX` (they used to animate width).
- **Layout:**
  - The page always flows (the fixed `100vh` shell and the `flow-mode` class were removed). The sidebar is sticky.
  - `100dvh`, safe-area insets, `viewport-fit=cover`.
  - On phones, Today stacks the time label above each card.
  - Year columns scroll horizontally on iPad.
  - Post-its are `max-width: 190px`; they used to overflow 2-column phone grids at a fixed 190px.
- **Content split:** `EVENTS` and `CATEGORIES` moved to `content.js`, so content edits never touch layout code.
- **Tooling:**
  - `scripts/qa-check.mjs` and `scripts/devices.mjs`.
  - `screenshot.mjs` takes device and theme flags and defaults to viewport-only.
  - Skills installed in `.claude/skills/`: `frontend-design` and `webapp-testing` from anthropics/skills, plus a custom `site-qa`.
  - The loose root `SKILL.md` was removed; it was a stale copy that never registered as a skill.
- **Verification:** qa-check passed 81 checks with 0 failures (9 devices × 2 themes × 4 views, plus functional checks). Two visual rounds were done.
  - Fixed during them: segmented control at 40px on touch devices (now 44), and the close button's focus ring showing when the sheet opens.

## 5. Known gotchas
- Some source image filenames contain odd Unicode spaces. Use globs (`for f in other-images/*"(2)"*`).
- Puppeteer `page.click('[data-id=x]')` can hit a hidden duplicate. Call `openModal(id)` through `page.evaluate`, or use scoped selectors.
- `getBoundingClientRect()` serializes to `{}` across `page.evaluate`. Copy the fields out explicitly.
- Any ancestor with `overflow-x: auto` breaks `position: sticky` on its children. That broke the mobile view switcher once.
- Tailwind CDN preflight (`[type='button'] { background: transparent }`) can override single-class backgrounds. Don't add `type="button"` to styled buttons; use compound selectors such as `.btn.btn-filled`.
- Headless screenshots need `.reveal-chart` / `.reveal-img` forced to `.is-in`. The scripts already do this.
- Homebrew Python is "externally managed", so pip installs go in `.venv`.

## 6. Token-efficient workflow
1. Cold-start from this file plus `CLAUDE.md`. Never read `index.html` in full.
2. Content change (text, dates, images, links): edit `content.js` only. Today-view copy is the exception; it lives in the `VIEW: TODAY` block of `index.html`.
3. Layout change: `grep -n "==== \|// ---- " index.html`, then read only that range.
4. Verify with `node scripts/qa-check.mjs --devices=quick` while iterating, then the full matrix once. Screenshot only the changed view on 1–3 devices, viewport-sized.
5. Ask the user to phrase requests by location ("Today › Selected Work › Win/Loss chart") or by event id (`nocturne`).
6. Batch small edits into one QA run and one deploy.
7. Prune `temporary screenshots/` now and then. Keep the latest round.
8. Append a changelog line below after each shipped change.

## 7. Open items / backlog
- The Today contact block still says "Open to Senior PM and AI PM roles". That doesn't match the hero (FDE / Technical PM / Technical Solutions). Confirm the wording with the user before changing it.
- `snaps9`–`snaps11` are unused, and `Resume-college.pdf` is stale. Ask before deleting.
- The Month bar for one-month events (e.g., Harry Potter trip) truncates its label inside the bar. The full title shows above it.
- Optional: swipe-to-dismiss on the phone sheet.

## 8. Changelog
| Date | Commit | Change |
|---|---|---|
| 2026-09-13 | 3b9a64e | Initial calendar portfolio |
| 2026-09-16 | 6ce771c, 23fa207 | Removed internal notes from repo/deploys; dynamic dates, category Week view, new Today sections |
| 2026-09-24 | 1af4f72, 6d82d3d, 0c744b1 | Real projects and photos, academics; 2026 timeline fix, image cropping fix, full project detail restored; Month/Year populated |
| 2026-09-29 | ad447ed, e10e6c1, b24d8e1 | Teaching experience, real chart, zoomable images, nav, em-dash cleanup; polish; vercel.json fix |
| 2026-10-07 | 4a2f63a | Real project photos, chart caveat, polaroid labels, sizing |
| 2026-10-08 | 0e000ea, 43bc197 | Resume download, carousels, AI Solutions Engineer title/date; resume reliability, zoom scoped |
| 2026-10-12 | Apple overhaul commit | Apple HIG overhaul, fluid type, content.js split, QA tooling and skills, memory.md |

## 9. FLAG: raise with the user at the start of the next chat
- **Contact copy mismatch:** the Today contact block (`VIEW: TODAY` › `4:30 CONTACT INVITE` in `index.html`) still says "Open to Senior PM and AI PM roles". The hero says "Forward Deployed Engineer, Technical PM, and Technical Solutions roles". Ask Shivli for the wording she wants, then update it. Flagged 2026-10-12; she asked to be reminded in the next chat.
