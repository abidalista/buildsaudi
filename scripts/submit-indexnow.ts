/**
 * Submit all sitemap URLs to IndexNow (Bing + partners).
 * Run after deploy: npx tsx scripts/submit-indexnow.ts
 */
import { companies } from "../lib/data"
import { cities, sectors, stages } from "../lib/seo"
import { submitIndexNow, INDEXNOW_KEY, INDEXNOW_HOST } from "../lib/indexnow"

const base = `https://${INDEXNOW_HOST}`

function allUrls(): string[] {
  return [
    base,
    `${base}/about`,
    `${base}/faq`,
    `${base}/submit`,
    `${base}/jobs`,
    ...companies.map((c) => `${base}/company/${c.slug}`),
    ...cities.map((c) => `${base}/jobs/${c.slug}`),
    ...sectors.map((s) => `${base}/jobs/sector/${s.slug}`),
    ...stages.map((s) => `${base}/jobs/stage/${s.slug}`),
  ]
}

async function main() {
  const urls = allUrls()
  console.log(`IndexNow key: ${INDEXNOW_KEY}`)
  console.log(`Submitting ${urls.length} URLs for ${INDEXNOW_HOST}...`)

  // Batch in chunks of 100 (well under 10k limit)
  const chunkSize = 100
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize)
    const result = await submitIndexNow(chunk)
    console.log(`Batch ${Math.floor(i / chunkSize) + 1}: status=${result.status} ok=${result.ok} ${result.body || ""}`)
    if (!result.ok && result.status !== 202) {
      process.exitCode = 1
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
