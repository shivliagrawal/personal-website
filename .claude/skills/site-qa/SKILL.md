---
name: site-qa
description: Verify shivliagrawal.com changes across iPhone, iPad, laptop, and desktop sizes in light and dark mode. Use after any edit to index.html or content.js, before asking the user to review on localhost, and before deploying.
---

# Site QA (developer → tester → verifier)

Text-first verification for this portfolio. Run the cheap checks first, look at pixels only for what changed.

## 1. Make sure the server is up (once)
```bash
lsof -i :3000 >/dev/null || (node serve.mjs &)   # never start a second instance
```

## 2. Tester: automated checks (text output, no images)
```bash
node scripts/qa-check.mjs                    # 9 devices x light/dark x 4 views + functional checks
node scripts/qa-check.mjs --devices=quick    # iphone-15-pro, ipad-mini, macbook-air (fast loop)
node scripts/qa-check.mjs --views=week --themes=dark --devices=iphone-se
```
It fails on:
- horizontal page overflow (names the offending element)
- rendered text under 12px (HIG caption floor)
- tap targets under 44×44 on touch devices, or under 28 on desktop pointers
- console errors, page errors, HTTP ≥400
- routing: `#week`/`#month`/`#year` must render that view
- functional checks:
  - every `EVENTS` id opens the sheet without overflowing it
  - carousel next/prev
  - lightbox
  - resume PDF `download` attribute plus HEAD 200
  - legend jump to the filtered Week view
  - keyboard `M`
  - no em dash anywhere in rendered text

Exit code 1 means fix before moving on. Device presets live in `scripts/devices.mjs`.

## 3. Verifier: targeted visual check
Only screenshot what changed. Viewport-sized images are cheap; full-page images are not.
```bash
node screenshot.mjs http://localhost:3000 label                         # quick set, viewport only
node screenshot.mjs "http://localhost:3000/#month" label --devices=macbook-air --theme=dark
node scripts/qa-check.mjs --shots --views=week --devices=iphone-15-pro   # one shot per device/theme/view
```
Read the PNGs from `temporary screenshots/`. Compare specific values: spacing, type token, color token, radius. Do at least two fix-and-recheck rounds for visual work.

Also grep the source:
```bash
grep -n "—" index.html content.js          # must be empty (user rule: no em dashes)
grep -n "transition-all\|zoom:" index.html  # must be empty
```

## 4. Hand-off
- Report what passed, with numbers, and anything skipped.
- Ask the user to review on http://localhost:3000. **Do not deploy** until they approve.
- After approval: commit, `git push`, `npx vercel --prod --yes`, then `curl -sI https://shivliagrawal.com` (expect 200).
- Add a line to the changelog in `memory.md`.
