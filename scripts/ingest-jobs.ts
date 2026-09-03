/**
 * Ingest individual openings from public ATS APIs for companies already
 * in the BuildSaudi directory. Writes data/jobs.json.
 *
 * Run: npx tsx scripts/ingest-jobs.ts
 */

import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { companies } from "../lib/data"
import { getAtsBoard, type AtsPlatform } from "../lib/ats"
import { classifyFunction, classifySeniority, cleanLocation, isSaudiLocation } from "../lib/job-classify"
import type { Job } from "../lib/types"

const UA =
  "Mozilla/5.0 (compatible; BuildSaudiBot/1.0; +https://buildsaudi.co) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"

interface RawJob {
  title: string
  location: string
  apply_url: string
  posted_date: string
  source: AtsPlatform
}

async function fetchJson(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "User-Agent": UA,
      Accept: "application/json",
      ...(init?.headers || {}),
    },
  })
  const text = await res.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  return { ok: res.ok, status: res.status, data }
}

async function scrapeGreenhouse(board: string): Promise<RawJob[]> {
  const { ok, data } = await fetchJson(`https://boards-api.greenhouse.io/v1/boards/${board}/jobs`)
  if (!ok || !data || typeof data !== "object") return []
  const jobs = (data as { jobs?: Array<Record<string, unknown>> }).jobs || []
  return jobs
    .filter((j) => isSaudiLocation(String((j.location as { name?: string } | undefined)?.name || "")))
    .map((j) => ({
      title: String(j.title || ""),
      location: cleanLocation(String((j.location as { name?: string })?.name || "")),
      apply_url: String(j.absolute_url || `https://boards.greenhouse.io/${board}/jobs/${j.id}`),
      posted_date: isoDate(String(j.updated_at || j.created_at || "")),
      source: "greenhouse" as const,
    }))
}

async function scrapeWorkable(board: string): Promise<RawJob[]> {
  const results: RawJob[] = []
  let token: string | undefined
  for (let page = 0; page < 8; page++) {
    const body: Record<string, unknown> = {
      query: "",
      location: [],
      department: [],
      worktype: [],
      remote: [],
    }
    if (token) body.token = token
    const { ok, data } = await fetchJson(`https://apply.workable.com/api/v3/accounts/${board}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!ok || !data || typeof data !== "object") break
    const payload = data as {
      results?: Array<Record<string, unknown>>
      nextPage?: string
    }
    for (const j of payload.results || []) {
      const loc = (j.location as { country?: string; city?: string } | undefined) || {}
      const country = loc.country || ""
      const city = loc.city || ""
      if (!isSaudiLocation(country) && !isSaudiLocation(city)) continue
      results.push({
        title: String(j.title || ""),
        location: cleanLocation(`${city}, ${country}`.replace(/^, |, $/g, "")),
        apply_url: `https://apply.workable.com/${board}/j/${j.shortcode || ""}/`,
        posted_date: isoDate(String(j.published_on || "")),
        source: "workable",
      })
    }
    if (!payload.nextPage) break
    token = payload.nextPage
  }
  return results
}

async function scrapeLever(board: string): Promise<RawJob[]> {
  const { ok, data } = await fetchJson(`https://api.lever.co/v0/postings/${board}?mode=json`)
  if (!ok || !Array.isArray(data)) return []
  return (data as Array<Record<string, unknown>>)
    .filter((j) => isSaudiLocation(String((j.categories as { location?: string } | undefined)?.location || "")))
    .map((j) => {
      const ts = Number(j.createdAt || 0)
      return {
        title: String(j.text || ""),
        location: cleanLocation(String((j.categories as { location?: string })?.location || "")),
        apply_url: String(j.hostedUrl || `https://jobs.lever.co/${board}`),
        posted_date: ts ? new Date(ts).toISOString().slice(0, 10) : "",
        source: "lever" as const,
      }
    })
}

async function scrapeAshby(board: string): Promise<RawJob[]> {
  const query = `query ApiJobBoardWithTeams($organizationHostedJobsPageName: String!) {
    jobBoard: publishedJobBoard(organizationHostedJobsPageName: $organizationHostedJobsPageName) {
      jobPostings { id title locationName jobLocation { city country { name } } publishedDate createdAt }
    }
  }`
  const { ok, data } = await fetchJson("https://jobs.ashbyhq.com/api/non-user-graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operationName: "ApiJobBoardWithTeams",
      variables: { organizationHostedJobsPageName: board },
      query,
    }),
  })
  let postings: Array<Record<string, unknown>> = []
  if (ok && data && typeof data === "object") {
    postings =
      ((data as { data?: { jobBoard?: { jobPostings?: Array<Record<string, unknown>> } } }).data?.jobBoard
        ?.jobPostings) || []
  }
  if (!postings.length) {
    const rest = await fetchJson(`https://api.ashbyhq.com/posting-api/job-board/${board}`)
    if (rest.ok && rest.data && typeof rest.data === "object") {
      postings = ((rest.data as { jobs?: Array<Record<string, unknown>> }).jobs || []).map((j) => ({
        id: j.id,
        title: j.title,
        locationName: j.location,
        publishedDate: j.publishedAt,
        jobUrl: j.jobUrl,
      }))
    }
  }
  return postings
    .filter((j) => {
      const loc = String(j.locationName || j.location || "")
      const country = String(
        ((j.jobLocation as { country?: { name?: string } } | undefined)?.country?.name) || "",
      )
      return isSaudiLocation(loc) || isSaudiLocation(country)
    })
    .map((j) => ({
      title: String(j.title || ""),
      location: cleanLocation(String(j.locationName || "")),
      apply_url: String(j.jobUrl || `https://jobs.ashbyhq.com/${board}/${j.id}`),
      posted_date: isoDate(String(j.publishedDate || j.createdAt || "")),
      source: "ashby" as const,
    }))
}

