"use client"

import { AiApplyPromoCard } from "@/components/ai-apply-promo-card"
import { CompanyApplyRow } from "@/components/company-apply-row"
import { shouldInsertAiApplyPromo } from "@/lib/ai-apply"
import { usePageLang } from "@/lib/use-page-lang"
import type { Company } from "@/lib/types"

export function CompanyApplyList({
  companies,
  aiPlacement,
  promoSrc,
}: {
  companies: Company[]
  aiPlacement: string
  promoSrc: string
}) {
  const { lang } = usePageLang()
  return (
    <div className="space-y-3">
      <AiApplyPromoCard src={promoSrc} lang={lang} />
      {companies.map((company, index) => (
        <div key={company.slug}>
          <CompanyApplyRow company={company} aiPlacement={aiPlacement} />
          {shouldInsertAiApplyPromo(index) ? (
            <div className="mt-3">
              <AiApplyPromoCard src={promoSrc} lang={lang} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
