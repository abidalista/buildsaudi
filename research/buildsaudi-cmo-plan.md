# BuildSaudi — CMO Launch Plan
**Date:** March 2026

---

## North Star Metrics

forget vanity metrics. only three numbers matter before monetization:

1. **job listings live on the site** — target: 100 by end of week 2
2. **email signups (job seekers)** — target: 1,000 by end of month 1
3. **organic inbound from companies** — target: 10 companies reach out to us by end of month 2

everything we do serves one of these three. if an activity doesn't move one of these numbers, we don't do it.

---

## Free Tools Stack

### analytics and tracking
- **Plausible Cloud** (free for 30 days, then $9/mo) OR **Umami** (self hosted, free forever on vercel) — privacy friendly analytics, no cookie banner needed. tracks page views, referrers, top pages, countries
- **Google Search Console** (free) — tracks which keywords you rank for, impressions, clicks, indexing status. THE most important SEO tool
- **Bing Webmaster Tools** (free) — same as google but for bing. also feeds into other search engines

### email and newsletter
- **Beehiiv** (free up to 2,500 subscribers) — newsletter platform, landing page, analytics, referral program built in. this is what buildlist likely uses
- **Airtable** (you have $942 credit) — stores subscriber data, company submissions, job listings

### social media
- **Buffer** (free plan, 3 channels, 10 scheduled posts) — schedule X and linkedin posts
- **Typefully** (free plan) — write and schedule X threads, analytics on engagement
- **F5Bot** (free) — you already use this. set up alerts for "saudi startup jobs", "وظائف شركات ناشئة", "buildsaudi" on reddit

### SEO
- **Google Search Console** (free) — keyword rankings, indexing, click through rates
- **Ahrefs Webmaster Tools** (free for site owners) — backlink monitoring, site audit
- **Schema Markup Validator** (free) — test your JobPosting structured data

### link tracking
- **Dub.co** (free plan, 25 links/mo) — short links with click tracking for DMs and social posts. know exactly which channel drives signups

### design
- **Canva** (free) — social media graphics, company logos if needed
- **OG Image Generator** — build custom open graph images for each page so social shares look good

---

## Launch Sequence (Week by Week)

### PRE-LAUNCH (before site goes live)

**day 1: set up infrastructure**
- [ ] create beehiiv account, set up "buildsaudi weekly" newsletter
- [ ] create buffer account, connect X and linkedin
- [ ] set up google search console (verify buildsaudi.co)
- [ ] set up umami or plausible analytics
- [ ] create dub.co account for link tracking
- [ ] set up airtable base (companies table, jobs table, subscribers table, submissions table)

**day 2: seed content**
- [ ] finalize company list (AI first, then expand to fintech, proptech, etc)
- [ ] run scraper on confirmed ATS URLs (tamara, foodics, sary, sifi)
- [ ] manually add any missing listings
- [ ] target: 50+ listings in airtable before site goes live

### WEEK 1: LAUNCH

**site goes live**
- [ ] deploy on vercel, connect buildsaudi.co domain
- [ ] submit sitemap to google search console
- [ ] submit sitemap to bing webmaster tools
- [ ] test all pages, filters, apply links, email capture form
- [ ] verify JobPosting structured data with schema validator

**launch day social**
- [ ] launch tweet on X (english): "buildsaudi.co is live. saudi's first curated directory of companies building the future. browse startup jobs. no fluff, no spam, just real roles at funded companies."
- [ ] launch tweet on X (arabic): "أطلقنا buildsaudi.co — أول دليل متخصص للشركات الناشئة في السعودية. وظائف حقيقية في شركات ممولة. بدون سبام."
- [ ] linkedin post announcing launch
- [ ] tag founders of companies listed (tamara, foodics, sary, etc) in replies

**outreach batch 1 (10 DMs)**
- [ ] DM 10 startup founders/HR on linkedin using scarcity template
- [ ] targets: tamara, foodics, sary, cognna, sifi, HUMAIN, lean technologies, unifonic, hala, classera
- [ ] track responses in airtable

**measure:**
- page views (target: 500 in week 1)
- email signups (target: 50 in week 1)
- DM response rate (target: 30%)

### WEEK 2: CONTENT ENGINE

