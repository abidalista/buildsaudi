# Add a New Company to BuildSaudi

## Instructions for Cursor

When I give you a company name and website, do ALL of these steps:

### 1. Research the company
Using the website and LinkedIn, find:
- **slug**: lowercase, hyphenated version of the name (e.g. "lean-technologies")
- **name**: official company name
- **website**: full URL
- **linkedin**: LinkedIn company page URL
- **stage**: one of Seed, Series A, Series B, Series C, Growth, Unicorn
- **sector**: one of: AI, Fintech, Proptech, Cybersecurity, E-commerce, SaaS, Logistics, Govtech, Energy, Defense, Aerospace, Construction, Healthtech, Edtech, Agriculture, Geospatial, HR Tech, Foodtech, Robotics, Data & Infrastructure, Deep Tech, IoT, Media, Gaming, Travel
- **city**: Saudi city (usually Riyadh, Jeddah, or Dammam)
- **description**: one sentence, max 10 words
- **careers_url**: careers page URL (or website if none)
- **founders**: comma-separated founder names
- **total_raised**: funding amount (e.g. "$10M") or "Undisclosed"
- **team_size**: one of: 1-10, 11-50, 51-200, 201-500, 501-1000, 1000+
- **founded_year**: four-digit year

### 2. Add to data.ts
Add the company entry to `lib/data.ts` in the correct section (by sector). Every field must be filled. No dashes, no blanks.

Example entry:
```typescript
{ slug: "example-co", name: "Example Co", website: "https://example.com", linkedin: "https://www.linkedin.com/company/example", stage: "Seed", sector: ["AI"], city: "Riyadh", description: "AI-powered analytics platform.", careers_url: "https://example.com/careers", founders: "John Doe, Jane Smith", total_raised: "$5M", team_size: "11-50", founded_year: 2022 },
```

### 3. Download the logo
Save the company logo to `public/logos/{slug}.png`. Get it from:
1. The company website (right-click logo, save as PNG)
2. Or their LinkedIn page
3. Or `https://logo.clearbit.com/{domain}`

If the logo is under 1KB or generic, add the slug to `GENERIC_LOGO_SLUGS` in `components/company-logo.tsx` instead.

### 4. Validate
- Confirm the website loads
- Confirm LinkedIn page exists
- No duplicate slugs in data.ts
- All required fields present

### DO NOT
- Add companies without ALL fields filled
- Use AI-generated/hallucinated data for founders or funding
- Add duplicate entries
- Leave any field as "—" or empty
