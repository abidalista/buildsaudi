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
const PIF_HUMAIN =
  "https://www.pif.gov.sa/en/news-and-insights/press-releases/2025/hrh-crown-prince-launches-humain-as-global-ai-powerhouse/"
const SALLA_JOBS = "https://jobs.salla.com/"
const UNIFONIC_ABOUT = "https://www.unifonic.com/en/about"
const UNIFONIC_B =
  "https://www.unifonic.com/en/resources/series-b-announcements-125-million"
const SARY_C = "https://blog.sary.com/en/posts/sary-series-c-eng.html"
const SARY_B =
  "https://blog.sary.com/en/posts/sary-raises-30-5-million-series-b-led-by-venturesouq-to-disrupt-wholesale-in-mena.html"
const COGNNA_A = "https://www.cognna.com/blog/series-a-funding-cybersecurity"
const MOZN_A =
  "https://www.mozn.ai/blog/mozn-raises-10-million-series-a-to-scale-saas-ai-across-mena"
const MOZN_HUMAIN =
  "https://www.mozn.ai/blog/humain-invests-in-mozn-enterprise-ai-partnership"
const LUCIDYA_B =
  "https://www.lucidya.com/news-media/lucidya-30m-ai-funding-round-mena"
const LUCIDYA_INV = "https://www.lucidya.com/investors/"
const LUCIDYA_STORY = "https://www.lucidya.com/our-company/our-story"
const HALA_ABOUT = "https://hala.com/en/about-us/"
const GATHERN_B =
  "https://blog.gathern.co/en/gathern-closes-sar-270-million-series-b-funding-round-led-by-sanabil-investments-valuing-the-company-at-over-sar-1-billion-in-preparation-for-saudi-stock-market-listing/"
const RASAN_PRICE = "https://www.rasan.co/_assets/pdf/Rasan-Final-Offer-Price-EN.pdf"
const RASAN_ITF =
  "https://www.rasan.co/_assets/pdf/Rasan-ITF-Announcement-EN-050524.pdf"
const RASAN_IPO = "https://www.rasan.co/en/investor-relations/ipo"
const CLASSERA_PR =
  "https://www.prnewswire.com/news-releases/classera-closes-one-of-the-largest-edtech-series-a-globally--a-40m-round-led-by-sanabil-301661145.html"
const ERAD_A =
  "https://ksa.erad.co/en/blog/erad-raises-22-million-series-a-led-by-mevp"
const ERAD_PRE =
  "https://www.erad.co/post/erad-raises-16m-preseries-a-and-launches-operations-in-saudi-arabia"
const ERAD_SEED = "https://www.erad.co/post/erad-raises-2-4-million-pre-seed-round"
const SIFI_A =
  "https://www.sifi.app/en/resources/news/simplified-financial-solutions-company-secures-dollar20m-series-a-to-scale-saudi-arabias-leading-spend-management-platform/"
const SIFI_SEED =
  "https://www.sifi.app/en/resources/blog/sifi-closes-10m-seed-funding/"
