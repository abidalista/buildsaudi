import { NextRequest, NextResponse } from "next/server"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!

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

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
