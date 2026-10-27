"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Globe, Linkedin, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AiApplyBanner } from "@/components/ai-apply-banner"
import { AiApplyBenefit } from "@/components/ai-apply-benefit"
import { AiApplyPromoCard } from "@/components/ai-apply-promo-card"
import { AiApplyUpsellProvider, TrackedApplyLink } from "@/components/ai-apply-upsell"
import { CompanyLogo } from "@/components/company-logo"
import { LanguageToggle } from "@/components/language-toggle"
import { SiteFooter } from "@/components/site-footer"
import { PageLangProvider, usePageLang } from "@/lib/use-page-lang"
import { shouldInsertAiApplyPromo } from "@/lib/ai-apply"
import { jobFreshnessStamp } from "@/lib/job-classify"
import { withBuildSaudiUtm } from "@/lib/utm"
import type { CompanyProfile } from "@/lib/company-profiles"
import type { FaqItem } from "@/lib/aeo-content"
import type { Company, Job } from "@/lib/types"

export type CompanyProfileClientProps = {
  company: Company
  jobs: Job[]
  profile: CompanyProfile | undefined
  faq: FaqItem[]
  careersUrl: string
  hiringCopy: string
  jobsSeen: string
  careersSameAsWebsite: boolean
  jobsScrapedAt: string
}

export function CompanyProfileClient(props: CompanyProfileClientProps) {
  return (
    <PageLangProvider page="company">
      <CompanyProfileView {...props} />
    </PageLangProvider>
  )
}

