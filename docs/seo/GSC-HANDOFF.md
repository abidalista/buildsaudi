# BuildSaudi SEO Handoff (GSC → Agent)

**Repo:** `/Users/abidal.eth/Desktop/Projects/buildsaudi`  
**Live:** https://buildsaudi.co  
**GSC window:** last 28 days — 20 clicks / 808 impressions / 2.5% CTR / avg pos 10.6  
**Date:** 2026-07-19

---

## A — Indexing diagnosis

### What GSC reported
- ~1 page indexed, 1 not indexed → almost all visibility on homepage
- Homepage ranks for 25+ query variants (broad “saudi startups” terms + brand typos)

### What we verified live + in code

| Check | Result |
|--------|--------|
| `robots.txt` | OK — `Allow: /`, sitemap declared |
| `sitemap.xml` | OK in prod (HTTP 200, ~138 `<loc>`). Includes `/`, `/about`, `/faq`, `/submit`, 117 `/company/*`, city/sector/stage hubs |
| Homepage `noindex` | None |
| Homepage canonical | `https://buildsaudi.co` |
| Meta description | Present |
| JSON-LD | WebSite + ItemList + FAQPage on home; Organization/JobPosting on company pages |
| Homepage `<h1>` | **MISSING** — logo is a `<div>` with aria-label in `components/home-client.tsx` |
| Homepage render | **CSR-heavy** — `HomeClient` is `"use client"`; company grid may not be in initial HTML for bots |
| Hot companies | Link to **external** websites, not `/company/[slug]` |
| `/coming-soon` | Thin page, **no metadata**, not in sitemap — **prime suspect for the 1 Not indexed URL** |
| `/submit` | Client component, **no `metadata` export** |
| `/v/*` (a/b/c/pixel/newspaper/retro) | **Indexable** (no `robots: { index: false }`) — should be noindexed |
| Mobile viewport | `userScalable: false` + `maximumScale: 1` in `app/layout.tsx` — bad for mobile UX/SEO |

### Root cause (most likely)
Not a broken sitemap. Google discovered few pages / is not indexing deep pages because:
1. Crawl equity funnels through a JS-heavy homepage without H1
2. Weak internal linking to `/company/*` and job hubs from crawlable HTML
3. Thin/utility URLs (`/coming-soon`, experiments) polluting discovery

### Boss must confirm in GSC
1. Open **Indexing → Page indexing** → note the exact Not indexed URL + reason code
2. **URL Inspection** on: `/`, `/coming-soon`, `/submit`, `/company/tamara`, `/jobs/riyadh`, `/faq`
3. After P0 deploy: resubmit sitemap + Request indexing on top hubs

---

## B — Quick-win keywords

| Query | Pos (GSC) | Intent | Action |
|--------|-----------|--------|--------|
| `buildyd-ksa` | 5.0 | Brand/typo | Disambiguate on `/about` + clear brand in title |
| `embuild saudi` | 9.8 | Brand/typo | Same |
| `build arabia` | 11.7 | Brand-ish | Homepage brand + Saudi startups framing |
| `startup jobs` | 15.3 | Core | H1 + above-fold copy; strengthen `/jobs/riyadh` |

### Proposed title / meta (CTR lift)

**Homepage title**  
Current: `BuildSaudi — Startup Jobs in Saudi Arabia`  
Proposed: `Startup Jobs in Saudi Arabia — 117+ Companies | BuildSaudi`

**Homepage description**  
Proposed: `Browse 117+ funded Saudi startups hiring now. Filter by city, sector, stage — apply direct.`

**/jobs/riyadh title**  
Proposed: `Riyadh Startup Jobs — 114 Companies Hiring | BuildSaudi`

**/about title**  
Proposed: `About BuildSaudi — Saudi Startup Jobs Directory (not Buildyd / Embuild)`

Files:
- `app/page.tsx` (metadata)
- `app/layout.tsx` (defaults / OG)
- `app/jobs/[city]/page.tsx`
- `app/about/page.tsx`

---

## C — Topic landing page plan (no code yet)

`lib/seo.ts` already defines `roles[]` but **there is no `/jobs/role/[role]` route** and roles are not in `app/sitemap.ts`. That’s the biggest content gap.

| Priority | URL | Primary keyword cluster | Notes |
|----------|-----|-------------------------|--------|
| 1 | `/saudi-startups` | saudi startups, new companies in saudi arabia | Directory intent currently stuck on homepage (pos 30–55) |
| 2 | `/jobs/role/software-engineer` | software engineer / startup jobs | Use existing `roles` data |
| 3 | `/jobs/role/ai-ml-engineer` | AI jobs Saudi | Ties to Humain, Lucidya, etc. |
| 4 | Enrich `/jobs/sector/fintech` | fintech jobs saudi | Page exists — add depth + FAQ |
| 5 | Keep `/jobs/riyadh` | startup jobs riyadh | Live — polish H1 + internal links |

**Pattern to copy:** `app/jobs/[city]/page.tsx` + `app/jobs/sector/[sector]/page.tsx`  
**Design:** Stitch mockups → `docs/DESIGN.md` / `docs/reference/` before coding  
**Marketing:** one channel = WhatsApp Maps outreach already defined; SEO pages support inbound for job seekers

---

## D — Implementation checklist for coding agent

### P0 (do first)
- [ ] Change homepage logo to semantic `<h1>` (or add H1 with tagline)
- [ ] `robots: { index: false, follow: false }` on `/coming-soon` and all `/v/*`
- [ ] Add `metadata` (+ canonical) to `/submit`
- [ ] Point “hot companies” to `/company/[slug]`
- [ ] Remove `userScalable: false` / `maximumScale: 1` from viewport
- [ ] Ask Boss to confirm Not indexed URL in GSC, then Request indexing

### P1
- [ ] Ship title/meta rewrites (section B)
- [ ] Footer: links to `/jobs/riyadh`, `/jobs/jeddah`, top sectors, `/faq`, `/saudi-startups` (when live)
- [ ] Reduce CSR bailout: server-render a crawlable company list snippet on home
- [ ] Redeploy + purge Vercel cache so sitemap `lastmod` refreshes
- [ ] Ingest GSC query CSV filtered to US / NL / DE / UK (zero-click impressions)

### P2
- [ ] Implement `/jobs/role/[role]` from `lib/seo.ts` `roles`
- [ ] Add role URLs to `app/sitemap.ts`
- [ ] New `/saudi-startups` landing (Stitch first)
- [ ] Enrich sector pages with unique copy (not thin templates)

### P3 (later)
- [ ] Backlinks / content depth for pos 30–99 queries
- [ ] Arabic hreflang strategy if AR content becomes first-class (today `lang` flips client-side only)
- [ ] Okara.ai weekly distribution after pages ship

### Out of scope / do not
- Do not index A/B test variants under `/v/`
- Do not build blog until P0+P1 done
- No new npm libraries without asking Boss

### Key files
- `app/sitemap.ts`, `app/robots.ts`
- `app/layout.tsx`, `app/page.tsx`
- `components/home-client.tsx`
- `app/coming-soon/page.tsx`, `app/submit/page.tsx`, `app/v/**`
- `lib/seo.ts`, `app/jobs/**`, `app/company/[slug]/page.tsx`

### Still needed from Boss
1. GSC Not indexed reason (screenshot or exact URL + reason)
2. Optional: Queries CSV + Countries×Queries CSV (last 28d)
3. Go/no-go: implement P0 in this repo now?
