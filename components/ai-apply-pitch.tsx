"use client"

import { useEffect, useRef } from "react"
import posthog from "posthog-js"
import { strings, type Lang } from "@/lib/i18n"
import { aiApplyHref } from "@/lib/ai-apply"
import { useResolvedLang } from "@/lib/use-page-lang"
import { cn } from "@/lib/utils"

export function AiApplyPitch({
  src,
  lang,
  page,
  city,
  companySlug,
  className = "mt-5",
}: {
  src: string
  lang?: Lang
  page?: string
  city?: string
  companySlug?: string
  className?: string
}) {
  const resolved = useResolvedLang(lang)
  const t = strings[resolved]
  const shown = useRef(false)

  useEffect(() => {
    if (shown.current) return
    shown.current = true
    posthog.capture("ai_apply_shown", {
      placement: src,
      page,
      city,
      company_slug: companySlug,
    })
  }, [src, page, city, companySlug])

  return (
    <a
      href={aiApplyHref(src, resolved)}
      target="_blank"
      rel="noopener noreferrer"
      data-ph-capture
      data-ai-apply-pitch={src}
      onClick={() =>
        posthog.capture("ai_apply_clicked", {
          placement: src,
          page,
          city,
          company_slug: companySlug,
        })
      }
      className={cn(
        "block rounded-xl border-2 border-[#FFBA0A] bg-[#FFF8E1] px-5 py-5 sm:px-6 sm:py-6 hover:bg-[#FFF3C4] transition-colors",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="min-w-0 w-full text-start text-base sm:text-xl font-bold text-[#111827] leading-snug">
          {t.aiApplySpeedLine}
        </p>
        <span className="shrink-0 inline-flex items-center justify-center rounded-lg bg-[#FFBA0A] px-5 py-2.5 text-sm sm:text-base font-bold text-[#111827] whitespace-nowrap">
          {t.aiApplyCta}
        </span>
      </div>
    </a>
  )
}
