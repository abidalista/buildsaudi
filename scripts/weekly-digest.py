#!/usr/bin/env python3
"""
BuildSaudi Weekly Jobs Digest
- Fetches SA jobs from Greenhouse, Workable, Lever, Recruitee
- Syncs Airtable subscribers → Substack (fills gaps)
- Creates and publishes the digest as a Substack newsletter post

Run:  python3 scripts/weekly-digest.py
Dry:  python3 scripts/weekly-digest.py --dry-run   (no publish, saves HTML only)
"""

import json
import os
import sys
import time
import requests
from datetime import datetime

DRY_RUN = "--dry-run" in sys.argv

# ─── Load env ────────────────────────────────────────────────────────────────
env_file = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".env.local"))
if os.path.exists(env_file):
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

AIRTABLE_API_KEY    = os.environ["AIRTABLE_API_KEY"]
AIRTABLE_BASE_ID    = os.environ["AIRTABLE_BASE_ID"]
SUBSTACK_SID        = os.environ["SUBSTACK_SID"]
SUBSTACK_PUB        = os.environ.get("SUBSTACK_PUBLICATION", "averageabidall")
SUBSTACK_AUTHOR_ID  = int(os.environ.get("SUBSTACK_AUTHOR_ID", "68540577"))
SUBSTACK_BASE       = f"https://{SUBSTACK_PUB}.substack.com"
SUBSTACK_COOKIE     = f"substack.sid={SUBSTACK_SID}"


# ─── Company → ATS Mapping ──────────────────────────────────────────────────
COMPANIES = [
    {"name": "Tamara",   "ats": "greenhouse", "slug": "tamara",    "url": "https://tamara.co"},
    {"name": "HALA",     "ats": "greenhouse", "slug": "hala",      "url": "https://hala.com"},
    {"name": "Foodics",  "ats": "workable",   "slug": "foodics",   "url": "https://foodics.com"},
    {"name": "Lucidya",  "ats": "workable",   "slug": "lucidya",   "url": "https://lucidya.com"},
    {"name": "Syarah",   "ats": "workable",   "slug": "syarah",    "url": "https://syarah.com"},
    {"name": "Sary",     "ats": "workable",   "slug": "sary",      "url": "https://sary.sa"},
    {"name": "Rewaa",    "ats": "lever",      "slug": "rewaatech", "url": "https://rewaa.com"},
    {"name": "Unifonic", "ats": "recruitee",  "slug": "unifonic",  "url": "https://unifonic.com"},
]

SA_INDICATORS = [
    "saudi arabia", "saudi", "ksa", "riyadh", "jeddah", "dammam",
    "al khobar", "makkah", "medina", "tabuk", "abha",
    "الرياض", "المملكة العربية السعودية", "السعودية"
]

def is_saudi(text: str) -> bool:
    t = (text or "").lower()
    return any(s in t for s in SA_INDICATORS)


# ─── Categorization ──────────────────────────────────────────────────────────
def get_tag(title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["software","developer","engineer","backend","frontend","fullstack","devops","sre","cybersecurity","soc","security","cloud","ai","machine learning","ml","data engineer","it","embedded","rtl","computer","mobile","ios","android","qa","test","mechanical","electrical","industrial","nuclear","network","system admin","technical support","دعم فني"]): return "tech"
    if any(k in t for k in ["finance","accounting","accountant","treasury","financial","cashier","auditor","bookkeeper","محاسب","مالي"]): return "finance"
    if any(k in t for k in ["sales","marketing","growth","seo","content","copywriter","social media","brand","communications","pr ","public relation","advertising","مبيعات","تسويق"]): return "sales and marketing"
    if any(k in t for k in ["operations","pmo","project","procurement","supply chain","logistics","hr","human resource","talent","recruiter","people","admin","office manager","business analyst","account manager","coordinator"]): return "operations"
    if any(k in t for k in ["product","design","ux","ui","graphic","interior","game design","creative","art director","تصميم"]): return "product"
    if any(k in t for k in ["intern","coop","co-op","trainee","fresh grad","junior","entry level","متدرب","تدريب"]): return "early career"
    return ""


