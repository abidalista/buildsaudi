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
import re
import sys
import time
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

DRY_RUN = "--dry-run" in sys.argv
SKIP_SYNC = "--skip-sync" in sys.argv

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
SUBSTACK_PUB        = os.environ.get("SUBSTACK_PUBLICATION", "averageabidall")
SUBSTACK_AUTHOR_ID  = int(os.environ.get("SUBSTACK_AUTHOR_ID", "68540577"))
SUBSTACK_BASE       = f"https://{SUBSTACK_PUB}.substack.com"


# Substack sits behind Cloudflare and rejects requests with a bare/library
# User-Agent from datacenter IPs (GitHub Actions runners). Send a normal one.
BROWSER_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)

SID_REFRESH_HELP = """
  How to refresh SUBSTACK_SID:
    1. Open substack.com in Chrome, signed in as the publication owner
    2. DevTools (F12) > Application > Cookies > https://substack.com
    3. Copy the value of `substack.sid`
    4. Paste it into the SUBSTACK_SID GitHub Actions secret
       (repo > Settings > Secrets and variables > Actions)
"""


def get_substack_cookie() -> str:
    """
    Return the Substack session cookie and verify it is still valid.

    Note: email/password login is NOT usable here. Substack's /api/v1/login
    requires a captcha ("Please complete the captcha to continue"), so the
    session cookie is the only supported auth path.
    """
    sid = os.environ.get("SUBSTACK_SID", "")
    if not sid:
        raise RuntimeError("SUBSTACK_SID is not set.\n" + SID_REFRESH_HELP)

    r = requests.get(
        "https://substack.com/api/v1/user/profile/self",
        cookies={"substack.sid": sid},
        headers={"User-Agent": BROWSER_UA, "Accept": "application/json"},
        timeout=15,
    )
    if r.status_code == 403:
        raise RuntimeError(
            "Substack returned 403 on the session check.\n"
            "  The cookie itself may be fine — 403 usually means Substack blocked the\n"
            "  request by IP (GitHub Actions runners are frequently challenged).\n"
            "  If this cookie works from your laptop, the runner IP is the problem,\n"
            "  not the secret.\n" + SID_REFRESH_HELP
        )
    if r.status_code == 401 or not r.ok:
        raise RuntimeError(
            f"SUBSTACK_SID is expired or invalid (profile check returned {r.status_code}).\n"
            + SID_REFRESH_HELP
        )

    print(f"  Substack session OK (user: {r.json().get('handle', '?')})")
    return f"substack.sid={sid}"


SUBSTACK_COOKIE = get_substack_cookie()


