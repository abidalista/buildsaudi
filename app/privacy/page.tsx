import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy — BuildSaudi",
  description:
    "How BuildSaudi collects, uses, and protects information when you browse the directory or sign up for job alerts.",
  alternates: { canonical: "https://buildsaudi.co/privacy" },
}

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Last updated: August 2, 2026</p>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#4B5563] sm:text-base">
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Who we are</h2>
            <p>
              BuildSaudi (<Link href="/" className="text-[#06634D] underline underline-offset-2">buildsaudi.co</Link>)
              is a curated directory of funded Saudi startups and their careers pages. We do not host job
              applications — you apply on each company&apos;s official site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Information we collect</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>
                <strong className="font-medium text-[#111827]">Job alert / newsletter signups.</strong> If you
                submit a name, email, or role title, we store that so we can send relevant updates (via our
                signup tools such as Airtable and Substack).
              </li>
              <li>
                <strong className="font-medium text-[#111827]">Company submissions.</strong> If you suggest a
                company, we keep the details you provide for manual review.
              </li>
              <li>
                <strong className="font-medium text-[#111827]">Usage analytics.</strong> We use Google Analytics
                and PostHog to understand page views, clicks, and product usage. These tools may set cookies or
                similar identifiers.
              </li>
              <li>
                <strong className="font-medium text-[#111827]">Technical logs.</strong> Our hosting provider
                (Vercel) and CDN (Cloudflare) may process IP addresses and request metadata to operate and
                secure the site.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">How we use information</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>Operate and improve the directory</li>
              <li>Send job alerts or newsletter content you opted into</li>
              <li>Review company submissions</li>
              <li>Measure traffic and feature usage</li>
              <li>Prevent abuse and keep the site secure</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Third parties</h2>
            <p>
              Depending on what you use on the site, data may be processed by providers such as Vercel,
              Cloudflare, Google Analytics, PostHog, Airtable, and Substack under their own privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Cookies</h2>
            <p>
              Analytics tools may use cookies or local storage. You can block cookies in your browser; some
              analytics may then be limited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Your choices</h2>
            <p>
              To unsubscribe from email updates, use the unsubscribe link in those emails or contact us. To ask
              about access or deletion of signup data you submitted, reach out via{" "}
              <a
                href="https://x.com/abidalista"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#06634D] underline underline-offset-2"
              >
                @abidalista
              </a>{" "}
              on X.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#111827] sm:text-lg">Contact</h2>
            <p>
              Questions about this policy:{" "}
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
