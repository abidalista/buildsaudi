import type { Lang } from "@/lib/i18n"

export const LANG_STORAGE_KEY = "buildsaudi_lang"
export const DEFAULT_LANG: Lang = "ar"

export function getStoredLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY)
    return v === "en" || v === "ar" ? v : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

export function setStoredLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
  } catch {
    // ignore quota / private mode
  }
}