# ─── Company → ATS Mapping ──────────────────────────────────────────────────
COMPANIES = [
    # ── Greenhouse ──────────────────────────────────────────────────────────
    {"name": "Tamara",              "ats": "greenhouse",       "slug": "tamara",                "url": "https://tamara.co"},
    {"name": "HALA",                "ats": "greenhouse",       "slug": "hala",                  "url": "https://hala.com"},

    # ── Workable ─────────────────────────────────────────────────────────────
    {"name": "Foodics",             "ats": "workable",         "slug": "foodics",               "url": "https://foodics.com"},
    {"name": "Lucidya",             "ats": "workable",         "slug": "lucidya",               "url": "https://lucidya.com"},
    {"name": "Syarah",              "ats": "workable",         "slug": "syarah",                "url": "https://syarah.com"},
    {"name": "Sary",                "ats": "workable",         "slug": "sary",                  "url": "https://sary.sa"},
    {"name": "Mrsool",              "ats": "workable",         "slug": "mrsool-3",              "url": "https://mrsool.co"},
    {"name": "Nana Direct",         "ats": "workable",         "slug": "nana-grocery-direct",   "url": "https://nana.sa"},
    {"name": "Jahez",               "ats": "workable",         "slug": "jahez",                 "url": "https://jahez.net"},
    {"name": "HungerStation",       "ats": "workable",         "slug": "hungerstation",         "url": "https://hungerstation.com"},
    {"name": "Salla",               "ats": "workable",         "slug": "salla",                 "url": "https://salla.com"},
    {"name": "Zid",                 "ats": "workable",         "slug": "zid",                   "url": "https://zid.sa"},
    {"name": "Tabby",               "ats": "workable",         "slug": "tabby",                 "url": "https://tabby.ai"},
    {"name": "Floward",             "ats": "workable",         "slug": "floward",               "url": "https://floward.com"},
    {"name": "Mozn",                "ats": "workable",         "slug": "mozn",                  "url": "https://mozn.ai"},
    {"name": "Gathern",             "ats": "workable",         "slug": "gathern",               "url": "https://gathern.co"},
    {"name": "CAFU",                "ats": "workable",         "slug": "cafu",                  "url": "https://cafu.com"},
    {"name": "Wego",                "ats": "workable",         "slug": "wego",                  "url": "https://wego.com"},
    {"name": "Anghami",             "ats": "workable",         "slug": "anghami",               "url": "https://anghami.com"},
    {"name": "Morni",               "ats": "workable",         "slug": "morni",                 "url": "https://morni.com"},
    {"name": "Ninja Delivery",      "ats": "workable",         "slug": "ninja",                 "url": "https://ninjadelivery.com"},
    {"name": "Naqel",               "ats": "workable",         "slug": "naqel",                 "url": "https://naqel.com.sa"},
    {"name": "TruKKer",             "ats": "workable",         "slug": "trukker",               "url": "https://trukker.com"},
    {"name": "Fetchr",              "ats": "workable",         "slug": "fetchr",                "url": "https://fetchr.us"},
    {"name": "Bayzat",              "ats": "workable",         "slug": "bayzat",                "url": "https://bayzat.com"},
    {"name": "Penny Software",      "ats": "workable",         "slug": "penny-software",        "url": "https://penny.sa"},
    {"name": "Homzmart",            "ats": "workable",         "slug": "homzmart",              "url": "https://homzmart.com"},
    {"name": "Noon",                "ats": "workable",         "slug": "noon",                  "url": "https://noon.com"},
    {"name": "Rasan",               "ats": "workable",         "slug": "rasan",                 "url": "https://rasan.co"},
    {"name": "SMSA Express",        "ats": "workable",         "slug": "smsa",                  "url": "https://smsaexpress.com"},
    {"name": "Tawal",               "ats": "workable",         "slug": "tawal",                 "url": "https://tawal.com.sa"},
    {"name": "STC Solutions",       "ats": "workable",         "slug": "stc-solutions",         "url": "https://stcsolutions.com.sa"},
    {"name": "Careem",              "ats": "workable",         "slug": "careem",                "url": "https://careem.com"},
    {"name": "NEOM",                "ats": "workable",         "slug": "neom",                  "url": "https://neom.com"},
    {"name": "Elm Company",         "ats": "workable",         "slug": "elm",                   "url": "https://elm.sa"},
    {"name": "Flyadeal",            "ats": "workable",         "slug": "flyadeal",              "url": "https://flyadeal.com"},
    {"name": "Cenomi Centers",      "ats": "workable",         "slug": "cenomi",                "url": "https://cenomicenters.com"},
    {"name": "Red Sea Global",      "ats": "workable",         "slug": "redseaglobal",          "url": "https://thereds.com"},
    {"name": "Tawuniya",            "ats": "workable",         "slug": "tawuniya",              "url": "https://tawuniya.com.sa"},
    {"name": "Fakeeh Care",         "ats": "workable",         "slug": "fakeeh",                "url": "https://fakeeh.care"},
    {"name": "Nahdi Medical",       "ats": "workable",         "slug": "nahdi",                 "url": "https://nahdi.sa"},
    {"name": "Bupa Arabia",         "ats": "workable",         "slug": "bupa-arabia",           "url": "https://bupa.com.sa"},
    {"name": "Swvl",                "ats": "workable",         "slug": "swvl",                  "url": "https://swvl.com"},
    {"name": "Kitopi",              "ats": "workable",         "slug": "kitopi",                "url": "https://kitopi.com"},
    {"name": "Seera Group",         "ats": "workable",         "slug": "seera",                 "url": "https://seera.sa"},
    {"name": "Bayut",               "ats": "workable",         "slug": "bayut",                 "url": "https://bayut.sa"},
    {"name": "Deloitte",            "ats": "workable",         "slug": "deloitte",              "url": "https://deloitte.com"},
    {"name": "PwC",                 "ats": "workable",         "slug": "pwc",                   "url": "https://pwc.com/m1/en/careers"},
    {"name": "KPMG",                "ats": "workable",         "slug": "kpmg",                  "url": "https://kpmg.com"},
    {"name": "EY",                  "ats": "workable",         "slug": "ey",                    "url": "https://ey.com"},
    {"name": "Accenture",           "ats": "workable",         "slug": "accenture",             "url": "https://accenture.com"},
    {"name": "SAP",                 "ats": "workable",         "slug": "sap",                   "url": "https://sap.com"},
    {"name": "Oracle",              "ats": "workable",         "slug": "oracle",                "url": "https://oracle.com"},
    {"name": "Cisco",               "ats": "workable",         "slug": "cisco",                 "url": "https://cisco.com"},
    {"name": "Capgemini",           "ats": "workable",         "slug": "capgemini",             "url": "https://capgemini.com"},
    {"name": "Aramex",              "ats": "workable",         "slug": "aramex",                "url": "https://aramex.com"},
    {"name": "Agility Logistics",   "ats": "workable",         "slug": "agility",               "url": "https://agility.com"},
    {"name": "Alshaya Group",       "ats": "workable",         "slug": "alshaya",               "url": "https://alshaya.com"},
    {"name": "Chalhoub Group",      "ats": "workable",         "slug": "chalhoub",              "url": "https://chalhoubgroup.com"},

    # ── Lever ────────────────────────────────────────────────────────────────
    {"name": "Rewaa",               "ats": "lever",            "slug": "rewaatech",             "url": "https://rewaa.com"},

    # ── Recruitee ────────────────────────────────────────────────────────────
    {"name": "Unifonic",            "ats": "recruitee",        "slug": "unifonic",              "url": "https://unifonic.com"},
    {"name": "Lendo",               "ats": "recruitee",        "slug": "lendo",                 "url": "https://lendo.sa"},

    # ── SmartRecruiters ──────────────────────────────────────────────────────
    {"name": "Almosafer",           "ats": "smartrecruiters",  "slug": "almosafer",             "url": "https://almosafer.com"},
    {"name": "Jisr",                "ats": "smartrecruiters",  "slug": "Jisr",                  "url": "https://jisr.net"},
    {"name": "Delivery Hero",       "ats": "smartrecruiters",  "slug": "DeliveryHero",          "url": "https://deliveryhero.com"},
    {"name": "Roland Berger",       "ats": "smartrecruiters",  "slug": "RolandBerger",          "url": "https://rolandberger.com"},

    # ── Ashby ────────────────────────────────────────────────────────────────
    {"name": "Lean Technologies",   "ats": "ashby",            "slug": "leantech",              "url": "https://leantech.me"},
]

