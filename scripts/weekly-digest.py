#!/usr/bin/env python3
"""
BuildSaudi Weekly Jobs Digest
- Builds the Monday list from data/jobs.json (function / city / sector / level)
- Filters to Airtable Pref* fields when subscribers have set them
- Syncs Airtable subscribers → Substack (fills gaps)
- Publishes one Substack post (one-click unsub stays on Substack)

Run:  python3 scripts/weekly-digest.py
Dry:  python3 scripts/weekly-digest.py --dry-run   (no publish, saves HTML only)
Check: python3 scripts/weekly-digest.py --check-prefs
Skip Substack session: --skip-session
Single-subscriber filter (no send): --prefs-json '{"roles":["engineering"]}'
"""

import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

import requests

DRY_RUN = "--dry-run" in sys.argv
SKIP_SYNC = "--skip-sync" in sys.argv
SKIP_SESSION = "--skip-session" in sys.argv
CHECK_PREFS = "--check-prefs" in sys.argv
FROM_ATS = "--from-ats" in sys.argv

def _argv_value(flag: str) -> str:
    for i, arg in enumerate(sys.argv):
        if arg == flag and i + 1 < len(sys.argv):
            return sys.argv[i + 1]
        if arg.startswith(flag + "="):
            return arg.split("=", 1)[1]
    return ""

PREFS_JSON_RAW = _argv_value("--prefs-json")

# ─── Load env ────────────────────────────────────────────────────────────────
env_file = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".env.local"))
if os.path.exists(env_file):
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

AIRTABLE_API_KEY    = os.environ.get("AIRTABLE_API_KEY", "")
AIRTABLE_BASE_ID    = os.environ.get("AIRTABLE_BASE_ID", "")
SUBSTACK_PUB        = os.environ.get("SUBSTACK_PUBLICATION", "averageabidall")
SUBSTACK_AUTHOR_ID  = int(os.environ.get("SUBSTACK_AUTHOR_ID", "68540577"))
SUBSTACK_BASE       = f"https://{SUBSTACK_PUB}.substack.com"


# Substack sits behind Cloudflare and rejects requests with a bare/library
# User-Agent from datacenter IPs (GitHub Actions runners). Send a normal one.
BROWSER_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)

# Substack blocks GitHub Actions IPs (403) but not Vercel's. When
# SUBSTACK_PROXY_URL is set, Substack calls are routed through the proxy route
# on buildsaudi.co instead of being made directly. Unset locally = direct calls.
PROXY_URL = os.environ.get("SUBSTACK_PROXY_URL", "")
PROXY_SECRET = os.environ.get("PROXY_SECRET", "")


def substack_request(method: str, host: str, path: str, payload=None):
    """Call Substack directly, or via the Vercel proxy when configured.

    Returns (status_code, text).
    """
    if PROXY_URL:
        r = requests.post(
            PROXY_URL,
            json={"host": host, "path": path, "method": method, "body": payload},
            headers={"x-proxy-secret": PROXY_SECRET, "Content-Type": "application/json"},
            timeout=45,
        )
        if not r.ok:
            raise RuntimeError(f"Proxy error {r.status_code}: {r.text[:300]}")
        data = r.json()
        return data["status"], data["body"]

    r = requests.request(
        method,
        f"https://{host}{path}",
        json=payload,
        headers={
            "Cookie": f"substack.sid={os.environ.get('SUBSTACK_SID', '')}",
            "Content-Type": "application/json",
            "User-Agent": BROWSER_UA,
        },
        timeout=30,
    )
    return r.status_code, r.text


SID_REFRESH_HELP = """
  How to refresh SUBSTACK_SID:
    1. Open substack.com in Chrome, signed in as the publication owner
    2. DevTools (F12) > Application > Cookies > https://substack.com
    3. Copy the value of `substack.sid`
    4. Paste it into the SUBSTACK_SID GitHub Actions secret
       (repo > Settings > Secrets and variables > Actions)
"""


