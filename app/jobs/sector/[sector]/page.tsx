import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"
import { AiApplyPageShell } from "@/components/ai-apply-page-shell"
import { CompanyApplyList } from "@/components/company-apply-list"
import { PageLangToggle } from "@/components/page-lang-toggle"
import { sectors } from "@/lib/seo"
import { getSectorFaq, sectorBlurbs } from "@/lib/aeo-landing"
import { buildFaqJsonLd, buildBreadcrumbJsonLd, buildItemListJsonLd } from "@/lib/aeo-jsonld"
import { SiteFooter } from "@/components/site-footer"
import { JobHubLinks } from "@/components/job-hub-links"
import { jobHubsForSeoSector } from "@/lib/job-hubs"
import type { Metadata } from "next"

const site = "https://buildsaudi.co"

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
    alternates: { canonical: `${site}/jobs/sector/${slug}` },
  }
}

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector: slug } = await params
  const sector = sectors.find((s) => s.slug === slug)
  if (!sector) notFound()

  const sectorCompanies = companies.filter((c) =>
    c.sector.some((s) => s.toLowerCase().includes(sector.name.split(" ")[0].toLowerCase()))
  )

  const liveExamples = sectorCompanies.slice(0, 6).map((c) => c.name)
  const faq = getSectorFaq(
    sector.name,
    slug,
    sectorCompanies.length,
    liveExamples.length > 0 ? liveExamples : sector.companies,
  )
  const pageUrl = `${site}/jobs/sector/${slug}`
  const updatedLabel = new Date().toISOString().slice(0, 10)
  const blurb = sectorBlurbs[slug]
  const hiringNow = liveExamples.slice(0, 4).join(", ")

  const faqLd = buildFaqJsonLd(faq)
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: `${sector.name} Startup Jobs`, url: pageUrl },
  ])
  const itemListLd = buildItemListJsonLd(
    `${sector.name} Startup Jobs in Saudi Arabia`,
    `Funded ${sector.name.toLowerCase()} startups hiring in Saudi Arabia`,
    sectorCompanies.slice(0, 20).map((c) => ({
      name: c.name,
      url: `${site}/company/${c.slug}`,
    })),
  )

  return (
    <AiApplyPageShell bannerSrc="sector_banner" upsellSrc="sector_upsell" page="jobs_sector">
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
          <h1 className="text-2xl font-bold text-[#111827]">
            BuildSaudi — {sector.name} Startup Jobs in Saudi Arabia
          </h1>
          {blurb && <p className="mt-1 text-sm text-[#6B7280] max-w-3xl">{blurb}</p>}
          <p className="mt-2 text-sm font-mono text-[#06634D]">
            {sectorCompanies.length} companies · Hiring Now · updated {updatedLabel}
          </p>
          <p className="mt-2 text-sm">
            <Link href="/jobs" className="text-[#06634D] underline underline-offset-2 hover:text-[#044D3B]">
              Browse individual openings
            </Link>
          </p>
          {hiringNow && (
            <p className="mt-1 text-sm text-[#4B5563]">
              Hiring now includes {hiringNow}
              {sectorCompanies.length > 4 ? ", and more" : ""}.
            </p>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {sectorCompanies.length > 0 ? (
          <CompanyApplyList companies={sectorCompanies} aiPlacement="sector_card" promoSrc="sector_card" />
        ) : (
          <div className="rounded-lg border border-[#E5E7EB] bg-white px-6 py-16 text-center">
            <p className="text-sm text-[#6B7280]">No companies in this sector yet.</p>
          </div>
        )}

        <JobHubLinks
          hubs={jobHubsForSeoSector(slug, sector.name)}
          heading={`${sector.name} openings by city`}
        />

        <section className="mt-12 border-t border-[#06634D]/15 pt-8" aria-labelledby="sector-faq-heading">
          <h2 id="sector-faq-heading" className="text-lg font-bold text-[#111827]">
            FAQ — {sector.name}
          </h2>
          <div className="mt-6 space-y-6">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-base font-semibold text-[#111827]" dir="auto">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563] sm:text-base" dir="auto">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </AiApplyPageShell>
  )
}
