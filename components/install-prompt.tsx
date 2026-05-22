"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Share, SquarePlus, Check, Smartphone, Plus } from "lucide-react"

const DISMISS_KEY = "buildsaudi_install_dismissed"

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

const STEPS = [
  {
    num: 1,
    text: (
      <>
        Tap the <strong>Share</strong> button in your browser
      </>
    ),
    icon: Share,
  },
  {
    num: 2,
    text: (
      <>
        Scroll and tap <strong>Add to Home Screen</strong>
      </>
    ),
    icon: SquarePlus,
  },
  {
    num: 3,
    text: (
      <>
        Tap <strong>Add</strong> to confirm
      </>
    ),
    icon: Check,
  },
] as const

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

export function InstallPrompt() {
  const isMobile = useIsMobile()
  const [hidden, setHidden] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    if (isStandalone()) return
    if (localStorage.getItem(DISMISS_KEY)) return
    setHidden(false)
  }, [isMobile])

  const dismissForever = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, "1")
    setHidden(true)
    setOpen(false)
  }, [])

  if (!isMobile || hidden) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Add BuildSaudi to your home screen"
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
            className="relative w-full max-w-lg bg-white rounded-t-2xl shadow-2xl pb-[max(1rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-1">
              <span className="w-10 h-1 rounded-full bg-gray-300" aria-hidden />
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 end-4 text-gray-500 hover:text-gray-800 p-1"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="px-5 pb-5 pt-2">
              <h2
                id="install-prompt-title"
                className="text-xl font-bold text-[#111827] pe-8"
              >
                Add BuildSaudi to your home screen
              </h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Get faster access to Saudi startup jobs and company search — right
                from your home screen.
              </p>

              <ol className="mt-5 space-y-3 list-none p-0 m-0">
                {STEPS.map(({ num, text, icon: Icon }) => (
                  <li
                    key={num}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#F5F0E6]/60 p-4"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#06634D] text-sm font-bold text-white">
                      {num}
                    </span>
                    <p className="flex-1 text-sm text-[#111827] leading-snug">
                      {text}
                    </p>
                    <Icon
                      className="size-5 shrink-0 text-[#06634D]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </li>
                ))}
              </ol>

              <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                Use your browser&apos;s share or menu options to add this page to
                your home screen.
              </p>

              <button
                type="button"
                onClick={dismissForever}
                className="mt-4 text-sm text-[#D73833] underline underline-offset-2 hover:text-[#B82E2A]"
              >
                Never show again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
