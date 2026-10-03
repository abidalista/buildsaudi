import type { Metadata } from "next"
import { jobs } from "@/lib/data"
import { buildBreadcrumbJsonLd } from "@/lib/aeo-jsonld"
import JobsBoard from "@/components/jobs-board"

const site = "https://buildsaudi.co"
const companyCount = new Set(jobs.map((j) => j.company_slug)).size

export const metadata: Metadata = {
  title: `Saudi Startup Jobs — ${jobs.length} Open Roles | BuildSaudi`,
  description: `Browse ${jobs.length} individual openings at ${companyCount} funded Saudi startups. Filter by role, level, city, and sector. Apply on the employer's official careers page. وظائف شركات ناشئة في السعودية.`,
  alternates: { canonical: `${site}/jobs` },
  openGraph: {
    title: `Saudi Startup Jobs — ${jobs.length} Open Roles | BuildSaudi`,
    description: `Individual openings at funded Saudi startups. Apply direct.`,
    url: `${site}/jobs`,
  },
}

function firstParam(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : ""
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const initialFilters = {
    q: firstParam(params.q),
    role: firstParam(params.role),
    level: firstParam(params.level),
    city: firstParam(params.city),
    sector: firstParam(params.sector),
  }

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: "Jobs", url: `${site}/jobs` },
  ])

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saudi Startup Jobs",
    numberOfItems: jobs.length,
    itemListElement: jobs.slice(0, 30).map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: job.apply_url,
      name: `${job.title} — ${job.company}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <JobsBoard initialFilters={initialFilters} />
    </>
  )
}
