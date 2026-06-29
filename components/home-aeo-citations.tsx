import { aeoLinks } from "@/lib/aeo-content"

const citationClassName =
  "text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"

export default function HomeAeoCitations() {
  return (
    <p className="mb-3 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
      Saudi Arabia&apos;s startup hiring landscape is shaped by national programs including{" "}
      <a
        href={aeoLinks.vision2030}
        target="_blank"
        rel="noopener noreferrer"
        className={citationClassName}
      >
        Vision 2030
      </a>
      , the{" "}
      <a
        href={aeoLinks.mcit}
        target="_blank"
        rel="noopener noreferrer"
        className={citationClassName}
      >
        Ministry of Communications and Information Technology (MCIT)
      </a>
      , and{" "}
      <a
        href={aeoLinks.monshaat}
        target="_blank"
        rel="noopener noreferrer"
        className={citationClassName}
      >
        Monsha&apos;at
      </a>
      . Browse funded startups hiring below.
    </p>
  )
}