# ─── ATS Fetchers ────────────────────────────────────────────────────────────
def fetch_greenhouse(slug):
    r = requests.get(f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs", timeout=15)
    r.raise_for_status()
    return [{"title": j["title"], "location": j["location"]["name"], "url": j["absolute_url"]}
            for j in r.json().get("jobs", []) if is_saudi(j.get("location", {}).get("name", ""))]

def fetch_workable(slug):
    r = requests.post(f"https://apply.workable.com/api/v3/accounts/{slug}/jobs",
                      json={"query":"","location":[],"department":[],"worktype":[],"remote":[]}, timeout=15)
    r.raise_for_status()
    results = []
    for j in r.json().get("results", []):
        loc = j.get("location", {})
        country, city = loc.get("country",""), loc.get("city","")
        if is_saudi(country) or is_saudi(city):
            results.append({"title": j["title"], "location": f"{city}, {country}".strip(", "),
                            "url": f"https://apply.workable.com/{slug}/j/{j.get('shortcode','/')}/"})
    return results

def fetch_lever(company):
    r = requests.get(f"https://api.lever.co/v0/postings/{company}?mode=json", timeout=15)
    r.raise_for_status()
    jobs = r.json() if isinstance(r.json(), list) else []
    return [{"title": j["text"], "location": j["categories"]["location"], "url": j["hostedUrl"]}
            for j in jobs if is_saudi(j.get("categories", {}).get("location", ""))]

def fetch_recruitee(slug):
    r = requests.get(f"https://{slug}.recruitee.com/api/offers/", timeout=15)
    r.raise_for_status()
    results = []
    for o in r.json().get("offers", []):
        country, city = o.get("country",""), o.get("city","")
        if is_saudi(country) or is_saudi(city):
            results.append({"title": o["title"], "location": f"{city}, {country}".strip(", "),
                            "url": o.get("careers_url", f"https://{slug}.recruitee.com/o/{o.get('slug','')}")})
    return results

FETCHERS = {"greenhouse": fetch_greenhouse, "workable": fetch_workable,
            "lever": fetch_lever, "recruitee": fetch_recruitee}

def fetch_all():
    result = {}
    for c in COMPANIES:
        print(f"  {c['name']} ({c['ats']})...", end=" ", flush=True)
        try:
            jobs = FETCHERS[c["ats"]](c["slug"])
            print(f"{len(jobs)} SA jobs")
            if jobs:
                result[c["name"]] = {"jobs": jobs, "url": c["url"]}
        except Exception as e:
            print(f"ERROR: {e}")
    return result


# ─── Airtable → Substack Sync ────────────────────────────────────────────────
def get_airtable_subscribers():
    """Fetch all emails from the Job Seekers table."""
    emails = []
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/Job%20Seekers"
    headers = {"Authorization": f"Bearer {AIRTABLE_API_KEY}"}
    params = {"fields[]": "Email", "pageSize": 100}
    while True:
        r = requests.get(url, headers=headers, params=params, timeout=15)
        r.raise_for_status()
        data = r.json()
        for rec in data.get("records", []):
            email = rec.get("fields", {}).get("Email", "").strip()
            if email:
                emails.append(email)
        offset = data.get("offset")
        if not offset:
            break
        params["offset"] = offset
    return emails

def sync_to_substack(emails: list):
    """Add any missing subscribers to Substack."""
    print(f"  Syncing {len(emails)} Airtable subscribers → Substack...")
    success, failed = 0, 0
    for email in emails:
        try:
            r = requests.post(
                f"https://{SUBSTACK_PUB}.substack.com/api/v1/free",
                json={"email": email, "first_url": "https://buildsaudi.co", "first_referrer": ""},
                timeout=10
            )
            if r.ok:
                success += 1
            else:
                failed += 1
            time.sleep(0.1)  # gentle rate limiting
        except Exception:
            failed += 1
    print(f"  Synced: {success} ok, {failed} failed")


# ─── Build Substack Prosemirror Body ─────────────────────────────────────────
CATEGORY_META = {
    "tech":               {"label": "Tech & Engineering",  "icon": "💻"},
    "finance":            {"label": "Finance",             "icon": "💰"},
    "sales and marketing":{"label": "Sales & Marketing",  "icon": "📣"},
    "operations":         {"label": "Operations",          "icon": "⚙️"},
    "product":            {"label": "Product & Design",    "icon": "🎨"},
    "early career":       {"label": "Early Career",        "icon": "🌱"},
}

def text_node(text, marks=None):
    node = {"type": "text", "text": text}
    if marks:
        node["marks"] = marks
    return node

def para(*content):
    return {"type": "paragraph", "content": list(content)}

def heading(level, text):
    return {"type": "heading", "attrs": {"level": level},
            "content": [{"type": "text", "text": text}]}

def hr():
    return {"type": "horizontalRule"}

def bullet_list(items):
    return {
        "type": "bulletList",
        "content": [
            {"type": "listItem", "content": [
                para(
                    text_node(job["title"], marks=[{"type": "link", "attrs": {"href": job["url"], "target": "_blank"}}]),
                    text_node(f"  ·  {job['company']}  ·  {job['location']}")
                )
            ]}
            for job in items
        ]
    }

def build_prosemirror(company_jobs: dict, date_str: str) -> tuple:
    """Returns (prosemirror_json_str, total_jobs, categorized)."""
    categorized = {k: [] for k in CATEGORY_META}
    total = 0
    for company_name, data in company_jobs.items():
        for job in data["jobs"]:
            tag = get_tag(job["title"])
            if tag in categorized:
                categorized[tag].append({**job, "company": company_name, "company_url": data["url"]})
                total += 1

    companies_count = len(company_jobs)
    content = []

    # Arabic intro
    content.append(para(text_node("السلام عليكم،")))
    content.append(para(text_node(
        f"هذا هو ملخصكم الأسبوعي للوظائف من شركات التقنية السعودية. "
        f"جمعنا هذا الأسبوع {total} وظيفة من {companies_count} شركة."
    )))
    content.append(hr())

    # Stats line
    content.append(para(text_node(f"📊 {total} open roles · {companies_count} companies · Saudi Arabia only · {date_str}")))
    content.append(hr())

    # Category sections
    for tag, meta in CATEGORY_META.items():
        jobs = categorized[tag]
        if not jobs:
            continue
        content.append(heading(2, f"{meta['icon']} {meta['label']} ({len(jobs)} roles)"))
        content.append(bullet_list(jobs))

    content.append(hr())

    # Arabic outro
    content.append(para(text_node("شارك هذه النشرة مع أصدقائك الباحثين عن عمل في قطاع التقنية بالسعودية.")))
    content.append(para(
        text_node("سجّل في "),
        text_node("buildsaudi.co", marks=[{"type": "link", "attrs": {"href": "https://buildsaudi.co"}}]),
        text_node(" لاستقبال النشرة كل أسبوع. بالتوفيق 🌟")
    ))

    doc = {"type": "doc", "content": content}
    return json.dumps(doc, ensure_ascii=False), total, categorized


# ─── Substack Publish ────────────────────────────────────────────────────────
def publish_to_substack(body_json: str, date_str: str, total: int) -> str | None:
    headers = {
        "Cookie": SUBSTACK_COOKIE,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
    }

    # 1. Create draft
    draft_payload = {
        "draft_title": f"وظائف الأسبوع · {date_str}",
        "draft_subtitle": f"{total} وظيفة في شركات التقنية السعودية",
        "draft_body": body_json,
        "draft_bylines": [{"id": SUBSTACK_AUTHOR_ID, "is_guest": False}],
        "type": "newsletter",
        "audience": "everyone",
    }
    r = requests.post(f"{SUBSTACK_BASE}/api/v1/drafts", json=draft_payload, headers=headers, timeout=20)
    if not r.ok:
        print(f"  Draft creation failed: {r.status_code} {r.text[:200]}")
        return None

    draft_id = r.json().get("id")
    draft_updated_at = r.json().get("draft_updated_at")
    print(f"  Draft created: ID {draft_id}")

    # 2. Publish (sends email to all subscribers)
    pub_payload = {
        "send_email": True,
        "audience": "everyone",
        "draft_updated_at": draft_updated_at,
        "publication_id": r.json().get("publication_id"),
    }
    r2 = requests.post(f"{SUBSTACK_BASE}/api/v1/drafts/{draft_id}/publish",
                       json=pub_payload, headers=headers, timeout=30)
    if r2.ok:
        slug = r2.json().get("slug", "")
        post_url = f"{SUBSTACK_BASE}/p/{slug}"
        print(f"  Published: {post_url}")
        return post_url
    else:
        print(f"  Publish failed: {r2.status_code} {r2.text[:300]}")
        return None


# ─── HTML output (for preview / fallback) ────────────────────────────────────
def build_html(company_jobs: dict, categorized: dict, total: int, date_str: str) -> str:
    COLORS = {"tech":"#2563eb","finance":"#16a34a","sales and marketing":"#ea580c",
               "operations":"#7c3aed","product":"#db2777","early career":"#0891b2"}
    sections = ""
    for tag, meta in CATEGORY_META.items():
        jobs = categorized[tag]
        if not jobs:
            continue
        color = COLORS[tag]
        rows = "".join(
            f'<tr><td style="padding:10px 0;border-bottom:1px solid #f0ece3;">'
            f'<a href="{j["url"]}" style="color:#1a1a1a;text-decoration:none;font-weight:600;font-size:14px;display:block;margin-bottom:2px;">{j["title"]}</a>'
            f'<span style="color:{color};font-size:12px;font-weight:600;">{j["company"]}</span>'
            f'<span style="color:#888;font-size:12px;"> · {j["location"]}</span></td></tr>'
            for j in jobs
        )
        sections += f'''<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e0d0;">
          <tr><td style="background:{color};padding:12px 16px;"><span style="color:#fff;font-size:15px;font-weight:700;">{meta["icon"]} {meta["label"]}</span><span style="color:rgba(255,255,255,0.8);font-size:13px;margin-left:8px;">({len(jobs)} roles)</span></td></tr>
          <tr><td style="padding:0 16px;"><table width="100%" cellpadding="0" cellspacing="0">{rows}</table></td></tr></table>'''

    return f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>BuildSaudi Weekly Jobs — {date_str}</title></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:24px 0;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:#1a1a1a;padding:28px 32px;border-radius:8px 8px 0 0;">
  <div style="color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">BuildSaudi</div>
  <div style="color:#fff;font-size:22px;font-weight:700;">Weekly Jobs Digest · {date_str}</div>
</td></tr>
<tr><td style="background:#f9f5ee;padding:24px 32px;border-right:4px solid #c9a84c;direction:rtl;text-align:right;">
  <p style="margin:0 0 10px;color:#1a1a1a;font-size:15px;line-height:1.8;">السلام عليكم،</p>
  <p style="margin:0;color:#333;font-size:14px;line-height:1.8;">جمعنا هذا الأسبوع <strong>{total} وظيفة</strong> من <strong>{len(company_jobs)} شركة</strong> في السعودية.</p>
</td></tr>
<tr><td style="background:#c9a84c;padding:12px 32px;">
  <span style="color:#1a1a1a;font-size:13px;font-weight:700;">{total} open roles · {len(company_jobs)} companies · Saudi Arabia only</span>
</td></tr>
<tr><td style="background:#f5f0e8;padding:24px 32px;">{sections}</td></tr>
<tr><td style="background:#1a1a1a;padding:28px 32px;direction:rtl;text-align:right;">
  <p style="margin:0 0 12px;color:#c9a84c;font-size:15px;font-weight:700;">شارك النشرة مع أصدقائك</p>
  <p style="margin:0;color:#ccc;font-size:13px;line-height:1.8;">سجّل في <a href="https://buildsaudi.co" style="color:#c9a84c;text-decoration:none;">buildsaudi.co</a> لاستقبال النشرة كل أسبوع. بالتوفيق 🌟</p>
</td></tr>
</table></td></tr></table></body></html>'''


# ─── Main ────────────────────────────────────────────────────────────────────
def main():
    print(f"=== BuildSaudi Weekly Jobs Digest {'(DRY RUN)' if DRY_RUN else ''} ===")
    print(f"Date: {datetime.now().strftime('%A, %d %B %Y')}\n")

    date_str = datetime.now().strftime("%-d %B %Y")

    # 1. Sync Airtable subscribers to Substack
    if not DRY_RUN:
        print("Syncing subscribers...")
        try:
            emails = get_airtable_subscribers()
            print(f"  Found {len(emails)} subscribers in Airtable")
            sync_to_substack(emails)
        except Exception as e:
            print(f"  Sync error (continuing anyway): {e}")
        print()

    # 2. Fetch jobs
    print("Fetching jobs...")
    company_jobs = fetch_all()

    if not company_jobs:
        print("No jobs found. Exiting.")
        sys.exit(1)

    total_all = sum(len(d["jobs"]) for d in company_jobs.values())
    print(f"\nTotal SA jobs: {total_all} from {len(company_jobs)} companies\n")

    # 3. Build content
    body_json, total, categorized = build_prosemirror(company_jobs, date_str)

    # 4. Save HTML preview
    html = build_html(company_jobs, categorized, total, date_str)
    out_path = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "digest-output.html"))
    with open(out_path, "w") as f:
        f.write(html)
    print(f"HTML preview saved: {out_path}")

    # 5. Publish to Substack
    if DRY_RUN:
        print("\nDRY RUN — skipping Substack publish. HTML preview ready.")
        return

    print("\nPublishing to Substack...")
    url = publish_to_substack(body_json, date_str, total)
    if url:
        print(f"\nDone! Post live at: {url}")
        print("All Substack subscribers will receive it by email.")
    else:
        print("\nPublish failed. HTML saved — you can paste it manually.")

if __name__ == "__main__":
    main()
