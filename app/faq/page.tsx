import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { aeoFaq } from "@/lib/aeo-content"
import { buildFaqJsonLd, buildHowToJsonLd } from "@/lib/aeo-jsonld"
import {
  getFundedStartupJobHowToAr,
  getFundedStartupJobHowToEn,
  type HowToGuide,
} from "@/lib/howto-funded-jobs"
import { MARKETING_COMPANY_COUNT_LABEL_AR } from "@/lib/marketing"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "FAQ | BuildSaudi | أسئلة شائعة عن وظائف الشركات الناشئة",
  description: `كيف ألاقي وظيفة في شركة ناشئة ممولة في السعودية؟ خطوات من BuildSaudi: صفّي ${MARKETING_COMPANY_COUNT_LABEL_AR} شركة، افتح الملف، وقدّم من موقعهم. How to find jobs at funded Saudi startups.`,
  alternates: { canonical: "https://buildsaudi.co/faq" },
}

function HowToSection({ guide }: { guide: HowToGuide }) {
  return (
    <section
      id={guide.id}
      aria-labelledby={`${guide.id}-heading`}
      dir={guide.inLanguage === "ar" ? "rtl" : "ltr"}
      lang={guide.inLanguage}
    >
      <h2 id={`${guide.id}-heading`} className="text-lg font-semibold text-[#111827]">
        {guide.name}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">{guide.description}</p>
      <ol className="mt-4 list-decimal space-y-3 ps-5 text-sm leading-relaxed text-[#4B5563] sm:text-base">
        {guide.steps.map((step) => (
          <li key={step.name}>
            <strong className="font-semibold text-[#111827]">{step.name}.</strong> {step.text}
            {step.links && step.links.length > 0 ? (
              <>
                {" "}
                {step.links.map((link, index) => (
                  <span key={`${step.name}-${link.href}`}>
                    {index > 0 ? " · " : ""}
                    <Link
                      href={link.href}
                      className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function FaqPage() {
  const howToAr = getFundedStartupJobHowToAr()
  const howToEn = getFundedStartupJobHowToEn()
  const howToQuestions = new Set([howToAr.name, howToEn.name])
  const otherFaq = aeoFaq.filter((item) => !howToQuestions.has(item.question))
  const faqLd = buildFaqJsonLd(aeoFaq)
  const howToArLd = buildHowToJsonLd(howToAr)
  const howToEnLd = buildHowToJsonLd(howToEn)

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToArLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToEnLd) }} />

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
        <p className="mt-3 text-sm text-[#4B5563]">
          English:{" "}
          <Link
            href="/guides/best-saudi-startup-job-sites"
            className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
          >
            Best Saudi startup job sites in 2026
          </Link>
        </p>

        <div className="mt-10 space-y-10">
          <HowToSection guide={howToAr} />
          <HowToSection guide={howToEn} />
        </div>

        <div className="mt-12 space-y-8">
          {otherFaq.map((item) => (
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