# Max jobs shown per company — keeps digest balanced
MAX_JOBS_PER_COMPANY = 5

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


# ─── Helpers ─────────────────────────────────────────────────────────────────
def days_ago(date_str: str) -> str:
    """Return human-readable posting age from an ISO date string."""
    if not date_str:
        return ""
    try:
        dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        delta = (datetime.now(dt.tzinfo) - dt).days
        if delta == 0:   return "today"
        if delta == 1:   return "1d ago"
        if delta < 14:   return f"{delta}d ago"
        if delta < 60:   return f"{delta // 7}w ago"
        return f"{delta // 30}mo ago"
    except Exception:
        return ""


def clean_location(loc: str) -> str:
    """Collapse duplicate comma-separated segments, e.g. 'Riyadh, Riyadh, Saudi Arabia' -> 'Riyadh, Saudi Arabia'."""
    if not loc:
        return loc
    parts = [p.strip() for p in loc.split(",") if p.strip()]
    deduped = []
    for p in parts:
        if not deduped or deduped[-1].lower() != p.lower():
            deduped.append(p)
    return ", ".join(deduped)


# ─── ATS Fetchers ────────────────────────────────────────────────────────────
def fetch_greenhouse(slug):
    r = requests.get(f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs", timeout=15)
    r.raise_for_status()
    results = []
    for j in r.json().get("jobs", []):
        if is_saudi(j.get("location", {}).get("name", "")):
            results.append({
                "title":    j["title"],
                "location": clean_location(j["location"]["name"]),
                "url":      j["absolute_url"],
                "posted":   days_ago(j.get("updated_at", "")),
            })
    return results

def fetch_workable(slug):
    r = requests.post(f"https://apply.workable.com/api/v3/accounts/{slug}/jobs",
                      json={"query":"","location":[],"department":[],"worktype":[],"remote":[]}, timeout=15)
    r.raise_for_status()
    results = []
    for j in r.json().get("results", []):
        loc = j.get("location", {})
        country, city = loc.get("country",""), loc.get("city","")
        if is_saudi(country) or is_saudi(city):
            results.append({
                "title":    j["title"],
                "location": clean_location(f"{city}, {country}".strip(", ")),
                "url":      f"https://apply.workable.com/{slug}/j/{j.get('shortcode','/')}/" ,
                "posted":   days_ago(j.get("published_on", "")),
            })
    return results

def fetch_lever(company):
    r = requests.get(f"https://api.lever.co/v0/postings/{company}?mode=json", timeout=15)
    r.raise_for_status()
    jobs = r.json() if isinstance(r.json(), list) else []
    results = []
    for j in jobs:
        if is_saudi(j.get("categories", {}).get("location", "")):
            # Lever createdAt is a Unix timestamp in ms
            ts = j.get("createdAt", 0)
            posted = days_ago(datetime.utcfromtimestamp(ts / 1000).isoformat() + "Z") if ts else ""
            results.append({
                "title":    j["text"],
                "location": clean_location(j["categories"]["location"]),
                "url":      j["hostedUrl"],
                "posted":   posted,
            })
    return results

def fetch_recruitee(slug):
    r = requests.get(f"https://{slug}.recruitee.com/api/offers/", timeout=15)
    r.raise_for_status()
    results = []
    for o in r.json().get("offers", []):
        country, city = o.get("country",""), o.get("city","")
        if is_saudi(country) or is_saudi(city):
            results.append({
                "title":    o["title"],
                "location": clean_location(f"{city}, {country}".strip(", ")),
                "url":      o.get("careers_url", f"https://{slug}.recruitee.com/o/{o.get('slug','')}"),
                "posted":   days_ago(o.get("published_at", "")),
            })
    return results

def fetch_smartrecruiters(slug):
    r = requests.get(
        f"https://api.smartrecruiters.com/v1/companies/{slug}/postings",
        params={"limit": 100, "country": "sa"},
        timeout=15,
    )
    r.raise_for_status()
    results = []
    for j in r.json().get("content", []):
        loc     = j.get("location", {}) or {}
        country = (loc.get("country") or "").lower()
        city    = loc.get("city", "") or ""
        full    = loc.get("fullLocation", "") or ""
        loc_str = full if full else f"{city}, Saudi Arabia".strip(", ")
        if country == "sa" or is_saudi(full) or is_saudi(city):
            results.append({
                "title":    j["name"],
                "location": clean_location(loc_str),
                "url":      f"https://jobs.smartrecruiters.com/{slug}/{j['id']}",
                "posted":   days_ago(j.get("releasedDate", "")),
            })
    return results

def fetch_ashby(slug):
    query = """query ApiJobBoardWithTeams($organizationHostedJobsPageName: String!) {
      jobBoard: publishedJobBoard(organizationHostedJobsPageName: $organizationHostedJobsPageName) {
        jobPostings { id title locationName jobLocation { city country { name } } createdAt }
      }
    }"""
    r = requests.post(
        "https://jobs.ashbyhq.com/api/non-user-graphql",
        json={"operationName": "ApiJobBoardWithTeams",
              "variables": {"organizationHostedJobsPageName": slug},
              "query": query},
        timeout=15,
    )
    r.raise_for_status()
    postings = ((r.json().get("data") or {}).get("jobBoard") or {}).get("jobPostings") or []
    results = []
    for j in postings:
        loc_name = j.get("locationName", "")
        country  = ((j.get("jobLocation") or {}).get("country") or {}).get("name", "")
        if is_saudi(loc_name) or is_saudi(country):
            results.append({
                "title":    j["title"],
                "location": clean_location(loc_name or country),
                "url":      f"https://jobs.ashbyhq.com/{slug}/{j['id']}",
                "posted":   days_ago(j.get("createdAt", "")),
            })
    return results

FETCHERS = {
    "greenhouse":      fetch_greenhouse,
    "workable":        fetch_workable,
    "lever":           fetch_lever,
    "recruitee":       fetch_recruitee,
    "smartrecruiters": fetch_smartrecruiters,
    "ashby":           fetch_ashby,
}

def _fetch_one(c):
    """Fetch jobs for a single company. Returns (company_dict, jobs_or_None, error_str)."""
    try:
        jobs = FETCHERS[c["ats"]](c["slug"])
        return c, jobs, None
    except Exception as e:
        return c, None, str(e)

def fetch_all():
    result = {}
    errors = []
    with ThreadPoolExecutor(max_workers=10) as pool:
        futures = {pool.submit(_fetch_one, c): c for c in COMPANIES}
        # Collect in completion order; print after all done to avoid interleaving
        completed = []
        for fut in as_completed(futures):
            completed.append(fut.result())
    # Print in original company order
    order = {c["name"]: i for i, c in enumerate(COMPANIES)}
    completed.sort(key=lambda x: order.get(x[0]["name"], 999))
    for c, jobs, err in completed:
        if err:
            print(f"  {c['name']} ({c['ats']})... ERROR: {err}")
            errors.append(c["name"])
        else:
            if len(jobs) > MAX_JOBS_PER_COMPANY:
                print(f"  {c['name']} ({c['ats']})... {len(jobs)} SA jobs (capped to {MAX_JOBS_PER_COMPANY})")
                jobs = jobs[:MAX_JOBS_PER_COMPANY]
            else:
                print(f"  {c['name']} ({c['ats']})... {len(jobs)} SA jobs")
            if jobs:
                result[c["name"]] = {"jobs": jobs, "url": c["url"]}
    if errors:
        print(f"\n  ATS errors: {', '.join(errors)}")
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
                headers={"User-Agent": BROWSER_UA},
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


# ─── Company metadata (logos/stage/sector/careers_url) from lib/data.ts ─────
def load_company_meta():
    """Parse lib/data.ts for stage/sector/careers_url, keyed by lowercased company name."""
    data_path = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "lib", "data.ts"))
    meta = {}
    try:
        with open(data_path) as f:
            content = f.read()
        entries = re.findall(
            r'\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)".*?stage:\s*"([^"]+)".*?sector:\s*\[([^\]]*)\].*?careers_url:\s*"([^"]*)"',
            content
        )
        for slug, name, stage, sector, careers_url in entries:
            sector_clean = sector.replace('"', "").split(",")[0].strip()
            meta[name.lower()] = {"slug": slug, "stage": stage, "sector": sector_clean, "careers_url": careers_url}
    except Exception:
        pass
    return meta

