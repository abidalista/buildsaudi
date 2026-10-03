"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { SiteFooter } from "@/components/site-footer"
import { companies, getCompanyBySlug, jobFilterOptions, jobs } from "@/lib/data"
import { emptyPrefs, jobMatchesPrefs, type DigestPrefs } from "@/lib/digest-prefs"
import { strings, type Lang } from "@/lib/i18n"
import { DEFAULT_LANG, getStoredLang, setStoredLang } from "@/lib/lang"
import type { JobFunction, Seniority } from "@/lib/types"
import { withBuildSaudiUtm } from "@/lib/utm"

const STAGE_OPTIONS = [
  ...new Set([...["Seed", "Series A", "Series B", "Growth", "Unicorn"], ...companies.map((c) => c.stage)]),
].filter(Boolean).sort()

function functionLabel(fn: JobFunction, t: (typeof strings)[Lang]): string {
  const map: Record<JobFunction, string> = {
    engineering: t.fnEngineering,
    product: t.fnProduct,
    design: t.fnDesign,
    sales: t.fnSales,
    marketing: t.fnMarketing,
    operations: t.fnOperations,
    people: t.fnPeople,
    finance: t.fnFinance,
    other: t.fnOther,
  }
  return map[fn]
}

function seniorityLabel(level: Seniority, t: (typeof strings)[Lang]): string {
  const map: Record<Seniority, string> = {
    intern: t.snIntern,
    entry: t.snEntry,
    mid: t.snMid,
    senior: t.snSenior,
  }
  return map[level]
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function PreferencesForm({ initialEmail }: { initialEmail: string }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG)
  const t = strings[lang]
  const isRTL = lang === "ar"
  const [email, setEmail] = useState(initialEmail)
  const [prefs, setPrefs] = useState<DigestPrefs>(emptyPrefs())
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "saved" | "missing" | "error">("idle")

  useEffect(() => {
    setLang(getStoredLang())
  }, [])

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = isRTL ? "ar" : "en"
    return () => {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    }
  }, [isRTL])

  const loadPrefs = useCallback(async (lookupEmail: string) => {
    if (!lookupEmail.trim()) return
    setStatus("loading")
    try {
      const res = await fetch(`/api/preferences?email=${encodeURIComponent(lookupEmail.trim())}`)
      if (res.status === 404) {
        setStatus("missing")
        return
      }
      if (!res.ok) {
        setStatus("error")
        return
      }
      const data = await res.json()
      setPrefs({ ...emptyPrefs(), ...data.prefs })
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }, [])

  useEffect(() => {
    if (!initialEmail.trim()) return
    void loadPrefs(initialEmail)
  }, [initialEmail, loadPrefs])

  const savePrefs = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus("saving")
    try {
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), prefs }),
      })
      if (res.status === 404) {
        setStatus("missing")
        return
      }
      if (!res.ok) {
        setStatus("error")
        return
      }
      setStatus("saved")
    } catch {
      setStatus("error")
    }
  }

  const matching = useMemo(() => {
    return jobs.filter((job) => {
      const company = getCompanyBySlug(job.company_slug)
      return jobMatchesPrefs(job, prefs, company?.stage)
    })
  }, [prefs])

  const handleLangChange = (next: Lang) => {
    setStoredLang(next)
    setLang(next)
  }

  return (
    <div
      className="min-h-screen"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backgroundColor: "#F5F0E6",
        backgroundImage: "url(/texture-light.png)",
        backgroundSize: "100px 100px",
        backgroundRepeat: "repeat",
        fontFamily: "var(--font-ibm-plex-arabic), sans-serif",
      }}
    >
      <p className="sr-only">اختبار الاتجاه</p>
      <header className="border-b border-[#06634D]/20">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-6 sm:px-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-[#06634D]"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t.prefsBack}
          </Link>
            <LanguageToggle lang={lang} onLanguageChange={handleLangChange} />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full text-start">
          <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">{t.prefsTitle}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">{t.prefsTagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{t.prefsEmptyHint}</p>
        </div>

        <form onSubmit={savePrefs} className="mt-8 space-y-6">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-[#6B7280]" htmlFor="prefs-email">
              {t.email}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="prefs-email"
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06634D]"
              />
              <button
                type="button"
                onClick={() => void loadPrefs(email)}
                disabled={status === "loading" || !email.trim()}
                className="shrink-0 rounded-lg border border-[#06634D]/40 px-3 py-2 text-sm font-medium text-[#06634D] hover:bg-[#06634D]/5 disabled:opacity-50"
              >
                {status === "loading" ? t.submitting : t.prefsLoad}
              </button>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">{t.prefsEmailHint}</p>
          </div>

          <CheckboxGroup
            legend={t.jobFunction}
            options={jobFilterOptions.function}
            selected={prefs.roles}
            labels={Object.fromEntries(
              jobFilterOptions.function.map((fn) => [fn, functionLabel(fn as JobFunction, t)]),
            )}
            onChange={(roles) => setPrefs((current) => ({ ...current, roles }))}
          />
          <CheckboxGroup
            legend={t.hqCity}
            options={jobFilterOptions.city}
            selected={prefs.cities}
            onChange={(cities) => setPrefs((current) => ({ ...current, cities }))}
          />
          <CheckboxGroup
            legend={t.sector}
            options={jobFilterOptions.sector}
            selected={prefs.sectors}
            onChange={(sectors) => setPrefs((current) => ({ ...current, sectors }))}
          />
          <CheckboxGroup
            legend={t.seniority}
            options={[...jobFilterOptions.seniority]}
            selected={prefs.experience}
            labels={Object.fromEntries(
              jobFilterOptions.seniority.map((level) => [level, seniorityLabel(level, t)]),
            )}
            onChange={(experience) => setPrefs((current) => ({ ...current, experience }))}
          />
          <CheckboxGroup
            legend={t.prefsCompanyStage}
            options={STAGE_OPTIONS}
            selected={prefs.stages}
            onChange={(stages) => setPrefs((current) => ({ ...current, stages }))}
          />

          {status === "saved" && <p className="text-sm font-medium text-green-700">{t.prefsSaved}</p>}
          {status === "missing" && <p className="text-sm text-red-600">{t.prefsNotFound}</p>}
          {status === "error" && <p className="text-sm text-red-600">{t.prefsError}</p>}

          <button
            type="submit"
            disabled={status === "saving" || !email.trim()}
            className="w-full rounded-lg bg-[#D73833] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B82E2A] disabled:opacity-50"
          >
            {status === "saving" ? t.submitting : t.prefsSave}
          </button>
        </form>

        <p className="mt-4 text-xs leading-relaxed text-[#6B7280]">{t.prefsUnsub}</p>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-[#111827]">
            {t.prefsMatching}{" "}
            <span dir="ltr" className="text-[#6B7280]">
              ({matching.length})
            </span>
          </h2>
          <div className="mt-4 space-y-3">
            {matching.slice(0, 20).map((job) => {
              const applyUrl = withBuildSaudiUtm(job.apply_url)
              return (
                <div key={job.id} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 text-start">
                      <p className="font-semibold text-[#111827]" dir="auto">
                        {job.title}
                      </p>
                      <p className="mt-0.5 text-sm text-[#6B7280]">
                        {job.company}
                        {job.location ? ` · ${job.location}` : ""}
                      </p>
                    </div>
                    <a
                      href={applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded bg-[#06634D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#044D3B]"
                    >
                      {t.apply}
                    </a>
                  </div>
                </div>
              )
            })}
            {matching.length === 0 && <p className="text-sm text-[#4B5563]">{t.prefsNone}</p>}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function CheckboxGroup({
  legend,
  options,
  selected,
  labels,
  onChange,
}: {
  legend: string
  options: string[]
  selected: string[]
  labels?: Record<string, string>
  onChange: (next: string[]) => void
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs uppercase tracking-wider text-[#6B7280]">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option)
          return (
            <label
              key={option}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                checked
                  ? "border-[#06634D] bg-[#06634D]/10 text-[#06634D]"
                  : "border-gray-200 bg-white text-[#111827]"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(toggleValue(selected, option))}
                className="size-3.5 accent-[#06634D]"
              />
              {labels?.[option] || option}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
