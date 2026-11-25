# Featured / sponsored job slot — scope only

Do not build this yet. No live payments, Stripe keys, or checkout UI in this pass.

Goal: let a company pay to pin one opening at the top of the jobs board. BuildSaudi’s only live revenue today is the AI Apply affiliate. This is the simplest paid product that sits next to that, without replacing it.

## Where it appears

One slot. Organic list stays unchanged underneath.

| Surface | Placement |
| --- | --- |
| `/jobs` (primary) | One card above the organic list, below the search/filters. Same `JobCard` layout plus a small `Featured` / `مميز` badge. |
| `/jobs/{city}` | Same slot if the featured job’s city matches (Riyadh first). Skip the slot if it does not match the page. |
| Company page | No extra slot. The company’s own roles already sit on `/company/{slug}`. |

Do not add a second homepage slot, newsletter placement, or “featured company” in this version. One paid row is enough to learn if anyone pays.

The featured card still uses the official `apply_url` with `utm_source=buildsaudi`. Do not route it through AI Apply.

## Data model

Jobs today live in `data/jobs.json` (`Job` in `lib/types.ts`) and optionally Airtable (`Jobs` table in `lib/airtable.ts`). Keep scrape fields as they are. Add sponsorship as overlay fields, not as a new job type.

On `Job`:

```ts
featured?: boolean
featured_until?: string // ISO date, inclusive
featured_order?: number // 1 = the live slot; ignore the rest
```

Airtable (if the Jobs table is still the source of truth for flags):

| Field | Type | Notes |
| --- | --- | --- |
| Featured | checkbox | Live only when true **and** `Featured Until` is in the future |
| Featured Until | date | End of the paid window |
| Featured Order | number | `1` is the only rendered slot |
| Stripe Payment Link | url | Receipt / payment-link URL, not a secret |
| Sponsor Email | email | Who paid, for the expiry ping |

Render rule: pick the job with `featured === true`, `featured_until >= today`, lowest `featured_order`. If none, show no slot. If two overlap, show one and leave the other in a queue — do not stack cards.

Expiry is a date check at render time. No cron required for v1. After expiry the row falls back into the organic list in scrape order.

## Simplest payment path

Use a **Stripe Payment Link**. No Stripe SDK, webhook handler, or Customer Portal in the app.

1. Create one Payment Link in the Stripe Dashboard (one-off, e.g. 7 or 14 days, SAR). Product name: `BuildSaudi featured job slot`.
2. Put the public URL in an email/DM template: company name, job title, apply URL, dates.
3. After Stripe emails the payment, set `Featured` + `Featured Until` on that job in Airtable (or a one-line edit in `data/jobs.json` if Airtable is not used for jobs).
4. Redeploy / next ingest picks it up. The site never talks to Stripe.

Do not collect cards on buildsaudi.co. Do not store Stripe secrets in this repo or in Cloudflare Worker env for this v1.

Later, if more than a handful of companies pay:

- Payment Link `after_completion` → a `/sponsor/thanks` page (no charge logic).
- Optional Stripe webhook → flip the Airtable checkbox. Still no in-app checkout.

## Out of scope

- Multiple concurrent slots, auctions, or auto-renew
- Company-profile “featured” badges
- Mixing this with the AI Apply affiliate CTA
- Live Stripe keys, test charges, or a paywall

## Done when (later build)

- One featured card can be turned on from data + a date
- It shows on `/jobs` (and matching city pages) with a badge
- Payment is a Stripe Payment Link opened outside the site
- Organic jobs and AI Apply placements are untouched
