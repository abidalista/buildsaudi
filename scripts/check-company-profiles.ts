import assert from "node:assert/strict"
import { COMPANY_PROFILES, hiringNowCopy } from "../lib/company-profiles"
import { getJobsByCompany, jobsScrapedAt } from "../lib/data"
import { withBuildSaudiUtm } from "../lib/utm"

const slugs = ["tamara", "foodics", "lean-technologies"] as const

for (const slug of slugs) {
  const profile = COMPANY_PROFILES[slug]
  assert.ok(profile, `missing profile ${slug}`)
  assert.equal(profile.lastChecked, "2026-10-03")
  assert.ok(profile.summary)
  assert.ok(profile.funding.length > 0)
  assert.ok(profile.investors.length > 0)
  assert.ok(profile.faq.length > 0)
  for (const line of [...profile.funding, ...profile.investors, profile.founders].filter(Boolean)) {
    assert.ok(line!.sourceUrl.startsWith("https://"))
    assert.doesNotMatch(line!.text, /[\u2014\u2013]/)
    assert.doesNotMatch(line!.sourceLabel, /[\u2014\u2013]/)
  }
  for (const item of profile.faq) {
    assert.doesNotMatch(item.question, /[\u2014\u2013]/)
    assert.doesNotMatch(item.answer, /[\u2014\u2013]/)
  }
  assert.doesNotMatch(profile.summary, /[\u2014\u2013]/)
}

const tamaraJobs = getJobsByCompany("tamara")
assert.ok(tamaraJobs.length > 0)
const copy = hiringNowCopy("Tamara", tamaraJobs, jobsScrapedAt)
assert.match(copy, /Tamara has \d+ openings/)
assert.match(copy, /last seen 2026-10-03/)
assert.doesNotMatch(copy, /[\u2014\u2013]/)

const empty = hiringNowCopy("Example", [], jobsScrapedAt)
assert.match(empty, /do not have live individual openings/)

const careers = withBuildSaudiUtm("https://job-boards.eu.greenhouse.io/tamara")
assert.match(careers, /utm_source=buildsaudi/)
assert.equal(withBuildSaudiUtm("https://www.aiapply.co/?via=abdulla"), "https://www.aiapply.co/?via=abdulla")

console.log("company profile checks passed")
console.log(slugs.map((s) => `${s}: ${getJobsByCompany(s).length} jobs`).join("\n"))
