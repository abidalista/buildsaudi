---
name: verify-buildsaudi
description: Drive the BuildSaudi web app (company directory + jobs board) the way a user does. Use when proving UI behavior, search/filter, language toggle, company pages, or job-alert UI — not for production deploys or Airtable writes.
---

# Verify BuildSaudi

BuildSaudi is a Next.js 16 site: a curated Saudi startup directory at `/` and individual openings at `/jobs`. Primary surface is the web UI. Secondary surfaces (do not treat as the harness): JSON/API routes under `/api/*` (Airtable + Substack), scrape/ingest scripts, and the static `/v/*` visual experiments.

There is no Playwright/Cypress suite in the app. Drive the real pages in a browser over CDP via `control-buildsaudi`. Seed data is in-repo (`lib/data.ts`, `data/jobs.json`); a local run does not need a database. Airtable/PostHog/GA keys are not required to browse, search, or open company pages.

## Launch

From the repo root, install app deps if `node_modules` is missing (`npm install`). Then start a disposable instance this run owns:

```bash
export BUILDSAUDI_VERIFY_RUN_ID="${BUILDSAUDI_VERIFY_RUN_ID:-$RANDOM}"
export BUILDSAUDI_VERIFY_PORT="${BUILDSAUDI_VERIFY_PORT:-4317}"
export BUILDSAUDI_VERIFY_CDP_PORT="${BUILDSAUDI_VERIFY_CDP_PORT:-4318}"
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi launch
```

Launch starts `npm run dev -- --port $PORT --hostname 127.0.0.1` in tmux session `buildsaudi-verify-$RUN_ID` (or a detached process if tmux is absent). State lives in `/tmp/buildsaudi-verify/$RUN_ID/state.json`.

**Ready** means HTTP `200` on `http://127.0.0.1:$PORT/` whose HTML contains both `BUILDSAUDI` and `Humain`, and `/jobs` also returns `200` with `BUILDSAUDI`. A listening port is not enough: the first Next compile can still be in progress. `launch` waits until the homepage is usable.

Do not attach to whatever is already on `:3000`. If the chosen port is occupied, pick another `BUILDSAUDI_VERIFY_PORT` / `BUILDSAUDI_VERIFY_CDP_PORT` pair. Two runs can sit side by side on different ports; they must not share a Chrome user-data dir (that dir is per `RUN_ID` under `/tmp/buildsaudi-verify/`).

No `.env.local` is required for directory, jobs, language, or company-profile journeys. Do not create secrets files.

Teardown: `.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi cleanup` (see Cleanup).

## Doctor

Run this first whenever anything looks off:

```bash
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi doctor
```

Doctor is read-only. It must report all of:

- the PID recorded at launch is still alive
- that PID's port is the one in the state file
- `GET $URL/` → 200 with `BUILDSAUDI` and `Humain` in the HTML
- `GET $URL/jobs` → 200 with `BUILDSAUDI`

Exit code `2` means do not drive this instance. Never drive a URL you did not launch.

## Drive

Harness: `control-buildsaudi browser` (Playwright-core over Chrome CDP, viewport **1440×900** so desktop filters and the desktop language toggle are visible). Chrome stays up across commands; React client state (search boxes, open modals) survives. Helper install is local to the skill (`scripts/npm install`) and is not an app dependency.

```bash
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser start
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser goto /
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser click --role link --name "Humain" --nth 0
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser fill --selector "#search-input" --value "Humain"
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser fill --role textbox --name "search companies..." --value "Humain"
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser click --role button --name "Switch to English"
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser dismiss-job-alert --wait 9000
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser snapshot --aria --path .cursor/skills/verify-buildsaudi/artifacts/<feature>/<name>.aria.json
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi browser screenshot --path .cursor/skills/verify-buildsaudi/artifacts/<feature>/<name>.png
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi http get /jobs
```

Stable handles from this repo (prefer these over CSS position or tab order):

| Control | Handle |
| --- | --- |
| Directory search | `#search-input` (placeholder `ابحث عن شركات...` / `search companies...`) |
| Jobs search | textbox whose placeholder is `ابحث عن وظيفة أو شركة...` / `search jobs or companies...` (no id) |
| Language toggle | `button` named `Switch to English` (when `lang=ar`) or `التبديل للعربية` (when `lang=en`) |
| Jobs board | header `link` named `الوظائف` / `Jobs` |
| Directory from jobs | `link` named `الدليل` / `Directory` |
| Company in the list | `link` named the company (`Humain`, `Tamara`, `Foodics`) inside `#main-content` |
| Hot companies | the same names in the header card; they are **not** filtered by search |
| Sector filter (desktop aside) | first `combobox` in the sidebar; options are English values from `lib/data.ts` (`AI`, `Fintech`, …) even when the UI language is Arabic |
| Job-alert close (jobs page modal) | `button` named `Close` |
| Job-alert close (home overlay) | no accessible name; use `dismiss-job-alert` |
| Company profile heading | `h1` with the company name on `/company/<slug>` |

Default UI language is **Arabic** (`lib/lang.ts`). Company names stay English. Read the matching file under `features/` before driving; follow every listed entry point.

Do not POST `/api/job-seeker`, `/api/suggest`, or `/api/preferences` from a verification run. Those write Airtable (and job-seeker also hits Substack). Prove the form UI and browser-native `required` checks only.

## Evidence

Store proof under `.cursor/skills/verify-buildsaudi/artifacts/<feature-id>/`. Cleanup must not delete this directory.

Standards:

- Exercise the real user path in the launched browser. Do not stub `filteredCompanies`, call test-only endpoints, or treat `GET /` HTML as proof of client-side search (search is React state; the document source still has every company).
- Capture the action **and** the resulting state (ARIA snapshot + screenshot with `BUILDSAUDI` visible in the header).
- For mutations you are allowed to perform (search, filter, language, navigation), capture a second view: list vs empty, `ar` vs `en`, directory vs `/company/<slug>`.
- External apply links (`viewJobs` / `Apply` / `Apply at <company>`) leave the app. Prove the `href` contains the official careers host and `utm_source=buildsaudi` when the URL is http(s). Do not click through as the success condition, and do not write Airtable rows as a side-effect check.
- Record the feature id and entry point on every artifact (put them in the snapshot JSON via the page URL / heading, and in the filename).

## Cleanup

```bash
.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi cleanup
```

Kills only the Next pid/tmux session and Chrome pid recorded in `/tmp/buildsaudi-verify/$RUN_ID/state.json`. Never `pkill next` / `pkill chrome`. Removes that run's state file and Chrome profile. **Leaves artifacts in place.** After cleanup, confirm `.cursor/skills/verify-buildsaudi/artifacts/<feature>/` still exists.

If a launch or drive fails, run cleanup before the next attempt so ports `4317`/`4318` (or whatever you set) are not stranded.

## Helpers

`scripts/control-buildsaudi` is executable. On first run it `npm install`s `playwright-core` inside `scripts/` (gitignored). It uses `google-chrome` / `chromium` already on the machine (`playwright-core` + channel, no browser download). Invocation is the commands in Launch / Doctor / Drive / Cleanup. A helper the reader has to reverse-engineer is not a helper: pass the flags as written in `features/`.
