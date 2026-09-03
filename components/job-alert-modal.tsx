"use client"

import { useState } from "react"
import posthog from "posthog-js"
import { Search, X } from "lucide-react"
import { strings, type Lang } from "@/lib/i18n"

export function JobAlertModal({
  open,
  lang,
  onClose,
}: {
  open: boolean
  lang: Lang
  onClose: (method: "close" | "backdrop" | "success") => void
}) {
  const t = strings[lang]
  const [form, setForm] = useState({ name: "", title: "", email: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.title.trim() || !form.email.trim()) return
    setStatus("submitting")
    try {
      const res = await fetch("/api/job-seeker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        posthog.capture("job_seeker_signup", { name: form.name, title: form.title, source: "jobs_board" })
        setStatus("success")
        setTimeout(() => {
          setForm({ name: "", title: "", email: "" })
          setStatus("idle")
          onClose("success")
        }, 1800)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={() => onClose("backdrop")}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose("close")}
          className="absolute top-4 end-4 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        <div className="flex flex-col items-center mb-5">
          <div className="w-12 h-12 rounded-full bg-[#D73833]/10 flex items-center justify-center mb-3">
            <Search className="size-6 text-[#D73833]" />
          </div>
          <h3 className="text-lg font-bold text-[#111827] text-center px-4">{t.searchJobsTitle}</h3>
        </div>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-700">{t.jobAlertSuccess}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                {t.name} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={lang === "ar" ? "اسمك الكامل" : "Your full name"}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D73833] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                {t.title} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={lang === "ar" ? "مثال: مهندس برمجيات" : "e.g., Software Engineer"}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D73833] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                {t.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D73833] focus:border-transparent"
              />
            </div>
            {status === "error" && <p className="text-sm text-red-600">{t.jobAlertError}</p>}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-2.5 bg-[#D73833] text-white font-semibold text-sm rounded-lg hover:bg-[#B82E2A] disabled:opacity-50 transition-colors"
            >
              {status === "submitting" ? t.submitting : t.jobAlertSubmit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
