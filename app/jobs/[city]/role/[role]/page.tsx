import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { JobHubView, jobHubDescription, jobHubTitle } from "@/components/job-hub-view"
import { getRoleJobHub, getRoleJobHubs } from "@/lib/job-hubs"

const site = "https://buildsaudi.co"

export const dynamicParams = false

export function generateStaticParams() {
  return getRoleJobHubs().map((hub) => ({ city: hub.citySlug, role: hub.facetSlug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; role: string }>
}): Promise<Metadata> {
  const { city, role } = await params
  const hub = getRoleJobHub(city, role)
  if (!hub) return {}
  return {
    title: jobHubTitle(hub),
    description: jobHubDescription(hub),
    alternates: { canonical: `${site}${hub.path}` },
  }
}

export default async function CityRoleJobsPage({
  params,
}: {
  params: Promise<{ city: string; role: string }>
}) {
  const { city, role } = await params
  const hub = getRoleJobHub(city, role)
  if (!hub) notFound()
  return <JobHubView hub={hub} />
}
