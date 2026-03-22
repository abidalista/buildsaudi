/**
 * BuildSaudi — Company Enrichment Script
 *
 * Workflow:
 * 1. You add a Website URL to Airtable (that's it)
 * 2. This script finds rows with a URL but missing Name/Description
 * 3. Scrapes the website to extract: name, description, logo, careers page
 * 4. Downloads the logo to public/logos/
 * 5. Updates the Airtable record with all data
 * 6. Sets Status to "Published"
 *
 * Run: npx tsx scripts/enrich.ts
 */

import { execSync } from "child_process"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import path from "path"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`
const LOGOS_DIR = path.join(process.cwd(), "public", "logos")

if (!existsSync(LOGOS_DIR)) mkdirSync(LOGOS_DIR, { recursive: true })

// ============================================================
// Airtable helpers
// ============================================================

async function airtableFetch(endpoint: string, params = ""): Promise<any> {
  const res = await fetch(`${AIRTABLE_URL}/${endpoint}?${params}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  })
  return res.json()
}

async function airtableUpdate(table: string, recordId: string, fields: any): Promise<any> {
  const res = await fetch(`${AIRTABLE_URL}/${table}/${recordId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  })
  return res.json()
}

// ============================================================
// Scraping helpers
// ============================================================

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return url
  }
}

async function scrapeWebsite(url: string): Promise<{
  name: string
  description: string
  careersUrl: string
  ogImage: string
}> {
  let markdown = ""
  try {
    // Use firecrawl if available, otherwise curl
    markdown = execSync(
      `~/.npm-global/bin/firecrawl scrape "${url}" 2>/dev/null || curl -sL --max-time 15 "${url}"`,
      { encoding: "utf-8", timeout: 30000 }
    )
  } catch {
    console.log("    scrape failed, using domain name")
    const domain = extractDomain(url)
    return {
      name: domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1),
      description: "",
      careersUrl: url,
      ogImage: "",
    }
  }

  // Extract title / company name
  const titleMatch = markdown.match(/^#\s+(.+)$/m) || markdown.match(/title[>:]\s*([^<\n]+)/i)
  let name = titleMatch?.[1]?.trim() || ""
  // Clean up common suffixes
  name = name.replace(/\s*[-|–—]\s*(Home|Official|Welcome|Saudi).*/i, "").trim()
  if (!name || name.length > 50) {
    const domain = extractDomain(url)
    name = domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1)
  }

  // Extract description
  const descMatch = markdown.match(/(?:description|about)[:\s]*["']?([^"'\n]{20,200})/i)
    || markdown.match(/^(?!#)([A-Z][^.!?\n]{30,200}[.!?])/m)
  const description = descMatch?.[1]?.trim() || ""

  // Find careers/jobs URL
  let careersUrl = url
  const careersMatch = markdown.match(/(?:href=["']|]\()([^"'\s)]+(?:career|jobs|hiring|openings|work-with-us)[^"'\s)]*)/i)
  if (careersMatch) {
    let found = careersMatch[1]
    if (found.startsWith("/")) {
      try { found = new URL(found, url).href } catch {}
    }
    careersUrl = found
  }

  // Find og:image
  const ogMatch = markdown.match(/og:image[^>]*content=["']([^"']+)/i)
    || markdown.match(/!\[.*?\]\((https?:\/\/[^\s)]+\.(?:png|jpg|svg|webp))/i)
  const ogImage = ogMatch?.[1] || ""

  return { name, description, careersUrl, ogImage }
}

async function downloadLogo(url: string, slug: string): Promise<string> {
  const domain = extractDomain(url)

  // Try multiple sources for logos
  const sources = [
    `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ]

  for (const src of sources) {
    try {
      const logoPath = path.join(LOGOS_DIR, `${slug}.png`)
      execSync(`curl -sL --max-time 10 -o "${logoPath}" "${src}"`, { timeout: 15000 })

      // Check if it's a real logo (not a tiny globe icon)
      const stat = execSync(`stat -f%z "${logoPath}"`, { encoding: "utf-8" }).trim()
      const size = parseInt(stat)

      if (size > 800) {
        console.log(`    logo: real PNG (${size} bytes)`)
        return `/logos/${slug}.png`
      }

      // Too small, create branded SVG instead
      execSync(`rm -f "${logoPath}"`)
    } catch {}
  }

  // Fallback: create branded SVG
  const letter = slug.charAt(0).toUpperCase() + (slug.charAt(1) || "")
  const colors = [
    ["#0F172A", "#1E293B"], ["#0C4A6E", "#075985"], ["#7C3AED", "#6D28D9"],
    ["#059669", "#047857"], ["#DC2626", "#B91C1C"], ["#1D4ED8", "#1E40AF"],
    ["#0891B2", "#0E7490"], ["#9333EA", "#7E22CE"], ["#C2410C", "#9A3412"],
  ]
  const [bg1, bg2] = colors[Math.abs(hashCode(slug)) % colors.length]
  const svgContent = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="g" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse"><stop stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs>
<rect width="128" height="128" rx="28" fill="url(#g)"/>
<text x="64" y="84" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="800" font-size="60" fill="white" opacity="0.95">${letter}</text>
</svg>`

  const svgPath = path.join(LOGOS_DIR, `${slug}.svg`)
  writeFileSync(svgPath, svgContent)
  console.log(`    logo: branded SVG fallback`)
  return `/logos/${slug}.svg`
}

function hashCode(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i)
    hash |= 0
  }
  return hash
}

function guessSector(text: string): string[] {
  const t = text.toLowerCase()
  const sectors: string[] = []

  if (/cyber|security|threat|phish|soc\b/.test(t)) sectors.push("Cybersecurity")
  if (/defense|military|drone|autonomous.*weapon|missile/.test(t)) sectors.push("Defense")
  if (/fintech|payment|banking|lending|bnpl|credit|expense/.test(t)) sectors.push("Fintech")
  if (/health|medical|pharma|biotech|nutrition|meal/.test(t)) sectors.push("Bio & Health")
  if (/education|learning|school|university|tutor/.test(t)) sectors.push("Education")
  if (/ecommerce|e-commerce|marketplace|retail|merchant|pos\b/.test(t)) sectors.push("E-commerce")
  if (/property|real estate|proptech|rent|housing/.test(t)) sectors.push("Proptech")
  if (/energy|oil|gas|fuel|solar|clean/.test(t)) sectors.push("Energy")
  if (/construction|building|architect|infrastructure/.test(t)) sectors.push("Construction")
  if (/agriculture|farm|food.*chain|agri/.test(t)) sectors.push("Agriculture")
  if (/government|gov|compliance|governance/.test(t)) sectors.push("Govtech")
  if (/geospatial|satellite|space|mapping|gis/.test(t)) sectors.push("Geospatial")
  if (/hr\b|recruit|talent|employee|incentive/.test(t)) sectors.push("HR Tech")
  if (/saas|platform|software|cloud/.test(t)) sectors.push("SaaS")
  if (/llm|language model|nlp|arabic.*ai|chatbot/.test(t)) sectors.push("AI Research")
  if (/hardware|server|chip|gpu|data center|infrastructure/.test(t)) sectors.push("AI Infrastructure")

  if (sectors.length === 0) sectors.push("AI")
  return sectors.slice(0, 2) // max 2 sectors
}

function guessStage(text: string): string {
  const t = text.toLowerCase()
  if (/series c|unicorn|ipo|public/i.test(t)) return "Growth"
  if (/series b/i.test(t)) return "Series B"
  if (/series a/i.test(t)) return "Series A"
  return "Seed"
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log("🔍 BuildSaudi Enrichment — scanning Airtable for new URLs...\n")

  // Get all companies
  let allRecords: any[] = []
  let offset: string | undefined
  do {
    const params = offset ? `offset=${offset}&pageSize=100` : "pageSize=100"
    const data = await airtableFetch("Companies", params)
    allRecords.push(...(data.records || []))
    offset = data.offset
  } while (offset)

  console.log(`📊 ${allRecords.length} total records in Airtable\n`)

  // Find records that need enrichment: have Website but missing Name or Description
  const needsEnrichment = allRecords.filter((r: any) => {
    const f = r.fields
    return f.Website && (!f.Name || !f.Description || f.Status === "Draft" || !f.Status)
  })

  if (needsEnrichment.length === 0) {
    console.log("✅ All records are already enriched. Nothing to do.\n")
    return
  }

  console.log(`🆕 ${needsEnrichment.length} records need enrichment:\n`)

  let enriched = 0

  for (const record of needsEnrichment) {
    const url = record.fields.Website
    console.log(`→ ${url}`)

    // Scrape the website
    const scraped = await scrapeWebsite(url)
    console.log(`    name: ${scraped.name}`)
    console.log(`    description: ${scraped.description.slice(0, 80)}...`)
    console.log(`    careers: ${scraped.careersUrl}`)

    const slug = slugify(scraped.name)

    // Download logo
    const logoUrl = await downloadLogo(url, slug)

    // Guess sector from description
    const allText = `${scraped.name} ${scraped.description} ${record.fields.Description || ""}`
    const sector = record.fields.Sector?.length ? record.fields.Sector : guessSector(allText)
    const stage = record.fields.Stage || guessStage(allText)

    // Update Airtable record
    const updates: any = {
      Slug: slug,
      "Logo URL": logoUrl,
      "Careers URL": scraped.careersUrl,
      Status: "Published",
      "Last Scraped": new Date().toISOString(),
    }

    // Only fill fields that are empty
    if (!record.fields.Name) updates.Name = scraped.name
    if (!record.fields.Description && scraped.description) updates.Description = scraped.description
    if (!record.fields.Sector?.length) updates.Sector = sector
    if (!record.fields.Stage) updates.Stage = stage
    if (!record.fields.City) updates.City = "Riyadh"

    await airtableUpdate("Companies", record.id, updates)
    enriched++
    console.log(`    ✅ enriched & published\n`)
  }

  console.log("=".repeat(50))
  console.log(`✅ Enriched ${enriched} companies`)
  console.log(`📊 Total companies: ${allRecords.length}`)

  // Trigger Vercel redeploy if we enriched anything
  if (enriched > 0 && process.env.VERCEL_DEPLOY_HOOK) {
    console.log("\n🚀 Triggering Vercel redeploy...")
    try {
      await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: "POST" })
      console.log("   Deploy triggered!")
    } catch {}
  }
}

main().catch(console.error)
