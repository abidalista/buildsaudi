#!/usr/bin/env npx tsx
/**
 * scrape-logos.ts
 *
 * for companies missing logos, fetches their actual website HTML
 * and extracts logo URLs from:
 * 1. og:image meta tag
 * 2. apple-touch-icon link
 * 3. shortcut icon / icon link tags
 * 4. common paths: /logo.png, /images/logo.png, /favicon.svg
 *
 * run: npx tsx scripts/scrape-logos.ts
 */

import { companies } from "../lib/data"
import * as fs from "fs"
import * as path from "path"

const LOGOS_DIR = path.join(__dirname, "..", "public", "logos")
const MIN_SIZE = 500
const TIMEOUT = 12000

async function downloadImage(url: string): Promise<Buffer | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "image/*,*/*"
      }
    })
    clearTimeout(timer)
    if (!res.ok) return null

    const contentType = res.headers.get("content-type") || ""
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length < MIN_SIZE) return null

    // skip HTML responses (some servers return HTML for missing images)
    if (contentType.includes("text/html") && buffer.length < 5000) return null

    return buffer
  } catch {
    clearTimeout(timer)
    return null
  }
}

async function fetchHTML(url: string): Promise<string | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml"
      }
    })
    clearTimeout(timer)
    if (!res.ok) return null
    return await res.text()
  } catch {
    clearTimeout(timer)
    return null
  }
}

function extractLogoUrls(html: string, baseUrl: string): string[] {
  const urls: string[] = []

  // 1. og:image
  const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)
  if (ogMatch) urls.push(ogMatch[1])

  // 2. twitter:image
  const twitterMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i)
  if (twitterMatch) urls.push(twitterMatch[1])

  // 3. apple-touch-icon (highest quality favicon usually)
  const appleMatches = html.matchAll(/<link[^>]*rel=["']apple-touch-icon[^"']*["'][^>]*href=["']([^"']+)["']/gi)
  for (const m of appleMatches) urls.push(m[1])

  // 4. icon / shortcut icon
  const iconMatches = html.matchAll(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/gi)
  for (const m of iconMatches) urls.push(m[1])
  // also reversed attribute order
  const iconMatches2 = html.matchAll(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:shortcut )?icon["']/gi)
  for (const m of iconMatches2) urls.push(m[1])

  // 5. any img tag with "logo" in src, class, or id
  const logoImgMatches = html.matchAll(/<img[^>]*(?:class|id|alt)=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)["']/gi)
  for (const m of logoImgMatches) urls.push(m[1])
  const logoImgMatches2 = html.matchAll(/<img[^>]*src=["']([^"']*logo[^"']*)["']/gi)
  for (const m of logoImgMatches2) urls.push(m[1])

  // resolve relative URLs
  return urls.map(u => {
    if (u.startsWith("http")) return u
    if (u.startsWith("//")) return `https:${u}`
    if (u.startsWith("/")) return `${baseUrl}${u}`
    return `${baseUrl}/${u}`
  }).filter(u => {
    // skip data: URLs and tracking pixels
    if (u.startsWith("data:")) return false
    if (u.includes("pixel") || u.includes("tracking")) return false
    return true
  })
}

async function scrapeLogo(company: any): Promise<{ slug: string; source: string; success: boolean }> {
  const outPath = path.join(LOGOS_DIR, `${company.slug}.png`)

  // skip if already have a good logo
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > MIN_SIZE) {
    return { slug: company.slug, source: "cached", success: true }
  }

  const baseUrl = company.website.replace(/\/$/, "")

  // fetch the homepage HTML
  const html = await fetchHTML(company.website)
  if (!html) {
    // try common paths as last resort
    const commonPaths = [
      `${baseUrl}/apple-touch-icon.png`,
      `${baseUrl}/favicon.ico`,
      `${baseUrl}/favicon.png`,
      `${baseUrl}/logo.png`,
      `${baseUrl}/images/logo.png`,
      `${baseUrl}/assets/logo.png`,
      `${baseUrl}/img/logo.png`,
    ]
    for (const p of commonPaths) {
      const buf = await downloadImage(p)
      if (buf) {
        fs.writeFileSync(outPath, buf)
        return { slug: company.slug, source: `direct:${p}`, success: true }
      }
    }
    return { slug: company.slug, source: "none (site unreachable)", success: false }
  }

  // extract logo URLs from HTML and try each
  const logoUrls = extractLogoUrls(html, baseUrl)

  for (const url of logoUrls) {
    const buf = await downloadImage(url)
    if (buf) {
      fs.writeFileSync(outPath, buf)
      return { slug: company.slug, source: url, success: true }
    }
  }

  // fallback: try common paths
  const commonPaths = [
    `${baseUrl}/apple-touch-icon.png`,
    `${baseUrl}/apple-touch-icon-precomposed.png`,
    `${baseUrl}/favicon.png`,
    `${baseUrl}/favicon-32x32.png`,
    `${baseUrl}/favicon.svg`,
  ]
  for (const p of commonPaths) {
    const buf = await downloadImage(p)
    if (buf) {
      fs.writeFileSync(outPath, buf)
      return { slug: company.slug, source: p, success: true }
    }
  }

  return { slug: company.slug, source: "none (no logo found in HTML)", success: false }
}

async function main() {
  // only process companies missing logos
  const missing = companies.filter(c => {
    const p = path.join(LOGOS_DIR, `${c.slug}.png`)
    return !fs.existsSync(p) || fs.statSync(p).size < MIN_SIZE
  })

  console.log(`\n${missing.length} companies missing logos. scraping their websites...\n`)

  const results: { slug: string; source: string; success: boolean }[] = []

  for (let i = 0; i < missing.length; i++) {
    const c = missing[i]
    process.stdout.write(`\r  ${i + 1}/${missing.length} - ${c.name}...                    `)
    const r = await scrapeLogo(c)
    results.push(r)
    if (r.success) {
      process.stdout.write(` ✓ (${r.source.substring(0, 40)})`)
    }
  }

  console.log("\n")

  const succeeded = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`found: ${succeeded.length}/${missing.length}`)
  console.log(`still missing: ${failed.length}`)

  if (failed.length > 0) {
    console.log("\nstill missing:")
    for (const r of failed) {
      console.log(`  ${r.slug} — ${r.source}`)
    }
  }

  // summary
  const totalLogos = companies.filter(c => {
    const p = path.join(LOGOS_DIR, `${c.slug}.png`)
    return fs.existsSync(p) && fs.statSync(p).size >= MIN_SIZE
  }).length
  console.log(`\ntotal logos: ${totalLogos}/${companies.length}`)
}

main().catch(console.error)
