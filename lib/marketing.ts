/** Rounded live Published count for user-facing copy. Airtable Status=Published is ~161. Do not use companies.length (stale seed) in marketing. */
export const MARKETING_COMPANY_COUNT = 160
export const MARKETING_COMPANY_COUNT_LABEL = "160+"
export const MARKETING_COMPANY_COUNT_LABEL_AR = "١٦٠+"

export function catalogCountLabel(visibleCount: number, seedCount: number, lang: "ar" | "en"): string {
  if (visibleCount === seedCount) {
    return lang === "ar" ? MARKETING_COMPANY_COUNT_LABEL_AR : MARKETING_COMPANY_COUNT_LABEL
  }
  return String(visibleCount)
}
