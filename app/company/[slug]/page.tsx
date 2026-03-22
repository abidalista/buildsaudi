import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MapPin, Globe, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { companies, getCompanyBySlug, getJobsByCompany } from "@/lib/data"
import type { Metadata } from "next"

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  if (!company) return {}
  const jobCount = getJobsByCompany(slug).length
  return {
    title: `${company.name} Jobs & Careers — ${jobCount} Open Roles | BuildSaudi`,
    description: `Browse ${jobCount} open jobs at ${company.name}. ${company.description.slice(0, 100)} Apply directly on BuildSaudi.`,
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

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {jobPostingsLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      {/* Header */}
      <header className="border-b border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="block">
              <h1 className="text-3xl font-bold tracking-tight text-[#06634D]" style={{ fontFamily: "var(--font-space-mono), monospace" }}>
                {"["} BUILDSAUDI {"]"}
              </h1>
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
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a1a1a] mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to all jobs
        </Link>

        {/* Company Header */}
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6">
          <div className="flex items-start gap-5">
            {/* Company Logo */}
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden">
              <img
                src={company.logo_url}
                alt={company.name}
                className="size-10 object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold">{company.name}</h2>
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

        {/* CTA to careers page */}
        <div className="rounded-lg border border-[#e5e5e5] bg-white px-6 py-8 text-center">
          <p className="text-sm text-[#6b7280] mb-4">
            view all open positions directly on {company.name}&apos;s careers page
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

      {/* Footer */}
      <footer className="mt-16 border-t border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex items-center justify-between text-xs text-[#9ca3af]">
          <p>buildsaudi.co</p>
          <div className="flex items-center gap-4">
            <Link href="/submit" className="hover:text-[#1a1a1a]">
              Post a Job
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
