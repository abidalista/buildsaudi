"use client"

import { useState, useCallback } from "react"
import type { Company } from "@/lib/types"

function getDomain(website: string): string {
  try {
    return new URL(website).hostname.replace(/^www\./, "")
  } catch {
    return website.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]
  }
}

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

export function CompanyLogo({
  company,
  className = "size-8 sm:size-9 object-contain",
}: {
  company: Company
  className?: string
}) {
  const domain = getDomain(company.website)

  const getInitialSrc = () => {
    if (company.logo_override) return company.logo_override
    return `https://logo.clearbit.com/${domain}`
  }

  const getInitialLevel = () => {
    if (company.logo_override) return -1 // -1 = override mode
    return 0
  }

  const [fallbackLevel, setFallbackLevel] = useState(getInitialLevel)
  const [src, setSrc] = useState(getInitialSrc)
  const [showLetter, setShowLetter] = useState(false)

  const handleError = useCallback(() => {
    if (fallbackLevel === -1) {
      // override failed, go to clearbit
      setSrc(`https://logo.clearbit.com/${domain}`)
      setFallbackLevel(0)
    } else if (fallbackLevel === 0) {
      setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
      setFallbackLevel(1)
    } else {
      setShowLetter(true)
    }
  }, [fallbackLevel, domain])

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    // Catch generic/tiny favicons — if image is smaller than 32px it's likely
    // a default globe or generic placeholder
    if (img.naturalWidth > 0 && img.naturalWidth < 32) {
      handleError()
    }
  }, [handleError])

  if (showLetter) {
    return <LetterAvatar name={company.name} sector={company.sector} />
  }

  return (
    <img
      src={src}
      alt={company.name}
      className={className}
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