COMPANY_META = load_company_meta()


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

def heading_nodes(level, *content):
    return {"type": "heading", "attrs": {"level": level}, "content": list(content)}

def hr():
    return {"type": "horizontalRule"}

def button(url, text):
    return {"type": "button", "attrs": {"url": url, "text": text}}

def bullet_list(items):
    """Compact job list — title + location only (company shown once above, in the group header)."""
    return {
        "type": "bulletList",
        "content": [
            {"type": "listItem", "content": [
                para(
                    text_node(job["title"], marks=[{"type": "link", "attrs": {"href": job["url"], "target": "_blank"}}]),
                    text_node(f"  ·  {job['location']}")
                )
            ]}
            for job in items
        ]
    }

def company_group(company_name, jobs, fallback_url):
    """One company block: name + stage/sector tag, its jobs, and an Apply button."""
    meta = COMPANY_META.get(company_name.lower())
    careers_url = (meta.get("careers_url") if meta else "") or fallback_url

    head_content = [text_node(company_name, marks=[{"type": "strong"}])]
    if meta:
        tag_parts = [p for p in [meta.get("stage"), meta.get("sector")] if p]
        if tag_parts:
            head_content.append(text_node("   " + "  ·  ".join(tag_parts), marks=[{"type": "em"}]))

    blocks = [heading_nodes(3, *head_content), bullet_list(jobs)]
    if careers_url:
        blocks.append(button(careers_url, f"View all {company_name} roles →"))
    return blocks

