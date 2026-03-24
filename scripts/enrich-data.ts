#!/usr/bin/env npx tsx
/**
 * enrich-data.ts
 *
 * patches company data with researched founders, funding, team sizes.
 * run: npx tsx scripts/enrich-data.ts
 */

import * as fs from "fs"
import * as path from "path"

const DATA_FILE = path.join(__dirname, "..", "lib", "data.ts")

// researched enrichment data: slug -> partial fields
const enrichments: Record<string, {
  founders?: string
  total_raised?: string
  team_size?: string
  founded_year?: number
  last_round_date?: string
}> = {
  // UNICORNS
  "ninja": { founders: "Ebrahim Al-Jassim, Saud Al Qahtani", total_raised: "$284M", team_size: "201-500", founded_year: 2022, last_round_date: "Jul 2025" },
  "tabby": { founders: "Hosam Arab, Daniil Barkalov", total_raised: "$604M", team_size: "201-500", founded_year: 2019, last_round_date: "Feb 2025" },
  "tamara": { founders: "Abdulmajeed Alsukhan, Turki Bin Zarah, Abdulmohsen Albabtain", total_raised: "$556M", team_size: "1000+", founded_year: 2020, last_round_date: "Sep 2025" },
  "stc-pay": { founders: "Ahmed Al-Enezi", total_raised: "$1.33B", team_size: "201-500", founded_year: 2018, last_round_date: "Nov 2020" },
  "salla": { founders: "Nawaf Hariri, Salman Butt", total_raised: "$138M", team_size: "501-1000", founded_year: 2016, last_round_date: "Mar 2024" },
  "noon": { founders: "Mohamed Alabbar", total_raised: "$2.7B", team_size: "1000+", founded_year: 2016 },

  // AI
  "humain": { total_raised: "$23B (PIF-backed)", team_size: "201-500", founded_year: 2025 },
  "lucidya": { founders: "Abdullah Asiri, Hatem Kameli, Mohamed Milyani, Zuhair Khayyat", total_raised: "$37M", team_size: "51-200", founded_year: 2016, last_round_date: "Jul 2025" },
  "mozn": { founders: "Mohammed Alhussein, Khalid Al-Ghonaim, Abdullah Alsaeed", total_raised: "$10M", team_size: "201-500", founded_year: 2017, last_round_date: "Feb 2022" },
  "wakecap": { founders: "Hassan Albalawi, Ishita Sood", total_raised: "$28M", team_size: "51-200", founded_year: 2017, last_round_date: "May 2025" },
  "artefact": { founders: "Vincent Luciani, Guillaume De Roquemaurel", team_size: "1001-5000" },
  "intelmatix": { founders: "Anas Alfaris, Ahmad Alabdulkareem", total_raised: "$20M", team_size: "51-200", founded_year: 2021, last_round_date: "Jul 2024" },

  // FINTECH
  "hala": { founders: "Esam Alnahdi, Maher Loubieh", total_raised: "$163.5M", team_size: "501-1000", founded_year: 2018, last_round_date: "Sep 2025" },
  "erad": { founders: "Salem Abu-Hammour, Faris Yaghmour, Abdulmalik Almeheini", total_raised: "$51.5M", team_size: "51-200", founded_year: 2022, last_round_date: "Apr 2025" },
  "tamam": { founded_year: 2019 },
  "d360": { founders: "Faisal Aljadaan, Akram Alahmadi", total_raised: "$500M", team_size: "201-500", founded_year: 2022 },
  "lean-technologies": { founders: "Hisham Al-Falih, Aditya Sarkar, Ashu Gupta", total_raised: "$100M+", team_size: "51-200", founded_year: 2019, last_round_date: "Mar 2025" },
  "unifonic": { founders: "Ahmed Hamdan, Hassan Hamdan", total_raised: "$146M", team_size: "201-500", founded_year: 2006, last_round_date: "Sep 2021" },
  "rasan": { total_raised: "$24M", team_size: "201-500", founded_year: 2016 },
  "sayfi": { team_size: "11-50" },

  // E-COMMERCE
  "zid": { founders: "Mazen AlDarrab, Sultan H Al-Asmi", total_raised: "$59M", team_size: "201-500", founded_year: 2017, last_round_date: "Oct 2022" },
  "sary": { founders: "Mohammed Aldossary, Khaled Alsiari", total_raised: "$112M", team_size: "201-500", founded_year: 2018, last_round_date: "Dec 2021" },
  "nana": { founders: "Abdulmajeed Alsukhan, Sami Alhelwah", total_raised: "$208M", team_size: "501-1000", founded_year: 2016, last_round_date: "Feb 2023" },
  "rewaa": { founders: "Mohammed Alqasir, Abdullah Aljadhai", total_raised: "$72M", team_size: "201-500", founded_year: 2018, last_round_date: "Dec 2025" },
  "syarah": { founders: "Salah Sharef, Fayez Al-Anazi", total_raised: "$82M", team_size: "201-500", founded_year: 2015, last_round_date: "Sep 2024" },
  "soum": { founders: "Fahad Al Hassan, Fahad Albassam, Bader Almubarak", total_raised: "$22M", team_size: "101-200", founded_year: 2021, last_round_date: "Dec 2023" },
  "gathern": { founders: "Latifah Altamimi, Eman Alsuwailem", total_raised: "$72M", team_size: "11-50", founded_year: 2016, last_round_date: "Aug 2025" },
  "fordeal": { total_raised: "$17M", team_size: "201-500", founded_year: 2017 },
  "retailo": { founders: "Talha Ansari, Muhammad Nowkhaiz, Wahaj Ahmed", total_raised: "$53M", team_size: "501-1000", founded_year: 2020, last_round_date: "Nov 2023" },
  "omniful": { team_size: "11-50" },

  // FOODTECH
  "foodics": { founders: "Ahmad Alzaini, Mosab Alothmani", total_raised: "$198M", team_size: "1000+", founded_year: 2014, last_round_date: "Feb 2021" },
  "jahez": { founders: "Ghassab Al-Mandil", total_raised: "$36.5M", team_size: "201-500", founded_year: 2016, last_round_date: "2019" },

  // LOGISTICS
  "trukker": { founders: "Gaurav Biswas, Pradeep Mallavarapu", total_raised: "$200M+", team_size: "501-1000", founded_year: 2016, last_round_date: "Jul 2025" },
  "invygo": { founders: "Eslam Hussein, Pulkit Ganjoo", total_raised: "$22M+", team_size: "11-50", founded_year: 2018, last_round_date: "Oct 2024" },

  // EDTECH
  "classera": { founders: "Mohammad Almadani, Mohammed Alashmawi", total_raised: "$40M", team_size: "201-500", founded_year: 2011, last_round_date: "Oct 2022" },

  // HEALTHTECH
  "cura": { founders: "Wael Kabli, Mohammad Zekrallah", total_raised: "$5M", founded_year: 2015, last_round_date: "Oct 2021" },
  "aumet": { team_size: "51-200", founded_year: 2019 },

  // SAAS
  "jisr": { total_raised: "$30M", team_size: "201-500", founded_year: 2016, last_round_date: "Oct 2023" },
  "zenhr": { founders: "Yousef Shamoun, Mohamad Haj Hasan", total_raised: "$10M", team_size: "151-200", founded_year: 2017, last_round_date: "Oct 2022" },
  "bayzat": { founders: "Brian Habibi, Talal Bayaa, Tarek Bayaa", total_raised: "$60M+", team_size: "51-200", founded_year: 2013, last_round_date: "Dec 2022" },
  "elm": { team_size: "1001-5000" },

  // PROPTECH
  "rize": { founders: "Ibrahim Balilah, Mohamed Al-Frahi", total_raised: "$35M", founded_year: 2021, last_round_date: "Jan 2025" },

  // MEGA PROJECTS
  "neom-tech": { team_size: "1000+", founded_year: 2017 },
  "riyadh-air": { team_size: "501-1000", founded_year: 2023 },

  // CYBERSECURITY
  "cognna": { founders: "Ibrahim Alshamrani, Ziyad Alshehri", total_raised: "$11.4M", founded_year: 2022, last_round_date: "Dec 2025" },
}

