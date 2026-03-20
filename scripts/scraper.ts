/**
 * BuildSaudi ATS Scraper
 *
 * Scrapes jobs from ATS platforms (Greenhouse, Workable, Lever, Ashby, Breezy)
 * and pushes new companies + jobs to Airtable.
 *
 * Run: npx tsx scripts/scraper.ts
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

// ============================================================
// ATS Platform Scrapers
// ============================================================

interface ScrapedJob {
  title: string
  location: string
  apply_url: string
  department?: string
}

interface ScrapedCompany {
  name: string
  slug: string
  website: string
  ats_platform: string
  ats_url: string
  jobs: ScrapedJob[]
}

// -- Greenhouse API --
async function scrapeGreenhouse(boardToken: string, companyName: string, website: string): Promise<ScrapedCompany> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`
  const res = await fetch(url)
  if (!res.ok) return { name: companyName, slug: slugify(companyName), website, ats_platform: "Greenhouse", ats_url: `https://boards.greenhouse.io/${boardToken}`, jobs: [] }

  const data = await res.json()
  const jobs: ScrapedJob[] = (data.jobs || []).map((j: any) => ({
    title: j.title,
    location: j.location?.name || "Saudi Arabia",
    apply_url: j.absolute_url || `https://boards.greenhouse.io/${boardToken}/jobs/${j.id}`,
    department: j.departments?.[0]?.name,
  }))

  return {
    name: companyName,
    slug: slugify(companyName),
    website,
    ats_platform: "Greenhouse",
    ats_url: `https://boards.greenhouse.io/${boardToken}`,
    jobs,
  }
}

// -- Workable API --
async function scrapeWorkable(companySlug: string, companyName: string, website: string): Promise<ScrapedCompany> {
  const url = `https://apply.workable.com/api/v1/widget/accounts/${companySlug}`
  const res = await fetch(url)
  if (!res.ok) return { name: companyName, slug: slugify(companyName), website, ats_platform: "Workable", ats_url: `https://apply.workable.com/${companySlug}/`, jobs: [] }

  const data = await res.json()
  const jobs: ScrapedJob[] = (data.jobs || []).map((j: any) => ({
    title: j.title,
    location: j.city || j.country || "Saudi Arabia",
    apply_url: j.url || `https://apply.workable.com/${companySlug}/j/${j.shortcode}/`,
    department: j.department,
  }))

  return {
    name: companyName,
    slug: slugify(companyName),
    website,
    ats_platform: "Workable",
    ats_url: `https://apply.workable.com/${companySlug}/`,
    jobs,
  }
}

// -- Lever API --
async function scrapeLever(companySlug: string, companyName: string, website: string): Promise<ScrapedCompany> {
  const url = `https://api.lever.co/v0/postings/${companySlug}?mode=json`
  const res = await fetch(url)
  if (!res.ok) return { name: companyName, slug: slugify(companyName), website, ats_platform: "Lever", ats_url: `https://jobs.lever.co/${companySlug}`, jobs: [] }

  const data = await res.json()
  const jobs: ScrapedJob[] = (Array.isArray(data) ? data : []).map((j: any) => ({
    title: j.text,
    location: j.categories?.location || "Saudi Arabia",
    apply_url: j.hostedUrl || j.applyUrl || `https://jobs.lever.co/${companySlug}`,
    department: j.categories?.department,
  }))

  return {
    name: companyName,
    slug: slugify(companyName),
    website,
    ats_platform: "Lever",
    ats_url: `https://jobs.lever.co/${companySlug}`,
    jobs,
  }
}

// -- Ashby API --
async function scrapeAshby(boardSlug: string, companyName: string, website: string): Promise<ScrapedCompany> {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${boardSlug}`
  const res = await fetch(url)
  if (!res.ok) return { name: companyName, slug: slugify(companyName), website, ats_platform: "Ashby", ats_url: `https://jobs.ashbyhq.com/${boardSlug}`, jobs: [] }

  const data = await res.json()
  const jobs: ScrapedJob[] = (data.jobs || []).map((j: any) => ({
    title: j.title,
    location: j.location || "Saudi Arabia",
    apply_url: j.jobUrl || `https://jobs.ashbyhq.com/${boardSlug}/${j.id}`,
    department: j.departmentName,
  }))

  return {
    name: companyName,
    slug: slugify(companyName),
    website,
    ats_platform: "Ashby",
    ats_url: `https://jobs.ashbyhq.com/${boardSlug}`,
    jobs,
  }
}

// ============================================================
// Company Registry — add companies here to scrape them
// ============================================================

const COMPANY_REGISTRY: Array<{
  name: string
  website: string
  platform: "greenhouse" | "workable" | "lever" | "ashby"
  board_slug: string
  sector?: string[]
  stage?: string
  city?: string
  description?: string
}> = [
  // --- Known Saudi startups with ATS ---
  { name: "Tamara", website: "https://tamara.co", platform: "greenhouse", board_slug: "tamara", sector: ["Fintech", "BNPL"], stage: "Unicorn", city: "Riyadh", description: "Leading buy-now-pay-later platform in the MENA region." },
  { name: "Foodics", website: "https://www.foodics.com", platform: "workable", board_slug: "foodics", sector: ["B2B SaaS", "F&B Tech"], stage: "Series B", city: "Riyadh", description: "Cloud-based restaurant management platform powering F&B operations across MENA." },
  { name: "Sary", website: "https://sary.sa", platform: "workable", board_slug: "sary", sector: ["B2B SaaS", "Logistics"], stage: "Series B", city: "Riyadh", description: "B2B marketplace for FMCG and wholesale ordering in Saudi Arabia." },
  { name: "Salla", website: "https://salla.com", platform: "greenhouse", board_slug: "saborone", sector: ["E-commerce"], stage: "Series B", city: "Riyadh", description: "E-commerce platform enabling Arabic merchants to build online stores." },
  { name: "Tabby", website: "https://tabby.ai", platform: "greenhouse", board_slug: "tabby", sector: ["Fintech", "BNPL"], stage: "Series C", city: "Riyadh", description: "Shop now, pay later across the Middle East." },
  { name: "Lean Technologies", website: "https://leantech.me", platform: "greenhouse", board_slug: "leantechnologies", sector: ["Fintech", "AI"], stage: "Series A", city: "Riyadh", description: "Open banking API platform connecting fintechs to banks across MENA." },
  { name: "Moyasar", website: "https://moyasar.com", platform: "greenhouse", board_slug: "moyasar", sector: ["Fintech"], stage: "Series A", city: "Riyadh", description: "Payment gateway for businesses in Saudi Arabia." },
  { name: "Penny", website: "https://penny.sa", platform: "lever", board_slug: "penny-software", sector: ["Fintech"], stage: "Seed", city: "Riyadh", description: "Financial management platform for Saudi businesses." },
  { name: "Rewaa", website: "https://rewaa.com", platform: "greenhouse", board_slug: "rewaa", sector: ["B2B SaaS"], stage: "Series A", city: "Riyadh", description: "Inventory and POS management for Saudi retailers." },
  { name: "Lucidya", website: "https://lucidya.com", platform: "greenhouse", board_slug: "lucidya", sector: ["AI", "B2B SaaS"], stage: "Series A", city: "Riyadh", description: "AI-powered customer experience management platform." },
  { name: "Hala", website: "https://hala.com", platform: "greenhouse", board_slug: "haborone", sector: ["Fintech"], stage: "Series B", city: "Riyadh", description: "Fintech company providing POS and payment solutions." },
  { name: "Trukker", website: "https://trukker.com", platform: "greenhouse", board_slug: "trukker", sector: ["Logistics"], stage: "Series B", city: "Riyadh", description: "Digital freight marketplace connecting shippers with truckers." },
  { name: "Nana", website: "https://nana.sa", platform: "greenhouse", board_slug: "nanadirect", sector: ["E-commerce"], stage: "Series C", city: "Riyadh", description: "Online grocery delivery platform in Saudi Arabia." },
  { name: "Morni", website: "https://morni.com", platform: "greenhouse", board_slug: "morni", sector: ["Mobility"], stage: "Series A", city: "Riyadh", description: "Roadside assistance and vehicle services platform." },
  { name: "Lendo", website: "https://lendo.sa", platform: "greenhouse", board_slug: "lendo", sector: ["Fintech"], stage: "Series A", city: "Riyadh", description: "SME lending platform connecting small businesses with financing." },
  { name: "Mrsool", website: "https://mrsool.co", platform: "greenhouse", board_slug: "mrsool", sector: ["Logistics", "E-commerce"], stage: "Series B", city: "Riyadh", description: "On-demand delivery platform for food and packages in Saudi Arabia." },
  { name: "Jahez", website: "https://jahez.net", platform: "greenhouse", board_slug: "jahez", sector: ["F&B Tech", "Logistics"], stage: "Growth", city: "Riyadh", description: "Food delivery platform and listed company on the Saudi stock exchange." },
  { name: "Ejaro", website: "https://ejaro.sa", platform: "lever", board_slug: "ejaro", sector: ["Proptech"], stage: "Seed", city: "Riyadh", description: "Property management and rental platform for Saudi Arabia." },
  { name: "Classera", website: "https://classera.com", platform: "greenhouse", board_slug: "classera", sector: ["Edtech"], stage: "Series B", city: "Riyadh", description: "E-learning platform used by schools and universities across MENA." },
  { name: "iValue", website: "https://ival.sa", platform: "lever", board_slug: "ivalue", sector: ["Fintech"], stage: "Seed", city: "Riyadh", description: "Financial advisory and wealth management platform." },
]

// ============================================================
// Airtable Helpers
// ============================================================

async function airtableFetch(table: string, params: string = "") {
  const res = await fetch(`${AIRTABLE_URL}/${table}?${params}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  })
  return res.json()
}

async function airtableCreate(table: string, records: any[]) {
  // Airtable max 10 records per request
  const results = []
  for (let i = 0; i < records.length; i += 10) {
    const batch = records.slice(i, i + 10)
    const res = await fetch(`${AIRTABLE_URL}/${table}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: batch.map((fields) => ({ fields })) }),
    })
    const data = await res.json()
    results.push(...(data.records || []))
  }
  return results
}

async function getExistingSlugs(): Promise<Set<string>> {
  const slugs = new Set<string>()
  let offset: string | undefined
  do {
    const params = offset ? `fields%5B%5D=Slug&offset=${offset}` : "fields%5B%5D=Slug"
    const data = await airtableFetch("Companies", params)
    for (const r of data.records || []) {
      if (r.fields.Slug) slugs.add(r.fields.Slug)
    }
    offset = data.offset
  } while (offset)
  return slugs
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log("🚀 BuildSaudi Scraper starting...")
  console.log(`📋 ${COMPANY_REGISTRY.length} companies in registry\n`)

  const existingSlugs = await getExistingSlugs()
  console.log(`📊 ${existingSlugs.size} companies already in Airtable\n`)

  let newCompanies = 0
  let newJobs = 0
  let totalJobs = 0

  for (const entry of COMPANY_REGISTRY) {
    const slug = slugify(entry.name)
    process.stdout.write(`🔍 ${entry.name} (${entry.platform})... `)

    let result: ScrapedCompany
    try {
      switch (entry.platform) {
        case "greenhouse":
          result = await scrapeGreenhouse(entry.board_slug, entry.name, entry.website)
          break
        case "workable":
          result = await scrapeWorkable(entry.board_slug, entry.name, entry.website)
          break
        case "lever":
          result = await scrapeLever(entry.board_slug, entry.name, entry.website)
          break
        case "ashby":
          result = await scrapeAshby(entry.board_slug, entry.name, entry.website)
          break
      }
    } catch (e: any) {
      console.log(`❌ Error: ${e.message}`)
      continue
    }

    console.log(`${result.jobs.length} jobs found`)
    totalJobs += result.jobs.length

    // Add company to Airtable if new
    if (!existingSlugs.has(slug)) {
      const companyRecord: any = {
        Name: entry.name,
        Slug: slug,
        Website: entry.website,
        "ATS Platform": entry.platform.charAt(0).toUpperCase() + entry.platform.slice(1),
        "ATS URL": result.ats_url,
        Status: result.jobs.length > 0 ? "Published" : "Draft",
        Source: "scraper",
        "Last Scraped": new Date().toISOString(),
      }
      if (entry.sector) companyRecord.Sector = entry.sector
      if (entry.stage) companyRecord.Stage = entry.stage
      if (entry.city) companyRecord.City = entry.city
      if (entry.description) companyRecord.Description = entry.description

      await airtableCreate("Companies", [companyRecord])
      existingSlugs.add(slug)
      newCompanies++
      console.log(`  ✅ Added company: ${entry.name}`)
    }

    // Add jobs
    if (result.jobs.length > 0) {
      const jobRecords = result.jobs.map((j) => ({
        Title: j.title,
        Company: entry.name,
        "Company Slug": slug,
        Location: j.location,
        "Job Type": "Full-time",
        Sector: entry.sector?.[0] || "",
        "Apply URL": j.apply_url,
        "Posted Date": new Date().toISOString().split("T")[0],
        Source: entry.platform,
        Status: "Published",
      }))

      const created = await airtableCreate("Jobs", jobRecords)
      newJobs += created.length
      console.log(`  📝 Added ${created.length} jobs`)
    }
  }

  console.log("\n" + "=".repeat(50))
  console.log(`✅ Scrape complete!`)
  console.log(`   New companies: ${newCompanies}`)
  console.log(`   New jobs: ${newJobs}`)
  console.log(`   Total jobs found: ${totalJobs}`)
  console.log(`   Total companies in DB: ${existingSlugs.size}`)
}

main().catch(console.error)
