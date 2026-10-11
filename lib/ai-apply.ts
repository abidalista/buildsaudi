export const AI_APPLY_BENEFIT_LINE =
  "AI Apply increases your chances of getting interviews by 50%"

const AI_APPLY_HOST = "https://www.aiapply.co/"
const AI_APPLY_VIA = "abdulla"
const UTM_SOURCE = "buildsaudi"

export function sanitizeAiApplySrc(src: string | null | undefined): string {
  const cleaned = (src ?? "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64)
  return cleaned || "unknown"
}

export function aiApplyHref(src: string): string {
  return `/go/ai-apply?src=${encodeURIComponent(sanitizeAiApplySrc(src))}`
}

export function aiApplyDestination(src: string | null | undefined): string {
  const url = new URL(AI_APPLY_HOST)
  url.searchParams.set("via", AI_APPLY_VIA)
  url.searchParams.set("utm_source", UTM_SOURCE)
  url.searchParams.set("utm_medium", sanitizeAiApplySrc(src))
  return url.toString()
}
