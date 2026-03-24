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
  { slug: "rasan", name: "Rasan", website: "https://rasan.com", linkedin: "https://www.linkedin.com/company/rasanit", stage: "Series B", sector: ["Fintech"], city: "Riyadh", description: "Insurance and payment aggregation infrastructure.", careers_url: "https://rasan.com/careers" },
  { slug: "yamm", name: "Yamm", website: "https://yamm.finance", linkedin: "https://www.linkedin.com/company/yammfinance", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Automated billing and payment collection.", careers_url: "https://yamm.finance" },
  { slug: "capify", name: "Capify", website: "https://capify.sa", linkedin: "https://www.linkedin.com/company/capifysa", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "SME lending and working capital.", careers_url: "https://capify.sa" },
  { slug: "nayla", name: "NAYLA", website: "https://nayla.com.sa", linkedin: "https://www.linkedin.com/company/naylasa", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Buy-now-pay-later for SME procurement.", careers_url: "https://nayla.com.sa" },
  { slug: "lite", name: "Lite", website: "https://lite.sa", linkedin: "https://www.linkedin.com/company/litesa", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Neobanking for Saudi freelancers and gig workers.", careers_url: "https://lite.sa" },
  { slug: "rasmal", name: "RasMal", website: "https://rasmal.com", linkedin: "https://www.linkedin.com/company/rasmal", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Crowd-lending platform for SMEs.", careers_url: "https://rasmal.com" },
  { slug: "bynow", name: "Bynow", website: "https://bynow.sa", linkedin: "https://www.linkedin.com/company/bynowsa", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Buy-now-pay-later for e-commerce.", careers_url: "https://bynow.sa" },
  { slug: "spore", name: "Spore", website: "https://spore.sa", linkedin: "https://www.linkedin.com/company/sporesa", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Embedded finance infrastructure.", careers_url: "https://spore.sa" },
  { slug: "edana", name: "EDANA", website: "https://edana.sa", linkedin: "https://www.linkedin.com/company/edanasa", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Digital asset management platform.", careers_url: "https://edana.sa" },
  { slug: "collecto", name: "Collecto", website: "https://collecto.sa", linkedin: "https://www.linkedin.com/company/collectosa", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI-powered debt collection.", careers_url: "https://collecto.sa" },
  { slug: "madkhol", name: "Madkhol", website: "https://madkhol.com", linkedin: "https://www.linkedin.com/company/madkhol", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Investment and wealth management.", careers_url: "https://madkhol.com" },
  { slug: "ejar", name: "EJAR", website: "https://ejar.sa", linkedin: "https://www.linkedin.com/company/ejar-sa", stage: "Growth", sector: ["Fintech"], city: "Riyadh", description: "Government rental management platform.", careers_url: "https://ejar.sa" },
  { slug: "stitch-money", name: "Stitch", website: "https://stitch.money", linkedin: "https://www.linkedin.com/company/stitchmoney", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "Payment infrastructure and open finance.", careers_url: "https://stitch.money/careers" },
  { slug: "salesfine", name: "Salesfine", website: "https://salesfine.com", linkedin: "https://www.linkedin.com/company/salesfine", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "POS financing for Saudi merchants.", careers_url: "https://salesfine.com" },
  { slug: "abwab-ai", name: "Abwab.ai", website: "https://abwab.ai", linkedin: "https://www.linkedin.com/company/abwab-ai", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI-powered financial access platform.", careers_url: "https://abwab.ai" },

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
  { slug: "omniful", name: "Omniful", website: "https://omniful.com", linkedin: "https://www.linkedin.com/company/omniful", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Cloud-native warehouse and fulfillment OS.", careers_url: "https://omniful.com/careers" },
  { slug: "fitting", name: "FITTING", website: "https://fitting.sa", linkedin: "https://www.linkedin.com/company/fittingsa", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Virtual try-on for fashion e-commerce.", careers_url: "https://fitting.sa" },
  { slug: "silq", name: "SILQ", website: "https://silq.sa", linkedin: "https://www.linkedin.com/company/silqsa", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Luxury resale marketplace.", careers_url: "https://silq.sa" },
  { slug: "ziadah", name: "Ziadah", website: "https://ziadah.com", linkedin: "https://www.linkedin.com/company/ziadahcom", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "B2B marketplace for FMCG.", careers_url: "https://ziadah.com" },
  { slug: "brkz", name: "BRKZ", website: "https://brkz.com", linkedin: "https://www.linkedin.com/company/brkz", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Construction materials marketplace.", careers_url: "https://brkz.com" },
  { slug: "doos", name: "Doos", website: "https://doos.sa", linkedin: "https://www.linkedin.com/company/doossa", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Social commerce platform.", careers_url: "https://doos.sa" },

  // ===== FOODTECH & DELIVERY =====
  { slug: "foodics", name: "Foodics", website: "https://www.foodics.com", linkedin: "https://www.linkedin.com/company/foodics", stage: "Series B", sector: ["Foodtech"], city: "Riyadh", description: "Restaurant management and POS platform.", careers_url: "https://apply.workable.com/foodics/" },
  { slug: "jahez", name: "Jahez", website: "https://jahez.net", linkedin: "https://www.linkedin.com/company/jahez", stage: "Growth", sector: ["Foodtech"], city: "Riyadh", description: "Food delivery, listed on Tadawul.", careers_url: "https://jahez.net" },

  // ===== LOGISTICS =====
  { slug: "trukker", name: "TruKKer", website: "https://trukker.com", linkedin: "https://www.linkedin.com/company/trukker", stage: "Series B", sector: ["Logistics"], city: "Riyadh", description: "Digital freight marketplace.", careers_url: "https://trukker.com" },
  { slug: "invygo", name: "Invygo", website: "https://invygo.com", linkedin: "https://www.linkedin.com/company/invygo", stage: "Series A", sector: ["Logistics"], city: "Riyadh", description: "Car subscription and flexible ownership.", careers_url: "https://invygo.com" },
  { slug: "torod", name: "Torod", website: "https://torod.com", linkedin: "https://www.linkedin.com/company/torodcom", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "E-commerce shipping and fulfillment.", careers_url: "https://torod.com" },
  { slug: "leejak", name: "Leejak", website: "https://leejak.sa", linkedin: "https://www.linkedin.com/company/leejak", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Last-mile delivery for e-commerce.", careers_url: "https://leejak.sa" },
  { slug: "picship", name: "Picship", website: "https://picship.sa", linkedin: "https://www.linkedin.com/company/picship", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Package shipping comparison and booking.", careers_url: "https://picship.sa" },
  { slug: "supplai", name: "Supplai", website: "https://supplai.sa", linkedin: "https://www.linkedin.com/company/supplai", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "AI-powered procurement for F&B.", careers_url: "https://supplai.sa" },

  // ===== EDTECH =====
  { slug: "classera", name: "Classera", website: "https://classera.com", linkedin: "https://www.linkedin.com/company/classera", stage: "Series B", sector: ["Edtech"], city: "Riyadh", description: "E-learning platform for schools.", careers_url: "https://classera.com" },
  { slug: "labayh", name: "Labayh", website: "https://labayh.net", linkedin: "https://www.linkedin.com/company/labayh", stage: "Series A", sector: ["Edtech"], city: "Riyadh", description: "Mental health and wellness platform.", careers_url: "https://labayh.net" },

  // ===== HEALTHTECH =====
  { slug: "cura", name: "Cura", website: "https://cura.healthcare", linkedin: "https://www.linkedin.com/company/cura-healthcare", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Telehealth and virtual care platform.", careers_url: "https://cura.healthcare" },
  { slug: "sahl-ai", name: "Sahl.ai", website: "https://sahl.ai", linkedin: "https://www.linkedin.com/company/getsahl", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "AI medical copilot for Arabic-speaking clinicians.", careers_url: "https://sahl.ai" },
  { slug: "aumet", name: "Aumet", website: "https://aumet.com", linkedin: "https://www.linkedin.com/company/aumet", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Pharma B2B marketplace.", careers_url: "https://aumet.com" },
  { slug: "reporty", name: "Reporty", website: "https://reporty.ai", linkedin: "https://www.linkedin.com/company/reportyai", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "AI radiology reporting.", careers_url: "https://reporty.ai" },
  { slug: "kilow", name: "Kilow", website: "https://kilow.sa", linkedin: "https://www.linkedin.com/company/kilow", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "Digital weight management program.", careers_url: "https://kilow.sa" },

  // ===== SAAS =====
  { slug: "jisr", name: "Jisr", website: "https://jisr.net", linkedin: "https://www.linkedin.com/company/jisr", stage: "Series A", sector: ["SaaS"], city: "Riyadh", description: "HR and payroll management platform.", careers_url: "https://jisr.net" },
  { slug: "zenhr", name: "ZenHR", website: "https://zenhr.com", linkedin: "https://www.linkedin.com/company/zenhr", stage: "Series A", sector: ["SaaS"], city: "Riyadh", description: "Cloud HR software for MENA.", careers_url: "https://zenhr.com" },
  { slug: "bayzat", name: "Bayzat", website: "https://bayzat.com", linkedin: "https://www.linkedin.com/company/bayzat", stage: "Series B", sector: ["SaaS"], city: "Riyadh", description: "HR, payroll, and insurance automation.", careers_url: "https://bayzat.com" },
  { slug: "elm", name: "Elm", website: "https://elm.sa", linkedin: "https://www.linkedin.com/company/elm", stage: "Growth", sector: ["SaaS"], city: "Riyadh", description: "Digital government services platform.", careers_url: "https://career.elm.sa/elm" },
  { slug: "mawj-ai", name: "Mawj.ai", website: "https://mawj.ai", linkedin: "https://www.linkedin.com/company/mawjai", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI voice and speech technology for Arabic.", careers_url: "https://mawj.ai" },
  { slug: "sighti", name: "Sighti.ai", website: "https://sighti.ai", linkedin: "https://www.linkedin.com/company/sighti", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Computer vision for retail analytics.", careers_url: "https://sighti.ai" },
  { slug: "velents", name: "Velents.ai", website: "https://velents.com", linkedin: "https://www.linkedin.com/company/velents", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI-powered video interviewing and hiring.", careers_url: "https://velents.com" },
  { slug: "ballurh", name: "Ballurh", website: "https://ballurh.com", linkedin: "https://www.linkedin.com/company/ballurh", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI-powered influencer marketing platform.", careers_url: "https://ballurh.com" },
  { slug: "intella-ai", name: "Intella", website: "https://intella.ai", linkedin: "https://www.linkedin.com/company/intella-ai", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Intelligent automation platform.", careers_url: "https://intella.ai" },
  { slug: "rased", name: "Rased", website: "https://rased.com", linkedin: "https://www.linkedin.com/company/rasedcom", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Real-time media monitoring and analytics.", careers_url: "https://rased.com" },
  { slug: "engagesoft", name: "Engagesoft", website: "https://engagesoft.com", linkedin: "https://www.linkedin.com/company/engagesoftco", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Employee engagement analytics.", careers_url: "https://engagesoft.com/careers" },
  { slug: "vminds", name: "vMinds.ai", website: "https://vminds.ai", linkedin: "https://www.linkedin.com/company/vminds", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI automation for enterprise operations.", careers_url: "https://vminds.ai" },
  { slug: "xbites", name: "xBites", website: "https://xbites.ai", linkedin: "https://www.linkedin.com/company/xbites", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI data analytics for restaurants.", careers_url: "https://xbites.ai" },
  { slug: "string-tech", name: "String", website: "https://string.sa", linkedin: "https://www.linkedin.com/company/stringsa", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Connected worker platform for field teams.", careers_url: "https://string.sa" },
  { slug: "dar-tech", name: "Dar", website: "https://dar.io", linkedin: "https://www.linkedin.com/company/dario-tech", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Digital workspace and productivity tools.", careers_url: "https://dar.io" },
  { slug: "throughput", name: "Throughput", website: "https://throughput.world", linkedin: "https://www.linkedin.com/company/throughput-inc", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI-powered supply chain analytics.", careers_url: "https://throughput.world" },
  { slug: "robonito", name: "Robonito", website: "https://robonito.com", linkedin: "https://www.linkedin.com/company/robonito", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI testing automation for web apps.", careers_url: "https://robonito.com" },
  { slug: "tabsense", name: "TABsense", website: "https://tabsense.com", linkedin: "https://www.linkedin.com/company/tabsense", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Smart POS and payment devices.", careers_url: "https://tabsense.com" },

  // ===== PROPTECH =====
  { slug: "rize", name: "Rize", website: "https://rize.sa", linkedin: "https://www.linkedin.com/company/rize-sa", stage: "Series A", sector: ["Proptech"], city: "Riyadh", description: "Rent-now-pay-later platform.", careers_url: "https://rize.sa" },
  { slug: "mnzl", name: "Mnzl", website: "https://mnzl.com", linkedin: "https://www.linkedin.com/company/mnzl", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Short-term rental management.", careers_url: "https://mnzl.com" },
  { slug: "livedin", name: "Livedin", website: "https://livedin.sa", linkedin: "https://www.linkedin.com/company/livedinsa", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Property management and tenant experience.", careers_url: "https://livedin.sa" },

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
  { slug: "vuz", name: "Vuz", website: "https://vuz.com", linkedin: "https://www.linkedin.com/company/vaborone", stage: "Series B", sector: ["Media"], city: "Riyadh", description: "Immersive 360 video experiences platform.", careers_url: "https://vuz.com" },
  { slug: "kliq", name: "KLIQ", website: "https://kliq.sa", linkedin: "https://www.linkedin.com/company/kliqsa", stage: "Seed", sector: ["Media"], city: "Riyadh", description: "Creator economy and influencer platform.", careers_url: "https://kliq.sa" },
  { slug: "halo-media", name: "Halo", website: "https://halo.sa", linkedin: "https://www.linkedin.com/company/halosa", stage: "Seed", sector: ["Media"], city: "Riyadh", description: "Digital advertising platform.", careers_url: "https://halo.sa" },

  // ===== DEFENSE & AEROSPACE =====
  { slug: "atam", name: "ATAM", website: "https://atam.careers", linkedin: "https://www.linkedin.com/company/atam", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Builds autonomous defense systems.", careers_url: "https://atam.careers" },
  { slug: "neo-space", name: "Neo Space Group", website: "https://neospacegroup.com", linkedin: "https://www.linkedin.com/company/neospacegroup", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Builds satellite and space technology.", careers_url: "https://neospacegroup.com" },

  // ===== CYBERSECURITY =====
  { slug: "cognna", name: "Cognna", website: "https://www.cognna.com", linkedin: "https://www.linkedin.com/company/cognna", stage: "Series A", sector: ["Cybersecurity"], city: "Riyadh", description: "AI-powered SOC automation and advanced threat detection.", careers_url: "https://www.cognna.com" },
  { slug: "solidrange", name: "Solidrange", website: "https://solidrange.com", linkedin: "https://www.linkedin.com/company/solidrange", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Automates cybersecurity compliance (GRC).", careers_url: "https://solidrange.com" },
  { slug: "dphish", name: "dPhish", website: "https://dphish.com", linkedin: "https://www.linkedin.com/company/dphish", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Detects and prevents phishing attacks.", careers_url: "https://dphish.com" },
  { slug: "cyberni", name: "Cyberni", website: "https://cyberni.com", linkedin: "https://www.linkedin.com/company/cyberni", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "AI-driven cybersecurity for Saudi enterprises.", careers_url: "https://cyberni.com" },

  // ===== GOVTECH =====
  { slug: "governata", name: "Governata", website: "https://governata.com", linkedin: "https://www.linkedin.com/company/governata", stage: "Seed", sector: ["Govtech"], city: "Riyadh", description: "AI governance and compliance platform.", careers_url: "https://governata.com" },
  { slug: "takamul", name: "Takamul", website: "https://takamul.com.sa", linkedin: "https://www.linkedin.com/company/takamul", stage: "Growth", sector: ["Govtech"], city: "Riyadh", description: "Digital transformation for government.", careers_url: "https://takamul.com.sa" },

  // ===== AI (from Airtable) =====
  { slug: "cranl", name: "Cranl", website: "https://cranl.com", linkedin: "https://www.linkedin.com/company/cranl", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI research and intelligent products.", careers_url: "https://cranl.com" },
  { slug: "intelmatix", name: "Intelmatix", website: "https://intelmatix.ai", linkedin: "https://www.linkedin.com/company/intelmatix", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "AI-powered decision intelligence for enterprise.", careers_url: "https://intelmatix.ai/company-careers.html" },
  { slug: "nuwayra", name: "Nuwayra", website: "https://nuwayra.ai", linkedin: "https://www.linkedin.com/company/nuwayra", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Generative AI for government and enterprise.", careers_url: "https://nuwayra.ai" },
  { slug: "widebot", name: "WideBot", website: "https://widebot.ai", linkedin: "https://www.linkedin.com/company/widebot", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Arabic AI chatbots for governments and enterprises.", careers_url: "https://widebot.ai" },
  { slug: "wittify", name: "Wittify.ai", website: "https://wittify.ai", linkedin: "https://www.linkedin.com/company/wittify", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI agents for omnichannel customer touchpoints.", careers_url: "https://wittify.ai" },
  { slug: "infiniarc", name: "INFINIARC", website: "https://infiniarc.com", linkedin: "https://www.linkedin.com/company/infiniarc", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Builds high-performance AI servers and hardware.", careers_url: "https://infiniarc.com" },
  { slug: "sdaia-hexagon", name: "SDAIA Hexagon", website: "https://hexagon.com", linkedin: "https://www.linkedin.com/company/hexagon", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "World's largest government Tier IV data center.", careers_url: "https://hexagon.com/company/careers" },

  // ===== SAAS (from Airtable) =====
  { slug: "unifonic", name: "Unifonic", website: "https://unifonic.com", linkedin: "https://www.linkedin.com/company/unifonic", stage: "Series B", sector: ["SaaS"], city: "Riyadh", description: "AI-powered customer engagement platform (CPaaS).", careers_url: "https://jobs.unifonic.com" },
  { slug: "rukiza", name: "Rukiza", website: "https://rukiza.com", linkedin: "https://www.linkedin.com/company/rukiza", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Scheduling and document verification.", careers_url: "https://rukiza.com" },

  // ===== FINTECH (from Airtable) =====
  { slug: "sayfi", name: "SayFi", website: "https://sayfi.co", linkedin: "https://www.linkedin.com/company/sayfi", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "AI expense management for finance teams.", careers_url: "https://sayfi.co" },
  { slug: "oqood", name: "Oqood", website: "https://oqood.ai", linkedin: "https://www.linkedin.com/company/oqood", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Automates legal workflows with AI.", careers_url: "https://oqood.ai" },
  { slug: "kashon", name: "Kashon", website: "https://kashon.sa", linkedin: "https://www.linkedin.com/company/kashon", stage: "Series A", sector: ["Energy"], city: "Riyadh", description: "AI operations for fuel stations.", careers_url: "https://kashon.sa" },

  // ===== E-COMMERCE (from Airtable) =====
  { slug: "rawaa", name: "Rawaa", website: "https://rawaa.com", linkedin: "https://www.linkedin.com/company/rawaa", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Cloud POS with AI accounting for merchants.", careers_url: "https://rawaa.com" },
  { slug: "judhur", name: "Judhur", website: "https://judhur.com", linkedin: "https://www.linkedin.com/company/judhur", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Multi-channel e-commerce management.", careers_url: "https://judhur.com" },
  { slug: "jazer", name: "Jazer", website: "https://jazer.io", linkedin: "https://www.linkedin.com/company/jazer", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "AI inventory for e-commerce sellers.", careers_url: "https://jazer.io" },
  { slug: "rvin", name: "RVIN", website: "https://rvin.ai", linkedin: "https://www.linkedin.com/company/rvin", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "AI virtual employees for online stores.", careers_url: "https://rvin.ai" },

  // ===== EDUCATION =====
  { slug: "noon-academy", name: "Noon Academy", website: "https://noon.academy", linkedin: "https://www.linkedin.com/company/noonacademy", stage: "Series A", sector: ["Edtech"], city: "Riyadh", description: "Social learning and AI tutoring.", careers_url: "https://noon.academy" },

  // ===== PROPTECH =====
  { slug: "ummar", name: "Ummar", website: "https://ummar.sa", linkedin: "https://www.linkedin.com/company/ummar", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Automates rental and property management.", careers_url: "https://ummar.sa" },

  // ===== ENERGY =====
  { slug: "sadeem", name: "Sadeem", website: "https://sadeem.com", linkedin: "https://www.linkedin.com/company/sadeem", stage: "Series A", sector: ["Energy"], city: "Riyadh", description: "Environmental monitoring and smart infrastructure.", careers_url: "https://sadeem.com" },

  // ===== GEOSPATIAL =====
  { slug: "gbt", name: "GBT", website: "https://gbt.sa", linkedin: "https://www.linkedin.com/company/gbt-sa", stage: "Seed", sector: ["Geospatial"], city: "Riyadh", description: "No-code geospatial AI tools.", careers_url: "https://gbt.sa" },

  // ===== HR TECH =====
  { slug: "merit-incentives", name: "Merit Incentives", website: "https://meritincentives.com", linkedin: "https://www.linkedin.com/company/meritincentives", stage: "Growth", sector: ["HR Tech"], city: "Riyadh", description: "Employee engagement and incentives.", careers_url: "https://meritincentives.com" },

  // ===== AGRICULTURE =====
  { slug: "edama", name: "Edama", website: "https://edama.com", linkedin: "https://www.linkedin.com/company/edama", stage: "Seed", sector: ["Agriculture"], city: "Riyadh", description: "Recycles organic waste into farm products.", careers_url: "https://edama.com" },
  { slug: "mustadem", name: "Mustadem", website: "https://mustadem.com", linkedin: "https://www.linkedin.com/company/mustadem", stage: "Seed", sector: ["Agriculture"], city: "Riyadh", description: "Smart aquaculture technology.", careers_url: "https://mustadem.com" },

  // ===== GAMING =====
  { slug: "spoilz", name: "SPOILZ", website: "https://spoilz.co", linkedin: "https://www.linkedin.com/company/spoilz", stage: "Seed", sector: ["Gaming"], city: "Riyadh", description: "Gaming rewards and loyalty platform.", careers_url: "https://spoilz.co" },

  // ===== CONSTRUCTION =====
  { slug: "trubuild", name: "TruBuild", website: "https://trubuild.co", linkedin: "https://www.linkedin.com/company/trubuildco", stage: "Seed", sector: ["Construction"], city: "Riyadh", description: "Digital construction project management.", careers_url: "https://trubuild.co" },

  // ===== TRAVEL =====
  { slug: "firnas", name: "Firnas", website: "https://firnas.sa", linkedin: "https://www.linkedin.com/company/firnassa", stage: "Seed", sector: ["Travel"], city: "Riyadh", description: "AI-powered travel planning.", careers_url: "https://firnas.sa" },

  // ===== SUSTAINABILITY =====
  { slug: "petroapp", name: "PetroApp", website: "https://petroapp.me", linkedin: "https://www.linkedin.com/company/petroapp", stage: "Seed", sector: ["Energy"], city: "Riyadh", description: "Fuel station management and analytics.", careers_url: "https://petroapp.me" },

  // ===== TELECOM =====
  { slug: "open-valley", name: "OpenValley", website: "https://openvalley.sa", linkedin: "https://www.linkedin.com/company/openvalley", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Open telecom infrastructure.", careers_url: "https://openvalley.sa" },

  // ===== FOODTECH (additional) =====
  { slug: "calo", name: "CALO", website: "https://calo.app", linkedin: "https://www.linkedin.com/company/caborone", stage: "Series A", sector: ["Foodtech"], city: "Riyadh", description: "Personalized healthy meal subscriptions.", careers_url: "https://calo.app" },
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