function CompanyProfileView({
  company,
  jobs,
  profile,
  faq,
  careersUrl,
  hiringCopy,
  jobsSeen,
  careersSameAsWebsite,
  jobsScrapedAt,
}: CompanyProfileClientProps) {
  const { lang, isRTL, t, handleLangChange } = usePageLang()

  return (
    <AiApplyUpsellProvider src="company_upsell" lang={lang}>
      <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen">
        <AiApplyBanner src="company_banner" lang={lang} />

        <header className="border-b border-[#e5e5e5] bg-white">
          <div className="mx-auto max-w-[1200px] px-6 py-6">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="block">
                <div
                  className="text-3xl font-bold tracking-tight text-[#06634D]"
                  style={{ fontFamily: "var(--font-space-mono), monospace" }}
                  aria-label="BuildSaudi"
                >
                  {"["} BUILDSAUDI {"]"}
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <LanguageToggle lang={lang} onLanguageChange={handleLangChange} />
                <Link href="/jobs">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#06634D] text-[#06634D] hover:bg-[#06634D] hover:text-white"
                  >
                    {t.jobsBoard}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1200px] px-6 py-8 pb-40 sm:pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a1a1a] mb-6"
          >
            <ArrowLeft className="size-3.5 rtl:rotate-180" />
            {t.back}
          </Link>

          <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6">
            <div className="flex items-start gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 overflow-hidden">
                <CompanyLogo company={company} className="size-10 object-contain" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold">{company.name}</h1>
                  <Badge variant="outline" className="text-xs font-medium text-[#06634D] border-[#06634D]">
                    {company.stage}
                  </Badge>
                </div>

                <div className="mt-2 flex items-center gap-3 flex-wrap text-sm text-[#6b7280]">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {company.city}
                  </span>
                  {company.sector.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>

                <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                  {profile?.summary || company.description}
                </p>
                {profile || (jobsSeen && jobs.length > 0) ? (
                  <p className="mt-3 text-xs font-mono text-[#06634D]">
                    {profile ? `Facts last checked ${profile.lastChecked}` : null}
                    {profile && jobsSeen && jobs.length > 0 ? " · " : null}
                    {jobsSeen && jobs.length > 0 ? `Openings last seen ${jobsSeen}` : null}
                  </p>
                ) : null}

                <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <TrackedApplyLink
                      href={careersUrl}
                      companyName={company.name}
                      companySlug={company.slug}
                      placement="company_apply"
                      className="inline-flex items-center justify-center gap-1.5 rounded bg-[#06634D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#044D3B] transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                      {t.applyAt} {company.name}
                    </TrackedApplyLink>
                    <AiApplyBenefit placement="company_apply" lang={lang} className="px-3 py-2.5 text-sm" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                    {!careersSameAsWebsite ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#06634D]"
                      >
                        <Globe className="size-3.5" />
                        {t.website}
                      </a>
                    ) : null}
                    {company.linkedin ? (
                      <a
                        href={company.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#06634D]"
                      >
                        <Linkedin className="size-3.5" />
                        LinkedIn
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <AiApplyPromoCard src="company_card" lang={lang} />
          </div>

          {profile ? (
            <section
              className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6"
              aria-labelledby="sourced-facts-heading"
            >
              <h2 id="sourced-facts-heading" className="text-lg font-bold text-[#111827] mb-1">
                Funding and investors
              </h2>
              <p className="text-xs text-[#6b7280] mb-4">
                Only facts we can cite from a company or investor page. We do not estimate later rounds or
                headcount.
              </p>
              {profile.founders ? (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#111827]">Founders</h3>
                  <p className="mt-1 text-sm text-[#4b5563] leading-relaxed">{profile.founders.text}</p>
                  <SourceLink label={profile.founders.sourceLabel} href={profile.founders.sourceUrl} />
                </div>
              ) : null}
              {profile.funding.length > 0 ? (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#111827]">Funding</h3>
                  <ul className="mt-2 space-y-3">
                    {profile.funding.map((item) => (
                      <li key={item.text}>
                        <p className="text-sm text-[#4b5563] leading-relaxed">{item.text}</p>
                        <SourceLink label={item.sourceLabel} href={item.sourceUrl} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {profile.investors.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">Investors</h3>
                  <ul className="mt-2 space-y-3">
                    {profile.investors.map((item) => (
                      <li key={item.text}>
                        <p className="text-sm text-[#4b5563] leading-relaxed">{item.text}</p>
                        <SourceLink label={item.sourceLabel} href={item.sourceUrl} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {!profile.founders && profile.funding.length === 0 && profile.investors.length === 0 ? (
                <p className="text-sm text-[#4b5563] leading-relaxed">
                  We have not verified founders, funding amounts, or investor names on a company or investor
                  page for this profile.
                </p>
              ) : null}
            </section>
          ) : null}

          {profile || jobs.length > 0 ? (
            <section
              className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6"
              aria-labelledby="open-roles-heading"
            >
              <h2 id="open-roles-heading" className="text-lg font-bold text-[#111827] mb-2">
                {jobs.length > 0 ? `Open roles at ${company.name}` : `Roles at ${company.name}`}
              </h2>
              <p className="text-sm text-[#4b5563] leading-relaxed mb-4">{hiringCopy}</p>
              {jobs.length > 0 && (
                <ul className="divide-y divide-gray-100">
                  {jobs.map((job, index) => {
                    const freshness = jobFreshnessStamp(job, jobsScrapedAt)
                    return (
                      <li key={job.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#111827]">{job.title}</p>
                            <p className="text-xs text-[#6b7280] mt-0.5" dir="ltr">
                              {job.location}
                              {freshness
                                ? ` · ${freshness.kind === "posted" ? t.jobPosted : t.jobSeen} ${freshness.date}`
                                : ""}
                            </p>
                          </div>
                          <div className="shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-1.5">
                            <AiApplyBenefit placement="company_job" lang={lang} />
                            <TrackedApplyLink
                              href={withBuildSaudiUtm(job.apply_url)}
                              companyName={company.name}
                              companySlug={company.slug}
                              jobTitle={job.title}
                              placement="company_job"
                              className="px-3 py-1.5 bg-[#06634D] text-white text-xs font-semibold rounded hover:bg-[#044D3B]"
                            >
                              {t.apply}
                            </TrackedApplyLink>
                          </div>
                        </div>
                        {shouldInsertAiApplyPromo(index) ? (
                          <div className="mt-3">
                            <AiApplyPromoCard src="company_card" lang={lang} />
                          </div>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          ) : null}

          <section className="rounded-lg border border-[#e5e5e5] bg-white p-6 mb-6" aria-labelledby="company-faq-heading">
            <h2 id="company-faq-heading" className="text-lg font-bold text-[#111827] mb-4">
              FAQ: {company.name}
            </h2>
            <dl className="space-y-4">
              {faq.map((item) => (
                <div key={item.question}>
                  <dt className="text-sm font-semibold text-[#111827]" dir="auto">
                    {item.question}
                  </dt>
                  <dd className="mt-1 text-sm text-[#4b5563] leading-relaxed" dir="auto">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e5e5e5] bg-white/95 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
          <div className="flex flex-col gap-2">
            <TrackedApplyLink
              href={careersUrl}
              companyName={company.name}
              companySlug={company.slug}
              placement="company_mobile"
              className="flex w-full items-center justify-center gap-1.5 rounded bg-[#06634D] px-3 py-3 text-sm font-semibold text-white"
            >
              <ExternalLink className="size-3.5" />
              {t.applyAt} {company.name}
            </TrackedApplyLink>
            <AiApplyBenefit
              placement="company_mobile"
              lang={lang}
              className="w-full justify-center px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <SiteFooter />
      </div>
    </AiApplyUpsellProvider>
  )
}

function SourceLink({ label, href }: { label: string; href: string }) {
  return (
    <p className="mt-1 text-xs text-[#6b7280]">
      Source:{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#06634D] hover:underline">
        {label}
      </a>
    </p>
  )
}
