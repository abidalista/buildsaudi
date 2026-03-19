"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ExternalLink, MapPin, Building2, Mail, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jobs, companies, getCompanyBySlug, filterOptions } from "@/lib/data"

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

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.sector.toLowerCase().includes(q)

      const company = getCompanyBySlug(job.company_slug)

      const matchesJobType = !filters.jobType || job.job_type === filters.jobType
      const matchesExperience =
        !filters.experienceLevel || job.experience_level === filters.experienceLevel
      const matchesSector = !filters.sector || job.sector === filters.sector
      const matchesCity =
        !filters.city || job.location.toLowerCase().includes(filters.city.toLowerCase())
      const matchesStage =
        !filters.companyStage || company?.stage === filters.companyStage

      return (
        matchesSearch &&
        matchesJobType &&
        matchesExperience &&
        matchesSector &&
        matchesCity &&
        matchesStage
      )
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
                    className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none text-[#06634D] tracking-tight"
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  >
                    BUILDSAUDI
                  </h1>
                </Link>
              </div>

              {/* Tagline */}
              <p className="text-[#4C4C4C] text-xs font-mono mb-2 text-center sm:text-left">
                A curated directory of companies building the future of Saudi.
              </p>

              {/* Action buttons row */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-3">
                {/* Made by pill */}
                <a href="https://x.com/halamanteeshi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-1.5 sm:px-3 py-0.5 sm:py-1.5 bg-[#06634D]/5 border border-[#06634D]/30 rounded text-xs font-mono text-[#06634D] whitespace-nowrap hover:bg-[#06634D]/10 transition-colors">
                  Made by{" "}
                  <span className="text-[#D73833] font-bold ml-1">Abdulla</span>
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
                  href="https://x.com/halamanteeshi"
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
                  href="/sectors"
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
                  href="/news"
                  className="px-3 py-1.5 text-xs font-mono font-medium bg-[#06634D] text-white border border-[#06634D] rounded hover:bg-transparent hover:text-[#06634D] transition-all"
                >
                  News
                </Link>
                <Link
                  href="/map"
                  className="px-3 py-1.5 text-xs font-mono font-medium bg-[#06634D] text-white border border-[#06634D] rounded hover:bg-transparent hover:text-[#06634D] transition-all"
                >
                  Map
                </Link>
                <Link
                  href="/sectors"
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
                  {companies.slice(0, 3).map((c) => (
                    <div key={c.slug} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                      <Link
                        href={`/company/${c.slug}`}
                        className="text-sm font-bold text-[#D73833] hover:underline font-mono"
                      >
                        {c.name}
                      </Link>
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
      <div className="sticky top-0 z-20 bg-[#F9F9F9]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden w-[200px] shrink-0 lg:block">
            {/* FILTERS heading */}
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#06634D] font-mono mb-5">
              Filters
            </h2>

            {/* Missing Info button */}
            <button className="w-full mb-6 flex items-center justify-center gap-2 rounded-md border-2 border-[#FFBA0A]/60 bg-[#FFBA0A]/10 px-4 py-2.5 text-sm font-mono font-medium text-[#92710C] hover:bg-[#FFBA0A]/20 transition-colors">
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Missing Info?
            </button>

            {/* Filter dropdowns */}
            <div className="space-y-6">
              <FilterSelect
                label="HQ Locations"
                value={filters.city}
                onChange={(v) => setFilters((f) => ({ ...f, city: v }))}
                options={filterOptions.city}
                placeholder="All HQ Locations"
              />
              <FilterSelect
                label="Stages"
                value={filters.companyStage}
                onChange={(v) => setFilters((f) => ({ ...f, companyStage: v }))}
                options={filterOptions.companyStage}
                placeholder="All Stages"
              />
              <FilterSelect
                label="Sectors"
                value={filters.sector}
                onChange={(v) => setFilters((f) => ({ ...f, sector: v }))}
                options={filterOptions.sector}
                placeholder="All Sectors"
              />
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-[#E5E7EB]" />

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
                {filteredJobs.length} {filteredJobs.length === 1 ? "company" : "companies"}
              </p>
              <p className="text-xs text-[#9CA3AF]">Sorted by upvotes</p>
            </div>

            {/* Job Cards */}
            <div className="space-y-3">
              {filteredJobs.map((job) => {
                const company = getCompanyBySlug(job.company_slug)
                return (
                  <div
                    key={job.id}
                    className="group flex items-center gap-4 rounded-lg border border-[#E5E7EB] bg-white px-5 py-4 transition-all hover:border-[#D1D5DB] hover:shadow-sm"
                  >
                    {/* Company Logo Placeholder */}
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#F3F4F6] text-sm font-bold text-[#06634D]">
                      {job.company.charAt(0)}
                    </div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#111827] truncate">
                        {job.title}
                      </h3>
                      <div className="mt-0.5 flex items-center gap-2 text-sm text-[#6B7280]">
                        <Link
                          href={`/company/${job.company_slug}`}
                          className="hover:text-[#06634D] hover:underline"
                        >
                          {job.company}
                        </Link>
                        <span className="text-[#D1D5DB]">&middot;</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Sector + Stage + View Jobs */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wide">
                        {job.sector}
                      </span>
                      {company && (
                        <span className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wide">
                          {company.stage}
                        </span>
                      )}
                      <a
                        href={job.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="inline-flex items-center gap-1 rounded bg-[#06634D] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#044D3B] transition-colors">
                          View Jobs
                        </span>
                      </a>
                    </div>

                    {/* Mobile Apply */}
                    <a
                      href={job.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:hidden shrink-0"
                    >
                      <span className="inline-flex items-center gap-1 rounded bg-[#06634D] px-2.5 py-1 text-[11px] font-semibold text-white">
                        View Jobs
                      </span>
                    </a>
                  </div>
                )
              })}

              {filteredJobs.length === 0 && (
                <div className="rounded-lg border border-[#E5E7EB] bg-white px-6 py-16 text-center">
                  <Building2 className="mx-auto size-8 text-[#D1D5DB] mb-3" />
                  <p className="text-sm text-[#6B7280]">
                    no jobs match your filters.{" "}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between text-xs text-[#9CA3AF]">
          <p>buildsaudi.co</p>
          <div className="flex items-center gap-4">
            <Link href="/submit" className="hover:text-[#111827]">
              Post a Job
            </Link>
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
        <label className="mb-2 block text-xs font-bold text-[#6B7280] uppercase tracking-wider font-mono">
          {label}
        </label>
      )}
      <Select
        value={value || undefined}
        onValueChange={(v) => onChange(v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-full h-10 bg-white text-sm border-[#E5E7EB] rounded-md">
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
