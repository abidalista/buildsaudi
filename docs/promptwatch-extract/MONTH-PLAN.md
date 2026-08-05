# BuildSaudi AEO — 30-day plan (from PromptWatch dump)

**Built:** Aug 5, 2026 · Source: trial extraction (cancel after tomorrow)  
**North star:** Raise Arabic citation rate on *winnable* prompts — not beat LinkedIn SOV  
**Baseline:** ~3% visibility · 70% coverage · 7% on “directory” prompt · 0% on most others  

---

## Kill list (do not do)
- Chase LinkedIn / Bayt overall share of voice  
- Keep PromptWatch paid (unless you change your mind after day 2)  
- New `/ar` site duplicate  
- Fake “best of” listicles that lie  
- Telegram channel week 1 (note it for month 2)  
- Rewrite all 156 “thin” pages at once  

---

## P0 — Week 1 (site)

| # | Task | Why | URL |
|---|------|-----|-----|
| 1 | Done: SWE list + أفضل مواقع FAQs | Worst gaps | `/faq` (`8b9cb65`) |
| 2 | Deepen Riyadh FAQ (coverage 50%) | High-intent city | `/jobs/riyadh` |
| 3 | Fix year signals ٢٠٢٦ (not ٢٠٢٤) | Only double-digit vis prompt was ٢٠٢٤ | `/faq` + prompts |
| 4 | GSC: request index `/faq`, `/jobs/riyadh`, `/jobs/sector/ai`, `/company/tamara` | New answers need crawl | GSC |
| 5 | Remove PromptWatch analytics script after cancel | No orphan JS | `app/layout.tsx` |

---

## P0 — Week 1 (PromptWatch remaining hours)

| # | Task |
|---|------|
| 1 | **Track** Prompt Explorer top 5 niche prompts (AI job seeker, funded hiring, Riyadh grads, backend, multi-apply) |
| 2 | Add **brand** prompts: `ما هي منصة Build Saudi؟` · `BuildSaudi دليل شركات ناشئة` |
| 3 | Add **comparison** prompts: `Build Saudi vs Bayt للشركات الناشئة` · `BuildSaudi ولا LinkedIn لوظائف الستارت أب` |
| 4 | Run Agent Chat A1–A7 → paste into `exports/agent-chat.md` |
| 5 | Export Citations + Content Gap PDFs/screens into `exports/` |
| 6 | Cancel subscription before charge |

---

## P1 — Week 2–3 (content that wins cites)

AI cites **listicles + how-tos** off-site. On-site we do **honest quotable FAQs + hub depth** (not spam lists).

| # | Task | Prompt target |
|---|------|----------------|
| 1 | Fintech hub FAQ: name Tamara, Tabby, SiFi, STC Bank + apply path | فنتك توظف الحين |
| 2 | AI hub FAQ: Humain, Lucidya, Mozn, Signit | شغل AI شركة ناشئة |
| 3 | `/company/tamara` Arabic “كيف تقدم / هل فيه وظائف” block | وظائف تمارا |
| 4 | `/faq` how-to: apply to multiple startups (step list) | كيف أقدم على أكثر من شركة |
| 5 | Fresh grads Riyadh FAQ (honest: funded companies hiring juniors) | حديثي التخرج الرياض |
| 6 | Enrich **top 20** company pages (1 AR + 1 EN FAQ already pattern) | thin-content signal |

---

## P1 — Week 2–3 (offsite — external citations)

Zero external brand mentions = ceiling. PromptWatch shows Telegram + listicle blogs + Reddit in the citation graph.

| # | Action | Notes |
|---|--------|--------|
| 1 | Reddit warm-up 5 comments/day (no links) | Low karma account |
| 2 | Week 3: 1 soft value post (Riyadh / fintech map) | Link only if natural |
| 3 | Pitch 3 Arabic “أفضل مواقع” / startup list authors to list BuildSaudi | Sabbar-style pages dominate — get *on* their lists |
| 4 | One founder LinkedIn post (AR+EN) linking `/faq` | Owned distribution |
| 5 | Align with `docs/DISTRIBUTION.md` digest CTA | Don’t fork marketing |

---

## P2 — Week 4

| # | Task |
|---|------|
| 1 | Re-run manual Arabic AEO scorecard (`docs/aeo/`) — free forever |
| 2 | Dhahran/Eastern: only if company inventory grows — else leave thin FAQ |
| 3 | Consider Telegram later (t.me is cited) — not before Reddit warm-up works |
| 4 | Core Web Vitals pass if PostHog shows bounce issues |
| 5 | Decide: Linear tickets from this plan (only after you approve) |

---

## Success metrics (end of 30 days)

| Metric | Baseline | Target |
|--------|----------|--------|
| Manual AR prompt cite rate (ChatGPT+Perplexity, 10 prompts) | ~0–1/10 | **3+/10** |
| Prompt “دليل…مع الوظائف” style | 7% PW | **Mention in answer text** (not URL-only) |
| External mentions | 0 | **≥1** real offsite (Reddit or blog) |
| GSC SA clicks | (your GSC) | Up vs prior 28d |

---

## Competitor stance

| Treat as | Who |
|----------|-----|
| Ocean | LinkedIn, Bayt, Indeed |
| Cite-stealers for “أفضل مواقع” | Sabbar listicles, Naukrigulf, Wazzuf |
| Niche peers | Wellfound, Qureos, EcosystemSA, profile.sa |
| Branded SERP | Company career pages (Tamara, Humain) |

Win by being the **only curated Saudi startup jobs answer**, not another Bayt.

---

## Immediate (you, remaining trial)

1. Track the 5 explorer prompts + brand/comparison  
2. Paste Agent Chat A7 answer into the repo thread  
3. Screenshot Content Gap + Citations → `docs/promptwatch-extract/exports/`  
4. Tomorrow: cancel PromptWatch · tell me to rip analytics script  

I'll turn Agent Chat paste + any more screens into an update of this file.
