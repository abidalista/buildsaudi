import { defineCloudflareConfig } from "@opennextjs/cloudflare"

// Default (in-memory) cache: no R2 / KV / Durable Objects, so this stays on
// the Workers Free plan. Pages are mostly SSG from lib/data.ts; API routes
// (job-seeker, preferences, suggest, substack) are dynamic and do not need ISR.
export default defineCloudflareConfig()
