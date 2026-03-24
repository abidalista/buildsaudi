"use client"

import { useState, useCallback } from "react"
import type { Company } from "@/lib/types"

const sectorColors: Record<string, string> = {
  AI: "#2563EB",
  Fintech: "#059669",
  Proptech: "#EA580C",
  Cybersecurity: "#7C3AED",
  "E-commerce": "#DB2777",
  SaaS: "#0891B2",
  Logistics: "#CA8A04",
  Govtech: "#4F46E5",
  Energy: "#16A34A",
  Defense: "#64748B",
  Aerospace: "#0284C7",
  Construction: "#92400E",
  "Bio & Health": "#DC2626",
  Education: "#9333EA",
  Edtech: "#9333EA",
  Agriculture: "#15803D",
  Geospatial: "#0D9488",
  "HR Tech": "#E11D48",
  Foodtech: "#F97316",
  Robotics: "#6366F1",
  "Data & Infrastructure": "#475569",
  "Deep Tech": "#7C3AED",
  IoT: "#0EA5E9",
  Media: "#EC4899",
  Healthtech: "#DC2626",
  Gaming: "#EF4444",
  Travel: "#0891B2",
}

function LetterAvatar({ name, sector }: { name: string; sector: string[] }) {
  const color = sectorColors[sector[0]] || "#6B7280"
  return (
    <div
      className="flex items-center justify-center w-full h-full rounded-md text-white font-bold text-lg"
      style={{ backgroundColor: color }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

// no local logo file — show letter avatar instead.
const GENERIC_LOGO_SLUGS = new Set([
  "aec", "alat", "atam", "ballurh", "bynow", "capify", "ceer",
  "collecto", "edana", "ejar", "engagesoft", "firnas", "fitting",
  "gbt", "glamera", "halo-media", "hazen", "intella-ai", "jahez",
  "jazer", "judhur", "kashon", "kilow", "kliq", "leejak", "lite",
  "livedin", "nayla", "noon-academy", "nuwayra", "omniful", "oqood",
  "open-valley", "petroapp", "picship", "rased", "rawaa", "reporty",
  "salesfine", "sayfi", "sdaia", "silq", "spore", "spoilz",
  "stitch-money", "string-tech", "supplai", "tabsense", "torod",
  "trubuild", "ummar", "xbites", "yamm"
])

export function CompanyLogo({
  company,
  className = "size-8 sm:size-9 object-contain",
}: {
  company: Company
  className?: string
}) {
  // strategy: local logo first (/logos/{slug}.png), fallback to letter avatar.
  // no more clearbit/google favicon chain. logos are downloaded at build time.
  const [showLetter, setShowLetter] = useState(
    GENERIC_LOGO_SLUGS.has(company.slug)
  )

  const handleError = useCallback(() => {
    setShowLetter(true)
  }, [])

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    // catch tiny/generic favicons that slipped through
    if (img.naturalWidth > 0 && img.naturalWidth < 20) {
      setShowLetter(true)
    }
  }, [])

  if (showLetter) {
    return <LetterAvatar name={company.name} sector={company.sector} />
  }

  return (
    <img
      src={`/logos/${company.slug}.png`}
      alt={company.name}
      className={className}
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
