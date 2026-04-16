import { NextRequest, NextResponse } from "next/server"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!

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

async function addToSubstack(email: string) {
  try {
    const res = await fetch(
      "https://averageabidall.substack.com/api/v1/free",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          first_url: "https://buildsaudi.co",
          first_referrer: "",
        }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error("Substack error:", err)
    }
  } catch (err) {
    console.error("Substack request failed:", err)
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

    // add to substack newsletter (non-blocking)
    addToSubstack(email)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
