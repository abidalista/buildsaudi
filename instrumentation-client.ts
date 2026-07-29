import posthog from "posthog-js"

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!.trim()
const POSTHOG_HOST = "/ingest"

function shouldDropException(event: { event?: string; properties?: Record<string, unknown> }) {
  if (event.event !== "$exception") return false
  const list = (event.properties?.["$exception_list"] as Array<Record<string, unknown>> | undefined) || []
  const first = list[0]
  const type = String(first?.["$exception_type"] ?? event.properties?.["$exception_type"] ?? "")
  const value = String(first?.["$exception_value"] ?? event.properties?.["$exception_message"] ?? "")
  // Safari-style noise from browser extensions / injected scripts — not our app
  if (/can't find variable:\s*CONFIG/i.test(value)) return true
  if (type === "ReferenceError" && /\bCONFIG\b/.test(value)) return true
  return false
}

posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,
  ui_host: "https://eu.posthog.com",
  person_profiles: "always",
  capture_pageview: false,
  capture_pageleave: true,
  capture_performance: true,
  capture_exceptions: true,
  error_tracking: {
    captureExtensionExceptions: false,
  },
  before_send: (event) => {
    if (!event) return event
    if (shouldDropException(event)) return null
    return event
  },
  disable_session_recording: false,
  session_recording: {
    maskAllInputs: false,
    maskInputOptions: {
      password: true,
    },
  },
  autocapture: {
    dom_event_allowlist: ["click", "change", "submit"],
    element_allowlist: ["a", "button", "form", "input", "select", "textarea"],
    css_selector_allowlist: ["[data-ph-capture]"],
  },
  capture_dead_clicks: true,
  scroll_root_selector: ["#main-content", "body"],
})
