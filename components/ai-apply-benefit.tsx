"use client"

import posthog from "posthog-js"
import { strings, type Lang } from "@/lib/i18n"
import { aiApplyHref } from "@/lib/ai-apply"
import { useResolvedLang } from "@/lib/use-page-lang"

export function AiApplyBenefit({
  placement,
  lang,
  className = "",
}: {
  placement: string
  lang?: Lang
  className?: string
}) {
  const resolved = useResolvedLang(lang)
  const t = strings[resolved]
  return (
    <a
      href={aiApplyHref(placement, resolved)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => posthog.capture("ai_apply_clicked", { placement })}
      className={`inline-flex items-center rounded bg-[#FFBA0A] px-2.5 py-1 text-xs font-bold text-[#111827] hover:bg-[#FFD060] transition-colors whitespace-nowrap ${className}`.trim()}
    >
      {t.aiApplyCta}
    </a>
  )
}
