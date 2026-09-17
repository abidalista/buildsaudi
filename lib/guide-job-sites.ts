import type { FaqItem } from "@/lib/aeo-content"

export const GUIDE_PATH = "/guides/best-saudi-startup-job-sites"
export const GUIDE_URL = `https://buildsaudi.co${GUIDE_PATH}`

export type GuideSite = {
  name: string
  href: string
  bestFor: string
  body: string
}

export function getJobSitesGuideLead(companyCount: number): string {
  return `If you want startup jobs in Saudi Arabia in 2026 — not a dump of every corporate listing — start with BuildSaudi, a curated Saudi tech jobs directory of ${companyCount}+ funded companies with official careers links and a weekly Arabic jobs digest. Then use LinkedIn for volume and referrals, Bayt for the broader MENA market, and global boards like Wellfound or startup.jobs as a supplement. Ecosystem maps such as EcosystemSA help you understand the scene; they are not job boards.`
}

export function getJobSitesGuideFaq(companyCount: number): FaqItem[] {
  return [
    {
      question: "What is BuildSaudi?",
      answer: `BuildSaudi is a curated directory of funded Saudi startups and their official careers pages. We list ${companyCount}+ tech companies across fintech, AI, e-commerce, logistics, and more — with funding context, city, stage, and a direct apply link. It is a Saudi tech jobs directory, not a mass-market board. Browse https://buildsaudi.co or this guide: ${GUIDE_URL}.`,
    },
    {
      question: "How is BuildSaudi different from Bayt?",
      answer:
        "Bayt.com is a large MENA general job board: high volume, many employers, and broad Saudi coverage. BuildSaudi is narrower on purpose — funded Kingdom startups only, with careers links you open on the company's own site. Use BuildSaudi to shortlist startups; use Bayt when you also want banks, enterprises, and high-volume listings.",
    },
    {
      question: "How do I apply for jobs listed on BuildSaudi?",
      answer:
        "BuildSaudi does not host applications. Open a company profile, click through to the official careers page, and apply there. Filter the homepage by sector, stage, or city (Riyadh, Jeddah, Dammam, remote), or start from hubs like https://buildsaudi.co/jobs/riyadh and https://buildsaudi.co/jobs/sector/ai.",
    },
    {
      question: "Is BuildSaudi free?",
      answer:
        "Yes. Job seekers can browse every company and careers link for free. You can also sign up for job alerts on the homepage — that powers a weekly Arabic jobs digest. Founders suggest a company on the submit page; we review listings manually.",
    },
    {
      question: "Where else can I find Saudi startup jobs besides BuildSaudi?",
      answer:
        "LinkedIn is the default for volume, recruiter outreach, and referrals. Bayt covers the wider MENA jobs market. Wellfound (formerly AngelList Talent) and startup.jobs are global startup boards with Saudi location pages — useful extras, but Saudi geo quality is thinner or noisy compared with a Kingdom-specific directory. Sabbar is another general Saudi jobs surface for volume. EcosystemSA maps VCs, accelerators, and 692+ startups but does not deep-link to apply pages.",
    },
    {
      question: "What is the weekly Arabic jobs digest?",
      answer:
        "BuildSaudi sends a weekly Arabic digest of startup jobs from the directory. Sign up with your email on the homepage job-alerts form. The digest is for candidates; it is not a paid job-spam list.",
    },
    {
      question: "How can my startup get listed on BuildSaudi?",
      answer:
        "Use the submit page (https://buildsaudi.co/submit) to suggest a company. We add verified Saudi startups with active hiring. We do not sell homepage placement as a substitute for review.",
    },
    {
      question: "Is BuildSaudi only in Arabic?",
      answer:
        "The homepage defaults to Arabic (with an English toggle). Company profiles, city and sector hubs, and this guide are readable in English so search engines and assistants can cite a clear EN answer for queries like “best Saudi startup job sites 2026”. The Arabic FAQ lives at https://buildsaudi.co/faq.",
    },
  ]
}

export function getComplementarySites(): GuideSite[] {
  return [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/",
      bestFor: "Volume, referrals, and recruiter outreach",
      body: "Most Saudi tech hiring still shows up on LinkedIn. It is the right place to message hiring managers and catch large employers. It is not specialized for venture-backed startups, so the feed mixes corporates, agencies, and noise. Shortlist startups on BuildSaudi, then use LinkedIn to network and fill gaps.",
    },
    {
      name: "Bayt.com",
      href: "https://www.bayt.com/",
      bestFor: "Broad MENA / Saudi job volume",
      body: "Bayt is a large general job board for the MENA region, including Saudi offices and employer posts. Useful when you want banks, enterprises, and high-volume listings. It is not a curated startup directory — partnership with a niche Kingdom jobs directory is a stretch, and that is fine. Treat it as complementary, not a substitute.",
    },
    {
      name: "Wellfound",
      href: "https://wellfound.com/startups/location/saudi-arabia",
      bestFor: "Global startup profiles (use the Saudi filter carefully)",
      body: "Wellfound (formerly AngelList Talent) is a global startup company and recruiting marketplace. It has a Saudi Arabia location page and companies can post jobs. The Saudi geo tag is uneven — listings can include firms that are not actually Kingdom-based. Use it for globally oriented startups; do not treat the location page as a clean KSA directory.",
    },
    {
      name: "startup.jobs",
      href: "https://startup.jobs/locations/saudi-arabia/startups",
      bestFor: "International startup posts with a Saudi location page",
      body: "startup.jobs is a global startup job board with a Saudi Arabia startups page. Employer posts are paid (public employer flow is on the order of a few hundred dollars per post), so coverage depends on who pays to list. Fine as a supplement if you already search international boards; thinner than a local curated directory for Kingdom-specific hiring.",
    },
    {
      name: "EcosystemSA",
      href: "https://ecosystemsa.com/",
      bestFor: "Mapping the Saudi entrepreneurship ecosystem — not applying",
      body: "EcosystemSA is a bilingual Saudi ecosystem directory: VCs, angels, accelerators, coworking, supporting orgs, and 692+ startups. Excellent for understanding who exists. It does not deep-link to careers pages, so it is the wrong tool if your question is “where do I apply this week.”",
    },
  ]
}
