import type { Metadata } from "next"
import { companies } from "@/lib/data"
import { aeoFaq } from "@/lib/aeo-content"
import { buildOrganizationJsonLd } from "@/lib/aeo-jsonld"
import HomeClient from "@/components/home-client"

export const metadata: Metadata = {
  title: `Startup Jobs in Saudi Arabia — ${companies.length}+ Companies | BuildSaudi`,
  description: `Browse ${companies.length}+ funded Saudi startups hiring in Riyadh and across the Kingdom. Filter by sector and stage — apply direct. وظائف شركات ناشئة في السعودية.`,
  alternates: {
    canonical: "https://buildsaudi.co",
  },
}

export default function HomePage() {
  const organizationLd = buildOrganizationJsonLd()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BuildSaudi",
    url: "https://buildsaudi.co",
    description: "A curated directory of Saudi startups and their open jobs.",
    publisher: { "@id": "https://buildsaudi.co/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://buildsaudi.co/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saudi Startups Hiring",
    description: "Top Saudi startups with open jobs",
    numberOfItems: companies.length,
    itemListElement: companies.slice(0, 20).map((company, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: company.name,
        url: company.website,
        description: company.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: company.city,
          addressCountry: "SA",
        },
      },
    })),
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aeoFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <HomeClient />
    </>
  )
}
