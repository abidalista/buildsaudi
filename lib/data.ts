import { Company, Job } from "./types"

export const companies: Company[] = [
  // ===== AI Infrastructure =====
  { slug: "humain", name: "Humain", website: "https://humain.ai", linkedin: "https://www.linkedin.com/company/humainai", logo_url: "/logos/humain.svg", stage: "Growth", sector: ["AI Infrastructure"], city: "Riyadh", description: "PIF-backed AI investment company. $23B in partnerships with NVIDIA to build AI factories in KSA.", careers_url: "https://humain.ai" },
  { slug: "sdaia-hexagon", name: "SDAIA Hexagon", website: "https://hexagon.com", linkedin: "https://www.linkedin.com/company/hexagon", logo_url: "/logos/hexagon.png", stage: "Growth", sector: ["AI Infrastructure"], city: "Riyadh", description: "World's largest government Tier IV data center. 480MW facility in Riyadh.", careers_url: "https://hexagon.com/company/careers" },
  { slug: "infiniarc", name: "INFINIARC", website: "https://infiniarc.com", linkedin: "https://www.linkedin.com/company/infiniarc", logo_url: "/logos/infiniarc.svg", stage: "Growth", sector: ["AI Infrastructure"], city: "Riyadh", description: "100% Saudi. High-performance AI hardware, servers, and workstations. MOU with Intel.", careers_url: "https://infiniarc.com" },

  // ===== AI Research & LLMs =====
  { slug: "sdaia", name: "SDAIA", website: "https://sdaia.gov.sa", linkedin: "https://www.linkedin.com/company/sdikiaia", logo_url: "/logos/sdaia.png", stage: "Growth", sector: ["AI Research"], city: "Riyadh", description: "Saudi Data & AI Authority. Drives the national AI strategy and runs accelerator programs.", careers_url: "https://sdaia.gov.sa/en/SDAIA/Pages/Careers.aspx" },
  { slug: "allam", name: "Allam", website: "https://sdaia.gov.sa", linkedin: "https://www.linkedin.com/company/sdikiaia", logo_url: "/logos/allam.svg", stage: "Growth", sector: ["AI Research"], city: "Riyadh", description: "SDAIA's Arabic large language model. Saudi's answer to GPT — the best Arabic AI model.", careers_url: "https://sdaia.gov.sa/en/SDAIA/Pages/Careers.aspx" },
  { slug: "deep-sa", name: "Deep SA", website: "https://deep.sa", linkedin: "https://www.linkedin.com/company/deepsa", logo_url: "/logos/deep-sa.png", stage: "Seed", sector: ["AI Research"], city: "Riyadh", description: "Building localized AI solutions for Saudi Arabia. $4.5M SAR pre-seed.", careers_url: "https://deep.sa" },
  { slug: "nuwayra", name: "Nuwayra", website: "https://nuwayra.ai", linkedin: "https://www.linkedin.com/company/nuwayra", logo_url: "/logos/nuwayra.svg", stage: "Seed", sector: ["AI Research"], city: "Riyadh", description: "Generative AI for government and enterprise. $2.1M pre-seed.", careers_url: "https://nuwayra.ai" },
  { slug: "cranl", name: "Cranl", website: "https://cranl.com", linkedin: "https://www.linkedin.com/company/cranl", logo_url: "/logos/cranl.png", stage: "Seed", sector: ["AI Research"], city: "Riyadh", description: "Saudi AI startup building intelligent products.", careers_url: "https://cranl.com" },

  // ===== AI Enterprise & SaaS =====
  { slug: "mozn", name: "Mozn", website: "https://mozn.ai", linkedin: "https://www.linkedin.com/company/mozn", logo_url: "/logos/mozn.png", stage: "Series A", sector: ["AI", "Fintech"], city: "Riyadh", description: "Enterprise AI for fraud detection and Arabic NLP. Built Focal (AML) and OSOS (text intelligence).", careers_url: "https://www.mozn.ai/careers" },
  { slug: "intelmatix", name: "Intelmatix", website: "https://intelmatix.ai", linkedin: "https://www.linkedin.com/company/intelmatix", logo_url: "/logos/intelmatix.png", stage: "Series A", sector: ["AI", "Enterprise"], city: "Riyadh", description: "MIT-founded deep tech AI. Largest AI Series A in MENA. Decision intelligence for enterprises.", careers_url: "https://intelmatix.ai/company-careers.html" },
  { slug: "lucidya", name: "Lucidya", website: "https://lucidya.com", linkedin: "https://www.linkedin.com/company/lucidya", logo_url: "/logos/lucidya.png", stage: "Series A", sector: ["AI", "SaaS"], city: "Riyadh", description: "AI-powered customer experience management. Leading CX SaaS in the Arab world. 4-day work week.", careers_url: "https://www.lucidya.com/careers-at-lucidya/" },
  { slug: "unifonic", name: "Unifonic", website: "https://unifonic.com", linkedin: "https://www.linkedin.com/company/unifonic", logo_url: "/logos/unifonic.png", stage: "Series B", sector: ["AI", "SaaS"], city: "Riyadh", description: "AI-powered customer engagement platform (CPaaS). 500+ employees, 5000+ companies.", careers_url: "https://jobs.unifonic.com" },
  { slug: "wittify", name: "Wittify.ai", website: "https://wittify.ai", linkedin: "https://www.linkedin.com/company/wittify", logo_url: "/logos/wittify.png", stage: "Seed", sector: ["AI", "SaaS"], city: "Riyadh", description: "AI agents for omnichannel customer touchpoints — mobile, web, CRM, call centers.", careers_url: "https://wittify.ai" },
  { slug: "widebot", name: "WideBot", website: "https://widebot.ai", linkedin: "https://www.linkedin.com/company/widebot", logo_url: "/logos/widebot.png", stage: "Series A", sector: ["AI", "SaaS"], city: "Riyadh", description: "Arabic AI chatbot solutions for governments and enterprises. 350+ clients, 12 countries.", careers_url: "https://widebot.ai" },

  // ===== Cybersecurity =====
  { slug: "cognna", name: "Cognna", website: "https://www.cognna.com", linkedin: "https://www.linkedin.com/company/cognna", logo_url: "/logos/cognna.png", stage: "Series A", sector: ["Cybersecurity"], city: "Riyadh", description: "AI-powered SOC automation and advanced threat detection for enterprises.", careers_url: "https://www.cognna.com" },
  { slug: "solidrange", name: "Solidrange", website: "https://solidrange.com", linkedin: "https://www.linkedin.com/company/solidrange", logo_url: "/logos/solidrange.png", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "AI-powered cybersecurity GRC automation. $2.4M seed round.", careers_url: "https://solidrange.com" },
  { slug: "dphish", name: "dPhish", website: "https://dphish.com", linkedin: "https://www.linkedin.com/company/dphish", logo_url: "/logos/dphish.png", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "AI anti-phishing platform. Flat6Labs backed.", careers_url: "https://dphish.com" },
  { slug: "cyberni", name: "Cyberni", website: "https://cyberni.com", linkedin: "https://www.linkedin.com/company/cyberni", logo_url: "/logos/cyberni.png", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "AI-driven cybersecurity. Flat6Labs backed. Intelligent security for Saudi enterprises.", careers_url: "https://cyberni.com" },

  // ===== Defense =====
  { slug: "atam", name: "ATAM", website: "https://atam.careers", linkedin: "https://www.linkedin.com/company/atam", logo_url: "/logos/atam.svg", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Autonomous defense systems and intelligence technology. 19 open roles.", careers_url: "https://atam.careers" },
  { slug: "falconviz", name: "FalconViz", website: "https://falconviz.com", linkedin: "https://www.linkedin.com/company/falconviz", logo_url: "/logos/falconviz.png", stage: "Series A", sector: ["Defense", "Geospatial"], city: "Dhahran", description: "AI-powered drone mapping and 3D modeling for defense, construction, and heritage.", careers_url: "https://falconviz.com" },
  { slug: "neo-space", name: "Neo Space Group", website: "https://neospacegroup.com", linkedin: "https://www.linkedin.com/company/neospacegroup", logo_url: "/logos/neo-space.svg", stage: "Seed", sector: ["Defense", "Aerospace"], city: "Riyadh", description: "Saudi space technology and satellite solutions company.", careers_url: "https://neospacegroup.com" },

  // ===== Govtech =====
  { slug: "elm", name: "Elm", website: "https://elm.sa", linkedin: "https://www.linkedin.com/company/elm", logo_url: "/logos/elm.svg", stage: "Growth", sector: ["Govtech"], city: "Riyadh", description: "PIF-owned digital government services. AI-powered e-services for Saudi government.", careers_url: "https://career.elm.sa/elm" },
  { slug: "governata", name: "Governata", website: "https://governata.com", linkedin: "https://www.linkedin.com/company/governata", logo_url: "/logos/governata.png", stage: "Seed", sector: ["Govtech", "Compliance"], city: "Riyadh", description: "AI governance and compliance platform. Ex-Foodics COO. $4M seed.", careers_url: "https://governata.com" },
  { slug: "takamul", name: "Takamul", website: "https://takamul.com.sa", linkedin: "https://www.linkedin.com/company/takamul", logo_url: "/logos/takamul.png", stage: "Growth", sector: ["Govtech"], city: "Riyadh", description: "AI and digital transformation solutions for Saudi government entities.", careers_url: "https://takamul.com.sa" },

  // ===== Fintech =====
  { slug: "sayfi", name: "SayFi", website: "https://sayfi.co", linkedin: "https://www.linkedin.com/company/sayfi", logo_url: "/logos/sayfi.svg", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "AI expense management for finance teams. $20M Series A.", careers_url: "https://sayfi.co" },
  { slug: "safqah", name: "Safqah", website: "https://safqah.com", linkedin: "https://www.linkedin.com/company/safqah", logo_url: "/logos/safqah.svg", stage: "Seed", sector: ["Fintech", "Proptech"], city: "Riyadh", description: "AI credit assessment for real estate developers. $15.2M seed.", careers_url: "https://safqah.com" },
  { slug: "oqood", name: "Oqood", website: "https://oqood.ai", linkedin: "https://www.linkedin.com/company/oqood", logo_url: "/logos/oqood.svg", stage: "Seed", sector: ["Fintech", "Legaltech"], city: "Riyadh", description: "AI-powered legal tech. Automating legal workflows. Sanabil-backed.", careers_url: "https://oqood.ai" },

  // ===== E-commerce =====
  { slug: "rawaa", name: "Rawaa", website: "https://rawaa.com", linkedin: "https://www.linkedin.com/company/rawaa", logo_url: "/logos/rawaa.svg", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Cloud POS with AI accounting for merchants. $45M Series B.", careers_url: "https://rawaa.com" },
  { slug: "judhur", name: "Judhur", website: "https://judhur.com", linkedin: "https://www.linkedin.com/company/judhur", logo_url: "/logos/judhur.svg", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "AI multi-channel e-commerce for Amazon, Salla, Zid, Noon. $500K pre-seed.", careers_url: "https://judhur.com" },
  { slug: "jazer", name: "Jazer", website: "https://jazer.io", linkedin: "https://www.linkedin.com/company/jazer", logo_url: "/logos/jazer.svg", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "AI inventory and multi-platform e-commerce management.", careers_url: "https://jazer.io" },
  { slug: "rvin", name: "RVIN", website: "https://rvin.ai", linkedin: "https://www.linkedin.com/company/rvin", logo_url: "/logos/rvin.png", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "AI virtual employees for e-commerce SMEs. Customer engagement automation.", careers_url: "https://rvin.ai" },

  // ===== Energy =====
  { slug: "kashon", name: "Kashon", website: "https://kashon.sa", linkedin: "https://www.linkedin.com/company/kashon", logo_url: "/logos/kashon.svg", stage: "Series A", sector: ["Energy"], city: "Riyadh", description: "AI operations platform for fuel stations. $16M Series A.", careers_url: "https://kashon.sa" },
  { slug: "sadeem", name: "Sadeem", website: "https://sadeem.com", linkedin: "https://www.linkedin.com/company/sadeem", logo_url: "/logos/sadeem.svg", stage: "Series A", sector: ["Energy", "Smart Cities"], city: "Riyadh", description: "AI-powered environmental monitoring and smart city infrastructure.", careers_url: "https://sadeem.com" },

  // ===== Proptech =====
  { slug: "ummar", name: "Ummar", website: "https://ummar.sa", linkedin: "https://www.linkedin.com/company/ummar", logo_url: "/logos/ummar.svg", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "AI rental and property management automation. $4M seed.", careers_url: "https://ummar.sa" },
  { slug: "rize", name: "Rize", website: "https://rize.sa", linkedin: "https://www.linkedin.com/company/rize-sa", logo_url: "/logos/rize.png", stage: "Series A", sector: ["Proptech", "Fintech"], city: "Riyadh", description: "Rent-now-pay-later. First in Saudi to offer flexible monthly rent payments. $35M Series A.", careers_url: "https://rize.sa" },

  // ===== Construction =====
  { slug: "wakecap", name: "WakeCap", website: "https://www.wakecap.com", linkedin: "https://www.linkedin.com/company/wakecap", logo_url: "/logos/wakecap.png", stage: "Series A", sector: ["Construction"], city: "Riyadh", description: "IoT + AI for construction sites. Real-time workforce tracking via smart hard hats.", careers_url: "https://www.wakecap.com/recruitment" },

  // ===== Bio & Health =====
  { slug: "calo", name: "Calo", website: "https://calo.app", linkedin: "https://www.linkedin.com/company/caborone", logo_url: "/logos/calo.png", stage: "Series A", sector: ["Bio & Health"], city: "Riyadh", description: "AI-powered personalized meal planning and delivery. ML-driven nutrition plans.", careers_url: "https://calo.app" },

  // ===== Education =====
  { slug: "classera", name: "Classera", website: "https://classera.com", linkedin: "https://www.linkedin.com/company/classera", logo_url: "/logos/classera.png", stage: "Series B", sector: ["Education"], city: "Riyadh", description: "AI e-learning platform used by schools and universities across MENA.", careers_url: "https://classera.com" },
  { slug: "noon-academy", name: "Noon Academy", website: "https://noon.academy", linkedin: "https://www.linkedin.com/company/noonacademy", logo_url: "/logos/noon-academy.svg", stage: "Series A", sector: ["Education"], city: "Riyadh", description: "AI-powered social learning platform. Personalized tutoring for students.", careers_url: "https://noon.academy" },

  // ===== Agriculture =====
  { slug: "edama", name: "Edama", website: "https://edama.com", linkedin: "https://www.linkedin.com/company/edama", logo_url: "/logos/edama.png", stage: "Seed", sector: ["Agriculture"], city: "Riyadh", description: "KAUST spinoff. AI-powered organic waste recycling into agricultural products.", careers_url: "https://edama.com" },
  { slug: "mustadem", name: "Mustadem", website: "https://mustadem.com", linkedin: "https://www.linkedin.com/company/mustadem", logo_url: "/logos/mustadem.png", stage: "Seed", sector: ["Agriculture"], city: "Riyadh", description: "Smart aquaculture tech. AI to enhance fish production and food security.", careers_url: "https://mustadem.com" },

  // ===== Geospatial =====
  { slug: "gbt", name: "GBT", website: "https://gbt.sa", linkedin: "https://www.linkedin.com/company/gbt-sa", logo_url: "/logos/gbt.svg", stage: "Seed", sector: ["Geospatial"], city: "Riyadh", description: "Geospatial AI and no-code spatial data tools. $1.33M pre-seed.", careers_url: "https://gbt.sa" },
  { slug: "hazen", name: "Hazen.ai", website: "https://hazen.ai", linkedin: "https://www.linkedin.com/company/hazen-ai", logo_url: "/logos/hazen.png", stage: "Seed", sector: ["Geospatial", "Smart Cities"], city: "Makkah", description: "AI computer vision for traffic management and road safety.", careers_url: "https://hazen.ai/careers" },

  // ===== HR Tech =====
  { slug: "merit-incentives", name: "Merit Incentives", website: "https://meritincentives.com", linkedin: "https://www.linkedin.com/company/meritincentives", logo_url: "/logos/merit.svg", stage: "Growth", sector: ["HR Tech"], city: "Riyadh", description: "Employee engagement and incentives platform. Acquired Australian company.", careers_url: "https://meritincentives.com" },

  // ===== SaaS =====
  { slug: "rukiza", name: "Rukiza", website: "https://rukiza.com", linkedin: "https://www.linkedin.com/company/rukiza", logo_url: "/logos/rukiza.svg", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Scheduling and blockchain document verification. $133K pre-seed.", careers_url: "https://rukiza.com" },
  { slug: "sawt", name: "Sawt", website: "https://sawt.ai", linkedin: "https://www.linkedin.com/company/sawt-ai", logo_url: "/logos/sawt.png", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "STV AI Fund's first investment. Building AI-native products for MENA.", careers_url: "https://sawt.ai" },
]

// Jobs archived — linking directly to company career pages
export const jobs: Job[] = []

// Helper functions
export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug)
}

export function getJobsByCompany(slug: string): Job[] {
  return jobs.filter((j) => j.company_slug === slug)
}

export function getUniqueValues(key: keyof Job): string[] {
  return [...new Set(jobs.map((j) => j[key] as string))].filter(Boolean).sort()
}

export const filterOptions = {
  sector: [...new Set(companies.flatMap((c) => c.sector))].sort(),
  city: [...new Set(companies.map((c) => c.city))].sort(),
  companyStage: ["Seed", "Series A", "Series B", "Growth"],
}
