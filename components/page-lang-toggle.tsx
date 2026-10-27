"use client"

import { LanguageToggle } from "@/components/language-toggle"
import { usePageLang } from "@/lib/use-page-lang"

export function PageLangToggle() {
  const { lang, handleLangChange } = usePageLang()
  return <LanguageToggle lang={lang} onLanguageChange={handleLangChange} />
}
