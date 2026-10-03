import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MapPin, Globe, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { companies, getCompanyBySlug, getJobsByCompany, jobsScrapedAt } from "@/lib/data"
import { jobFreshnessStamp } from "@/lib/job-classify"
import { withBuildSaudiUtm } from "@/lib/utm"
import { getCompanyProfile, hiringNowCopy } from "@/lib/company-profiles"
import { CompanyLogo } from "@/components/company-logo"
import { getCompanyFaq } from "@/lib/aeo-landing"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/aeo-jsonld"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"

const site = "https://buildsaudi.co"

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  if (!company) return {}
  const jobCount = getJobsByCompany(slug).length
  const profile = getCompanyProfile(slug)
  const title =
    jobCount > 0
      ? `${company.name} Jobs and Careers | ${jobCount} Open Roles | BuildSaudi`
      : `${company.name} Careers | ${company.stage} ${company.sector[0]} Startup | BuildSaudi`
  const description = profile
    ? `${profile.summary} ${jobCount > 0 ? `${jobCount} current openings from the official board.` : "Official careers link included."} Last checked ${profile.lastChecked}. BuildSaudi does not process applications.`
    : jobCount > 0
      ? `Browse ${jobCount} open roles at ${company.name}. ${company.description.slice(0, 100)} Apply on the official careers page. BuildSaudi does not process applications.`
      : `${company.description.slice(0, 120)} Explore ${company.name}'s BuildSaudi profile. ${company.stage} ${company.sector[0]} startup in ${company.city}. Careers link included.`
  return {
    title,
    description,
    alternates: { canonical: `${site}/company/${slug}` },
  }
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)

  if (!company) {
    notFound()
  }

  const companyJobs = getJobsByCompany(slug)
  const profile = getCompanyProfile(slug)
  const pageUrl = `${site}/company/${slug}`
  const primarySector = company.sector[0]
  const careersUrl = withBuildSaudiUtm(company.careers_url)
  const faq = [
    ...(profile?.faq ?? []),
    ...getCompanyFaq(company.name, primarySector, company.city, company.stage, careersUrl),
  ]
  const careersSameAsWebsite =
    company.website.replace(/\/$/, "") === company.careers_url.replace(/\/$/, "")
  const jobsSeen = jobsScrapedAt ? jobsScrapedAt.slice(0, 10) : ""
  const lastChecked = profile?.lastChecked || jobsSeen
  const hiringCopy = hiringNowCopy(company.name, companyJobs, jobsScrapedAt)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.website,
    description: profile?.summary || company.description,
    address: { "@type": "PostalAddress", addressLocality: company.city, addressCountry: "SA" },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    sameAs: [company.linkedin, company.website].filter(Boolean),
    ...(company.founded_year ? { foundingDate: String(company.founded_year) } : {}),
  }

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl,
    name: `${company.name} careers`,
    description: profile?.summary || company.description,
    ...(lastChecked ? { dateModified: lastChecked, lastReviewed: lastChecked } : {}),
  }

  const jobPostingsLd = companyJobs.map((job) => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.title} at ${company.name}`,
    datePosted: job.posted_date,
    employmentType: job.job_type === "Full-time" ? "FULL_TIME" : job.job_type === "Part-time" ? "PART_TIME" : job.job_type === "Contract" ? "CONTRACTOR" : "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: company.name, sameAs: company.website },
    url: job.apply_url,
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location.includes("Remote") ? "Remote" : job.location, addressCountry: "SA" } },
    directApply: true,
  }))

  const faqLd = buildFaqJsonLd(faq)
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: company.name, url: pageUrl },
  ])

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {jobPostingsLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      <header className="border-b border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="block">
              <div className="text-3xl font-bold tracking-tight text-[#06634D]" style={{ fontFamily: "var(--font-space-mono), monospace" }} aria-label="BuildSaudi">
                {"["} BUILDSAUDI {"]"}
              </div>
            </Link>
            <Link href="/jobs">
              <Button
                variant="outline"
                size="sm"
                className="border-[#06634D] text-[#06634D] hover:bg-[#06634D] hover:text-white"
              >
                Jobs
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-8 pb-24 sm:pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a1a1a] mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Link>

        <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden">
              <CompanyLogo company={company} className="size-10 object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{company.name}</h1>
                <Badge variant="outline" className="text-xs font-medium text-[#06634D] border-[#06634D]">
                  {company.stage}
                </Badge>
              </div>

              <div className="mt-2 flex items-center gap-3 flex-wrap text-sm text-[#6b7280]">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {company.city}
                </span>
                {company.sector.map((s) => (
                  <Badge key={s} variant="secondary" className="text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>

              <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                {profile?.summary || company.description}
              </p>
              {profile || (jobsSeen && companyJobs.length > 0) ? (
                <p className="mt-3 text-xs font-mono text-[#06634D]">
                  {profile ? `Facts last checked ${profile.lastChecked}` : null}
                  {profile && jobsSeen && companyJobs.length > 0 ? " · " : null}
                  {jobsSeen && companyJobs.length > 0 ? `Openings last seen ${jobsSeen}` : null}
                </p>
              ) : null}

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded bg-[#06634D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#044D3B] transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                  Apply at {company.name}
                </a>
                <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                  {!careersSameAsWebsite ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#06634D]"
                    >
                      <Globe className="size-3.5" />
                      Website
                    </a>
                  ) : null}
                  {company.linkedin ? (
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#06634D]"
                    >
                      <Linkedin className="size-3.5" />
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {profile ? (
          <section className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6" aria-labelledby="sourced-facts-heading">
            <h2 id="sourced-facts-heading" className="text-lg font-bold text-[#111827] mb-1">
              Funding and investors
            </h2>
            <p className="text-xs text-[#6b7280] mb-4">
              Only facts we can cite from a company or investor page. We do not estimate later rounds or headcount.
            </p>
            {profile.founders ? (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#111827]">Founders</h3>
                <p className="mt-1 text-sm text-[#4b5563] leading-relaxed">{profile.founders.text}</p>
                <SourceLink label={profile.founders.sourceLabel} href={profile.founders.sourceUrl} />
              </div>
            ) : null}
            {profile.funding.length > 0 ? (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#111827]">Funding</h3>
                <ul className="mt-2 space-y-3">
                  {profile.funding.map((item) => (
                    <li key={item.text}>
                      <p className="text-sm text-[#4b5563] leading-relaxed">{item.text}</p>
                      <SourceLink label={item.sourceLabel} href={item.sourceUrl} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {profile.investors.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold text-[#111827]">Investors</h3>
                <ul className="mt-2 space-y-3">
                  {profile.investors.map((item) => (
                    <li key={item.text}>
                      <p className="text-sm text-[#4b5563] leading-relaxed">{item.text}</p>
                      <SourceLink label={item.sourceLabel} href={item.sourceUrl} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {!profile.founders && profile.funding.length === 0 && profile.investors.length === 0 ? (
              <p className="text-sm text-[#4b5563] leading-relaxed">
                We have not verified founders, funding amounts, or investor names on a company or investor page for this profile.
              </p>
            ) : null}
          </section>
        ) : null}

        {profile || companyJobs.length > 0 ? (
        <section className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6" aria-labelledby="open-roles-heading">
          <h2 id="open-roles-heading" className="text-lg font-bold text-[#111827] mb-2">
            {companyJobs.length > 0 ? `Open roles at ${company.name}` : `Roles at ${company.name}`}
          </h2>
          <p className="text-sm text-[#4b5563] leading-relaxed mb-4">{hiringCopy}</p>
          {companyJobs.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {companyJobs.map((job) => {
                const freshness = jobFreshnessStamp(job, jobsScrapedAt)
                return (
                <li key={job.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111827]">{job.title}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5" dir="ltr">
                      {job.location}
                      {freshness ? ` · ${freshness.kind === "posted" ? "Posted" : "Last seen"} ${freshness.date}` : ""}
                    </p>
                  </div>
                  <a
                    href={withBuildSaudiUtm(job.apply_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 bg-[#06634D] text-white text-xs font-semibold rounded hover:bg-[#044D3B]"
                  >
                    Apply
                  </a>
                </li>
                )
              })}
            </ul>
          )}
        </section>
        ) : null}

        <section className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6" aria-labelledby="company-faq-heading">
          <h2 id="company-faq-heading" className="text-lg font-bold text-[#111827] mb-4">
            FAQ: {company.name}
          </h2>
          <dl className="space-y-4">
            {faq.map((item) => (
              <div key={item.question}>
                <dt className="text-sm font-semibold text-[#111827]" dir="auto">
                  {item.question}
                </dt>
                <dd className="mt-1 text-sm text-[#4b5563] leading-relaxed" dir="auto">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e5e5e5] bg-white/95 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
        <a
          href={careersUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-1.5 rounded bg-[#06634D] px-3 py-3 text-sm font-semibold text-white"
        >
          <ExternalLink className="size-3.5" />
          Apply at {company.name}
        </a>
      </div>

      <SiteFooter />
    </div>
  )
}

function SourceLink({ label, href }: { label: string; href: string }) {
  return (
    <p className="mt-1 text-xs text-[#6b7280]">
      Source:{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#06634D] hover:underline">
        {label}
      </a>
    </p>
  )
}
