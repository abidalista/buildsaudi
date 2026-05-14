# Fix Missing Logos (PRIORITY)

29 company logos are showing generic favicons (under 1KB) and are blocklisted to show letter avatars. 44 more have no logo file at all. The logo scripts couldn't reach .sa domains from the cloud.

## Step 1: Run both logo scripts from THIS machine

```bash
npx tsx scripts/scrape-logos.ts
npx tsx scripts/download-logos.ts
```

Your machine can reach .sa domains that the cloud couldn't.

## Step 2: Check what's still missing or too small

```bash
cd public/logos
for f in *.png; do
  size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f" 2>/dev/null)
  if [ "$size" -lt 1000 ]; then
    echo "SMALL: $f ($size bytes)"
  fi
done
```

## Step 3: Manual download for remaining

For EACH company still missing or with a small/generic logo:

1. Open the company website in browser
2. Right-click their logo (usually top-left) → Save Image As
3. Save to `public/logos/{slug}.png`
4. If logo is SVG: open in Preview, export as PNG at 256x256

Priority companies to fix manually (unicorns and big names):
- ninja (ananinja.com)
- foodics (foodics.com)
- hala (hala.com)
- jahez (jahez.net)
- erad (erad.co)
- sary (sary.sa)
- wakecap (wakecap.com)
- elm (elm.sa)
- sdaia (sdaia.gov.sa)
- bayzat (bayzat.com)
- jisr (jisr.net)
- zenhr (zenhr.com)
- trukker (trukker.com)
- gathern (gathern.co)
- rasan (rasan.com)
- calo (calo.app)
- syarah (syarah.com)

## Step 4: Update the blocklist

In `components/company-logo.tsx`, the GENERIC_LOGO_SLUGS set tells the component to skip loading the .png file and show a letter avatar instead. After you save real logos:

1. Remove the slug from GENERIC_LOGO_SLUGS
2. Make sure the new .png file is over 1KB
3. Refresh the site to see the real logo

Current blocklist (companies with known bad/generic files):
```
abwab-ai, bayzat, calo, d360, ejar, erad, fitting, foodics, fordeal,
gathern, gbt, hala, halo-media, hazen, intella-ai, jazer, jisr,
neo-space, ninja, oqood, rasan, salesfine, sayfi, stitch-money,
syarah, trukker, velents, wakecap, zenhr
```

## How the component works

```
slug in GENERIC_LOGO_SLUGS → show colored letter avatar (skip .png)
/logos/{slug}.png exists and loads → show it
/logos/{slug}.png missing or fails → show colored letter avatar
```

No external API calls at runtime. All logos are local static files served from /public/logos/.
