import { Company, Job } from "./types"

export const companies: Company[] = [
  // ===== UNICORNS & MAJOR TECH =====
  { slug: "ninja", name: "Ninja", website: "https://ananinja.com", linkedin: "https://www.linkedin.com/company/ananinja", stage: "Unicorn", sector: ["Logistics"], city: "Riyadh", description: "Last-mile delivery platform.", careers_url: "https://ananinja.com" },
  { slug: "tabby", name: "Tabby", website: "https://tabby.ai", linkedin: "https://www.linkedin.com/company/tabbyai", stage: "Unicorn", sector: ["Fintech"], city: "Riyadh", description: "Buy-now-pay-later across MENA.", careers_url: "https://tabby.ai/careers" },
  { slug: "tamara", name: "Tamara", website: "https://tamara.co", linkedin: "https://www.linkedin.com/company/tamara", stage: "Unicorn", sector: ["Fintech"], city: "Riyadh", description: "Buy-now-pay-later for MENA.", careers_url: "https://job-boards.eu.greenhouse.io/tamara" },
  { slug: "stc-pay", name: "stc pay", website: "https://stcpay.com.sa", linkedin: "https://www.linkedin.com/company/stcpay", stage: "Unicorn", sector: ["Fintech"], city: "Riyadh", description: "Saudi's leading digital wallet.", careers_url: "https://stcpay.com.sa" },
  { slug: "salla", name: "Salla", website: "https://salla.com", linkedin: "https://www.linkedin.com/company/sallaapp", stage: "Unicorn", sector: ["E-commerce"], city: "Riyadh", description: "Arabic e-commerce store builder.", careers_url: "https://salla.com" },
  { slug: "noon", name: "Noon", website: "https://noon.com", linkedin: "https://www.linkedin.com/company/noon", stage: "Growth", sector: ["E-commerce"], city: "Riyadh", description: "Major e-commerce marketplace.", careers_url: "https://noon.com" },

  // ===== AI & MACHINE LEARNING =====
  { slug: "humain", name: "Humain", website: "https://humain.ai", linkedin: "https://www.linkedin.com/company/humainai", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Builds AI infrastructure for Saudi Arabia.", careers_url: "https://humain.ai" },
  { slug: "lucidya", name: "Lucidya", website: "https://lucidya.com", linkedin: "https://www.linkedin.com/company/lucidya", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "AI-powered customer experience management.", careers_url: "https://www.lucidya.com/careers-at-lucidya/" },
  { slug: "mozn", name: "Mozn", website: "https://mozn.ai", linkedin: "https://www.linkedin.com/company/mozn", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Builds fraud detection and Arabic NLP tools.", careers_url: "https://www.mozn.ai/careers" },
  { slug: "wakecap", name: "WakeCap", website: "https://www.wakecap.com", linkedin: "https://www.linkedin.com/company/wakecap", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Smart hard hats with AI workforce tracking.", careers_url: "https://www.wakecap.com/recruitment" },
  { slug: "deep-sa", name: "DEEP.SA", website: "https://deep.sa", linkedin: "https://www.linkedin.com/company/deepsa", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds localized AI solutions for Saudi.", careers_url: "https://deep.sa" },
  { slug: "sawt", name: "Sawt", website: "https://sawt.ai", linkedin: "https://www.linkedin.com/company/sawt-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds AI-native products for MENA.", careers_url: "https://sawt.ai" },
  { slug: "hazen", name: "Hazen.ai", website: "https://hazen.ai", linkedin: "https://www.linkedin.com/company/hazen-ai", stage: "Seed", sector: ["AI"], city: "Jeddah", description: "AI computer vision for traffic management.", careers_url: "https://hazen.ai/careers" },
  { slug: "artefact", name: "Artefact", website: "https://artefact.com", linkedin: "https://www.linkedin.com/company/artefact-global", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Data and AI consulting for business transformation.", careers_url: "https://artefact.com/careers" },

  // ===== ARAMCO =====
  { slug: "aramco-digital", name: "Aramco Digital", website: "https://aramcodigital.com", linkedin: "https://www.linkedin.com/company/aramcodigital", stage: "Growth", sector: ["Data & Infrastructure"], city: "Dhahran", description: "Digital transformation arm of Saudi Aramco.", careers_url: "https://aramcodigital.com" },
  { slug: "aramco-ventures", name: "Aramco Ventures", website: "https://aramcoventures.com", linkedin: "https://www.linkedin.com/company/aramcoventures", stage: "Growth", sector: ["Data & Infrastructure"], city: "Dhahran", description: "Corporate venture capital of Saudi Aramco.", careers_url: "https://aramcoventures.com" },

  // ===== FINTECH =====
  { slug: "hala", name: "HALA", website: "https://hala.com", linkedin: "https://www.linkedin.com/company/haborone", stage: "Series B", sector: ["Fintech"], city: "Riyadh", description: "Embedded payments for small businesses.", careers_url: "https://hala.com" },
  { slug: "erad", name: "Erad", website: "https://erad.co", linkedin: "https://www.linkedin.com/company/erad-co", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Financial infrastructure for businesses.", careers_url: "https://erad.co" },
  { slug: "tamam", name: "Tamam", website: "https://tamam.sa", linkedin: "https://www.linkedin.com/company/tamam-financing", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Nano-lending and micro-financing.", careers_url: "https://tamam.sa" },
  { slug: "d360", name: "D360 Bank", website: "https://d360.com", linkedin: "https://www.linkedin.com/company/d360bank", stage: "Growth", sector: ["Fintech"], city: "Riyadh", description: "Saudi digital-only bank.", careers_url: "https://d360.com" },
  { slug: "lean-technologies", name: "Lean Technologies", website: "https://leantech.me", linkedin: "https://www.linkedin.com/company/leantechnologies", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Open banking API for MENA.", careers_url: "https://leantech.me" },
  { slug: "safqah", name: "Safqah Capital", website: "https://safqah.com", linkedin: "https://www.linkedin.com/company/safqah", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI credit assessment for real estate.", careers_url: "https://safqah.com" },

  // ===== E-COMMERCE & RETAIL =====
  { slug: "zid", name: "Zid", website: "https://zid.sa", linkedin: "https://www.linkedin.com/company/zidsa", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "E-commerce enablement platform.", careers_url: "https://zid.sa" },
  { slug: "syarah", name: "Syarah", website: "https://syarah.com", linkedin: "https://www.linkedin.com/company/syarah", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Online car marketplace.", careers_url: "https://syarah.com" },
  { slug: "soum", name: "Soum", website: "https://soum.sa", linkedin: "https://www.linkedin.com/company/soum", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Marketplace for used electronics.", careers_url: "https://soum.sa" },
  { slug: "fordeal", name: "Fordeal", website: "https://fordeal.com", linkedin: "https://www.linkedin.com/company/fordeal", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Cross-border fashion e-commerce.", careers_url: "https://fordeal.com" },
  { slug: "sary", name: "Sary", website: "https://sary.sa", linkedin: "https://www.linkedin.com/company/trysary", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "B2B wholesale ordering marketplace.", careers_url: "https://apply.workable.com/sary/" },
  { slug: "nana", name: "NANA", website: "https://nana.sa", linkedin: "https://www.linkedin.com/company/nanasa", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Grocery delivery and dark stores.", careers_url: "https://nana.sa" },
  { slug: "rewaa", name: "Rewaa", website: "https://rewaa.com", linkedin: "https://www.linkedin.com/company/rewaa", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Inventory and POS for retailers.", careers_url: "https://rewaa.com" },
  { slug: "gathern", name: "Gathern", website: "https://gathern.co", linkedin: "https://www.linkedin.com/company/gathern", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Vacation rental marketplace.", careers_url: "https://gathern.co" },
  { slug: "retailo", name: "Retailo", website: "https://retailo.co", linkedin: "https://www.linkedin.com/company/retailo", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "B2B marketplace for retailers.", careers_url: "https://retailo.co" },

  // ===== FOODTECH & DELIVERY =====
  { slug: "foodics", name: "Foodics", website: "https://www.foodics.com", linkedin: "https://www.linkedin.com/company/foodics", stage: "Series B", sector: ["Foodtech"], city: "Riyadh", description: "Restaurant management and POS platform.", careers_url: "https://apply.workable.com/foodics/" },
  { slug: "jahez", name: "Jahez", website: "https://jahez.net", linkedin: "https://www.linkedin.com/company/jahez", stage: "Growth", sector: ["Foodtech"], city: "Riyadh", description: "Food delivery, listed on Tadawul.", careers_url: "https://jahez.net" },

  // ===== LOGISTICS =====
  { slug: "trukker", name: "TruKKer", website: "https://trukker.com", linkedin: "https://www.linkedin.com/company/trukker", stage: "Series B", sector: ["Logistics"], city: "Riyadh", description: "Digital freight marketplace.", careers_url: "https://trukker.com" },

  // ===== EDTECH =====
  { slug: "classera", name: "Classera", website: "https://classera.com", linkedin: "https://www.linkedin.com/company/classera", stage: "Series B", sector: ["Edtech"], city: "Riyadh", description: "E-learning platform for schools.", careers_url: "https://classera.com" },
  { slug: "labayh", name: "Labayh", website: "https://labayh.net", linkedin: "https://www.linkedin.com/company/labayh", stage: "Series A", sector: ["Edtech"], city: "Riyadh", description: "Mental health and wellness platform.", careers_url: "https://labayh.net" },

  // ===== HEALTHTECH =====
  { slug: "cura", name: "Cura", website: "https://cura.healthcare", linkedin: "https://www.linkedin.com/company/cura-healthcare", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Telehealth and virtual care platform.", careers_url: "https://cura.healthcare" },

  // ===== SAAS =====
  { slug: "jisr", name: "Jisr", website: "https://jisr.net", linkedin: "https://www.linkedin.com/company/jisr", stage: "Series A", sector: ["SaaS"], city: "Riyadh", description: "HR and payroll management platform.", careers_url: "https://jisr.net" },
  { slug: "zenhr", name: "ZenHR", website: "https://zenhr.com", linkedin: "https://www.linkedin.com/company/zenhr", stage: "Series A", sector: ["SaaS"], city: "Riyadh", description: "Cloud HR software for MENA.", careers_url: "https://zenhr.com" },
  { slug: "bayzat", name: "Bayzat", website: "https://bayzat.com", linkedin: "https://www.linkedin.com/company/bayzat", stage: "Series B", sector: ["SaaS"], city: "Riyadh", description: "HR, payroll, and insurance automation.", careers_url: "https://bayzat.com" },
  { slug: "elm", name: "Elm", website: "https://elm.sa", linkedin: "https://www.linkedin.com/company/elm", stage: "Growth", sector: ["SaaS"], city: "Riyadh", description: "Digital government services platform.", careers_url: "https://career.elm.sa/elm" },

  // ===== PROPTECH =====
  { slug: "rize", name: "Rize", website: "https://rize.sa", linkedin: "https://www.linkedin.com/company/rize-sa", stage: "Series A", sector: ["Proptech"], city: "Riyadh", description: "Rent-now-pay-later platform.", careers_url: "https://rize.sa" },

  // ===== ROBOTICS =====
  { slug: "proven-robotics", name: "PROVEN Robotics", website: "https://provenrobotics.ai", linkedin: "https://www.linkedin.com/company/proven-robotics", stage: "Growth", sector: ["Robotics"], city: "Riyadh", description: "Robotics solutions for Saudi enterprises.", careers_url: "https://provenrobotics.ai" },

  // ===== MEGA PROJECTS =====
  { slug: "neom-tech", name: "NEOM Tech & Digital", website: "https://neom.com", linkedin: "https://www.linkedin.com/company/neom", stage: "Growth", sector: ["Data & Infrastructure"], city: "NEOM", description: "Technology arm of the NEOM megaproject.", careers_url: "https://neom.com/en-us/careers" },
  { slug: "alat", name: "Alat", website: "https://alat.sa", linkedin: "https://www.linkedin.com/company/alat-saudi", stage: "Growth", sector: ["Deep Tech"], city: "Riyadh", description: "Saudi electronics and tech manufacturing hub.", careers_url: "https://alat.sa" },
  { slug: "riyadh-air", name: "Riyadh Air", website: "https://riyadhair.com", linkedin: "https://www.linkedin.com/company/riyadhair", stage: "Growth", sector: ["Logistics"], city: "Riyadh", description: "Saudi's new digital-first airline.", careers_url: "https://riyadhair.com/careers" },
  { slug: "ceer", name: "Ceer Motors", website: "https://ceer.sa", linkedin: "https://www.linkedin.com/company/ceer-motors", stage: "Growth", sector: ["Deep Tech"], city: "Riyadh", description: "Saudi electric vehicle manufacturer.", careers_url: "https://ceer.sa" },

  // ===== DATA & INFRASTRUCTURE =====
  { slug: "sdaia", name: "SDAIA", website: "https://sdaia.gov.sa", linkedin: "https://www.linkedin.com/company/sdaia", logo_override: "https://www.google.com/s2/favicons?domain=sdaia.gov.sa&sz=128", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Saudi Data and AI Authority driving national AI strategy.", careers_url: "https://sdaia.gov.sa/en/SDAIA/Pages/Careers.aspx" },
  { slug: "aec", name: "Advanced Electronics Company", website: "https://aec.com.sa", linkedin: "https://www.linkedin.com/company/aaborone", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Defense electronics and cybersecurity.", careers_url: "https://aec.com.sa" },
  { slug: "stc-solutions", name: "STC Solutions", website: "https://stcs.com.sa", linkedin: "https://www.linkedin.com/company/stc-solutions", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Enterprise IT services and digital solutions.", careers_url: "https://stcs.com.sa" },
  { slug: "center3", name: "Center3", website: "https://center3.com", linkedin: "https://www.linkedin.com/company/center3", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Digital infrastructure and data center hub.", careers_url: "https://center3.com" },

  // ===== DEEP TECH =====
  { slug: "falconviz", name: "FalconViz", website: "https://falconviz.com", linkedin: "https://www.linkedin.com/company/falconviz", stage: "Series A", sector: ["Deep Tech"], city: "Dammam", description: "Drone mapping and 3D modeling.", careers_url: "https://falconviz.com" },

  // ===== IOT =====
  { slug: "glamera", name: "Glamera", website: "https://glamera.com", linkedin: "https://www.linkedin.com/company/glamera", stage: "Series A", sector: ["IoT"], city: "Riyadh", description: "Beauty and salon booking platform.", careers_url: "https://glamera.com" },

  // ===== MEDIA =====
  { slug: "telfaz11", name: "Telfaz11", website: "https://telfaz11.com", linkedin: "https://www.linkedin.com/company/telfaz11", stage: "Growth", sector: ["Media"], city: "Riyadh", description: "Saudi digital content and entertainment studio.", careers_url: "https://telfaz11.com" },

  // ===== DEFENSE =====
  { slug: "atam", name: "ATAM", website: "https://atam.careers", linkedin: "https://www.linkedin.com/company/atam", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Builds autonomous defense systems.", careers_url: "https://atam.careers" },
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
