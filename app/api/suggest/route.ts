import { NextRequest, NextResponse } from "next/server"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { companyName, website, details } = body

    if (!companyName || typeof companyName !== "string" || companyName.trim().length === 0) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 })
    }

    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Suggestions`,
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
                "Company Name": companyName.trim(),
                Website: website?.trim() || undefined,
                Details: details?.trim() || undefined,
                Status: "New",
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
