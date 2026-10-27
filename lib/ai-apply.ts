export const AI_APPLY_COPY = {
  ar: {
    benefit: "AI Apply يزيد فرصك تجيب مقابلات بنسبة ٥٠٪",
    speed: "قدّم على ٢٠ من هالوظايف خلال ١٠ دقايق مع AI Apply",
  },
  en: {
    benefit: "AI Apply increases your chances of getting interviews by 50%",
    speed: "Apply to 20 of these in 10 minutes with AI Apply",
  },
} as const

export const AI_APPLY_BENEFIT_LINE = AI_APPLY_COPY.en.benefit
export const AI_APPLY_SPEED_LINE = AI_APPLY_COPY.en.speed
export const AI_APPLY_PROMO_EVERY = 5

const AI_APPLY_HOST_EN = "https://www.aiapply.co/"
const AI_APPLY_HOST_AR = "https://aiapply.co/ar"
const AI_APPLY_VIA = "abdulla"
const UTM_SOURCE = "buildsaudi"

export function sanitizeAiApplySrc(src: string | null | undefined): string {
  const cleaned = (src ?? "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64)
  return cleaned || "unknown"
}

export function resolveAiApplyLang(lang: string | null | undefined): "ar" | "en" {
  return lang === "en" ? "en" : "ar"
}

export function aiApplyHref(src: string, lang?: string | null): string {
  const params = new URLSearchParams()
  params.set("src", sanitizeAiApplySrc(src))
  if (lang === "en" || lang === "ar") params.set("lang", lang)
  return `/go/ai-apply?${params.toString()}`
}

export function aiApplyDestination(
  src: string | null | undefined,
  lang?: string | null,
): string {
  const resolved = resolveAiApplyLang(lang)
  const url = new URL(resolved === "ar" ? AI_APPLY_HOST_AR : AI_APPLY_HOST_EN)
  url.searchParams.set("via", AI_APPLY_VIA)
  url.searchParams.set("utm_source", UTM_SOURCE)
  url.searchParams.set("utm_medium", sanitizeAiApplySrc(src))
  return url.toString()
}

export function shouldInsertAiApplyPromo(index: number): boolean {
  return (index + 1) % AI_APPLY_PROMO_EVERY === 0
}
