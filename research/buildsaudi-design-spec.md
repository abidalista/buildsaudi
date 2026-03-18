# BuildSaudi Design Spec — Replicate BuildList.xyz/jobs
**For Claude Code Implementation**

---

## Visual Design & Brand

**reference:** https://buildlist.xyz/jobs

replicate the exact visual design, layout, interaction patterns, and aesthetic. buildsaudi should feel like a direct saudi equivalent of buildlist — same taste level, same minimalism, same curation energy.

---

## Page Structure

### 1. Homepage / Browse Jobs Page (Primary)

**layout:**
- clean hero section at top
- tagline: "a curated directory of companies building the future of saudi"
- two major CTAs visible:
  - "browse startup jobs" (primary)
  - "post a job" (secondary, for companies)
- email capture form (prominent but not aggressive)

**main content area:**
- job listing grid/feed (default view)
- filtering sidebar (left or top, depending on breakpoint)
- search bar (full-width or header-integrated)

**filters (left sidebar or collapsible):**
- role type (engineer, product, design, sales, operations, etc)
- experience level (entry, mid, senior, manager, director)
- job type (full-time, contract, part-time, internship)
- sector (fintech, AI, proptech, B2B SaaS, logistics, etc)
- city (riyadh, jeddah, dammam, remote)
- company stage (seed, series A, series B, growth, unicorn)

**job listing card:**
- company logo (small, left side)
- job title (bold, readable)
- company name (linked to company detail page)
- location badge
- role type badge (full-time, contract, etc)
- brief description or snippet (1-2 lines)
- "apply" or "view" CTA (button or link)

**pagination or infinite scroll:** buildlist uses pagination or lazy load

### 2. Company Detail Page

**layout:**
- company header (logo, name, stage, sector, website link, linkedin link)
- company description / blurb (1-2 sentences)
- all open jobs for that company listed below
- social proof (optional: founded date, funding amount, mission statement)

**what appears:**
- company name
- logo
- stage (seed/series A/series B/unicorn)
- sector tags (AI, fintech, etc)
- city/location
- website URL (linked)
- linkedin URL (linked)
- number of open roles
- all job listings for that company

### 3. Job Detail Page (Optional but Recommended)

**if you include:**
- full job description
- company info
- salary range (if available)
- apply button (external link to ATS)
- share buttons (X, linkedin)
- similar jobs sidebar (related roles at other companies)

---

## Visual Elements & Styling

### color palette (buildlist inspired)
- background: off-white or very light gray (#f5f5f5 or #fafafa)
- text: dark gray or charcoal (#1a1a1a or #2d2d2d)
- accents: minimal. one or two brand colors max. buildlist uses a muted teal/blue
- buttons: subtle, high contrast on white
- borders: light gray lines, minimal shadows

### typography
- headings: sans-serif, bold, clear hierarchy
- body: sans-serif, 14-16px, readable line height
- buildlist uses clean system fonts (SF Pro, -apple-system stack)

### spacing & layout
- generous whitespace. not cramped.
- consistent padding/margins (8px, 16px, 24px, 32px grid)
- single-column on mobile, multi-column on desktop
- max-width container (probably 1200px or similar)

### components
- job cards: subtle shadow or light border, hover state lifts or highlights
- filter pills: clickable, show selected state clearly
- buttons: rounded corners (minimal, not aggressive), clear hover/active states
- search input: clean, autocomplete optional

---

## Features to Match BuildList

### search & discovery
- global search bar that searches job titles, company names, descriptions
- real-time filtering (filters update results instantly, no "apply filters" button)
- URL state preservation (filtering updates URL so links are shareable)

### email capture
- email signup form somewhere prominent (hero or sidebar)
- copy: "get weekly startup jobs in your inbox" or similar
- integrates with beehiiv or airtable for list management

### job submission form (for companies)
- simple form that feeds into airtable moderation queue
- fields: company name, email, job title, location, job type, description, apply URL
- success message: "thanks, we'll review and publish within 24 hours"

### company submission form (optional v2)
- companies can submit themselves to be considered for listing
- fields: company name, website, linkedin, funding stage, sector, mission
- moderation: you review and add to company directory

### social sharing
- share job listings on X, linkedin, etc
- each job has a unique URL that works when shared

### responsive design
- desktop: filters on left, jobs on right (2-column)
- tablet: stacked layout, filters collapse into dropdown
- mobile: full-width, filters in modal or collapsible section

---

## Airtable Schema (What Powers This)

### companies table
```
- company_id (unique)
- name
- website
- linkedin_url
- logo_url
- stage (seed/series A/B/C/unicorn)
- sector (multi-select: fintech, AI, proptech, etc)
- city (riyadh, jeddah, dammam, remote, etc)
- description
- mission_statement
- founded_year
- team_size (optional)
- funding_amount (optional)
```

### jobs table
```
- job_id (unique)
- company_id (linked to companies)
- title
- description
- location
- job_type (full-time, contract, part-time, internship)
- experience_level (entry, mid, senior, manager, director)
- sector_tags (linked to sectors)
- salary_range (optional)
- apply_url (ATS link)
- posted_date
- expires_date (auto-remove stale listings)
- status (draft, published, archived)
- source (scraper, manual submission, company submission)
- scraped_at (timestamp)
```

### email subscribers table
```
- subscriber_id
- email
- subscribed_date
- subscription_type (job_seeker, company, both)
- unsubscribed (boolean)
- frequency (daily, weekly)
```

---

## Softr Integration

**softr pages to create:**
1. jobs browsing page (main, filters, search)
2. company detail page (template)
3. job detail page (template, optional)
4. email signup page (simple form)
5. job submission form (for companies)

**softr blocks:**
- airtable database (jobs table)
- filter blocks (role type, experience, job type, sector, city, stage)
- search block
- button blocks (apply, share, etc)
- form blocks (email capture, job submission)
- rich text blocks (hero copy, company bios)

---

## Interaction & Behavior

### filtering
- clicking a filter updates results instantly
- multiple filters work together (AND logic: show jobs matching all selected filters)
- can clear individual filters or "clear all"
- selected filters highlighted/badged

### search
- type in search box, results update in real-time
- searches job titles, company names, descriptions
- no exact match required (fuzzy/substring match is fine)

### external apply flow
- "apply" button links directly to ATS (greenhouse, workable, breezy, etc)
- opens in new tab
- no user account or tracking on buildsaudi (simple directory)

### mobile experience
- touch-friendly button sizes (min 44x44px)
- filters collapsible into modal on mobile
- readable text, proper line heights
- no horizontal scrolling

---

## What NOT to Include (Yet)

- user accounts / profiles
- resume uploads
- applicant tracking
- company dashboard
- analytics / admin panel (internal only)
- monetization UI (no pricing page, no "upgrade" CTAs)
- newsletter template customization
- dark mode

these are phase 2+. mvp is just a beautiful, searchable directory.

---

## Copy & Tone

match buildlist's voice: minimalist, confident, taste-driven.

**examples:**
- "jobs at companies building the future"
- "discover ambitious startups hiring in saudi"
- "curated startup jobs. no noise, no spam."
- "find your next role at a startup building something real"

keep it short, direct, no fluff. avoid corporate-speak.

---

*design spec v1 — march 17, 2026*
