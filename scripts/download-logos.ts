#!/usr/bin/env npx tsx
/**
 * download-logos.ts
 *
 * downloads logos for all companies and saves them to public/logos/{slug}.png
 * tries multiple sources in order:
 * 1. Clearbit Logo API
 * 2. Google Favicon API (high-res)
 * 3. Direct favicon from company website
 *
 * run: npx tsx scripts/download-logos.ts
 */

import { companies } from "../lib/data"
import * as fs from "fs"
import * as path from "path"

const LOGOS_DIR = path.join(__dirname, "..", "public", "logos")
const MIN_SIZE = 500 // minimum bytes to consider a valid logo (skip tiny placeholders)
const TIMEOUT = 10000

function getDomain(website: string): string {
  try {
    return new URL(website).hostname.replace(/^www\./, "")
  } catch {
    return website.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]
  }
}

async function downloadImage(url: string): Promise<Buffer | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "image/*"
      }
    })
    clearTimeout(timer)

    if (!res.ok) return null

    const contentType = res.headers.get("content-type") || ""
    // must be an image
    if (!contentType.includes("image")) return null

    const buffer = Buffer.from(await res.arrayBuffer())

    // skip tiny files (likely placeholders or 1x1 pixels)
    if (buffer.length < MIN_SIZE) return null

    return buffer
  } catch {
    clearTimeout(timer)
    return null
  }
}

async function downloadLogo(company: any): Promise<{ slug: string; source: string; success: boolean }> {
  const outPath = path.join(LOGOS_DIR, `${company.slug}.png`)

  // skip if already downloaded
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > MIN_SIZE) {
    return { slug: company.slug, source: "cached", success: true }
  }

  const domain = getDomain(company.website)

  // source 1: logo_override if set
  if (company.logo_override) {
    const buf = await downloadImage(company.logo_override)
    if (buf) {
      fs.writeFileSync(outPath, buf)
      return { slug: company.slug, source: "override", success: true }
    }
  }

  // source 2: Clearbit
  const clearbitUrl = `https://logo.clearbit.com/${domain}`
  const clearbitBuf = await downloadImage(clearbitUrl)
  if (clearbitBuf) {
    fs.writeFileSync(outPath, clearbitBuf)
    return { slug: company.slug, source: "clearbit", success: true }
  }

  // source 3: Google Favicon (128px)
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  const faviconBuf = await downloadImage(faviconUrl)
  if (faviconBuf) {
    // check its not the generic globe icon (usually ~4KB for the default)
    // real favicons for real companies are usually different sizes
    fs.writeFileSync(outPath, faviconBuf)
    return { slug: company.slug, source: "favicon", success: true }
  }

  // source 4: try /favicon.ico directly
  const directFavicon = `https://${domain}/favicon.ico`
  const directBuf = await downloadImage(directFavicon)
  if (directBuf) {
    fs.writeFileSync(outPath, directBuf)
    return { slug: company.slug, source: "direct", success: true }
  }

  // source 5: try /apple-touch-icon.png (usually higher quality)
  const appleTouchUrl = `https://${domain}/apple-touch-icon.png`
  const appleBuf = await downloadImage(appleTouchUrl)
  if (appleBuf) {
    fs.writeFileSync(outPath, appleBuf)
    return { slug: company.slug, source: "apple-touch", success: true }
  }

  return { slug: company.slug, source: "none", success: false }
}

async function main() {
  if (!fs.existsSync(LOGOS_DIR)) {
    fs.mkdirSync(LOGOS_DIR, { recursive: true })
  }

  console.log(`\ndownloading logos for ${companies.length} companies...\n`)

  const results: { slug: string; source: string; success: boolean }[] = []
  const batchSize = 5

  for (let i = 0; i < companies.length; i += batchSize) {
    const batch = companies.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(c => downloadLogo(c)))
    results.push(...batchResults)

    const done = Math.min(i + batchSize, companies.length)
    process.stdout.write(`\r  ${done}/${companies.length}`)
  }

  console.log("\n")

  const succeeded = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`downloaded: ${succeeded.length}/${companies.length}`)

  // breakdown by source
  const sources: Record<string, number> = {}
  for (const r of succeeded) {
    sources[r.source] = (sources[r.source] || 0) + 1
  }
  console.log("sources:", sources)

  if (failed.length > 0) {
    console.log(`\nmissing logos (${failed.length}):`)
    for (const r of failed) {
      const company = companies.find(c => c.slug === r.slug)
      console.log(`  ${r.slug} (${company?.website})`)
    }
    console.log("\nfor missing logos, the component will show a colored letter avatar.")
  }
}

main().catch(console.error)
