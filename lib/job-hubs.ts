import { jobs, jobsScrapedAt } from "@/lib/data"
import { extractJobCity } from "@/lib/job-classify"
import { MARKETING_COMPANY_COUNT_LABEL } from "@/lib/marketing"
import type { FaqItem } from "@/lib/aeo-content"
import type { Job, JobFunction } from "@/lib/types"

/** A real list, not a single leftover row minted for ranking. */
export const JOB_HUB_MIN_OPENINGS = 3

const SKIP_FUNCTIONS = new Set<JobFunction>(["other"])

const FUNCTION_LABEL: Record<Exclude<JobFunction, "other">, string> = {
  engineering: "Engineering",
  product: "Product",
  design: "Design",
  sales: "Sales",
  marketing: "Marketing",
  operations: "Operations",
  people: "People",
  finance: "Finance",
}

const FUNCTION_LABEL_AR: Record<Exclude<JobFunction, "other">, string> = {
  engineering: "هندسة",
  product: "منتج",
  design: "تصميم",
  sales: "مبيعات",
  marketing: "تسويق",
  operations: "عمليات",
  people: "موارد بشرية",
  finance: "مالية",
}

const CITY_AR: Record<string, string> = {
  riyadh: "الرياض",
  jeddah: "جدة",
  dammam: "الدمام",
  makkah: "مكة",
  madinah: "المدينة",
  "al-khobar": "الخبر",
}

export type JobHubKind = "sector" | "role"

export type JobHub = {
  kind: JobHubKind
  citySlug: string
  cityName: string
  facetSlug: string
  facetName: string
  path: string
  jobs: Job[]
}

