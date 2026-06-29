import Link from "next/link"
import { aeoLinks } from "@/lib/aeo-content"
import { sectorBlurbs } from "@/lib/aeo-landing"
import { sectors } from "@/lib/seo"

const linkClass = "text-[#06634D] underline underline-offset-2 hover:text-[#06634D]/80"

function sectorSlugFor(sectorName: string): string {
  const match = sectors.find((s) =>
    sectorName.toLowerCase().includes(s.name.split(" ")[0].toLowerCase()),
  )
  return match?.slug ?? "fintech"
}

function citySlugFor(cityName: string): string {
  return cityName.toLowerCase()
}

export function CityAeoAbout({
  cityName,
  blurb,
  companyCount,
  slug,
}: {
  cityName: string
  blurb: string
  companyCount: number
  slug: string
}) {
  const otherCities = [
    { slug: "riyadh", name: "Riyadh" },
    { slug: "jeddah", name: "Jeddah" },
    { slug: "dammam", name: "Dammam" },
    { slug: "remote", name: "Remote" },
  ].filter((c) => c.slug !== slug)

  return (
    <>
      <p>
        BuildSaudi lists <strong>{companyCount} funded startups</strong> hiring in {cityName}. {blurb}
      </p>
      <p>
        Saudi Arabia&apos;s tech workforce is expanding under{" "}
        <a href={aeoLinks.vision2030} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Vision 2030
        </a>{" "}
        and programs from{" "}
        <a href={aeoLinks.monshaat} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Monsha&apos;at
        </a>
        . Use this page to compare companies by sector and stage, then apply on official careers sites.
      </p>
      <p>
        Explore{" "}
        <Link href="/jobs/sector/fintech" className={linkClass}>
          fintech startup jobs
        </Link>
        ,{" "}
        <Link href="/jobs/sector/ai" className={linkClass}>
          AI startup jobs
        </Link>
        , or{" "}
        <Link href="/jobs/stage/seed" className={linkClass}>
          seed-stage startups
        </Link>
        . Also browse{" "}
        {otherCities.map((c, i) => (
          <span key={c.slug}>
            {i > 0 && (i === otherCities.length - 1 ? ", and " : ", ")}
            <Link href={`/jobs/${c.slug}`} className={linkClass}>
              {c.name}
            </Link>
          </span>
        ))}
        .
      </p>
    </>
  )
}

export function SectorAeoAbout({
  sectorName,
  slug,
  companyCount,
  examples,
}: {
  sectorName: string
  slug: string
  companyCount: number
  examples: string[]
}) {
  const blurb = sectorBlurbs[slug] ?? `${sectorName} is a growing vertical in the Saudi startup ecosystem.`
  const exampleText = examples.slice(0, 3).join(", ")

  return (
    <>
      <p>
        BuildSaudi tracks <strong>{companyCount} {sectorName.toLowerCase()} startups</strong> in Saudi Arabia
        {exampleText ? `, including ${exampleText}` : ""}. {blurb}
      </p>
      <p>
        The sector benefits from Saudi regulatory sandboxes and national digitization goals outlined in{" "}
        <a href={aeoLinks.vision2030} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Vision 2030
        </a>{" "}
        and{" "}
        <a href={aeoLinks.mcit} target="_blank" rel="noopener noreferrer" className={linkClass}>
          MCIT
        </a>{" "}
        initiatives. Compare companies below and open any profile to reach official careers pages.
      </p>
      <p>
        Browse by city:{" "}
        <Link href="/jobs/riyadh" className={linkClass}>
          Riyadh
        </Link>
        ,{" "}
        <Link href="/jobs/jeddah" className={linkClass}>
          Jeddah
        </Link>
        ,{" "}
        <Link href="/jobs/dammam" className={linkClass}>
          Dammam
        </Link>
        . See also{" "}
        <Link href="/jobs/stage/series-a" className={linkClass}>
          Series A startups
        </Link>{" "}
        and the{" "}
        <Link href="/" className={linkClass}>
          full BuildSaudi directory
        </Link>
        .
      </p>
    </>
  )
}

export function StageAeoAbout({
  stageName,
  description,
  companyCount,
  slug,
}: {
  stageName: string
  description: string
  companyCount: number
  slug: string
}) {
  const otherStages = [
    { slug: "unicorn", name: "Unicorn" },
    { slug: "series-b", name: "Series B" },
    { slug: "series-a", name: "Series A" },
    { slug: "seed", name: "Seed" },
  ].filter((s) => s.slug !== slug)

  return (
    <>
      <p>
        BuildSaudi lists <strong>{companyCount} {stageName.toLowerCase()} Saudi startups</strong>.{" "}
        {description} These companies hire across engineering, product, design, sales, and operations.
      </p>
      <p>
        Saudi venture funding hit record levels in recent years, supported by{" "}
        <a href={aeoLinks.monshaat} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Monsha&apos;at
        </a>{" "}
        and{" "}
        <a href={aeoLinks.vision2030} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Vision 2030
        </a>
        . Stage pages help you target the maturity level that fits your risk and growth preferences.
      </p>
      <p>
        Compare{" "}
        {otherStages.map((s, i) => (
          <span key={s.slug}>
            {i > 0 && (i === otherStages.length - 1 ? ", and " : ", ")}
            <Link href={`/jobs/stage/${s.slug}`} className={linkClass}>
              {s.name} startups
            </Link>
          </span>
        ))}
        . Filter by sector on the{" "}
        <Link href="/" className={linkClass}>
          homepage
        </Link>{" "}
        or browse{" "}
        <Link href="/jobs/sector/fintech" className={linkClass}>
          fintech
        </Link>{" "}
        and{" "}
        <Link href="/jobs/sector/ai" className={linkClass}>
          AI
        </Link>{" "}
        hiring lists.
      </p>
    </>
  )
}

export function CompanyAeoAbout({
  companyName,
  description,
  sector,
  city,
  stage,
  slug: _slug,
}: {
  companyName: string
  description: string
  sector: string
  city: string
  stage: string
  slug: string
}) {
  const sectorLink = `/jobs/sector/${sectorSlugFor(sector)}`
  const cityLink = `/jobs/${citySlugFor(city)}`

  return (
    <>
      <p>
        <strong>{companyName}</strong> is a {stage.toLowerCase()} {sector} startup in {city}, Saudi Arabia.{" "}
        {description}
      </p>
      <p>
        BuildSaudi profiles help job seekers and researchers discover funded Saudi companies with verified
        careers links. Saudi&apos;s startup economy is part of the broader{" "}
        <a href={aeoLinks.vision2030} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Vision 2030
        </a>{" "}
        diversification push, with talent programs led by{" "}
        <a href={aeoLinks.mcit} target="_blank" rel="noopener noreferrer" className={linkClass}>
          MCIT
        </a>
        .
      </p>
      <p>
        Explore similar companies on our{" "}
        <Link href={sectorLink} className={linkClass}>
          {sector} jobs page
        </Link>
        , browse{" "}
        <Link href={cityLink} className={linkClass}>
          startups in {city}
        </Link>
        , or return to the{" "}
        <Link href="/" className={linkClass}>
          full directory
        </Link>
        . See another example profile:{" "}
        <Link href="/company/tamara" className={linkClass}>
          Tamara
        </Link>
        .
      </p>
    </>
  )
}
