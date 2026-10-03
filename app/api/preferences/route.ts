import { NextRequest, NextResponse } from "next/server"
import {
  emptyPrefs,
  normalizeEmail,
  prefsFromAirtableFields,
  prefsToAirtableFields,
  type DigestPrefs,
} from "@/lib/digest-prefs"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const SEEKERS_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Job%20Seekers`

function formulaEmail(email: string): string {
  const escaped = normalizeEmail(email).replace(/'/g, "\\'")
  return `LOWER({Email})='${escaped}'`
}

async function findSeeker(email: string): Promise<{ id: string; fields: Record<string, unknown> } | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  const params = new URLSearchParams({
    filterByFormula: formulaEmail(email),
    maxRecords: "1",
  })
  const res = await fetch(`${SEEKERS_URL}?${params}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    cache: "no-store",
  })
  if (!res.ok) {
    console.error("Airtable preferences lookup failed:", res.status, await res.text())
    return null
  }
  const data = await res.json()
  const record = data.records?.[0]
  if (!record?.id) return null
  return { id: record.id, fields: record.fields || {} }
}

function parsePrefsBody(body: unknown): DigestPrefs {
  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {}
  const list = (value: unknown): string[] =>
    Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : []
  return {
    roles: list(input.roles),
    cities: list(input.cities),
    sectors: list(input.sectors),
    experience: list(input.experience),
    stages: list(input.stages),
  }
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || ""
  if (!email.trim()) {
    return NextResponse.json({ error: "email required" }, { status: 400 })
  }
  const seeker = await findSeeker(email)
  if (!seeker) {
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }
  return NextResponse.json({
    email: normalizeEmail(email),
    prefs: prefsFromAirtableFields(seeker.fields),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = typeof body.email === "string" ? body.email : ""
    if (!email.trim()) {
      return NextResponse.json({ error: "email required" }, { status: 400 })
    }
    const seeker = await findSeeker(email)
    if (!seeker) {
      return NextResponse.json({ error: "not found" }, { status: 404 })
    }
    const prefs = parsePrefsBody(body.prefs ?? body)
    const res = await fetch(SEEKERS_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ id: seeker.id, fields: prefsToAirtableFields(prefs) }],
      }),
    })
    if (!res.ok) {
      console.error("Airtable preferences save failed:", res.status, await res.text())
      return NextResponse.json({ error: "Failed to save" }, { status: 500 })
    }
    return NextResponse.json({ success: true, prefs: prefs || emptyPrefs() })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
