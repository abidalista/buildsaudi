"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Building2, Mail, X, ChevronDown } from "lucide-react"
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
    })
  }, [search, filters])

  const clearFilters = () => {
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
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* ============ HEADER ============ */}
      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
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
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  >
                    BUILDSAUDI
                  </h1>
                </Link>
              </div>

              {/* Tagline */}
              <p className="text-[#4C4C4C] text-xs font-mono mb-2 text-center sm:text-left">
                A curated directory of companies building the future of Saudi
              </p>

              {/* Action buttons row */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-3">
                {/* Made by pill */}
                <a href="https://x.com/abidalista" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1.5 bg-[#06634D]/5 border border-[#06634D]/30 rounded text-xs text-[#06634D] whitespace-nowrap hover:bg-[#06634D]/10 transition-colors">
                  <span>Made by</span><span className="text-[#D73833] font-bold font-mono">Abdulla</span>
                </a>

                {/* Join BuildSaudi - golden */}
                <button className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#FFBA0A] border-2 border-[#FFBA0A]/80 rounded-lg text-xs font-mono text-[#06634D] font-semibold hover:bg-[#FFBA0A]/90 hover:shadow-lg hover:scale-105 active:scale-100 transition-all cursor-pointer shadow-md whitespace-nowrap">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="hidden sm:inline">Join BuildSaudi</span>
                  <span className="sm:hidden">Join</span>
                </button>

                {/* X / Twitter icon */}
                <a
                  href="https://x.com/abidalista"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 sm:p-1.5 text-[#06634D] hover:text-[#1DA1F2] transition-colors"
                  aria-label="Follow BuildSaudi on Twitter"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* Mobile nav buttons */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 lg:hidden flex-wrap">
                <a
                  href="#search-input"
                  onClick={(e) => { e.preventDefault(); document.getElementById("search-input")?.focus() }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-[#D73833] text-white border border-[#D73833] rounded hover:bg-[#D73833]/90 transition-all"
                >
                  <svg className="size-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search Jobs
                </a>
                <Link
                  href="/coming-soon"
                  className="px-3 py-1.5 text-xs font-mono font-medium bg-[#06634D] text-white border border-[#06634D] rounded hover:bg-transparent hover:text-[#06634D] transition-all"
                >
                  Sectors
                </Link>
              </div>
            </div>

            {/* Right: Nav buttons + Hot Companies */}
            <div className="hidden lg:flex items-end gap-4 flex-shrink-0">
              {/* Nav buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="#search-input"
                  onClick={(e) => { e.preventDefault(); document.getElementById("search-input")?.focus() }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-[#D73833] text-white border border-[#D73833] rounded hover:bg-[#D73833]/90 hover:shadow-md transition-all whitespace-nowrap"
                >
                  <svg className="size-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search Jobs
                </a>
                <Link
                  href="/coming-soon"
                  className="px-3 py-1.5 text-xs font-mono font-medium bg-[#06634D] text-white border border-[#06634D] rounded hover:bg-transparent hover:text-[#06634D] transition-all"
                >
                  News
                </Link>
                <Link
                  href="/coming-soon"
                  className="px-3 py-1.5 text-xs font-mono font-medium bg-[#06634D] text-white border border-[#06634D] rounded hover:bg-transparent hover:text-[#06634D] transition-all"
                >
                  Map
                </Link>
                <Link
                  href="/coming-soon"
                  className="px-3 py-1.5 text-xs font-mono font-medium bg-[#06634D] text-white border border-[#06634D] rounded hover:bg-transparent hover:text-[#06634D] transition-all"
                >
                  Sectors
                </Link>
              </div>

              {/* Hot Companies box */}
              <div className="w-full max-w-96 bg-[#D73833]/10 border-2 border-[#D73833] rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔥</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-[#D73833] font-mono">
                    Hot Companies
                  </span>
                </div>
                <div className="divide-y divide-[#D73833]/30">
                  {companies.filter((c) => ["humain", "atam", "lucidya"].includes(c.slug)).map((c) => (
                    <div key={c.slug} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#D73833] hover:underline font-mono"
                      >
                        {c.name}
                      </a>
                      <span className="text-sm text-[#111827] font-mono">{c.sector[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ STICKY SEARCH BAR ============ */}
      <div className="sticky top-0 z-20 bg-[#F9F9F9]/95 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#9CA3AF]" />
            <Input
              id="search-input"
              placeholder="search keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-lg border-[#E5E7EB] bg-white pl-11 text-sm shadow-sm placeholder:text-[#9CA3AF] focus-visible:border-[#06634D] focus-visible:ring-[#06634D]/20"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827]"
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
            {/* FILTERS heading */}
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#06634D]">
              Filters
            </h2>

            {/* Missing Info button */}
            <button className="hidden lg:flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#FFBA0A]/10 border border-[#FFBA0A] rounded text-xs font-mono text-[#4C4C4C] hover:bg-[#FFBA0A]/20 hover:shadow-sm transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Missing Info?
            </button>

            {/* Filter dropdowns */}
            <div className="w-full">
              <FilterSelect
                label="HQ Locations"
                value={filters.city}
                onChange={(v) => setFilters((f) => ({ ...f, city: v }))}
                options={filterOptions.city}
                placeholder="All HQ Locations"
              />
            </div>
            <div className="w-full">
              <FilterSelect
                label="Stages"
                value={filters.companyStage}
                onChange={(v) => setFilters((f) => ({ ...f, companyStage: v }))}
                options={filterOptions.companyStage}
                placeholder="All Stages"
              />
            </div>
            <div className="w-full">
              <FilterSelect
                label="Sectors"
                value={filters.sector}
                onChange={(v) => setFilters((f) => ({ ...f, sector: v }))}
                options={filterOptions.sector}
                placeholder="All Sectors"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E7EB]" />

            {/* Company count */}
            <p className="text-sm font-mono text-[#6B7280]">
              {companies.length} companies
            </p>
          </aside>

          {/* Job Listings */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filters */}
            <div className="flex flex-wrap gap-2 mb-4 lg:hidden">
              <FilterSelect
                value={filters.city}
                onChange={(v) => setFilters((f) => ({ ...f, city: v }))}
                options={filterOptions.city}
                placeholder="Location"
              />
              <FilterSelect
                value={filters.sector}
                onChange={(v) => setFilters((f) => ({ ...f, sector: v }))}
                options={filterOptions.sector}
                placeholder="Sector"
              />
              <FilterSelect
                value={filters.companyStage}
                onChange={(v) => setFilters((f) => ({ ...f, companyStage: v }))}
                options={filterOptions.companyStage}
                placeholder="Stage"
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-[#6B7280]">
                {filteredCompanies.length} {filteredCompanies.length === 1 ? "company" : "companies"}
              </p>
              <p className="text-xs text-[#9CA3AF] font-mono">Sorted by upvotes</p>
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
                              <p className="mt-0.5 text-xs sm:text-sm text-[#6B7280] line-clamp-1">
                                {company.description}
                              </p>
                            </div>

                            {/* Badges - desktop only inline */}
                            <div className="hidden sm:flex flex-shrink-0 flex-col items-end gap-2">
                              <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">
                                {company.sector[0]}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">
                                  {company.stage}
                                </span>
                                <a
                                  href={company.careers_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-2.5 py-1 bg-[#06634D] text-white text-xs font-mono rounded hover:bg-[#06634D]/90 transition-colors whitespace-nowrap"
                                >
                                  View Jobs
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Badges - mobile: row below name */}
                          <div className="flex items-center gap-1.5 mt-2 sm:hidden flex-wrap">
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] font-mono uppercase tracking-wider rounded whitespace-nowrap">
                              {company.sector[0]}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] font-mono uppercase tracking-wider rounded whitespace-nowrap">
                              {company.stage}
                            </span>
                            <a
                              href={company.careers_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-2 py-0.5 bg-[#06634D] text-white text-[11px] font-mono rounded hover:bg-[#06634D]/90 transition-colors whitespace-nowrap"
                            >
                              View Jobs
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Centered Chevron Toggle */}
                      <div className="flex justify-center mt-2">
                        <ChevronDown className={`size-5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
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
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-500">Founders</div>
                            <div className="text-xs sm:text-sm text-gray-900 break-words font-medium">{company.founders || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-500">Total Raised</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.total_raised || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-500">HQ City</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.city}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-500">Employees</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.team_size || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-500">Founded</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.founded_year || "—"}</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-500">Last Round</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">{company.last_round_date || "—"}</div>
                          </div>
                        </div>
                        {/* Socials row */}
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200">
                          {company.twitter_url && (
                            <a href={company.twitter_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-gray-900 transition-colors p-1">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </a>
                          )}
                          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-gray-900 transition-colors p-1">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                          <a href={company.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-gray-900 transition-colors p-1">
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
                  <p className="text-sm text-[#6B7280]">
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

            {/* Mobile Email Capture */}
            <div className="mt-8 rounded-lg border border-[#E5E7EB] bg-white p-5 lg:hidden">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="size-4 text-[#06634D]" />
                <h3 className="font-semibold text-[#111827]">get weekly startup jobs</h3>
              </div>
              <p className="text-sm text-[#6B7280] mb-3">
                curated startup jobs delivered to your inbox. no spam.
              </p>
              {emailSubmitted ? (
                <p className="text-sm text-green-600 font-medium">
                  you&apos;re in. watch your inbox.
                </p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-9"
                  />
                  <Button
                    type="submit"
                    className="h-9 bg-[#06634D] hover:bg-[#044D3B] shrink-0"
                  >
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <footer className="mt-16 border-t border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs text-[#6B7280]">
            <div>
              <h4 className="font-bold text-[#111827] uppercase tracking-wider font-mono mb-3">Jobs by City</h4>
              <div className="space-y-1.5">
                <Link href="/jobs/riyadh" className="block hover:text-[#06634D]">Riyadh</Link>
                <Link href="/jobs/jeddah" className="block hover:text-[#06634D]">Jeddah</Link>
                <Link href="/jobs/dammam" className="block hover:text-[#06634D]">Dammam</Link>
                <Link href="/jobs/remote" className="block hover:text-[#06634D]">Remote</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#111827] uppercase tracking-wider font-mono mb-3">Jobs by Sector</h4>
              <div className="space-y-1.5">
                <Link href="/jobs/sector/fintech" className="block hover:text-[#06634D]">Fintech</Link>
                <Link href="/jobs/sector/ai" className="block hover:text-[#06634D]">AI & ML</Link>
                <Link href="/jobs/sector/b2b-saas" className="block hover:text-[#06634D]">B2B SaaS</Link>
                <Link href="/jobs/sector/ecommerce" className="block hover:text-[#06634D]">E-commerce</Link>
                <Link href="/jobs/sector/logistics" className="block hover:text-[#06634D]">Logistics</Link>
                <Link href="/jobs/sector/cybersecurity" className="block hover:text-[#06634D]">Cybersecurity</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#111827] uppercase tracking-wider font-mono mb-3">By Stage</h4>
              <div className="space-y-1.5">
                <Link href="/jobs/stage/unicorn" className="block hover:text-[#06634D]">Unicorns</Link>
                <Link href="/jobs/stage/series-b" className="block hover:text-[#06634D]">Series B</Link>
                <Link href="/jobs/stage/series-a" className="block hover:text-[#06634D]">Series A</Link>
                <Link href="/jobs/stage/seed" className="block hover:text-[#06634D]">Seed</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#111827] uppercase tracking-wider font-mono mb-3">Company</h4>
              <div className="space-y-1.5">
                <Link href="/submit" className="block hover:text-[#06634D]">Post a Job</Link>
                <a href="https://x.com/abidalista" target="_blank" rel="noopener noreferrer" className="block hover:text-[#06634D]">Twitter / X</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#E5E7EB] text-xs text-[#9CA3AF]">
            <p>buildsaudi.co</p>
          </div>
        </div>
      </footer>
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
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-2">
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
