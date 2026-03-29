import posthog from "posthog-js"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  capture_exceptions: true,
  person_profiles: "identified_only",
  debug: process.env.NODE_ENV === "development",
})
