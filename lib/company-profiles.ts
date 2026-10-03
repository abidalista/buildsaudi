import type { FaqItem } from "./aeo-content"
import type { Job } from "./types"
import { extractJobCity } from "./job-classify"

export type CitedLine = {
  text: string
  sourceLabel: string
  sourceUrl: string
}

export type CompanyProfile = {
  slug: string
  lastChecked: string
  summary: string
  founders?: CitedLine
  funding: CitedLine[]
  investors: CitedLine[]
  faq: FaqItem[]
}

const CHECKED = "2026-10-03"

const TAMARA_C =
  "https://tamara.co/en-sa/blog-post/tamara-series-c"
const FOODICS_C =
  "https://www.foodics.com/press/saas-series-c-funding/"
const FOODICS_B =
  "https://www.foodics.com/press/startup-foodics-raises-us20-million-sar75mil-in-series-b-funding-round-led-by-sanabil-investments/"
const FOODICS_EG =
  "https://www.foodics.com/press/foodics-celebrates-3-years-in-egypt/"
const LEAN_B =
  "https://leantech.me/ksa/en/blog/lean-technologies-secures-67-5m-in-series-b-funding-led-by-general-catalyst-solidifying-its-position-as-the-leading-fintech-infrastructure-platform-in-the-middle-east"
const JIMCO_LEAN =
  "https://jimco.com/en/news/jimco-invests-in-fintech-lean-technologies-us-67-5m-series-b-round/"