# ─── AI Apply CTA (ABI-30 / ABI-33) — exact copy + link, do not change ───────
AI_APPLY_URL = "https://www.aiapply.co/?via=abdulla"

def ai_apply_cta():
    """RTL AI Apply affiliate CTA card, placed above the jobs list."""
    return [
        hr(),
        heading(3, "لسه تقدّم يدوي على كل وظيفة؟"),
        para(text_node("مع AI Apply قدّم تلقائي على مئات الوظائف — خصم ٤٠٪ للطلاب والمتخرجين.")),
        button(AI_APPLY_URL, "جرّب AI Apply"),
        para(text_node("BuildSaudi × AI Apply", marks=[{"type": "em"}])),
        hr(),
    ]

def ai_apply_footer_line():
    """Soft footer CTA — appended after the 'شارك النشرة' share line."""
    return para(
        text_node("وبتقدّم على الوظائف؟ جرّب "),
        text_node("AI Apply", marks=[{"type": "link", "attrs": {"href": AI_APPLY_URL, "target": "_blank"}}]),
        text_node(" — خصم ٤٠٪ للطلاب والمتخرجين.")
    )

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

    # AI Apply CTA — above the jobs list (ABI-30)
    content.extend(ai_apply_cta())

    # Category sections — jobs grouped by company within each category
    for tag, meta in CATEGORY_META.items():
        jobs = categorized[tag]
        if not jobs:
            continue
        content.append(heading(2, f"{meta['icon']} {meta['label']} ({len(jobs)} roles)"))

        by_company = {}
        for j in jobs:
            entry = by_company.setdefault(j["company"], {"url": j.get("company_url", ""), "jobs": []})
            entry["jobs"].append(j)

        for company_name, cdata in by_company.items():
            content.extend(company_group(company_name, cdata["jobs"], cdata["url"]))

    content.append(hr())

    # Arabic outro
    content.append(para(text_node("شارك هذه النشرة مع أصدقائك الباحثين عن عمل في قطاع التقنية بالسعودية.")))
    content.append(para(
        text_node("سجّل في "),
        text_node("buildsaudi.co", marks=[{"type": "link", "attrs": {"href": "https://buildsaudi.co"}}]),
        text_node(" لاستقبال النشرة كل أسبوع. بالتوفيق 🌟")
    ))
    content.append(ai_apply_footer_line())  # soft footer CTA (ABI-30)

    doc = {"type": "doc", "content": content}
    return json.dumps(doc, ensure_ascii=False), total, categorized


