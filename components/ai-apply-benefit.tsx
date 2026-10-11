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
      onClick={() => posthog.capture("ai_apply_clicked", { placement })}
      className={`text-[11px] leading-snug text-[#06634D] hover:underline ${className}`.trim()}
    >
      {AI_APPLY_BENEFIT_LINE}
    </a>
  )
}
