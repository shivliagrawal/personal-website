# Readme
Act as an expert UI/UX designer and frontend developer. I want you to create a complete, fully functional, and visually striking mockup for a personal portfolio website using HTML, Tailwind CSS (via CDN), and modern JavaScript (if interactivity is needed). 
I want you to create a professional and cool looking website that can be depolyed on vercel. This website is supposed to act as my portfolio as I am trying to use this to apply for the role of a "project manager" at various FANG companies. My current website is here https://shivliagrawal.vercel.app/#/. Go through 'CLAUDE.md' file!

## How I want the website to feel like
It needs to be minimalistic and have liquid-glass feel, rounded corners for buttons that float and pop when clicked and disintegrate into particles. Ultra-stylish and sleek look which is perfect for project management. The utmost priority is for the website to not feel "laggy" at all, speed is the topmost priority. 

## How I want the website to look like
The design should embrace a clean, minimalist aesthetic with plenty of whitespace, subtle typography, and a refined color palette (e.g., dark mode accents or a sophisticated neutral tone).

### Layout & Sections to Include:
1. **Navigation Bar:** Minimalist sticky header with a logo/name and smooth-scrolling anchor links (About, Projects, Experience, Contact) plus a toggle for dark/light mode if applicable.
2. **Hero Section:** A bold, high-impact introductory headline, a short value proposition statement, and clear call-to-action buttons ("View Work" and "Get in Touch").
3. **About Section:** A concise professional bio card and a clean grid showcasing technical skills/tools.
4. **Projects Grid:** A responsive card-based layout featuring 3-4 placeholder projects. Each card should include a title, a brief description, tech stack tags, and links (GitHub / Live Demo).
5. **Experience / Timeline:** A clean vertical timeline highlighting professional roles or academic milestones.
6. **Contact Section:** A minimalist contact form and links to professional social profiles (LinkedIn, GitHub, Email).

### Technical Requirements:
* Output the entire solution in a **single, clean HTML file** so I can easily open it in my browser.
* Use Tailwind CSS via CDN for styling, and include Google Fonts (like Inter or Plus Jakarta Sans) for typography.
* Ensure the design is **fully responsive** (looks immaculate on mobile, tablet, and desktop).
* Add smooth hover states, transitions, and subtle micro-interactions to make it feel polished and alive.

Please write out the complete code block first, followed by a brief guide on how to customize the placeholders with my own content.


