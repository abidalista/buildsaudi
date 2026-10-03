import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { JobHubView, jobHubDescription, jobHubTitle } from "@/components/job-hub-view"
import { getSectorJobHub, getSectorJobHubs } from "@/lib/job-hubs"

const site = "https://buildsaudi.co"

export const dynamicParams = false

export function generateStaticParams() {
  return getSectorJobHubs().map((hub) => ({ city: hub.citySlug, sector: hub.facetSlug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; sector: string }>
}): Promise<Metadata> {
  const { city, sector } = await params
  const hub = getSectorJobHub(city, sector)
  if (!hub) return {}
  return {
    title: jobHubTitle(hub),
    description: jobHubDescription(hub),
    alternates: { canonical: `${site}${hub.path}` },
  }
}

export default async function CitySectorJobsPage({
  params,
}: {
  params: Promise<{ city: string; sector: string }>
}) {
  const { city, sector } = await params
  const hub = getSectorJobHub(city, sector)
  if (!hub) notFound()
  return <JobHubView hub={hub} />
}
