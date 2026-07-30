import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI search / retrieval — allow (citations & ChatGPT search)
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      // Optional: block training-only crawler (does not affect ChatGPT search)
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: "https://buildsaudi.co/sitemap.xml",
  }
}
