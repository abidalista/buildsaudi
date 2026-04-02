"use client"

import { useState } from "react"

interface LanguageToggleProps {
  defaultLang?: "en" | "ar"
  onLanguageChange?: (lang: "en" | "ar") => void
}

export function LanguageToggle({ defaultLang = "ar", onLanguageChange }: LanguageToggleProps) {
  const [lang, setLang] = useState<"en" | "ar">(defaultLang)

  const toggle = () => {
    const next = lang === "ar" ? "en" : "ar"
    setLang(next)
    onLanguageChange?.(next)
  }

  const isArabic = lang === "ar"

  return (
    <button
      onClick={toggle}
      className="relative w-[44px] h-[22px] rounded-full overflow-hidden cursor-pointer flex-shrink-0"
      style={{
        boxShadow: "inset 0 1.5px 3px rgba(0,0,0,0.3)",
      }}
      aria-label={isArabic ? "Switch to English" : "التبديل للعربية"}
    >
      {/* Saudi flag (shown when Arabic) */}
      <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: isArabic ? 1 : 0 }}>
        <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="30" fill="#006C35" />
          <text x="30" y="14" textAnchor="middle" fill="white" fontSize="7" fontFamily="serif" fontWeight="bold">لا إله إلا الله</text>
          <line x1="15" y1="22" x2="45" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="22" x2="15" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {/* UK flag (shown when English) */}
      <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: isArabic ? 0 : 1 }}>
        <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      </div>
      {/* Knob */}
      <div
        className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-300 ease-in-out"
        style={{
          left: isArabic ? "2px" : "24px",
          boxShadow: "0 1.5px 3px rgba(0,0,0,0.25)",
        }}
      />
    </button>
  )
}
