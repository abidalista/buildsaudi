"use client"

import posthog from "posthog-js"
import { AI_APPLY_BENEFIT_LINE, aiApplyHref } from "@/lib/ai-apply"

export function AiApplyBenefit({
  placement,
  className = "",
}: {
  placement: string
  className?: string
}) {
  return (
    <a
      href={aiApplyHref(placement)}
      target="_blank"
      rel="noopener noreferrer"
      dir="ltr"
      onClick={() => posthog.capture("ai_apply_clicked", { placement })}
      className={`block w-fit max-w-full text-[11px] leading-snug text-[#06634D] hover:underline ${className}`.trim()}
    >
      {AI_APPLY_BENEFIT_LINE}
    </a>
  )
}
