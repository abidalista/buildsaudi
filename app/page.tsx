"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ExternalLink, MapPin, Building2, Mail, X, Users } from "lucide-react"
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
      <header className="border-b border-[#123C69]/20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start justify-between gap-4 sm:gap-6">
            {/* Left: Logo + tagline + action buttons */}
            <div className="flex-1">
              {/* Logo */}
              <div className="flex justify-center sm:justify-start mb-3">
                <Link href="/" className="block">
                  <h1
                    className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none text-[#123C69] tracking-tight"
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  >
                    <span className="text-[#123C69]/30">{"["}</span>{" "}
                    BUILDSAUDI{" "}
                    <span className="text-[#123C69]/30">{"]"}</span>
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
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-[#F3F4F6] transition-colors"
                >
                  Post a Job
                </Link>

                {/* Join pill - golden */}
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#E8A820] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#D49A1C] transition-colors"
                >
                  <Users className="size-3" />
                  Join BuildSaudi
                </Link>

                {/* X icon */}
                <a
                  href="https://x.com/buildsaudi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111827] hover:text-[#123C69] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* Mobile nav buttons */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 lg:hidden flex-wrap">
                <button
                  onClick={() => document.getElementById("search-input")?.focus()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#123C69] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0E2F52] transition-colors"
                >
                  <Search className="size-3" />
                  Search Jobs
                </button>
                <button className="inline-flex items-center rounded-md border border-[#123C69] px-3 py-1.5 text-xs font-semibold text-[#123C69] hover:bg-[#123C69] hover:text-white transition-colors">
                  Sectors
                </button>
              </div>
            </div>

            {/* Right: Nav buttons + Hot Companies */}
            <div className="hidden lg:flex items-end gap-4 flex-shrink-0">
              {/* Nav buttons column */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => document.getElementById("search-input")?.focus()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#123C69] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#0E2F52] transition-colors"
                >
                  <Search className="size-3.5" />
                  Search Jobs
                </button>
                <button className="inline-flex items-center rounded-md border border-[#123C69] px-3.5 py-2 text-xs font-semibold text-[#123C69] hover:bg-[#123C69] hover:text-white transition-colors">
                  Sectors
                </button>
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
                      <span className="text-sm text-[#D73833] font-mono">{c.sector[0]}</span>
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
              className="h-11 rounded-lg border-[#E5E7EB] bg-white pl-11 text-sm shadow-sm placeholder:text-[#9CA3AF] focus-visible:border-[#123C69] focus-visible:ring-[#123C69]/20"
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
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#123C69]">
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#6B7280] hover:text-[#111827]"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-5">
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

            {/* Email Capture - Sidebar */}
            <div className="mt-8 rounded-lg border border-[#E5E7EB] bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="size-4 text-[#123C69]" />
                <h3 className="text-sm font-semibold text-[#111827]">Weekly Jobs</h3>
              </div>
              <p className="text-xs text-[#6B7280] mb-3">
                get startup jobs in your inbox every week
              </p>
              {emailSubmitted ? (
                <p className="text-xs text-green-600 font-medium">
                  you&apos;re in. watch your inbox.
                </p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-8 text-xs"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full h-8 bg-[#123C69] text-xs hover:bg-[#0E2F52]"
                  >
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
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
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#F3F4F6] text-sm font-bold text-[#123C69]">
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
                          className="hover:text-[#123C69] hover:underline"
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
                        <span className="inline-flex items-center gap-1 rounded bg-[#123C69] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#0E2F52] transition-colors">
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
                      <span className="inline-flex items-center gap-1 rounded bg-[#123C69] px-2.5 py-1 text-[11px] font-semibold text-white">
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
                      className="text-[#123C69] hover:underline"
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
                <Mail className="size-4 text-[#123C69]" />
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
                    className="h-9 bg-[#123C69] hover:bg-[#0E2F52] shrink-0"
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
        <label className="mb-1.5 block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
          {label}
        </label>
      )}
      <Select
        value={value || undefined}
        onValueChange={(v) => onChange(v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-full h-9 bg-white text-sm border-[#E5E7EB]">
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
