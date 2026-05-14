# BuildSaudi — Launch Plan v2
**a curated directory of companies building the future of saudi**

---

## the pivot

we are NOT a job board on day 1. we are a curated company directory.

each company gets a card. each card has a "view jobs" button that links directly to the company's real careers page (greenhouse, workable, breezy, linkedin, whatever they use). we don't host job listings. we don't scrape. we just curate the best companies and point people to their careers pages.

this is exactly how buildlist works. the directory IS the product. jobs are just the reason people come.

---

## why this is better

1. **ships in 2 days instead of 2 weeks.** no scraper, no job data model, no stale listings to maintain. just a list of companies with metadata.
2. **zero maintenance.** job listings change daily. company profiles don't. you add a company once and it stays accurate for months.
3. **the curation IS the value.** "these are the companies worth joining in saudi" is a stronger pitch than "here are 200 job listings." the editorial taste is what differentiates you from bayt and qureos.
4. **easier to grow supply.** adding a company takes 5 minutes (name, logo, stage, sector, city, careers URL). no need to wait for scraper results or ATS API access.
5. **companies love it.** you're giving them free exposure and sending traffic to their careers page. zero friction, zero cost to them. they'll share it.

---

## what the site looks like

### homepage
- hero: "a curated directory of companies building the future of saudi"
- subtext: "no fluff. just roles at companies making real things that matter. let's get you building."
- email capture: "get weekly updates on who's hiring"
- browse button: "explore companies"

### company directory (main page, /companies or /)
- grid of company cards
- filters: sector (AI, fintech, proptech, B2B SaaS, logistics, etc), stage (seed, series A, series B, unicorn), city (riyadh, jeddah, remote)
- search bar

### company card
- company logo
- company name
- one line description
- sector tag(s)
- stage badge (seed, series A, etc)
- city
- "view jobs →" button (links to their careers page, opens in new tab)

### company detail page (/companies/[slug])
- logo, name, description
- stage, sector, city
- website link
- linkedin link
- founded year (if known)
- funding amount (if known)
- "view open roles →" big CTA button (links to careers page)

### NO job listings page on day 1
- no individual job cards
- no job filters by role type or experience level
- those come in v2 when you add the scraper

---

## data model (dead simple)

one table in airtable: **companies**

```
- name
- slug (for URL)
- logo_url
- description (1-2 sentences)
- sector (multi-select: AI, fintech, proptech, B2B SaaS, logistics, healthtech, edtech, cybersecurity, ecommerce)
- stage (seed, series A, series B, growth, unicorn)
- city (riyadh, jeddah, dammam, remote)
- website_url
- linkedin_url
- careers_url (THIS IS THE KEY FIELD — where "view jobs" links to)
- founded_year (optional)
- funding_amount (optional)
- is_hiring (boolean, default true)
- featured (boolean, for future monetization)
- added_date
```

that's it. one table. no jobs table, no subscribers table yet (email capture goes to beehiiv directly).

---

## company list (ready to add)

### confirmed careers URLs

