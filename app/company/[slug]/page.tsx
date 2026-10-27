import { notFound } from "next/navigation"
import { companies, getCompanyBySlug, getJobsByCompany, jobsScrapedAt } from "@/lib/data"
import { withBuildSaudiUtm } from "@/lib/utm"
import { getCompanyProfile, hiringNowCopy } from "@/lib/company-profiles"
import { getCompanyFaq } from "@/lib/aeo-landing"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/aeo-jsonld"
import { CompanyProfileClient } from "@/components/company-profile-client"
import type { Metadata } from "next"

const site = "https://buildsaudi.co"

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  if (!company) return {}
  const jobCount = getJobsByCompany(slug).length
  const profile = getCompanyProfile(slug)
  const title =
    jobCount > 0
      ? `${company.name} Jobs and Careers | ${jobCount} Open Roles | BuildSaudi`
      : `${company.name} Careers | ${company.stage} ${company.sector[0]} Startup | BuildSaudi`
  const description = profile
    ? `${profile.summary} ${jobCount > 0 ? `${jobCount} current openings from the official board.` : "Official careers link included."} Last checked ${profile.lastChecked}. BuildSaudi does not process applications.`
    : jobCount > 0
      ? `Browse ${jobCount} open roles at ${company.name}. ${company.description.slice(0, 100)} Apply on the official careers page. BuildSaudi does not process applications.`
      : `${company.description.slice(0, 120)} Explore ${company.name}'s BuildSaudi profile. ${company.stage} ${company.sector[0]} startup in ${company.city}. Careers link included.`
  return {
    title,
    description,
    alternates: { canonical: `${site}/company/${slug}` },
  }
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)

  if (!company) {
    notFound()
  }

  const companyJobs = getJobsByCompany(slug)
  const profile = getCompanyProfile(slug)
  const pageUrl = `${site}/company/${slug}`
  const primarySector = company.sector[0]
  const careersUrl = withBuildSaudiUtm(company.careers_url)
  const faq = [
    ...(profile?.faq ?? []),
    ...getCompanyFaq(company.name, primarySector, company.city, company.stage, careersUrl),
  ]
  const careersSameAsWebsite =
    company.website.replace(/\/$/, "") === company.careers_url.replace(/\/$/, "")
  const jobsSeen = jobsScrapedAt ? jobsScrapedAt.slice(0, 10) : ""
  const lastChecked = profile?.lastChecked || jobsSeen
  const hiringCopy = hiringNowCopy(company.name, companyJobs, jobsScrapedAt)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.website,
    description: profile?.summary || company.description,
    address: { "@type": "PostalAddress", addressLocality: company.city, addressCountry: "SA" },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    sameAs: [company.linkedin, company.website].filter(Boolean),
    ...(company.founded_year ? { foundingDate: String(company.founded_year) } : {}),
  }

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl,
    name: `${company.name} careers`,
    description: profile?.summary || company.description,
    ...(lastChecked ? { dateModified: lastChecked, lastReviewed: lastChecked } : {}),
  }

  const jobPostingsLd = companyJobs.map((job) => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.title} at ${company.name}`,
    datePosted: job.posted_date,
    employmentType: job.job_type === "Full-time" ? "FULL_TIME" : job.job_type === "Part-time" ? "PART_TIME" : job.job_type === "Contract" ? "CONTRACTOR" : "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: company.name, sameAs: company.website },
    url: job.apply_url,
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location.includes("Remote") ? "Remote" : job.location, addressCountry: "SA" } },
    directApply: true,
  }))

  const faqLd = buildFaqJsonLd(faq)
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "BuildSaudi", url: site },
    { name: company.name, url: pageUrl },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {jobPostingsLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <CompanyProfileClient
        company={company}
        jobs={companyJobs}
        profile={profile}
        faq={faq}
        careersUrl={careersUrl}
        hiringCopy={hiringCopy}
        jobsSeen={jobsSeen}
        careersSameAsWebsite={careersSameAsWebsite}
        jobsScrapedAt={jobsScrapedAt}
      />
    </>
  )
}
