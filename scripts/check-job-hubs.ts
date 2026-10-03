import assert from "node:assert/strict"
import { extractJobCity } from "../lib/job-classify"
import { jobs } from "../lib/data"
import { withBuildSaudiUtm } from "../lib/utm"
import {
  JOB_HUB_MIN_OPENINGS,
  getAllJobHubs,
  getJobHubFaq,
  getRoleJobHub,
  getSectorJobHub,
  jobCitySlug,
  jobHubDescription,
  jobHubTitle,
  slugifyHub,
} from "../lib/job-hubs"

const EM = /[\u2014\u2013]/

assert.equal(slugifyHub("E-commerce"), "e-commerce")
assert.equal(slugifyHub("HR Tech"), "hr-tech")
assert.equal(jobCitySlug("Riyadh, Saudi Arabia"), "riyadh")
assert.equal(jobCitySlug("Mecca, Saudi Arabia"), "makkah")
assert.equal(jobCitySlug("Saudi Arabia"), "")

const hubs = getAllJobHubs()
assert.ok(hubs.length > 0, "expected at least one qualifying hub")

for (const hub of hubs) {
  assert.ok(hub.jobs.length >= JOB_HUB_MIN_OPENINGS, `${hub.path} is thin`)
  assert.ok(hub.jobs.every((job) => jobCitySlug(job.location) === hub.citySlug), `${hub.path} mixed city`)
  if (hub.kind === "role") {
    assert.notEqual(hub.facetSlug, "other")
    assert.ok(hub.jobs.every((job) => job.function === hub.facetSlug), `${hub.path} mixed role`)
  } else {
    assert.ok(hub.jobs.every((job) => slugifyHub(job.sector) === hub.facetSlug), `${hub.path} mixed sector`)
  }
  assert.doesNotMatch(jobHubTitle(hub), EM)
  assert.doesNotMatch(jobHubDescription(hub), EM)
  const faq = getJobHubFaq(hub)
  for (const item of faq) {
    assert.doesNotMatch(item.question, EM)
    assert.doesNotMatch(item.answer, EM)
    assert.doesNotMatch(item.answer, /\b16[1-9]\b companies|\b1[7-9]\d companies/)
  }
  assert.ok(faq.some((item) => item.answer.includes("160+")))
  assert.ok(faq.some((item) => item.answer.includes("does not process")))
  const apply = withBuildSaudiUtm(hub.jobs[0].apply_url)
  assert.match(apply, /utm_source=buildsaudi/)
  assert.doesNotMatch(apply, /via=abdulla/)
}

assert.ok(getSectorJobHub("riyadh", "fintech"), "missing riyadh fintech hub")
assert.ok(getRoleJobHub("riyadh", "engineering"), "missing riyadh engineering hub")
assert.equal(getSectorJobHub("dammam", "fintech"), undefined, "1-job dammam fintech must not exist")
assert.equal(getRoleJobHub("riyadh", "other"), undefined, "other role hubs must not exist")
assert.equal(getRoleJobHub("riyadh", "design"), undefined, "2-job riyadh design must not exist")

const twoJobCombos = jobs.filter((job) => extractJobCity(job.location) && job.sector)
assert.ok(twoJobCombos.length > 0)

assert.equal(withBuildSaudiUtm("https://www.aiapply.co/?via=abdulla"), "https://www.aiapply.co/?via=abdulla")

console.log("job hub checks passed")
console.log(hubs.map((hub) => `${hub.path} ${hub.jobs.length}`).join("\n"))