async function scrapeRecruitee(board: string): Promise<RawJob[]> {
  const { ok, data } = await fetchJson(`https://${board}.recruitee.com/api/offers/`)
  if (!ok || !data || typeof data !== "object") return []
  const offers = (data as { offers?: Array<Record<string, unknown>> }).offers || []
  return offers
    .filter((o) => isSaudiLocation(String(o.country || "")) || isSaudiLocation(String(o.city || "")))
    .map((o) => ({
      title: String(o.title || ""),
      location: cleanLocation(`${o.city || ""}, ${o.country || ""}`.replace(/^, |, $/g, "")),
      apply_url: String(o.careers_url || `https://${board}.recruitee.com/o/${o.slug || ""}`),
      posted_date: isoDate(String(o.published_at || "")),
      source: "recruitee" as const,
    }))
}

async function scrapeSmartRecruiters(board: string): Promise<RawJob[]> {
  const { ok, data } = await fetchJson(
    `https://api.smartrecruiters.com/v1/companies/${board}/postings?limit=100&country=sa`,
  )
  if (!ok || !data || typeof data !== "object") return []
  const content = (data as { content?: Array<Record<string, unknown>> }).content || []
  return content
    .filter((j) => {
      const loc = (j.location as { country?: string; city?: string; fullLocation?: string } | undefined) || {}
      return (
        (loc.country || "").toLowerCase() === "sa" ||
        isSaudiLocation(loc.fullLocation || "") ||
        isSaudiLocation(loc.city || "")
      )
    })
    .map((j) => {
      const loc = (j.location as { city?: string; fullLocation?: string } | undefined) || {}
      return {
        title: String(j.name || ""),
        location: cleanLocation(loc.fullLocation || `${loc.city || ""}, Saudi Arabia`),
        apply_url: `https://jobs.smartrecruiters.com/${board}/${j.id}`,
        posted_date: isoDate(String(j.releasedDate || "")),
        source: "smartrecruiters" as const,
      }
    })
}

const FETCHERS: Record<AtsPlatform, (board: string) => Promise<RawJob[]>> = {
  greenhouse: scrapeGreenhouse,
  workable: scrapeWorkable,
  lever: scrapeLever,
  ashby: scrapeAshby,
  recruitee: scrapeRecruitee,
  smartrecruiters: scrapeSmartRecruiters,
}

function isoDate(value: string): string {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value.slice(0, 10)
  return d.toISOString().slice(0, 10)
}

function jobId(companySlug: string, applyUrl: string, title: string): string {
  const raw = `${companySlug}|${applyUrl}|${title}`
  let hash = 0
  for (let i = 0; i < raw.length; i++) hash = (hash * 31 + raw.charCodeAt(i)) | 0
  return `${companySlug}-${Math.abs(hash).toString(36)}`
}

async function main() {
  const targets = companies
    .map((c) => ({ company: c, ats: getAtsBoard(c) }))
    .filter((t): t is { company: (typeof companies)[number]; ats: NonNullable<ReturnType<typeof getAtsBoard>> } =>
      Boolean(t.ats),
    )

  console.log(`Ingesting ${targets.length} directory companies with public ATS boards\n`)

  const jobs: Job[] = []
  const seen = new Set<string>()

  for (const { company, ats } of targets) {
    process.stdout.write(`${company.name} (${ats.platform}/${ats.board})... `)
    try {
      const raw = await FETCHERS[ats.platform](ats.board)
      const kept = raw.filter((j) => j.title && j.apply_url)
      for (const j of kept) {
        const key = j.apply_url.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        jobs.push({
          id: jobId(company.slug, j.apply_url, j.title),
          company_slug: company.slug,
          title: j.title.trim(),
          company: company.name,
          location: j.location,
          job_type: "Full-time",
          experience_level: classifySeniority(j.title),
          function: classifyFunction(j.title),
          sector: company.sector[0] || "",
          apply_url: j.apply_url,
          posted_date: j.posted_date,
          source: j.source,
        })
      }
      console.log(`${kept.length} SA jobs`)
    } catch (err) {
      console.log(`ERROR: ${err instanceof Error ? err.message : err}`)
    }
  }

  jobs.sort((a, b) => {
    if (a.posted_date && b.posted_date && a.posted_date !== b.posted_date) {
      return a.posted_date < b.posted_date ? 1 : -1
    }
    return a.company.localeCompare(b.company) || a.title.localeCompare(b.title)
  })

  const out = {
    scraped_at: new Date().toISOString(),
    jobs,
  }
  const dest = resolve(process.cwd(), "data/jobs.json")
  writeFileSync(dest, JSON.stringify(out, null, 2) + "\n")
  const companiesWithJobs = new Set(jobs.map((j) => j.company_slug)).size
  console.log(`\nWrote ${jobs.length} openings from ${companiesWithJobs} companies → ${dest}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
