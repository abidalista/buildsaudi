# BuildSaudi: Expandable Cards + New Companies

paste this entire file into cursor. two major changes needed.

---

## CHANGE 1: Expandable Company Cards (BuildList Style)

Reference: https://buildlist.xyz (look at how Outpost Space card works)

### What it should do:

1. **Company card has a toggle arrow** (chevron) on the right side. clicking it expands/collapses additional details below the card header.

2. **Clicking the company NAME** should open the company's EXTERNAL website (company.website) in a new tab. NOT link to an internal /company/[slug] page. Remove the `<Link href={/company/${company.slug}}>` wrapper on the name. Replace with `<a href={company.website} target="_blank" rel="noopener noreferrer">`.

3. **Expanded section** (hidden by default, shown when arrow is clicked) shows:
   - FOUNDERS (left column): company.founders (string, optional)
   - TOTAL RAISED (right column): company.total_raised (string like "$47.2M", optional)
   - HQ CITY (left): company.city
   - EMPLOYEES (right): company.team_size (string like "21-50", optional)
   - FOUNDED (left): company.founded_year (number, optional)
   - LAST ROUND DATE (right): company.last_round_date (string like "Sep 2024", optional)
   - SOCIALS (left bottom): X icon linking to company.twitter_url, LinkedIn icon linking to company.linkedin

4. **Visual style** (match BuildList exactly):
   - Expanded section has a light gray background (bg-gray-50)
   - Labels are uppercase, small, tracking-wider, text-gray-500, font-mono
   - Values are text-sm font-semibold text-gray-900
   - 2-column grid layout with gap
   - Socials icons are small (w-5 h-5), dark gray, with hover effect
   - Smooth expand/collapse animation (use framer-motion or CSS transition)
   - The arrow rotates 180deg when expanded

5. **The arrow** should be a small chevron (ChevronDown from lucide-react), positioned to the right of the View Jobs button. It toggles the expanded section.

### Implementation in app/page.tsx:

```tsx
// add state for expanded cards
const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

const toggleCard = (slug: string) => {
  setExpandedCards(prev => {
    const next = new Set(prev)
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    return next
  })
}

// in the card JSX, after the main flex row:
{expandedCards.has(company.slug) && (
  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      {company.founders && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Founders</p>
          <p className="text-sm font-semibold text-gray-900">{company.founders}</p>
        </div>
      )}
      {company.total_raised && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Total Raised</p>
          <p className="text-sm font-semibold text-gray-900">{company.total_raised}</p>
        </div>
      )}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">HQ City</p>
        <p className="text-sm font-semibold text-gray-900">{company.city}</p>
      </div>
      {company.team_size && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Employees</p>
          <span className="inline-block px-2 py-0.5 text-sm font-semibold text-gray-900 border border-gray-200 rounded">{company.team_size}</span>
        </div>
      )}
      {company.founded_year && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Founded</p>
          <p className="text-sm font-semibold text-gray-900">{company.founded_year}</p>
        </div>
      )}
      {company.last_round_date && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Last Round Date</p>
          <p className="text-sm font-semibold text-gray-900">{company.last_round_date}</p>
        </div>
      )}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">Socials</p>
        <div className="flex items-center gap-3">
          {company.twitter_url && (
            <a href={company.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              {/* X/Twitter icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
)}
```

### Important: Company name link change

In app/page.tsx, change the company name from:
```tsx
<Link href={`/company/${company.slug}`} className="text-lg font-bold text-[#111827] hover:text-[#06634D] transition-colors">
  {company.name}
</Link>
```

To:
```tsx
<a href={company.website} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-[#111827] hover:text-[#06634D] transition-colors">
  {company.name}
</a>
```

The /company/[slug] internal pages can stay for SEO purposes, but the homepage card should link directly to the company website.

---

## CHANGE 2: Add New Companies from 2025 Saudi Funded Startups

These are from a verified infographic of 2025 funded Saudi startups. Add them to lib/data.ts.

IMPORTANT RULES:
- DO NOT invent or guess any URLs. Use ONLY the URLs provided below.
- If a field is not provided, omit it (the type allows optional fields).
- DO NOT change existing companies, only ADD new ones.
- Add them under the appropriate sector comment section.

### FinTech (add these):

