# Saudi Startup Jobs Board — Execution Plan
**Date:** March 17, 2026

---

## 1. Technical Architecture Decision

### recommendation: Softr/Airtable MVP, migrate to Next.js at 1,000 weekly visitors

**Softr + Airtable (ship this week)**

pros:
- live in 3 days. you already have 19 listings and know what the data model looks like
- zero code means you focus entirely on supply (scraping + outreach) and demand (X, newsletters)
- airtable forms = instant company submission flow
- softr handles filtering, search, company pages out of the box
- cost: $0 to $49/month

cons:
- softr sites look generic. you can customize but it wont feel like a premium brand
- no custom scraper integration (you'd run the scraper separately and push to airtable via API)
- airtable caps at 1,200 records on free tier, 50k on paid
- SEO is weak on softr. no server side rendering, limited meta control

**Next.js + Supabase (build in week 3 or 4)**

pros:
- full control over design, SEO, performance
- can wire scrapers directly into the database via cron jobs
- supabase gives you auth, email capture, real time updates
- scales to thousands of listings without tool limits
- arabic RTL support done properly

cons:
- 2 to 3 weeks to ship something decent, maybe more
- you're coding instead of selling. every hour on the frontend is an hour not spent on outreach
- no one cares about your stack when you have 19 listings. they care when you have 200

**verdict:** ship softr this week. your constraint is supply and demand, not technology. the moment you hit 500 weekly visitors or 100 listings, start the next.js build in parallel. the airtable data model transfers cleanly to supabase (both are just postgres under the hood for supabase).

---

## 2. The Scraper Fix

the first scraper checked /careers on company websites. wrong approach. most saudi startups use third party ATS platforms.

### confirmed ATS URLs (from research)

| company | ATS platform | URL | open roles |
|---------|-------------|-----|------------|
| Tamara | Greenhouse | job-boards.eu.greenhouse.io/tamara | 10+ |
| Foodics | Workable | apply.workable.com/foodics | 38 to 88 |
| SiFi | Breezy HR | sifi.breezy.hr | 5+ |
| Sary | Workable | apply.workable.com/sary | multiple (was showing 0 on LinkedIn) |
| MUHIDE | Custom | muhide.com/careers/ | unknown |
| Juthor | Custom | juthor.com.sa/career | unknown |

### companies that need manual linkedin check (recently funded, likely hiring)

| company | funding | why they're probably hiring |
|---------|---------|---------------------------|
| Governata | $4M seed (jan 2026) | founded by ex Foodics COO. just raised, definitely building team |
| Aamar | $4M seed (jan 2026) | proptech, just raised. no public ATS yet |
| Muhlah | $7.5M seed (2026) | shariah compliant microfinance. big raise for seed, hiring for sure |
| CASHIN | $16M series A | POS fintech, well funded. probably using internal recruiters or linkedin only |

### proper scraping strategy (3 tiers)

**tier 1: ATS API scraping (highest quality)**
most ATS platforms have public JSON endpoints for job listings:
- greenhouse: `boards-api.greenhouse.io/v1/boards/{company}/jobs`
- workable: `apply.workable.com/api/v1/widget/{company}/jobs`
- breezy: `{company}.breezy.hr` (scrape HTML, no public API)
- lever: `api.lever.co/v0/postings/{company}`
- ashby: `api.ashbyhq.com/posting-api/job-board/{company}`

build a mapping table: company name → ATS platform → board slug. once you have this, scraping is trivial. these endpoints return structured JSON with title, location, department, apply URL.

**tier 2: google dorking for ATS discovery**
for companies where you dont know the ATS, run:
```
"company name" site:breezy.hr OR site:greenhouse.io OR site:workable.com OR site:lever.co OR site:ashby.com
```
this catches companies you havent mapped yet. run this for every company in your target list.

**tier 3: linkedin jobs fallback**
for companies with no ATS (seed stage, pre product):
```
"company name" site:linkedin.com/jobs
```
linkedin requires auth for full data, but you can get title + location from search snippets. these companies are lower priority anyway since they probably have 0 to 2 open roles.

### scraper architecture
1. maintain a `company_ats_map.json` with company → platform → slug
2. for each company, hit the appropriate API endpoint
3. normalize output to a standard schema (title, company, location, type, apply_url, source, scraped_at)
4. push to airtable via API (for softr MVP) or supabase (for next.js)
5. run daily via cron. flag stale listings (older than 45 days)

---

## 3. Growth-First vs Monetization-First

### your brief says growth first. i agree, with one modification.

the standard marketplace playbook is right: build supply → build demand → monetize. charging on day 1 kills a two sided marketplace because you have nothing to offer either side yet.

**what the brief gets right:**
- free listings to seed supply. correct. you need 50+ listings before the board looks real
- use demand numbers as leverage. correct. "150 job seekers signed up in 5 days" is the pitch that converts free companies into paying ones
- DM outreach with scarcity angle. correct. "opening to 10 companies before public launch" creates urgency

**one modification: add an email capture wall earlier**

dont just list jobs openly. add a "get notified about new startup jobs" email gate on the site from day 1. reason: your email list IS your monetization leverage. when you go back to companies in month 2 and say "we have 800 job seekers on our list, 60% are engineers", that is what makes them pay.

**revised phase sequence:**

phase 1 (this week): seed 50+ listings via scraper + manual outreach. site goes live on softr. email capture form prominent on every page.

phase 2 (week 2 to 3): run targeted ads on X (SAR 50 to 100/day). post every new listing in arabic on X. pitch to EcosystemSaudi and FWDstart newsletters for editorial feature. goal: 500 email signups.

phase 3 (week 4): go back to companies with numbers. switch DM template from "we're launching" to "we have X job seekers, Y% engineers, here's the breakdown by role type." offer featured listings for SAR 300 to 500.

phase 4 (month 2+): introduce paid tiers. starter SAR 500/listing. featured SAR 900/listing. newsletter spotlight SAR 500 to 800.

---

## 4. Competitive Positioning

### benchmarking the competition

| platform | model | startup focus | pricing | weakness |
|----------|-------|---------------|---------|----------|
| Bayt | volume board, all sectors | none | SAR 400 to 1,800/listing, SAR 1,500/mo premium | 500 applications per post, 490 irrelevant. no curation, no startup identity |
| LinkedIn | professional network | none | SAR 300 to 1,500/post | expensive, noisy, competes with every corporate job in the kingdom |
| Qureos | AI powered recruitment, pay per hire | none | free to post, pay when you hire (no upfront fees) | 200k+ listings, AI matching, saudization tools, arabic support. strong product but positioned as a recruitment platform, not a startup community. no curation layer, no brand signal, no "these are the interesting companies" editorial voice. its a better bayt, not a buildlist. they also do employer of record, compliance, gratuity calculators. they're building an HR suite, not a taste maker |
| Jadarat | government portal | none | free | public sector focus, saudization compliance. not where startup talent hangs out |
| GulfTalent | mid to senior corporate | none | ~$5,000/year | corporate only, no startup presence |
| Wellfound | global startup jobs | yes (globally) | varies | not localized for saudi, no arabic, no local brand, no GCC community |
| startup.jobs | global startup board | partial | varies | has a saudi filter but its a generic global board. no curation, no brand |

### why qureos is not your competitor (but looks like one)

qureos is the closest thing to a real threat but they're playing a different game. they're building an AI recruitment platform with matching, compliance tools, calculators, EOR services. thats an HR tech company. you're building a curated directory with editorial taste and community signal. the difference: qureos helps you find candidates efficiently. you help the best companies attract the right people by signaling quality. buildlist model, not indeed model.

the risk: if qureos ever adds a "startup spotlight" or curation layer, they have the distribution to compete. but HR tech companies almost never do editorial curation well. its a different DNA.

### pitch to companies (why post here instead of bayt/linkedin/qureos)

**the problem with bayt:** volume, not quality. companies post on bayt and get 500 applications, 490 of which are irrelevant. HR teams spend days filtering. for a 15 person startup, thats not just annoying, its a waste of a week of someone's time.

**the problem with linkedin:** expensive and noisy. SAR 300 to 1,500 per post, and you're competing with every corporate job in the kingdom. no startup identity, no curation signal.

**the problem with qureos:** better than bayt (AI matching, pay per hire, no upfront cost) but still a volume platform. 200k listings. no editorial voice, no "these are the companies worth joining" signal. its a hiring tool, not a brand builder.

**your pitch:**
- "we only list companies doing interesting things. being on this board is a signal that you're building something worth joining."
- "our job seekers self select. they come here because they want startup life, not corporate. your application quality goes up."
- "free to list right now. we're building the audience. you get distribution at zero cost."

### pitch to job seekers (why come here instead of bayt/linkedin)

**the problem for job seekers:** if you want to work at a saudi startup, you have to manually check 50 linkedin pages, follow founders on X, and hope you see a job post. there is no single place to browse.

**your pitch:**
- "every job here is at a real, funded saudi startup. no corporate filler, no recruitment agency spam."
- "filter by what matters: stage (seed vs series A vs unicorn), sector (fintech, AI, proptech), role type."
- "get weekly emails with new startup jobs before they hit linkedin."

### brand positioning summary
you are not a job board. you are a curated directory of the best startup jobs in saudi arabia. the word "curated" does all the work. it means quality control, it means taste, it means if you see a company here, someone vetted it. this is exactly what BuildList does in the US and nobody does it in Saudi.

---

## 5. Immediate Next Actions (48 Hours)

### ships this week (non negotiable)

1. **fix the scraper and get to 50+ listings (today/tomorrow)**
   - add the confirmed ATS URLs from section 2 above
   - sary alone (workable) + foodics (workable, 38+ roles) + sifi (breezy, 5+ roles) = probably 50+ new listings
   - run google dork queries for the "no jobs found" companies
   - push everything to airtable

2. **softr site live (wednesday)**
   - airtable schema: company name, logo URL, stage, sector, city, job title, type, location, salary range (optional), apply URL, posted date
   - softr pages: job listing feed (filterable), company cards, submit a job form, email signup
   - domain: something like saudistartupjobs.com or startupjobs.sa (check availability)

3. **email capture live on site (wednesday)**
   - beehiiv free tier or just airtable form
   - two lists: job seekers and companies
   - prominent CTA on every page

4. **first 10 DMs sent (thursday)**
   - linkedin DMs to HR/founders at: Tamara, Foodics, Cognna, SiFi, Sary, Governata, Aamar, CASHIN, Muhlah, MUHIDE
   - use the scarcity template from the brief (pre launch, 10 companies only)

### can wait (week 2+)

- arabic language toggle (english first is fine, most saudi startup hiring is bilingual)
- newsletter (start after you have 100+ email signups)
- X content strategy (start after site is live)
- accelerator outreach to flat6labs, STV, sanabil (week 2, after you have a live URL to show)
- next.js migration planning (week 3 at earliest)

### explicitly do NOT do yet

- monetization. zero revenue conversations for 30 days minimum
- company profile pages with culture content (phase 2)
- job seeker profiles or resume uploads (phase 2)
- partnership deals with accelerators (need a live product first)

---

## 6. JSON Data Audit

### what you have
19 real listings from 6 companies. heavily skewed toward tamara (10 of 19). foodics has 38+ roles but only 4 were scraped. sifi has 5+ but only 1 was scraped.

### confirmed misses (scraper failed to find real jobs)

| company | what the scraper found | what actually exists |
|---------|----------------------|---------------------|
| Sary | "0 active linkedin jobs" | multiple roles on apply.workable.com/sary |
| SiFi | 1 role (bayt) | 5+ roles on sifi.breezy.hr |
| Foodics | 4 roles (bayt + workable) | 38 to 88 roles on workable + glassdoor |
| MUHIDE | no jobs found | careers page at muhide.com/careers/ |
| Juthor | no jobs found | careers page at juthor.com.sa/career |

### likely hiring but no public ATS found
- Governata ($4M seed, jan 2026, ex Foodics COO founding team)
- Aamar ($4M seed, jan 2026, proptech)
- Muhlah ($7.5M seed, 2026, fintech)
- CASHIN ($16M series A, fintech)

these four need manual linkedin checks or direct DMs to founders asking where they post jobs.

### actually not hiring (leave alone for now)
most of the flat6labs cohort 4 companies (devsy, dphish, hollat, mrrha) are pre hiring. they graduated nov 2024, still building product. monitor quarterly.

sawt: no online presence found at all. might be dead or pre launch.

### next scraper run priority list
1. foodics (workable API, should yield 30+ new listings alone)
2. sary (workable API)
3. sifi (breezy scrape, 5+ roles)
4. tamara (greenhouse API, verify current list is complete)
5. muhide (scrape muhide.com/careers/)
6. juthor (scrape juthor.com.sa/career)
7. governata, aamar, muhlah, cashin (linkedin search as fallback)

after this run you should have 80 to 120 listings. thats enough to launch.

---

*plan compiled: march 17, 2026*
