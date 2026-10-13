# Switch language

Language toggle switches the UI between Arabic (default, RTL) and English (LTR), including search placeholders and header actions, and stores the choice for the next page.

## Sub-features

- `lang-default-ar` loads `/` in Arabic with `dir=rtl`.
- `lang-to-en` switches copy and `dir` to English / LTR.
- `lang-to-ar` switches back to Arabic / RTL.
- `lang-persist` keeps English after a navigation to `/jobs`.

## How to get to it (user POV)

- Choose the flag toggle in the homepage header (desktop, 1440px).
- Choose the same toggle on `/jobs`.
- Reload or move between `/` and `/jobs` after a choice.

## Driving it with control-buildsaudi

Preconditions:

- BuildSaudi is healthy at the run URL.
- `control-buildsaudi doctor` is green.
- Viewport is 1440×900 so the desktop toggle is the one on screen (the mobile duplicate is `lg:hidden`).
- Job-alert overlay is closed.

- **Default Arabic.** Open `/`. Run `control-buildsaudi browser goto /` and `control-buildsaudi browser dismiss-job-alert --wait 9000`. `document.documentElement.lang` is `ar`, `dir` is `rtl`, `#search-input` placeholder is `ابحث عن شركات...`, and a `الوظائف` link is visible.
- **Switch to English.** Choose the toggle. Run `control-buildsaudi browser click --role button --name "Switch to English"`. `lang` is `en`, `dir` is `ltr`, placeholder is `search companies...`, the jobs link reads `Jobs`, and the toggle's accessible name is now `التبديل للعربية`.
- **Persist on jobs.** Open the jobs board without touching the toggle again. Run `control-buildsaudi browser click --role link --name "Jobs"`. `/jobs` shows `search jobs or companies...` and `Get job alerts`, with `dir=ltr`.
- **Switch back.** Choose the toggle on `/jobs`. Run `control-buildsaudi browser click --role button --name "التبديل للعربية"`. Copy returns to Arabic (`ابحث عن وظيفة أو شركة...`) and `dir` is `rtl`.
- **Proof.** Capture Arabic homepage and English homepage. Run `control-buildsaudi browser snapshot --aria --path .cursor/skills/verify-buildsaudi/artifacts/language-toggle/en.aria.json` and `control-buildsaudi browser screenshot --path .cursor/skills/verify-buildsaudi/artifacts/language-toggle/en.png` after `lang-to-en`, plus `ar.aria.json` / `ar.png` after return to Arabic on `/`. Artifacts show `BUILDSAUDI` and the language-specific placeholder or Jobs label.

## Gotchas

- Two toggles exist in the homepage DOM (mobile + desktop). At 1440px click the visible `Switch to English` button; a hidden duplicate can steal `--nth` if you do not wait for visibility.
- Company names, sector option values, and the word `BUILDSAUDI` do not translate. Assert chrome copy (placeholders, Jobs/Directory, alert title), `lang`, and `dir`.
- Persistence is `localStorage.buildsaudi_lang`. A new Chrome profile (fresh `RUN_ID`) starts at Arabic even if a previous run left English in another profile.
- `/company/<slug>` profile chrome is largely English regardless of the toggle (back link `Back`, `Jobs` button). Do not use the profile page as proof of the toggle.
