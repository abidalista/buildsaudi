# Browse the jobs board

The jobs board lists individual openings from the catalog, lets a user search by job or company text, shows when nothing matches, and points Apply at the employer's official posting.

## Sub-features

- `jobs-open` opens `/jobs` from the homepage and from a direct URL.
- `jobs-search-title` filters the list to openings whose title or company matches.
- `jobs-search-empty` shows the empty-results copy for a query with no matches.
- `jobs-apply-href` keeps Apply on the official posting with the BuildSaudi UTM tags.

## How to get to it (user POV)

- Choose `الوظائف` (Arabic) or `Jobs` (English) in the homepage header.
- Open `/jobs` directly.
- Type into the jobs search box.
- Choose `Apply` on a row (external).

## Driving it with control-buildsaudi

Preconditions:

- BuildSaudi is healthy at the run URL.
- `control-buildsaudi doctor` is green.
- Viewport is 1440×900.
- `data/jobs.json` contains an opening titled `AI Engineer` at `Foodics`. If it does not, fail this journey.

- **Header entry.** From `/` with the job-alert closed, choose Jobs. Run `control-buildsaudi browser goto /`, `control-buildsaudi browser dismiss-job-alert --wait 9000`, and `control-buildsaudi browser click --role link --name "الوظائف"`. The URL is `/jobs`, the heading still reads `BUILDSAUDI`, and the page shows a jobs count plus at least one `Foodics` link.
- **Direct URL.** Open the board without the homepage. Run `control-buildsaudi browser goto /jobs`. Same usable board: `BUILDSAUDI` and at least one job row.
- **Title search.** Type `AI Engineer`. Run `control-buildsaudi browser fill --role textbox --name "ابحث عن وظيفة أو شركة..." --value "AI Engineer"`. A heading `AI Engineer` is visible and a `Foodics` link is visible. The URL query includes `q=AI+Engineer` (or `q=AI%20Engineer`).
- **Empty state.** Replace the query with a miss. Run `control-buildsaudi browser fill --role textbox --name "ابحث عن وظيفة أو شركة..." --value "zzzznojobmatch"`. The page shows `ما في وظائف تطابق الفلاتر.` and `امسح الفلاتر`.
- **Apply href.** Search `AI Engineer` again and read the Apply link on that row without clicking it. Run `control-buildsaudi browser fill --role textbox --name "ابحث عن وظيفة أو شركة..." --value "AI Engineer"` and `control-buildsaudi browser eval --js "document.querySelector('a[href*=\"foodics\"][href*=\"utm_source=buildsaudi\"]')?.href"`. The href host is the official Foodics board (`apply.workable.com` for this fixture) and includes `utm_source=buildsaudi`. Do not click Apply as proof; it leaves the app.
- **Proof.** Capture the filtered board. Run `control-buildsaudi browser snapshot --aria --path .cursor/skills/verify-buildsaudi/artifacts/jobs-board/ai-engineer.aria.json` and `control-buildsaudi browser screenshot --path .cursor/skills/verify-buildsaudi/artifacts/jobs-board/ai-engineer.png`. Artifacts identify `BUILDSAUDI`, `AI Engineer`, and `Foodics`.

## Gotchas

- The jobs search box has no `id`. Drive it by placeholder. After switching to English the name is `search jobs or companies...`.
- Query string sync is async via `router.replace`. Wait for `q=` in the URL (or the filtered heading) rather than a fixed sleep.
- Coverage copy and counts update with the catalog scrape. Assert names (`AI Engineer`, `Foodics`), not a hardcoded job total.
- `Apply` and the AI-apply upsell are outbound. Proving them by navigating away is not a jobs-board proof. Check `href` only.
- Homepage header `الوظائف` is a different string from the jobs-page title `الوظائف` in the tagline. After navigation, confirm the path `/jobs`.
