# BuildSaudi Launch Plan

a curated directory of companies building the future of saudi.
inspired by buildlist.xyz. adapted for the saudi startup ecosystem.

---

## what we are

a directory. not a job board. not a recruitment platform.

we curate the best companies in saudi's startup ecosystem. each company gets a card with a "view jobs →" button that links to their real careers page. we don't host job listings. we point people to the right place.

the curation is the product. if you're on buildsaudi, you're building something interesting.

---

## site structure (match buildlist)

```
buildsaudi.co/                    → company directory (main page, filterable grid)
buildsaudi.co/companies/[slug]    → company detail page
buildsaudi.co/sectors             → sector browse page
buildsaudi.co/sectors/[sector]    → sector filtered view
buildsaudi.co/submit              → company submission form
```

### pages to build

1. **main directory page** (`/`)
   - hero: "a curated directory of companies building the future of saudi"
   - sub: "no fluff. just roles at companies making real things that matter."
   - email capture: "get weekly updates" (beehiiv)
   - company grid below
   - filters: sector, stage, city
   - search bar
   - "hot companies" featured section at top (3 picks)

2. **company card** (in grid)
   - logo
   - name
   - one line description
   - sector tag
   - stage badge
   - city
   - "view jobs →" (links to external careers page, new tab)

3. **company detail page** (`/companies/[slug]`)
   - logo + name
   - description (2-3 sentences)
   - sector, stage, city
   - founded year
   - funding raised
   - team size (if known)
   - website link
   - linkedin link
   - "view open roles →" big CTA (external careers link)

4. **sectors page** (`/sectors`)
   - grid of sector cards
   - each links to filtered view

5. **submit page** (`/submit`)
   - "know a company building something interesting? tell us."
   - fields: company name, website, linkedin, sector, why they're interesting
   - feeds to airtable moderation queue

6. **footer**
   - sectors: AI, fintech, proptech, B2B SaaS, logistics, healthtech, edtech, cybersecurity, ecommerce
   - cities: riyadh, jeddah, dammam, remote
   - stages: unicorn, series B+, series A, seed
   - links: about, submit a company, newsletter, privacy
   - social: X, linkedin
   - "built by abidal"

---

## sectors (saudi adapted from buildlist)

buildlist uses: AI & Software, Robotics, Space, Energy, Defense, Biotech, Manufacturing, Logistics

buildsaudi uses:
1. **AI & Software** (HUMAIN, Mozn, Lucidya, Cognna, DEEP.SA)
2. **Fintech & Payments** (Tamara, Tabby, HyperPay, Lean, SiFi, Hala, Erad, Lendo)
3. **B2B SaaS** (Foodics, Salla, Unifonic, Classera)
4. **Proptech** (Aamar, Rize, Ajras)
5. **Logistics & Supply Chain** (Sary, TruKKer, BARQ, Nabt)
6. **Healthtech & Biotech** (tbd, research more)
7. **Marketplace** (Soum, Jahez, Calo, Gathern)
8. **Cybersecurity** (Cognna, dPhish)
9. **GovTech & RegTech** (Rasan, STAMP, Governata)
10. **Mega Projects** (NEOM, Red Sea Global, Diriyah, Riyadh Air)

---

## airtable schema

one table: **companies**

```
name              (text)
slug              (text, for URL)
logo_url          (url, use logo.clearbit.com/[domain] as fallback)
description       (long text, 1-2 sentences)
sector            (single select)
stage             (single select: seed, series A, series B, growth, unicorn, mega)
city              (single select: riyadh, jeddah, dammam, remote)
website           (url)
linkedin          (url)
careers_url       (url — WHERE "VIEW JOBS" LINKS TO)
founded_year      (number, optional)
funding_amount    (text, optional, e.g. "$198M")
team_size         (text, optional, e.g. "200+")
is_hot            (checkbox, for featured section)
status            (single select: published, draft, rejected)
added_date        (date)
```

---

## tasks

### phase 0: data (day 1)

- [ ] create airtable base with companies table using schema above
- [ ] add 20 companies with verified careers URLs (start with biggest names)
- [ ] verify each careers URL actually works (click through)
- [ ] download or reference logos (clearbit API: `https://logo.clearbit.com/tamara.co`)
- [ ] write 1-2 sentence description for each company
- [ ] mark 3 companies as "hot" for featured section

priority companies to add first:
```
HUMAIN, Tamara, Tabby, Foodics, Salla, Unifonic, Sary,
Lean Technologies, HyperPay, Cognna, Mozn, Lucidya,
Hala, Gathern, Calo, Rasan, Classera, NEOM, Erad, SiFi
```

### phase 1: build (day 2-3)

