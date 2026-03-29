import { NextRequest, NextResponse } from "next/server"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY!
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID!

function getTagFromTitle(title: string): string {
  const t = title.toLowerCase()

  const techKeywords = [
    "software", "developer", "engineer", "backend", "frontend", "fullstack",
    "devops", "sre", "cybersecurity", "soc", "security", "cloud", "ai",
    "machine learning", "ml", "data engineer", "it", "embedded", "rtl",
    "computer", "mobile", "ios", "android", "qa", "test", "mechanical",
    "electrical", "industrial", "nuclear", "network", "system admin",
    "technical support", "دعم فني"
  ]
  if (techKeywords.some(k => t.includes(k))) return "tech"

  const financeKeywords = [
    "finance", "accounting", "accountant", "treasury", "financial",
    "cashier", "auditor", "bookkeeper", "محاسب", "مالي"
  ]
  if (financeKeywords.some(k => t.includes(k))) return "finance"

  const salesMarketingKeywords = [
    "sales", "marketing", "growth", "seo", "content", "copywriter",
    "social media", "brand", "communications", "pr ", "public relation",
    "advertising", "مبيعات", "تسويق"
  ]
  if (salesMarketingKeywords.some(k => t.includes(k))) return "sales and marketing"

  const opsKeywords = [
    "operations", "pmo", "project", "procurement", "supply chain",
    "logistics", "hr", "human resource", "talent", "recruiter",
    "people", "admin", "office manager", "business analyst",
    "account manager", "coordinator"
  ]
  if (opsKeywords.some(k => t.includes(k))) return "operations"

  const productKeywords = [
    "product", "design", "ux", "ui", "graphic", "interior",
    "game design", "creative", "art director", "تصميم"
  ]
  if (productKeywords.some(k => t.includes(k))) return "product"

  const earlyCareerKeywords = [
    "intern", "coop", "co-op", "trainee", "fresh grad", "junior",
    "entry level", "متدرب", "تدريب"
  ]
  if (earlyCareerKeywords.some(k => t.includes(k))) return "early career"

  return ""
}

async function addToBeehiiv(email: string, title: string) {
  try {
    const tag = getTagFromTitle(title)
    const body: Record<string, unknown> = {
      email: email.trim(),
      send_welcome_email: true,
      utm_source: "buildsaudi.co",
      utm_medium: "website",
    }
    if (tag) {
      body.tags = [tag]
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error("Beehiiv error:", err)
    }
  } catch (err) {
    console.error("Beehiiv request failed:", err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, title, email } = body

    if (!name?.trim() || !title?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Job%20Seekers`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: name.trim(),
                Title: title.trim(),
                Email: email.trim(),
                "Submitted At": new Date().toISOString(),
              },
            },
          ],
        }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error("Airtable error:", err)
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
    }

    // add to beehiiv newsletter with auto-tag (non-blocking)
    addToBeehiiv(email, title)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
