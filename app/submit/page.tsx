"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { filterOptions } from "@/lib/data"

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    jobTitle: "",
    location: "",
    jobType: "",
    description: "",
    applyUrl: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would POST to Airtable
    setSubmitted(true)
  }

  const updateField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="block">
              <h1 className="text-3xl font-bold tracking-tight text-[#1e3a5f]" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                {"["} BUILDSAUDI {"]"}
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[600px] px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a1a1a] mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to jobs
        </Link>

        <h2 className="text-2xl font-bold mb-2">Post a Job</h2>
        <p className="text-sm text-[#6b7280] mb-8">
          submit your open role and we&apos;ll review and publish within 24 hours.
        </p>

        {submitted ? (
          <div className="rounded-lg border border-[#e5e5e5] bg-white p-8 text-center">
            <CheckCircle2 className="mx-auto size-10 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">thanks, we got it</h3>
            <p className="text-sm text-[#6b7280]">
              we&apos;ll review your listing and publish within 24 hours.
            </p>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="mt-6 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
              >
                Back to jobs
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 space-y-5">
              {/* Company Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <Input
                  required
                  placeholder="e.g. Tamara"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Contact Email <span className="text-red-400">*</span>
                </label>
                <Input
                  required
                  type="email"
                  placeholder="hiring@company.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <Input
                  required
                  placeholder="e.g. Senior Backend Engineer"
                  value={form.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                />
              </div>

              {/* Location + Job Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <Select
                    value={form.location || undefined}
                    onValueChange={(v) => updateField("location", v)}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.city.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Job Type <span className="text-red-400">*</span>
                  </label>
                  <Select
                    value={form.jobType || undefined}
                    onValueChange={(v) => updateField("jobType", v)}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.jobType.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Job Description
                </label>
                <Textarea
                  placeholder="brief description of the role..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>

              {/* Apply URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Apply URL <span className="text-red-400">*</span>
                </label>
                <Input
                  required
                  type="url"
                  placeholder="https://apply.workable.com/your-company/..."
                  value={form.applyUrl}
                  onChange={(e) => updateField("applyUrl", e.target.value)}
                />
                <p className="mt-1 text-xs text-[#9ca3af]">
                  link to your ATS or application page
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#1e3a5f] hover:bg-[#162d4a] text-sm font-medium"
            >
              Submit for Review
            </Button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex items-center justify-between text-xs text-[#9ca3af]">
          <p>buildsaudi.co</p>
          <Link href="/" className="hover:text-[#1a1a1a]">
            Browse Jobs
          </Link>
        </div>
      </footer>
    </div>
  )
}
