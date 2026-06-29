import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MapPin, Globe, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { companies, getCompanyBySlug, getJobsByCompany } from "@/lib/data"
import { CompanyLogo } from "@/components/company-logo"
import { getCompanyFaq } from "@/lib/aeo-landing"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/aeo-jsonld"
import LandingAeoSection from "@/components/landing-aeo-section"
import { CompanyAeoAbout } from "@/components/landing-aeo-about"
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
      ? `Browse ${jobCount} open jobs at ${company.name}. ${company.description.slice(0, 100)} Apply directly on BuildSaudi.`
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.website,
    description: company.description,
    address: { "@type": "PostalAddress", addressLocality: company.city, addressCountry: "SA" },
  }

  const jobPostingsLd = companyJobs.map((job) => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.title} at ${company.name}`,
    datePosted: job.posted_date,
    employmentType: job.job_type === "Full-time" ? "FULL_TIME" : job.job_type === "Part-time" ? "PART_TIME" : job.job_type === "Contract" ? "CONTRACTOR" : "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: company.name, sameAs: company.website },
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
            <Link href="/submit">
              <Button
                variant="outline"
                size="sm"
                className="border-[#06634D] text-[#06634D] hover:bg-[#06634D] hover:text-white"
              >
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a1a1a] mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to all jobs
        </Link>

        <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden">
              <CompanyLogo company={company} className="size-10 object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{company.name} Careers</h1>
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

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={company.careers_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded bg-[#06634D] px-3 py-1.5 text-sm font-mono text-white hover:bg-[#044D3B] transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                  View Jobs
                </a>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[#06634D] hover:underline"
                >
                  <Globe className="size-3.5" />
                  Website
                </a>
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[#06634D] hover:underline"
                >
                  <Linkedin className="size-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[#e5e5e5] bg-white px-6 py-8 text-center">
          <p className="text-sm text-[#6b7280] mb-4">
            View all open positions directly on {company.name}&apos;s careers page
          </p>
          <a
            href={company.careers_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#06634D] px-4 py-2 text-sm font-mono text-white hover:bg-[#044D3B] transition-colors"
          >
            <ExternalLink className="size-3.5" />
            View Jobs at {company.name}
          </a>
        </div>
      </main>

      <footer className="mt-16 border-t border-[#06634D]/15 bg-white/60">
        <div className="mx-auto max-w-[1200px] px-6 py-8 sm:py-10">
          <LandingAeoSection
            heading={`About ${company.name}`}
            aboutTitle={`${company.name} company profile`}
            aboutContent={
              <CompanyAeoAbout
                companyName={company.name}
                description={company.description}
                sector={primarySector}
                city={company.city}
                stage={company.stage}
                slug={slug}
              />
            }
            faq={faq}
            ariaLabel={`About ${company.name}`}
          />
        </div>
      </footer>
    </div>
  )
}
