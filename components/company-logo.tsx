"use client"

import { useState } from "react"
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
  Agriculture: "#15803D",
  Geospatial: "#0D9488",
  "HR Tech": "#E11D48",
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
  const [fallbackLevel, setFallbackLevel] = useState(0)
  const [src, setSrc] = useState(
    `https://logo.clearbit.com/${domain}`
  )

  const handleError = () => {
    if (fallbackLevel === 0) {
      setSrc(
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      )
      setFallbackLevel(1)
    } else {
      setFallbackLevel(2)
    }
  }

  if (fallbackLevel === 2) {
    return <LetterAvatar name={company.name} sector={company.sector} />
  }

  return (
    <img
      src={src}
      alt={company.name}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  )
}