def verify_substack_session() -> None:
    """
    Confirm the Substack session works before doing any real work.

    Note: email/password login is NOT usable here. Substack's /api/v1/login
    requires a captcha ("Please complete the captcha to continue"), so the
    session cookie is the only supported auth path.
    """
    if not PROXY_URL and not os.environ.get("SUBSTACK_SID"):
        raise RuntimeError("SUBSTACK_SID is not set.\n" + SID_REFRESH_HELP)

    status, text = substack_request("GET", "substack.com", "/api/v1/user/profile/self")

    if status == 403:
        raise RuntimeError(
            "Substack returned 403 on the session check — the request was blocked by IP,\n"
            "  not rejected for a bad cookie. Route Substack calls through the Vercel\n"
            "  proxy by setting SUBSTACK_PROXY_URL and PROXY_SECRET."
        )
    if status != 200:
        raise RuntimeError(
            f"SUBSTACK_SID is expired or invalid (profile check returned {status}).\n"
            + SID_REFRESH_HELP
        )

    print(f"  Substack session OK (user: {json.loads(text).get('handle', '?')})")


# Session check stays in main() so --check-prefs and --skip-session never
# contact Substack. Monday still verifies before any publish.


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


CITY_ALIASES = {
    "mecca": "Makkah",
    "makkah": "Makkah",
    "medina": "Madinah",
    "madinah": "Madinah",
    "al khobar": "Al Khobar",
    "khobar": "Al Khobar",
}
COUNTRY_ONLY = {"saudi arabia", "ksa", "saudi"}


def extract_job_city(location: str) -> str:
    """First real city token. Mirrors lib/job-classify.ts extractJobCity."""
    if not location:
        return ""
    first = location.split(",")[0].strip()
    if not first:
        return ""
    key = first.lower()
    if key in COUNTRY_ONLY:
        return ""
    return CITY_ALIASES.get(key, first)


def with_utm(url: str) -> str:
    """Append utm_source=buildsaudi. Leaves AI Apply affiliate links untouched."""
    if not url:
        return url
    try:
        parts = urlsplit(url)
    except Exception:
        return url
    host = (parts.hostname or "").lower()
    if host in {"www.aiapply.co", "aiapply.co"}:
        return url
    if not parts.scheme or not parts.netloc:
        return url
    query = dict(parse_qsl(parts.query, keep_blank_values=True))
    query.setdefault("utm_source", "buildsaudi")
    query.setdefault("utm_medium", "referral")
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query), parts.fragment))


def parse_pref_list(raw) -> list:
    if raw is None or raw == "":
        return []
    if isinstance(raw, list):
        parts = [str(p) for p in raw]
    else:
        parts = re.split(r"[,;\n|/]+", str(raw))
    seen = set()
    out = []
    for part in parts:
        value = part.strip()
        if not value:
            continue
        key = value.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(value)
    return out


def empty_prefs() -> dict:
    return {"roles": [], "cities": [], "sectors": [], "experience": [], "stages": []}


def prefs_from_airtable_fields(fields: dict) -> dict:
    fields = fields or {}
    return {
        "roles": parse_pref_list(fields.get("Pref Job Types")),
        "cities": parse_pref_list(fields.get("Pref Locations")),
        "sectors": parse_pref_list(fields.get("Pref Sectors")),
        "experience": parse_pref_list(fields.get("Pref Experience")),
        "stages": parse_pref_list(fields.get("Pref Stages")),
    }


def has_any_pref(prefs: dict) -> bool:
    return any(prefs.get(k) for k in ("roles", "cities", "sectors", "experience", "stages"))


def _axis_matches(wanted: list, value: str) -> bool:
    if not wanted:
        return True
    needle = (value or "").strip().lower()
    if not needle:
        return False
    return any(item.strip().lower() == needle for item in wanted)


def job_matches_prefs(job: dict, prefs: dict) -> bool:
    """Empty Pref* axis = no constraint. Mirrors lib/digest-prefs.ts."""
    prefs = prefs or empty_prefs()
    return (
        _axis_matches(prefs.get("roles") or [], job.get("function") or "")
        and _axis_matches(prefs.get("cities") or [], job.get("city") or "")
        and _axis_matches(prefs.get("sectors") or [], job.get("sector") or "")
        and _axis_matches(prefs.get("experience") or [], job.get("experience_level") or "")
        and _axis_matches(prefs.get("stages") or [], job.get("stage") or "")
    )


def job_matches_any_configured_prefs(job: dict, prefs_list: list) -> bool:
    configured = [p for p in prefs_list if has_any_pref(p)]
    if not configured:
        return True
    return any(job_matches_prefs(job, prefs) for prefs in configured)


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
PREF_FIELDS = [
    "Email",
    "Pref Job Types",
    "Pref Locations",
    "Pref Sectors",
    "Pref Experience",
    "Pref Stages",
]


