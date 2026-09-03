import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MapPin, Globe, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { companies, getCompanyBySlug, getJobsByCompany } from "@/lib/data"
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
  const title =
    jobCount > 0
      ? `${company.name} Jobs & Careers — ${jobCount} Open Roles | BuildSaudi`
      : `${company.name} Careers — ${company.stage} ${company.sector[0]} Startup | BuildSaudi`
  const description =
    jobCount > 0
      ? `Browse ${jobCount} open roles at ${company.name}. ${company.description.slice(0, 100)} Apply on the official careers page — BuildSaudi does not process applications.`
      : `${company.description.slice(0, 120)} Explore ${company.name}'s BuildSaudi profile — ${company.stage} ${company.sector[0]} startup in ${company.city}. Careers link included.`
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
  const pageUrl = `${site}/company/${slug}`
  const primarySector = company.sector[0]
  const faq = getCompanyFaq(company.name, primarySector, company.city, company.stage, company.careers_url)
  const careersSameAsWebsite =
    company.website.replace(/\/$/, "") === company.careers_url.replace(/\/$/, "")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.website,
    description: company.description,
    address: { "@type": "PostalAddress", addressLocality: company.city, addressCountry: "SA" },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    sameAs: [company.linkedin, company.website].filter(Boolean),
    ...(company.founded_year ? { foundingDate: String(company.founded_year) } : {}),
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
                {company.description}
              </p>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={company.careers_url}
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

        {companyJobs.length > 0 && (
          <section className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6" aria-labelledby="open-roles-heading">
            <h2 id="open-roles-heading" className="text-lg font-bold text-[#111827] mb-4">
              Open roles at {company.name}
            </h2>
            <ul className="divide-y divide-gray-100">
              {companyJobs.map((job) => (
                <li key={job.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111827]">{job.title}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5" dir="ltr">
                      {job.location}
                    </p>
                  </div>
                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 bg-[#06634D] text-white text-xs font-semibold rounded hover:bg-[#044D3B]"
                  >
                    Apply
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6" aria-labelledby="company-faq-heading">
          <h2 id="company-faq-heading" className="text-lg font-bold text-[#111827] mb-4">
            FAQ — {company.name}
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
          href={company.careers_url}
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
