import Link from "next/link"
import { getAllJobHubs, type JobHub } from "@/lib/job-hubs"

export function JobHubLinks({
  hubs,
  heading,
}: {
  hubs?: JobHub[]
  heading?: string
}) {
  const list = hubs ?? getAllJobHubs()
  if (list.length === 0) return null

  return (
    <section className="mt-8" aria-labelledby="job-hub-links-heading">
      <h2 id="job-hub-links-heading" className="text-lg font-bold text-[#111827]">
        {heading || "Shareable job lists"}
      </h2>
      <p className="mt-1 text-sm text-[#6B7280]">
        Pages we publish only when a city and sector, or a role and city, have a real list of openings.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {list.map((hub) => (
          <li key={hub.path}>
            <Link
              href={hub.path}
              className="inline-flex items-center rounded border border-[#06634D]/30 px-3 py-1.5 text-xs font-medium text-[#06634D] hover:bg-[#06634D]/5"
            >
              {hub.facetName} in {hub.cityName} ({hub.jobs.length})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
