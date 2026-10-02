"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import posthog from "posthog-js"
import Link from "next/link"
import { Briefcase, MapPin, Search, X } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { JobAlertModal } from "@/components/job-alert-modal"
import { CompanyLogo } from "@/components/company-logo"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { strings, type Lang } from "@/lib/i18n"
import { DEFAULT_LANG, getStoredLang, setStoredLang } from "@/lib/lang"
import { companies, getCompanyBySlug, jobFilterOptions, jobs, jobsScrapedAt } from "@/lib/data"
import type { Job, JobFunction, Seniority } from "@/lib/types"

const AI_APPLY_URL = "https://www.aiapply.co/?via=abdulla"

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

export default function JobsBoard() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG)
  const t = strings[lang]
  const isRTL = lang === "ar"
  const [search, setSearch] = useState("")
  const [sector, setSector] = useState("")
  const [fn, setFn] = useState("")
  const [seniority, setSeniority] = useState("")
  const [showAlert, setShowAlert] = useState(false)

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

  const handleLangChange = useCallback(
    (next: Lang) => {
      posthog.capture("language_toggled", { from: lang, to: next, page: "jobs" })
      setStoredLang(next)
      setLang(next)
    },
    [lang],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return jobs.filter((job) => {
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      const matchesSector = !sector || job.sector === sector
      const matchesFn = !fn || job.function === fn
      const matchesSeniority = !seniority || job.experience_level === seniority
      return matchesSearch && matchesSector && matchesFn && matchesSeniority
    })
  }, [search, sector, fn, seniority])

  const companyCount = useMemo(() => new Set(filtered.map((j) => j.company_slug)).size, [filtered])
  const updatedLabel = jobsScrapedAt ? jobsScrapedAt.slice(0, 10) : ""

  const openAlert = (source: string) => {
    setShowAlert(true)
    posthog.capture("job_alert_popup_opened", { source, page: "jobs" })
    if (source === "header" || source === "inline") {
      posthog.capture("job_alert_cta_clicked", { source, page: "jobs" })
    }
  }

  const clearFilters = () => {
    setSearch("")
    setSector("")
    setFn("")
    setSeniority("")
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen"
      style={{
        backgroundColor: "#F5F0E6",
        backgroundImage: "url(/texture-light.png)",
        backgroundSize: "100px 100px",
        backgroundRepeat: "repeat",
      }}
    >
      <a
        href={AI_APPLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => posthog.capture("ai_apply_clicked", { placement: "jobs_banner" })}
        className="block bg-[#06634D] text-white px-4 py-3 sm:py-3.5 hover:bg-[#044D3B] transition-colors"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm sm:text-base font-semibold">{t.aiApplyBannerLine}</span>
          <span className="inline-flex items-center bg-[#FFBA0A] text-[#111827] font-bold px-4 py-1.5 rounded text-sm whitespace-nowrap">
            {t.aiApplyBannerOffer}
          </span>
        </div>
      </a>

      <header className="border-b border-[#06634D]/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Link href="/" className="inline-block">
                <h1 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold leading-none text-[#06634D] tracking-tight">
                  BUILDSAUDI
                </h1>
              </Link>
              <p className="mt-2 text-[#111827] text-base font-semibold">{t.jobsBoard}</p>
              <p className="mt-1 text-sm text-[#4B5563] max-w-2xl">{t.jobsTagline}</p>
              <p className="mt-2 text-sm font-mono text-[#06634D]">
                {filtered.length} {t.jobsCount}
                {" · "}
                {companyCount} {t.jobsCompanies}
                {updatedLabel ? ` · ${t.jobsUpdated} ${updatedLabel}` : ""}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium border border-[#06634D]/40 text-[#06634D] rounded hover:bg-[#06634D]/5"
                >
                  {t.companiesDirectory}
                </Link>
                <button
                  type="button"
                  onClick={() => openAlert("header")}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-transparent text-[#06634D] border border-[#06634D]/40 rounded hover:bg-[#06634D]/5 cursor-pointer"
                >
                  {t.searchJobs}
                </button>
              </div>
            </div>
            <LanguageToggle lang={lang} onLanguageChange={handleLangChange} />
          </div>
        </div>
      </header>

      <div className="border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 space-y-3">
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 size-4 text-[#4B5563]" />
            <Input
              placeholder={t.jobsSearchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-lg text-base sm:text-sm border-[#E5E7EB] bg-white ps-11 shadow-sm placeholder:text-[#4B5563] focus-visible:border-[#06634D] focus-visible:ring-[#06634D]/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute end-4 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#111827]"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <FilterSelect
              value={sector}
              onChange={setSector}
              options={jobFilterOptions.sector}
              placeholder={t.allSectors}
              labels={Object.fromEntries(jobFilterOptions.sector.map((s) => [s, s]))}
            />
            <FilterSelect
              value={fn}
              onChange={setFn}
              options={[...jobFilterOptions.function]}
              placeholder={t.allFunctions}
              labels={Object.fromEntries(
                jobFilterOptions.function.map((f) => [f, functionLabel(f as JobFunction, t)]),
              )}
            />
            <FilterSelect
              value={seniority}
              onChange={setSeniority}
              options={[...jobFilterOptions.seniority]}
              placeholder={t.allSeniority}
              labels={Object.fromEntries(
                jobFilterOptions.seniority.map((s) => [s, seniorityLabel(s, t)]),
              )}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="rounded-lg border border-[#06634D]/20 bg-white px-4 py-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-[#4B5563]">{t.jobsCoverage}</p>
          <button
            type="button"
            onClick={() => openAlert("inline")}
            className="shrink-0 inline-flex items-center justify-center px-3 py-2 text-xs font-semibold bg-[#D73833] text-white rounded hover:bg-[#B82E2A]"
          >
            {t.jobAlertSubmit}
          </button>
        </div>

        <div className="space-y-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} t={t} />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-lg border border-[#E5E7EB] bg-white px-6 py-16 text-center">
              <Briefcase className="mx-auto size-8 text-[#D1D5DB] mb-3" />
              <p className="text-sm text-[#4B5563]">
                {t.noJobs}{" "}
                <button type="button" onClick={clearFilters} className="text-[#06634D] hover:underline">
                  {t.clearFilters}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
      <JobAlertModal
        open={showAlert}
        lang={lang}
        onClose={(method) => {
          if (method !== "success") {
            posthog.capture("job_alert_popup_dismissed", { dismiss_method: method, page: "jobs" })
          }
          setShowAlert(false)
        }}
      />
    </div>
  )
}

function JobCard({ job, t }: { job: Job; t: (typeof strings)[Lang] }) {
  const company = getCompanyBySlug(job.company_slug) || companies.find((c) => c.slug === job.company_slug)

  const handleApply = () => {
    posthog.capture("job_apply_clicked", {
      company: job.company,
      company_slug: job.company_slug,
      url: job.apply_url,
      job_title: job.title,
      placement: "jobs_board",
    })
  }

  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden">
      <div className="flex items-start sm:items-center gap-3 sm:gap-5 px-4 sm:px-5 py-4">
        {company ? (
          <Link
            href={`/company/${company.slug}`}
            className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden"
          >
            <CompanyLogo company={company} />
          </Link>
        ) : (
          <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-[#06634D] text-white font-bold">
            {job.company.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-[#111827] group-hover:text-[#06634D] transition-colors">
            {job.title}
          </h2>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[#6B7280]">
            <Link href={`/company/${job.company_slug}`} className="font-medium text-[#111827] hover:text-[#06634D]">
              {job.company}
            </Link>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              <span dir="ltr">{job.location}</span>
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {job.sector && (
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] uppercase tracking-wider rounded">
                {job.sector}
              </span>
            )}
            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] uppercase tracking-wider rounded">
              {functionLabel(job.function, t)}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] uppercase tracking-wider rounded">
              {seniorityLabel(job.experience_level, t)}
            </span>
          </div>
        </div>
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleApply}
          className="shrink-0 px-3 py-2 bg-[#06634D] text-white text-xs sm:text-sm font-semibold rounded hover:bg-[#044D3B] transition-colors whitespace-nowrap"
        >
          {t.apply}
        </a>
      </div>
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  labels,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  labels: Record<string, string>
}) {
  return (
    <Select value={value || undefined} onValueChange={(v) => onChange(v === "__all__" ? "" : v)}>
      <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#06634D] rounded text-start text-xs h-10">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">{placeholder}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {labels[opt] || opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
