import type { FaqItem } from "@/lib/aeo-content"

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://buildsaudi.co/#organization",
    name: "BuildSaudi",
    url: "https://buildsaudi.co",
    logo: "https://buildsaudi.co/apple-touch-icon.png",
    description:
      "Curated directory of funded Saudi startups and their official careers pages.",
    foundingDate: "2026",
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    sameAs: ["https://x.com/abidalista"],
  }
}

export function buildFaqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildItemListJsonLd(name: string, description: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: item.name,
        url: item.url,
      },
    })),
  }
}
