#!/usr/bin/env python3
"""
Run this ON YOUR MAC (not in cloud VM):
  python3 scripts/grab_logos_mac.py

Fetches logos from company websites using your local network
(which can reach .sa domains that cloud VMs cannot).
"""
import urllib.request, re, os, ssl

# Disable SSL verification for problematic certs
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

LOGOS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'logos')
os.makedirs(LOGOS_DIR, exist_ok=True)

companies = [
    ('ninja', 'https://ananinja.com'),
    ('foodics', 'https://www.foodics.com'),
    ('hala', 'https://hala.com'),
    ('jahez', 'https://jahez.net'),
    ('erad', 'https://erad.co'),
    ('wakecap', 'https://www.wakecap.com'),
    ('elm', 'https://elm.sa'),
    ('sdaia', 'https://sdaia.gov.sa'),
    ('bayzat', 'https://bayzat.com'),
    ('jisr', 'https://jisr.net'),
    ('zenhr', 'https://zenhr.com'),
    ('trukker', 'https://trukker.com'),
    ('gathern', 'https://gathern.co'),
    ('rasan', 'https://rasan.com'),
    ('calo', 'https://calo.app'),
    ('syarah', 'https://syarah.com'),
    ('sary', 'https://sary.sa'),
    ('nana', 'https://nana.sa'),
    ('d360', 'https://d360.com'),
    ('fordeal', 'https://fordeal.com'),
    ('alat', 'https://alat.sa'),
    ('ceer', 'https://ceer.sa'),
    ('classera', 'https://classera.com'),
    ('rize', 'https://rize.sa'),
    ('hazen', 'https://hazen.ai'),
    ('invygo', 'https://invygo.com'),
    ('cognna', 'https://www.cognna.com'),
    ('rewaa', 'https://rewaa.com'),
    ('zid', 'https://zid.sa'),
    ('soum', 'https://soum.sa'),
    ('tamam', 'https://tamam.sa'),
    ('lean-technologies', 'https://leantech.me'),
    ('stc-solutions', 'https://stcs.com.sa'),
    ('center3', 'https://center3.com'),
    ('cura', 'https://cura.healthcare'),
    ('aec', 'https://aec.com.sa'),
    ('ejar', 'https://ejar.sa'),
    ('kliq', 'https://kliq.sa'),
    ('lite', 'https://lite.sa'),
    ('nayla', 'https://nayla.com.sa'),
    ('yamm', 'https://yamm.finance'),
    ('spore', 'https://spore.sa'),
    ('silq', 'https://silq.sa'),
    ('torod', 'https://torod.com'),
    ('spoilz', 'https://spoilz.co'),
    ('ballurh', 'https://ballurh.com'),
    ('rased', 'https://rased.com'),
    ('engagesoft', 'https://engagesoft.com'),
    ('aumet', 'https://aumet.com'),
    ('omniful', 'https://omniful.com'),
    ('abwab-ai', 'https://abwab.ai'),
    ('capify', 'https://capify.sa'),
    ('collecto', 'https://collecto.sa'),
    ('edana', 'https://edana.sa'),
    ('bynow', 'https://bynow.sa'),
    ('madkhol', 'https://madkhol.com'),
    ('neo-space', 'https://neospacegroup.com'),
    ('atam', 'https://atam.careers'),
    ('glamera', 'https://glamera.com'),
    ('livedin', 'https://livedin.sa'),
    ('mnzl', 'https://mnzl.com'),
    ('doos', 'https://doos.sa'),
    ('brkz', 'https://brkz.com'),
    ('xbites', 'https://xbites.ai'),
    ('string-tech', 'https://string.sa'),
    ('tabsense', 'https://tabsense.com'),
    ('leejak', 'https://leejak.sa'),
    ('picship', 'https://picship.sa'),
    ('supplai', 'https://supplai.sa'),
    ('reporty', 'https://reporty.ai'),
    ('kilow', 'https://kilow.sa'),
    ('velents', 'https://velents.com'),
]

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

def fetch(url, timeout=10):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    try:
        return urllib.request.urlopen(req, timeout=timeout, context=ctx).read()
    except Exception:
        return None

def extract_logo_urls(html_bytes, base_url):
    html = html_bytes.decode('utf-8', errors='ignore')
    urls = []
    # og:image
    for pattern in [
        r'property=["\']og:image["\'][^>]*content=["\']([^"\']+)',
        r'content=["\']([^"\']+)["\'][^>]*property=["\']og:image',
    ]:
        m = re.search(pattern, html)
        if m:
            urls.append(m.group(1))
    # apple-touch-icon
    for m in re.finditer(r'rel=["\']apple-touch-icon[^"\']*["\'][^>]*href=["\']([^"\']+)', html):
        urls.append(m.group(1))
    # icon/favicon links
    for m in re.finditer(r'rel=["\'][^"\']*icon[^"\']*["\'][^>]*href=["\']([^"\']+)', html):
        urls.append(m.group(1))
    for m in re.finditer(r'href=["\']([^"\']+)["\'][^>]*rel=["\'][^"\']*icon', html):
        urls.append(m.group(1))
    # img with logo in src or alt
    for m in re.finditer(r'<img[^>]*src=["\']([^"\']*logo[^"\']*)["\']', html, re.I):
        urls.append(m.group(1))
    # resolve relative URLs
    resolved = []
    for u in urls:
        if u.startswith('data:'):
            continue
        if u.startswith('//'):
            u = 'https:' + u
        elif u.startswith('/'):
            u = base_url.rstrip('/') + u
        elif not u.startswith('http'):
            u = base_url.rstrip('/') + '/' + u
        resolved.append(u)
    return resolved

ok = 0
fail = 0
skip = 0

for slug, url in companies:
    out = os.path.join(LOGOS_DIR, slug + '.png')
    if os.path.exists(out) and os.path.getsize(out) > 2000:
        print(f'  skip {slug} (already {os.path.getsize(out)} bytes)')
        skip += 1
        continue

    html = fetch(url)
    saved = False

    if html:
        logo_urls = extract_logo_urls(html, url)
        for logo_url in logo_urls:
            img = fetch(logo_url)
            if img and len(img) > 1000:
                with open(out, 'wb') as f:
                    f.write(img)
                print(f'  OK   {slug} <- {logo_url[:70]} ({len(img)} bytes)')
                saved = True
                ok += 1
                break

    if not saved:
        # try common favicon paths
        for path in ['/apple-touch-icon.png', '/apple-touch-icon-precomposed.png',
                     '/favicon.ico', '/favicon.png', '/favicon-32x32.png']:
            img = fetch(url.rstrip('/') + path)
            if img and len(img) > 1000:
                with open(out, 'wb') as f:
                    f.write(img)
                print(f'  OK   {slug} <- {path} ({len(img)} bytes)')
                saved = True
                ok += 1
                break

    if not saved:
        print(f'  FAIL {slug} ({url})')
        fail += 1

print(f'\ndone. ok={ok} skip={skip} fail={fail}')
print(f'total logos in folder: {len([f for f in os.listdir(LOGOS_DIR) if f.endswith(".png") and os.path.getsize(os.path.join(LOGOS_DIR, f)) > 1000])}')
