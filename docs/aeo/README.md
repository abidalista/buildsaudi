# BuildSaudi AEO Tracker — Arabic first

**Rule:** Saudis ask ChatGPT in Arabic. English tracking = vanity.  
**Cadence:** Weekly · Arabic prompts first · English optional  
**Scope:** Saudi Arabia only

---

## Rivals (log only if cited)

Arabic discovery (Week 1) — who actually surfaces:

| Rival | Notes |
|-------|--------|
| **EcosystemSA** | Owns “دليل شركات ناشئة” |
| **Bayt / Sabbar / Tanqeeb** | Own Arabic “وظائف” volume |
| **profile.sa** | Closest product twin |
| **startup.jobs** | Shows on some AR/EN hybrid queries |
| Company careers (Tamara etc.) | Win branded job queries |

Wellfound is mostly an EN problem — don’t prioritize it for AR tracking.

---

## Scoring

| Code | Meaning |
|------|---------|
| `Y` | buildsaudi.co cited / linked |
| `M` | BuildSaudi named, no link |
| `N` | Invisible |
| `R` | Rival cited (name them) |

---

## Core Arabic prompts (run these every week)

Paste **exactly** into ChatGPT + Perplexity (+ Gemini if you want).

| ID | Arabic prompt | Intent |
|----|---------------|--------|
| AR1 | وين ألاقي وظائف شركات ناشئة في الرياض؟ | City jobs — Riyadh |
| AR2 | أفضل مواقع لوظائف تقنية في الشركات الناشئة السعودية | Site recommendations |
| AR3 | أي شركات فنتك سعودية توظف الحين؟ | Fintech hiring |
| AR4 | كيف ألاقي وظيفة في شركة ناشئة ممولة في السعودية؟ | How-to / discovery |
| AR5 | قائمة شركات ناشئة سعودية توظف مهندسين برمجيات | SWE list |
| AR6 | وظائف تمارا السعودية | Company careers |
| AR7 | هل فيه دليل للشركات الناشئة السعودية مع الوظائف؟ | Directory (your wedge) |
| AR8 | وين ألاقي وظائف ذكاء اصطناعي في جدة؟ | AI jobs Jeddah |
| AR9 | أفضل شركات ناشئة في الظهران للشغل | Dhahran startups to work at |
| AR10 | وظائف شركات ناشئة في السعودية ٢٠٢٦ | Freshness / year query |

**EN prompts = optional** (only after AR is done). See `prompts.md`.

---

## Blueprints from citation gaps → Arabic titles

Tool suggested EN topics. Ship **Arabic-first** answers on pages you already have (or one new FAQ block) — not separate `/ar` site.

| Priority | Tool’s EN idea | Arabic blueprint title (use this) | Target URL |
|----------|----------------|-----------------------------------|------------|
| High | Startup jobs in Riyadh | وظائف شركات ناشئة في الرياض — أين تقدم؟ | `/jobs/riyadh` + FAQ |
| High | How to apply for AI jobs in Jeddah in 2026 | كيف تقدم على وظائف الذكاء الاصطناعي في جدة ٢٠٢٦ | `/jobs/jeddah` + FAQ (AI) |
| High | Best startups in Dhahran to work for | أفضل شركات ناشئة في الظهران للشغل | `/jobs/dammam` (Eastern) or company hubs + FAQ |

### Blueprint answer shape (copy into page FAQ)

1. **Direct answer** (2–3 sentences, quotable)  
2. **Named companies** (3–5 real ones from your directory)  
3. **Link** to the hub page  
4. **Updated date** (weekly)

Example (Riyadh):

> أفضل طريقة تلاقي وظائف شركات ناشئة في الرياض هي دليل محدث للشركات الممولة مع رابط التقديم المباشر. على BuildSaudi تقدر تتصفح شركات في الرياض حسب القطاع والمرحلة وتقدم من صفحة التوظيف حق الشركة. حدّثناه أسبوعياً.

---

## Weekly ritual (15 min)

1. Run **AR1–AR10** in ChatGPT  
2. Same in Perplexity  
3. Fill `aeo-tracker.csv` (`prompt_lang=ar`)  
4. Any `N` + rival `R` → strengthen that FAQ this week  
5. Skip EN unless you have extra time

---

## Log

Use `aeo-tracker.csv` · import to Google Sheets.  
Columns: `week, date, engine, prompt_id, prompt_lang, cited_us, rivals_cited, our_url_if_any, notes, action`
