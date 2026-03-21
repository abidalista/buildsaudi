import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { companies, jobs, getCompanyBySlug } from "@/lib/data"
import { cities } from "@/lib/seo"
import type { Metadata } from "next"

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) return {}
  const count = companies.filter((c) => c.city.toLowerCase() === city.name.toLowerCase() || (slug === "remote")).length
  return {
    title: `Startup Jobs in ${city.name} — ${count} Companies | BuildSaudi`,
    description: `Find startup jobs in ${city.name}, Saudi Arabia. Software engineering, product, design, marketing, and more at funded startups. Updated weekly.`,
  }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) notFound()

  const cityCompanies = companies.filter((c) =>
    slug === "remote" ? true : c.city.toLowerCase() === city.name.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-4">
            <ArrowLeft className="size-3.5" />
            Back to all companies
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">Startup Jobs in {city.name}</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{city.blurb}</p>
          <p className="mt-2 text-sm font-mono text-[#06634D]">{cityCompanies.length} companies</p>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-3">
          {cityCompanies.map((company) => (
            <div key={company.slug} className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-5 px-5 py-4">
                <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden">
                  <img src={company.logo_url} alt={company.name} className="size-8 sm:size-9 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/company/${company.slug}`} className="text-lg font-bold text-[#111827] hover:text-[#06634D] transition-colors">{company.name}</Link>
                  <p className="mt-0.5 text-sm text-[#6B7280] truncate">{company.description}</p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1 sm:gap-2">
                  <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">{company.sector[0]}</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">{company.stage}</span>
                    <Link href={`/company/${company.slug}`} className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-[#06634D] text-white text-[10px] sm:text-xs font-mono rounded hover:bg-[#06634D]/90 transition-colors whitespace-nowrap">View Jobs</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="mt-16 border-t border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-[#9CA3AF]">
          <p>buildsaudi.co</p>
        </div>
      </footer>
    </div>
  )
}
