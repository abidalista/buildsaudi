# Open a company profile

A company profile shows the company's name, stage, city, description, official apply link, and any scraped openings, reachable from the directory, the hot list, and jobs-board company links.

## Sub-features

- `profile-from-directory` opens `/company/humain` from a directory name link.
- `profile-from-hot` opens the same profile from the header hot list.
- `profile-from-jobs` opens a company profile from a jobs-board company link.
- `profile-apply-href` keeps `Apply at <name>` on the official careers URL with UTM tags.

## How to get to it (user POV)

- Choose a company name in the homepage list (`#main-content`).
- Choose a hot-company name (Humain, Signit, or Lucidya) in the header card.
- Choose the company name on a jobs-board row.
- Open `/company/humain` directly.

## Driving it with control-buildsaudi

Preconditions:

- BuildSaudi is healthy at the run URL.
- `control-buildsaudi doctor` is green.
- `Humain` is in the catalog (slug `humain`) and `Foodics` has at least one job. If either is missing, fail this journey.

- **Direct URL.** Open the profile. Run `control-buildsaudi browser goto /company/humain`. The `h1` reads `Humain`, the page shows stage `Growth` and city `Riyadh`, and a link named `Apply at Humain` is present.
- **Directory entry.** From `/` with the alert closed, choose Humain in the list. Run `control-buildsaudi browser goto /`, `control-buildsaudi browser dismiss-job-alert --wait 9000`, `control-buildsaudi browser fill --selector "#search-input" --value "Humain"`, and `control-buildsaudi browser click --role link --name "Humain" --nth 0` for the `#main-content` link. URL is `/company/humain` and `h1` is `Humain`.
- **Hot list entry.** From `/` with an empty search, choose Humain in the hot card. Run `control-buildsaudi browser goto /` and `control-buildsaudi browser click --role link --name "Humain" --nth 0` (the header hot link is first at 1440px). Same profile URL and heading.
- **Jobs entry.** From `/jobs`, choose the company name on a Foodics row. Run `control-buildsaudi browser goto /jobs` and `control-buildsaudi browser click --role link --name "Foodics" --nth 0`. URL is `/company/foodics` and `h1` is `Foodics`.
- **Apply href.** On `/company/humain`, read `Apply at Humain` without clicking it. Run `control-buildsaudi browser eval --js "document.querySelector('a[href*=\"utm_source=buildsaudi\"]')?.href"`. The href is Humain's careers host and includes `utm_source=buildsaudi`. Do not click it as proof.
- **Proof.** Capture `/company/humain`. Run `control-buildsaudi browser snapshot --aria --path .cursor/skills/verify-buildsaudi/artifacts/company-profile/humain.aria.json` and `control-buildsaudi browser screenshot --path .cursor/skills/verify-buildsaudi/artifacts/company-profile/humain.png`. Artifacts show `BUILDSAUDI` (or `[ BUILDSAUDI ]`) and `Humain`.

## Gotchas

- Profile layout chrome is a different header (`[ BUILDSAUDI ]`, `Back`, `Jobs`) than the directory. Identity is still the green `BUILDSAUDI` wordmark.
- `Apply at <company>` and `Website` / `LinkedIn` are outbound. Prove `href`, not the destination page.
- Dead slugs in `next.config.mjs` redirect `/company/<slug>` to `/`. If you typed a removed slug, you are no longer on a profile; do not call that a profile proof.
- Hot-list slugs are hardcoded (`humain`, `signit`, `lucidya`). If those three change, this entry point is unreachable until the map is updated.
