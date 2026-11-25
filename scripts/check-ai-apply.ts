import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  AI_APPLY_BENEFIT_LINE,
  AI_APPLY_COPY,
  AI_APPLY_SPEED_LINE,
  aiApplyDestination,
  aiApplyHref,
  resolveAiApplyLang,
  sanitizeAiApplySrc,
  shouldInsertAiApplyPromo,
} from "../lib/ai-apply"

const EM = /[\u2014\u2013]/
const PRICE = /paid|price|\$|discount|off for|subscription|free trial/i

assert.equal(
  AI_APPLY_BENEFIT_LINE,
  "AI Apply increases your chances of getting interviews by 50%",
)
assert.equal(AI_APPLY_SPEED_LINE, "Apply to 20 of these in 10 minutes with AI Apply")
assert.doesNotMatch(AI_APPLY_BENEFIT_LINE, EM)
assert.doesNotMatch(AI_APPLY_BENEFIT_LINE, PRICE)
assert.doesNotMatch(AI_APPLY_SPEED_LINE, EM)
assert.doesNotMatch(AI_APPLY_SPEED_LINE, PRICE)
assert.doesNotMatch(AI_APPLY_COPY.ar.benefit, EM)
assert.doesNotMatch(AI_APPLY_COPY.ar.benefit, PRICE)
assert.doesNotMatch(AI_APPLY_COPY.ar.speed, EM)
assert.doesNotMatch(AI_APPLY_COPY.ar.speed, PRICE)

assert.equal(sanitizeAiApplySrc("job_card"), "job_card")
assert.equal(sanitizeAiApplySrc("card desktop!"), "carddesktop")
assert.equal(sanitizeAiApplySrc(""), "unknown")
assert.equal(sanitizeAiApplySrc(null), "unknown")

assert.equal(aiApplyHref("job_card"), "/go/ai-apply?src=job_card")
assert.equal(aiApplyHref("jobs_banner"), "/go/ai-apply?src=jobs_banner")
assert.equal(aiApplyHref("company_banner", "ar"), "/go/ai-apply?src=company_banner&lang=ar")
assert.equal(aiApplyHref("company_upsell", "en"), "/go/ai-apply?src=company_upsell&lang=en")

assert.equal(resolveAiApplyLang(undefined), "ar")
assert.equal(resolveAiApplyLang(null), "ar")
assert.equal(resolveAiApplyLang("ar"), "ar")
assert.equal(resolveAiApplyLang("en"), "en")
assert.equal(resolveAiApplyLang("fr"), "ar")

const destAr = new URL(aiApplyDestination("job_card"))
assert.equal(destAr.hostname, "aiapply.co")
assert.equal(destAr.pathname, "/ar")
assert.equal(destAr.searchParams.get("via"), "abdulla")
assert.equal(destAr.searchParams.get("utm_source"), "buildsaudi")
assert.equal(destAr.searchParams.get("utm_medium"), "job_card")

const destEn = new URL(aiApplyDestination("company_banner", "en"))
assert.equal(destEn.hostname, "www.aiapply.co")
assert.equal(destEn.searchParams.get("via"), "abdulla")
assert.equal(destEn.searchParams.get("utm_source"), "buildsaudi")
assert.equal(destEn.searchParams.get("utm_medium"), "company_banner")

const unknown = new URL(aiApplyDestination("???"))
assert.equal(unknown.searchParams.get("via"), "abdulla")
assert.equal(unknown.searchParams.get("utm_medium"), "unknown")
assert.equal(unknown.hostname, "aiapply.co")

assert.equal(shouldInsertAiApplyPromo(4), true)
assert.equal(shouldInsertAiApplyPromo(0), false)
assert.equal(shouldInsertAiApplyPromo(9), true)

const files = [
  "components/ai-apply-benefit.tsx",
  "components/ai-apply-banner.tsx",
  "components/ai-apply-promo-card.tsx",
  "components/ai-apply-upsell.tsx",
  "components/jobs-board.tsx",
  "components/job-hub-view.tsx",
  "components/home-client.tsx",
  "components/company-profile-client.tsx",
  "app/company/[slug]/page.tsx",
  "app/jobs/[city]/page.tsx",
  "app/jobs/sector/[sector]/page.tsx",
  "app/jobs/stage/[stage]/page.tsx",
  "app/go/ai-apply/route.ts",
]

for (const file of files) {
  const text = readFileSync(join(process.cwd(), file), "utf8")
  assert.doesNotMatch(text, /https:\/\/www\.aiapply\.co\/\?via=abdulla/)
  if (file === "components/home-client.tsx") {
    assert.match(text, /aiApplyHref\("/)
  }
  if (file === "components/ai-apply-benefit.tsx") {
    assert.match(text, /ai_apply_clicked/)
    assert.match(text, /placement/)
    assert.match(text, /target="_blank"/)
    assert.doesNotMatch(text, /text-\[11px\]/)
    assert.doesNotMatch(text, /dir="ltr"/)
  }
  if (file === "components/ai-apply-upsell.tsx") {
    assert.match(text, /job_apply_clicked/)
    assert.match(text, /ai_apply_upsell_shown/)
  }
  if (file === "components/jobs-board.tsx") {
    assert.match(text, /jobs_banner/)
    assert.match(text, /jobs_upsell/)
    assert.match(text, /AiApplyPromoCard/)
    assert.match(text, /TrackedApplyLink/)
  }
  if (file === "components/company-profile-client.tsx") {
    assert.match(text, /company_banner/)
    assert.match(text, /company_upsell/)
    assert.match(text, /company_apply/)
    assert.match(text, /company_job/)
    assert.match(text, /TrackedApplyLink/)
  }
  if (file === "app/go/ai-apply/route.ts") {
    assert.match(text, /lang/)
    assert.match(text, /LANG_COOKIE/)
  }
}

console.log("ai-apply checks passed")
