import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { companies } from "@/lib/data"
import { CompanyLogo } from "@/components/company-logo"
import { cities } from "@/lib/seo"
import { getCityFaq } from "@/lib/aeo-landing"
import { buildFaqJsonLd, buildBreadcrumbJsonLd, buildItemListJsonLd } from "@/lib/aeo-jsonld"
import { SiteFooter } from "@/components/site-footer"
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
  const arCity =
    slug === "riyadh" ? "الرياض" : slug === "jeddah" ? "جدة" : slug === "dammam" ? "الدمام" : city.name
  return {
    title:
      slug === "riyadh"
        ? `Riyadh Startup Jobs — ${count} Companies Hiring | BuildSaudi`
        : `Startup Jobs in ${city.name} — ${count} Companies | BuildSaudi`,
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
  const faq = getCityFaq(city.name, slug, cityCompanies.length, examples)
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
    <div className="min-h-screen bg-[#F9F9F9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <header className="border-b border-[#06634D]/20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-4">
            <ArrowLeft className="size-3.5" />
            Back to all companies
          </Link>
          <h1 className="text-2xl font-bold text-[#111827]">BuildSaudi — Startup Jobs in {city.name}</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{city.blurb}</p>
          <p className="mt-2 text-sm font-mono text-[#06634D]">
            {cityCompanies.length} companies · Hiring Now · updated {updatedLabel}
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
        <div className="space-y-3">
          {cityCompanies.map((company) => (
            <div key={company.slug} className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-5 px-5 py-4">
                <Link href={`/company/${company.slug}`} className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden">
                  <CompanyLogo company={company} />
                </Link>
                <Link href={`/company/${company.slug}`} className="flex-1 min-w-0 block">
                  <span className="text-lg font-bold text-[#111827] group-hover:text-[#06634D] transition-colors">{company.name}</span>
                  <p className="mt-0.5 text-sm text-[#6B7280] truncate">{company.description}</p>
                </Link>
                <div className="flex-shrink-0 flex flex-col items-end gap-1 sm:gap-2">
                  <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">{company.sector[0]}</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap">{company.stage}</span>
                    <a
                      href={company.careers_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-[#06634D] text-white text-[10px] sm:text-xs font-semibold rounded hover:bg-[#06634D]/90 transition-colors whitespace-nowrap"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
    </div>
  )
}
