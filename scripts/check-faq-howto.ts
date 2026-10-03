import assert from "node:assert/strict"
import { aeoFaq } from "../lib/aeo-content"
import { buildHowToJsonLd } from "../lib/aeo-jsonld"
import { getJobSitesGuideFaq } from "../lib/guide-job-sites"
import {
  formatHowToAsFaqAnswer,
  getFundedStartupJobHowToAr,
  getFundedStartupJobHowToEn,
} from "../lib/howto-funded-jobs"
import { MARKETING_COMPANY_COUNT_LABEL, MARKETING_COMPANY_COUNT_LABEL_AR } from "../lib/marketing"
import { withBuildSaudiUtm } from "../lib/utm"

const DASH = /[\u2014\u2013]/
const EXACT_COUNTS = /\b(161|143)\b/
const INVENTED = /\$340|Sanabil|Coatue|Goldman|\$500M|67\.5/

function assertClean(label: string, text: string) {
  assert.doesNotMatch(text, DASH, `${label} has an em or en dash`)
  assert.doesNotMatch(text, EXACT_COUNTS, `${label} prints an exact company count`)
  assert.doesNotMatch(text, INVENTED, `${label} invents funding or investor detail`)
}

const ar = getFundedStartupJobHowToAr()
const en = getFundedStartupJobHowToEn()
const arAnswer = formatHowToAsFaqAnswer(ar)
const enAnswer = formatHowToAsFaqAnswer(en)

assert.equal(ar.steps.length, 6)
assert.equal(en.steps.length, 6)
assert.match(ar.description, new RegExp(MARKETING_COMPANY_COUNT_LABEL_AR))
assert.match(en.description, new RegExp(MARKETING_COMPANY_COUNT_LABEL.replace("+", "\\+")))
assert.doesNotMatch(ar.description, /160\+/)
assert.doesNotMatch(en.description, /١٦٠/)

for (const text of [ar.description, arAnswer, en.description, enAnswer, ...ar.steps.map((s) => s.text), ...en.steps.map((s) => s.text)]) {
  assertClean("how-to copy", text)
}

const arFaq = aeoFaq.find((item) => item.question === ar.name)
const enFaq = aeoFaq.find((item) => item.question === en.name)
assert.ok(arFaq, "Arabic how-to missing from aeoFaq")
assert.ok(enFaq, "English how-to missing from aeoFaq")
assert.equal(arFaq.answer, arAnswer)
assert.equal(enFaq.answer, enAnswer)
assertClean("aeoFaq AR", arFaq.answer)
assertClean("aeoFaq EN", enFaq.answer)

const guideFaq = getJobSitesGuideFaq().find((item) => item.question === en.name)
assert.ok(guideFaq, "English how-to missing from guide FAQ")
assert.equal(guideFaq.answer, enAnswer)

const howToLd = buildHowToJsonLd(ar)
assert.equal(howToLd["@type"], "HowTo")
assert.equal(howToLd.step.length, 6)
assert.equal(howToLd.step[0].position, 1)
assert.match(howToLd.step[0].url ?? "", /buildsaudi\.co/)

assert.doesNotMatch(arAnswer, /توظف الحين|hiring now/i)
assert.doesNotMatch(enAnswer, /hiring now/i)
assert.match(arAnswer, /buildsaudi\.co/)
assert.match(enAnswer, /\/jobs/)
assert.match(enAnswer, /preferences/)

assert.equal(withBuildSaudiUtm("https://www.aiapply.co/?via=abdulla"), "https://www.aiapply.co/?via=abdulla")

console.log("faq how-to checks passed")
