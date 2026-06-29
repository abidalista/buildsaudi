"use client"

import { useState, useEffect, useCallback } from "react"
import posthog from "posthog-js"
import { X, Share, SquarePlus, Check, Smartphone, Plus } from "lucide-react"
import { strings, type Lang } from "@/lib/i18n"

const DISMISS_KEY = "buildsaudi_install_dismissed"

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return isMobile
}

function StepText({ parts }: { parts: readonly [string, string, string] }) {
  return (
    <>
      {parts[0]}
      <strong>{parts[1]}</strong>
      {parts[2]}
    </>
  )
}

export function InstallPrompt({ lang }: { lang: Lang }) {
  const t = strings[lang]
  const isMobile = useIsMobile()
  const [hidden, setHidden] = useState(true)
  const [open, setOpen] = useState(false)

  const steps = [
    { num: 1, text: t.installStep1, icon: Share },
    { num: 2, text: t.installStep2, icon: SquarePlus },
    { num: 3, text: t.installStep3, icon: Check },
  ] as const

  useEffect(() => {
    if (!isMobile) return
    if (isStandalone()) return
    if (localStorage.getItem(DISMISS_KEY)) return
    setHidden(false)
  }, [isMobile])

  const dismissForever = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, "1")
    posthog.capture("install_prompt_dismissed_forever")
    setHidden(true)
    setOpen(false)
  }, [])

  const handleOpen = useCallback(() => {
    posthog.capture("install_prompt_opened")
    setOpen(true)
  }, [])

  if (!isMobile || hidden) return null

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label={t.installAriaLabel}
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#06634D]/30 bg-white/80 text-[#06634D] hover:bg-[#06634D]/5 transition-colors"
      >
        <span className="relative">
          <Smartphone className="size-5" strokeWidth={1.75} />
          <span className="absolute -bottom-0.5 -end-0.5 flex size-3.5 items-center justify-center rounded-full bg-[#06634D] text-white">
            <Plus className="size-2.5" strokeWidth={3} />
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-labelledby="install-prompt-title"
            className="relative w-full max-w-lg bg-white rounded-t-2xl shadow-2xl pb-[max(1rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-1">
              <span className="w-10 h-1 rounded-full bg-gray-300" aria-hidden />
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 end-4 text-gray-500 hover:text-gray-800 p-1"
              aria-label={t.installClose}
            >
              <X className="size-5" />
            </button>

            <div className="px-5 pb-5 pt-2">
              <h2
                id="install-prompt-title"
                className="text-xl font-bold text-[#111827] pe-8"
              >
                {t.installTitle}
              </h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {t.installSubtitle}
              </p>

              <ol className="mt-5 space-y-3 list-none p-0 m-0">
                {steps.map(({ num, text, icon: Icon }) => (
                  <li
                    key={num}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#F5F0E6]/60 p-4"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#06634D] text-sm font-bold text-white">
                      {num}
                    </span>
                    <p className="flex-1 text-sm text-[#111827] leading-snug">
                      <StepText parts={text} />
                    </p>
                    <Icon
                      className="size-5 shrink-0 text-[#06634D]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </li>
                ))}
              </ol>

              <p className="mt-4 text-xs text-gray-500 leading-relaxed font-mono">
                {t.installFooterNote}
              </p>

              <button
                type="button"
                onClick={dismissForever}
                className="mt-4 text-sm text-[#D73833] underline underline-offset-2 hover:text-[#B82E2A]"
              >
                {t.installNeverAgain}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
