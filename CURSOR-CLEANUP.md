# Company Data Cleanup Instructions

paste this into cursor. it tells claude exactly what to do.

---

## Task: Clean up company data in lib/data.ts

We ran a validation script and found major issues. Many companies were hallucinated (fake URLs, fake LinkedIn pages). Here's what needs to happen:

### Step 1: Remove fake companies

Remove these slugs from the companies array in lib/data.ts. These have domains that dont exist (ENOTFOUND) or are clearly fabricated:

```
coretechx, hiba-health-ai, lawazem, safqah, blink-co, tulip-technologies,
iconnect-robotics, aerial-solutions, zetta-technologies, enjaz-ai,
visiontech-ai, bytestechnolab, jiye-technologies, faheem, najeeb-ai,
thya-technology, eyego, edunovai, newera-ai, cognitev, lisan, sawt,
botme-ai, adaptive-techsoft, ozvid-technologies
```

These are NOT real companies. Delete the entire object for each.

### Step 2: Remove companies that need manual re-verification

Remove these too. They failed validation but might be real. I will re-add them manually with correct data later:

```
aajil, sindbad-tech, oumla, nala-robotics, adalahchain, nighat,
glamera, atam, atam-kiosks, saudi-robotics-club, quantum-robotics
```

### Step 3: Fix real companies with wrong data

These are definitely real Saudi companies. Fix their LinkedIn URLs and careers URLs:

**Noon** (noon)
- linkedin: "https://www.linkedin.com/company/naborone/"
- careers_url: "https://careers.noon.com"

**Jahez** (jahez)
- linkedin: "https://www.linkedin.com/company/jahezapp/"
- careers_url: "https://careers.jahez.net"

**Gathern** (gathern)
- linkedin: "https://www.linkedin.com/company/gathernco/"
- careers_url: "https://gathern.co/careers"

**Soum** (soum)
- linkedin: "https://www.linkedin.com/company/soumsa/"
- careers_url: "https://soum.sa/careers"

**TruKKer** (trukker)
- linkedin: "https://www.linkedin.com/company/traborone/"
- careers_url: "https://trukker.com/careers"

**Telfaz11** (telfaz11)
- linkedin: "https://www.linkedin.com/company/telfaz11entertainment/"
- careers_url: "https://telfaz11.com/careers"

**Jisr** (jisr)
- linkedin: "https://www.linkedin.com/company/jisrhr/"
- careers_url: "https://jisr.net/careers"

**Labayh** (labayh)
- linkedin: "https://www.linkedin.com/company/labayhapp/"
- careers_url: "https://labayh.net/careers"

**Nabta Health** (nabta-health)
- linkedin: "https://www.linkedin.com/company/nabtahealth/"
- careers_url: "https://nabtahealth.com/careers"

**STC Solutions** (stc-solutions)
- linkedin: "https://www.linkedin.com/company/stcsolutions/"
- careers_url: "https://stcs.com.sa/careers"

**Engagesoft** (engagesoft)
- linkedin: "https://www.linkedin.com/company/engagesoftco/"
- careers_url: "https://engagesoft.com/careers"

**Squadio** (squadio)
- linkedin: "https://www.linkedin.com/company/squadiocom/"
- careers_url: "https://squadio.com/careers"

**Rekaz** (rekaz)
- linkedin: "https://www.linkedin.com/company/rekazio/"
- careers_url: "https://rekaz.io/careers"

**PRYPCO** (prypco)
- linkedin: "https://www.linkedin.com/company/prypcocom/"
- careers_url: "https://prypco.com/careers"

NOTE: Some of these LinkedIn URLs might still be wrong. I will verify them manually. For now, update what you can.

### Step 4: Add validation guard

Create a new file `scripts/check-data.ts` that runs as part of the build process. It should:

1. Import the companies array from lib/data.ts
2. Check for duplicate slugs
3. Check that every company has all required fields (name, slug, website, linkedin, sector, stage, city, description, careers_url)
4. Check that website URL is not the same as careers_url (lazy data)
5. Check that linkedin URL contains a real company slug (not matching the company slug exactly)
6. Warn if description contains generic phrases like "AI-powered", "technology solutions", "enterprise AI"
7. Exit with error code 1 if any check fails

Add this to package.json scripts:
```json
"validate": "npx tsx scripts/check-data.ts"
```

### Step 5: Add pre-commit rule

Add to the cursor rules (.cursorrules file or equivalent):

```
IMPORTANT: When adding new companies to lib/data.ts:
1. NEVER invent or guess company data. Only add companies you can verify exist.
2. Every company MUST have a real, working website URL
3. Every company MUST have a verified LinkedIn company page URL (search linkedin.com to confirm)
4. careers_url MUST NOT be the same as the website homepage. Find the actual careers/jobs page.
5. After adding companies, run: npx tsx scripts/check-data.ts
6. If validation fails, fix the data before committing.
```

### What NOT to do
- Do not add new companies to replace the removed ones
- Do not change the data structure or types
- Do not modify any other files besides lib/data.ts, scripts/check-data.ts, and package.json
