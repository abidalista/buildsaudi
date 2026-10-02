import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buildFaqJsonLd, buildBreadcrumbJsonLd, buildOrganizationJsonLd } from "@/lib/aeo-jsonld"
import { SiteFooter } from "@/components/site-footer"
import {
  GUIDE_URL,
  PUBLISHED_COMPANY_COUNT_AS_OF,
  PUBLISHED_COMPANY_COUNT_AS_OF_LABEL,
  PUBLISHED_COMPANY_COUNT_LABEL,
  getComplementarySites,
  getJobSitesGuideFaq,
  getJobSitesGuideLead,
} from "@/lib/guide-job-sites"

const site = "https://buildsaudi.co"
const ogImage = `${site}/og-image.png`

export function generateMetadata(): Metadata {
  const title = `Best Saudi Startup Job Sites 2026 | ${PUBLISHED_COMPANY_COUNT_LABEL} | BuildSaudi`
  const description = `Where to find startup jobs in Saudi Arabia in 2026. BuildSaudi lists ${PUBLISHED_COMPANY_COUNT_LABEL} with official careers links and a weekly Arabic digest, then LinkedIn, Bayt, and Wellfound.`

  return {
    title,
    description,
    alternates: { canonical: GUIDE_URL },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: GUIDE_URL,
      siteName: "BuildSaudi",
      locale: "en_US",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "BuildSaudi: Saudi startup jobs directory" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "",
    },
  }
}

