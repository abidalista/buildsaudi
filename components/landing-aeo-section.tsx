import Link from "next/link"
import type { FaqItem } from "@/lib/aeo-content"
import { aeoLinks } from "@/lib/aeo-content"

const linkClass = "text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"

type LandingAeoSectionProps = {
  heading: string
  aboutTitle: string
  aboutContent: React.ReactNode
  faq: FaqItem[]
  ariaLabel: string
}

export default function LandingAeoSection({
  heading,
  aboutTitle,
  aboutContent,
  faq,
  ariaLabel,
}: LandingAeoSectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="rounded-lg border border-[#06634D]/15 bg-white text-sm text-[#374151]"
    >
      <h2 className="px-4 pt-3 text-lg font-bold text-[#111827] sm:text-xl">{heading}</h2>

      <details className="group border-b border-[#06634D]/10">
        <summary className="cursor-pointer list-none px-4 py-2.5 font-semibold text-[#06634D] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            <span>{aboutTitle}</span>
            <span className="text-xs font-normal text-[#6B7280] group-open:hidden">Show more</span>
            <span className="text-xs font-normal text-[#6B7280] hidden group-open:inline">Show less</span>
          </span>
        </summary>
        <div className="space-y-3 px-4 pb-4 pt-0">{aboutContent}</div>
      </details>

      <details className="group">
        <summary className="cursor-pointer list-none px-4 py-2.5 font-semibold text-[#06634D] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            <span>Frequently asked questions</span>
            <span className="text-xs font-normal text-[#6B7280] group-open:hidden">Show FAQ</span>
            <span className="text-xs font-normal text-[#6B7280] hidden group-open:inline">Hide FAQ</span>
          </span>
        </summary>
        <div className="space-y-4 px-4 pb-4 pt-0">
          <h3 className="text-base font-semibold text-[#111827]">FAQ</h3>
          {faq.map((item) => (
            <div key={item.question}>
              <h4 className="font-medium text-[#111827]">{item.question}</h4>
              <p className="mt-1 text-[#4B5563]">{item.answer}</p>
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}

export function AeoCitationStrip() {
  return (
    <p className="mb-4 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
      Saudi startup hiring is shaped by{" "}
      <a href={aeoLinks.vision2030} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Vision 2030
      </a>
      ,{" "}
      <a href={aeoLinks.mcit} target="_blank" rel="noopener noreferrer" className={linkClass}>
        MCIT
      </a>
      , and{" "}
      <a href={aeoLinks.monshaat} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Monsha&apos;at
      </a>
      . Browse funded startups below or return to the{" "}
      <Link href="/" className={linkClass}>
        full directory
      </Link>
      .
    </p>
  )
}
