# BuildSaudi verification map

This directory is the maintained source for verifying the user-facing behavior of BuildSaudi. Read the index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch BuildSaudi at `http://127.0.0.1:4317` (or the port in the run's state file) with `control-buildsaudi launch`.
- Set `BUILDSAUDI_VERIFY_RUN_ID` so concurrent runs do not share `/tmp/buildsaudi-verify/$RUN_ID` or a Chrome profile.
- Seed data is the in-repo catalog: company `Humain` (slug `humain`, sector `AI`) and job `AI Engineer` at `Foodics` must exist. If a journey's company or job is missing from `lib/data.ts` / `data/jobs.json`, fail the journey and record it in that feature's Gotchas — do not pick a substitute and call the path verified.
- Put `.cursor/skills/verify-buildsaudi/scripts/control-buildsaudi` on `PATH` or invoke it by repo-relative path.
- Run `control-buildsaudi doctor` and require the expected URL, pid, and homepage markers `BUILDSAUDI` and `Humain`.
- Drive at 1440×900. Desktop filters and the desktop language toggle are `lg:`-only.
- Never drive an instance that was not started by this verification run.
- Never POST `/api/job-seeker`, `/api/suggest`, or `/api/preferences`.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise.
- Prefer ARIA roles, accessible names, `#search-input`, and route paths over CSS position.
- Treat every command as literal. Keep quoted names and flags unchanged.
- Run browser actions through `control-buildsaudi browser`.
- Run read-only HTTP through `control-buildsaudi http get`.
- Default language is Arabic. Toggle to English when a recipe needs English accessible names.
- After a mutation, restore the page to the baseline (clear search, `/` loaded, job-alert closed) before the next feature. Do not remove proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes an ARIA snapshot and a screenshot with `BUILDSAUDI` visible.
- HTTP proof includes the URL, status code, and a body excerpt.
- Client-side search/filter proof must come from the rendered `#main-content` (or jobs list), not the raw HTML document.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with control-buildsaudi` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Search the company directory](./directory-search.md) covers homepage search, empty results, clear, sector filter, and opening a company.
- [Browse the jobs board](./jobs-board.md) covers `/jobs` search, empty results, and apply-link shape.
- [Switch language](./language-toggle.md) covers Arabic default, English toggle, persistence, and RTL/LTR.
- [Open a company profile](./company-profile.md) covers `/company/<slug>` from the directory, hot list, and jobs cards.
- [Job alerts form](./job-alerts.md) covers opening and dismissing the signup UI without submitting to Airtable.
