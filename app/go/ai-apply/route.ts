import { NextRequest, NextResponse } from "next/server"
import { aiApplyDestination } from "@/lib/ai-apply"

export const dynamic = "force-dynamic"

export function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src")
  return NextResponse.redirect(aiApplyDestination(src), 302)
}
