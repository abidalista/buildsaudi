"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import posthog from "posthog-js"
import { X } from "lucide-react"
import { strings, type Lang } from "@/lib/i18n"
import { aiApplyHref } from "@/lib/ai-apply"

const AI_APPLY_UPSELL_KEY = "buildsaudi_ai_apply_upsell_shown"

type UpsellCompany = { name: string; slug: string }

type AiApplyUpsellContextValue = {
  trigger: (company: UpsellCompany) => void
}

const AiApplyUpsellContext = createContext<AiApplyUpsellContextValue>({
  trigger: () => {},
})

export function AiApplyUpsellProvider({
  src,
  lang,
  children,
}: {
  src: string
  lang: Lang
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState<UpsellCompany | null>(null)
  const t = strings[lang]

  const trigger = useCallback(
    (next: UpsellCompany) => {
      try {
        if (sessionStorage.getItem(AI_APPLY_UPSELL_KEY)) return
        sessionStorage.setItem(AI_APPLY_UPSELL_KEY, "1")
      } catch {
        /* private mode */
      }
      setCompany(next)
      setOpen(true)
      posthog.capture("ai_apply_upsell_shown", {
        company: next.name,
        company_slug: next.slug,
        placement: src,
      })
    },
    [src],
  )

  const dismiss = (method: "backdrop" | "close" | "skip") => {
    posthog.capture("ai_apply_upsell_dismissed", { method, placement: src })
    setOpen(false)
  }

  return (
    <AiApplyUpsellContext.Provider value={{ trigger }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 px-4 pb-6 sm:pb-4"
          onClick={() => dismiss("backdrop")}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => dismiss("close")}
              className="absolute top-4 end-4 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <h3 className="text-lg font-bold text-[#111827] pe-8">{t.aiApplyUpsellTitle}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {company
                ? lang === "ar"
                  ? `فتحت صفحة ${company.name}. ${t.aiApplyBenefitLine}`
                  : `You opened ${company.name}. ${t.aiApplyBenefitLine}`
                : t.aiApplyBenefitLine}
            </p>
            <p className="text-sm text-[#06634D] mt-2 leading-relaxed">{t.aiApplySpeedLine}</p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={aiApplyHref(src, lang)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  posthog.capture("ai_apply_clicked", {
                    placement: src,
                    company_slug: company?.slug,
                  })
                  setOpen(false)
                }}
                className="inline-flex items-center justify-center rounded bg-[#FFBA0A] px-4 py-3 text-sm font-bold text-[#111827] hover:bg-[#FFD060] transition-colors"
              >
                {t.aiApplyUpsellCta}
              </a>
              <button
                type="button"
                onClick={() => dismiss("skip")}
                className="text-sm text-gray-500 hover:text-gray-800 py-2"
              >
                {t.aiApplyUpsellSkip}
              </button>
            </div>
          </div>
        </div>
      )}
    </AiApplyUpsellContext.Provider>
  )
}

export function useAiApplyUpsell() {
  return useContext(AiApplyUpsellContext)
}

export function TrackedApplyLink({
  href,
  companyName,
  companySlug,
  jobTitle,
  placement,
  className,
  children,
}: {
  href: string
  companyName: string
  companySlug: string
  jobTitle?: string
  placement: string
  className?: string
  children: ReactNode
}) {
  const { trigger } = useAiApplyUpsell()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        posthog.capture("job_apply_clicked", {
          company: companyName,
          company_slug: companySlug,
          url: href,
          job_title: jobTitle,
          placement,
        })
        trigger({ name: companyName, slug: companySlug })
      }}
      className={className}
    >
      {children}
    </a>
  )
}
