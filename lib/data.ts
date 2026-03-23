import { Company, Job } from "./types"

export const companies: Company[] = [
  // ===== AI =====
  { slug: "humain", name: "Humain", website: "https://humain.ai", linkedin: "https://www.linkedin.com/company/humainai", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Builds AI infrastructure for Saudi Arabia.", careers_url: "https://humain.ai" },
  { slug: "sdaia", name: "SDAIA", website: "https://sdaia.gov.sa", linkedin: "https://www.linkedin.com/company/sdikiaia", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Drives Saudi Arabia's national AI strategy.", careers_url: "https://sdaia.gov.sa/en/SDAIA/Pages/Careers.aspx" },
  { slug: "allam", name: "Allam", website: "https://sdaia.gov.sa", linkedin: "https://www.linkedin.com/company/sdikiaia", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Saudi's Arabic large language model.", careers_url: "https://sdaia.gov.sa/en/SDAIA/Pages/Careers.aspx" },
  { slug: "mozn", name: "Mozn", website: "https://mozn.ai", linkedin: "https://www.linkedin.com/company/mozn", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Builds fraud detection and Arabic NLP tools.", careers_url: "https://www.mozn.ai/careers" },
  { slug: "intelmatix", name: "Intelmatix", website: "https://intelmatix.ai", linkedin: "https://www.linkedin.com/company/intelmatix", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Provides AI-powered decision intelligence.", careers_url: "https://intelmatix.ai/company-careers.html" },
  { slug: "lucidya", name: "Lucidya", website: "https://lucidya.com", linkedin: "https://www.linkedin.com/company/lucidya", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "AI-powered customer experience management.", careers_url: "https://www.lucidya.com/careers-at-lucidya/" },
  { slug: "deep-sa", name: "Deep SA", website: "https://deep.sa", linkedin: "https://www.linkedin.com/company/deepsa", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds localized AI solutions for Saudi.", careers_url: "https://deep.sa" },
  { slug: "nuwayra", name: "Nuwayra", website: "https://nuwayra.ai", linkedin: "https://www.linkedin.com/company/nuwayra", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Generative AI for government and enterprise.", careers_url: "https://nuwayra.ai" },
  { slug: "cranl", name: "Cranl", website: "https://cranl.com", linkedin: "https://www.linkedin.com/company/cranl", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds intelligent AI products.", careers_url: "https://cranl.com" },
  { slug: "wittify", name: "Wittify.ai", website: "https://wittify.ai", linkedin: "https://www.linkedin.com/company/wittify", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI agents for omnichannel customer touchpoints.", careers_url: "https://wittify.ai" },
  { slug: "widebot", name: "WideBot", website: "https://widebot.ai", linkedin: "https://www.linkedin.com/company/widebot", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Arabic AI chatbots for governments and enterprises.", careers_url: "https://widebot.ai" },
  { slug: "sawt", name: "Sawt", website: "https://sawt.ai", linkedin: "https://www.linkedin.com/company/sawt-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds AI-native products for MENA.", careers_url: "https://sawt.ai" },
  { slug: "sdaia-hexagon", name: "SDAIA Hexagon", website: "https://hexagon.com", linkedin: "https://www.linkedin.com/company/hexagon", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Operates the world's largest government data center.", careers_url: "https://hexagon.com/company/careers" },
  { slug: "infiniarc", name: "INFINIARC", website: "https://infiniarc.com", linkedin: "https://www.linkedin.com/company/infiniarc", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Builds high-performance AI servers and hardware.", careers_url: "https://infiniarc.com" },

  // ===== Cybersecurity =====
  { slug: "cognna", name: "Cognna", website: "https://www.cognna.com", linkedin: "https://www.linkedin.com/company/cognna", stage: "Series A", sector: ["Cybersecurity"], city: "Riyadh", description: "Automates SOC operations with AI.", careers_url: "https://www.cognna.com" },
  { slug: "solidrange", name: "Solidrange", website: "https://solidrange.com", linkedin: "https://www.linkedin.com/company/solidrange", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Automates cybersecurity compliance (GRC).", careers_url: "https://solidrange.com" },
  { slug: "dphish", name: "dPhish", website: "https://dphish.com", linkedin: "https://www.linkedin.com/company/dphish", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Detects and prevents phishing attacks.", careers_url: "https://dphish.com" },
  { slug: "cyberni", name: "Cyberni", website: "https://cyberni.com", linkedin: "https://www.linkedin.com/company/cyberni", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Builds intelligent security solutions.", careers_url: "https://cyberni.com" },

  // ===== Defense & Aerospace =====
  { slug: "atam", name: "ATAM", website: "https://atam.careers", linkedin: "https://www.linkedin.com/company/atam", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Builds autonomous defense systems.", careers_url: "https://atam.careers" },
  { slug: "falconviz", name: "FalconViz", website: "https://falconviz.com", linkedin: "https://www.linkedin.com/company/falconviz", stage: "Series A", sector: ["Defense"], city: "Dammam", description: "Drone mapping and 3D modeling.", careers_url: "https://falconviz.com" },
  { slug: "neo-space", name: "Neo Space Group", website: "https://neospacegroup.com", linkedin: "https://www.linkedin.com/company/neospacegroup", stage: "Seed", sector: ["Aerospace"], city: "Riyadh", description: "Builds satellite and space technology.", careers_url: "https://neospacegroup.com" },

  // ===== Fintech =====
  { slug: "sayfi", name: "SayFi", website: "https://sayfi.co", linkedin: "https://www.linkedin.com/company/sayfi", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "AI expense management for finance teams.", careers_url: "https://sayfi.co" },
  { slug: "safqah", name: "Safqah", website: "https://safqah.com", linkedin: "https://www.linkedin.com/company/safqah", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI credit assessment for real estate.", careers_url: "https://safqah.com" },
  { slug: "oqood", name: "Oqood", website: "https://oqood.ai", linkedin: "https://www.linkedin.com/company/oqood", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Automates legal workflows with AI.", careers_url: "https://oqood.ai" },
  { slug: "tamara", name: "Tamara", website: "https://tamara.co", linkedin: "https://linkedin.com/company/tamara", stage: "Unicorn", sector: ["Fintech"], city: "Riyadh", description: "Buy-now-pay-later for MENA.", careers_url: "https://job-boards.eu.greenhouse.io/tamara" },
  { slug: "hala", name: "Hala", website: "https://hala.com", linkedin: "https://www.linkedin.com/company/haborone", stage: "Series B", sector: ["Fintech"], city: "Riyadh", description: "Embedded payments for small businesses.", careers_url: "https://hala.com" },
  { slug: "lean-technologies", name: "Lean Technologies", website: "https://leantech.me", linkedin: "https://www.linkedin.com/company/leantechnologies", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Open banking API for MENA.", careers_url: "https://leantech.me" },
  { slug: "lendo", name: "Lendo", website: "https://lendo.sa", linkedin: "https://www.linkedin.com/company/lendo", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Connects SMEs with financing.", careers_url: "https://lendo.sa" },
  { slug: "hyperpay", name: "HyperPay", website: "https://hyperpay.com", linkedin: "https://www.linkedin.com/company/hyperpay", stage: "Series B", sector: ["Fintech"], city: "Riyadh", description: "Online payment gateway.", careers_url: "https://hyperpay.com" },
  { slug: "d360", name: "D360 Bank", website: "https://d360.com", linkedin: "https://www.linkedin.com/company/d360bank", stage: "Growth", sector: ["Fintech"], city: "Riyadh", description: "Saudi digital-only bank.", careers_url: "https://d360.com" },

  // ===== E-commerce & Retail =====
  { slug: "rawaa", name: "Rawaa", website: "https://rawaa.com", linkedin: "https://www.linkedin.com/company/rawaa", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Cloud POS with AI accounting for merchants.", careers_url: "https://rawaa.com" },
  { slug: "judhur", name: "Judhur", website: "https://judhur.com", linkedin: "https://www.linkedin.com/company/judhur", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Multi-channel e-commerce management.", careers_url: "https://judhur.com" },
  { slug: "jazer", name: "Jazer", website: "https://jazer.io", linkedin: "https://www.linkedin.com/company/jazer", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "AI inventory for e-commerce sellers.", careers_url: "https://jazer.io" },
  { slug: "rvin", name: "RVIN", website: "https://rvin.ai", linkedin: "https://www.linkedin.com/company/rvin", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "AI virtual employees for online stores.", careers_url: "https://rvin.ai" },
  { slug: "salla", name: "Salla", website: "https://salla.com", linkedin: "https://www.linkedin.com/company/saborone", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Arabic e-commerce store builder.", careers_url: "https://salla.com" },
  { slug: "noon", name: "Noon", website: "https://noon.com", linkedin: "https://www.linkedin.com/company/noon", stage: "Growth", sector: ["E-commerce"], city: "Riyadh", description: "Major e-commerce marketplace.", careers_url: "https://noon.com" },

  // ===== Logistics & Delivery =====
  { slug: "sary", name: "Sary", website: "https://sary.sa", linkedin: "https://www.linkedin.com/company/trysary", stage: "Series B", sector: ["Logistics"], city: "Riyadh", description: "B2B wholesale ordering marketplace.", careers_url: "https://apply.workable.com/sary/" },
  { slug: "ninja", name: "Ninja", website: "https://ananinja.com", linkedin: "https://www.linkedin.com/company/ananinja", stage: "Unicorn", sector: ["Logistics"], city: "Riyadh", description: "Last-mile delivery platform.", careers_url: "https://ananinja.com" },
  { slug: "mrsool", name: "Mrsool", website: "https://mrsool.co", linkedin: "https://www.linkedin.com/company/mrsool", stage: "Series B", sector: ["Logistics"], city: "Riyadh", description: "On-demand delivery for food and packages.", careers_url: "https://mrsool.co" },
  { slug: "jahez", name: "Jahez", website: "https://jahez.net", linkedin: "https://www.linkedin.com/company/jahez", stage: "Growth", sector: ["Logistics"], city: "Riyadh", description: "Food delivery, listed on Tadawul.", careers_url: "https://jahez.net" },
  { slug: "trukker", name: "Trukker", website: "https://trukker.com", linkedin: "https://www.linkedin.com/company/trukker", stage: "Series B", sector: ["Logistics"], city: "Riyadh", description: "Digital freight marketplace.", careers_url: "https://trukker.com" },

  // ===== Govtech =====
  { slug: "elm", name: "Elm", website: "https://elm.sa", linkedin: "https://www.linkedin.com/company/elm", stage: "Growth", sector: ["Govtech"], city: "Riyadh", description: "Digital government services platform.", careers_url: "https://career.elm.sa/elm" },
  { slug: "governata", name: "Governata", website: "https://governata.com", linkedin: "https://www.linkedin.com/company/governata", stage: "Seed", sector: ["Govtech"], city: "Riyadh", description: "AI governance and compliance platform.", careers_url: "https://governata.com" },
  { slug: "takamul", name: "Takamul", website: "https://takamul.com.sa", linkedin: "https://www.linkedin.com/company/takamul", stage: "Growth", sector: ["Govtech"], city: "Riyadh", description: "Digital transformation for government.", careers_url: "https://takamul.com.sa" },

  // ===== SaaS =====
  { slug: "unifonic", name: "Unifonic", website: "https://unifonic.com", linkedin: "https://www.linkedin.com/company/unifonic", stage: "Series B", sector: ["SaaS"], city: "Riyadh", description: "Customer engagement platform (CPaaS).", careers_url: "https://jobs.unifonic.com" },
  { slug: "foodics", name: "Foodics", website: "https://www.foodics.com", linkedin: "https://www.linkedin.com/company/foodics", stage: "Series B", sector: ["SaaS"], city: "Riyadh", description: "Restaurant management and POS platform.", careers_url: "https://apply.workable.com/foodics/" },
  { slug: "rewaa", name: "Rewaa", website: "https://rewaa.com", linkedin: "https://www.linkedin.com/company/rewaa", stage: "Series A", sector: ["SaaS"], city: "Riyadh", description: "Inventory and POS for retailers.", careers_url: "https://rewaa.com" },
  { slug: "rukiza", name: "Rukiza", website: "https://rukiza.com", linkedin: "https://www.linkedin.com/company/rukiza", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Scheduling and document verification.", careers_url: "https://rukiza.com" },

  // ===== Energy =====
  { slug: "kashon", name: "Kashon", website: "https://kashon.sa", linkedin: "https://www.linkedin.com/company/kashon", stage: "Series A", sector: ["Energy"], city: "Riyadh", description: "AI operations for fuel stations.", careers_url: "https://kashon.sa" },
  { slug: "sadeem", name: "Sadeem", website: "https://sadeem.com", linkedin: "https://www.linkedin.com/company/sadeem", stage: "Series A", sector: ["Energy"], city: "Riyadh", description: "Environmental monitoring and smart infrastructure.", careers_url: "https://sadeem.com" },

  // ===== Proptech =====
  { slug: "ummar", name: "Ummar", website: "https://ummar.sa", linkedin: "https://www.linkedin.com/company/ummar", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Automates rental and property management.", careers_url: "https://ummar.sa" },
  { slug: "rize", name: "Rize", website: "https://rize.sa", linkedin: "https://www.linkedin.com/company/rize-sa", stage: "Series A", sector: ["Proptech"], city: "Riyadh", description: "Rent-now-pay-later platform.", careers_url: "https://rize.sa" },

  // ===== Construction =====
  { slug: "wakecap", name: "WakeCap", website: "https://www.wakecap.com", linkedin: "https://www.linkedin.com/company/wakecap", stage: "Series A", sector: ["Construction"], city: "Riyadh", description: "Smart hard hats for workforce tracking.", careers_url: "https://www.wakecap.com/recruitment" },

  // ===== Bio & Health =====
  { slug: "calo", name: "Calo", website: "https://calo.app", linkedin: "https://www.linkedin.com/company/caborone", stage: "Series A", sector: ["Bio & Health"], city: "Riyadh", description: "AI-powered personalized meal plans.", careers_url: "https://calo.app" },

  // ===== Education =====
  { slug: "classera", name: "Classera", website: "https://classera.com", linkedin: "https://www.linkedin.com/company/classera", stage: "Series B", sector: ["Education"], city: "Riyadh", description: "E-learning platform for schools.", careers_url: "https://classera.com" },
  { slug: "noon-academy", name: "Noon Academy", website: "https://noon.academy", linkedin: "https://www.linkedin.com/company/noonacademy", stage: "Series A", sector: ["Education"], city: "Riyadh", description: "Social learning and AI tutoring.", careers_url: "https://noon.academy" },

  // ===== Agriculture =====
  { slug: "edama", name: "Edama", website: "https://edama.com", linkedin: "https://www.linkedin.com/company/edama", stage: "Seed", sector: ["Agriculture"], city: "Riyadh", description: "Recycles organic waste into farm products.", careers_url: "https://edama.com" },
  { slug: "mustadem", name: "Mustadem", website: "https://mustadem.com", linkedin: "https://www.linkedin.com/company/mustadem", stage: "Seed", sector: ["Agriculture"], city: "Riyadh", description: "Smart aquaculture technology.", careers_url: "https://mustadem.com" },

  // ===== Geospatial =====
  { slug: "gbt", name: "GBT", website: "https://gbt.sa", linkedin: "https://www.linkedin.com/company/gbt-sa", stage: "Seed", sector: ["Geospatial"], city: "Riyadh", description: "No-code geospatial AI tools.", careers_url: "https://gbt.sa" },
  { slug: "hazen", name: "Hazen.ai", website: "https://hazen.ai", linkedin: "https://www.linkedin.com/company/hazen-ai", stage: "Seed", sector: ["Geospatial"], city: "Jeddah", description: "AI computer vision for traffic management.", careers_url: "https://hazen.ai/careers" },

  // ===== HR Tech =====
  { slug: "merit-incentives", name: "Merit Incentives", website: "https://meritincentives.com", linkedin: "https://www.linkedin.com/company/meritincentives", stage: "Growth", sector: ["HR Tech"], city: "Riyadh", description: "Employee engagement and incentives.", careers_url: "https://meritincentives.com" },

  // ===== Mobility =====
  { slug: "morni", name: "Morni", website: "https://morni.com", linkedin: "https://www.linkedin.com/company/morni", stage: "Series A", sector: ["Mobility"], city: "Riyadh", description: "Roadside assistance platform.", careers_url: "https://morni.com" },

  // ===== Travel =====
  { slug: "gathern", name: "Gathern", website: "https://gathern.co", linkedin: "https://www.linkedin.com/company/gathern", stage: "Series B", sector: ["Travel"], city: "Riyadh", description: "Vacation rental marketplace.", careers_url: "https://gathern.co" },
]

// Jobs archived — linking directly to company career pages
export const jobs: Job[] = []

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
  companyStage: ["Seed", "Series A", "Series B", "Growth", "Unicorn"],
}
