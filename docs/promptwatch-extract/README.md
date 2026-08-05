# PromptWatch 48h Extraction → Month Plan

**Window:** today + tomorrow only (then cancel)  
**Goal:** pull every decision-useful signal into this folder before access dies  
**Status:** IN PROGRESS

## Save location
- This file = master log  
- Paste screenshots / CSV / Agent Chat answers under `docs/promptwatch-extract/` (exports/)  
- End artifact: `MONTH-PLAN.md` (built from this dump)

---

## Sidebar sweep checklist

| # | Feature | Worth in 48h? | You do | Dump here |
|---|---|---|---|---|
| 1 | **Agent Chat** | YES — first | Paste questions below | Agent answers |
| 2 | **Actions** | YES | Open → screenshot all open actions | Notes |
| 3 | **Prompt Explorer** | YES | Track worst gaps; export suggested prompts | Table |
| 4 | **Prompts** | YES | Export all tracked prompts + Y/N cite per model | CSV/screenshot |
| 5 | **Citations** | YES | Top cited domains + our cites | List |
| 6 | **Content Gap** | YES | Screenshot all gaps with coverage scores | Table |
| 7 | **Optimize / Create Content** | MAYBE | Only for top 2 gaps — copy suggested outlines (don't publish their spam) | Outlines |
| 8 | **Knowledge Base** | Done | Confirm blurb uploaded | ✓ |
| 9 | **Sitemap** | Done | Confirm sitemap synced | ✓ |
| 10 | **Page Tracker** | QUICK | Which of our URLs appear / don't | List |
| 11 | **Competitors** | QUICK | Who they auto-added vs our real rivals | List |
| 12 | **Sentiment** | SKIP if empty | Brand/competitor prompts first if empty | — |
| 13 | **Socials / Offsite Mentions** | QUICK | Screenshot even if empty (baseline) | Screenshot |
| 14 | **Shopping / Ads radar** | SKIP | Not our model | — |
| 15 | **360 Insights** | QUICK | Screenshot summary | Screenshot |
| 16 | **Crawler Logs** | SKIP | Setup time > trial value | — |
| 17 | **Visitor Analytics** | WAIT | After deploy — screenshot if any AI referrers | Screenshot |

---

## Agent Chat — paste these one by one

Copy each block into Agent Chat. Paste the full answer back here (or into `exports/agent-chat.md`).

### A1 — Diagnosis
```
Summarize Build Saudi's AI visibility across ChatGPT, Claude, Perplexity, Gemini/AI Overviews for the last 7 days. Which models ever cite us? For which prompts? Quote the actual response snippets when we appear.
```

### A2 — Missed prompts (prioritized)
```
List every tracked prompt where Build Saudi is NOT cited. Rank by opportunity for a Saudi startup jobs directory. For each: who gets cited instead (domains), and what content on buildsaudi.co would need to exist to win.
```

### A3 — Competitors (real vs noise)
```
From citation and visibility data, who are the real competitors for "Saudi startup jobs / شركات ناشئة وظائف" in Arabic? Separate: (1) generic job boards, (2) startup directories, (3) company career pages. Ignore LinkedIn as unbeatable ocean — focus on winnable niches.
```

### A4 — Content roadmap (30 days)
```
Propose a 30-day content plan for buildsaudi.co to raise citation rate on Arabic prompts only. Max 8 page updates (reuse existing URLs: /faq, /jobs/riyadh, /jobs/sector/ai, /jobs/sector/fintech, /company/*). No fake listicles. Each item: URL, prompt it targets, 3 bullet points the page must say.
```

### A5 — Offsite / Reddit / Telegram
```
From top cited domains and socials data: which offsite surfaces matter most for Saudi startup job prompts (Reddit, Telegram, blogs)? Give a 30-day offsite plan with 6 concrete actions. Assume Reddit karma is low (warm-up first).
```

### A6 — Brand prompts
```
How do models answer brand prompts about Build Saudi today? If we have no brand/comparison prompts tracked, list 8 Arabic + English brand and comparison prompts we should add before the trial ends, and what a correct answer should say.
```

### A7 — Export summary
```
Produce a single executive brief I can keep after canceling PromptWatch: (1) current metrics, (2) top 10 gaps, (3) top 10 cited rival domains, (4) 30-day plan prioritized P0/P1/P2, (5) what NOT to do.
```

---

## Manual exports (do today)

From each screen use **Export** if available, else screenshot:

1. Dashboard (visibility + competitor bar chart)  
2. Content Gap full list  
3. Citations / Top cited domains  
4. Prompts table (all tracked)  
5. Actions list  
6. Competitors list  

Save filenames:
```
exports/01-dashboard.png
exports/02-content-gaps.png
exports/03-citations.png
exports/04-prompts.png
exports/05-actions.png
exports/06-competitors.png
exports/agent-chat.md
```

---

## Metrics snapshot (fill in)

| Metric | Value | Date |
|--------|-------|------|
| Visibility score | 3% | Aug 5 |
| Content coverage | 70% | Aug 5 |
| ChatGPT / Claude / Perplexity | 0% visible in cards | Aug 5 |
| Self-cites vs external | 2 self / 0 external | ~Aug 5 |
| Worst gaps | SWE list 60 · best sites 65 | Aug 5 |

*(Update after Agent Chat A7)*

---

## Month plan skeleton (fill after dump)

### P0 (week 1)
- [ ] …
### P1 (week 2–3)
- [ ] …
### P2 (week 4)
- [ ] …
### Kill list
- [ ] Don't chase LinkedIn SOV
- [ ] Don't keep PromptWatch paid (unless dump proves otherwise)
- [ ] Remove PromptWatch analytics script after cancel

---

## Session log

| Time | Done |
|------|------|
| | Extraction pack created |
| | … |
