import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"
import { AiApplyPageShell } from "@/components/ai-apply-page-shell"
import { CompanyApplyList } from "@/components/company-apply-list"
import { PageLangToggle } from "@/components/page-lang-toggle"
import { cities } from "@/lib/seo"
import { getCityFaq } from "@/lib/aeo-landing"
import { catalogCountLabel } from "@/lib/marketing"
import { buildFaqJsonLd, buildBreadcrumbJsonLd, buildItemListJsonLd } from "@/lib/aeo-jsonld"
import { SiteFooter } from "@/components/site-footer"
import { JobHubLinks } from "@/components/job-hub-links"
import { jobHubsForCity } from "@/lib/job-hubs"
import type { Metadata } from "next"

const site = "https://buildsaudi.co"

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) return {}
  const count = companies.filter((c) => c.city.toLowerCase() === city.name.toLowerCase() || slug === "remote").length
  const countLabel = catalogCountLabel(count, companies.length, "en")
  const arCity =
    slug === "riyadh" ? "الرياض" : slug === "jeddah" ? "جدة" : slug === "dammam" ? "الدمام" : city.name
  return {
    title:
      slug === "riyadh"
        ? `Riyadh Startup Jobs — ${countLabel} Companies Hiring | BuildSaudi`
        : `Startup Jobs in ${city.name} — ${countLabel} Companies | BuildSaudi`,
    description: `Find startup jobs in ${city.name}, Saudi Arabia. Software engineering, product, design, marketing, and more at funded startups. Updated weekly. وظائف شركات ناشئة في ${arCity}.`,
    alternates: { canonical: `${site}/jobs/${slug}` },
  }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) notFound()

  const cityCompanies = companies.filter((c) =>
    slug === "remote" ? true : c.city.toLowerCase() === city.name.toLowerCase()
  )

  const examples = cityCompanies.slice(0, 4).map((c) => c.name)
  const countLabel = catalogCountLabel(cityCompanies.length, companies.length, "en")
  const faq = getCityFaq(city.name, slug, countLabel, examples)
  const pageUrl = `${site}/jobs/${slug}`
  const updatedLabel = new Date().toISOString().slice(0, 10)

  const faqLd = buildFaqJsonLd(faq)
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: `Startup Jobs in ${city.name}`, url: pageUrl },
  ])
  const itemListLd = buildItemListJsonLd(
    `Startup Jobs in ${city.name}`,
    `Funded Saudi startups hiring in ${city.name}`,
    cityCompanies.slice(0, 20).map((c) => ({
      name: c.name,
      url: `${site}/company/${c.slug}`,
    })),
  )

  return (
    <AiApplyPageShell bannerSrc="city_banner" upsellSrc="city_upsell" page="jobs_city">
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
          <h1 className="text-2xl font-bold text-[#111827]">BuildSaudi — Startup Jobs in {city.name}</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{city.blurb}</p>
          <p className="mt-2 text-sm font-mono text-[#06634D]">
            {countLabel} companies · Hiring Now · updated {updatedLabel}
          </p>
          <p className="mt-2 text-sm">
            <Link href="/jobs" className="text-[#06634D] underline underline-offset-2 hover:text-[#044D3B]">
              Browse individual openings
            </Link>
          </p>
          {slug === "riyadh" && examples.length > 0 && (
            <p className="mt-1 text-sm text-[#4B5563]">
              Riyadh startups hiring on BuildSaudi include {examples.join(", ")}
              {cityCompanies.length > examples.length ? ", and more" : ""}. Apply on each company&apos;s official careers page — not a Telegram list dump.
            </p>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CompanyApplyList companies={cityCompanies} aiPlacement="city_card" promoSrc="city_card" />

        <JobHubLinks hubs={jobHubsForCity(slug)} heading={`Openings in ${city.name} by sector or role`} />

        <section className="mt-12 border-t border-[#06634D]/15 pt-8" aria-labelledby="city-faq-heading">
          <h2 id="city-faq-heading" className="text-lg font-bold text-[#111827]">
            FAQ — {city.name}
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
