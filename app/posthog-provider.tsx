"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && !posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
        ui_host: "https://eu.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        capture_performance: true,
      })
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
