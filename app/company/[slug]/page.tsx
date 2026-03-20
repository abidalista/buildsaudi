import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MapPin, Globe, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { companies, getCompanyBySlug, getJobsByCompany } from "@/lib/data"

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }))
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

  return (
    <div className="min-h-screen">
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

        {/* Open Roles */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#06634D]">
            Open Roles ({companyJobs.length})
          </h3>
        </div>

        <div className="space-y-3">
          {companyJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center gap-4 rounded-lg border border-[#e5e5e5] bg-white px-5 py-4 transition-all hover:border-[#d0d0d0] hover:shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#1a1a1a]">{job.title}</h4>
                <div className="mt-0.5 flex items-center gap-2 text-sm text-[#6b7280]">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {job.location}
                  </span>
                  <span className="text-[#d0d0d0]">·</span>
                  <span>{job.job_type}</span>
                  <span className="text-[#d0d0d0]">·</span>
                  <span>{job.experience_level}</span>
                </div>
              </div>

              <a
                href={job.apply_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="h-7 bg-[#06634D] text-xs hover:bg-[#044D3B]"
                >
                  Apply
                  <ExternalLink className="ml-1 size-3" />
                </Button>
              </a>
            </div>
          ))}

          {companyJobs.length === 0 && (
            <div className="rounded-lg border border-[#e5e5e5] bg-white px-6 py-12 text-center">
              <p className="text-sm text-[#6b7280]">
                no open roles at the moment. check back soon.
              </p>
            </div>
          )}
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
