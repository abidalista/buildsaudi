"use client"

import Link from "next/link"
import { ExternalLink, MapPin } from "lucide-react"
import { AiApplyBenefit } from "@/components/ai-apply-benefit"
import { AiApplyPromoCard } from "@/components/ai-apply-promo-card"
import { TrackedApplyLink } from "@/components/ai-apply-upsell"
import { CompanyLogo } from "@/components/company-logo"
import { companies, getCompanyBySlug, jobsScrapedAt } from "@/lib/data"
import { jobFreshnessStamp } from "@/lib/job-classify"
import { usePageLang } from "@/lib/use-page-lang"
import { withBuildSaudiUtm } from "@/lib/utm"
import type { Job } from "@/lib/types"

export function HubJobRow({
  job,
  placement,
  promo = false,
}: {
  job: Job
  placement: string
  promo?: boolean
}) {
  const { lang, t } = usePageLang()
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
              {freshness.kind === "posted" ? t.jobPosted : t.jobSeen} {freshness.date}
            </p>
          ) : null}
        </div>
        <div className="shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-1.5">
          <AiApplyBenefit placement={placement} lang={lang} />
          <TrackedApplyLink
            href={applyUrl}
            companyName={job.company}
            companySlug={job.company_slug}
            jobTitle={job.title}
            placement={placement}
            className="inline-flex shrink-0 items-center gap-1.5 rounded bg-[#06634D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#044D3B] sm:text-sm"
          >
            <ExternalLink className="size-3.5" />
            {t.apply}
          </TrackedApplyLink>
        </div>
      </div>
      {promo ? (
        <div className="mt-3">
          <AiApplyPromoCard src="hub_card" lang={lang} />
        </div>
      ) : null}
    </li>
  )
}
