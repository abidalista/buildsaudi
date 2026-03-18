# BuildSaudi — Cursor Handoff Prompt

Copy everything below the line and paste it into cursor with the claude extension.

---

## Project: BuildSaudi.co — Saudi Startup Jobs Board

You are building BuildSaudi.co, a curated startup jobs board for Saudi Arabia. It should look and feel exactly like https://buildlist.xyz/jobs but for the Saudi startup ecosystem.

### What you have in this project

**v0 scaffold (already unzipped, this is your starting codebase):**
- Next.js 16 + Tailwind 4 + shadcn/ui components
- Located at: the root of this project (unzipped from v0 export)
- Has layout.tsx, UI components, package.json ready
- Missing: actual page content, data layer, and custom components. v0 generated the scaffold but the page code needs to be built

**Reference files (read ALL of these before writing any code):**

1. `research/buildsaudi-design-spec.md` — full visual/UX spec. covers page structure, filters, job cards, company pages, color palette, typography, spacing, interactions, airtable schema, and what NOT to build yet. READ THIS FIRST.

2. `research/saudi-jobs-board-plan.md` — strategic plan covering tech architecture, scraper strategy, growth model, competitive positioning, and 48 hour action plan.

3. `research/saudi-jobs-board-brief.md` — technical brief with ATS platform details, DM templates, scraper architecture, and the growth-first monetization model.

4. `research/saudi-startup-jobs.json` — 19 existing job listings scraped from 6 companies (Tamara, Foodics, Cognna, SiFi, WakeCap, Madfu). Use this as seed data.

5. `research/saudi-startup-jobs-README.md` — scrape summary showing what was found and what was missed.

**BuildList screenshots for visual reference (match this design exactly):**
- Located in the `buildlist/` folder — 7 screenshots of buildlist.xyz/jobs showing the layout, job cards, filters, company pages, and overall aesthetic

### What to build (in order)

**Phase 1: Core pages (do this first)**

1. **Jobs browse page** (`/jobs` or `/`)
   - left sidebar with filters: role type, experience level, job type, sector, city, company stage
   - job listing grid on the right
   - each job card: company logo, job title (bold), company name (linked), location badge, job type badge, apply button
   - search bar at top that filters in real time
   - match buildlist's exact visual style from the screenshots

2. **Company detail page** (`/company/[slug]`)
   - company header: logo, name, stage, sector, website link, linkedin link
   - description/blurb
   - all open jobs for that company listed below

3. **Email capture**
   - prominent form on jobs page: "get weekly startup jobs in your inbox"
   - stores to a simple database or airtable

4. **Job submission form** (`/submit`)
   - fields: company name, email, job title, location, job type, description, apply URL
   - stores to airtable moderation queue
   - success message: "thanks, we'll review and publish within 24 hours"

**Phase 2: Data layer**

5. **Airtable integration**
   - use airtable as the backend database
   - two tables: Companies and Jobs (schema in design-spec.md)
   - read from airtable on page load (SSR or ISR)
   - job submission form writes to airtable

6. **Seed data**
   - import the 19 listings from `saudi-startup-jobs.json` into airtable
   - create company records for: Tamara, Foodics, Cognna, SiFi, WakeCap, Madfu

**Phase 3: Scraper**

7. **ATS scraper script** (can be a standalone node script or python)
   - scrape jobs from these confirmed ATS URLs:
     - Tamara: `boards-api.greenhouse.io/v1/boards/tamara/jobs` (greenhouse API)
     - Foodics: `apply.workable.com/api/v1/widget/foodics/jobs` (workable API)
     - SiFi: `sifi.breezy.hr` (scrape HTML)
     - Sary: `apply.workable.com/api/v1/widget/sary/jobs` (workable API)
   - normalize output to match airtable schema
   - push results to airtable via API
   - designed to run as a cron job (daily)

### Brand details

- **Name:** BuildSaudi
- **Domain:** buildsaudi.co
- **Tagline:** "a curated directory of companies building the future of saudi"
- **Tone:** minimalist, confident, taste-driven. short copy, no fluff.
- **Colors:** match buildlist (off-white background, dark text, minimal accent color)
- **Font:** keep Geist from the v0 scaffold (already configured)

### What NOT to build

- user accounts / profiles
- resume uploads
- applicant tracking
- company dashboards
- monetization UI (no pricing page)
- dark mode
- arabic language toggle (english first)
- analytics dashboard

### Deployment

- vercel (free tier)
- connect buildsaudi.co domain (already registered on cloudflare)
- environment variables needed: AIRTABLE_API_KEY, AIRTABLE_BASE_ID

### Important notes

- READ the design spec and screenshots before writing any code
- match buildlist's visual design as closely as possible. every detail matters: spacing, shadows, border radius, hover states, card layout
- keep the codebase clean and simple. this is an MVP
- use the existing shadcn/ui components from the v0 scaffold
- all job "apply" buttons should open external ATS links in a new tab
- no user tracking beyond email signups
