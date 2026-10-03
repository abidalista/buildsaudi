const UTM_SOURCE = "buildsaudi"
const UTM_MEDIUM = "referral"

function isAiApplyUrl(url: URL): boolean {
  return url.hostname === "www.aiapply.co" || url.hostname === "aiapply.co"
}

/**
 * Append attribution to employer careers / Apply URLs.
 * Preserves existing query params and hash. Does not change the host.
 * Leaves AI Apply affiliate links untouched.
 */
export function withBuildSaudiUtm(url: string): string {
  if (!url) return url
  try {
    const parsed = new URL(url)
    if (isAiApplyUrl(parsed)) return url
    if (!parsed.searchParams.has("utm_source")) {
      parsed.searchParams.set("utm_source", UTM_SOURCE)
    }
    if (!parsed.searchParams.has("utm_medium")) {
      parsed.searchParams.set("utm_medium", UTM_MEDIUM)
    }
    return parsed.toString()
  } catch {
    return url
  }
}