- [ ] update cursor prompt to reflect directory model (not job board)
- [ ] build main directory page with company grid
- [ ] build company card component
- [ ] build filter sidebar (sector, stage, city)
- [ ] build search bar (searches company name + description)
- [ ] build company detail page template
- [ ] build "hot companies" featured section at top
- [ ] build email capture form (beehiiv embed or API)
- [ ] build submit company form (writes to airtable)
- [ ] build footer with all sector/city/stage links
- [ ] wire up airtable as data source (read only for directory, write for submit form)
- [ ] add SEO meta tags to every page (unique title + description per company)
- [ ] add open graph tags for social sharing
- [ ] responsive design (mobile first)
- [ ] match buildlist visual style (off-white bg, clean cards, minimal shadows, generous spacing)

### phase 2: deploy (day 3)

- [ ] fix vercel deployment errors
- [ ] connect buildsaudi.co domain on vercel
- [ ] set up cloudflare DNS to point to vercel
- [ ] test all pages, all links, all filters
- [ ] test on mobile
- [ ] verify "view jobs" links open in new tab and work
- [ ] set up google search console, verify domain
- [ ] submit sitemap.xml
- [ ] set up umami analytics (deploy on vercel, free)

### phase 3: seed more companies (day 4)

- [ ] add 20 more companies (target: 40+ total at launch)
- [ ] research and verify careers URLs for each
- [ ] fill in funding amounts and team sizes where available
- [ ] write descriptions for each
- [ ] add sector pages with company counts
- [ ] cross-check: does every sector have at least 3 companies?

### phase 4: launch (day 5)

- [ ] launch tweet (english):
  "buildsaudi.co is live. a curated directory of companies building the future of saudi. 40+ startups. AI, fintech, proptech, logistics, and more. find your next role →"

- [ ] launch tweet (arabic):
  "أطلقنا buildsaudi.co — دليل متخصص لأفضل الشركات الناشئة في السعودية. أكثر من 40 شركة في الذكاء الاصطناعي والفنتك والتقنية. اكتشف وظيفتك القادمة →"

- [ ] linkedin post (professional angle):
  "launched buildsaudi.co — saudi's first curated startup directory. we only list companies doing interesting things. if you're building something real, you should be on here."

- [ ] DM 10 founders of listed companies:
  "hey [name], listed [company] on buildsaudi.co — a curated directory of companies building the future of saudi. [company] looks great on there. let me know if anything needs updating → [link to their page]"

- [ ] DM 5 ecosystem people (VCs, accelerator managers, journalists):
  "building a curated directory of saudi startups — think buildlist but for the kingdom. 40+ companies live. would love your feedback → buildsaudi.co"

- [ ] set up buffer or typefully, schedule 3 posts/day for next week

### phase 5: grow (week 2)

- [ ] add 10 more companies per day (target: 80+ by end of week 2)
- [ ] post 3x daily on X (company spotlight, ecosystem insight, sector highlight)
- [ ] send beehiiv newsletter #1 ("buildsaudi weekly: 10 companies you should know")
- [ ] pitch EcosystemSaudi and FWDstart for editorial mention
- [ ] check google search console: what's indexed? any errors?
- [ ] check analytics: top pages, traffic sources, signups
- [ ] second round of DMs (10 more companies)

### phase 6: iterate (week 3-4)

- [ ] run X ads (SAR 50-100/day) targeting saudi tech audience
- [ ] add map view (like buildlist) showing companies by location
- [ ] add "news" section or blog (first post: "best startups to work for in saudi 2026")
- [ ] start salary guides for SEO
- [ ] reach out to flat6labs, STV, sanabil for accelerator partnerships
- [ ] review metrics: are we on track for 1,000 email signups?

### phase 7: add jobs (month 2, only if directory is growing)

- [ ] build scraper (ATS APIs: greenhouse, workable, breezy)
- [ ] add jobs table to airtable
- [ ] display job listings on company detail pages
- [ ] add job filters (role type, experience level)
- [ ] this is when you become a job board. not before.

---

## metrics to track

| metric | week 1 | week 2 | week 4 | month 2 |
|--------|--------|--------|--------|---------|
| companies listed | 40 | 80 | 120 | 200 |
| page views | 500 | 2,000 | 5,000 | 15,000 |
| email signups | 50 | 200 | 500 | 1,000 |
| X followers | 50 | 200 | 500 | 1,000 |
| organic company inbound | 0 | 2 | 5 | 10 |
| newsletter subscribers | 50 | 200 | 500 | 1,000 |

## free tools

- **airtable** — database ($942 credit)
- **vercel** — hosting (free)
- **beehiiv** — newsletter (free up to 2,500 subs)
- **umami** — analytics (self hosted on vercel, free)
- **google search console** — SEO (free)
- **buffer** — social scheduling (free, 3 channels)
- **dub.co** — link tracking (free, 25 links/mo)
- **clearbit logo API** — company logos (free)
- **canva** — graphics (free)

## monetization (not yet)

wait until: 100+ companies, 1,000+ email subs, 10+ organic inbounds.
then: featured listings SAR 500, newsletter spotlight SAR 800, company profile upgrade SAR 1,500/mo.

---

*v3 — march 2026*