def get_airtable_subscribers():
    """Fetch subscriber emails and Pref* fields from the Job Seekers table."""
    emails = []
    prefs_list = []
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/Job%20Seekers"
    headers = {"Authorization": f"Bearer {AIRTABLE_API_KEY}"}
    params = [("pageSize", 100)]
    for field in PREF_FIELDS:
        params.append(("fields[]", field))
    while True:
        r = requests.get(url, headers=headers, params=params, timeout=15)
        r.raise_for_status()
        data = r.json()
        for rec in data.get("records", []):
            fields = rec.get("fields", {}) or {}
            email = (fields.get("Email") or "").strip()
            if email:
                emails.append(email)
                prefs_list.append(prefs_from_airtable_fields(fields))
        offset = data.get("offset")
        if not offset:
            break
        params = [item for item in params if item[0] != "offset"]
        params.append(("offset", offset))
    return emails, prefs_list

def sync_to_substack(emails: list):
    """Add any missing subscribers to Substack."""
    print(f"  Syncing {len(emails)} Airtable subscribers → Substack...")
    success, failed = 0, 0
    for email in emails:
        try:
            status, _ = substack_request(
                "POST",
                f"{SUBSTACK_PUB}.substack.com",
                "/api/v1/free",
                {"email": email, "first_url": "https://buildsaudi.co", "first_referrer": ""},
            )
            if status == 200:
                success += 1
            else:
                failed += 1
            time.sleep(0.1)  # gentle rate limiting
        except Exception:
            failed += 1
    print(f"  Synced: {success} ok, {failed} failed")


# ─── Company metadata (logos/stage/sector/careers_url) from lib/data.ts ─────
def load_company_meta():
    """Parse lib/data.ts for stage/sector/careers_url, keyed by lowercased company name and slug."""
    data_path = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "lib", "data.ts"))
    by_name = {}
    by_slug = {}
    try:
        with open(data_path) as f:
            content = f.read()
        entries = re.findall(
            r'\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)".*?stage:\s*"([^"]+)".*?sector:\s*\[([^\]]*)\].*?careers_url:\s*"([^"]*)"',
            content
        )
        for slug, name, stage, sector, careers_url in entries:
            sector_clean = sector.replace('"', "").split(",")[0].strip()
            row = {"slug": slug, "stage": stage, "sector": sector_clean, "careers_url": careers_url}
            by_name[name.lower()] = row
            by_slug[slug] = row
    except Exception:
        pass
    return by_name, by_slug

COMPANY_META, COMPANY_META_BY_SLUG = load_company_meta()


def load_jobs_json(path=None):
    jobs_path = path or os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "data", "jobs.json"))
    with open(jobs_path) as f:
        data = json.load(f)
    return data.get("jobs") or [], data.get("scraped_at") or ""


def jobs_to_company_jobs(raw_jobs: list, prefs_list: list | None = None, single_prefs: dict | None = None) -> dict:
    """Group jobs.json openings by company after applying Pref* filters."""
    result = {}
    for raw in raw_jobs:
        meta = COMPANY_META.get((raw.get("company") or "").lower()) or COMPANY_META_BY_SLUG.get(raw.get("company_slug") or "")
        job = {
            "title": raw.get("title") or "",
            "location": clean_location(raw.get("location") or ""),
            "url": with_utm(raw.get("apply_url") or ""),
            "posted": days_ago(raw.get("posted_date") or ""),
            "function": (raw.get("function") or "").lower(),
            "sector": raw.get("sector") or "",
            "experience_level": (raw.get("experience_level") or "").lower(),
            "city": extract_job_city(raw.get("location") or ""),
            "stage": (meta or {}).get("stage") or "",
        }
        if single_prefs is not None:
            if not job_matches_prefs(job, single_prefs):
                continue
        elif prefs_list is not None:
            if not job_matches_any_configured_prefs(job, prefs_list):
                continue
        company_name = raw.get("company") or ""
        if not company_name:
            continue
        entry = result.setdefault(company_name, {
            "jobs": [],
            "url": with_utm((meta or {}).get("careers_url") or ""),
        })
        if len(entry["jobs"]) >= MAX_JOBS_PER_COMPANY:
            continue
        entry["jobs"].append(job)
    return {name: data for name, data in result.items() if data["jobs"]}


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
    careers_url = with_utm((meta.get("careers_url") if meta else "") or fallback_url)

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
    content.append(para(
        text_node("تبي الوظائف على مقاسك؟ حدّد تخصصك ومدينتك وقطاعك من "),
        text_node("صفحة التفضيلات", marks=[{"type": "link", "attrs": {"href": "https://buildsaudi.co/preferences"}}]),
        text_node(". النشرة تبقي الوظائف اللي تطابق اختيار المشتركين.")
    ))
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
    content.append(para(text_node("لإلغاء الاشتراك استخدم رابط إلغاء الاشتراك أسفل رسالة النشرة.")))
    content.append(ai_apply_footer_line())  # soft footer CTA (ABI-30)

    doc = {"type": "doc", "content": content}
    return json.dumps(doc, ensure_ascii=False), total, categorized


