import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"
import { AiApplyPageShell } from "@/components/ai-apply-page-shell"
import { CompanyApplyList } from "@/components/company-apply-list"
import { PageLangToggle } from "@/components/page-lang-toggle"
import { stages } from "@/lib/seo"
import { getStageFaq } from "@/lib/aeo-landing"
import { buildFaqJsonLd, buildBreadcrumbJsonLd, buildItemListJsonLd } from "@/lib/aeo-jsonld"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"

const site = "https://buildsaudi.co"

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
    alternates: { canonical: `${site}/jobs/stage/${slug}` },
  }
}

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: slug } = await params
  const stage = stages.find((s) => s.slug === slug)
  if (!stage) notFound()

  const stageCompanies = companies.filter((c) => c.stage === stage.name)

  const faq = getStageFaq(stage.name, slug, stageCompanies.length, stage.description)
  const pageUrl = `${site}/jobs/stage/${slug}`

  const faqLd = buildFaqJsonLd(faq)
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: `${stage.name} Saudi Startups`, url: pageUrl },
  ])
  const itemListLd = buildItemListJsonLd(
    `Jobs at ${stage.name} Saudi Startups`,
    `${stage.description} — companies hiring in Saudi Arabia`,
    stageCompanies.slice(0, 20).map((c) => ({
      name: c.name,
      url: `${site}/company/${c.slug}`,
    })),
  )

  return (
    <AiApplyPageShell bannerSrc="stage_banner" upsellSrc="stage_upsell" page="jobs_stage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827]">
              <ArrowLeft className="size-3.5 rtl:rotate-180" />
              Back to all companies
            </Link>
            <PageLangToggle />
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">Jobs at {stage.name} Saudi Startups</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{stage.description}</p>
          <p className="mt-2 text-sm font-mono text-[#06634D]">{stageCompanies.length} companies</p>
          <p className="mt-2 text-sm">
            <Link href="/jobs" className="text-[#06634D] underline underline-offset-2 hover:text-[#044D3B]">
              Browse individual openings
            </Link>
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CompanyApplyList companies={stageCompanies} aiPlacement="stage_card" promoSrc="stage_card" />
      </div>

      <SiteFooter />
    </AiApplyPageShell>
  )
}
