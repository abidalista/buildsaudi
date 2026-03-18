# Saudi Startup Jobs Board — Full Project Brief
**For Claude Code — March 2026**

---

## The Idea

A curated job board for Saudi Arabia's startup ecosystem. Think Wellfound (AngelList) or BuildList.xyz/jobs — but Saudi-first, Arabic-friendly, and focused on the Vision 2030 startup wave.

**Reference:** https://buildlist.xyz/jobs

**The gap:** No one owns this space. Bayt and LinkedIn are generic noise. Wellfound/startup.jobs have no local brand, no Arabic, no Saudi curation. The startup ecosystem grew 236.8% in 2025, Riyadh is #23 globally — 1,600+ active startups and nowhere curated to find jobs at them.

---

## The Model (Growth-First, NOT Monetization-First)

Most successful marketplaces don't start with charging. You build supply, build demand, then monetize. Charging too early kills both sides.

### Phase 1 — Build Supply (Week 1)
- Manually seed 50-100 quality Saudi startup job listings
- Reach out to companies directly — offer free listings forever (for now)
- Source from: FWDstart newsletter, Zero to 1 newsletter, Flat6Labs portfolio, STV portfolio, Sanabil companies
- **Key insight:** Most Saudi startups use ATS platforms (Breezy, Greenhouse, Workable, Lever, Ashby) — NOT /careers on their main site. You MUST find the ATS URL for each company, not just check their homepage.

### Phase 2 — Build Demand (Weeks 2-4)
- Run ads (SAR 50-100 on X/Instagram) targeting "Saudi tech jobs", "وظائف تقنية"
- Post every new listing on X in Arabic
- Weekly newsletter (Beehiiv, free tier)
- Goal: 500-1,000 job seeker signups in first month

### Phase 3 — Use Demand as Leverage (Month 2)
- Go back to companies with real numbers: "150 job seekers in 5 days"
- DM company founders/HR on LinkedIn and X
- Once companies see real applicants coming, they'll pay for featured slots

### Phase 4 — Monetize (Month 3+)
- Featured/pinned listings (SAR 300-500)
- Newsletter spotlight (SAR 500-800 per send)
- Recruiter database access (monthly sub)
- Accelerator partnerships (Flat6Labs, STV pay for portfolio access)

---

## Outreach DM Templates (for when you have traffic numbers)

**English (LinkedIn):**
> Hey [name], launched a Saudi startup jobs board last week — [X] job seekers signed up in the first 7 days, mostly engineers and PMs looking to join early-stage companies. Noticed [Company] isn't listed yet. Want me to add your open roles? Free for now, takes 5 minutes.

**Scarcity angle (before you have numbers):**
> Hey [name], building Saudi's first curated startup jobs board — only listing companies doing something interesting (your [Series A / AI product] caught my eye). Opening it to 10 companies this week before public launch. Want [Company] on there?

**Arabic (X/Twitter DM):**
> السلام عليكم [name]، شغال على أول job board متخصص للشركات الناشئة في السعودية. عندنا [X] شخص مسجلين من مهندسين ومنتج وبيزنس. ما شفت [Company] مدرجة — تحب أضيف وظائفكم؟ مجاني الحين.

**The rule:** always free + zero friction. You're giving them distribution, not selling. Money comes later.

---

## Technical Architecture

### MVP Stack (fastest path to live)
- **Softr + Airtable** — live in 3-5 days, near-zero cost
- Airtable = database (companies + jobs + categories)
- Softr = frontend with filtering, search, company pages
- Submit form = Airtable form for companies to add listings (you review before publishing)

### Proper Build (Next.js — if you want to own it)
- Next.js frontend
- Airtable or Supabase as database
- Scraper script to auto-pull jobs from ATS platforms
- Cron job to refresh listings daily

### The Scraper (critical — this is where the MVP failed)
The first scraper pass found only 19 jobs from 32 companies because it checked /careers on main sites. **Wrong approach.**

**Correct approach:**
1. For each company, search: `"company name" breezy.hr OR greenhouse.io OR workable.com OR lever.co OR ashby.com`
2. Fetch the actual ATS page and extract ALL open roles
3. Fall back to LinkedIn jobs search: `"company name" jobs site:linkedin.com/jobs`
4. Store company → ATS URL mapping so future runs are instant

**Example of what was missed:**
- SiFi has 5+ roles at `sifi.breezy.hr` but scraper found 1 (from Bayt)
- SiFi's real ATS: https://sifi.breezy.hr — roles include: Cybersecurity Specialist, Account Manager, Customer Care Agent, Accountant, Senior .NET Developer

---

## Current Data Files

Two research files are attached:
- `saudi-startup-jobs.json` — 19 scraped job listings (incomplete, needs re-scraping)
- `saudi-startup-jobs-README.md` — full summary of what was found and what was missed

### Companies confirmed to be hiring (check their ATS properly):
| Company | Stage | ATS/Source | Notes |
|---------|-------|-----------|-------|
| Tamara | Unicorn/Series C | greenhouse.io/tamara | 10+ roles |
| Foodics | Series B | workable.com/foodics | 38+ roles |
| Cognna | Series A | Bayt + LinkedIn | Cybersecurity roles |
| SiFi | Seed | sifi.breezy.hr | 5+ roles confirmed |
| WakeCap | Series A | wakecap.com/recruitment | Engineering |
| Madfu | Seed | LinkedIn | BNPL fintech |

### Priority companies to re-check (likely hiring but missed):
Sawt, Governata, Aamar, Cashin, Muhlah, Sary, Juthor, MUHIDE

---

## Market Context

- Saudi startup ecosystem: 1,600+ active startups
- Ecosystem grew 236.8% in 2025
- Riyadh: #23 globally (#3 MENA), fastest-rising city in the world
- Vision 2030 requires 663,000 additional skilled workers by 2030
- No curated Arabic/Saudi startup jobs board exists
- Key accelerators generating hiring companies: Flat6Labs KSA, STV, Sanabil, BIAC, 500 Global Riyadh

## Where Saudi Startup Job Seekers Are
1. **X (Twitter)** — biggest channel, hashtags: #وظائف_تقنية, #ريادة_الأعمال
2. **LinkedIn** — standard for mid/senior level
3. **WhatsApp groups** — Saudi tech community, invite-only but gold for early distribution
4. **Telegram** — some Saudi tech communities

## Newsletter Sources (for finding more startups)
- **FWDstart** (newsletter@mail.fwdstart.me) — MENA startup news, weekly
- **Zero to 1** — Saudi/Arabic startup newsletter
- Both arrive at theamsh@gmail.com

---

## What to Build First

1. **Proper scraper** — ATS-aware, finds real job URLs for all companies
2. **Database** — structured JSON/Airtable with all scraped jobs
3. **Simple frontend** — job listings page, filterable by role/sector/city
4. **Submit form** — companies can submit jobs manually (fallback)
5. **Email capture** — collect job seeker emails from day 1

---

## Success Metrics
- Week 1: 50+ job listings live, site published
- Week 2: 500+ job seeker signups (after ads)
- Month 1: 10 companies reach out proactively
- Month 3: first paid listing

---

*Brief compiled: 2026-03-14*
