import assert from "node:assert/strict"
import { COMPANY_PROFILES, hiringNowCopy } from "../lib/company-profiles"
import { getCompanyBySlug, getJobsByCompany, jobsScrapedAt } from "../lib/data"
import { withBuildSaudiUtm } from "../lib/utm"

const slugs = [
  "tamara",
  "foodics",
  "lean-technologies",
  "humain",
  "salla",
  "unifonic",
  "sary",
  "cognna",
  "mozn",
  "lucidya",
  "hala",
  "gathern",
  "rasan",
  "classera",
  "erad",
  "sifi",
  "governata",
  "wakecap",
  "nabt",
  "deep-sa",
] as const

const mustHaveFunding = new Set(["tamara", "foodics", "lean-technologies"])

for (const slug of slugs) {
  const profile = COMPANY_PROFILES[slug]
  assert.ok(profile, `missing profile ${slug}`)
  assert.equal(profile.lastChecked, "2026-10-03")
  assert.ok(profile.summary)
  assert.ok(profile.faq.length > 0)
  if (mustHaveFunding.has(slug)) {
    assert.ok(profile.funding.length > 0)
    assert.ok(profile.investors.length > 0)
  }
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
assert.match(copy, new RegExp(`last seen ${jobsScrapedAt.slice(0, 10)}`))
assert.doesNotMatch(copy, /[\u2014\u2013]/)

const empty = hiringNowCopy("Example", [], jobsScrapedAt)
assert.match(empty, /do not have live individual openings/)

const careers = withBuildSaudiUtm("https://job-boards.eu.greenhouse.io/tamara")
assert.match(careers, /utm_source=buildsaudi/)
assert.equal(withBuildSaudiUtm("https://www.aiapply.co/?via=abdulla"), "https://www.aiapply.co/?via=abdulla")

assert.equal(getCompanyBySlug("throughput"), undefined)
const paytabs = getCompanyBySlug("paytabs")
assert.ok(paytabs)
assert.equal(paytabs.name, "PayTabs Global")
assert.equal(paytabs.website, "https://site.paytabs.com/en/")
assert.deepEqual(paytabs.sector, ["Fintech"])
assert.equal(paytabs.city, "Riyadh")
assert.equal(
  paytabs.description,
  "Saudi-founded MENA payment orchestration and gateway platform powering online payments for merchants, enterprises, and fintechs across KSA and MENA.",
)
assert.equal(
  getCompanyBySlug("velents")?.description,
  "Arabic AI agents and voice/chat customer service & recruitment automation platform (Agent.sa) for enterprise and government in Saudi Arabia.",
)
assert.equal(
  getCompanyBySlug("trubuild")?.description,
  "AI-powered construction tender, cost estimation, and enterprise procurement intelligence platform for Saudi giga-projects and contractors.",
)

console.log("company profile checks passed")
console.log(slugs.map((s) => `${s}: ${getJobsByCompany(s).length} jobs`).join("\n"))
