import Link from "next/link"

const links = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/submit", label: "Submit" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#06634D]/15">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-3 py-6 text-xs text-[#6B7280] sm:px-6 lg:px-8">
        {links.map((link, i) => (
          <span key={link.href} className="inline-flex items-center gap-3">
            {i > 0 && (
              <span className="text-[#06634D]/25" aria-hidden>
                ·
              </span>
            )}
            <Link href={link.href} className="transition-colors hover:text-[#06634D]">
              {link.label}
            </Link>
          </span>
        ))}
        <span className="inline-flex items-center gap-3">
          <span className="text-[#06634D]/25" aria-hidden>
            ·
          </span>
          <a
            href="https://x.com/abidalista"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#06634D]"
          >
            X
          </a>
        </span>
      </div>
    </footer>
  )
}
