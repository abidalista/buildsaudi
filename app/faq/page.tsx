import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { aeoFaq } from "@/lib/aeo-content"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "FAQ — BuildSaudi | أسئلة شائعة عن وظائف الشركات الناشئة",
  description:
    "أسئلة شائعة: وين ألاقي وظائف شركات ناشئة في الرياض؟ هل فيه دليل للشركات الناشئة السعودية مع الوظائف؟ Find startup jobs in Saudi Arabia on BuildSaudi.",
  alternates: { canonical: "https://buildsaudi.co/faq" },
}

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aeoFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

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
        <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">FAQ</h1>
        <p className="mt-2 text-sm text-[#6B7280]" dir="rtl">
          أسئلة شائعة عن وظائف الشركات الناشئة في السعودية
        </p>
        <div className="mt-8 space-y-8">
          {aeoFaq.map((item) => (
            <div key={item.question}>
              <h2 className="text-base font-semibold text-[#111827]" dir="auto">
                {item.question}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563] sm:text-base" dir="auto">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
