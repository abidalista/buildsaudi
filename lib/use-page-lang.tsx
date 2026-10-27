"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import posthog from "posthog-js"
import { strings, type Lang } from "@/lib/i18n"
import { DEFAULT_LANG, getStoredLang, setStoredLang } from "@/lib/lang"

export type PageLangValue = {
  lang: Lang
  isRTL: boolean
  t: (typeof strings)[Lang]
  handleLangChange: (next: Lang) => void
}

const PageLangContext = createContext<PageLangValue | null>(null)

/** Read lang from an ancestor provider or a passed prop. Does not sync document.dir. */
export function useResolvedLang(lang?: Lang): Lang {
  const ctx = useContext(PageLangContext)
  return lang ?? ctx?.lang ?? DEFAULT_LANG
}

function syncDocumentLang(isRTL: boolean) {
  document.documentElement.dir = isRTL ? "rtl" : "ltr"
  document.documentElement.lang = isRTL ? "ar" : "en"
}

export function PageLangProvider({
  page,
  children,
}: {
  page: string
  children: ReactNode
}) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG)
  const isRTL = lang === "ar"

  useEffect(() => {
    setLang(getStoredLang())
  }, [])

  useEffect(() => {
    syncDocumentLang(isRTL)
    return () => {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    }
  }, [isRTL])

  const handleLangChange = useCallback(
    (next: Lang) => {
      posthog.capture("language_toggled", { from: lang, to: next, page })
      setStoredLang(next)
      setLang(next)
    },
    [lang, page],
  )

  const value: PageLangValue = { lang, isRTL, t: strings[lang], handleLangChange }
  return <PageLangContext.Provider value={value}>{children}</PageLangContext.Provider>
}

export function usePageLang(): PageLangValue {
  const ctx = useContext(PageLangContext)
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG)
  const isRTL = lang === "ar"

  useEffect(() => {
    if (ctx) return
    setLang(getStoredLang())
  }, [ctx])

  useEffect(() => {
    if (ctx) return
    syncDocumentLang(isRTL)
    return () => {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    }
  }, [ctx, isRTL])

  const handleLangChange = useCallback((next: Lang) => {
    posthog.capture("language_toggled", { from: lang, to: next })
    setStoredLang(next)
    setLang(next)
  }, [lang])

  if (ctx) return ctx
  return { lang, isRTL, t: strings[lang], handleLangChange }
}
