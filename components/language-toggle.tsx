"use client"

import { useState } from "react"

interface LanguageToggleProps {
  defaultLang?: "en" | "ar"
  onLanguageChange?: (lang: "en" | "ar") => void
}

export function LanguageToggle({ defaultLang = "en", onLanguageChange }: LanguageToggleProps) {
  const [lang, setLang] = useState<"en" | "ar">(defaultLang)

  const handleToggle = (selected: "en" | "ar") => {
    if (selected === lang) return
    setLang(selected)
    onLanguageChange?.(selected)
  }

  return (
    <div className="flex flex-col items-center gap-3 p-3 rounded-xl bg-[#f0f0f0]" style={{ width: "fit-content" }}>
      {/* English Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleToggle("en")}
          className="relative w-[56px] h-[28px] rounded-full overflow-hidden cursor-pointer flex-shrink-0"
          style={{
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.2)",
          }}
          aria-label="Select English"
        >
          {/* UK Flag background */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <clipPath id="uk-clip"><rect width="60" height="30" rx="14" /></clipPath>
              <g clipPath="url(#uk-clip)">
                <rect width="60" height="30" fill="#012169" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
                <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
                <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
              </g>
            </svg>
          </div>
          {/* Knob */}
          <div
            className="absolute top-[2px] w-[24px] h-[24px] rounded-full bg-white transition-all duration-300 ease-in-out"
            style={{
              left: lang === "en" ? "2px" : "30px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)",
            }}
          />
        </button>
        <span className="text-xs font-mono text-[#555] select-none" style={{ minWidth: "52px" }}>English</span>
      </div>

      {/* Arabic Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleToggle("ar")}
          className="relative w-[56px] h-[28px] rounded-full overflow-hidden cursor-pointer flex-shrink-0"
          style={{
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.2)",
          }}
          aria-label="Select Arabic"
        >
          {/* Saudi Flag background */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <clipPath id="sa-clip"><rect width="60" height="30" rx="14" /></clipPath>
              <g clipPath="url(#sa-clip)">
                <rect width="60" height="30" fill="#006C35" />
                {/* Shahada text simplified */}
                <text x="30" y="14" textAnchor="middle" fill="white" fontSize="7" fontFamily="serif" fontWeight="bold">لا إله إلا الله</text>
                {/* Sword */}
                <line x1="15" y1="22" x2="45" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="22" x2="15" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>
          {/* Knob */}
          <div
            className="absolute top-[2px] w-[24px] h-[24px] rounded-full bg-white transition-all duration-300 ease-in-out"
            style={{
              left: lang === "ar" ? "2px" : "30px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)",
            }}
          />
        </button>
        <span className="text-xs font-mono text-[#555] select-none" style={{ minWidth: "52px" }}>العربية</span>
      </div>
    </div>
  )
}
