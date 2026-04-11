import type { Metadata } from "next"
import { companies } from "@/lib/data"
import HomeClient from "@/components/home-client"

export const metadata: Metadata = {
  title: "BuildSaudi — Startup Jobs in Saudi Arabia",
  description: `Find jobs at ${companies.length}+ Saudi startups. Curated directory of the best companies building the future of the Kingdom — tech, fintech, healthtech, and more.`,
  alternates: {
    canonical: "https://buildsaudi.co",
  },
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BuildSaudi",
    url: "https://buildsaudi.co",
    description: "A curated directory of Saudi startups and their open jobs.",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <HomeClient />
    </>
  )
}