export function slugifyHub(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function jobCitySlug(location: string): string {
  const city = extractJobCity(location)
  return city ? slugifyHub(city) : ""
}

function lastChecked(): string {
  return jobsScrapedAt ? jobsScrapedAt.slice(0, 10) : ""
}

function collectHubs(kind: JobHubKind): JobHub[] {
  const buckets = new Map<string, Job[]>()
  for (const job of jobs) {
    const cityName = extractJobCity(job.location)
    const citySlug = cityName ? slugifyHub(cityName) : ""
    if (!citySlug) continue

    if (kind === "role") {
      if (SKIP_FUNCTIONS.has(job.function)) continue
      const facetSlug = job.function
      const key = `${citySlug}::${facetSlug}`
      const list = buckets.get(key) || []
      list.push(job)
      buckets.set(key, list)
    } else {
      if (!job.sector) continue
      const facetSlug = slugifyHub(job.sector)
      if (!facetSlug) continue
      const key = `${citySlug}::${facetSlug}`
      const list = buckets.get(key) || []
      list.push(job)
      buckets.set(key, list)
    }
  }

  const hubs: JobHub[] = []
  for (const [key, list] of buckets) {
    if (list.length < JOB_HUB_MIN_OPENINGS) continue
    const [citySlug, facetSlug] = key.split("::")
    const cityName = extractJobCity(list[0].location)
    const facetName =
      kind === "role"
        ? FUNCTION_LABEL[list[0].function as Exclude<JobFunction, "other">]
        : list[0].sector
    const path =
      kind === "role" ? `/jobs/${citySlug}/role/${facetSlug}` : `/jobs/${citySlug}/sector/${facetSlug}`
    hubs.push({
      kind,
      citySlug,
      cityName,
      facetSlug,
      facetName,
      path,
      jobs: list,
    })
  }

  return hubs.sort((a, b) => b.jobs.length - a.jobs.length || a.path.localeCompare(b.path))
}

let sectorHubsCache: JobHub[] | null = null
let roleHubsCache: JobHub[] | null = null

export function getSectorJobHubs(): JobHub[] {
  if (!sectorHubsCache) sectorHubsCache = collectHubs("sector")
  return sectorHubsCache
}

export function getRoleJobHubs(): JobHub[] {
  if (!roleHubsCache) roleHubsCache = collectHubs("role")
  return roleHubsCache
}

export function getAllJobHubs(): JobHub[] {
  return [...getSectorJobHubs(), ...getRoleJobHubs()]
}

export function getSectorJobHub(citySlug: string, sectorSlug: string): JobHub | undefined {
  return getSectorJobHubs().find((hub) => hub.citySlug === citySlug && hub.facetSlug === sectorSlug)
}

export function getRoleJobHub(citySlug: string, roleSlug: string): JobHub | undefined {
  return getRoleJobHubs().find((hub) => hub.citySlug === citySlug && hub.facetSlug === roleSlug)
}

export function relatedJobHubs(hub: JobHub): JobHub[] {
  return getAllJobHubs().filter((other) => other.path !== hub.path && other.citySlug === hub.citySlug)
}

export function jobHubsForCity(citySlug: string): JobHub[] {
  return getAllJobHubs().filter((hub) => hub.citySlug === citySlug)
}

function compactToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function jobHubsForSeoSector(sectorSlug: string, sectorName: string): JobHub[] {
  const firstWord = compactToken(sectorName.split(/[\s&/]/)[0] || sectorName)
  return getSectorJobHubs().filter((hub) => {
    const facet = compactToken(hub.facetName)
    return hub.facetSlug === sectorSlug || facet === compactToken(sectorSlug) || facet === firstWord
  })
}

export function jobHubLastChecked(): string {
  return lastChecked()
}

export function jobHubCompanies(hub: JobHub): string[] {
  return [...new Set(hub.jobs.map((job) => job.company))]
}

export function jobHubTitle(hub: JobHub): string {
  return `${hub.facetName} Jobs in ${hub.cityName} | ${hub.jobs.length} Open Roles | BuildSaudi`
}

export function jobHubDescription(hub: JobHub): string {
  const companiesOnList = jobHubCompanies(hub)
  const checked = lastChecked()
  const stamp = checked ? ` Last checked ${checked}.` : ""
  return `${hub.jobs.length} ${hub.facetName.toLowerCase()} openings in ${hub.cityName} at ${companiesOnList.join(", ")}. Apply on official careers pages.${stamp} BuildSaudi does not process applications.`
}

export function getJobHubFaq(hub: JobHub): FaqItem[] {
  const checked = lastChecked()
  const companies = jobHubCompanies(hub)
  const companyText = companies.join(", ")
  const arCity = CITY_AR[hub.citySlug] || hub.cityName
  const pageUrl = `https://buildsaudi.co${hub.path}`
  const stamp = checked ? ` Last checked ${checked}.` : ""
  const arStamp = checked ? ` آخر فحص: ${checked}.` : ""
  const roleAr =
    hub.kind === "role" ? FUNCTION_LABEL_AR[hub.facetSlug as Exclude<JobFunction, "other">] || hub.facetName : hub.facetName
  const topicEn = hub.kind === "role" ? `${hub.facetName.toLowerCase()} jobs` : `${hub.facetName} jobs`
  const topicAr = hub.kind === "role" ? `وظائف ${roleAr}` : `وظائف ${hub.facetName}`

  return [
    {
      question: `وين ألاقي ${topicAr} في ${arCity}؟`,
      answer: `على BuildSaudi فيه ${hub.jobs.length} وظيفة حالية في هذه القائمة من لوحات التوظيف الرسمية.${arStamp} الشركات: ${companyText}. قدّم من رابط صاحب العمل. الصفحة: ${pageUrl}`,
    },
    {
      question: `Where are the current ${topicEn} in ${hub.cityName}?`,
      answer: `This BuildSaudi list has ${hub.jobs.length} live openings from official boards.${stamp} Companies on the list: ${companyText}. Apply on the employer page. Profile: ${pageUrl}`,
    },
    {
      question: `How do I apply to ${topicEn} in ${hub.cityName}?`,
      answer: `Open an opening on ${pageUrl} and use the Apply link. BuildSaudi does not process applications. We only list roles from official ATS boards for companies in the ${MARKETING_COMPANY_COUNT_LABEL} directory.`,
    },
    {
      question: `Which companies are hiring for ${topicEn} in ${hub.cityName}?`,
      answer: `${companyText}. Counts change when we refresh jobs.json. This page is generated only when at least ${JOB_HUB_MIN_OPENINGS} openings exist.`,
    },
  ]
}