export const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  tamara: {
    slug: "tamara",
    lastChecked: CHECKED,
    summary:
      "Tamara is a Riyadh fintech for shopping, payments, and banking in Saudi Arabia and the GCC. It started as buy-now-pay-later and holds a SAMA BNPL permit. Founded in late 2020.",
    founders: {
      text: "Abdulmajeed Alsukhan (co-founder and CEO), Turki Bin Zarah, and Abdulmohsen Al Babtain.",
      sourceLabel: "Tamara Series C announcement, 18 Dec 2023",
      sourceUrl: TAMARA_C,
    },
    funding: [
      {
        text: "Series C: $340M equity on 18 Dec 2023 at a $1B valuation. Tamara called this the first Saudi homegrown fintech unicorn.",
        sourceLabel: "Tamara Series C announcement, 18 Dec 2023",
        sourceUrl: TAMARA_C,
      },
      {
        text: "As of that announcement, Tamara said it had raised $500M in equity in total, plus more than $400M in debt, including a warehouse facility of up to $400M led by Goldman Sachs and Shorooq Partners.",
        sourceLabel: "Tamara Series C announcement, 18 Dec 2023",
        sourceUrl: TAMARA_C,
      },
    ],
    investors: [
      {
        text: "Series C was co-led by SNB Capital and Sanabil Investments, with Shorooq Partners, Pinnacle Capital, Impulse, and others. Existing investors named on the same page: Coatue, Endeavor Catalyst, and Checkout.com.",
        sourceLabel: "Tamara Series C announcement, 18 Dec 2023",
        sourceUrl: TAMARA_C,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف تمارا؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة Greenhouse الرسمية لتمارا مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع تمارا، BuildSaudi ما يستلم الطلبات. الصفحة: https://buildsaudi.co/company/tamara",
      },
      {
        question: "How do I apply to Tamara jobs in Saudi Arabia?",
        answer:
          "Open the Tamara page on BuildSaudi for the current Greenhouse roles we last checked on 2026-10-03, then apply on Tamara's official board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/tamara",
      },
      {
        question: "How much funding has Tamara raised?",
        answer:
          "Tamara's 18 Dec 2023 announcement said a $340M Series C at a $1B valuation, and $500M equity in total as of that date, plus more than $400M in debt. We have not verified a later equity round on Tamara's site. Source: https://tamara.co/en-sa/blog-post/tamara-series-c",
      },
    ],
  },
  foodics: {
    slug: "foodics",
    lastChecked: CHECKED,
    summary:
      "Foodics is a Riyadh restaurant management and payments company: cloud POS and RMS, plus Foodics Pay. It is licensed as a fintech by SAMA. Founded in 2014.",
    founders: {
      text: "Ahmad Al-Zaini (co-founder and CEO) and Mosab AlOthmani (co-founder and CTO).",
      sourceLabel: "Foodics Series B announcement, 1 Feb 2021",
      sourceUrl: FOODICS_B,
    },
    funding: [
      {
        text: "Series C: $170M on 20 Apr 2022, led by Prosus and Sanabil Investments. Foodics called it the largest SaaS Series C in MENA at the time.",
        sourceLabel: "Foodics Series C announcement, 20 Apr 2022",
        sourceUrl: FOODICS_C,
      },
      {
        text: "Series B: $20M (SAR 75M) on 1 Feb 2021, led by Sanabil Investments and co-led by STV.",
        sourceLabel: "Foodics Series B announcement, 1 Feb 2021",
        sourceUrl: FOODICS_B,
      },
      {
        text: "On 13 Sep 2023 Foodics said it had raised $198M across multiple series rounds, including the $170M Series C.",
        sourceLabel: "Foodics Egypt press note, 13 Sep 2023",
        sourceUrl: FOODICS_EG,
      },
    ],
    investors: [
      {
        text: "Series C investors named by Foodics: Prosus and Sanabil Investments (leads), Sequoia Capital India, STV, Endeavor Catalyst, and Vision Ventures.",
        sourceLabel: "Foodics Series C announcement, 20 Apr 2022",
        sourceUrl: FOODICS_C,
      },
      {
        text: "Series B also named Elm and Derayah alongside Sanabil, STV, and Endeavor Catalyst.",
        sourceLabel: "Foodics Series B announcement, 1 Feb 2021",
        sourceUrl: FOODICS_B,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف فودكس؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة Workable الرسمية لفودكس مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع فودكس. الصفحة: https://buildsaudi.co/company/foodics",
      },
      {
        question: "How do I apply to Foodics jobs in Saudi Arabia?",
        answer:
          "Open the Foodics page on BuildSaudi for the current Workable roles we last checked on 2026-10-03, then apply on Foodics' official board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/foodics",
      },
      {
        question: "Does Foodics hire software engineers?",
        answer:
          "Yes, when those roles are on the live board. Our last jobs check (2026-10-03) included engineering roles such as AI Engineer and Associate AI Quality Engineer, plus product, sales, and operations. Apply on the official Workable page via https://buildsaudi.co/company/foodics",
      },
      {
        question: "How much funding has Foodics raised?",
        answer:
          "Foodics announced a $170M Series C on 20 Apr 2022 and a $20M Series B on 1 Feb 2021. A 13 Sep 2023 Foodics note said $198M across multiple series rounds. We have not verified a later equity round on Foodics' press pages. Sources: foodics.com/press/saas-series-c-funding/",
      },
    ],
  },
  "lean-technologies": {
    slug: "lean-technologies",
    lastChecked: CHECKED,
    summary:
      "Lean Technologies is a Riyadh fintech infrastructure company for open banking data and account-to-account payments in MENA. Founded in 2019.",
    founders: {
      text: "Hisham Al-Falih (CEO and co-founder), Ashu Gupta, and Aditya Sarkar.",
      sourceLabel: "JIMCO Series B note, 19 Nov 2024 (Hisham also named CEO and co-founder on Lean's own post)",
      sourceUrl: JIMCO_LEAN,
    },
    funding: [
      {
        text: "Series B: $67.5M announced 11 Nov 2024, led by General Catalyst. Lean said this brought total funding to over $100M as of that date.",
        sourceLabel: "Lean Series B announcement, 11 Nov 2024",
        sourceUrl: LEAN_B,
      },
    ],
    investors: [
      {
        text: "Series B led by General Catalyst, with Bain Capital Ventures, Stanley Druckenmiller's Duquesne Family Office, Arbor Ventures, and JIMCO, among others.",
        sourceLabel: "Lean Series B announcement, 11 Nov 2024",
        sourceUrl: LEAN_B,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف Lean Technologies؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة Ashby الرسمية لـ Lean مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع Lean. الصفحة: https://buildsaudi.co/company/lean-technologies",
      },
      {
        question: "How do I apply to Lean Technologies jobs?",
        answer:
          "Open the Lean Technologies page on BuildSaudi for the current Ashby roles we last checked on 2026-10-03, then apply on Lean's official board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/lean-technologies",
      },
      {
        question: "How much funding has Lean Technologies raised?",
        answer:
          "Lean's 11 Nov 2024 announcement said a $67.5M Series B led by General Catalyst, and total funding over $100M as of that date. We have not verified a later round on Lean's site. Source: leantech.me Series B post.",
      },
    ],
  },
}

export function getCompanyProfile(slug: string): CompanyProfile | undefined {
  return COMPANY_PROFILES[slug]
}

const FUNCTION_COPY: Record<Job["function"], string> = {
  engineering: "engineering",
  product: "product",
  design: "design",
  sales: "sales",
  marketing: "marketing",
  operations: "operations",
  people: "people",
  finance: "finance",
  other: "other",
}

export function hiringNowCopy(name: string, jobs: Job[], scrapedAt: string): string {
  const seen = scrapedAt ? scrapedAt.slice(0, 10) : ""
  const stamp = seen ? ` (last seen ${seen})` : ""
  if (jobs.length === 0) {
    return `We do not have live individual openings for ${name} in the current jobs file${stamp}. Use the official careers link above.`
  }

  const functions = [...new Set(jobs.map((j) => FUNCTION_COPY[j.function]))]
  const cities = [
    ...new Set(jobs.map((j) => extractJobCity(j.location)).filter(Boolean)),
  ]
  const cityText = cities.length > 0 ? ` Cities on the board: ${cities.join(", ")}.` : ""
  return `${name} has ${jobs.length} opening${jobs.length === 1 ? "" : "s"} in our jobs file${stamp}. Teams on that board: ${functions.join(", ")}.${cityText}`
}
