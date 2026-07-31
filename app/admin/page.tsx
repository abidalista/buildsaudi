import { fetchPostHogMetrics, fetchRecentEvents } from "@/lib/posthog-api"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function AdminPage() {
  let metrics
  let events
  let error

  try {
    const [metricsData, eventsData] = await Promise.all([
      fetchPostHogMetrics(),
      fetchRecentEvents(20),
    ])
    metrics = metricsData
    events = eventsData
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error"
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">BuildSaudi Analytics</h1>
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Error loading metrics</h2>
            <p className="text-red-400">{error}</p>
            <p className="text-sm text-gray-400 mt-4">
              Make sure POSTHOG_PERSONAL_API_KEY is set in your environment
            </p>
          </div>
        </div>
      </div>
    )
  }

  const getLatestValue = (data: any) => {
    try {
      const results = data?.results?.[0]?.data || []
      if (results.length === 0) return 0
      return results[results.length - 1] || 0
    } catch {
      return 0
    }
  }

  const getTotalValue = (data: any) => {
    try {
      const results = data?.results?.[0]?.data || []
      return results.reduce((sum: number, val: number) => sum + (val || 0), 0)
    } catch {
      return 0
    }
  }

  const todayDAU = getLatestValue(metrics?.dailyActiveUsers)
  const totalPageviews = getTotalValue(metrics?.pageviews)
  const totalSessions = getTotalValue(metrics?.sessions)
  const totalErrors = getTotalValue(metrics?.errors)

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">BuildSaudi Analytics</h1>
          <p className="text-gray-400">Last 30 days</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Daily Active Users"
            value={todayDAU.toLocaleString()}
            subtitle="Today"
            color="blue"
          />
          <MetricCard
            title="Total Pageviews"
            value={totalPageviews.toLocaleString()}
            subtitle="Last 30 days"
            color="green"
          />
          <MetricCard
            title="Total Sessions"
            value={totalSessions.toLocaleString()}
            subtitle="Last 30 days"
            color="purple"
          />
          <MetricCard
            title="Errors"
            value={totalErrors.toLocaleString()}
            subtitle="Last 30 days"
            color={totalErrors > 100 ? "red" : "gray"}
          />
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="pb-3 pr-4">Event</th>
                  <th className="pb-3 pr-4">User</th>
                  <th className="pb-3 pr-4">Timestamp</th>
                  <th className="pb-3">Properties</th>
                </tr>
              </thead>
              <tbody>
                {events?.results?.map((event: any, i: number) => (
                  <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                    <td className="py-3 pr-4 font-mono text-sm text-blue-400">{event.event}</td>
                    <td className="py-3 pr-4 text-sm text-gray-400">
                      {event.distinct_id?.slice(0, 8)}...
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-400">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 text-xs text-gray-500">
                      {event.properties?.$current_url || event.properties?.url || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string
  value: string
  subtitle: string
  color: "blue" | "green" | "purple" | "red" | "gray"
}) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30",
    gray: "from-gray-500/20 to-gray-600/20 border-gray-500/30",
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-6`}>
      <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
      <p className="text-4xl font-bold mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}
