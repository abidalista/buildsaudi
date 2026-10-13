# Job alerts form

Job alerts is a signup overlay: the user opens it from the header (or it auto-opens), sees name / title / email fields, and can dismiss it. Successful submit writes Airtable and Substack and is **out of scope** for this skill.

## Sub-features

- `alert-header` opens the overlay from the homepage `تنبيهات الوظائف` control.
- `alert-deep-link` opens the overlay from `/?open_alerts=1`.
- `alert-auto` auto-opens ~8s after the first homepage visit of the day.
- `alert-required` keeps an empty submit on the form (browser `required`).
- `alert-dismiss` closes the overlay from the close control without creating a seeker.

## How to get to it (user POV)

- Choose `تنبيهات الوظائف` (Arabic) or `Get job alerts` (English) in the homepage header.
- Choose the same label on `/jobs`, or `احصل على تنبيهات الوظائف` / `Get job alerts` in the jobs coverage banner.
- Open `/?open_alerts=1`.
- Wait ~8 seconds on a homepage that has not dismissed the popup in the last 24 hours.
- Choose close / backdrop to dismiss.

## Driving it with control-buildsaudi

Preconditions:

- BuildSaudi is healthy at the run URL.
- `control-buildsaudi doctor` is green.
- Viewport is 1440×900.
- Use a fresh Chrome profile (new `RUN_ID`) when proving `alert-auto`. A profile that already set `buildsaudi_popup_dismissed` will not auto-open.
- Do not submit the form. Do not `POST /api/job-seeker`.

- **Header entry.** Open `/` and close any auto overlay, then open alerts from the header. Run `control-buildsaudi browser goto /`, `control-buildsaudi browser dismiss-job-alert --wait 9000`, and `control-buildsaudi browser click --role button --name "تنبيهات الوظائف"`. A heading `نرسل لك عروض وظايف مخصصة كل أسبوع.` is visible with textboxes for name, title, and email, and a submit control `احصل على تنبيهات الوظائف`.
- **Deep link.** Open the query flag in a context where the overlay is not already open. Run `control-buildsaudi browser goto /?open_alerts=1`. The same heading and fields appear. The URL is then rewritten to `/` without `open_alerts`.
- **Required fields.** With the overlay open and fields empty, choose submit. Run `control-buildsaudi browser click --role button --name "احصل على تنبيهات الوظائف"`. The overlay stays open, no success copy `تم! بنرسلك الوظائف أول ما تنزل.` appears, and the run does not call `/api/job-seeker`.
- **Dismiss.** Close without submitting. Run `control-buildsaudi browser dismiss-job-alert`. The heading is gone and the directory search box is usable again.
- **Jobs-page entry.** On `/jobs`, choose the header alerts control. Run `control-buildsaudi browser goto /jobs` and `control-buildsaudi browser click --role button --name "تنبيهات الوظائف"`. The jobs modal heading is the same Arabic title; its close control is a `button` named `Close`. Dismiss with `control-buildsaudi browser click --role button --name "Close"`.
- **Proof.** Capture the open overlay (header entry) and the dismissed directory. Run `control-buildsaudi browser snapshot --aria --path .cursor/skills/verify-buildsaudi/artifacts/job-alerts/open.aria.json` and `control-buildsaudi browser screenshot --path .cursor/skills/verify-buildsaudi/artifacts/job-alerts/open.png` while the heading is visible, then `dismissed.aria.json` / `dismissed.png` after close. Artifacts identify `BUILDSAUDI` and the alert heading or its absence. No Airtable row is created.

## Gotchas

- Auto-open fires once per 24h per profile (`localStorage.buildsaudi_popup_dismissed`). Proving `alert-auto` requires a fresh Chrome profile and waiting up to 9s. If the overlay never appears, report `alert-auto` unreachable with that precondition — do not skip it and mark `alert-header` as covering auto-open.
- Home overlay close has no `aria-label`. Jobs-page modal close does (`Close`). Use `dismiss-job-alert` on `/`.
- Submit success talks to Airtable `Job Seekers` and Substack. Local `npm run dev` without those secrets errors; with production secrets it would create a real subscriber. Never fill and submit during verification.
- `/submit` is a different, mostly-fake form (client `setSubmitted(true)` only). It is not this feature.
- English names after toggle: header `Get job alerts`, submit `Get job alerts`, success `You're in! We'll notify you when jobs drop.`
