import Link from "next/link"

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="relative inline-block px-4 py-2 mb-4">
          <span className="absolute top-0 left-0 w-4 h-4 border-l-[3px] border-t-[3px] border-[#06634D]/30" />
          <span className="absolute top-0 right-0 w-4 h-4 border-r-[3px] border-t-[3px] border-[#06634D]/30" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-l-[3px] border-b-[3px] border-[#06634D]/30" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-r-[3px] border-b-[3px] border-[#06634D]/30" />
          <h1
            className="text-2xl font-bold text-[#06634D] tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            BUILDSAUDI
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-[#111827] mb-2 font-mono">Coming Soon</h2>
        <p className="text-sm text-[#6B7280] mb-6 font-mono">this page is under construction</p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-[#06634D] text-white text-sm font-mono rounded hover:bg-[#044D3B] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
