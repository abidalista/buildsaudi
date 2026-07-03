import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#06634D]/15">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-3 py-6 text-xs text-[#6B7280] sm:px-6 lg:px-8">
        <Link href="/about" className="transition-colors hover:text-[#06634D]">
          About
        </Link>
        <span className="text-[#06634D]/25" aria-hidden>
          ·
        </span>
        <Link href="/faq" className="transition-colors hover:text-[#06634D]">
          FAQ
        </Link>
      </div>
    </footer>
  )
}
