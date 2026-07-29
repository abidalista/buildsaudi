"use client"

import { useState, useEffect } from "react"
import { DEFAULT_LANG, getStoredLang, setStoredLang } from "@/lib/lang"
import type { Lang } from "@/lib/i18n"

interface LanguageToggleProps {
  /** Controlled language. If omitted, toggle manages its own state + localStorage. */
  lang?: Lang
  onLanguageChange?: (lang: Lang) => void
}

export function LanguageToggle({ lang: controlledLang, onLanguageChange }: LanguageToggleProps) {
  const [internal, setInternal] = useState<Lang>(DEFAULT_LANG)

  useEffect(() => {
    if (controlledLang === undefined) {
      setInternal(getStoredLang())
    }
  }, [controlledLang])

  const lang = controlledLang ?? internal
  const isArabic = lang === "ar"

  const toggle = () => {
    const next: Lang = lang === "ar" ? "en" : "ar"
    setStoredLang(next)
    if (controlledLang === undefined) setInternal(next)
    onLanguageChange?.(next)
  }

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
