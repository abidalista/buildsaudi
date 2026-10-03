import { extractJobCity } from "./job-classify"

export const PREF_FIELD = {
  roles: "Pref Job Types",
  cities: "Pref Locations",
  sectors: "Pref Sectors",
  experience: "Pref Experience",
  stages: "Pref Stages",
} as const

export type DigestPrefs = {
  roles: string[]
  cities: string[]
  sectors: string[]
  experience: string[]
  stages: string[]
}

export type PrefJob = {
  function?: string
  sector?: string
  experience_level?: string
  location?: string
  city?: string
  stage?: string
  company_slug?: string
}

export function emptyPrefs(): DigestPrefs {
  return { roles: [], cities: [], sectors: [], experience: [], stages: [] }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function parsePrefList(raw: unknown): string[] {
  if (raw == null || raw === "") return []
  const parts = Array.isArray(raw) ? raw.map(String) : String(raw).split(/[,;\n|/]+/)
  const seen = new Set<string>()
  const out: string[] = []
  for (const part of parts) {
    const value = part.trim()
    if (!value) continue
    const key = value.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(value)
  }
  return out
}

export function serializePrefList(values: string[]): string {
  return values.map((value) => value.trim()).filter(Boolean).join(", ")
}

export function prefsFromAirtableFields(fields: Record<string, unknown>): DigestPrefs {
  return {
    roles: parsePrefList(fields[PREF_FIELD.roles]),
    cities: parsePrefList(fields[PREF_FIELD.cities]),
    sectors: parsePrefList(fields[PREF_FIELD.sectors]),
    experience: parsePrefList(fields[PREF_FIELD.experience]),
    stages: parsePrefList(fields[PREF_FIELD.stages]),
  }
}

export function prefsToAirtableFields(prefs: DigestPrefs): Record<string, string> {
  return {
    [PREF_FIELD.roles]: serializePrefList(prefs.roles),
    [PREF_FIELD.cities]: serializePrefList(prefs.cities),
    [PREF_FIELD.sectors]: serializePrefList(prefs.sectors),
    [PREF_FIELD.experience]: serializePrefList(prefs.experience),
    [PREF_FIELD.stages]: serializePrefList(prefs.stages),
  }
}

export function hasAnyPref(prefs: DigestPrefs): boolean {
  return (
    prefs.roles.length +
      prefs.cities.length +
      prefs.sectors.length +
      prefs.experience.length +
      prefs.stages.length >
    0
  )
}

function axisMatches(wanted: string[], value: string): boolean {
  if (!wanted.length) return true
  const needle = (value || "").trim().toLowerCase()
  if (!needle) return false
  return wanted.some((item) => item.trim().toLowerCase() === needle)
}

export function jobMatchesPrefs(job: PrefJob, prefs: DigestPrefs, stage?: string): boolean {
  const city = (job.city || extractJobCity(job.location || "")).trim()
  const jobStage = (stage || job.stage || "").trim()
  return (
    axisMatches(prefs.roles, job.function || "") &&
    axisMatches(prefs.cities, city) &&
    axisMatches(prefs.sectors, job.sector || "") &&
    axisMatches(prefs.experience, job.experience_level || "") &&
    axisMatches(prefs.stages, jobStage)
  )
}

/** Monday one-list digest: keep a job if it matches any subscriber who set prefs. */
export function jobMatchesAnyConfiguredPrefs(
  job: PrefJob,
  prefsList: DigestPrefs[],
  stage?: string,
): boolean {
  const configured = prefsList.filter(hasAnyPref)
  if (!configured.length) return true
  return configured.some((prefs) => jobMatchesPrefs(job, prefs, stage))
}
