import type { Lang } from "@/lib/i18n"

export const LANG_STORAGE_KEY = "buildsaudi_lang"
export const LANG_COOKIE = "buildsaudi_lang"
export const DEFAULT_LANG: Lang = "ar"

function writeLangCookie(lang: Lang) {
  if (typeof document === "undefined") return
  try {
    document.cookie = `${LANG_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`
  } catch {
    // ignore cookie-blocked contexts
  }
}

export function getStoredLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY)
    const lang: Lang = v === "en" || v === "ar" ? v : DEFAULT_LANG
    writeLangCookie(lang)
    return lang
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
  writeLangCookie(lang)
}