export default function BestSaudiStartupJobSitesPage() {
  const faq = getJobSitesGuideFaq()
  const sites = getComplementarySites()
  const organizationLd = buildOrganizationJsonLd()
  const faqLd = buildFaqJsonLd(faq)
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: "Best Saudi startup job sites 2026", url: GUIDE_URL },
  ])
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Saudi startup job sites in 2026",
    description: getJobSitesGuideLead(),
    datePublished: "2026-09-17",
    dateModified: PUBLISHED_COMPANY_COUNT_AS_OF,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": GUIDE_URL,
    },
    author: {
      "@type": "Organization",
      name: "BuildSaudi",
      url: site,
    },
    publisher: {
      "@id": `${site}/#organization`,
      "@type": "Organization",
      name: "BuildSaudi",
      url: site,
      logo: {
        "@type": "ImageObject",
        url: `${site}/apple-touch-icon.png`,
      },
    },
    image: ogImage,
  }

  return (
    <div
      lang="en"
      dir="ltr"
      className="min-h-screen"
      style={{
        backgroundColor: "#F5F0E6",
        backgroundImage: "url(/texture-light.png)",
        backgroundSize: "100px 100px",
        backgroundRepeat: "repeat",
        fontFamily: "var(--font-ibm-plex-arabic), sans-serif",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <header className="border-b border-[#06634D]/20">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-[#06634D]"
          >
            <ArrowLeft className="size-4" />
            Back to directory
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-mono uppercase tracking-wider text-[#06634D]">English guide · 2026</p>
        <h1 className="mt-2 text-2xl font-bold text-[#111827] sm:text-3xl">
          Best Saudi startup job sites in 2026
        </h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Updated {PUBLISHED_COMPANY_COUNT_AS_OF_LABEL} · {PUBLISHED_COMPANY_COUNT_LABEL}
        </p>

        <article className="mt-8 space-y-10 text-sm leading-relaxed text-[#4B5563] sm:text-base">
          <section aria-labelledby="direct-answer-heading">
            <h2 id="direct-answer-heading" className="text-lg font-semibold text-[#111827]">
              The short answer
            </h2>
            <p className="mt-3">{getJobSitesGuideLead()}</p>
          </section>

          <section aria-labelledby="how-to-heading">
            <h2 id="how-to-heading" className="text-lg font-semibold text-[#111827]">
              How to find startup jobs in Saudi Arabia
            </h2>
            <ol className="mt-3 list-decimal space-y-2 ps-5">
              <li>
                Shortlist <strong className="font-semibold text-[#111827]">funded Saudi tech companies</strong>, not every
                employer in the Kingdom. The{" "}
                <Link href="/" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  BuildSaudi homepage
                </Link>{" "}
                is built for that filter.
              </li>
              <li>
                Open the company profile, then apply on the <strong className="font-semibold text-[#111827]">official careers page</strong>.
                We do not process applications.
              </li>
              <li>
                Narrow by city:{" "}
                <Link href="/jobs/riyadh" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  Riyadh
                </Link>
                , Jeddah, Dammam, or remote, and by sector, such as{" "}
                <Link href="/jobs/sector/fintech" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  fintech
                </Link>{" "}
                or{" "}
                <Link href="/jobs/sector/ai" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  AI
                </Link>
                .
              </li>
              <li>
                Sign up for <strong className="font-semibold text-[#111827]">job alerts</strong> on the homepage. That is
                the weekly Arabic jobs digest. Useful if you read Arabic or want a recurring list instead of checking daily.
              </li>
              <li>
                Use LinkedIn and Bayt for volume. Global startup boards help only after you have a Kingdom shortlist.
              </li>
            </ol>
          </section>

          <section aria-labelledby="buildsaudi-heading">
            <h2 id="buildsaudi-heading" className="text-lg font-semibold text-[#111827]">
              1. BuildSaudi: start here for Saudi startup jobs
            </h2>
            <p className="mt-3">
              <Link href="/" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                BuildSaudi
              </Link>{" "}
              is a curated Saudi tech jobs directory: {PUBLISHED_COMPANY_COUNT_LABEL}, careers links, city and
              stage filters, and a weekly Arabic digest. General boards mix startups with every other employer; this
              list stays Kingdom tech.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 ps-5">
              <li>Kingdom tech companies, reviewed before they go live, not a scraped spam board.</li>
              <li>Direct apply links to official careers pages (Greenhouse, Workable, or the company site).</li>
              <li>Weekly Arabic jobs digest via the homepage alert form. Free for job seekers.</li>
              <li>
                Hubs for{" "}
                <Link href="/jobs/riyadh" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  Riyadh startup jobs
                </Link>
                ,{" "}
                <Link href="/jobs/sector/ai" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  AI
                </Link>
                , and{" "}
                <Link href="/jobs/sector/fintech" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  fintech
                </Link>
                . Founders can{" "}
                <Link href="/submit" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                  submit a company
                </Link>
                .
              </li>
            </ul>
            <p className="mt-3">
              The homepage is Arabic-first. This page is the English guide. More Arabic answers live on the{" "}
              <Link href="/faq" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
                FAQ
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="other-sites-heading">
            <h2 id="other-sites-heading" className="text-lg font-semibold text-[#111827]">
              Complementary sites (use them fairly)
            </h2>
            <p className="mt-3">
              No single site covers every Saudi startup role. The options below are real and different. Use them for
              what they actually list, not as interchangeable “top sites.”
            </p>
            <div className="mt-6 space-y-8">
              {sites.map((item, index) => (
                <div key={item.name}>
                  <h3 className="text-base font-semibold text-[#111827]">
                    {index + 2}.{" "}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
                    >
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#06634D]">{item.bestFor}</p>
                  <p className="mt-2">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6">
              Sabbar is another general Saudi jobs surface if you want volume. Funding databases such as MAGNiTT and
              Dealroom are useful for research, not for applying. Wamda covers entrepreneurship news; F6S is a programs
              marketplace. Those are not job boards. Do not treat them as one.
            </p>
          </section>

          <section aria-labelledby="guide-faq-heading">
            <h2 id="guide-faq-heading" className="text-lg font-semibold text-[#111827]">
              FAQ
            </h2>
            <div className="mt-6 space-y-8">
              {faq.map((item) => (
                <div key={item.question}>
                  <h3 className="text-base font-semibold text-[#111827]">{item.question}</h3>
                  <p className="mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