const WAKECAP_TEAM = "https://www.wakecap.com/team"
const NABT_ABOUT = "https://nabt.app/en/about/nabt-intl"

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
  humain: {
    slug: "humain",
    lastChecked: CHECKED,
    summary:
      "HUMAIN is a Riyadh full-stack AI company owned by the Public Investment Fund. PIF launched it in May 2025 to operate across AI infrastructure, cloud, models, and applications.",
    funding: [
      {
        text: "PIF announced the launch of HUMAIN on 12 May 2025 as a PIF-owned company, not as a priced venture round. We have not verified a public equity raise amount on HUMAIN or PIF pages.",
        sourceLabel: "PIF HUMAIN launch release, 12 May 2025",
        sourceUrl: PIF_HUMAIN,
      },
    ],
    investors: [
      {
        text: "HUMAIN is owned by the Public Investment Fund. Mozn's 3 Aug 2026 note also calls HUMAIN a PIF company.",
        sourceLabel: "PIF HUMAIN launch release, 12 May 2025",
        sourceUrl: PIF_HUMAIN,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف هيومين؟",
        answer:
          "على BuildSaudi تقدر تشوف صفحة هيومين ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. قدّم من موقع هيومين. الصفحة: https://buildsaudi.co/company/humain",
      },
      {
        question: "How do I apply to HUMAIN jobs?",
        answer:
          "Open the HUMAIN page on BuildSaudi for the official careers link we last checked on 2026-10-03. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/humain",
      },
      {
        question: "How much funding has HUMAIN raised?",
        answer:
          "PIF's 12 May 2025 launch note said HUMAIN is PIF-owned. We have not verified a public venture-round amount on HUMAIN or PIF pages. Source: pif.gov.sa HUMAIN launch release.",
      },
    ],
  },
  salla: {
    slug: "salla",
    lastChecked: CHECKED,
    summary:
      "Salla is an Arabic e-commerce store builder founded in 2016 in Makkah by Nawaf Hariri and Salman Butt.",
    founders: {
      text: "Nawaf Hariri (co-founder and CEO) and Salman Butt.",
      sourceLabel: "Salla careers page",
      sourceUrl: SALLA_JOBS,
    },
    funding: [],
    investors: [],
    faq: [
      {
        question: "وين ألاقي وظائف سلة؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة Workable الرسمية لسلة مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع سلة. الصفحة: https://buildsaudi.co/company/salla",
      },
      {
        question: "How do I apply to Salla jobs?",
        answer:
          "Open the Salla page on BuildSaudi for the current Workable roles we last checked on 2026-10-03, then apply on Salla's official board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/salla",
      },
      {
        question: "How much funding has Salla raised?",
        answer:
          "We have not verified a funding amount on a Salla page we could fetch. Do not treat directory totals as a cited round. Profile: https://buildsaudi.co/company/salla",
      },
    ],
  },
  unifonic: {
    slug: "unifonic",
    lastChecked: CHECKED,
    summary:
      "Unifonic is a Riyadh customer engagement platform (CPaaS and AI-native CX) founded in 2006. It connects messaging, voice, and conversational AI for enterprises in MENA.",
    founders: {
      text: "Ahmed Hamdan (CEO and co-founder) and Hassan Hamdan (co-founder).",
      sourceLabel: "Unifonic About page",
      sourceUrl: UNIFONIC_ABOUT,
    },
    funding: [
      {
        text: "Series B: $125M on 15 Sep 2021, led by SoftBank Vision Fund 2 and Sanabil Investments. Unifonic called it a Series B record for Middle East technology startups at the time.",
        sourceLabel: "Unifonic Series B announcement, 15 Sep 2021",
        sourceUrl: UNIFONIC_B,
      },
      {
        text: "Unifonic's About page says it raised $21M in 2018, and lists $140M+ raised in total. We have not verified a later priced equity round on Unifonic's site.",
        sourceLabel: "Unifonic About page",
        sourceUrl: UNIFONIC_ABOUT,
      },
    ],
    investors: [
      {
        text: "Series B was led by SoftBank Vision Fund 2 and Sanabil Investments. Unifonic said this was SoftBank's first direct investment in a Saudi-based company.",
        sourceLabel: "Unifonic Series B announcement, 15 Sep 2021",
        sourceUrl: UNIFONIC_B,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف يونيفونيك؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة التوظيف الرسمية ليونيفونيك مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع يونيفونيك. الصفحة: https://buildsaudi.co/company/unifonic",
      },
      {
        question: "How do I apply to Unifonic jobs?",
        answer:
          "Open the Unifonic page on BuildSaudi for the current official roles we last checked on 2026-10-03, then apply on Unifonic's board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/unifonic",
      },
      {
        question: "How much funding has Unifonic raised?",
        answer:
          "Unifonic's 15 Sep 2021 announcement said a $125M Series B led by SoftBank Vision Fund 2 and Sanabil. Its About page lists $21M in 2018 and $140M+ in total. We have not verified a later priced equity round on Unifonic's site.",
      },
    ],
  },
  sary: {
    slug: "sary",
    lastChecked: CHECKED,
    summary:
      "Sary is a Riyadh B2B wholesale marketplace connecting MSMEs with wholesalers and brands. It was founded in April 2018.",
    founders: {
      text: "Mohammed Aldossary (co-founder and CEO) and Khaled Alsiari.",
      sourceLabel: "Sary Series B announcement, 6 Apr 2021",
      sourceUrl: SARY_B,
    },
    funding: [
      {
        text: "Series C: $75M on 19 Dec 2021, led by Sanabil Investments. Sary said total funding was $112 million as of that date.",
        sourceLabel: "Sary Series C announcement, 19 Dec 2021",
        sourceUrl: SARY_C,
      },
      {
        text: "Series B: $30.5M announced 6 Apr 2021 (post dated 6 May 2021), led by VentureSouq.",
        sourceLabel: "Sary Series B announcement, 6 Apr 2021",
        sourceUrl: SARY_B,
      },
    ],
    investors: [
      {
        text: "Series C led by Sanabil Investments, with Wafra International Investment Company and Endeavor Catalyst, plus existing investors STV, MSA Capital, Rocketship.vc, VentureSouq, and Ra'ed Ventures.",
        sourceLabel: "Sary Series C announcement, 19 Dec 2021",
        sourceUrl: SARY_C,
      },
      {
        text: "Series B led by VentureSouq, with STV, Rocketship.vc, Ra'ed Ventures, MSA Capital, and Derayah VC.",
        sourceLabel: "Sary Series B announcement, 6 Apr 2021",
        sourceUrl: SARY_B,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف ساري؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة ساري ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع ساري. الصفحة: https://buildsaudi.co/company/sary",
      },
      {
        question: "How do I apply to Sary jobs?",
        answer:
          "Open the Sary page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/sary",
      },
      {
        question: "How much funding has Sary raised?",
        answer:
          "Sary's 19 Dec 2021 announcement said a $75M Series C and $112M total as of that date, after a $30.5M Series B in 2021. We have not verified a later standalone Sary equity total on Sary's blog. Source: blog.sary.com Series C post.",
      },
    ],
  },
  cognna: {
    slug: "cognna",
    lastChecked: CHECKED,
    summary:
      "COGNNA is a Riyadh AI security-operations company. Its Nexus platform is an agentic AI SOC for threat detection and managed security.",
    funding: [
      {
        text: "Series A: $9.2M announced 2 Dec 2025 during Black Hat MEA 2025, led by Impact46 and co-led by BNVT Capital.",
        sourceLabel: "COGNNA Series A announcement, 2 Dec 2025",
        sourceUrl: COGNNA_A,
      },
    ],
    investors: [
      {
        text: "Series A led by Impact46, co-led by BNVT Capital, with Vision Ventures and tali ventures.",
        sourceLabel: "COGNNA Series A announcement, 2 Dec 2025",
        sourceUrl: COGNNA_A,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف Cognna؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة Cognna ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع Cognna. الصفحة: https://buildsaudi.co/company/cognna",
      },
      {
        question: "How do I apply to Cognna jobs?",
        answer:
          "Open the Cognna page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/cognna",
      },
      {
        question: "How much funding has Cognna raised?",
        answer:
          "COGNNA's 2 Dec 2025 announcement said a $9.2M Series A led by Impact46 and co-led by BNVT Capital. We have not verified a later round on Cognna's site. Source: cognna.com/blog/series-a-funding-cybersecurity",
      },
    ],
  },
  mozn: {
    slug: "mozn",
    lastChecked: CHECKED,
    summary:
      "Mozn is a Riyadh enterprise AI company for Arabic NLU, fraud, and decision intelligence. It was founded in 2017.",
    founders: {
      text: "Dr. Mohammed Alhussein and Dr. Khalid Al-Ghonaim, later joined by co-founders Abdullah Alsaeed and Malik Alyousef.",
      sourceLabel: "Mozn Series A announcement, 10 Feb 2023",
      sourceUrl: MOZN_A,
    },
    funding: [
      {
        text: "Series A: $10M on 10 Feb 2023, led by Raed Ventures, with Shorooq Partners, VentureSouq, Sukna Ventures, and other investors.",
        sourceLabel: "Mozn Series A announcement, 10 Feb 2023",
        sourceUrl: MOZN_A,
      },
      {
        text: "On 3 Aug 2026 Mozn said HUMAIN made a strategic investment in Mozn. The post does not state a dollar amount.",
        sourceLabel: "Mozn HUMAIN investment note, 3 Aug 2026",
        sourceUrl: MOZN_HUMAIN,
      },
    ],
    investors: [
      {
        text: "Series A led by Raed Ventures, with Shorooq Partners, VentureSouq, Sukna Ventures, and other investors.",
        sourceLabel: "Mozn Series A announcement, 10 Feb 2023",
        sourceUrl: MOZN_A,
      },
      {
        text: "HUMAIN (a PIF company) announced a strategic investment in Mozn on 3 Aug 2026. Amount not disclosed on that page.",
        sourceLabel: "Mozn HUMAIN investment note, 3 Aug 2026",
        sourceUrl: MOZN_HUMAIN,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف مزن؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة مزن ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع مزن. الصفحة: https://buildsaudi.co/company/mozn",
      },
      {
        question: "How do I apply to Mozn jobs?",
        answer:
          "Open the Mozn page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/mozn",
      },
      {
        question: "How much funding has Mozn raised?",
        answer:
          "Mozn's 10 Feb 2023 announcement said a $10M Series A led by Raed Ventures. A 3 Aug 2026 Mozn note said HUMAIN made a strategic investment without stating an amount. Source: mozn.ai Series A post.",
      },
    ],
  },
  lucidya: {
    slug: "lucidya",
    lastChecked: CHECKED,
    summary:
      "Lucidya is an AI customer experience platform. It was founded in Jeddah in 2016 and is listed on BuildSaudi with a Riyadh profile.",
    founders: {
      text: "Abdullah Asiri (CEO and founder) and Dr. Zuhair Khayyat (CTO and co-founder). Lucidya's Series B page also names Hatem Kameli as a co-founder.",
      sourceLabel: "Lucidya Our Story and Series B announcement",
      sourceUrl: LUCIDYA_STORY,
    },
    funding: [
      {
        text: "Series B: $30M, which Lucidya called the largest AI funding round in MENA. Lucidya's investors page lists this under 2025.",
        sourceLabel: "Lucidya Series B announcement",
        sourceUrl: LUCIDYA_B,
      },
      {
        text: "Investors page milestones: $1.1M in 2019 (Monsha'at, Abunayyan Holding, and regional partners) and $6M in 2020 (Rua Growth Fund, M.A.L Ventures, Al Rashed Group, Venture Souq, and others). The same page says $37 million in venture funding secured.",
        sourceLabel: "Lucidya investors page",
        sourceUrl: LUCIDYA_INV,
      },
    ],
    investors: [
      {
        text: "Series B led by Impact46, with Wa'ed Ventures, Takamol Ventures, SparkLabs, Rua Growth Fund, and ARG.",
        sourceLabel: "Lucidya Series B announcement",
        sourceUrl: LUCIDYA_B,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف لوسيديا؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة Workable الرسمية للوسيديا مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع لوسيديا. الصفحة: https://buildsaudi.co/company/lucidya",
      },
      {
        question: "How do I apply to Lucidya jobs?",
        answer:
          "Open the Lucidya page on BuildSaudi for the current Workable roles we last checked on 2026-10-03, then apply on Lucidya's official board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/lucidya",
      },
      {
        question: "Does Lucidya hire software engineers?",
        answer:
          "Yes, when those roles are on the live board. Our last jobs check (2026-10-03) included engineering roles such as 10x Software Engineer, Frontend Software Engineer, and Site Reliability Engineer, plus product and sales. Apply via https://buildsaudi.co/company/lucidya",
      },
      {
        question: "How much funding has Lucidya raised?",
        answer:
          "Lucidya's Series B page said $30M, and its investors page lists $37 million in venture funding including 2019 and 2020 milestones. We have not verified a later round on Lucidya's site. Source: lucidya.com/investors/",
      },
    ],
  },
  hala: {
    slug: "hala",
    lastChecked: CHECKED,
    summary:
      "HALA is a Riyadh SME financial platform for payments, POS, and financing. It is licensed by SAMA as an EMI and holds a SAMA debt-based crowdfunding license.",
    founders: {
      text: "Esam Alnahdi (co-founder and chairman) and Maher Loubieh (co-founder and board member).",
      sourceLabel: "HALA About page",
      sourceUrl: HALA_ABOUT,
    },
    funding: [
      {
        text: "HALA's About timeline lists a $157M Series B in 2025. The page does not name a lead investor or a later equity round.",
        sourceLabel: "HALA About page",
        sourceUrl: HALA_ABOUT,
      },
    ],
    investors: [],
    faq: [
      {
        question: "وين ألاقي وظائف هلا؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة Greenhouse الرسمية لهلا مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع هلا. الصفحة: https://buildsaudi.co/company/hala",
      },
      {
        question: "How do I apply to HALA jobs?",
        answer:
          "Open the HALA page on BuildSaudi for the current Greenhouse roles we last checked on 2026-10-03, then apply on HALA's official board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/hala",
      },
      {
        question: "How much funding has HALA raised?",
        answer:
          "HALA's About page lists a $157M Series B in 2025. It does not name the lead investor on that page. We have not verified a later equity round there. Source: hala.com/en/about-us/",
      },
    ],
  },
  gathern: {
    slug: "gathern",
    lastChecked: CHECKED,
    summary:
      "Gathern is a Saudi vacation-rental and alternative hospitality marketplace. Guests book private homes hosted by local residents across the Kingdom.",
    funding: [
      {
        text: "Series B: SAR 270 million announced 20 Aug 2025, led by Sanabil Investments, at a valuation of over SAR 1 billion. Gathern said it is preparing for a Tadawul listing.",
        sourceLabel: "Gathern Series B announcement, 20 Aug 2025",
        sourceUrl: GATHERN_B,
      },
    ],
    investors: [
      {
        text: "Series B led by Sanabil Investments, wholly owned by PIF, with participation from several strategic investors who were not named on that post.",
        sourceLabel: "Gathern Series B announcement, 20 Aug 2025",
        sourceUrl: GATHERN_B,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف جاذر إن؟",
        answer:
          "على BuildSaudi تقدر تشوف الوظائف الحالية من لوحة Workable الرسمية لجاذر إن مع رابط تقديم مباشر. آخر فحص للقائمة: 2026-10-03. قدّم من موقع جاذر إن. الصفحة: https://buildsaudi.co/company/gathern",
      },
      {
        question: "How do I apply to Gathern jobs?",
        answer:
          "Open the Gathern page on BuildSaudi for the current Workable roles we last checked on 2026-10-03, then apply on Gathern's official board. BuildSaudi does not process applications. Profile: https://buildsaudi.co/company/gathern",
      },
      {
        question: "How much funding has Gathern raised?",
        answer:
          "Gathern's 20 Aug 2025 post said a SAR 270 million Series B led by Sanabil at a valuation over SAR 1 billion. We have not verified a later round on Gathern's blog. Source: blog.gathern.co Series B post.",
      },
    ],
  },
  rasan: {
    slug: "rasan",
    lastChecked: CHECKED,
    summary:
      "Rasan Information Technology is a Riyadh fintech and insurtech company. It listed on the Saudi Exchange Main Market in 2024.",
    funding: [
      {
        text: "IPO: on 19 May 2024 Rasan set the final offer price at SAR 37 per share, implying a SAR 2.8 billion (USD 747 million) market capitalization at listing.",
        sourceLabel: "Rasan final offer price announcement, 19 May 2024",
        sourceUrl: RASAN_PRICE,
      },
      {
        text: "The offering was 22,740,000 ordinary shares, 30% of share capital after the capital increase, mixing sale shares and 5,300,000 new shares.",
        sourceLabel: "Rasan IPO intention announcement, 5 May 2024",
        sourceUrl: RASAN_ITF,
      },
    ],
    investors: [
      {
        text: "After the IPO, Rasan's shares trade on the Saudi Exchange Main Market. We have not verified a named pre-IPO venture round on Rasan's IR pages.",
        sourceLabel: "Rasan IPO IR page",
        sourceUrl: RASAN_IPO,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف رسن؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة رسن ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع رسن. الصفحة: https://buildsaudi.co/company/rasan",
      },
      {
        question: "How do I apply to Rasan jobs?",
        answer:
          "Open the Rasan page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/rasan",
      },
      {
        question: "How much funding has Rasan raised?",
        answer:
          "Rasan's 19 May 2024 IPO note priced the offering at SAR 37 per share and a SAR 2.8 billion market cap at listing. We have not verified a named pre-IPO venture total on Rasan IR pages. Source: rasan.co final offer price PDF.",
      },
    ],
  },
  classera: {
    slug: "classera",
    lastChecked: CHECKED,
    summary:
      "Classera is an e-learning company focused on emerging markets. Its Learning Super Platform combines LMS, school ERP, and related tools.",
    founders: {
      text: "Mohammad Almadani (CEO and co-founder) and Mohammad Alashmawi.",
      sourceLabel: "Classera Series A press release, 27 Oct 2022",
      sourceUrl: CLASSERA_PR,
    },
    funding: [
      {
        text: "Series A: $40M on 27 Oct 2022. Classera called it the largest EdTech Series A globally for a company with no prior funding.",
        sourceLabel: "Classera Series A press release, 27 Oct 2022",
        sourceUrl: CLASSERA_PR,
      },
    ],
    investors: [
      {
        text: "Series A led by Sanabil Investments, with Global Ventures, Endeavor Catalyst, 500 Global, Sukna Venture, and Seedra Ventures.",
        sourceLabel: "Classera Series A press release, 27 Oct 2022",
        sourceUrl: CLASSERA_PR,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف كلاسيرا؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة كلاسيرا ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع كلاسيرا. الصفحة: https://buildsaudi.co/company/classera",
      },
      {
        question: "How do I apply to Classera jobs?",
        answer:
          "Open the Classera page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/classera",
      },
      {
        question: "How much funding has Classera raised?",
        answer:
          "Classera's 27 Oct 2022 release said a $40M Series A led by Sanabil, with no prior funding. We have not verified a later round on Classera's news pages. Source: Classera PR Newswire release.",
      },
    ],
  },
  erad: {
    slug: "erad",
    lastChecked: CHECKED,
    summary:
      "erad is a Riyadh alternative financing platform that offers Shariah-compliant working capital to SMEs in Saudi Arabia and the UAE. Founded in 2022.",
    founders: {
      text: "Salem Abu-Hammour, Faris Yaghmour, Abdulmalik Almeheini, and Youssef Said.",
      sourceLabel: "erad Pre-Series A announcement, 30 Apr 2025",
      sourceUrl: ERAD_PRE,
    },
    funding: [
      {
        text: "Series A: $22 million (SAR 78.75 million) announced 28 Sep 2026, led by MEVP.",
        sourceLabel: "erad Series A announcement, 28 Sep 2026",
        sourceUrl: ERAD_A,
      },
      {
        text: "Pre-Series A: $16 million (SAR 60 million) on 30 Apr 2025.",
        sourceLabel: "erad Pre-Series A announcement, 30 Apr 2025",
        sourceUrl: ERAD_PRE,
      },
      {
        text: "Pre-seed: $2.4 million announced 9 Jan 2024.",
        sourceLabel: "erad pre-seed announcement, 9 Jan 2024",
        sourceUrl: ERAD_SEED,
      },
    ],
    investors: [
      {
        text: "Series A led by MEVP, with new investors 500 Global, SVC, S60 Ventures, ANB Capital, Conjunction Capital, and Araya Ventures, plus existing Khwarizmi Ventures, Nuwa Capital, Aljazira Capital, Oraseya Capital, and Joa Capital.",
        sourceLabel: "erad Series A announcement, 28 Sep 2026",
        sourceUrl: ERAD_A,
      },
      {
        text: "Pre-Series A named Y Combinator, Nuwa Capital, Khwarizmi Ventures, Aljazira Capital, VentureSouq, Oraseya Capital, and Joa Capital.",
        sourceLabel: "erad Pre-Series A announcement, 30 Apr 2025",
        sourceUrl: ERAD_PRE,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف erad؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة erad ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع erad. الصفحة: https://buildsaudi.co/company/erad",
      },
      {
        question: "How do I apply to erad jobs?",
        answer:
          "Open the erad page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/erad",
      },
      {
        question: "How much funding has erad raised?",
        answer:
          "erad's 28 Sep 2026 announcement said a $22M Series A led by MEVP, after a $16M Pre-Series A on 30 Apr 2025 and a $2.4M pre-seed on 9 Jan 2024. Source: ksa.erad.co Series A post.",
      },
    ],
  },
  sifi: {
    slug: "sifi",
    lastChecked: CHECKED,
    summary:
      "SiFi (Simplified Financial Solutions) is a Riyadh spend-management platform: corporate cards, expenses, and vendor payments. Founded in 2021. Its Saudi affiliate holds a SAMA EMI license.",
    founders: {
      text: "H.E. Ahmed Alhakbani (co-founder and CEO).",
      sourceLabel: "SiFi Series A announcement, 9 Feb 2026",
      sourceUrl: SIFI_A,
    },
    funding: [
      {
        text: "Series A: $20M on 9 Feb 2026, led by Ra'ed Ventures. SiFi said this brought total funding to over $34 million.",
        sourceLabel: "SiFi Series A announcement, 9 Feb 2026",
        sourceUrl: SIFI_A,
      },
      {
        text: "Seed: $10M announced 30 May 2024, led by Sanabil Investments and RAED Ventures.",
        sourceLabel: "SiFi seed announcement, 30 May 2024",
        sourceUrl: SIFI_SEED,
      },
    ],
    investors: [
      {
        text: "Series A led by Ra'ed Ventures, with QED Investors, Breyer Capital, MEVP, and existing backers Sanabil Investments, Khawarizmi Ventures, SEEDRA Ventures, Rua Growth Fund, anb capital, and Tech Invest Com.",
        sourceLabel: "SiFi Series A announcement, 9 Feb 2026",
        sourceUrl: SIFI_A,
      },
      {
        text: "Seed also named anb seed, Rua Ventures, Byld, KBW Ventures, Khwarizmi Ventures, Seedra Ventures, and Tech Invest Com.",
        sourceLabel: "SiFi seed announcement, 30 May 2024",
        sourceUrl: SIFI_SEED,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف سيفاي؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة سيفاي ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع سيفاي. الصفحة: https://buildsaudi.co/company/sifi",
      },
      {
        question: "How do I apply to SiFi jobs?",
        answer:
          "Open the SiFi page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/sifi",
      },
      {
        question: "How much funding has SiFi raised?",
        answer:
          "SiFi's 9 Feb 2026 announcement said a $20M Series A led by Ra'ed Ventures and total funding over $34M, after a $10M seed on 30 May 2024. Source: sifi.app Series A post.",
      },
    ],
  },
  governata: {
    slug: "governata",
    lastChecked: CHECKED,
    summary:
      "Governata is a Riyadh data-governance and data-management company. Its About page says the company was established in Riyadh in 2024.",
    funding: [],
    investors: [],
    faq: [
      {
        question: "وين ألاقي وظائف Governata؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة Governata ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع Governata. الصفحة: https://buildsaudi.co/company/governata",
      },
      {
        question: "How do I apply to Governata jobs?",
        answer:
          "Open the Governata page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/governata",
      },
      {
        question: "How much funding has Governata raised?",
        answer:
          "We have not verified a funding amount on a Governata page we could fetch. Third-party headlines are not cited here. Profile: https://buildsaudi.co/company/governata",
      },
    ],
  },
  wakecap: {
    slug: "wakecap",
    lastChecked: CHECKED,
    summary:
      "WakeCap builds construction workforce and site intelligence: connected hard hats, equipment, and an owner dashboard. The team page names Saudi giga-scale construction as the core market.",
    founders: {
      text: "Hassan Albalawi (founder and CEO) and Ishita Sood Kochhar (co-founder and COO).",
      sourceLabel: "WakeCap team page",
      sourceUrl: WAKECAP_TEAM,
    },
    funding: [],
    investors: [],
    faq: [
      {
        question: "وين ألاقي وظائف ويك كاب؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة ويك كاب ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع ويك كاب. الصفحة: https://buildsaudi.co/company/wakecap",
      },
      {
        question: "How do I apply to WakeCap jobs?",
        answer:
          "Open the WakeCap page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/wakecap",
      },
      {
        question: "How much funding has WakeCap raised?",
        answer:
          "WakeCap's team page names the founders. We have not verified a funding amount or investor list on wakecap.com. Profile: https://buildsaudi.co/company/wakecap",
      },
    ],
  },
  nabt: {
    slug: "nabt",
    lastChecked: CHECKED,
    summary:
      "Nabt is a Saudi fresh-produce marketplace and intelligence platform connecting farms, buyers, and policymakers.",
    funding: [],
    investors: [
      {
        text: "Nabt's about page names Merak Capital as an investment partner. It does not state a round size.",
        sourceLabel: "Nabt International about page",
        sourceUrl: NABT_ABOUT,
      },
    ],
    faq: [
      {
        question: "وين ألاقي وظائف نبت؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة نبت ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع نبت. الصفحة: https://buildsaudi.co/company/nabt",
      },
      {
        question: "How do I apply to Nabt jobs?",
        answer:
          "Open the Nabt page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/nabt",
      },
      {
        question: "How much funding has Nabt raised?",
        answer:
          "Nabt's about page names Merak Capital as an investment partner and does not state a round size. We have not verified another amount on nabt.app. Source: nabt.app/en/about/nabt-intl",
      },
    ],
  },
  "deep-sa": {
    slug: "deep-sa",
    lastChecked: CHECKED,
    summary:
      "DEEP.SA builds AI engines and agents for the Saudi landscape, local data, and government, including Arabic document tools hosted in the Kingdom.",
    funding: [],
    investors: [],
    faq: [
      {
        question: "وين ألاقي وظائف DEEP.SA؟",
        answer:
          "على BuildSaudi تقدر تفتح صفحة DEEP.SA ورابط التوظيف الرسمي. آخر فحص: 2026-10-03. ما عندنا وظائف فردية حالية في ملف الوظائف. قدّم من موقع DEEP.SA. الصفحة: https://buildsaudi.co/company/deep-sa",
      },
      {
        question: "How do I apply to DEEP.SA jobs?",
        answer:
          "Open the DEEP.SA page on BuildSaudi for the official careers link we last checked on 2026-10-03. We do not have live individual openings in the current jobs file. Profile: https://buildsaudi.co/company/deep-sa",
      },
      {
        question: "How much funding has DEEP.SA raised?",
        answer:
          "DEEP.SA's about page describes the product and mission. We have not verified a funding amount or investor list on deep.sa. Profile: https://buildsaudi.co/company/deep-sa",
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
