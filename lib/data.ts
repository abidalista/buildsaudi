import { Company, Job } from "./types"

export const companies: Company[] = [
  // ===== UNICORNS & MAJOR TECH PLAYERS =====
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
  { slug: "scai", name: "SCAI", website: "https://scai.sa", linkedin: "https://www.linkedin.com/company/scai-sa", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Saudi AI company building Arabic language models.", careers_url: "https://scai.sa" },
  { slug: "abwab-ai", name: "Abwab.ai", website: "https://abwab.ai", linkedin: "https://www.linkedin.com/company/abwab-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered educational content platform.", careers_url: "https://abwab.ai" },
  { slug: "nearmotion", name: "NearMotion", website: "https://nearmotion.com", linkedin: "https://www.linkedin.com/company/nearmotion", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-driven location intelligence.", careers_url: "https://nearmotion.com" },
  { slug: "quant", name: "Quant", website: "https://quant.sa", linkedin: "https://www.linkedin.com/company/quant-sa", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Quantitative AI solutions.", careers_url: "https://quant.sa" },
  { slug: "wakecap", name: "WakeCap", website: "https://www.wakecap.com", linkedin: "https://www.linkedin.com/company/wakecap", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Smart hard hats with AI workforce tracking.", careers_url: "https://www.wakecap.com/recruitment" },
  { slug: "deep-sa", name: "DEEP.SA", website: "https://deep.sa", linkedin: "https://www.linkedin.com/company/deepsa", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds localized AI solutions for Saudi.", careers_url: "https://deep.sa" },
  { slug: "botme-ai", name: "BotMe AI", website: "https://botme.ai", linkedin: "https://www.linkedin.com/company/botme-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI chatbot builder for businesses.", careers_url: "https://botme.ai" },
  { slug: "cognitev", name: "Cognitev", website: "https://cognitev.com", linkedin: "https://www.linkedin.com/company/cognitev", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered digital advertising.", careers_url: "https://cognitev.com" },
  { slug: "newera-ai", name: "Newera.ai", website: "https://newera.ai", linkedin: "https://www.linkedin.com/company/newera-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI solutions for enterprise transformation.", careers_url: "https://newera.ai" },
  { slug: "intella", name: "intella", website: "https://intella.ai", linkedin: "https://www.linkedin.com/company/intella-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Intelligent automation platform.", careers_url: "https://intella.ai" },
  { slug: "coretechx", name: "CoreTechX", website: "https://coretechx.com", linkedin: "https://www.linkedin.com/company/coretechx", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Core AI technology solutions.", careers_url: "https://coretechx.com" },
  { slug: "lisan", name: "Lisan", website: "https://lisan.ai", linkedin: "https://www.linkedin.com/company/lisan-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Arabic speech and language AI.", careers_url: "https://lisan.ai" },
  { slug: "sawt", name: "Sawt", website: "https://sawt.ai", linkedin: "https://www.linkedin.com/company/sawt-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds AI-native products for MENA.", careers_url: "https://sawt.ai" },
  { slug: "sahmalgo", name: "SahmAlgo", website: "https://sahmalgo.com", linkedin: "https://www.linkedin.com/company/sahmalgo", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered stock market analytics.", careers_url: "https://sahmalgo.com" },
  { slug: "najeeb-ai", name: "Najeeb.AI", website: "https://najeeb.ai", linkedin: "https://www.linkedin.com/company/najeeb-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI study assistant for Arab students.", careers_url: "https://najeeb.ai" },
  { slug: "thya-technology", name: "Thya Technology", website: "https://thya.ai", linkedin: "https://www.linkedin.com/company/thya-technology", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered technology solutions.", careers_url: "https://thya.ai" },
  { slug: "hazen", name: "Hazen.ai", website: "https://hazen.ai", linkedin: "https://www.linkedin.com/company/hazen-ai", stage: "Seed", sector: ["AI"], city: "Jeddah", description: "AI computer vision for traffic management.", careers_url: "https://hazen.ai/careers" },
  { slug: "teammates-ai", name: "Teammates.ai", website: "https://teammates.ai", linkedin: "https://www.linkedin.com/company/teammates-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI teammates for enterprise workflows.", careers_url: "https://teammates.ai" },
  { slug: "eyego", name: "EyeGo", website: "https://eyego.ai", linkedin: "https://www.linkedin.com/company/eyego-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered visual inspection.", careers_url: "https://eyego.ai" },
  { slug: "genie-ai", name: "GENIE AI", website: "https://genie.ai", linkedin: "https://www.linkedin.com/company/genie-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Generative AI for enterprise.", careers_url: "https://genie.ai" },
  { slug: "artefact", name: "Artefact", website: "https://artefact.com", linkedin: "https://www.linkedin.com/company/artefact-global", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Data and AI consulting for business transformation.", careers_url: "https://artefact.com/careers" },
  { slug: "amigo-ai", name: "Amigo AI", website: "https://amigo.ai", linkedin: "https://www.linkedin.com/company/amigo-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI companion and assistant technology.", careers_url: "https://amigo.ai" },
  { slug: "edunovai", name: "EduNovai", website: "https://edunovai.com", linkedin: "https://www.linkedin.com/company/edunovai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered education innovation.", careers_url: "https://edunovai.com" },
  { slug: "hiba-health-ai", name: "Hiba Health AI", website: "https://hibahealth.ai", linkedin: "https://www.linkedin.com/company/hiba-health", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI for healthcare diagnostics.", careers_url: "https://hibahealth.ai" },

  // ===== ARAMCO DIGITAL & INNOVATION =====
  { slug: "aramco-digital", name: "Aramco Digital", website: "https://aramcodigital.com", linkedin: "https://www.linkedin.com/company/aramcodigital", stage: "Growth", sector: ["Data & Infrastructure"], city: "Dhahran", description: "Digital transformation arm of Saudi Aramco.", careers_url: "https://aramcodigital.com" },
  { slug: "aramco-ventures", name: "Aramco Ventures", website: "https://aramcoventures.com", linkedin: "https://www.linkedin.com/company/aramcoventures", stage: "Growth", sector: ["Data & Infrastructure"], city: "Dhahran", description: "Corporate venture capital of Saudi Aramco.", careers_url: "https://aramcoventures.com" },

  // ===== FINTECH =====
  { slug: "hala", name: "HALA", website: "https://hala.com", linkedin: "https://www.linkedin.com/company/haborone", stage: "Series B", sector: ["Fintech"], city: "Riyadh", description: "Embedded payments for small businesses.", careers_url: "https://hala.com" },
  { slug: "erad", name: "Erad", website: "https://erad.co", linkedin: "https://www.linkedin.com/company/erad-co", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Financial infrastructure for businesses.", careers_url: "https://erad.co" },
  { slug: "aajil", name: "Aajil.sa", website: "https://aajil.sa", linkedin: "https://www.linkedin.com/company/aajil", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Formerly Buildnow. Instant payment solutions.", careers_url: "https://aajil.sa" },
  { slug: "lawazem", name: "LAWAZEM", website: "https://lawazem.io", linkedin: "https://www.linkedin.com/company/lawazem", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Procurement and supply chain financing.", careers_url: "https://lawazem.io" },
  { slug: "sindbad-tech", name: "Sindbad.Tech", website: "https://sindbad.tech", linkedin: "https://www.linkedin.com/company/sindbad-tech", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Financial technology for cross-border payments.", careers_url: "https://sindbad.tech" },
  { slug: "tamam", name: "Tamam", website: "https://tamam.sa", linkedin: "https://www.linkedin.com/company/tamam-financing", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Nano-lending and micro-financing.", careers_url: "https://tamam.sa" },
  { slug: "d360", name: "D360 Bank", website: "https://d360.com", linkedin: "https://www.linkedin.com/company/d360bank", stage: "Growth", sector: ["Fintech"], city: "Riyadh", description: "Saudi digital-only bank.", careers_url: "https://d360.com" },
  { slug: "lean-technologies", name: "Lean Technologies", website: "https://leantech.me", linkedin: "https://www.linkedin.com/company/leantechnologies", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Open banking API for MENA.", careers_url: "https://leantech.me" },
  { slug: "safqah", name: "Safqah Capital", website: "https://safqah.com", linkedin: "https://www.linkedin.com/company/safqah", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI credit assessment for real estate.", careers_url: "https://safqah.com" },
  { slug: "oumla", name: "Oumla", website: "https://oumla.com", linkedin: "https://www.linkedin.com/company/oumla", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Payment infrastructure for MENA.", careers_url: "https://oumla.com" },
  { slug: "tarmeez", name: "Tarmeez Capital", website: "https://tarmeez.capital", linkedin: "https://www.linkedin.com/company/tarmeez-capital", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Alternative investment platform.", careers_url: "https://tarmeez.capital" },

  // ===== E-COMMERCE & RETAIL TECH =====
  { slug: "zid", name: "Zid", website: "https://zid.sa", linkedin: "https://www.linkedin.com/company/zidsa", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "E-commerce enablement platform.", careers_url: "https://zid.sa" },
  { slug: "syarah", name: "Syarah", website: "https://syarah.com", linkedin: "https://www.linkedin.com/company/syarah", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Online car marketplace.", careers_url: "https://syarah.com" },
  { slug: "soum", name: "Soum", website: "https://soum.sa", linkedin: "https://www.linkedin.com/company/soum", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Marketplace for used electronics.", careers_url: "https://soum.sa" },
  { slug: "fordeal", name: "Fordeal", website: "https://fordeal.com", linkedin: "https://www.linkedin.com/company/fordeal", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Cross-border fashion e-commerce.", careers_url: "https://fordeal.com" },
  { slug: "sary", name: "Sary", website: "https://sary.sa", linkedin: "https://www.linkedin.com/company/trysary", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "B2B wholesale ordering marketplace.", careers_url: "https://apply.workable.com/sary/" },
  { slug: "nana", name: "NANA", website: "https://nana.sa", linkedin: "https://www.linkedin.com/company/nanasa", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Grocery delivery and dark stores.", careers_url: "https://nana.sa" },
  { slug: "rewaa", name: "Rewaa", website: "https://rewaa.com", linkedin: "https://www.linkedin.com/company/rewaa", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Inventory and POS for retailers.", careers_url: "https://rewaa.com" },
  { slug: "gathern", name: "Gathern", website: "https://gathern.co", linkedin: "https://www.linkedin.com/company/gathern", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Vacation rental marketplace.", careers_url: "https://gathern.co" },
  { slug: "blink-co", name: "Blink Co Technologies", website: "https://blink.sa", linkedin: "https://www.linkedin.com/company/blink-co", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Quick commerce and instant delivery.", careers_url: "https://blink.sa" },
  { slug: "retailo", name: "Retailo", website: "https://retailo.co", linkedin: "https://www.linkedin.com/company/retailo", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "B2B marketplace for retailers.", careers_url: "https://retailo.co" },

  // ===== FOODTECH & DELIVERY =====
  { slug: "foodics", name: "Foodics", website: "https://www.foodics.com", linkedin: "https://www.linkedin.com/company/foodics", stage: "Series B", sector: ["Foodtech"], city: "Riyadh", description: "Restaurant management and POS platform.", careers_url: "https://apply.workable.com/foodics/" },
  { slug: "jahez", name: "Jahez", website: "https://jahez.net", linkedin: "https://www.linkedin.com/company/jahez", stage: "Growth", sector: ["Foodtech"], city: "Riyadh", description: "Food delivery, listed on Tadawul.", careers_url: "https://jahez.net" },
  { slug: "grove", name: "Grove", website: "https://grove.sa", linkedin: "https://www.linkedin.com/company/grove-sa", stage: "Seed", sector: ["Foodtech"], city: "Riyadh", description: "Farm-to-table fresh food delivery.", careers_url: "https://grove.sa" },

  // ===== LOGISTICS & SUPPLY CHAIN =====
  { slug: "trukker", name: "TruKKer", website: "https://trukker.com", linkedin: "https://www.linkedin.com/company/trukker", stage: "Series B", sector: ["Logistics"], city: "Riyadh", description: "Digital freight marketplace.", careers_url: "https://trukker.com" },
  { slug: "redbox", name: "RedBox", website: "https://redbox.sa", linkedin: "https://www.linkedin.com/company/redbox-sa", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Smart locker delivery solutions.", careers_url: "https://redbox.sa" },
  { slug: "dlvr", name: "DLVR", website: "https://dlvr.sa", linkedin: "https://www.linkedin.com/company/dlvr-sa", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Last-mile delivery optimization.", careers_url: "https://dlvr.sa" },
  { slug: "shift", name: "Shift", website: "https://shift.sa", linkedin: "https://www.linkedin.com/company/shift-sa", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Supply chain technology platform.", careers_url: "https://shift.sa" },

  // ===== EDTECH =====
  { slug: "classera", name: "Classera", website: "https://classera.com", linkedin: "https://www.linkedin.com/company/classera", stage: "Series B", sector: ["Edtech"], city: "Riyadh", description: "E-learning platform for schools.", careers_url: "https://classera.com" },
  { slug: "faheem", name: "Faheem", website: "https://faheem.sa", linkedin: "https://www.linkedin.com/company/faheem", stage: "Seed", sector: ["Edtech"], city: "Riyadh", description: "AI-powered learning platform.", careers_url: "https://faheem.sa" },
  { slug: "labayh", name: "Labayh", website: "https://labayh.net", linkedin: "https://www.linkedin.com/company/labayh", stage: "Series A", sector: ["Edtech"], city: "Riyadh", description: "Mental health and wellness platform.", careers_url: "https://labayh.net" },
  { slug: "aanaab", name: "Aanaab", website: "https://aanaab.com", linkedin: "https://www.linkedin.com/company/aanaab", stage: "Seed", sector: ["Edtech"], city: "Riyadh", description: "Educational technology platform.", careers_url: "https://aanaab.com" },
  { slug: "dawatech", name: "Dawatech", website: "https://dawatech.com", linkedin: "https://www.linkedin.com/company/dawatech", stage: "Seed", sector: ["Edtech"], city: "Riyadh", description: "Pharmacy management technology.", careers_url: "https://dawatech.com" },

  // ===== HEALTHTECH & BIOTECH =====
  { slug: "cura", name: "Cura", website: "https://cura.healthcare", linkedin: "https://www.linkedin.com/company/cura-healthcare", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Telehealth and virtual care platform.", careers_url: "https://cura.healthcare" },
  { slug: "nabta-health", name: "Nabta Health", website: "https://nabtahealth.com", linkedin: "https://www.linkedin.com/company/nabta-health", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "Women's health technology platform.", careers_url: "https://nabtahealth.com" },
  { slug: "healtec", name: "HealTec", website: "https://healtec.sa", linkedin: "https://www.linkedin.com/company/healtec", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "Healthcare technology solutions.", careers_url: "https://healtec.sa" },

  // ===== ENTERPRISE SOFTWARE & SAAS =====
  { slug: "jisr", name: "Jisr", website: "https://jisr.net", linkedin: "https://www.linkedin.com/company/jisr", stage: "Series A", sector: ["SaaS"], city: "Riyadh", description: "HR and payroll management platform.", careers_url: "https://jisr.net" },
  { slug: "zenhr", name: "ZenHR", website: "https://zenhr.com", linkedin: "https://www.linkedin.com/company/zenhr", stage: "Series A", sector: ["SaaS"], city: "Riyadh", description: "Cloud HR software for MENA.", careers_url: "https://zenhr.com" },
  { slug: "bayzat", name: "Bayzat", website: "https://bayzat.com", linkedin: "https://www.linkedin.com/company/bayzat", stage: "Series B", sector: ["SaaS"], city: "Riyadh", description: "HR, payroll, and insurance automation.", careers_url: "https://bayzat.com" },
  { slug: "elm", name: "Elm", website: "https://elm.sa", linkedin: "https://www.linkedin.com/company/elm", stage: "Growth", sector: ["SaaS"], city: "Riyadh", description: "Digital government services platform.", careers_url: "https://career.elm.sa/elm" },
  { slug: "tam", name: "TAM", website: "https://tam.sa", linkedin: "https://www.linkedin.com/company/tam-sa", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Development and digital product studio.", careers_url: "https://tam.sa" },
  { slug: "engagesoft", name: "Engagesoft", website: "https://engagesoft.com", linkedin: "https://www.linkedin.com/company/engagesoft", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Employee engagement analytics.", careers_url: "https://engagesoft.com" },

  // ===== PROPTECH =====
  { slug: "rize", name: "Rize", website: "https://rize.sa", linkedin: "https://www.linkedin.com/company/rize-sa", stage: "Series A", sector: ["Proptech"], city: "Riyadh", description: "Rent-now-pay-later platform.", careers_url: "https://rize.sa" },
  { slug: "oto", name: "Oto", website: "https://oto.sa", linkedin: "https://www.linkedin.com/company/oto-sa", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Property management and real estate tech.", careers_url: "https://oto.sa" },

  // ===== ROBOTICS & AUTOMATION =====
  { slug: "nala-robotics", name: "Nala Robotics", website: "https://nalarobotics.com", linkedin: "https://www.linkedin.com/company/nala-robotics", stage: "Series A", sector: ["Robotics"], city: "Riyadh", description: "Autonomous kitchen and food robotics.", careers_url: "https://nalarobotics.com" },
  { slug: "gmt-robotics", name: "GMT Robotics", website: "https://gmtrobotics.com", linkedin: "https://www.linkedin.com/company/gmt-robotics", stage: "Seed", sector: ["Robotics"], city: "Riyadh", description: "Industrial robotics solutions.", careers_url: "https://gmtrobotics.com" },
  { slug: "gaussian-robotics", name: "Gaussian Robotics", website: "https://gaussianrobotics.com", linkedin: "https://www.linkedin.com/company/gaussian-robotics", stage: "Growth", sector: ["Robotics"], city: "Riyadh", description: "Commercial cleaning and service robots.", careers_url: "https://gaussianrobotics.com" },
  { slug: "proven-robotics", name: "PROVEN Robotics", website: "https://provenrobotics.ai", linkedin: "https://www.linkedin.com/company/proven-robotics", stage: "Growth", sector: ["Robotics"], city: "Riyadh", description: "Robotics solutions for Saudi enterprises.", careers_url: "https://provenrobotics.ai" },
  { slug: "tulip-technologies", name: "Tulip Technologies", website: "https://tulip.sa", linkedin: "https://www.linkedin.com/company/tulip-technologies", stage: "Seed", sector: ["Robotics"], city: "Riyadh", description: "Automation and smart manufacturing.", careers_url: "https://tulip.sa" },
  { slug: "iconnect-robotics", name: "iConnect Robotics", website: "https://iconnectrobotics.com", linkedin: "https://www.linkedin.com/company/iconnect-robotics", stage: "Seed", sector: ["Robotics"], city: "Riyadh", description: "Connected robotics for logistics.", careers_url: "https://iconnectrobotics.com" },
  { slug: "aerial-solutions", name: "Aerial Solutions", website: "https://aerial.sa", linkedin: "https://www.linkedin.com/company/aerial-solutions", stage: "Seed", sector: ["Robotics"], city: "Riyadh", description: "Drone and aerial robotics company.", careers_url: "https://aerial.sa" },
  { slug: "saudi-robotics-club", name: "Saudi Robotics Club", website: "https://saudirobotics.org", linkedin: "https://www.linkedin.com/company/saudi-robotics-club", stage: "Growth", sector: ["Robotics"], city: "Riyadh", description: "National robotics community and competitions.", careers_url: "https://saudirobotics.org" },

  // ===== VISION 2030 TECH PROJECTS =====
  { slug: "neom-tech", name: "NEOM Tech & Digital", website: "https://neom.com", linkedin: "https://www.linkedin.com/company/neom", stage: "Growth", sector: ["Vision 2030"], city: "NEOM", description: "Technology arm of the NEOM megaproject.", careers_url: "https://neom.com/en-us/careers" },
  { slug: "alat", name: "Alat", website: "https://alat.sa", linkedin: "https://www.linkedin.com/company/alat-saudi", stage: "Growth", sector: ["Vision 2030"], city: "Riyadh", description: "Saudi electronics and tech manufacturing hub.", careers_url: "https://alat.sa" },
  { slug: "riyadh-air", name: "Riyadh Air", website: "https://riyadhair.com", linkedin: "https://www.linkedin.com/company/riyadhair", stage: "Growth", sector: ["Vision 2030"], city: "Riyadh", description: "Saudi's new digital-first airline.", careers_url: "https://riyadhair.com/careers" },
  { slug: "ceer", name: "Ceer Motors", website: "https://ceer.sa", linkedin: "https://www.linkedin.com/company/ceer-motors", stage: "Growth", sector: ["Vision 2030"], city: "Riyadh", description: "Saudi electric vehicle manufacturer.", careers_url: "https://ceer.sa" },

  // ===== DATA & INFRASTRUCTURE =====
  { slug: "sdaia", name: "SDAIA", website: "https://sdaia.gov.sa", linkedin: "https://www.linkedin.com/company/sdaia", logo_override: "https://www.google.com/s2/favicons?domain=sdaia.gov.sa&sz=128", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Saudi Data and AI Authority driving national AI strategy.", careers_url: "https://sdaia.gov.sa/en/SDAIA/Pages/Careers.aspx" },
  { slug: "aec", name: "Advanced Electronics Company", website: "https://aec.com.sa", linkedin: "https://www.linkedin.com/company/aaborone", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Defense electronics and cybersecurity.", careers_url: "https://aec.com.sa" },
  { slug: "stc-solutions", name: "STC Solutions", website: "https://stcs.com.sa", linkedin: "https://www.linkedin.com/company/stc-solutions", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Enterprise IT services and digital solutions.", careers_url: "https://stcs.com.sa" },
  { slug: "center3", name: "Center3", website: "https://center3.com", linkedin: "https://www.linkedin.com/company/center3", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Digital infrastructure and data center hub.", careers_url: "https://center3.com" },

  // ===== DEEP TECH & EMERGING =====
  { slug: "unitx", name: "UnitX", website: "https://unitx.com", linkedin: "https://www.linkedin.com/company/unitx", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "AI-powered visual inspection technology.", careers_url: "https://unitx.com" },
  { slug: "falconviz", name: "FalconViz", website: "https://falconviz.com", linkedin: "https://www.linkedin.com/company/falconviz", stage: "Series A", sector: ["Deep Tech"], city: "Dammam", description: "Drone mapping and 3D modeling.", careers_url: "https://falconviz.com" },
  { slug: "squadio", name: "Squadio", website: "https://squadio.com", linkedin: "https://www.linkedin.com/company/squadio", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Remote developer hiring platform.", careers_url: "https://squadio.com" },
  { slug: "logexa", name: "Logexa", website: "https://logexa.com", linkedin: "https://www.linkedin.com/company/logexa", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Warehousing and fulfillment tech.", careers_url: "https://logexa.com" },
  { slug: "kliq", name: "KLIQ", website: "https://kliq.sa", linkedin: "https://www.linkedin.com/company/kliq-sa", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Creator economy and influencer platform.", careers_url: "https://kliq.sa" },
  { slug: "rekaz", name: "Rekaz", website: "https://rekaz.io", linkedin: "https://www.linkedin.com/company/rekaz", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Business setup and compliance platform.", careers_url: "https://rekaz.io" },
  { slug: "zetta-technologies", name: "Zetta Technologies", website: "https://zetta.sa", linkedin: "https://www.linkedin.com/company/zetta-technologies", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Advanced technology solutions.", careers_url: "https://zetta.sa" },
  { slug: "prypco", name: "PRYPCO", website: "https://prypco.com", linkedin: "https://www.linkedin.com/company/prypco", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Real estate investment technology.", careers_url: "https://prypco.com" },
  { slug: "ejadah", name: "Ejadah", website: "https://ejadah.sa", linkedin: "https://www.linkedin.com/company/ejadah-sa", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Innovation and technology development.", careers_url: "https://ejadah.sa" },

  // ===== CYBERSECURITY & BLOCKCHAIN =====
  { slug: "adalahchain", name: "AdalahChain", website: "https://adalahchain.com", linkedin: "https://www.linkedin.com/company/adalahchain", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Blockchain-powered legal tech.", careers_url: "https://adalahchain.com" },
  { slug: "quantum-robotics", name: "Quantum Robotics", website: "https://quantumrobotics.sa", linkedin: "https://www.linkedin.com/company/quantum-robotics-sa", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Quantum computing and security solutions.", careers_url: "https://quantumrobotics.sa" },

  // ===== IOT & SMART SYSTEMS =====
  { slug: "nighat", name: "Nighat", website: "https://nighat.sa", linkedin: "https://www.linkedin.com/company/nighat", stage: "Seed", sector: ["IoT"], city: "Riyadh", description: "AgriTech AI and smart farming.", careers_url: "https://nighat.sa" },
  { slug: "glamera", name: "Glamera", website: "https://glamera.com", linkedin: "https://www.linkedin.com/company/glamera", stage: "Series A", sector: ["IoT"], city: "Riyadh", description: "Beauty and salon booking platform.", careers_url: "https://glamera.com" },

  // ===== MEDIA & CONTENT TECH =====
  { slug: "telfaz11", name: "Telfaz11", website: "https://telfaz11.com", linkedin: "https://www.linkedin.com/company/telfaz11", stage: "Growth", sector: ["Media"], city: "Riyadh", description: "Saudi digital content and entertainment studio.", careers_url: "https://telfaz11.com" },

  // ===== ADDITIONAL TECH STARTUPS =====
  { slug: "atam", name: "ATAM Digital Solutions", website: "https://atam.careers", linkedin: "https://www.linkedin.com/company/atam", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Builds autonomous defense systems.", careers_url: "https://atam.careers" },
  { slug: "atam-kiosks", name: "ATAM Kiosks", website: "https://atam.careers", linkedin: "https://www.linkedin.com/company/atam-kiosks", stage: "Seed", sector: ["Deep Tech"], city: "Riyadh", description: "Smart kiosk and self-service technology.", careers_url: "https://atam.careers" },
  { slug: "adaptive-techsoft", name: "Adaptive TechSoft", website: "https://adaptivetechsoft.com", linkedin: "https://www.linkedin.com/company/adaptive-techsoft", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Custom software development.", careers_url: "https://adaptivetechsoft.com" },
  { slug: "al-rushaid-technologies", name: "Al-Rushaid Technologies", website: "https://alrushaid.com", linkedin: "https://www.linkedin.com/company/al-rushaid", stage: "Growth", sector: ["Data & Infrastructure"], city: "Dammam", description: "Industrial technology and engineering.", careers_url: "https://alrushaid.com" },
  { slug: "enjaz-ai", name: "Enjaz AI Solutions", website: "https://enjaz.ai", linkedin: "https://www.linkedin.com/company/enjaz-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Enterprise AI solutions.", careers_url: "https://enjaz.ai" },
  { slug: "noor-ai", name: "Noor AI Technologies", website: "https://noor.ai", linkedin: "https://www.linkedin.com/company/noor-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered Arabic content technology.", careers_url: "https://noor.ai" },
  { slug: "alfanar-digital", name: "Alfanar Digital Solutions", website: "https://alfanar.com", linkedin: "https://www.linkedin.com/company/alfanar", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Digital solutions for industrial sectors.", careers_url: "https://alfanar.com" },
  { slug: "visiontech-ai", name: "VisionTech AI Systems", website: "https://visiontech.ai", linkedin: "https://www.linkedin.com/company/visiontech-ai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Computer vision AI systems.", careers_url: "https://visiontech.ai" },
  { slug: "ozvid-technologies", name: "OZVID Technologies", website: "https://ozvid.com", linkedin: "https://www.linkedin.com/company/ozvid-technologies", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Software development and IT services.", careers_url: "https://ozvid.com" },
  { slug: "bytestechnolab", name: "BytesTechnoLab", website: "https://bytestechnolab.com", linkedin: "https://www.linkedin.com/company/bytestechnolab", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Mobile and web app development.", careers_url: "https://bytestechnolab.com" },
  { slug: "jiye-technologies", name: "Jiye Technologies", website: "https://jiye.ai", linkedin: "https://www.linkedin.com/company/jiye-technologies", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered supply chain solutions.", careers_url: "https://jiye.ai" },
  { slug: "munwra-dates", name: "Munwra Dates", website: "https://munwra.com", linkedin: "https://www.linkedin.com/company/munwra", stage: "Seed", sector: ["IoT"], city: "Madinah", description: "Smart agriculture for date farming.", careers_url: "https://munwra.com" },
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
