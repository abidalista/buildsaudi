import Link from "next/link"
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react"
import { companies, getCompanyBySlug, jobsScrapedAt } from "@/lib/data"
import { jobFreshnessStamp } from "@/lib/job-classify"
import { withBuildSaudiUtm } from "@/lib/utm"
import { CompanyLogo } from "@/components/company-logo"
import { SiteFooter } from "@/components/site-footer"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/aeo-jsonld"
import {
  getJobHubFaq,
  jobHubCompanies,
  jobHubDescription,
  jobHubLastChecked,
  relatedJobHubs,
  type JobHub,
} from "@/lib/job-hubs"
import type { Job } from "@/lib/types"

const site = "https://buildsaudi.co"

export { jobHubTitle, jobHubDescription } from "@/lib/job-hubs"

export function JobHubView({ hub }: { hub: JobHub }) {
  const pageUrl = `${site}${hub.path}`
  const checked = jobHubLastChecked()
  const companiesOnList = jobHubCompanies(hub)
  const faq = getJobHubFaq(hub)
  const related = relatedJobHubs(hub)
  const crumbParent =
    hub.kind === "role"
      ? { name: `${hub.facetName} jobs`, url: `${site}/jobs` }
      : { name: `${hub.facetName} jobs`, url: `${site}/jobs` }

  const faqLd = buildFaqJsonLd(faq)
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: "Jobs", url: `${site}/jobs` },
    crumbParent,
    { name: `${hub.facetName} in ${hub.cityName}`, url: pageUrl },
  ])
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${hub.facetName} jobs in ${hub.cityName}`,
    description: jobHubDescription(hub),
    numberOfItems: hub.jobs.length,
    itemListElement: hub.jobs.map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: job.apply_url,
      name: `${job.title} at ${job.company}`,
    })),
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Link href="/jobs" className="mb-4 inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827]">
            <ArrowLeft className="size-3.5" />
            Back to all openings
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">
            {hub.facetName} jobs in {hub.cityName}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#4B5563]">
            {hub.jobs.length} current {hub.jobs.length === 1 ? "opening" : "openings"} from official ATS
            boards. Companies on this list: {companiesOnList.join(", ")}. Apply on the employer page.
            BuildSaudi does not process applications.
          </p>
          {checked ? (
            <p className="mt-2 font-mono text-sm text-[#06634D]">
              {hub.jobs.length} {hub.jobs.length === 1 ? "opening" : "openings"} · {companiesOnList.length}{" "}
              {companiesOnList.length === 1 ? "company" : "companies"} · Last checked {checked}
            </p>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ul className="space-y-3">
          {hub.jobs.map((job) => (
            <HubJobRow key={job.id} job={job} />
          ))}
        </ul>

        {related.length > 0 ? (
          <section className="mt-10" aria-labelledby="related-hubs-heading">
            <h2 id="related-hubs-heading" className="text-lg font-bold text-[#111827]">
              More lists in {hub.cityName}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="inline-flex items-center rounded border border-[#06634D]/30 px-3 py-1.5 text-xs font-medium text-[#06634D] hover:bg-[#06634D]/5"
                  >
                    {item.facetName} ({item.jobs.length})
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12 border-t border-[#06634D]/15 pt-8" aria-labelledby="hub-faq-heading">
          <h2 id="hub-faq-heading" className="text-lg font-bold text-[#111827]">
            FAQ: {hub.facetName} in {hub.cityName}
          </h2>
          <dl className="mt-6 space-y-6">
            {faq.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold text-[#111827]" dir="auto">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#4B5563] sm:text-base" dir="auto">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function HubJobRow({ job }: { job: Job }) {
  const company = getCompanyBySlug(job.company_slug) || companies.find((c) => c.slug === job.company_slug)
  const applyUrl = withBuildSaudiUtm(job.apply_url)
  const freshness = jobFreshnessStamp(job, jobsScrapedAt)

  return (
    <li className="rounded-lg border border-gray-200 bg-white px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3 sm:items-center sm:gap-5">
        {company ? (
          <Link
            href={`/company/${company.slug}`}
            className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white sm:size-14"
          >
            <CompanyLogo company={company} />
          </Link>
        ) : (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#06634D] font-bold text-white sm:size-14">
            {job.company.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-[#111827] sm:text-lg" dir="auto">
            {job.title}
          </p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-[#6B7280]">
            <Link href={`/company/${job.company_slug}`} className="font-medium text-[#111827] hover:text-[#06634D]">
              {job.company}
            </Link>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              <span dir="ltr">{job.location}</span>
            </span>
          </p>
          {freshness ? (
            <p className="mt-1 text-xs text-[#6B7280]" dir="ltr">
              {freshness.kind === "posted" ? "Posted" : "Last seen"} {freshness.date}
            </p>
          ) : null}
        </div>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded bg-[#06634D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#044D3B] sm:text-sm"
        >
          <ExternalLink className="size-3.5" />
          Apply
        </a>
      </div>
    </li>
  )
}
