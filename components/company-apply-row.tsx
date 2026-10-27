"use client"

import Link from "next/link"
import { CompanyLogo } from "@/components/company-logo"
import { AiApplyBenefit } from "@/components/ai-apply-benefit"
import { TrackedApplyLink } from "@/components/ai-apply-upsell"
import { usePageLang } from "@/lib/use-page-lang"
import { withBuildSaudiUtm } from "@/lib/utm"
import type { Company } from "@/lib/types"

export function CompanyApplyRow({
  company,
  aiPlacement,
}: {
  company: Company
  aiPlacement: string
}) {
  const { lang, t } = usePageLang()
  const applyUrl = withBuildSaudiUtm(company.careers_url)
  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 sm:gap-5 px-5 py-4">
        <Link
          href={`/company/${company.slug}`}
          className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden"
        >
          <CompanyLogo company={company} />
        </Link>
        <Link href={`/company/${company.slug}`} className="flex-1 min-w-0 block">
          <span className="text-lg font-bold text-[#111827] group-hover:text-[#06634D] transition-colors">
            {company.name}
          </span>
          <p className="mt-0.5 text-sm text-[#6B7280] truncate">{company.description}</p>
        </Link>
        <div className="flex-shrink-0 flex flex-col items-end gap-1.5 sm:gap-2">
          <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">
            {company.sector[0]}
          </span>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">
              {company.stage}
            </span>
            <AiApplyBenefit placement={aiPlacement} lang={lang} />
            <TrackedApplyLink
              href={applyUrl}
              companyName={company.name}
              companySlug={company.slug}
              placement={aiPlacement}
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-[#06634D] text-white text-[10px] sm:text-xs font-semibold rounded hover:bg-[#06634D]/90 transition-colors whitespace-nowrap"
            >
              {t.apply}
            </TrackedApplyLink>
          </div>
        </div>
      </div>
    </div>
  )
}
