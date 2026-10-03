import { createHmac, timingSafeEqual } from "node:crypto"
import { normalizeEmail } from "./digest-prefs"

function preferencesSecret(): string {
  return process.env.PREFERENCES_SECRET || process.env.AIRTABLE_API_KEY || "buildsaudi-preferences"
}

export function signPreferencesToken(email: string): string {
  return createHmac("sha256", preferencesSecret()).update(normalizeEmail(email)).digest("hex")
}

export function verifyPreferencesToken(email: string, token: string): boolean {
  if (!email.trim() || !token.trim()) return false
  const expected = signPreferencesToken(email)
  const given = token.trim()
  const expectedBuf = Buffer.from(expected)
  const givenBuf = Buffer.from(given)
  if (expectedBuf.length !== givenBuf.length) return false
  return timingSafeEqual(expectedBuf, givenBuf)
}

export function preferencesPath(email: string): string {
  const token = signPreferencesToken(email)
  const params = new URLSearchParams({ email: email.trim(), token })
  return `/preferences?${params.toString()}`
}
