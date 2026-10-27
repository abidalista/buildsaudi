import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AiApplyPageShell } from "@/components/ai-apply-page-shell"
import { AiApplyPromoCard } from "@/components/ai-apply-promo-card"
import { HubJobRow } from "@/components/hub-job-row"
import { PageLangToggle } from "@/components/page-lang-toggle"
import { SiteFooter } from "@/components/site-footer"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/aeo-jsonld"
import { shouldInsertAiApplyPromo } from "@/lib/ai-apply"
import {
  getJobHubFaq,
  jobHubCompanies,
  jobHubDescription,
  jobHubLastChecked,
  relatedJobHubs,
  type JobHub,
} from "@/lib/job-hubs"

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

  const placement = hub.kind === "role" ? "role_page" : "city_sector_hub"

  return (
    <AiApplyPageShell bannerSrc="hub_banner" upsellSrc="hub_upsell" page="job_hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827]">
              <ArrowLeft className="size-3.5 rtl:rotate-180" />
              Back to all openings
            </Link>
            <PageLangToggle />
          </div>
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
        <div className="mb-4">
          <AiApplyPromoCard src="hub_card" />
        </div>
        <ul className="space-y-3">
          {hub.jobs.map((job, index) => (
            <HubJobRow key={job.id} job={job} placement={placement} promo={shouldInsertAiApplyPromo(index)} />
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
    </AiApplyPageShell>
  )
}