| company | sector | stage | careers URL |
|---------|--------|-------|-------------|
| HUMAIN | AI infrastructure | mega | humain.com/careers (verify) |
| Tamara | fintech/BNPL | unicorn | job-boards.eu.greenhouse.io/tamara |
| Tabby | fintech/BNPL | unicorn | tabby.ai/en-AE/careers |
| Foodics | B2B SaaS/restaurant | series C | apply.workable.com/foodics |
| Salla | ecommerce | pre-IPO | salla.com/careers (verify) |
| Unifonic | cloud/comms | series B | unifonic.com/careers (verify) |
| Sary | B2B marketplace | series B | apply.workable.com/sary |
| Lean Technologies | fintech/API | series A | lean.sa/careers (verify) |
| HyperPay | fintech/payments | series A | hyperpay.com/careers (verify) |
| Cognna | AI/cybersecurity | series A | cognna.com/careers (verify) |
| SiFi | fintech/spend | seed | sifi.breezy.hr |
| Mozn | AI/analytics | series A | mozn.sa/careers (verify) |
| Lucidya | AI/NLP | series A | lucidya.com/careers (verify) |
| Hala | fintech/banking | series B | hala.com/careers (verify) |
| Gathern | travel/rentals | series B | gathern.co/careers (verify) |
| Calo | foodtech | series A | calo.app/careers (verify) |
| Rasan | govtech | growth | rasan.sa/careers (verify) |
| Classera | edtech | series A | classera.com/careers (verify) |
| Erad | fintech/SMB | series A | erad.com/careers (verify) |
| MUHIDE | fintech/trade | series A | muhide.com/careers |
| Governata | AI/data governance | seed | governata.com/careers (verify) |
| Aamar | proptech | seed | aamar.sa/careers (verify) |
| Muhlah | fintech/microfinance | seed | muhlah.sa/careers (verify) |
| CASHIN | fintech/POS | series A | cashin.com.sa/careers (verify) |
| Madfu | fintech/BNPL | seed | linkedin.com/company/madfu-limited |
| WakeCap | IoT/construction | series A | wakecap.com/recruitment |
| Nabt | agritech | seed | linkedin.com/company/nabt-app |
| DEEP.SA | AI/sovereign | seed | deep.sa/careers (verify) |
| Quantum Platform | AI | seed | quantumplatform.sa/careers (verify) |
| BARQ | logistics | seed | barq.sa/careers (verify) |
| Soum | marketplace | series A | soum.sa/careers (verify) |
| D360 bank | digital banking | growth | d360bank.com/careers (verify) |
| TruKKer | logistics | growth | trukker.com/careers (verify) |
| Jahez | food delivery | public | jahez.net/careers (verify) |
| Lendo | fintech/lending | series A | lendo.sa/careers (verify) |
| Palm.hr | HR tech | seed | palm.hr/careers (verify) |
| Penny Software | spend management | seed | pennysoftware.com/careers (verify) |
| Dinar | fintech/investment | growth | dinar.sa/careers (verify) |
| Tamra Capital | fintech/wealth | growth | tamracapital.sa/careers (verify) |

### mega projects (traffic magnets)
| company | careers URL |
|---------|-------------|
| NEOM | careers.neom.com |
| Red Sea Global | redseaglobal.com/careers (verify) |
| Diriyah Company | diriyah.sa/careers (verify) |
| Riyadh Air | riyadhair.com/careers (verify) |

---

## launch checklist (this week)

### day 1 (today): data
- [ ] create airtable base with companies table
- [ ] add first 20 companies with verified careers URLs
- [ ] find/download company logos (use clearbit logo API: logo.clearbit.com/domain.com)

### day 2: build in cursor
- [ ] company directory page with grid layout (match buildlist)
- [ ] company card component (logo, name, description, tags, "view jobs →")
- [ ] company detail page template
- [ ] filter sidebar (sector, stage, city)
- [ ] search bar
- [ ] email capture (connect to beehiiv)
- [ ] wire up airtable as data source

### day 3: polish and deploy
- [ ] add remaining companies (target: 40+)
- [ ] responsive design (mobile)
- [ ] SEO meta tags on every page
- [ ] JobPosting structured data (optional, save for v2)
- [ ] fix vercel deployment, get buildsaudi.co live
- [ ] submit sitemap to google search console

### day 4: launch
- [ ] launch tweet (english + arabic)
- [ ] linkedin post
- [ ] first 10 DMs to founders of listed companies: "hey, listed [company] on buildsaudi.co — saudi's curated startup directory. check it out, let me know if anything needs updating"
- [ ] this DM is genius because you're telling them they're already on it, not asking permission

### day 5: measure
- [ ] check analytics (page views, top pages, referrers)
- [ ] check email signups
- [ ] check DM responses
- [ ] add any companies that founders suggest

---

## v2 (week 3+, only after directory is live and growing)

- add job listings (scraper pulls from ATS, displayed on company pages)
- job filters (role type, experience level)
- salary guides
- newsletter with actual job listings
- arabic pages

---

## what to tell cursor

update the cursor prompt to reflect this new approach:

"this is a company directory, NOT a job board on day 1. each company has a card with a 'view jobs' button that links to their external careers page. there are no individual job listings on the site. the main page is a filterable grid of company cards. each company has a detail page. the data source is a single airtable table called 'companies.' match the buildlist.xyz visual style exactly."

---

*launch plan v2 — march 2026*