# ─── Substack Publish ────────────────────────────────────────────────────────
def publish_to_substack(body_json: str, date_str: str, total: int) -> str | None:
    # 1. Create draft
    draft_payload = {
        "draft_title": f"وظائف الأسبوع · {date_str}",
        "draft_subtitle": f"{total} وظيفة في شركات التقنية السعودية",
        "draft_body": body_json,
        "draft_bylines": [{"id": SUBSTACK_AUTHOR_ID, "is_guest": False}],
        "type": "newsletter",
        "audience": "everyone",
    }
    pub_host = f"{SUBSTACK_PUB}.substack.com"
    status, text = substack_request("POST", pub_host, "/api/v1/drafts", draft_payload)
    if status != 200:
        print(f"  Draft creation failed: {status} {text[:200]}")
        return None

    draft = json.loads(text)
    draft_id = draft.get("id")
    draft_updated_at = draft.get("draft_updated_at")
    print(f"  Draft created: ID {draft_id}")

    # 2. Publish (sends email to all subscribers)
    pub_payload = {
        "send_email": True,
        "audience": "everyone",
        "draft_updated_at": draft_updated_at,
        "publication_id": draft.get("publication_id"),
    }
    status2, text2 = substack_request(
        "POST", pub_host, f"/api/v1/drafts/{draft_id}/publish", pub_payload
    )
    if status2 == 200:
        slug = json.loads(text2).get("slug", "")
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
  <p style="margin:0 0 10px;color:#333;font-size:14px;line-height:1.8;">جمعنا هذا الأسبوع <strong>{total} وظيفة</strong> من <strong>{len(company_jobs)} شركة</strong> في السعودية.</p>
  <p style="margin:0;color:#333;font-size:13px;line-height:1.8;">تبي الوظائف على مقاسك؟ حدّد تخصصك ومدينتك وقطاعك من <a href="https://buildsaudi.co/preferences" style="color:#06634D;text-decoration:none;">صفحة التفضيلات</a>.</p>
</td></tr>
<tr><td style="background:#c9a84c;padding:12px 32px;">
  <span style="color:#1a1a1a;font-size:13px;font-weight:700;">{total} open roles · {len(company_jobs)} companies · Saudi Arabia only</span>
</td></tr>
<tr><td style="background:#f5f0e8;padding:24px 32px 0;">{ai_apply_cta_html}</td></tr>
<tr><td style="background:#f5f0e8;padding:0 32px 24px;">{sections}</td></tr>
<tr><td style="background:#1a1a1a;padding:28px 32px;direction:rtl;text-align:right;">
  <p style="margin:0 0 12px;color:#c9a84c;font-size:15px;font-weight:700;">شارك النشرة مع أصدقائك</p>
  <p style="margin:0 0 12px;color:#ccc;font-size:13px;line-height:1.8;">سجّل في <a href="https://buildsaudi.co" style="color:#c9a84c;text-decoration:none;">buildsaudi.co</a> لاستقبال النشرة كل أسبوع. بالتوفيق 🌟</p>
  <p style="margin:0;color:#ccc;font-size:13px;line-height:1.8;">لإلغاء الاشتراك استخدم رابط إلغاء الاشتراك أسفل رسالة النشرة.</p>
  {ai_apply_footer_html}
