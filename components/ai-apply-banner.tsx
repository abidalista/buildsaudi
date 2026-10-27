"use client"

import posthog from "posthog-js"
import { strings, type Lang } from "@/lib/i18n"
import { aiApplyHref } from "@/lib/ai-apply"

export function AiApplyBanner({ src, lang }: { src: string; lang: Lang }) {
  const t = strings[lang]
  return (
    <a
      href={aiApplyHref(src, lang)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => posthog.capture("ai_apply_clicked", { placement: src })}
      className="sticky top-0 z-50 block bg-[#06634D] text-white px-4 py-3 sm:py-3.5 hover:bg-[#044D3B] transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <span className="flex flex-col items-center sm:items-start gap-0.5 text-start">
          <span className="text-sm sm:text-base font-semibold">{t.aiApplyBenefitLine}</span>
          <span className="text-xs sm:text-sm text-white/90">{t.aiApplySpeedLine}</span>
        </span>
        <span className="inline-flex items-center bg-[#FFBA0A] text-[#111827] font-bold px-4 py-1.5 rounded text-sm whitespace-nowrap">
          {t.aiApplyCta}
        </span>
      </div>
    </a>
  )
}
