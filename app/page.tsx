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
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="block">
                <h1 className="text-3xl font-bold tracking-tight text-[#1e3a5f]" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                  {"["} BUILDSAUDI {"]"}
                </h1>
              </Link>
              <p className="mt-1 text-sm text-[#6b7280]">
                a curated directory of companies building the future of saudi
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/submit">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
                >
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#9ca3af]" />
          <Input
            placeholder="search keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-lg border-[#e5e5e5] bg-white pl-11 text-base shadow-sm placeholder:text-[#9ca3af] focus-visible:border-[#1e3a5f] focus-visible:ring-[#1e3a5f]/20"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#1a1a1a]"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden w-[220px] shrink-0 lg:block">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f]">
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#6b7280] hover:text-[#1a1a1a]"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-5">
              <FilterSelect
                label="Job Type"
                value={filters.jobType}
                onChange={(v) => setFilters((f) => ({ ...f, jobType: v }))}
                options={filterOptions.jobType}
                placeholder="All Types"
              />
              <FilterSelect
                label="Experience"
                value={filters.experienceLevel}
                onChange={(v) => setFilters((f) => ({ ...f, experienceLevel: v }))}
                options={filterOptions.experienceLevel}
                placeholder="All Levels"
              />
              <FilterSelect
                label="Sector"
                value={filters.sector}
                onChange={(v) => setFilters((f) => ({ ...f, sector: v }))}
                options={filterOptions.sector}
                placeholder="All Sectors"
              />
              <FilterSelect
                label="City"
                value={filters.city}
                onChange={(v) => setFilters((f) => ({ ...f, city: v }))}
                options={filterOptions.city}
                placeholder="All Locations"
              />
              <FilterSelect
                label="Company Stage"
                value={filters.companyStage}
                onChange={(v) => setFilters((f) => ({ ...f, companyStage: v }))}
                options={filterOptions.companyStage}
                placeholder="All Stages"
              />
            </div>

            {/* Email Capture - Sidebar */}
            <div className="mt-8 rounded-lg border border-[#e5e5e5] bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="size-4 text-[#1e3a5f]" />
                <h3 className="text-sm font-semibold">Weekly Jobs</h3>
              </div>
              <p className="text-xs text-[#6b7280] mb-3">
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
                    className="w-full h-8 bg-[#1e3a5f] text-xs hover:bg-[#162d4a]"
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
                value={filters.jobType}
                onChange={(v) => setFilters((f) => ({ ...f, jobType: v }))}
                options={filterOptions.jobType}
                placeholder="Job Type"
              />
              <FilterSelect
                value={filters.sector}
                onChange={(v) => setFilters((f) => ({ ...f, sector: v }))}
                options={filterOptions.sector}
                placeholder="Sector"
              />
              <FilterSelect
                value={filters.city}
                onChange={(v) => setFilters((f) => ({ ...f, city: v }))}
                options={filterOptions.city}
                placeholder="City"
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-[#6b7280]">
                {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-3">
              {filteredJobs.map((job) => {
                const company = getCompanyBySlug(job.company_slug)
                return (
                  <div
                    key={job.id}
                    className="group flex items-center gap-4 rounded-lg border border-[#e5e5e5] bg-white px-5 py-4 transition-all hover:border-[#d0d0d0] hover:shadow-sm"
                  >
                    {/* Company Logo Placeholder */}
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#f0f0f0] text-sm font-bold text-[#1e3a5f]">
                      {job.company.charAt(0)}
                    </div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1a1a1a] truncate">
                        {job.title}
                      </h3>
                      <div className="mt-0.5 flex items-center gap-2 text-sm text-[#6b7280]">
                        <Link
                          href={`/company/${job.company_slug}`}
                          className="hover:text-[#1e3a5f] hover:underline"
                        >
                          {job.company}
                        </Link>
                        <span className="text-[#d0d0d0]">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Badges + Apply */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-[10px] font-medium text-[#6b7280] border-[#e5e5e5]">
                        {job.sector}
                      </Badge>
                      {company && (
                        <Badge variant="outline" className="text-[10px] font-medium text-[#6b7280] border-[#e5e5e5]">
                          {company.stage}
                        </Badge>
                      )}
                      <a
                        href={job.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="h-7 bg-[#1e3a5f] text-xs hover:bg-[#162d4a]"
                        >
                          Apply
                          <ExternalLink className="ml-1 size-3" />
                        </Button>
                      </a>
                    </div>

                    {/* Mobile Apply */}
                    <a
                      href={job.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:hidden shrink-0"
                    >
                      <Button
                        size="sm"
                        className="h-7 bg-[#1e3a5f] text-xs hover:bg-[#162d4a]"
                      >
                        Apply
                      </Button>
                    </a>
                  </div>
                )
              })}

              {filteredJobs.length === 0 && (
                <div className="rounded-lg border border-[#e5e5e5] bg-white px-6 py-16 text-center">
                  <Building2 className="mx-auto size-8 text-[#d0d0d0] mb-3" />
                  <p className="text-sm text-[#6b7280]">
                    no jobs match your filters.{" "}
                    <button
                      onClick={clearFilters}
                      className="text-[#1e3a5f] hover:underline"
                    >
                      clear all filters
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Email Capture */}
            <div className="mt-8 rounded-lg border border-[#e5e5e5] bg-white p-5 lg:hidden">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="size-4 text-[#1e3a5f]" />
                <h3 className="font-semibold">get weekly startup jobs</h3>
              </div>
              <p className="text-sm text-[#6b7280] mb-3">
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
                    className="h-9 bg-[#1e3a5f] hover:bg-[#162d4a] shrink-0"
                  >
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex items-center justify-between text-xs text-[#9ca3af]">
          <p>buildsaudi.co</p>
          <div className="flex items-center gap-4">
            <Link href="/submit" className="hover:text-[#1a1a1a]">
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
        <label className="mb-1.5 block text-xs font-medium text-[#6b7280] uppercase tracking-wider">
          {label}
        </label>
      )}
      <Select
        value={value || undefined}
        onValueChange={(v) => onChange(v === "__all__" ? "" : v)}
      >
        <SelectTrigger className="w-full h-9 bg-white text-sm">
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
