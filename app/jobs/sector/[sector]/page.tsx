import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"
import { sectors } from "@/lib/seo"
import type { Metadata } from "next"

export function generateStaticParams() {
  return sectors.map((s) => ({ sector: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector: slug } = await params
  const sector = sectors.find((s) => s.slug === slug)
  if (!sector) return {}
  const filtered = companies.filter((c) => c.sector.some((s) => s.toLowerCase().includes(sector.name.split(" ")[0].toLowerCase())))
  return {
    title: `${sector.name} Startup Jobs in Saudi Arabia — ${filtered.length} Companies | BuildSaudi`,
    description: `Find jobs at Saudi Arabia's top ${sector.name.toLowerCase()} startups. ${sector.companies.slice(0, 3).join(", ")}. Browse open roles. Apply directly.`,
  }
}

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector: slug } = await params
  const sector = sectors.find((s) => s.slug === slug)
  if (!sector) notFound()

  const sectorCompanies = companies.filter((c) =>
    c.sector.some((s) => s.toLowerCase().includes(sector.name.split(" ")[0].toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-4">
            <ArrowLeft className="size-3.5" />
            Back to all companies
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">{sector.name} Startup Jobs in Saudi Arabia</h1>
          <p className="mt-2 text-sm font-mono text-[#06634D]">{sectorCompanies.length} companies</p>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-3">
          {sectorCompanies.map((company) => (
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
          {sectorCompanies.length === 0 && (
            <div className="rounded-lg border border-[#E5E7EB] bg-white px-6 py-16 text-center">
              <p className="text-sm text-[#6B7280]">No companies in this sector yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