## Important Information about me according to AI generated summary based on my work at Cummins:
I’d frame you as an AI Solution Engineer working at the intersection of AI, product management, data, and enterprise software, rather than making the portfolio overly engineering-heavy. I also generalized internal project names because your notes contain internal systems, URLs, infrastructure details, and employee names that shouldn’t go on a public portfolio.
Current Role — AI Solution Engineer
At Cummins, I work at the intersection of artificial intelligence, product management, and enterprise software, helping turn business problems into scalable technical solutions. My role extends beyond engineering: I gather and translate business requirements, define technical requirements and user stories, coordinate cross-functional teams, evaluate solution approaches, and help drive projects from early discovery through development and deployment.
My work spans AI-powered sales tools, CRM intelligence, workflow automation, data integrations, analytics, and digital product experiences. I collaborate with stakeholders across engineering, data, UX, IT, sales, and business teams, using tools such as Jira, Salesforce, Databricks, Power BI, APIs, and cloud data platforms.
A major part of my role is bridging the gap between what users need and what engineering teams build—understanding the problem, evaluating technical feasibility, defining the solution, coordinating execution, and improving the product based on data and stakeholder feedback.
Selected Projects
AI-Powered Opportunity Scoring
Working on an AI-assisted sales intelligence capability designed to help prioritize sales opportunities within the CRM workflow.
My work has included investigating model behavior and data-quality issues, validating scoring and model explanations across testing environments, coordinating deployment discussions, defining implementation requirements, and working with business and technical stakeholders toward production adoption.
Focus: AI/ML · Salesforce · Product Delivery · Data Quality · Model Explainability · Stakeholder Management
Enterprise Sales Platform Integration
Leading a cross-functional integration initiative connecting a sales workflow with enterprise data and digital systems.
I work across business and engineering teams to understand requirements, coordinate middleware and data integrations, translate needs into technical work, manage dependencies, and support implementation and post-launch improvements.
The project has given me experience owning a technical initiative across multiple teams rather than working on a single isolated component.
Focus: Product Management · APIs & Integrations · Middleware · Cross-Functional Leadership · Jira · Enterprise Architecture
Digital Product Discovery Experience
Contributed to the design of a new customer-facing digital experience intended to make technical product information easier to discover and navigate.
I gathered business requirements, translated them into IT and UX requirements, collaborated with users and stakeholders to understand existing workflow pain points, coordinated with design, content, and engineering teams, and helped establish project plans, ownership, and implementation requirements.
As the solution evolved, I also participated in evaluating different build-vs-buy approaches and an internal proof of concept.
Focus: Product Discovery · Requirements Gathering · UX · Product Strategy · Stakeholder Interviews · Project Planning
Engineering Specification Automation
Working on initiatives to automate traditionally manual engineering and product-configuration workflows.
The projects explore a combination of AI prompting, structured data transformation, business rules, data extraction, and automation to generate and validate technical specification information more efficiently.
My responsibilities include evaluating solution approaches, gathering requirements, coordinating source-data access, defining Jira stories, working through data-model dependencies, and collaborating with engineering and business stakeholders on UX and implementation.
Focus: Generative AI · Automation · Product Requirements · Data Processing · Workflow Optimization · Technical Product Management
Data Platform & Analytics Enablement
Supporting the movement and integration of enterprise data into modern analytics environments, including cloud data platforms and Databricks.
I have worked with teams to define source-data requirements, coordinate data-intake processes, understand API and metadata requirements, and connect business applications with downstream analytics systems.
I have also contributed to analytics and measurement initiatives involving dashboards, CRM reporting, product usage instrumentation, Google Analytics, and Power BI.
Focus: Databricks · Data Lakes · APIs · Salesforce · Power BI · Analytics · Data Integration
Market Intelligence Automation
Contributing to an automation initiative for collecting and organizing competitive and market intelligence.
My work has included translating business needs into development stories, evaluating AI-based, web-extraction, and rules-based approaches, coordinating knowledge transfer, and helping determine how manual research processes can be converted into scalable automated workflows.
Focus: AI Automation · Market Intelligence · Web Data · Jira · Requirements · Solution Design
How I Work
Across these projects, I frequently operate as both a technical contributor and product owner, with responsibilities including:
Translating ambiguous business problems into product and technical requirements
Writing and managing user stories and project backlogs
Coordinating engineering, data, UX, IT, and business stakeholders
Evaluating AI, automation, integration, and build-vs-buy approaches
Leading meetings, project kickoffs, and requirements discussions
Managing dependencies, data-access requirements, and implementation blockers
Supporting products from discovery and prototyping through testing and deployment
Defining analytics and usage measurement for digital products
Communicating technical tradeoffs to non-technical stakeholders
My long-term interests are in AI Product Management and Technical Product Management, where I can combine my computer science and AI background with product strategy, user discovery, and cross-functional execution.
For the website itself, I’d probably show only 4 project cards: AI Opportunity Scoring, Enterprise Integration, Engineering Automation, and Digital Product Experience. Those four create the strongest narrative for the Google/Microsoft/NVIDIA-style Technical PM / AI PM roles you're aiming toward. The underlying notes support meaningful product work—requirements gathering, UX coordination, project tracking, analytics, data integration, and automation—not just implementation tasks.
I’d also avoid putting internal codenames such as SSR, GenSpec, GenCalc, PowerCell, or internal architecture/data-source names on the public site unless you know they’re cleared for external use. The generic project names above actually sound stronger to recruiters anyway.

## Redesign Summary — "Calendar as Narrative" (2026-08-14)

A full product-narrative redesign was requested: evolve the site from "a calendar filled with many small appointments" into a portfolio where Day, Week, Month, and Year each tell a distinct part of the career story, with a curated **Today** view replacing the old Week view as the homepage. Before/after screenshots: `temporary screenshots/screenshot-7-before-redesign-desktop.png` (before) and `temporary screenshots/screenshot-9-after-redesign-desktop.png` (after).

