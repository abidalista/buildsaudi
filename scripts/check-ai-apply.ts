import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  AI_APPLY_BENEFIT_LINE,
  aiApplyDestination,
  aiApplyHref,
  sanitizeAiApplySrc,
} from "../lib/ai-apply"

const EM = /[\u2014\u2013]/
const PRICE = /paid|price|\$|discount|off for|subscription|free trial/i

assert.equal(
  AI_APPLY_BENEFIT_LINE,
  "AI Apply increases your chances of getting interviews by 50%",
)
assert.doesNotMatch(AI_APPLY_BENEFIT_LINE, EM)
assert.doesNotMatch(AI_APPLY_BENEFIT_LINE, PRICE)

assert.equal(sanitizeAiApplySrc("job_card"), "job_card")
assert.equal(sanitizeAiApplySrc("card desktop!"), "carddesktop")
assert.equal(sanitizeAiApplySrc(""), "unknown")
assert.equal(sanitizeAiApplySrc(null), "unknown")

assert.equal(aiApplyHref("job_card"), "/go/ai-apply?src=job_card")
assert.equal(aiApplyHref("jobs_banner"), "/go/ai-apply?src=jobs_banner")

const dest = new URL(aiApplyDestination("job_card"))
assert.equal(dest.hostname, "www.aiapply.co")
assert.equal(dest.searchParams.get("via"), "abdulla")
assert.equal(dest.searchParams.get("utm_source"), "buildsaudi")
assert.equal(dest.searchParams.get("utm_medium"), "job_card")

const unknown = new URL(aiApplyDestination("???"))
assert.equal(unknown.searchParams.get("via"), "abdulla")
assert.equal(unknown.searchParams.get("utm_medium"), "unknown")

const files = [
  "components/ai-apply-benefit.tsx",
  "components/jobs-board.tsx",
  "components/job-hub-view.tsx",
  "components/home-client.tsx",
  "app/company/[slug]/page.tsx",
  "app/jobs/[city]/page.tsx",
  "app/jobs/sector/[sector]/page.tsx",
  "app/go/ai-apply/route.ts",
]

for (const file of files) {
  const text = readFileSync(join(process.cwd(), file), "utf8")
  if (file === "components/home-client.tsx" || file === "components/jobs-board.tsx") {
    assert.match(text, /aiApplyHref\("/)
    assert.doesNotMatch(text, /https:\/\/www\.aiapply\.co\/\?via=abdulla/)
  }
  if (file === "components/ai-apply-benefit.tsx") {
    assert.match(text, /ai_apply_clicked/)
    assert.match(text, /placement/)
    assert.match(text, /target="_blank"/)
  }
}

console.log("ai-apply checks passed")
