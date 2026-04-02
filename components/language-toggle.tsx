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
      className="relative w-[36px] h-[18px] rounded-full overflow-hidden cursor-pointer flex-shrink-0"
      style={{
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)",
      }}
      aria-label={isArabic ? "Switch to English" : "التبديل للعربية"}
    >
      {/* Saudi flag */}
      <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: isArabic ? 1 : 0 }}>
        <img src="https://flagcdn.com/w80/sa.png" alt="" className="w-full h-full object-cover" />
      </div>
      {/* UK flag */}
      <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: isArabic ? 0 : 1 }}>
        <img src="https://flagcdn.com/w80/gb.png" alt="" className="w-full h-full object-cover" />
      </div>
      {/* Knob */}
      <div
        className="absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all duration-300 ease-in-out"
        style={{
          left: isArabic ? "2px" : "20px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      />
    </button>
  )
}