```typescript
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
```

### Enterprise Software (add these):

```typescript
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
```

### E-Commerce & Retail (add these):

```typescript
{ slug: "omniful", name: "Omniful", website: "https://omniful.com", linkedin: "https://www.linkedin.com/company/omniful", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Cloud-native warehouse and fulfillment OS.", careers_url: "https://omniful.com/careers" },
{ slug: "fitting", name: "FITTING", website: "https://fitting.sa", linkedin: "https://www.linkedin.com/company/fittingsa", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Virtual try-on for fashion e-commerce.", careers_url: "https://fitting.sa" },
{ slug: "silq", name: "SILQ", website: "https://silq.sa", linkedin: "https://www.linkedin.com/company/silqsa", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Luxury resale marketplace.", careers_url: "https://silq.sa" },
{ slug: "ziadah", name: "Ziadah", website: "https://ziadah.com", linkedin: "https://www.linkedin.com/company/ziadahcom", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "B2B marketplace for FMCG.", careers_url: "https://ziadah.com" },
{ slug: "brkz", name: "BRKZ", website: "https://brkz.com", linkedin: "https://www.linkedin.com/company/brkz", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Construction materials marketplace.", careers_url: "https://brkz.com" },
{ slug: "doos", name: "Doos", website: "https://doos.sa", linkedin: "https://www.linkedin.com/company/doossa", stage: "Seed", sector: ["E-commerce"], city: "Riyadh", description: "Social commerce platform.", careers_url: "https://doos.sa" },
```

### IT Solutions (add these):

```typescript
{ slug: "dar-tech", name: "Dar", website: "https://dar.io", linkedin: "https://www.linkedin.com/company/dario-tech", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Digital workspace and productivity tools.", careers_url: "https://dar.io" },
{ slug: "throughput", name: "Throughput", website: "https://throughput.world", linkedin: "https://www.linkedin.com/company/throughput-inc", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI-powered supply chain analytics.", careers_url: "https://throughput.world" },
{ slug: "robonito", name: "Robonito", website: "https://robonito.com", linkedin: "https://www.linkedin.com/company/robonito", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "AI testing automation for web apps.", careers_url: "https://robonito.com" },
{ slug: "tabsense", name: "TABsense", website: "https://tabsense.com", linkedin: "https://www.linkedin.com/company/tabsense", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Smart POS and payment devices.", careers_url: "https://tabsense.com" },
```

### Transport & Logistics (add these):

```typescript
{ slug: "invygo", name: "Invygo", website: "https://invygo.com", linkedin: "https://www.linkedin.com/company/invygo", stage: "Series A", sector: ["Logistics"], city: "Riyadh", description: "Car subscription and flexible ownership.", careers_url: "https://invygo.com" },
{ slug: "torod", name: "Torod", website: "https://torod.com", linkedin: "https://www.linkedin.com/company/torodcom", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "E-commerce shipping and fulfillment.", careers_url: "https://torod.com" },
{ slug: "leejak", name: "Leejak", website: "https://leejak.sa", linkedin: "https://www.linkedin.com/company/leejak", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Last-mile delivery for e-commerce.", careers_url: "https://leejak.sa" },
{ slug: "picship", name: "Picship", website: "https://picship.sa", linkedin: "https://www.linkedin.com/company/picship", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "Package shipping comparison and booking.", careers_url: "https://picship.sa" },
{ slug: "supplai", name: "Supplai", website: "https://supplai.sa", linkedin: "https://www.linkedin.com/company/supplai", stage: "Seed", sector: ["Logistics"], city: "Riyadh", description: "AI-powered procurement for F&B.", careers_url: "https://supplai.sa" },
```

### Healthcare (add these):

```typescript
{ slug: "aumet", name: "Aumet", website: "https://aumet.com", linkedin: "https://www.linkedin.com/company/aumet", stage: "Series A", sector: ["Healthtech"], city: "Riyadh", description: "Pharma B2B marketplace.", careers_url: "https://aumet.com" },
{ slug: "reporty", name: "Reporty", website: "https://reporty.ai", linkedin: "https://www.linkedin.com/company/reportyai", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "AI radiology reporting.", careers_url: "https://reporty.ai" },
{ slug: "kilow", name: "Kilow", website: "https://kilow.sa", linkedin: "https://www.linkedin.com/company/kilow", stage: "Seed", sector: ["Healthtech"], city: "Riyadh", description: "Digital weight management program.", careers_url: "https://kilow.sa" },
```

