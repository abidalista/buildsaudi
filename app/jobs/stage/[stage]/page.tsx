import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"
import { CompanyLogo } from "@/components/company-logo"
import { stages } from "@/lib/seo"
import type { Metadata } from "next"

export function generateStaticParams() {
  return stages.map((s) => ({ stage: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage: slug } = await params
  const stage = stages.find((s) => s.slug === slug)
  if (!stage) return {}
  const filtered = companies.filter((c) => c.stage === stage.name)
  return {
    title: `Jobs at ${stage.name} Saudi Startups — ${filtered.length} Companies | BuildSaudi`,
    description: `${stage.description}. Browse ${filtered.length} ${stage.name.toLowerCase()} startups hiring in Saudi Arabia. Apply directly.`,
  }
}

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: slug } = await params
  const stage = stages.find((s) => s.slug === slug)
  if (!stage) notFound()

  const stageCompanies = companies.filter((c) => c.stage === stage.name)

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-4">
            <ArrowLeft className="size-3.5" />
            Back to all companies
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">Jobs at {stage.name} Saudi Startups</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{stage.description}</p>
          <p className="mt-2 text-sm font-mono text-[#06634D]">{stageCompanies.length} companies</p>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-3">
          {stageCompanies.map((company) => (
            <div key={company.slug} className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-5 px-5 py-4">
                <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden">
                  <CompanyLogo company={company} />
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
    </div>
  )
}
