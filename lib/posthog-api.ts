const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY
const POSTHOG_PROJECT_ID = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_ID || "default"
const POSTHOG_HOST = "https://eu.posthog.com"

export async function fetchPostHogMetrics() {
  if (!POSTHOG_API_KEY) {
    throw new Error("POSTHOG_PERSONAL_API_KEY not set")
  }

  const headers = {
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
    "Content-Type": "application/json",
  }

  try {
    // Fetch insights from PostHog
    const [dailyActiveUsers, pageviews, sessions, errors] = await Promise.all([
      fetchInsight("daily_active_users", headers),
      fetchInsight("pageviews", headers),
      fetchInsight("sessions", headers),
      fetchInsight("errors", headers),
    ])

    return {
      dailyActiveUsers,
      pageviews,
      sessions,
      errors,
    }
  } catch (error) {
    console.error("Failed to fetch PostHog metrics:", error)
    throw error
  }
}

async function fetchInsight(metric: string, headers: HeadersInit) {
  const today = new Date().toISOString().split("T")[0]
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  let query
  switch (metric) {
    case "daily_active_users":
      query = {
        kind: "InsightVizNode",
        source: {
          kind: "TrendsQuery",
          series: [
            {
              kind: "EventsNode",
              event: "$pageview",
              math: "dau",
            },
          ],
          dateRange: {
            date_from: thirtyDaysAgo,
            date_to: today,
          },
        },
      }
      break
    case "pageviews":
      query = {
        kind: "InsightVizNode",
        source: {
          kind: "TrendsQuery",
          series: [
            {
              kind: "EventsNode",
              event: "$pageview",
            },
          ],
          dateRange: {
            date_from: thirtyDaysAgo,
            date_to: today,
          },
        },
      }
      break
    case "sessions":
      query = {
        kind: "InsightVizNode",
        source: {
          kind: "TrendsQuery",
          series: [
            {
              kind: "EventsNode",
              event: "$pageview",
              math: "unique_session",
            },
          ],
          dateRange: {
            date_from: thirtyDaysAgo,
            date_to: today,
          },
        },
      }
      break
    case "errors":
      query = {
        kind: "InsightVizNode",
        source: {
          kind: "TrendsQuery",
          series: [
            {
              kind: "EventsNode",
              event: "$exception",
            },
          ],
          dateRange: {
            date_from: thirtyDaysAgo,
            date_to: today,
          },
        },
      }
      break
    default:
      throw new Error(`Unknown metric: ${metric}`)
  }

  const response = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`PostHog API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function fetchRecentEvents(limit = 10) {
  if (!POSTHOG_API_KEY) {
    throw new Error("POSTHOG_PERSONAL_API_KEY not set")
  }

  const response = await fetch(
    `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/events/?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`)
  }

  return response.json()
}
