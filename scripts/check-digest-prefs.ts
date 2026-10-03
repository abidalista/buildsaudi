import assert from "node:assert/strict"
import { companies, getCompanyBySlug, jobs } from "../lib/data"
import {
  emptyPrefs,
  hasAnyPref,
  jobMatchesAnyConfiguredPrefs,
  jobMatchesPrefs,
  parsePrefList,
  prefsFromAirtableFields,
  prefsToAirtableFields,
  serializePrefList,
} from "../lib/digest-prefs"
import { extractJobCity } from "../lib/job-classify"
import { strings } from "../lib/i18n"
import { signPreferencesToken, verifyPreferencesToken } from "../lib/preferences-token"
import { withBuildSaudiUtm } from "../lib/utm"

const EM = /[\u2014\u2013]/

const sample = jobs.find((job) => job.function === "engineering" && extractJobCity(job.location) === "Riyadh")
assert.ok(sample, "expected a Riyadh engineering job")
const sampleStage = getCompanyBySlug(sample.company_slug)?.stage || ""

assert.equal(jobMatchesPrefs(sample, emptyPrefs(), sampleStage), true)
assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), roles: ["engineering"] }, sampleStage), true)
assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), roles: ["design"] }, sampleStage), false)
assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), cities: ["Riyadh"] }, sampleStage), true)
assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), cities: ["Jeddah"] }, sampleStage), false)
assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), sectors: [sample.sector] }, sampleStage), true)
assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), experience: [sample.experience_level] }, sampleStage), true)
if (sampleStage) {
  assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), stages: [sampleStage] }, sampleStage), true)
  assert.equal(jobMatchesPrefs(sample, { ...emptyPrefs(), stages: ["NotAStage"] }, sampleStage), false)
}

assert.deepEqual(parsePrefList("engineering, product"), ["engineering", "product"])
assert.deepEqual(parsePrefList("Riyadh; Jeddah\nDammam"), ["Riyadh", "Jeddah", "Dammam"])
assert.equal(serializePrefList(["engineering", "product"]), "engineering, product")

const roundTrip = prefsFromAirtableFields(
  prefsToAirtableFields({
    roles: ["engineering"],
    cities: ["Riyadh"],
    sectors: ["Fintech"],
    experience: ["mid"],
    stages: ["Seed"],
  }),
)
assert.deepEqual(roundTrip.roles, ["engineering"])
assert.deepEqual(roundTrip.cities, ["Riyadh"])
assert.ok(hasAnyPref(roundTrip))
assert.equal(hasAnyPref(emptyPrefs()), false)

assert.equal(jobMatchesAnyConfiguredPrefs(sample, [emptyPrefs()], sampleStage), true)
assert.equal(
  jobMatchesAnyConfiguredPrefs(sample, [{ ...emptyPrefs(), roles: ["design"] }], sampleStage),
  false,
)
assert.equal(
  jobMatchesAnyConfiguredPrefs(
    sample,
    [
      { ...emptyPrefs(), roles: ["design"] },
      { ...emptyPrefs(), roles: ["engineering"] },
    ],
    sampleStage,
  ),
  true,
)

assert.equal(extractJobCity("Mecca, Saudi Arabia"), "Makkah")
assert.ok(
  jobs.some((job) => jobMatchesPrefs(job, { ...emptyPrefs(), cities: ["Makkah"] })),
  "Makkah pref should match Mecca openings after aliasing",
)

const apply = withBuildSaudiUtm(sample.apply_url)
assert.match(apply, /utm_source=buildsaudi/)
assert.doesNotMatch(apply, /via=abdulla/)
assert.equal(withBuildSaudiUtm("https://www.aiapply.co/?via=abdulla"), "https://www.aiapply.co/?via=abdulla")

const token = signPreferencesToken("seeker@example.com")
assert.equal(verifyPreferencesToken("seeker@example.com", token), true)
assert.equal(verifyPreferencesToken("other@example.com", token), false)

for (const lang of ["ar", "en"] as const) {
  const copy = strings[lang]
  for (const key of [
    "prefsTitle",
    "prefsTagline",
    "prefsUnsub",
    "prefsEmptyHint",
    "prefsMatching",
    "prefsNone",
    "jobAlertPrefsCta",
  ] as const) {
    assert.doesNotMatch(copy[key], EM, `${lang}.${key} has an em dash`)
  }
  assert.match(copy.prefsTagline, /160\+|١٦٠\+/)
}

assert.ok(companies.length > 0)
console.log("digest preference checks passed")
console.log(`sample ${sample.company} ${sample.title} stage=${sampleStage || "none"}`)
