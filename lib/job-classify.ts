import type { JobFunction, Seniority } from "./types"

export function classifyFunction(title: string): JobFunction {
  const t = title.toLowerCase()

  if (/\b(product designer|designer|ux|ui|graphic|figma|brand designer)\b/.test(t) || t.includes("تصميم")) {
    return "design"
  }
  if (/\b(product manager|product owner|product lead|product intern|pm\b|pmm)\b/.test(t)) {
    return "product"
  }
  if (
    /\b(software|developer|engineer|backend|frontend|fullstack|full-stack|devops|sre|cybersecurity|security|cloud|machine learning|\bml\b|\bai\b|data engineer|data scientist|mobile|ios|android|qa|quality assurance|embedded|network|platform)\b/.test(
      t,
    ) ||
    t.includes("مهندس")
  ) {
    return "engineering"
  }
  if (
    /\b(sales|account executive|account manager|business development|\bbd\b|partnership|key account)\b/.test(t) ||
    t.includes("مبيعات")
  ) {
    return "sales"
  }
  if (
    /\b(marketing|growth|seo|content|copywriter|social media|communications|pr\b|public relation|brand manager)\b/.test(
      t,
    ) ||
    t.includes("تسويق")
  ) {
    return "marketing"
  }
  if (
    /\b(hr\b|human resource|talent|recruiter|people operations|people partner|employee relations)\b/.test(t)
  ) {
    return "people"
  }
  if (
    /\b(finance|accounting|accountant|treasury|financial|auditor|controller|tax)\b/.test(t) ||
    t.includes("محاسب") ||
    t.includes("مالي")
  ) {
    return "finance"
  }
  if (
    /\b(operations|pmo|project|procurement|supply chain|logistics|admin|office manager|coordinator|customer care|customer success|support)\b/.test(
      t,
    )
  ) {
    return "operations"
  }
  return "other"
}

export function classifySeniority(title: string): Seniority {
  const t = title.toLowerCase()
  if (
    /\b(intern|internship|co-op|coop|trainee|tamheer|fresh grad|fresh graduate)\b/.test(t) ||
    t.includes("متدرب") ||
    t.includes("تدريب")
  ) {
    return "intern"
  }
  if (/\b(junior|entry[- ]level|associate|builders program)\b/.test(t)) {
    return "entry"
  }
  if (
    /\b(senior|sr\.|staff|principal|lead|manager|director|head of|vp\b|vice president|chief|c-level)\b/.test(t)
  ) {
    return "senior"
  }
  return "mid"
}

export function cleanLocation(loc: string): string {
  if (!loc) return "Saudi Arabia"
  const parts = loc
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
  const deduped: string[] = []
  for (const p of parts) {
    if (!deduped.length || deduped[deduped.length - 1].toLowerCase() !== p.toLowerCase()) {
      deduped.push(p)
    }
  }
  return deduped.join(", ") || "Saudi Arabia"
}

const SA_INDICATORS = [
  "saudi arabia",
  "saudi",
  "ksa",
  "riyadh",
  "jeddah",
  "dammam",
  "khobar",
  "dhahran",
  "makkah",
  "mecca",
  "medina",
  "tabuk",
  "abha",
  "neom",
  "الرياض",
  "المملكة العربية السعودية",
  "السعودية",
]

export function isSaudiLocation(text: string): boolean {
  const t = (text || "").toLowerCase()
  return SA_INDICATORS.some((s) => t.includes(s))
}
