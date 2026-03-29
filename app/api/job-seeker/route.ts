import { NextRequest, NextResponse } from "next/server"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY!
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID!

async function addToBeehiiv(email: string) {
  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          send_welcome_email: true,
          utm_source: "buildsaudi.co",
          utm_medium: "website",
        }),
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

    // add to beehiiv newsletter (non-blocking, don't fail if this errors)
    addToBeehiiv(email)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