</td></tr>
</table></td></tr></table></body></html>'''


def run_pref_checks() -> None:
    """No network. Verifies Pref* matching and UTM rules."""
    assert extract_job_city("Riyadh, Saudi Arabia") == "Riyadh"
    assert extract_job_city("Mecca, Saudi Arabia") == "Makkah"
    assert extract_job_city("Saudi Arabia") == ""

    job = {
        "function": "engineering",
        "city": "Riyadh",
        "sector": "Fintech",
        "experience_level": "mid",
        "stage": "Seed",
    }
    assert job_matches_prefs(job, empty_prefs())
    assert job_matches_prefs(job, {"roles": ["engineering"], "cities": [], "sectors": [], "experience": [], "stages": []})
    assert not job_matches_prefs(job, {"roles": ["design"], "cities": [], "sectors": [], "experience": [], "stages": []})
    assert job_matches_prefs(job, {"roles": [], "cities": ["Riyadh"], "sectors": ["Fintech"], "experience": ["mid"], "stages": ["Seed"]})
    assert not job_matches_prefs(job, {"roles": [], "cities": ["Jeddah"], "sectors": [], "experience": [], "stages": []})
    assert job_matches_any_configured_prefs(job, [empty_prefs()])
    assert not job_matches_any_configured_prefs(job, [{"roles": ["design"], "cities": [], "sectors": [], "experience": [], "stages": []}])
    assert job_matches_any_configured_prefs(
        job,
        [
            {"roles": ["design"], "cities": [], "sectors": [], "experience": [], "stages": []},
            {"roles": ["engineering"], "cities": [], "sectors": [], "experience": [], "stages": []},
        ],
    )

    tagged = with_utm("https://apply.workable.com/foodics/j/ABC/")
    assert "utm_source=buildsaudi" in tagged
    affiliate = "https://www.aiapply.co/?via=abdulla"
    assert with_utm(affiliate) == affiliate
    assert "—" not in "تبي الوظائف على مقاسك؟ حدّد تخصصك ومدينتك وقطاعك من صفحة التفضيلات."
    assert "—" not in "لإلغاء الاشتراك استخدم رابط إلغاء الاشتراك أسفل رسالة النشرة."
    print("pref checks passed")


# ─── Main ────────────────────────────────────────────────────────────────────
def main():
    if CHECK_PREFS:
        run_pref_checks()
        return

    flags = []
    if DRY_RUN: flags.append("DRY RUN")
    if SKIP_SYNC: flags.append("SKIP SYNC")
    if SKIP_SESSION: flags.append("SKIP SESSION")
    print(f"=== BuildSaudi Weekly Jobs Digest {('(' + ', '.join(flags) + ')') if flags else ''} ===")
    print(f"Date: {datetime.now().strftime('%A, %d %B %Y')}\n")

    date_str = datetime.now().strftime("%-d %B %Y")

    if not SKIP_SESSION:
        # Always verified, including on dry runs: the check is the cheapest way to catch
        # an expired cookie or a blocked IP, and a dry run that skips it can't tell us
        # whether the real Monday run would have worked.
        verify_substack_session()

    emails = []
    prefs_list = []
    single_prefs = json.loads(PREFS_JSON_RAW) if PREFS_JSON_RAW else None
    if single_prefs is not None:
        single_prefs = {**empty_prefs(), **single_prefs}

    # 1. Sync Airtable subscribers to Substack
    if AIRTABLE_API_KEY and AIRTABLE_BASE_ID:
        try:
            emails, prefs_list = get_airtable_subscribers()
            print(f"  Found {len(emails)} subscribers in Airtable")
            print(f"  Subscribers with prefs: {sum(1 for p in prefs_list if has_any_pref(p))}")
        except Exception as e:
            print(f"  Airtable read error (continuing anyway): {e}")
        if not DRY_RUN and not SKIP_SYNC:
            print("Syncing subscribers...")
            try:
                sync_to_substack(emails)
            except Exception as e:
                print(f"  Sync error (continuing anyway): {e}")
            print()
    elif not DRY_RUN and not SKIP_SYNC:
        raise RuntimeError("AIRTABLE_API_KEY and AIRTABLE_BASE_ID are required to sync subscribers.")

    # 2. Load jobs (jobs.json so Pref* axes exist). --from-ats keeps the old scrape.
    print("Loading jobs...")
    if FROM_ATS:
        company_jobs = fetch_all()
    else:
        raw_jobs, _scraped = load_jobs_json()
        company_jobs = jobs_to_company_jobs(raw_jobs, prefs_list=prefs_list, single_prefs=single_prefs)
        print(f"  jobs.json openings after prefs filter: {sum(len(d['jobs']) for d in company_jobs.values())}")

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