// read file
let content = fs.readFileSync(DATA_FILE, "utf-8")
let patchCount = 0

for (const [slug, data] of Object.entries(enrichments)) {
  // find the line for this company
  const regex = new RegExp(`(\\{[^}]*slug:\\s*"${slug}"[^}]*)\\}`, "g")
  const match = regex.exec(content)

  if (!match) {
    console.log(`  skip: ${slug} (not found in data.ts)`)
    continue
  }

  let line = match[1]
  let changed = false

  // add each field if not already present
  if (data.founders && !line.includes("founders:")) {
    line += `, founders: "${data.founders}"`
    changed = true
  }
  if (data.total_raised && !line.includes("total_raised:")) {
    line += `, total_raised: "${data.total_raised}"`
    changed = true
  }
  if (data.team_size && !line.includes("team_size:")) {
    line += `, team_size: "${data.team_size}"`
    changed = true
  }
  if (data.founded_year && !line.includes("founded_year:")) {
    line += `, founded_year: ${data.founded_year}`
    changed = true
  }
  if (data.last_round_date && !line.includes("last_round_date:")) {
    line += `, last_round_date: "${data.last_round_date}"`
    changed = true
  }

  if (changed) {
    content = content.replace(match[1], line)
    patchCount++
    console.log(`  patched: ${slug}`)
  } else {
    console.log(`  skip: ${slug} (already has data)`)
  }
}

fs.writeFileSync(DATA_FILE, content)
console.log(`\ndone. patched ${patchCount} companies.`)
