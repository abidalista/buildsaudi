import { Company, Job } from "./types"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

async function fetchAllRecords(table: string, filter?: string): Promise<any[]> {
  const records: any[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams()
    if (offset) params.set("offset", offset)
    if (filter) params.set("filterByFormula", filter)
    params.set("pageSize", "100")

    const res = await fetch(`${AIRTABLE_URL}/${table}?${params}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
      next: { revalidate: 3600 }, // revalidate every hour
    })

    if (!res.ok) {
      console.error(`Airtable fetch error: ${res.status} ${res.statusText}`)
      break
    }

    const data = await res.json()
    records.push(...(data.records || []))
    offset = data.offset
  } while (offset)

  return records
}

export async function getCompanies(): Promise<Company[]> {
  const records = await fetchAllRecords("Companies", '{Status}="Published"')

  return records.map((r: any) => ({
    slug: r.fields.Slug || "",
    name: r.fields.Name || "",
    website: r.fields.Website || "",
    linkedin: r.fields.LinkedIn || "",
    logo_url: r.fields["Logo URL"] || `/logos/${(r.fields.Slug || "").toLowerCase()}.png`,
    stage: r.fields.Stage || "Seed",
    sector: r.fields.Sector || [],
    city: r.fields.City || "Riyadh",
    description: r.fields.Description || "",
    careers_url: r.fields["Careers URL"] || r.fields.Website || "",
  }))
}

export async function getJobs(): Promise<Job[]> {
  const records = await fetchAllRecords("Jobs", '{Status}="Published"')

  return records.map((r: any) => ({
    id: r.id,
    company_slug: r.fields["Company Slug"] || "",
    title: r.fields.Title || "",
    company: r.fields.Company || "",
    location: r.fields.Location || "",
    job_type: r.fields["Job Type"] || "Full-time",
    experience_level: r.fields["Experience Level"] || "Mid",
    sector: r.fields.Sector || "",
    apply_url: r.fields["Apply URL"] || "",
    posted_date: r.fields["Posted Date"] || "",
    source: r.fields.Source || "",
  }))
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  const companies = await getCompanies()
  return companies.find((c) => c.slug === slug)
}

export async function getJobsByCompany(slug: string): Promise<Job[]> {
  const records = await fetchAllRecords("Jobs", `AND({Status}="Published",{Company Slug}="${slug}")`)

  return records.map((r: any) => ({
    id: r.id,
    company_slug: r.fields["Company Slug"] || "",
    title: r.fields.Title || "",
    company: r.fields.Company || "",
    location: r.fields.Location || "",
    job_type: r.fields["Job Type"] || "Full-time",
    experience_level: r.fields["Experience Level"] || "Mid",
    sector: r.fields.Sector || "",
    apply_url: r.fields["Apply URL"] || "",
    posted_date: r.fields["Posted Date"] || "",
    source: r.fields.Source || "",
  }))
}
