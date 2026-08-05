# Agent Chat dump — A1–A3 (+ related)

**Date:** Aug 5, 2026  
**Source:** PromptWatch Agent Chat screenshots (user)

---

## A1 — Visibility summary (Jul 29 – Aug 5)

| Metric | Value |
|--------|--------|
| Overall visibility | **3.18/100** |
| Appeared | **4 / 59** responses |
| ChatGPT (`gpt-search`) | **0% / 0 cites** — blind |
| Perplexity (`sonar-pro`) | 3.70 vis · 5 cites |
| Google AI Overview | 4.00 vis · 6 cites |
| Claude | Not tracked in this run |

### Where we appear
1. **وظائف شركات ناشئة في السعودية ٢٠٢٦** — Perplexity names BuildSaudi alongside ThinkIN, Qureos; varying vis 75→60→25 across runs  
2. **هل فيه دليل للشركات الناشئة السعودية مع الوظائف؟** — Gemini/AIO describes BuildSaudi as specialized funded-startup directory with direct careers links (vis 60)

### Pages cited
| URL | Cites | Models |
|-----|-------|--------|
| `buildsaudi.co/` | 6 | Perplexity + Gemini |
| `/company/tamara` | 2 | Gemini |
| `/about` | 2 | Gemini |
| `/company/lendo` | 1 | Gemini |

### Takeaways
- Invisible on **7/9** tracked prompts  
- Even when cited, often **URL/domain** not brand name in text  
- ChatGPT is the critical blind spot  

---

## A2 — Gaps ranked (partial detail from screenshots)

| Rank | Prompt | Cov | Who wins | Need on site |
|------|--------|-----|----------|--------------|
| 1 | أفضل مواقع لوظائف تقنية في الشركات الناشئة السعودية | 65 | LinkedIn 90, Qureos 85, Sabbar 70 (bayzat/sabbar/bayt) | Dedicated comparison page: BuildSaudi vs LinkedIn/Qureos/Sabbar — curated funded SA startups |
| 2 | قائمة شركات ناشئة… مهندسين برمجيات | 60 | Company names Tamara/Foodics/Salla/Zid/Lucidya (naukrigulf etc.) | SWE aggregation page/filter — role counts, location, seniority |
| 3 | أي شركات فنتك سعودية توظف الحين؟ | 70 | STC Pay, Tamara, Tala, Lean, HyperPay | Fintech hub + **Hiring Now** + schema so brand sticks when domain cited (domain cited 3× but brand invisible) |
| 4 | وين ألاقي وظائف… الرياض؟ | ~80 cov | LinkedIn (t.me, bayt, reddit) | Stronger Riyadh page — company counts, filters, how-to (coverage high but AI still won't name us) |
| 5 | كيف ألاقي وظيفة… ممولة؟ | 80 | LinkedIn; EcosystemSA in snippet | HOW_TO with BuildSaudi as step 1; stage filters |
| 6 | أفضل شركات… الظهران | 45 | Aramco / Wa'ed / DTV | Eastern hub only if inventory real — else honest thin FAQ |
| 7 | وظائف تمارا | 70 | Tamara careers + LinkedIn | Richer `/company/tamara` (roles by team, update stamp) — lower priority |

### Pattern (Agent)
1. No dedicated landing pages for high-intent segments → AI names companies or LinkedIn  
2. LinkedIn wins by default when no specialist alternative surfaces  
3. Brand invisible even when domain cited → stronger entity/schema/branding  

---

## A3 — Competitive landscape (ex-LinkedIn)

### Generic boards (winnable via specialization)
Sabbar (19), Bayt (21), Naukrigulf (19), Tanqeeb (16), Indeed SA (10)  
→ ~43% of non-LinkedIn cites = Arabic SEO volume, not startup quality  
→ Play: page **وظائف شركات ناشئة — مش كل الوظائف**

### Startup directories (real set)
| Domain | Threat | Counter |
|--------|--------|---------|
| **EcosystemSA** | **CRITICAL** — #1 dir cite, multi-model | They don't have direct-apply jobs — own that wedge |
| Wellfound | High | Local Arabic / SA relevance |
| Qureos | High (tech prompt 85 vis) | Saudi funded-only vs broad MENA HR |
| ThinkIN / Inc Arabia | Niche/adjacent | Lists — pitch inclusion + outrank with live jobs |

### Company careers = fragmentation to exploit
AI cites Tamara/Foodics/Salla… individually for SWE/fintech  
→ Aggregate hubs should be the source that points to those careers  

### Telegram
18 cites (esp. Perplexity) — channels like @itcjobs, @Riyadhjobstoday  
Not a competitor to beat; signal where Arabic intent lives  

### Winnable niches (Agent ranking)
1. Startup directory **with jobs** (vs EcosystemSA)  
2. Tech/SWE roles aggregation  
3. Fintech hiring hub  
4. City geo (Riyadh / Eastern)  

**Classify EcosystemSA as DIRECT competitor.**

---

## Status
- Waiting on Agent Chat **A4–A7** (content plan, offsite, brand prompts, exec brief)  
- MONTH-PLAN.md will be revised after full dump  
