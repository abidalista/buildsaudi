import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Terms of Use — BuildSaudi",
  description:
    "Terms for using BuildSaudi, the curated Saudi startup jobs directory.",
  alternates: { canonical: "https://buildsaudi.co/terms" },
}

export default function TermsPage() {
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
        <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Last updated: August 2, 2026</p>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#4B5563] sm:text-base">
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Agreement</h2>
            <p>
              By using BuildSaudi (<Link href="/" className="text-[#06634D] underline underline-offset-2">buildsaudi.co</Link>),
              you agree to these terms. If you do not agree, do not use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">What BuildSaudi is</h2>
            <p>
              BuildSaudi is an informational directory of Saudi startups and links to their public careers
              pages. We are not an employer, recruiter, or staffing agency for the listed companies unless
              explicitly stated otherwise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">No employment guarantee</h2>
            <p>
              Company details, funding context, and job links are curated for convenience. Listings may be
              incomplete, outdated, or incorrect. Always verify openings on the employer&apos;s official site
              before applying. We do not guarantee interviews, offers, or hiring outcomes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Your use of the site</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>Do not scrape, overload, or abuse the service</li>
              <li>Do not submit false or misleading company or signup information</li>
              <li>Do not use the site for unlawful purposes</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Third-party links</h2>
            <p>
              Careers pages, company websites, and other outbound links are owned by third parties. Their
              terms and privacy practices apply once you leave BuildSaudi.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Disclaimer</h2>
            <p>
              The site is provided &quot;as is&quot; without warranties of any kind, express or implied,
              including accuracy, availability, or fitness for a particular purpose.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, BuildSaudi and its operator are not liable for any
              indirect, incidental, or consequential damages arising from your use of the directory or
              reliance on any listing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Changes</h2>
            <p>
              We may update these terms from time to time. Continued use after changes means you accept the
              updated terms. The &quot;Last updated&quot; date above reflects the latest revision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Contact</h2>
            <p>
              Questions:{" "}
              <a
                href="https://x.com/abidalista"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#06634D] underline underline-offset-2"
              >
                x.com/abidalista
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