**X content (3 posts per day)**
- morning: job spotlight (one specific role, tag the company)
- afternoon: company spotlight (what they do, why they're interesting, link to their page)
- evening: ecosystem insight (funding news, hiring trends, vision 2030 data)

**outreach batch 2 (10 more DMs)**
- [ ] DM 10 more companies
- [ ] switch to companies that are actively hiring (confirmed ATS URLs)
- [ ] use numbers template if you have them: "X job seekers signed up in the first week"

**newsletter pitch**
- [ ] email EcosystemSaudi editor: pitch buildsaudi as a resource to feature
- [ ] email FWDstart: offer to cross promote (they cover startups, you list their jobs)
- [ ] email Wamda: pitch "saudi's first curated startup jobs board" story angle

**SEO check**
- [ ] review google search console: which pages are indexed? any errors?
- [ ] check which keywords are getting impressions
- [ ] fix any crawl errors

**measure:**
- page views (target: 1,500 cumulative)
- email signups (target: 150 cumulative)
- X followers gained
- newsletter pitch responses

### WEEK 3: AMPLIFY

**paid amplification (SAR 50 to 100/day)**
- [ ] run X ads targeting "saudi tech jobs", "وظائف تقنية", "startup jobs"
- [ ] run instagram/threads ads targeting saudi 22 to 35 year olds interested in tech/startups
- [ ] A/B test two ad creatives: one english, one arabic
- [ ] track signups per SAR spent (cost per signup)

**community infiltration**
- [ ] find and join 3 saudi tech whatsapp groups
- [ ] find and join relevant telegram channels
- [ ] post in each: "built this thing, here are 100+ startup jobs in saudi, check it out"
- [ ] NOT spammy, add value first

**first newsletter send**
- [ ] beehiiv: send first "buildsaudi weekly" to all subscribers
- [ ] content: top 10 new jobs this week, 1 company spotlight, 1 funding update
- [ ] match buildlist tone: clean, no fluff, curated

**accelerator outreach**
- [ ] email flat6labs KSA program manager
- [ ] email STV portfolio team
- [ ] email sanabil investments
- [ ] pitch: "we list your portfolio companies' jobs for free. your founders get distribution."

**measure:**
- page views (target: 3,000 cumulative)
- email signups (target: 400 cumulative)
- cost per signup from ads
- newsletter open rate (target: 40%+)
- accelerator responses

### WEEK 4: LEVERAGE

**go back to companies with numbers**
- [ ] DM round 3: use the numbers template
- [ ] "X job seekers signed up in 3 weeks, Y% are engineers and PMs. your roles aren't listed yet."
- [ ] offer featured listing position (still free, but frame it as premium)

**content partnerships**
- [ ] reach out to 3 saudi tech influencers on X for retweets/mentions
- [ ] offer to write a guest post for EcosystemSaudi or Wamda
- [ ] pitch podcast appearances (any saudi startup/tech podcasts)

**SEO content publish**
- [ ] publish "best startups to work for in saudi arabia 2026" blog post
- [ ] publish "software engineer salary at saudi startups 2026" salary guide
- [ ] both are SEO magnets and social share magnets

**measure:**
- page views (target: 5,000 cumulative)
- email signups (target: 800 cumulative)
- organic search traffic (from google search console)
- companies that reached out organically

---

## Monthly Review Framework

at the end of each month, answer these questions:

1. **supply:** how many listings are live? how many companies? are listings fresh or stale?
2. **demand:** how many email signups? what's the growth rate? where are they coming from?
3. **engagement:** newsletter open rate? click rate? X engagement rate?
4. **SEO:** which keywords rank? which pages get traffic? any new backlinks?
5. **pipeline:** how many companies in outreach pipeline? conversion rate from DM to listing?
6. **cost:** total spend (ads, tools). cost per signup. cost per listing acquired.

### dashboard (build in airtable)
create a simple airtable dashboard that tracks:
- total listings (by week)
- total email signups (by week)
- total companies listed (by week)
- top traffic sources (manual entry from analytics)
- outreach tracker (company, DM sent date, response, status)

---

## Monetization Trigger

do NOT think about money until ALL three conditions are met:

1. 100+ active job listings
2. 1,000+ email subscribers
3. 10+ companies reached out to you organically

once all three are true, flip to monetization:
- featured listings: SAR 300 to 500
- newsletter spotlight: SAR 500 to 800 per send
- company profile upgrade: SAR 1,500/month

---

## Weekly CMO Deliverables (what i give you every week)

1. **21 X posts** (3/day, mix of english and arabic, job spotlights, company spotlights, ecosystem insights)
2. **10 linkedin/X DM templates** (personalized per company)
3. **1 newsletter draft** (buildsaudi weekly)
4. **1 SEO content piece** (blog post or salary guide)
5. **metrics review** (what's working, what's not, what to change)

you post them. i write them. we review numbers weekly.

---

*CMO plan v1 — march 2026*
