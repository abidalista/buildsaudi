"use client"

/* eslint-disable @next/next/no-page-custom-font */
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Search, Building2, X, ChevronDown, PlusCircle } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { strings, type Lang } from "@/lib/i18n"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { companies, getJobsByCompany, filterOptions } from "@/lib/data"
import { CompanyLogo } from "@/components/company-logo"

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en")
  const t = strings[lang]
  const isRTL = lang === "ar"
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    jobType: "",
    experienceLevel: "",
    sector: "",
    city: "",
    companyStage: "",
  })
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const [showSuggest, setShowSuggest] = useState(false)
  const [showJobSeeker, setShowJobSeeker] = useState(false)
  const [jobSeekerForm, setJobSeekerForm] = useState({ name: "", title: "", email: "" })
  const [jobSeekerStatus, setJobSeekerStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  // Auto-popup: 8 seconds OR 25% scroll, whichever first. Once per day.
  useEffect(() => {
    const STORAGE_KEY = "buildsaudi_popup_dismissed"
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed && Date.now() - parseInt(dismissed) < 86400000) return // 24 hours

    let triggered = false
    const trigger = () => {
      if (triggered) return
      triggered = true
      setShowJobSeeker(true)
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
      window.removeEventListener("scroll", onScroll)
      clearTimeout(timer)
    }

    const timer = setTimeout(trigger, 8000)

    const onScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollPct >= 0.25) trigger()
    }
    window.addEventListener("scroll", onScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const handleJobSeekerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobSeekerForm.name.trim() || !jobSeekerForm.title.trim() || !jobSeekerForm.email.trim()) return
    setJobSeekerStatus("submitting")
    try {
      const res = await fetch("/api/job-seeker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobSeekerForm),
      })
      if (res.ok) {
        setJobSeekerStatus("success")
        setTimeout(() => {
          setShowJobSeeker(false)
          setJobSeekerForm({ name: "", title: "", email: "" })
          setJobSeekerStatus("idle")
        }, 2000)
      } else {
        setJobSeekerStatus("error")
      }
    } catch {
      setJobSeekerStatus("error")
    }
  }
  const [suggestForm, setSuggestForm] = useState({ companyName: "", website: "", details: "" })
  const [suggestStatus, setSuggestStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!suggestForm.companyName.trim()) return
    setSuggestStatus("submitting")
    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suggestForm),
      })
      if (res.ok) {
        setSuggestStatus("success")
        setTimeout(() => {
          setShowSuggest(false)
          setSuggestForm({ companyName: "", website: "", details: "" })
          setSuggestStatus("idle")
        }, 2000)
      } else {
        setSuggestStatus("error")
      }
    } catch {
      setSuggestStatus("error")
    }
  }

  const toggleCard = (slug: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const q = search.toLowerCase()
      const companyJobs = getJobsByCompany(company.slug)
      const matchesSearch =
        !q ||
        company.name.toLowerCase().includes(q) ||
        company.description.toLowerCase().includes(q) ||
        company.sector.some((s) => s.toLowerCase().includes(q)) ||
        companyJobs.some((j) => j.title.toLowerCase().includes(q))

      const matchesSector =
        !filters.sector || company.sector.some((s) => s === filters.sector)
      const matchesCity =
        !filters.city || company.city.toLowerCase().includes(filters.city.toLowerCase())
      const matchesStage =
        !filters.companyStage || company.stage === filters.companyStage

      return matchesSearch && matchesSector && matchesCity && matchesStage
    }).sort((a, b) => (b.founded_year || 0) - (a.founded_year || 0))
  }, [search, filters])

  const clearFilters = () => {
    setSearch("")
    setFilters({
      jobType: "",
      experienceLevel: "",
      sector: "",
      city: "",
      companyStage: "",
    })
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setEmailSubmitted(true)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E6", backgroundImage: "url(/texture-light.png)", backgroundSize: "100px 100px", backgroundRepeat: "repeat", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      {/* Arabic font */}
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {/* ============ HEADER ============ */}
      <header className="border-b border-[#06634D]/20 bg-transparent">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start justify-between gap-4 sm:gap-6">
            {/* Left: Logo + tagline + action buttons */}
            <div className="flex-1">
              {/* Logo */}
              <div className="flex justify-center sm:justify-start mb-3">
                <Link href="/" className="relative inline-block px-5 py-3">
                  {/* Top-left corner */}
                  <span className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-l-[3px] border-t-[3px] border-[#06634D]/30" />
                  {/* Top-right corner */}
                  <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-r-[3px] border-t-[3px] border-[#06634D]/30" />
                  {/* Bottom-left corner */}
                  <span className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-l-[3px] border-b-[3px] border-[#06634D]/30" />
                  {/* Bottom-right corner */}
                  <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-r-[3px] border-b-[3px] border-[#06634D]/30" />
                  <h1
                    className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none text-[#06634D] tracking-tight"
                    
                  >
                    BUILDSAUDI
                  </h1>
                </Link>
              </div>

              {/* Tagline */}
              <p className="text-[#111827] text-base font-semibold mb-2 text-center sm:text-left">
                {t.tagline}
              </p>

              {/* Action buttons row */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-3">
                {/* Made by pill */}
                <a href="https://x.com/abidalista" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1.5 bg-[#06634D]/5 border border-[#06634D]/30 rounded text-xs text-[#06634D] whitespace-nowrap hover:bg-[#06634D]/10 transition-colors">
                  {lang === "ar" ? (
                    <span dir="ltr"><span className="text-[#D73833] font-bold">Abdulla</span> {t.madeBy}</span>
                  ) : (
                    <><span>{t.madeBy}</span> <span className="text-[#D73833] font-bold">Abdulla</span></>
                  )}
                </a>

                {/* {t.searchJobs} */}
                <button
                  onClick={() => setShowJobSeeker(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#D73833] text-white border border-[#D73833] rounded hover:bg-[#D73833]/90 transition-all whitespace-nowrap"
                >
                  <svg className="size-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  {t.searchJobs}
                </button>
              </div>


              {/* Mobile language toggle */}
              <div className="mt-3 flex justify-end lg:hidden">
                <LanguageToggle defaultLang="en" onLanguageChange={setLang} />
              </div>

              {/* Mobile {t.hotCompanies} */}
              <div className="mt-2 w-full bg-[#D73833]/10 border-2 border-[#D73833] rounded-lg p-3 lg:hidden">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔥</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-[#D73833]">
                    {t.hotCompanies}
                  </span>
                </div>
                <div className="divide-y divide-[#D73833]/30">
                  {companies.filter((c) => ["humain", "atam", "lucidya"].includes(c.slug)).map((c) => (
                    <div key={c.slug} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#D73833] hover:underline"
                      >
                        {c.name}
                      </a>
                      <span className="text-sm text-[#111827]">{c.sector[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Toggle + {t.hotCompanies} */}
            <div className="hidden lg:flex flex-col items-end gap-2 flex-shrink-0">
              {/* Language Toggle */}
              <LanguageToggle defaultLang="en" onLanguageChange={setLang} />
              {/* {t.hotCompanies} box */}
              <div className="w-[280px] bg-[#D73833]/10 border-2 border-[#D73833] rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔥</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-[#D73833]">
                    {t.hotCompanies}
                  </span>
                </div>
                <div className="divide-y divide-[#D73833]/30">
                  {companies.filter((c) => ["humain", "atam", "lucidya"].includes(c.slug)).map((c) => (
                    <div key={c.slug} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#D73833] hover:underline"
                      >
                        {c.name}
                      </a>
                      <span className="text-sm text-[#111827]">{c.sector[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ SEARCH BAR ============ */}
      <div className="border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#4B5563]" />
            <Input
              id="search-input"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-lg text-base sm:text-sm border-[#E5E7EB] bg-white pl-11 text-sm shadow-sm placeholder:text-[#4B5563] focus-visible:border-[#06634D] focus-visible:ring-[#06634D]/20"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#111827]"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block sticky top-20 z-40 space-y-4 lg:space-y-6">
            {/* Portrait Gallery */}
            <div className="flex items-end justify-center gap-2">
              {["/portraits/2.jpg", "/portraits/3.jpg", "/portraits/1.jpg"].map((src) => (
                <div
                  key={src}
                  className="overflow-hidden w-[72px] h-[90px]"
                  style={{
                    border: "4px solid #3B2414",
                    boxShadow: "inset 0 0 0 1.5px #C9A94E, 0 3px 8px rgba(0,0,0,0.15)",
                    padding: "3px",
                    backgroundColor: "#FDF8F0",
                  }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* FILTERS heading */}
            <h2 className="text-sm uppercase tracking-wider text-[#06634D]">
              Filters
            </h2>

            {/* Filter dropdowns */}
            <div className="w-full">
              <FilterSelect
                label="Sector"
                value={filters.sector}
                onChange={(v) => setFilters((f) => ({ ...f, sector: v }))}
                options={filterOptions.sector}
                placeholder={t.allSectors}
              />
            </div>
            <div className="w-full">
              <FilterSelect
                label="Stage"
                value={filters.companyStage}
                onChange={(v) => setFilters((f) => ({ ...f, companyStage: v }))}
                options={filterOptions.companyStage}
                placeholder={t.allStages}
              />
            </div>

            {/* Suggest Company button */}
            <button
              onClick={() => setShowSuggest(true)}
              className="flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-[#D97706] border border-[#B45309] rounded text-xs text-white font-semibold hover:bg-[#B45309] hover:shadow-md transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              {t.suggestCompany}
            </button>

            {/* Company count */}
            <p className="text-xs text-[#4B5563]">
              {filteredCompanies.length} {t.companies}
            </p>
          </aside>

          {/* Job Listings */}
          <div className="flex-1 min-w-0">
            {/* Mobile Portraits */}
            <div className="flex items-end justify-center gap-3 mb-4 lg:hidden">
              {["/portraits/2.jpg", "/portraits/3.jpg", "/portraits/1.jpg"].map((src) => (
                <div
                  key={src}
                  className="overflow-hidden w-[60px] h-[75px]"
                  style={{
                    border: "3px solid #3B2414",
                    boxShadow: "inset 0 0 0 1px #C9A94E, 0 2px 6px rgba(0,0,0,0.15)",
                    padding: "2px",
                    backgroundColor: "#FDF8F0",
                  }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Mobile Filters */}
            <div className="flex flex-wrap gap-2 mb-4 lg:hidden">
              <FilterSelect
                value={filters.sector}
                onChange={(v) => setFilters((f) => ({ ...f, sector: v }))}
                options={filterOptions.sector}
                placeholder={t.sector}
              />
              <FilterSelect
                value={filters.companyStage}
                onChange={(v) => setFilters((f) => ({ ...f, companyStage: v }))}
                options={filterOptions.companyStage}
                placeholder={t.stage}
              />
              <button
                onClick={() => setShowSuggest(true)}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFBA0A]/10 border border-[#FFBA0A] rounded text-[11px] text-[#333333] hover:bg-[#FFBA0A]/20 transition-all"
              >
                <PlusCircle className="w-3 h-3" />
                {t.suggestCompany}
              </button>
            </div>


            {/* Company Cards */}
            <div className="space-y-2 sm:space-y-3">
              {filteredCompanies.map((company) => {
                const isExpanded = expandedCards.has(company.slug)
                return (
                  <div
                    key={company.slug}
                    className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 cursor-pointer" onClick={() => toggleCard(company.slug)}>
                      {/* Mobile: stacked layout. Desktop: single row */}
                      <div className="flex items-start sm:items-center gap-3 sm:gap-5">
                        {/* Company Logo */}
                        <div className="flex size-10 sm:size-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-white border border-gray-200 overflow-hidden">
                          <CompanyLogo company={company} />
                        </div>

                        {/* Company Info + Badges */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start sm:items-center justify-between gap-2">
                            <div className="min-w-0">
                              <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-base sm:text-lg font-bold text-[#111827] hover:text-[#06634D] transition-colors line-clamp-1"
                              >
                                {company.name}
                              </a>
                              <p className="mt-0.5 text-xs sm:text-sm text-[#4B5563] line-clamp-1">
                                {company.description}
                              </p>
                            </div>

                            {/* Badges - desktop only inline */}
                            <div className="hidden sm:flex flex-shrink-0 flex-col items-end gap-2">
                              <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs uppercase tracking-wider rounded whitespace-nowrap">
                                {company.sector[0]}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs uppercase tracking-wider rounded whitespace-nowrap">
                                  {company.stage}
                                </span>
                                <a
                                  href={company.careers_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-2.5 py-1 bg-[#06634D] text-white text-xs rounded hover:bg-[#06634D]/90 transition-colors whitespace-nowrap"
                                >
                                  {t.viewJobs}
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Badges - mobile: row below name */}
                          <div className="flex items-center gap-1.5 mt-2 sm:hidden flex-wrap">
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] uppercase tracking-wider rounded whitespace-nowrap">
                              {company.sector[0]}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] uppercase tracking-wider rounded whitespace-nowrap">
                              {company.stage}
                            </span>
                            <a
                              href={company.careers_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-2 py-0.5 bg-[#06634D] text-white text-[11px] rounded hover:bg-[#06634D]/90 transition-colors whitespace-nowrap"
                            >
                              {t.viewJobs}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Centered Chevron Toggle */}
                      <div className="flex justify-center mt-2">
                        <ChevronDown className={`size-5 text-gray-600 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{ maxHeight: isExpanded ? "400px" : "0", opacity: isExpanded ? 1 : 0 }}
                    >
                      <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
                        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3">
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-600">{t.founders}</div>
                            <div className="text-xs sm:text-sm text-gray-900 break-words font-medium">{company.founders || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-600">{t.totalRaised}</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.total_raised || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-600">{t.hqCity}</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.city}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-600">{t.employees}</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.team_size || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-600">{t.founded}</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.founded_year || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-600">Last Round</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.last_round_date || "—"}</div>
                          </div>
                        </div>
                        {/* Socials row */}
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200">
                          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-600 hover:text-gray-900 transition-colors p-1">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                          <a href={company.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-600 hover:text-gray-900 transition-colors p-1">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {filteredCompanies.length === 0 && (
                <div className="rounded-lg border border-[#E5E7EB] bg-white px-6 py-16 text-center">
                  <Building2 className="mx-auto size-8 text-[#D1D5DB] mb-3" />
                  <p className="text-sm text-[#4B5563]">
                    no companies match your filters.{" "}
                    <button
                      onClick={clearFilters}
                      className="text-[#06634D] hover:underline"
                    >
                      clear all filters
                    </button>
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ============ JOB SEEKER MODAL ============ */}
      {showJobSeeker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => { setShowJobSeeker(false); setJobSeekerStatus("idle") }}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setShowJobSeeker(false); setJobSeekerStatus("idle") }} className="absolute top-4 right-4 text-gray-600 hover:text-gray-600">
              <X className="size-5" />
            </button>

            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 rounded-full bg-[#D73833]/10 flex items-center justify-center mb-3">
                <Search className="size-6 text-[#D73833]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">{t.searchJobs}</h3>
              <p className="text-sm text-gray-600 mt-1">Sign up to get notified about Saudi startup jobs</p>
            </div>

            {jobSeekerStatus === "success" ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm font-medium text-green-700">You&apos;re in! We&apos;ll notify you when jobs drop.</p>
              </div>
            ) : (
              <form onSubmit={handleJobSeekerSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={jobSeekerForm.name}
                    onChange={(e) => setJobSeekerForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D73833] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Software Engineer"
                    value={jobSeekerForm.title}
                    onChange={(e) => setJobSeekerForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D73833] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={jobSeekerForm.email}
                    onChange={(e) => setJobSeekerForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D73833] focus:border-transparent"
                  />
                </div>
                {jobSeekerStatus === "error" && (
                  <p className="text-sm text-red-600">Something went wrong. Try again.</p>
                )}
                <button
                  type="submit"
                  disabled={jobSeekerStatus === "submitting"}
                  className="w-full py-2.5 bg-[#D73833] text-white font-semibold text-sm rounded-lg hover:bg-[#B82E2A] disabled:opacity-50 transition-colors"
                >
                  {jobSeekerStatus === "submitting" ? "Submitting..." : "Sign Up"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============ SUGGEST COMPANY MODAL ============ */}
      {showSuggest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => { setShowSuggest(false); setSuggestStatus("idle") }}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setShowSuggest(false); setSuggestStatus("idle") }} className="absolute top-4 right-4 text-gray-600 hover:text-gray-600">
              <X className="size-5" />
            </button>

            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <PlusCircle className="size-6 text-[#06634D]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">{t.suggestCompany}</h3>
              <p className="text-sm text-gray-600 mt-1">Know a company we should add?</p>
            </div>

            {suggestStatus === "success" ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm font-medium text-green-700">Submitted! We&apos;ll review it soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Acme Robotics"
                    value={suggestForm.companyName}
                    onChange={(e) => setSuggestForm(f => ({ ...f, companyName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06634D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">Website</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={suggestForm.website}
                    onChange={(e) => setSuggestForm(f => ({ ...f, website: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06634D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">Details</label>
                  <textarea
                    placeholder="Anything else we should know — sector, founders, funding, etc."
                    rows={3}
                    value={suggestForm.details}
                    onChange={(e) => setSuggestForm(f => ({ ...f, details: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#06634D] focus:border-transparent"
                  />
                </div>
                {suggestStatus === "error" && (
                  <p className="text-sm text-red-600">Something went wrong. Try again.</p>
                )}
                <button
                  type="submit"
                  disabled={suggestStatus === "submitting"}
                  className="w-full py-2.5 bg-[#06634D] text-white font-semibold text-sm rounded-lg hover:bg-[#044D3B] disabled:opacity-50 transition-colors"
                >
                  {suggestStatus === "submitting" ? "Submitting..." : "Submit Suggestion"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label?: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      {label && (
        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2">
          {label}
        </label>
      )}
      <Select
        value={value || undefined}
        onValueChange={(v) => onChange(v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#06634D] rounded text-left text-xs">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">{placeholder}</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
