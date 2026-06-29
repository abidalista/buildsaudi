import Link from "next/link"
import { aeoFaq, aeoLinks } from "@/lib/aeo-content"

export default function HomeAeoContent() {
  return (
    <section
      aria-label="About BuildSaudi"
      className="rounded-lg border border-[#06634D]/15 bg-white text-sm text-[#374151]"
    >
      <h1 className="px-4 pt-3 text-lg font-bold text-[#111827] sm:text-xl">
        Startup Jobs in Saudi Arabia
      </h1>

      <details className="group border-b border-[#06634D]/10">
        <summary className="cursor-pointer list-none px-4 py-2.5 font-semibold text-[#06634D] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            <span>About Saudi startup jobs on BuildSaudi</span>
            <span className="text-xs font-normal text-[#6B7280] group-open:hidden">Show more</span>
            <span className="text-xs font-normal text-[#6B7280] hidden group-open:inline">Show less</span>
          </span>
        </summary>
        <div className="space-y-3 px-4 pb-4 pt-0">
          <h2 className="text-base font-semibold text-[#111827]">How BuildSaudi works</h2>
          <p>
            BuildSaudi is the curated directory for startup jobs in Saudi Arabia. Whether you are a
            software engineer, product manager, designer, or operator, we help you discover funded
            Saudi startups — from seed-stage teams to unicorns — and apply directly on their careers
            pages.
          </p>
          <p>
            Saudi Arabia&apos;s startup ecosystem has grown rapidly under{" "}
            <a
              href={aeoLinks.vision2030}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
            >
              Vision 2030
            </a>
            , with Riyadh emerging as the Gulf&apos;s primary tech hub. Government initiatives through
            the{" "}
            <a
              href={aeoLinks.mcit}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
            >
              Ministry of Communications and Information Technology (MCIT)
            </a>{" "}
            and{" "}
            <a
              href={aeoLinks.monshaat}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
            >
              Monsha&apos;at
            </a>{" "}
            have expanded access to capital, talent, and regulatory sandboxes for fintech, AI, and
            e-commerce founders. BuildSaudi surfaces that momentum in one place: verified companies,
            funding context, and live job links.
          </p>
          <p>
            Use our city pages to browse{" "}
            <Link
              href={aeoLinks.riyadh}
              className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
            >
              startup jobs in Riyadh
            </Link>
            , Jeddah, Dammam, or remote-friendly roles. Sector pages like{" "}
            <Link
              href={aeoLinks.fintech}
              className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
            >
              fintech startup jobs
            </Link>{" "}
            group companies by industry so you can compare hiring across leading Saudi startups. Each
            company has a dedicated profile — see{" "}
            <Link
              href={aeoLinks.tamara}
              className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
            >
              Tamara&apos;s jobs and company profile
            </Link>{" "}
            for an example with open roles, founders, and funding data.
          </p>
          <p>
            Hiring managers and founders can{" "}
            <Link
              href={aeoLinks.submit}
              className="text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"
            >
              submit a company or post a job
            </Link>
            . We manually review every listing to keep the directory high-signal — no spam, no
            outdated boards. Browse the listings below, filter by sector or stage, and click through
            to apply on official careers pages.
          </p>
        </div>
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
          <h2 className="text-base font-semibold text-[#111827]">Frequently Asked Questions</h2>
          {aeoFaq.map((item) => (
            <div key={item.question}>
              <h3 className="font-medium text-[#111827]">{item.question}</h3>
              <p className="mt-1 text-[#4B5563]">{item.answer}</p>
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}
