# Search the company directory

The homepage directory lets a user find companies by name (and related text), see when nothing matches, clear the query, filter by sector, and open a company profile from a result.

## Sub-features

- `dir-load` shows the Arabic homepage with `BUILDSAUDI` and a populated company list.
- `dir-dismiss-alert` closes the auto job-alert overlay so the directory is usable.
- `dir-search-name` filters `#main-content` to the queried company.
- `dir-search-empty` shows the empty-results copy for a query with no matches.
- `dir-search-clear` restores the unfiltered list.
- `dir-filter-sector` limits the list to the chosen sector from the desktop aside.
- `dir-open-company` opens the matching company profile from a result link.

## How to get to it (user POV)

- Open `/` (the default landing page).
- Type into the directory search box (`#search-input`).
- Choose a Sector value in the desktop filters aside (1440px and up).
- Choose a company name link in `#main-content`.

## Driving it with control-buildsaudi

Preconditions:

- BuildSaudi is healthy at `http://127.0.0.1:4317` (or the run URL).
- `control-buildsaudi doctor` reports that URL, a live pid, and homepage markers `BUILDSAUDI` and `Humain`.
- Viewport is 1440×900.
- `Humain` exists in the catalog. `Tamara` exists and is Fintech, not the search target.

- **Load directory.** Open the homepage. Run `control-buildsaudi browser goto /`. The `h1` reads `BUILDSAUDI` and `#main-content` includes a `Humain` link and a `Tamara` link.
- **Dismiss auto alert.** The job-alert overlay may appear after ~8s or on scroll. Run `control-buildsaudi browser dismiss-job-alert --wait 9000`. The heading `نرسل لك عروض وظايف مخصصة كل أسبوع.` is gone and `#search-input` is visible.
- **Name search.** Type `Humain`. Run `control-buildsaudi browser fill --selector "#search-input" --value "Humain"`. `#main-content` contains a `Humain` link and does not contain a `Tamara` link. The header hot list may still show Humain / Signit / Lucidya; do not treat those as directory results.
- **Empty state.** Replace the query with a miss. Run `control-buildsaudi browser fill --selector "#search-input" --value "zzzznonexistentcompany"`. `#main-content` shows `no companies match your filters.` and the `clear all filters` control.
- **Clear query.** Clear the box. Run `control-buildsaudi browser fill --selector "#search-input" --clear`. `#main-content` again contains both `Humain` and `Tamara`.
- **Sector filter.** Open the first sidebar combobox and choose `Fintech`. Run `control-buildsaudi browser click --role combobox --nth 0`, then `control-buildsaudi browser click --role option --name "Fintech" --exact`. `#main-content` contains `Tamara` and does not contain `Humain`.
- **Open result.** Clear the sector combobox back to `كل القطاعات` (click the combobox, then the `كل القطاعات` option), search `Humain` again, and open the result. Run `control-buildsaudi browser fill --selector "#search-input" --value "Humain"` and `control-buildsaudi browser click --role link --name "Humain" --nth 0` targeting the `#main-content` link. The URL is `/company/humain` and the `h1` reads `Humain`.
- **Proof.** Capture the filtered directory (after the name search, before navigation) and the opened profile. Run `control-buildsaudi browser snapshot --aria --path .cursor/skills/verify-buildsaudi/artifacts/directory-search/humain-results.aria.json` and `control-buildsaudi browser screenshot --path .cursor/skills/verify-buildsaudi/artifacts/directory-search/humain-results.png` on the search results, then the same pair named `humain-profile.aria.json` / `humain-profile.png` on `/company/humain`. Artifacts identify `BUILDSAUDI`, the query or profile, and `Humain`.

## Gotchas

- Search is client-side React state. `http get /` still lists every company in the HTML; only the rendered `#main-content` is proof.
- Default language is Arabic. The search placeholder is `ابحث عن شركات...`. The zero-results row is hardcoded English (`no companies match your filters.` / `clear all filters`) even in Arabic mode; do not assert `ما في نتائج` here.
- Bash drops `--value ""`. Clear the box with `--clear` (or `--value` with no following token).
- An auto job-alert covers the page ~8s after load (or at 25% scroll) unless `localStorage.buildsaudi_popup_dismissed` is fresh. Close it before asserting search. The home overlay close button has no accessible name; use `dismiss-job-alert`.
- Hot-company links in the header are not filtered. Assert inside `#main-content`.
- Desktop sector/stage filters are hidden below the `lg` breakpoint. 375px runs cannot drive `dir-filter-sector`; report that entry point as unreachable instead of calling the mobile chips a substitute without driving them.
- Sidebar filter labels `Filters` / `Sector` / `Stage` stay English even in Arabic mode. Option values (`Fintech`, `AI`, `Seed`, …) are English.
- Multiple `Humain` links exist (hot list + result). Prefer the `#main-content` link, or `--nth` after confirming which node you clicked.
- Clearing via the trailing X on the search box has no accessible name. Filling `#search-input` with `""` is the stable clear.