### Two decisions made before building
1. **Tech stack** — the original prompt asked for Next.js/React/TypeScript/Framer Motion. This conflicts with this project's own `CLAUDE.md`, which mandates a single static `index.html` with Tailwind via CDN and no build step. Decision: **kept the single-file architecture** — the prompt's component ideas (HeroEvent, TimeRail, CategoryLegend, etc.) were implemented as vanilla-JS/Tailwind sections rather than as a framework migration.
2. **Scope** — the full prompt covers four reworked views, a search command palette, deep linking, and a full accessibility pass. Decision: **build the Today/homepage view for real first** (explicitly called "the most important part of this redesign"), document the rest here as a roadmap rather than attempting everything in one uninterrupted pass.

### What changed (implemented)
- **New default view: Today.** The homepage is no longer the crowded Week grid. It's a curated, editorial "day in the life" — a vertical time rail with five large blocks instead of dozens of small chips:
  1. **9:00 AM — Now/Hero**: name, current role, one-paragraph positioning, live "Now" status dot, three CTAs (View Selected Work, Resume, Let's Connect).
  2. **10:45 AM — What I Bring**: four PM capabilities (Discover / Decide / Deliver / Measure), one line each.
  3. **1:00 PM — Selected Impact**: one featured case study (AI-Powered Opportunity Scoring) in Problem / My Role / Key Decision / Outcome format, with an "Open case study" button that reuses the existing event-modal component.
  4. **3:00 PM — How I Think**: three product principles grounded in the real project content.
  5. **4:30 PM — Let's Build Something Useful**: a calendar-invite-styled contact block (Subject/Attendees/Duration) instead of a generic footer.
- **Week/Month/Year preserved as-is**, still reachable via the view switcher — unchanged in content/layout this round.
- **Default view logic rebuilt**: Today now loads by default on every visit (hard reset, no persisted "last view"); Week/Month/Year still support direct `#week` / `#month` / `#year` links; a "Today" reset button appears whenever you're on another view.
- **Keyboard shortcuts added**: `T`/`D` → Today, `W` → Week, `M` → Month, `Y` → Year (ignored while typing in a text field).
- **Mobile view switcher added** — this was a genuine pre-existing gap: the Today/Week/Month/Year pills were desktop-only (`hidden md:flex`), so mobile visitors previously had no way to change views at all. A sticky mobile switcher bar was added and a related bug fixed (`.cal-main`'s unconditional `overflow-x: auto` was establishing a scroll container that broke `position: sticky` math for anything nested inside it on mobile — narrowed to desktop/tablet only).
- **Architecture change**: the calendar app-shell used to be a fixed one-screen container (Week/Month/Year still work this way, by design — they're meant to fit one screen with their own internal scroll). Today needed to be a tall, normally-scrolling page instead, so the app shell now toggles between "fixed shell" mode and "flow" mode depending on the active view, letting Today's content scroll naturally into the Post-it Gallery section below it.

### What's documented but not yet built (roadmap)
These are real, well-specified parts of the original prompt, intentionally deferred rather than rushed:
- Reworking **Week** into the "PM operating system" (Monday=Discover ... Friday=Measure, Weekend=Learn & Lead) instead of its current literal day-by-day content.
- Reworking **Month** to show status (active/completed) and a category filter, beyond the existing Gantt bars.
- Reworking **Year** into a denser "high-value milestones only" career journey with skills/related-project links per entry.
- **Search command palette** (`/` to open, search across projects/roles/skills/tools).
- **Deep-linkable individual events/projects** (currently only whole-view hash links exist, not per-event).
- **Event hover/focus previews** before opening the full modal.
- A full **WCAG AA accessibility pass** (current build has focus-visible states and semantic buttons throughout, but hasn't been formally audited against contrast ratios, screen-reader labeling, or tab order beyond spot checks).

### Content to personalize
- **Resume CTA** currently links to `Resume-work.png` (a screenshot-style image, not a polished export) — replace with a real downloadable PDF resume.
- **`[verified impact metric]`** in the Selected Impact block is a placeholder — replace once a real, approved metric exists for the AI-Powered Opportunity Scoring initiative.
- The featured Selected Impact project (AI-Powered Opportunity Scoring) was chosen as the strongest AI+PM narrative fit — swap to a different one of the four Cummins initiatives if you'd rather lead with something else.

