# Deploy BuildSaudi to Cloudflare Workers

This repo builds and runs on Cloudflare Workers via `@opennextjs/cloudflare`. Do not delete the Vercel project. Custom domains `buildsaudi.co` and `www` are attached by the deploy workflow when the zone is on the same Cloudflare account (it already uses Cloudflare nameservers).

`@opennextjs/cloudflare` 1.20.16+ requires Next.js `>=16.4.5` (Nov 2026 security floor). This app is on Next `16.4.6`.

## GitHub Actions deploy

`.github/workflows/cloudflare-deploy.yml` deploys on push to `main` and `workflow_dispatch`.

Repo secrets (`abidalista/buildsaudi` → Settings → Secrets and variables → Actions):

| Secret | Required | Why |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | yes | Wrangler deploy. Token template **Edit Cloudflare Workers**, plus Zone Read / DNS Edit / Workers Routes Edit for `buildsaudi.co` |
| `CLOUDFLARE_ACCOUNT_ID` | recommended | Account that owns the Worker |
| `AIRTABLE_API_KEY` | for API routes | already used by scraper/digest workflows |
| `AIRTABLE_BASE_ID` | for API routes | already used by scraper/digest workflows |
| `PROXY_SECRET` | for `/api/substack` | already used by weekly-digest |
| `SUBSTACK_SID` | for `/api/substack` | previously a Vercel env; GitHub may not have it |
| `PREFERENCES_SECRET` | optional | falls back to `AIRTABLE_API_KEY` |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | optional | inlined at **build** time |

## One-time Cloudflare setup (local)

1. Create a free Cloudflare account and a Workers subdomain (`*.workers.dev`).
2. From this repo:

```bash
npm ci
npx wrangler login
```

3. Set **runtime secrets** (Worker dashboard → Settings → Variables and Secrets, or CLI):

```bash
npx wrangler secret put AIRTABLE_API_KEY
npx wrangler secret put AIRTABLE_BASE_ID
npx wrangler secret put PROXY_SECRET
npx wrangler secret put SUBSTACK_SID
npx wrangler secret put PREFERENCES_SECRET
```

`PREFERENCES_SECRET` is optional. If omitted, preference unsubscribe tokens fall back to `AIRTABLE_API_KEY`.

4. Set **build-time** env so `NEXT_PUBLIC_*` is inlined into the client bundle:

- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`

For a local production build: put it in `.env.production` (gitignored via `.env*.local`; use `.env.production` only on the build machine) or export it in the shell before `npm run deploy`.

On Cloudflare Workers Builds (dashboard Git integration), add the same names under **Build** variables *and* **Worker** secrets/vars.

## Build and deploy

```bash
npm run deploy
```

That runs `opennextjs-cloudflare build` (which calls `next build`) then `opennextjs-cloudflare deploy`.

Local Workers runtime (no deploy):

```bash
npm run preview
```

Worker-only compile (CI):

```bash
npx opennextjs-cloudflare build
```

After deploy, the app is at `https://buildsaudi.<your-subdomain>.workers.dev`. Leave `buildsaudi.co` on Vercel until you are ready to point the zone at this Worker.

## Env vars

| Name | When | Secret? | Used by |
| --- | --- | --- | --- |
| `AIRTABLE_API_KEY` | runtime | yes | `/api/job-seeker`, `/api/preferences`, `/api/suggest` |
| `AIRTABLE_BASE_ID` | runtime | yes | same |
| `PROXY_SECRET` | runtime | yes | `/api/substack` (GitHub weekly digest) |
| `SUBSTACK_SID` | runtime | yes | `/api/substack` session cookie |
| `PREFERENCES_SECRET` | runtime | yes | signed `/preferences` links |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | **build** | no | client analytics |

Not needed on the Worker (GitHub Actions / local scripts only): `VERCEL_DEPLOY_HOOK`, `SUBSTACK_PUBLICATION`, `SUBSTACK_AUTHOR_ID`, `SUBSTACK_PROXY_URL`, Firecrawl keys.

## Crons

There is no `vercel.json` cron. These stay on GitHub Actions:

- `ingest-jobs.yml` — daily 05:00 UTC
- `scraper.yml` — daily 06:00 UTC
- `weekly-digest.yml` — Monday 07:00 UTC (calls `https://buildsaudi.co/api/substack`)

Do not map them to Worker Cron Triggers. They commit to git or run Python and need more than Workers Free CPU.

## Images

`next.config.mjs` keeps `images.unoptimized: true`. Do not add a Wrangler `IMAGES` binding.

## After DNS cutover (later, not now)

1. Confirm `https://buildsaudi.<subdomain>.workers.dev` serves `/`, `/jobs`, and POST `/api/job-seeker` / `/api/suggest` / `/api/preferences` / `/api/substack`.
2. GET `/api/egress-check` — if Substack returns 403, Worker egress is blocked (same class of issue as GitHub Actions).
3. In the Worker, add custom domain `buildsaudi.co` **then** update DNS. Until then, leave Vercel as the origin.
