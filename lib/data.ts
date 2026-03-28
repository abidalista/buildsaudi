import { Company, Job } from "./types"

export const companies: Company[] = [
  // ===== UNICORNS & MAJOR TECH =====
  { slug: "ninja", name: "Ninja", website: "https://ananinja.com", linkedin: "https://www.linkedin.com/company/ananinja", stage: "Unicorn", sector: ["Logistics"], city: "Riyadh", description: "Last-mile delivery platform.", careers_url: "https://ananinja.com", founders: "Ebrahim Al-Jassim, Saud Al Qahtani, Canberk Donmez", total_raised: "$284M", team_size: "201-500", founded_year: 2022, last_round_date: "Jul 2025" },
  { slug: "tamara", name: "Tamara", website: "https://tamara.co", linkedin: "https://www.linkedin.com/company/tamara", stage: "Unicorn", sector: ["Fintech"], city: "Riyadh", description: "Buy-now-pay-later for MENA.", careers_url: "https://job-boards.eu.greenhouse.io/tamara", founders: "Abdulmajeed Alsukhan, Turki Bin Zarah, Abdulmohsen Albabtain", total_raised: "$500M+", founded_year: 2020, last_round_date: "Nov 2023" , team_size: "1000+"},
  { slug: "stc-pay", name: "STC Bank", website: "https://stcpay.com.sa", linkedin: "https://www.linkedin.com/company/stcpay", stage: "Unicorn", sector: ["Fintech"], city: "Riyadh", description: "Saudi's first digital-only bank.", careers_url: "https://stcpay.com.sa", total_raised: "$200M", founded_year: 2018, last_round_date: "2020" , founders: "Ahmed Al-Enezi", team_size: "201-500"},
  { slug: "salla", name: "Salla", website: "https://salla.com", linkedin: "https://www.linkedin.com/company/sallaapp", stage: "Unicorn", sector: ["E-commerce"], city: "Riyadh", description: "Arabic e-commerce store builder.", careers_url: "https://salla.com", total_raised: "$138.5M", founded_year: 2016, last_round_date: "2024" , founders: "Nawaf Hariri, Salman Butt", team_size: "501-1000"},

  // ===== AI & MACHINE LEARNING =====
  { slug: "humain", name: "Humain", website: "https://humain.ai", linkedin: "https://www.linkedin.com/company/humainai", stage: "Growth", sector: ["AI"], city: "Riyadh", description: "Builds AI infrastructure for Saudi Arabia.", careers_url: "https://humain.ai", total_raised: "$10B+ (PIF-backed)", founded_year: 2024 , team_size: "201-500", founders: "Tareq Amin (CEO)" },
  { slug: "lucidya", name: "Lucidya", website: "https://lucidya.com", linkedin: "https://www.linkedin.com/company/lucidya", stage: "Series B", sector: ["AI"], city: "Riyadh", description: "AI-powered customer experience management.", careers_url: "https://www.lucidya.com/careers-at-lucidya/", founders: "Abdullah Alshalabi", total_raised: "$30M", founded_year: 2015, last_round_date: "2024" , team_size: "51-200"},
  { slug: "mozn", name: "Mozn", website: "https://mozn.ai", linkedin: "https://www.linkedin.com/company/mozn", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Builds fraud detection and Arabic NLP tools.", careers_url: "https://www.mozn.ai/careers", total_raised: "$10M", founded_year: 2017, last_round_date: "2022" , founders: "Mohammed Alhussein, Khalid Al-Ghonaim, Abdullah Alsaeed", team_size: "201-500"},
  { slug: "wakecap", name: "WakeCap", website: "https://www.wakecap.com", linkedin: "https://www.linkedin.com/company/wakecap", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Smart hard hats with AI workforce tracking.", careers_url: "https://www.wakecap.com/recruitment", total_raised: "$28M", founded_year: 2018, last_round_date: "2025" , founders: "Hassan Albalawi, Ishita Sood", team_size: "51-200"},
  { slug: "deep-sa", name: "DEEP.SA", website: "https://deep.sa", linkedin: "https://www.linkedin.com/company/deepsa", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Builds localized AI solutions for Saudi.", careers_url: "https://deep.sa" , founders: "Mazen Melibari", total_raised: "$1.2M", founded_year: 2024 },
  { slug: "hazen", name: "Hazen.ai", website: "https://hazen.ai", linkedin: "https://www.linkedin.com/company/hazen-ai", stage: "Seed", sector: ["AI"], city: "Jeddah", description: "AI computer vision for traffic management.", careers_url: "https://hazen.ai/careers" , team_size: "11-50" },

  // ===== ARAMCO =====
  { slug: "aramco-digital", name: "Aramco Digital", website: "https://aramcodigital.com", linkedin: "https://www.linkedin.com/company/aramcodigital", stage: "Growth", sector: ["Data & Infrastructure"], city: "Dhahran", description: "Digital transformation arm of Saudi Aramco.", careers_url: "https://aramcodigital.com", team_size: "1000+" , founders: "Aramco subsidiary", total_raised: "Aramco-funded", founded_year: 2020 },

  // ===== FINTECH =====
  { slug: "hala", name: "HALA", website: "https://hala.com", linkedin: "https://www.linkedin.com/company/haborone", stage: "Series B", sector: ["Fintech"], city: "Riyadh", description: "Embedded payments for small businesses.", careers_url: "https://hala.com", total_raised: "$157M", founded_year: 2017, last_round_date: "Sep 2025" , founders: "Esam Alnahdi, Maher Loubieh", team_size: "501-1000"},
  { slug: "erad", name: "Erad", website: "https://erad.co", linkedin: "https://www.linkedin.com/company/erad-co", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Financial infrastructure for businesses.", careers_url: "https://erad.co", founded_year: 2021 , founders: "Salem Abu-Hammour, Faris Yaghmour, Abdulmalik Almeheini", total_raised: "$51.5M", team_size: "51-200", last_round_date: "Apr 2025"},
  { slug: "tamam", name: "Tamam", website: "https://tamam.life", linkedin: "https://www.linkedin.com/company/use-tamam", stage: "Growth", sector: ["Fintech"], city: "Riyadh", description: "Nano-lending and micro-financing.", careers_url: "https://tamam.life", founded_year: 2019, team_size: "201-500", founders: "Zain KSA subsidiary; CEO Yousef Al Musaileem", total_raised: "Undisclosed" },
  { slug: "d360", name: "D360 Bank", website: "https://d360.com", linkedin: "https://www.linkedin.com/company/d360bank", stage: "Growth", sector: ["Fintech"], city: "Riyadh", description: "Saudi digital-only bank.", careers_url: "https://d360.com", founders: "Sherif Alaa, Mai Al-Hamdan", founded_year: 2022 , total_raised: "$500M", team_size: "201-500"},
  { slug: "lean-technologies", name: "Lean Technologies", website: "https://leantech.me", linkedin: "https://www.linkedin.com/company/leantechnologies", stage: "Series B", sector: ["Fintech"], city: "Riyadh", description: "Open banking API for MENA.", careers_url: "https://leantech.me", total_raised: "$67.5M", founded_year: 2019, last_round_date: "2024" , founders: "Hisham Al-Falih, Aditya Sarkar, Ashu Gupta", team_size: "51-200"},
  { slug: "safqah", name: "Safqah Capital", website: "https://safqah.co", linkedin: "https://www.linkedin.com/company/safqah", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI credit assessment for real estate.", careers_url: "https://safqah.co" , total_raised: "$15.2M" },
  { slug: "rasan", name: "Rasan", website: "https://www.rasan.co", linkedin: "https://www.linkedin.com/company/rasanit", stage: "Growth", sector: ["Fintech"], city: "Riyadh", description: "Insurance and payment aggregation infrastructure.", careers_url: "https://www.rasan.co/en", total_raised: "$24M (pre-IPO)", founded_year: 2016 , team_size: "201-500", founders: "Moayad Alfallaj" },
  { slug: "yamm", name: "Yamm", website: "https://yamm.sa", linkedin: "https://www.linkedin.com/company/tryyamm", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Automated billing and payment collection.", careers_url: "https://yamm.sa"  },
  { slug: "nayla", name: "NAYLA", website: "https://naylafinance.com", linkedin: "https://www.linkedin.com/company/naylasa", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "SAMA-licensed digital financing for micro enterprises.", careers_url: "https://naylafinance.com", founders: "Shaqran Alyahya", total_raised: "$4M", team_size: "11-50", founded_year: 2025 },
  { slug: "rasmal", name: "RasMal", website: "https://rasmal.io", linkedin: "https://www.linkedin.com/company/rasmalinc", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Crowd-lending platform for SMEs.", careers_url: "https://rasmal.io" , total_raised: "$4.8M" },
  { slug: "bynow", name: "Bynow", website: "https://bynow.ai", linkedin: "https://www.linkedin.com/company/bynowsa", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Buy-now-pay-later for e-commerce.", careers_url: "https://bynow.ai" , total_raised: "$1.2M" },
  { slug: "madkhol", name: "Madkhol", website: "https://madkhol.com", linkedin: "https://www.linkedin.com/company/madkhol", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI robo-advisory and wealth management.", careers_url: "https://madkhol.com", founders: "Saad Bin Atyan", total_raised: "$2.2M", team_size: "1-10", founded_year: 2022 },
  { slug: "abwab-ai", name: "Abwab.ai", website: "https://abwab.ai", linkedin: "https://www.linkedin.com/company/abwab-ai", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "AI-powered financial access platform.", careers_url: "https://abwab.ai" , founders: "Baraa Koshak", team_size: "11-50", founded_year: 2023 },
  { slug: "sifi", name: "SiFi", website: "https://www.sifi.app", linkedin: "https://www.linkedin.com/company/sifiapp", stage: "Series A", sector: ["Fintech"], city: "Riyadh", description: "All-in-one spend management platform for businesses.", careers_url: "https://www.sifi.app", founders: "Ahmed AlHakbani, Mohammad Al Moghrabi, Rami Panayoti", total_raised: "$20M", team_size: "51-200", founded_year: 2021, last_round_date: "2025" },
  { slug: "arat", name: "Arat Capital", website: "https://www.arat.co", linkedin: "https://www.linkedin.com/company/aratcapital", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "CMA-licensed real estate crowdfunding via sukuk.", careers_url: "https://www.arat.co", founders: "Mishari Al-Oumir", team_size: "11-50", founded_year: 2023 },

  // ===== E-COMMERCE & RETAIL =====
  { slug: "zid", name: "Zid", website: "https://zid.sa", linkedin: "https://www.linkedin.com/company/zidsa", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "E-commerce enablement platform.", careers_url: "https://zid.sa", total_raised: "$50M", founded_year: 2017, last_round_date: "2022" , founders: "Mazen AlDarrab, Sultan H Al-Asmi", team_size: "201-500"},
  { slug: "syarah", name: "Syarah", website: "https://syarah.com", linkedin: "https://www.linkedin.com/company/syarah", stage: "Series C", sector: ["E-commerce"], city: "Riyadh", description: "Online car marketplace.", careers_url: "https://syarah.com", total_raised: "$60M+", founded_year: 2015, last_round_date: "2023" , founders: "Salah Sharef, Fayez Al-Anazi", team_size: "201-500"},
  { slug: "soum", name: "Soum", website: "https://soum.sa", linkedin: "https://www.linkedin.com/company/soum", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Marketplace for used electronics.", careers_url: "https://soum.sa", total_raised: "$18M", founded_year: 2020, last_round_date: "2023" , founders: "Fahad Al Hassan, Fahad Albassam, Bader Almubarak", team_size: "101-200"},
  { slug: "sary", name: "Sary", website: "https://sary.sa", linkedin: "https://www.linkedin.com/company/trysary", stage: "Series C", sector: ["E-commerce"], city: "Riyadh", description: "B2B wholesale ordering marketplace.", careers_url: "https://apply.workable.com/sary/", total_raised: "$75M+", founded_year: 2018, last_round_date: "2022" , founders: "Mohammed Aldossary, Khaled Alsiari", team_size: "201-500"},
  { slug: "nana", name: "NANA", website: "https://nana.sa", linkedin: "https://www.linkedin.com/company/nanasa", stage: "Series C", sector: ["E-commerce"], city: "Riyadh", description: "Grocery delivery and dark stores.", careers_url: "https://nana.sa", total_raised: "$133M", founded_year: 2016, last_round_date: "2022" , founders: "Abdulmajeed Alsukhan, Sami Alhelwah", team_size: "501-1000"},
  { slug: "rewaa", name: "Rewaa", website: "https://rewaa.com", linkedin: "https://www.linkedin.com/company/rewaa", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Inventory and POS for retailers.", careers_url: "https://rewaa.com", total_raised: "$45M", founded_year: 2018, last_round_date: "2025" , founders: "Mohammed Alqasir, Abdullah Aljadhai", team_size: "201-500"},
  { slug: "gathern", name: "Gathern", website: "https://gathern.co", linkedin: "https://www.linkedin.com/company/gathern", stage: "Series B", sector: ["E-commerce"], city: "Riyadh", description: "Vacation rental marketplace.", careers_url: "https://gathern.co", total_raised: "$72M", founded_year: 2019, last_round_date: "2024" , founders: "Latifah Altamimi, Eman Alsuwailem", team_size: "11-50"},
  { slug: "omniful", name: "Omniful", website: "https://omniful.com", linkedin: "https://www.linkedin.com/company/omniful", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Cloud-native warehouse and fulfillment OS.", careers_url: "https://omniful.com/careers", founders: "Mostafa Abolnasr, Alankrit Nishad", total_raised: "$5.85M", team_size: "11-50", founded_year: 2021 },
  { slug: "brkz", name: "BRKZ", website: "https://brkz.com", linkedin: "https://www.linkedin.com/company/brkz", stage: "Series A", sector: ["Construction"], city: "Riyadh", description: "Construction materials marketplace.", careers_url: "https://brkz.com", founders: "Ibrahim Manna", total_raised: "$22.5M", team_size: "51-200", founded_year: 2023, last_round_date: "Jan 2025" },
  { slug: "doos", name: "Doos", website: "https://doos.sa", linkedin: "https://www.linkedin.com/company/doosapp", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Social commerce platform.", careers_url: "https://doos.sa"  },

  // ===== FOODTECH & DELIVERY =====
  { slug: "foodics", name: "Foodics", website: "https://www.foodics.com", linkedin: "https://www.linkedin.com/company/foodics", stage: "Series C", sector: ["Foodtech"], city: "Riyadh", description: "Restaurant management and POS platform.", careers_url: "https://apply.workable.com/foodics/", founders: "Ahmad AlZaini, Mosab Al-Othmani", total_raised: "$198M", founded_year: 2014, last_round_date: "2023" , team_size: "1000+"},
  { slug: "jahez", name: "Jahez", website: "https://jahez.net", linkedin: "https://www.linkedin.com/company/jahez", stage: "Growth", sector: ["Foodtech"], city: "Riyadh", description: "Food delivery, listed on Tadawul.", careers_url: "https://jahez.net", total_raised: "$36.5M (pre-IPO)", founded_year: 2016 , founders: "Ghassab Al-Mandil", team_size: "201-500", last_round_date: "2019"},

  // ===== LOGISTICS =====
  { slug: "trukker", name: "TruKKer", website: "https://trukker.com", linkedin: "https://www.linkedin.com/company/trukker", stage: "Series C", sector: ["Logistics"], city: "Riyadh", description: "Digital freight marketplace.", careers_url: "https://trukker.com", total_raised: "$100M+", founded_year: 2016, last_round_date: "2022" , founders: "Gaurav Biswas, Pradeep Mallavarapu", team_size: "501-1000"},
  { slug: "torod", name: "Torod", website: "https://torod.co", linkedin: "https://www.linkedin.com/company/torodcom", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "E-commerce shipping and fulfillment.", careers_url: "https://torod.co" , total_raised: "$11.2M", team_size: "11-50" },
  { slug: "leejak", name: "Leejak", website: "https://leajlak.com", linkedin: "https://www.linkedin.com/company/leajlak", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Last-mile delivery for e-commerce.", careers_url: "https://leajlak.com" , total_raised: "$2.6M" },
  { slug: "picship", name: "Picship", website: "https://www.pieship.com", linkedin: "https://www.linkedin.com/company/pie-ship", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Package shipping comparison and booking.", careers_url: "https://www.pieship.com"  },
  { slug: "supplai", name: "Supplai", website: "https://www.supplai.ai", linkedin: "https://www.linkedin.com/company/supplai", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "AI-powered procurement for F&B.", careers_url: "https://www.supplai.ai"  },

  // ===== EDTECH =====
  { slug: "classera", name: "Classera", website: "https://classera.com", linkedin: "https://www.linkedin.com/company/classera", stage: "Series A", sector: ["Edtech"], city: "Riyadh", description: "E-learning platform for schools.", careers_url: "https://classera.com", total_raised: "$40M", founded_year: 2012, last_round_date: "2023" , founders: "Mohammad Almadani, Mohammed Alashmawi", team_size: "201-500"},
  { slug: "algooru", name: "AlGooru", website: "https://algooru.com", linkedin: "https://www.linkedin.com/company/algooru", stage: "Series A", sector: ["Edtech"], city: "Riyadh", description: "Saudi's first licensed private tutoring platform.", careers_url: "https://algooru.com", founders: "Khalid W. Abou Kassem, Omer Awad", total_raised: "$4M", team_size: "51-200" },
  { slug: "labayh", name: "Labayh", website: "https://labayh.net", linkedin: "https://www.linkedin.com/company/labayh", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Mental health and wellness platform.", careers_url: "https://labayh.net", founders: "Basim Albeladi", founded_year: 2018, team_size: "51-200" , total_raised: "$5M+" },

  // ===== HEALTHTECH =====
  { slug: "cura", name: "Cura", website: "https://cura.healthcare", linkedin: "https://www.linkedin.com/company/cura-healthcare", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Telehealth and virtual care platform.", careers_url: "https://cura.healthcare", total_raised: "$4M", founded_year: 2017, last_round_date: "2021" , founders: "Wael Kabli, Mohammad Zekrallah", team_size: "11-50" },
  { slug: "sahl-ai", name: "Sahl.ai", website: "https://sahl.ai", linkedin: "https://www.linkedin.com/company/getsahl", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "AI medical copilot for Arabic-speaking clinicians.", careers_url: "https://sahl.ai" , founders: "Ammar Khan", total_raised: "$425K" },
  { slug: "aumet", name: "Aumet", website: "https://aumet.com", linkedin: "https://www.linkedin.com/company/aumet", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Pharma B2B marketplace.", careers_url: "https://aumet.com", founders: "Ashraf Samhouri", total_raised: "$7M", founded_year: 2016, last_round_date: "2024" , team_size: "51-200"},
  { slug: "kilow", name: "Kilow", website: "https://www.kilow.app", linkedin: "https://www.linkedin.com/company/kilow", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "Digital weight management program.", careers_url: "https://www.kilow.app" , total_raised: "$2.5M" },

  // ===== SAAS =====
  { slug: "jisr", name: "Jisr", website: "https://jisr.net", linkedin: "https://www.linkedin.com/company/jisr", stage: "Series A", sector: ["HR Tech"], city: "Riyadh", description: "HR and payroll management platform.", careers_url: "https://jisr.net", founders: "Mohammed Akkar", total_raised: "$30M", founded_year: 2019, last_round_date: "2024" , team_size: "201-500"},
  { slug: "mawj-ai", name: "Mawj.ai", website: "https://mawj.ai", linkedin: "https://www.linkedin.com/company/mawjai", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI voice and speech technology for Arabic.", careers_url: "https://mawj.ai"  },
  { slug: "sighti", name: "Sighti.ai", website: "https://sighti.ai", linkedin: "https://www.linkedin.com/company/sighti", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Computer vision for retail analytics.", careers_url: "https://sighti.ai" , founders: "Salim Noor", founded_year: 2024 },
  { slug: "velents", name: "Velents.ai", website: "https://velents.com", linkedin: "https://www.linkedin.com/company/velents", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered video interviewing and hiring.", careers_url: "https://velents.com" , founders: "Mohamed Gaber, Abdulaziz Almuhaydib", total_raised: "$1.5M" },
  { slug: "ballurh", name: "Ballurh", website: "https://ballurh.io", linkedin: "https://www.linkedin.com/company/ballurh", stage: "Seed", sector: ["Foodtech"], city: "Riyadh", description: "Restaurant growth and marketing on delivery apps.", careers_url: "https://ballurh.io" , founders: "Abdulelah Alkesaiberi", founded_year: 2020 },
  { slug: "intella-ai", name: "Intella", website: "https://intella.me", linkedin: "https://www.linkedin.com/company/intellaworld", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "Intelligent automation platform.", careers_url: "https://intella.me" , total_raised: "$12.5M" },
  { slug: "rased", name: "Rased", website: "https://www.rased.ai", linkedin: "https://www.linkedin.com/company/rasedcom", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Real-time media monitoring and analytics.", careers_url: "https://www.rased.ai" , founders: "Talal Albadrani, Mostafa Al-Salhi", team_size: "11-50" },
  { slug: "string-tech", name: "String", website: "https://thestring.net", linkedin: "https://www.linkedin.com/company/stringsa", stage: "Seed", sector: ["Construction"], city: "Riyadh", description: "Connected worker platform for field teams.", careers_url: "https://thestring.net" , founders: "Muayad Qanadilo, Tariq Tailakh", total_raised: "$2M", founded_year: 2023 },
  { slug: "throughput", name: "Throughput", website: "https://throughput.world", linkedin: "https://www.linkedin.com/company/throughput-inc", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "AI-powered supply chain analytics.", careers_url: "https://throughput.world" , founders: "Ali Hasan Raza, Khizer Hayat", total_raised: "$6M", team_size: "11-50", founded_year: 2018 },
  { slug: "robonito", name: "Robonito", website: "https://robonito.com", linkedin: "https://www.linkedin.com/company/robonito", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI testing automation for web apps.", careers_url: "https://robonito.com"  },
  { slug: "tabsense", name: "TABsense", website: "https://tabsense.ai", linkedin: "https://www.linkedin.com/company/tabsense", stage: "Seed", sector: ["Fintech"], city: "Riyadh", description: "Smart POS and payment devices.", careers_url: "https://tabsense.ai" , total_raised: "$5M", team_size: "11-50" },

  // ===== PROPTECH =====
  { slug: "rize", name: "Rize", website: "https://rize.sa", linkedin: "https://www.linkedin.com/company/rize-sa", stage: "Series A", sector: ["Proptech"], city: "Riyadh", description: "Rent-now-pay-later platform.", careers_url: "https://rize.sa" , founders: "Ibrahim Balilah, Mohamed Al-Frahi", total_raised: "$35M", founded_year: 2021, last_round_date: "Jan 2025", team_size: "51-200" },
  { slug: "mnzl", name: "Mnzil", website: "https://mnzil.com", linkedin: "https://www.linkedin.com/company/mnzl", stage: "Series A", sector: ["Proptech"], city: "Riyadh", description: "Workforce housing solutions.", careers_url: "https://mnzl.com", founders: "Abdulmajeed Al-Babtain, Abdulrahman Al-Shaya", total_raised: "$11.7M", founded_year: 2024, last_round_date: "Nov 2025" , team_size: "11-50" },
  { slug: "livedin", name: "Livedin", website: "https://livedin.co", linkedin: "https://www.linkedin.com/company/livedinsa", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Property management and tenant experience.", careers_url: "https://livedin.co"  },

  // ===== SAAS =====
  { slug: "penny", name: "Penny", website: "https://penny.co", linkedin: "https://www.linkedin.com/company/pennysoftware", stage: "Pre-Series A", sector: ["SaaS"], city: "Riyadh", description: "B2B procurement and source-to-pay platform.", careers_url: "https://penny.co", founders: "Iyad Aldalooj", total_raised: "$5M+", team_size: "51-200", founded_year: 2022 },

  // ===== MEDIA =====
  { slug: "thmanyah", name: "Thmanyah", website: "https://thmanyah.com", linkedin: "https://www.linkedin.com/company/thmanyah", stage: "Growth", sector: ["Media"], city: "Riyadh", description: "Largest Arabic podcast and media-tech network.", careers_url: "https://thmanyah.com", founders: "Abdulrahman Abumalih", total_raised: "SAR 33.3M (SRMG acquired 51%)", team_size: "101-250", founded_year: 2016 },

  // ===== LOGISTICS =====
  { slug: "telgani", name: "Telgani", website: "https://www.telgani.com", linkedin: "https://www.linkedin.com/company/telgani", stage: "Series A", sector: ["Logistics"], city: "Riyadh", description: "On-demand car rental aggregator across 44+ Saudi cities.", careers_url: "https://www.telgani.com", founders: "Abdulkader Almkinzy, Ali Alfehaid", total_raised: "$8.5M", team_size: "51-200", founded_year: 2018, last_round_date: "Feb 2023" },

  // ===== ROBOTICS =====
  { slug: "proven-robotics", name: "PROVEN Robotics", website: "https://provenrobotics.ai", linkedin: "https://www.linkedin.com/company/proven-robotics", stage: "Growth", sector: ["Robotics"], city: "Riyadh", description: "Robotics solutions for Saudi enterprises.", careers_url: "https://provenrobotics.ai" , founders: "PROVEN Group", team_size: "51-200", founded_year: 2018 },

  // ===== MEGA PROJECTS =====
  { slug: "alat", name: "Alat", website: "https://alat.com", linkedin: "https://www.linkedin.com/company/alat-saudi", stage: "Growth", sector: ["Deep Tech"], city: "Riyadh", description: "Saudi electronics and tech manufacturing hub.", careers_url: "https://alat.com", total_raised: "$100B (PIF-backed)", team_size: "1000+", founded_year: 2024 , founders: "Amit Midha (CEO)" },
  { slug: "riyadh-air", name: "Riyadh Air", website: "https://riyadhair.com", linkedin: "https://www.linkedin.com/company/riyadhair", stage: "Growth", sector: ["Logistics"], city: "Riyadh", description: "Saudi's new digital-first airline.", careers_url: "https://riyadhair.com/careers" , team_size: "501-1000", founded_year: 2023, founders: "Tony Douglas (CEO)", total_raised: "$2B+ (PIF-backed)" },
  { slug: "ceer", name: "Ceer Motors", website: "https://ceermotors.com", linkedin: "https://www.linkedin.com/company/ceer-motors", stage: "Growth", sector: ["Deep Tech"], city: "Riyadh", description: "Saudi electric vehicle manufacturer.", careers_url: "https://ceermotors.com", total_raised: "$1.3B (PIF + Foxconn JV)", team_size: "1000+", founded_year: 2022 , founders: "PIF + Foxconn JV" },

  // ===== DATA & INFRASTRUCTURE =====
  { slug: "aec", name: "Advanced Electronics Company", website: "https://www.aecl.com", linkedin: "https://www.linkedin.com/company/aaborone", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Defense electronics and cybersecurity.", careers_url: "https://www.aecl.com" , founders: "PIF subsidiary", total_raised: "Government-funded", team_size: "1000+", founded_year: 1988 },
  { slug: "stc-solutions", name: "STC Solutions", website: "https://stcs.com.sa", linkedin: "https://www.linkedin.com/company/stc-solutions", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Enterprise IT services and digital solutions.", careers_url: "https://stcs.com.sa", team_size: "1000+", founded_year: 1998 , founders: "stc Group subsidiary", total_raised: "$7B+ (market cap)" },
  { slug: "center3", name: "Center3", website: "https://center3.com", linkedin: "https://www.linkedin.com/company/center3", stage: "Growth", sector: ["Data & Infrastructure"], city: "Riyadh", description: "Digital infrastructure and data center hub.", careers_url: "https://center3.com", team_size: "201-500" , founders: "Fahad AlHajeri (CEO)", total_raised: "stc subsidiary", founded_year: 2022 },

  // ===== DEEP TECH =====
  { slug: "falconviz", name: "FalconViz", website: "https://falconviz.com", linkedin: "https://www.linkedin.com/company/falconviz", stage: "Series A", sector: ["Deep Tech"], city: "Dammam", description: "Drone mapping and 3D modeling.", careers_url: "https://falconviz.com" , founders: "Mohamed Shalaby, Luca Passone, Neil Smith", total_raised: "$1.8M", team_size: "11-50", founded_year: 2015 },

  // ===== IOT =====

  // ===== MEDIA =====
  { slug: "telfaz11", name: "Telfaz11", website: "https://telfaz11.com", linkedin: "https://www.linkedin.com/company/telfaz11", stage: "Series A", sector: ["Media"], city: "Riyadh", description: "Saudi digital content and entertainment studio.", careers_url: "https://telfaz11.com", founders: "Alaa Fadan, Ali Al Kalthami, Ibrahim Al Khairallah", total_raised: "$9.9M", team_size: "11-50", founded_year: 2011 },
  { slug: "vuz", name: "Vuz", website: "https://vuz.com", linkedin: "https://www.linkedin.com/company/vaborone", stage: "Series B", sector: ["Media"], city: "Riyadh", description: "Immersive 360 video experiences platform.", careers_url: "https://vuz.com", founders: "Khaled Zaatarah", total_raised: "$30M+", team_size: "51-200", founded_year: 2017 },
  { slug: "nitx", name: "Nitx", website: "https://nitx.io", linkedin: "https://www.linkedin.com/company/nitx", stage: "Seed", sector: ["Media"], city: "Riyadh", description: "Digital signage and smart advertising platform.", careers_url: "https://nitx.io", founders: "Mohammed Al Saad, Khalid Shah", total_raised: "Seed (Wa'ed)", founded_year: 2021 },
  { slug: "glamera", name: "Glamera", website: "https://business.glamera.com", linkedin: "https://www.linkedin.com/company/glameraglobal", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "Beauty and lifestyle SaaS for salons and spas.", careers_url: "https://business.glamera.com", founders: "Mohamed Hijazi", total_raised: "$1.3M", team_size: "11-50", founded_year: 2022 },
  { slug: "kliq", name: "KLIQ", website: "https://kliqapp.io", linkedin: "https://www.linkedin.com/company/kliqsa", stage: "Seed", sector: ["Media"], city: "Riyadh", description: "Creator economy and influencer platform.", careers_url: "https://kliqapp.io" , founders: "Asma'a Al Maraghi", total_raised: "$2.25M" },
  { slug: "halo-media", name: "Halo", website: "https://haloai.app", linkedin: "https://www.linkedin.com/company/halosa", stage: "Seed", sector: ["Media"], city: "Riyadh", description: "Digital advertising platform.", careers_url: "https://haloai.app" , total_raised: "$6M" },

  // ===== DEFENSE & AEROSPACE =====
  { slug: "atam", name: "ATAM", website: "https://atam.careers", linkedin: "https://www.linkedin.com/company/atam", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Builds autonomous defense systems.", careers_url: "https://atam.careers" , founders: "Faisal Al-khamissi, Muteb Alqani", team_size: "11-50", founded_year: 2026 },
  { slug: "neo-space", name: "Neo Space Group", website: "https://neospacegroup.com", linkedin: "https://www.linkedin.com/company/neospacegroup", stage: "Seed", sector: ["Defense"], city: "Riyadh", description: "Builds satellite and space technology.", careers_url: "https://neospacegroup.com" , team_size: "11-50", founded_year: 2024 },

  // ===== CYBERSECURITY =====
  { slug: "cognna", name: "Cognna", website: "https://www.cognna.com", linkedin: "https://www.linkedin.com/company/cognna", stage: "Series A", sector: ["Cybersecurity"], city: "Riyadh", description: "AI-powered SOC automation and advanced threat detection.", careers_url: "https://www.cognna.com" , founders: "Ibrahim Alshamrani, Ziyad Alshehri", total_raised: "$11.4M", founded_year: 2022, last_round_date: "Dec 2025", team_size: "11-50" },
  { slug: "solidrange", name: "Solidrange", website: "https://solidrange.com", linkedin: "https://www.linkedin.com/company/solidrange", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Automates cybersecurity compliance (GRC).", careers_url: "https://solidrange.com" , total_raised: "$2.4M" },
  { slug: "dphish", name: "dPhish", website: "https://dphish.com", linkedin: "https://www.linkedin.com/company/dphish", stage: "Seed", sector: ["Cybersecurity"], city: "Riyadh", description: "Detects and prevents phishing attacks.", careers_url: "https://dphish.com"  },

  // ===== GOVTECH =====
  { slug: "governata", name: "Governata", website: "https://governata.com", linkedin: "https://www.linkedin.com/company/governata", stage: "Seed", sector: ["Govtech"], city: "Riyadh", description: "AI governance and compliance platform.", careers_url: "https://governata.com" , total_raised: "$4M" },
  { slug: "takamul", name: "Takamul", website: "https://takamul.com.sa", linkedin: "https://www.linkedin.com/company/takamul", stage: "Growth", sector: ["Govtech"], city: "Riyadh", description: "Digital transformation for government.", careers_url: "https://takamul.com.sa" , founders: "Basil Al Dossary", team_size: "201-500" },

  // ===== AI (from Airtable) =====
  { slug: "cranl", name: "Cranl", website: "https://cranl.com", linkedin: "https://www.linkedin.com/company/cranl", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "Cloud platform (PaaS) to deploy applications.", careers_url: "https://cranl.com"  },
  { slug: "intelmatix", name: "Intelmatix", website: "https://intelmatix.ai", linkedin: "https://www.linkedin.com/company/intelmatix", stage: "Series A", sector: ["AI"], city: "Riyadh", description: "AI-powered decision intelligence for enterprise.", careers_url: "https://intelmatix.ai/company-careers.html" , founders: "Anas Alfaris, Ahmad Alabdulkareem", total_raised: "$20M", team_size: "51-200", founded_year: 2021, last_round_date: "Jul 2024"},
  { slug: "wittify", name: "Wittify.ai", website: "https://wittify.ai", linkedin: "https://www.linkedin.com/company/wittify", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI agents for omnichannel customer touchpoints.", careers_url: "https://wittify.ai" , total_raised: "$2.5M", founded_year: 2024, team_size: "11-50" },

  // ===== SAAS (from Airtable) =====
  { slug: "unifonic", name: "Unifonic", website: "https://unifonic.com", linkedin: "https://www.linkedin.com/company/unifonic", stage: "Series B", sector: ["AI"], city: "Riyadh", description: "AI-powered customer engagement platform (CPaaS).", careers_url: "https://jobs.unifonic.com" , founders: "Ahmed Hamdan, Hassan Hamdan", total_raised: "$146M", team_size: "201-500", founded_year: 2006, last_round_date: "Sep 2021"},

  // ===== FINTECH (from Airtable) =====
  { slug: "oqood", name: "Oqood", website: "https://oqood.ai", linkedin: "https://www.linkedin.com/company/oqood", stage: "Seed", sector: ["Legaltech"], city: "Riyadh", description: "Automates legal workflows with AI.", careers_url: "https://oqood.ai" , founders: "Khaled Al Rasheed", total_raised: "$1M", founded_year: 2024 },

  // ===== E-COMMERCE (from Airtable) =====
  { slug: "rawaa", name: "Rawaa", website: "https://www.rawaa.cloud", linkedin: "https://www.linkedin.com/company/rawaa", stage: "Series A", sector: ["E-commerce"], city: "Riyadh", description: "Cloud POS with AI accounting for merchants.", careers_url: "https://www.rawaa.cloud" , founders: "Mohammed Alqasir, Abdullah Aljadhai", total_raised: "$27M", team_size: "11-50", founded_year: 2018 },
  { slug: "juthor", name: "Juthor", website: "http://juthor.sa", linkedin: "https://www.linkedin.com/company/judhur", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Multi-channel e-commerce management.", careers_url: "http://juthor.sa" , total_raised: "$500K" },

  // ===== EDUCATION =====
  { slug: "noon-academy", name: "Noon Academy", website: "https://www.noonacademy.com", linkedin: "https://www.linkedin.com/company/noonacademy", stage: "Series B", sector: ["Edtech"], city: "Riyadh", description: "Social learning and AI tutoring.", careers_url: "https://www.noonacademy.com", founders: "Mohammed Aldhalaan, Abdulaziz AlSaeed", total_raised: "$52M", team_size: "51-200", founded_year: 2013 },

  // ===== PROPTECH =====

  // ===== ENERGY =====

  // ===== GEOSPATIAL =====
  { slug: "gbt", name: "GBT (GulfBoost)", website: "https://gbt.sa", linkedin: "https://www.linkedin.com/company/gbt-sa", stage: "Seed", sector: ["Geospatial"], city: "Riyadh", description: "No-code geospatial AI tools.", careers_url: "https://gbt.sa" , total_raised: "$1.3M", founded_year: 2024 },

  // ===== HR TECH =====
  { slug: "merit-incentives", name: "Merit Incentives", website: "https://meritincentives.com", linkedin: "https://www.linkedin.com/company/meritincentives", stage: "Growth", sector: ["HR Tech"], city: "Riyadh", description: "Employee engagement and incentives.", careers_url: "https://meritincentives.com" , founders: "Julie Barbier-Leblan", total_raised: "$45M", team_size: "51-200", founded_year: 2017 },

  // ===== AGRICULTURE =====
  { slug: "edama", name: "Edama", website: "https://www.edamasolutions.com", linkedin: "https://www.linkedin.com/company/edama", stage: "Seed", sector: ["Agriculture"], city: "Riyadh", description: "Recycles organic waste into farm products.", careers_url: "https://www.edamasolutions.com" , total_raised: "$1M" },

  // ===== GAMING =====
  { slug: "spoilz", name: "SPOILZ", website: "https://www.spoilz.studio", linkedin: "https://www.linkedin.com/company/spoilz", stage: "Seed", sector: ["Gaming"], city: "Riyadh", description: "Gaming rewards and loyalty platform.", careers_url: "https://www.spoilz.studio" , total_raised: "$700K" },

  // ===== CONSTRUCTION =====
  { slug: "trubuild", name: "TruBuild", website: "https://trubuild.io", linkedin: "https://www.linkedin.com/company/trubuildco", stage: "Seed", sector: ["Construction"], city: "Riyadh", description: "Digital construction project management.", careers_url: "https://trubuild.io" , total_raised: "$1M" },

  // ===== TRAVEL =====
  { slug: "firnas", name: "Firnas", website: "https://www.firnas.ai", linkedin: "https://www.linkedin.com/company/firnassa", stage: "Seed", sector: ["Travel"], city: "Riyadh", description: "AI-powered travel planning.", careers_url: "https://www.firnas.ai" , founded_year: 2024 },

  // ===== SUSTAINABILITY =====
  { slug: "petroapp", name: "PetroApp", website: "https://petroapp.com", linkedin: "https://www.linkedin.com/company/petroapp", stage: "Series A", sector: ["Energy"], city: "Riyadh", description: "Fuel station management and analytics.", careers_url: "https://petroapp.com" , total_raised: "$50M" },

  // ===== TELECOM =====

  // ===== FOODTECH (additional) =====
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
