import type { MetadataRoute } from "next"
import { companies } from "@/lib/data"
import { cities, roles, sectors, stages } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://buildsaudi.co"

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/jobs`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${base}/submit`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
  ]

  const companyPages = companies.map((c) => ({
    url: `${base}/company/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const cityPages = cities.map((c) => ({
    url: `${base}/jobs/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const sectorPages = sectors.map((s) => ({
    url: `${base}/jobs/sector/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const stagePages = stages.map((s) => ({
    url: `${base}/jobs/stage/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...companyPages, ...cityPages, ...sectorPages, ...stagePages]
}
