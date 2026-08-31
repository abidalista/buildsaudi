#!/usr/bin/env python3
"""
Delete Airtable job records older than 30 days.
Keeps the base under the free-plan 1,000 record limit.

Run: python3 scripts/cleanup-old-jobs.py
"""

import os
import sys
from datetime import datetime, timedelta

import requests

env_file = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".env.local"))
if os.path.exists(env_file):
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

TOKEN = os.environ["AIRTABLE_API_KEY"]
BASE_ID = os.environ["AIRTABLE_BASE_ID"]
TABLE_ID = os.environ.get("AIRTABLE_JOBS_TABLE_ID", "tblZQY3B1gv5pMBYN")
DATE_FIELD = os.environ.get("AIRTABLE_POSTED_DATE_FIELD", "Posted Date")

URL = f"https://api.airtable.com/v0/{BASE_ID}/{TABLE_ID}"
HEADERS = {"Authorization": f"Bearer {TOKEN}"}


def fetch_all():
    records, params = [], {"pageSize": 100}
    while True:
        r = requests.get(URL, headers=HEADERS, params=params, timeout=30)
        r.raise_for_status()
        data = r.json()
        records.extend(data.get("records", []))
        offset = data.get("offset")
        if not offset:
            return records
        params["offset"] = offset


def main():
    cutoff = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    print(f"Cutoff: {cutoff}")

    records = fetch_all()
    print(f"Total records: {len(records)}")

    stale = [
        rec["id"]
        for rec in records
        if (rec.get("fields", {}).get(DATE_FIELD) or "")[:10] < cutoff
        and rec.get("fields", {}).get(DATE_FIELD)
    ]

    if not stale:
        print(f"Nothing older than {cutoff}. {len(records)} jobs remain.")
        return

    deleted = 0
    for i in range(0, len(stale), 10):
        batch = stale[i : i + 10]
        r = requests.delete(URL, headers=HEADERS, params=[("records[]", rid) for rid in batch], timeout=30)
        if not r.ok:
            print(f"  Batch delete failed ({r.status_code}): {r.text[:200]}")
            sys.exit(1)
        deleted += len(r.json().get("records", []))

    print(f"Deleted {deleted} old jobs. {len(records) - deleted} jobs remain.")


if __name__ == "__main__":
    main()
