import type { Company } from "./types"

export type AtsPlatform =
  | "greenhouse"
  | "workable"
  | "lever"
  | "ashby"
  | "recruitee"
  | "smartrecruiters"

export interface AtsBoard {
  platform: AtsPlatform
  board: string
}

/**
 * Confirmed ATS boards for directory companies.
 * Prefer careers_url parsing; these override when the public careers page
 * is a marketing URL but the real board is known from prior scrapes.
 */
export const ATS_OVERRIDES: Record<string, AtsBoard> = {
  lucidya: { platform: "workable", board: "lucidya" },
  mozn: { platform: "workable", board: "mozn" },
  nana: { platform: "workable", board: "nana-grocery-direct" },
  rewaa: { platform: "lever", board: "rewaatech" },
  unifonic: { platform: "recruitee", board: "unifonic" },
  penny: { platform: "workable", board: "penny-software" },
  rasan: { platform: "workable", board: "rasan" },
  mrsool: { platform: "workable", board: "mrsool-3" },
}

export function atsFromCareersUrl(url: string): AtsBoard | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, "")
    const parts = u.pathname.split("/").filter(Boolean)

    if (host.endsWith("greenhouse.io") && parts[0]) {
      return { platform: "greenhouse", board: parts[0] }
    }
    if (host === "apply.workable.com" && parts[0]) {
      return { platform: "workable", board: parts[0] }
    }
    if (host === "jobs.ashbyhq.com" && parts[0]) {
      return { platform: "ashby", board: parts[0] }
    }
    if (host.endsWith("recruitee.com")) {
      const sub = host.replace(".recruitee.com", "")
      if (sub && sub !== host) return { platform: "recruitee", board: sub }
    }
    if (
      (host === "careers.smartrecruiters.com" || host === "jobs.smartrecruiters.com") &&
      parts[0]
    ) {
      return { platform: "smartrecruiters", board: parts[0] }
    }
    if (host === "jobs.lever.co" && parts[0]) {
      return { platform: "lever", board: parts[0] }
    }
  } catch {
    return null
  }
  return null
}

export function getAtsBoard(company: Company): AtsBoard | null {
  return ATS_OVERRIDES[company.slug] ?? atsFromCareersUrl(company.careers_url)
}