### Gaming (add these):

```typescript
{ slug: "spoilz", name: "SPOILZ", website: "https://spoilz.co", linkedin: "https://www.linkedin.com/company/spoilz", stage: "Seed", sector: ["Gaming"], city: "Riyadh", description: "Gaming rewards and loyalty platform.", careers_url: "https://spoilz.co" },
```

### Real Estate (add these):

```typescript
{ slug: "mnzl", name: "Mnzl", website: "https://mnzl.com", linkedin: "https://www.linkedin.com/company/mnzl", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Short-term rental management.", careers_url: "https://mnzl.com" },
{ slug: "livedin", name: "Livedin", website: "https://livedin.sa", linkedin: "https://www.linkedin.com/company/livedinsa", stage: "Seed", sector: ["Proptech"], city: "Riyadh", description: "Property management and tenant experience.", careers_url: "https://livedin.sa" },
```

### Media & Entertainment (add these):

```typescript
{ slug: "vuz", name: "Vuz", website: "https://vuz.com", linkedin: "https://www.linkedin.com/company/vaborone", stage: "Series B", sector: ["Media"], city: "Riyadh", description: "Immersive 360 video experiences platform.", careers_url: "https://vuz.com" },
```

### Sports & Fitness (add these):

```typescript
{ slug: "calo", name: "CALO", website: "https://calo.app", linkedin: "https://www.linkedin.com/company/caborone", stage: "Series A", sector: ["Foodtech"], city: "Riyadh", description: "Personalized healthy meal subscriptions.", careers_url: "https://calo.app" },
```

### Construction (add these):

```typescript
{ slug: "trubuild", name: "TruBuild", website: "https://trubuild.co", linkedin: "https://www.linkedin.com/company/trubuildco", stage: "Seed", sector: ["Construction"], city: "Riyadh", description: "Digital construction project management.", careers_url: "https://trubuild.co" },
```

### Travel (add these):

```typescript
{ slug: "firnas", name: "Firnas", website: "https://firnas.sa", linkedin: "https://www.linkedin.com/company/firnassa", stage: "Seed", sector: ["Travel"], city: "Riyadh", description: "AI-powered travel planning.", careers_url: "https://firnas.sa" },
```

### Advertising & Marketing (add these):

```typescript
{ slug: "kliq", name: "KLIQ", website: "https://kliq.sa", linkedin: "https://www.linkedin.com/company/kliqsa", stage: "Seed", sector: ["Media"], city: "Riyadh", description: "Creator economy and influencer platform.", careers_url: "https://kliq.sa" },
{ slug: "halo-media", name: "Halo", website: "https://halo.sa", linkedin: "https://www.linkedin.com/company/halosa", stage: "Seed", sector: ["Media"], city: "Riyadh", description: "Digital advertising platform.", careers_url: "https://halo.sa" },
```

### Sustainability (add these):

```typescript
{ slug: "petroapp", name: "PetroApp", website: "https://petroapp.me", linkedin: "https://www.linkedin.com/company/petroapp", stage: "Seed", sector: ["Energy"], city: "Riyadh", description: "Fuel station management and analytics.", careers_url: "https://petroapp.me" },
```

### Telecom (add these):

```typescript
{ slug: "open-valley", name: "OpenValley", website: "https://openvalley.sa", linkedin: "https://www.linkedin.com/company/openvalley", stage: "Seed", sector: ["SaaS"], city: "Riyadh", description: "Open telecom infrastructure.", careers_url: "https://openvalley.sa" },
```

---

## IMPORTANT: After adding companies

1. Update the sector colors in components/company-logo.tsx to include any new sectors:
```typescript
Gaming: "#EF4444",
Construction: "#92400E",
Travel: "#0891B2",
```

2. Update filterOptions in lib/data.ts (it auto-generates from the data, so just make sure the sector names are consistent).

3. Run validation: `npx tsx scripts/validate-companies.ts`

4. DO NOT invent additional companies beyond what is listed above.
5. DO NOT modify existing company entries.
6. DO NOT guess or fabricate any data not provided here.
