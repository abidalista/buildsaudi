"use client"

import type { ReactNode } from "react"
import { AiApplyBanner } from "@/components/ai-apply-banner"
import { AiApplyUpsellProvider } from "@/components/ai-apply-upsell"
import { PageLangProvider, usePageLang } from "@/lib/use-page-lang"

function ShellInner({
  children,
  bannerSrc,
  upsellSrc,
  className,
}: {
  children: ReactNode
  bannerSrc: string
  upsellSrc: string
  className?: string
}) {
  const { lang, isRTL } = usePageLang()
  return (
    <AiApplyUpsellProvider src={upsellSrc} lang={lang}>
      <div dir={isRTL ? "rtl" : "ltr"} className={className ?? "min-h-screen bg-[#F9F9F9]"}>
        <AiApplyBanner src={bannerSrc} lang={lang} />
        {children}
      </div>
    </AiApplyUpsellProvider>
  )
}

export function AiApplyPageShell({
  children,
  bannerSrc,
  upsellSrc,
  page,
  className,
}: {
  children: ReactNode
  bannerSrc: string
  upsellSrc: string
  page: string
  className?: string
}) {
  return (
    <PageLangProvider page={page}>
      <ShellInner bannerSrc={bannerSrc} upsellSrc={upsellSrc} className={className}>
        {children}
      </ShellInner>
    </PageLangProvider>
  )
}
