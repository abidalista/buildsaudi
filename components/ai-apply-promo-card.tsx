"use client"

import posthog from "posthog-js"
import { strings, type Lang } from "@/lib/i18n"
import { aiApplyHref } from "@/lib/ai-apply"
import { useResolvedLang } from "@/lib/use-page-lang"

export function AiApplyPromoCard({ src, lang }: { src: string; lang?: Lang }) {
  const resolved = useResolvedLang(lang)
  const t = strings[resolved]
  return (
    <a
      href={aiApplyHref(src, resolved)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => posthog.capture("ai_apply_clicked", { placement: src })}
      className="block rounded-lg border-2 border-[#FFBA0A] bg-[#FFF8E1] px-4 py-4 sm:px-5 hover:bg-[#FFF3C4] transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0 w-full text-start">
          <p className="text-sm sm:text-base font-bold text-[#111827]">{t.aiApplySpeedLine}</p>
          <p className="mt-1 text-sm text-[#06634D]">{t.aiApplyBenefitLine}</p>
        </div>
        <span className="shrink-0 inline-flex items-center justify-center rounded bg-[#FFBA0A] px-4 py-2 text-sm font-bold text-[#111827] whitespace-nowrap">
          {t.aiApplyCta}
        </span>
      </div>
    </a>
  )
}
