import { NextRequest, NextResponse } from "next/server"
import { aiApplyDestination } from "@/lib/ai-apply"
import { LANG_COOKIE } from "@/lib/lang"

export const dynamic = "force-dynamic"

export function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src")
  const lang =
    request.nextUrl.searchParams.get("lang") ?? request.cookies.get(LANG_COOKIE)?.value
  return NextResponse.redirect(aiApplyDestination(src, lang), 302)
}
