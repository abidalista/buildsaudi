import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "About BuildSaudi — Saudi Startup Jobs Directory",
  description:
    "BuildSaudi is a curated directory of Saudi startups and their open jobs — funded companies in the Kingdom with direct careers links.",
  alternates: { canonical: "https://buildsaudi.co/about" },
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F5F0E6",
        backgroundImage: "url(/texture-light.png)",
        backgroundSize: "100px 100px",
        backgroundRepeat: "repeat",
        fontFamily: "var(--font-ibm-plex-arabic), sans-serif",
      }}
    >
      <header className="border-b border-[#06634D]/20">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-[#06634D]"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">About BuildSaudi</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#4B5563] sm:text-base">
          <p>
            BuildSaudi is a curated directory of Saudi startups and their open jobs. We list funded
            companies across fintech, AI, e-commerce, logistics, healthtech, and more — with direct
            links to careers pages, funding context, and company profiles.
          </p>
          <p>
            Whether you are a software engineer, product manager, designer, or operator, use the
            homepage to filter by sector, city, or stage and apply directly on each company&apos;s
            official careers page. Founders and hiring teams can{" "}
            <Link href="/submit" className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80">
              submit a company
            </Link>{" "}
            for review.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