# ─── Substack Publish ────────────────────────────────────────────────────────
def publish_to_substack(body_json: str, date_str: str, total: int) -> str | None:
    headers = {
        "Cookie": SUBSTACK_COOKIE,
        "Content-Type": "application/json",
        "User-Agent": BROWSER_UA,
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
            f'<span style="color:#888;font-size:12px;"> · {j["location"]}</span>'
            + '</td></tr>'
            for j in jobs
        )
        sections += f'''<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e0d0;">
          <tr><td style="background:{color};padding:12px 16px;"><span style="color:#fff;font-size:15px;font-weight:700;">{meta["icon"]} {meta["label"]}</span><span style="color:rgba(255,255,255,0.8);font-size:13px;margin-left:8px;">({len(jobs)} roles)</span></td></tr>
          <tr><td style="padding:0 16px;"><table width="100%" cellpadding="0" cellspacing="0">{rows}</table></td></tr></table>'''

    # AI Apply CTA card (ABI-30) — exact copy/link from handoff doc, RTL
    ai_apply_cta_html = f'''<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#fff;border:1px solid #e8e0d0;border-radius:8px;border-right:4px solid #c9a84c;">
  <tr>
    <td dir="rtl" lang="ar" style="direction:rtl;text-align:right;padding:20px 24px;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1a1a1a;">لسه تقدّم يدوي على كل وظيفة؟</p>
      <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7;">مع AI Apply قدّم تلقائي على مئات الوظائف — خصم ٤٠٪ للطلاب والمتخرجين.</p>
      <a href="{AI_APPLY_URL}" style="display:inline-block;background:#FFBA0A;color:#1a1a1a;font-weight:700;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:8px;">جرّب AI Apply</a>
      <p style="margin:14px 0 0;font-size:12px;color:#888;">BuildSaudi × AI Apply</p>
    </td>
  </tr>
</table>'''

    ai_apply_footer_html = f'''<p dir="rtl" style="direction:rtl;text-align:right;margin:16px 0 0;color:#ccc;font-size:13px;line-height:1.8;">
  وبتقدّم على الوظائف؟ جرّب <a href="{AI_APPLY_URL}" style="color:#c9a84c;text-decoration:none;">AI Apply</a> — خصم ٤٠٪ للطلاب والمتخرجين.
</p>'''

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
<tr><td style="background:#f5f0e8;padding:24px 32px 0;">{ai_apply_cta_html}</td></tr>
<tr><td style="background:#f5f0e8;padding:0 32px 24px;">{sections}</td></tr>
<tr><td style="background:#1a1a1a;padding:28px 32px;direction:rtl;text-align:right;">
  <p style="margin:0 0 12px;color:#c9a84c;font-size:15px;font-weight:700;">شارك النشرة مع أصدقائك</p>
  <p style="margin:0;color:#ccc;font-size:13px;line-height:1.8;">سجّل في <a href="https://buildsaudi.co" style="color:#c9a84c;text-decoration:none;">buildsaudi.co</a> لاستقبال النشرة كل أسبوع. بالتوفيق 🌟</p>
  {ai_apply_footer_html}
</td></tr>
</table></td></tr></table></body></html>'''


# ─── Main ────────────────────────────────────────────────────────────────────
def main():
    flags = []
    if DRY_RUN: flags.append("DRY RUN")
    if SKIP_SYNC: flags.append("SKIP SYNC")
    print(f"=== BuildSaudi Weekly Jobs Digest {('(' + ', '.join(flags) + ')') if flags else ''} ===")
    print(f"Date: {datetime.now().strftime('%A, %d %B %Y')}\n")

    date_str = datetime.now().strftime("%-d %B %Y")

    # 1. Sync Airtable subscribers to Substack
    if not DRY_RUN and not SKIP_SYNC:
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
        sys.exit(1)

if __name__ == "__main__":
    main()
