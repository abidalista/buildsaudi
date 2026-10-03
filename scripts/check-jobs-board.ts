import assert from "node:assert/strict"
import { extractJobCity, jobFreshnessStamp } from "../lib/job-classify"
import { withBuildSaudiUtm } from "../lib/utm"
import { jobFilterOptions, jobs, jobsScrapedAt } from "../lib/data"

assert.equal(extractJobCity("Riyadh, Saudi Arabia"), "Riyadh")
assert.equal(extractJobCity("Riyadh, Riyadh Province, Saudi Arabia"), "Riyadh")
assert.equal(extractJobCity("Mecca, Saudi Arabia"), "Makkah")
assert.equal(extractJobCity("Makkah, Saudi Arabia"), "Makkah")
assert.equal(extractJobCity("Al Khobar, Saudi Arabia"), "Al Khobar")
assert.equal(extractJobCity("Saudi Arabia"), "")

const tagged = withBuildSaudiUtm("https://apply.workable.com/foodics/j/ABC/?foo=1")
const taggedUrl = new URL(tagged)
assert.equal(taggedUrl.hostname, "apply.workable.com")
assert.equal(taggedUrl.searchParams.get("foo"), "1")
assert.equal(taggedUrl.searchParams.get("utm_source"), "buildsaudi")
assert.equal(taggedUrl.searchParams.get("utm_medium"), "referral")

const affiliate = "https://www.aiapply.co/?via=abdulla"
assert.equal(withBuildSaudiUtm(affiliate), affiliate)

assert.equal(withBuildSaudiUtm(""), "")
assert.equal(withBuildSaudiUtm("not-a-url"), "not-a-url")

const posted = jobFreshnessStamp({ posted_date: "2026-10-01" }, "2026-10-03T10:17:31.822Z")
assert.deepEqual(posted, { date: "2026-10-01", kind: "posted" })
const seen = jobFreshnessStamp({ posted_date: "" }, "2026-10-03T10:17:31.822Z")
assert.deepEqual(seen, { date: "2026-10-03", kind: "seen" })

assert.ok(jobFilterOptions.city.includes("Riyadh"))
assert.ok(jobFilterOptions.city.includes("Jeddah"))
assert.ok(!jobFilterOptions.city.includes("Saudi Arabia"))
assert.ok(jobs.every((job) => job.function && job.experience_level))
assert.ok(jobsScrapedAt)

console.log("jobs-board checks passed")
console.log(`cities: ${jobFilterOptions.city.join(", ")}`)
console.log(`jobs with posted_date: ${jobs.filter((j) => j.posted_date).length}/${jobs.length}`)
