#!/usr/bin/env npx tsx
/**
 * validate-companies.ts
 *
 * checks every company in data.ts:
 * 1. website URL resolves (HTTP 200 or redirect)
 * 2. linkedin URL resolves
 * 3. careers_url resolves
 *
 * outputs a report with pass/fail/suspect for each company.
 * run: npx tsx scripts/validate-companies.ts
 */

import { companies } from "../lib/data"

interface ValidationResult {
  slug: string
  name: string
  website: string
  website_status: string
  linkedin: string
  linkedin_status: string
  careers_url: string
  careers_status: string
  verdict: "pass" | "warn" | "fail" | "suspect"
  issues: string[]
}

async function checkUrl(url: string, timeout = 10000): Promise<{ status: number | null; ok: boolean; redirected: string | null; error: string | null }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      }
    })
    clearTimeout(timer)
    return {
      status: res.status,
      ok: res.ok,
      redirected: res.redirected ? res.url : null,
      error: null
    }
  } catch (e: any) {
    clearTimeout(timer)

    // HEAD sometimes blocked, try GET
    try {
      const controller2 = new AbortController()
      const timer2 = setTimeout(() => controller2.abort(), timeout)
      const res = await fetch(url, {
        method: "GET",
        signal: controller2.signal,
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        }
      })
      clearTimeout(timer2)
      return {
        status: res.status,
        ok: res.ok,
        redirected: res.redirected ? res.url : null,
        error: null
      }
    } catch (e2: any) {
      return {
        status: null,
        ok: false,
        redirected: null,
        error: e2.cause?.code || e2.message || "unknown error"
      }
    }
  }
}

// suspicious patterns that suggest AI hallucinated the company
function checkSuspiciousPatterns(company: any): string[] {
  const issues: string[] = []

  // generic descriptions
  const genericDescriptions = [
    "ai-powered", "ai solutions", "technology solutions", "tech solutions",
    "enterprise ai", "intelligent automation", "digital solutions"
  ]
  const descLower = company.description.toLowerCase()
  const genericCount = genericDescriptions.filter(g => descLower.includes(g)).length
  if (genericCount >= 2) {
    issues.push("description sounds generic/AI-generated")
  }

  // careers_url is just the homepage (no /careers path)
  if (company.careers_url === company.website) {
    issues.push("careers_url is just the homepage (no dedicated careers page)")
  }

  // linkedin URL follows a guessed pattern (slug matches company slug exactly)
  const linkedinSlug = company.linkedin.split("/company/")[1]?.replace(/\/$/, "")
  if (linkedinSlug && linkedinSlug === company.slug) {
    issues.push("linkedin URL looks auto-generated (matches slug exactly)")
  }

  // all seed stage AI companies with .ai domains are extra suspicious
  if (company.stage === "Seed" && company.sector.includes("AI") && company.website.endsWith(".ai")) {
    issues.push("seed AI company with .ai domain (high hallucination risk)")
  }

  return issues
}

async function validateCompany(company: any): Promise<ValidationResult> {
  const issues: string[] = []

  // check suspicious patterns first (no network needed)
  const suspiciousIssues = checkSuspiciousPatterns(company)
  issues.push(...suspiciousIssues)

  // check website
  const websiteResult = await checkUrl(company.website)
  let websiteStatus = ""
  if (websiteResult.ok) {
    websiteStatus = `OK (${websiteResult.status})`
  } else if (websiteResult.error) {
    websiteStatus = `FAIL (${websiteResult.error})`
    issues.push(`website unreachable: ${websiteResult.error}`)
  } else {
    websiteStatus = `HTTP ${websiteResult.status}`
    if (websiteResult.status && websiteResult.status >= 400) {
      issues.push(`website returns ${websiteResult.status}`)
    }
  }

  // check linkedin
  const linkedinResult = await checkUrl(company.linkedin)
  let linkedinStatus = ""
  if (linkedinResult.ok) {
    linkedinStatus = `OK (${linkedinResult.status})`
  } else if (linkedinResult.error) {
    linkedinStatus = `FAIL (${linkedinResult.error})`
    issues.push(`linkedin unreachable: ${linkedinResult.error}`)
  } else {
    linkedinStatus = `HTTP ${linkedinResult.status}`
    // linkedin often returns 999 for bot detection, thats actually fine
    if (linkedinResult.status === 999) {
      linkedinStatus = "OK (linkedin bot block, normal)"
    } else if (linkedinResult.status && linkedinResult.status >= 400) {
      issues.push(`linkedin returns ${linkedinResult.status}`)
    }
  }

  // check careers url
  const careersResult = await checkUrl(company.careers_url)
  let careersStatus = ""
  if (careersResult.ok) {
    careersStatus = `OK (${careersResult.status})`
  } else if (careersResult.error) {
    careersStatus = `FAIL (${careersResult.error})`
    issues.push(`careers_url unreachable: ${careersResult.error}`)
  } else {
    careersStatus = `HTTP ${careersResult.status}`
    if (careersResult.status && careersResult.status >= 400) {
      issues.push(`careers_url returns ${careersResult.status}`)
    }
  }

  // determine verdict
  let verdict: "pass" | "warn" | "fail" | "suspect" = "pass"
  const hasNetworkFail = issues.some(i => i.includes("unreachable") || i.includes("returns"))
  const hasSuspicious = suspiciousIssues.length >= 2

  if (hasNetworkFail && hasSuspicious) {
    verdict = "fail" // website down AND looks fake
  } else if (hasNetworkFail) {
    verdict = "warn" // website issue but might be temporary
  } else if (hasSuspicious) {
    verdict = "suspect" // website works but data looks auto-generated
  }

  return {
    slug: company.slug,
    name: company.name,
    website: company.website,
    website_status: websiteStatus,
    linkedin: company.linkedin,
    linkedin_status: linkedinStatus,
    careers_url: company.careers_url,
    careers_status: careersStatus,
    verdict,
    issues
  }
}

async function main() {
  console.log(`\nvalidating ${companies.length} companies...\n`)
  console.log("this takes ~2 minutes (10s timeout per URL, 3 URLs per company, batched)\n")

  // process in batches of 5 to avoid overwhelming network
  const results: ValidationResult[] = []
  const batchSize = 5

  for (let i = 0; i < companies.length; i += batchSize) {
    const batch = companies.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(c => validateCompany(c)))
    results.push(...batchResults)

    // progress
    const done = Math.min(i + batchSize, companies.length)
    process.stdout.write(`\r  checked ${done}/${companies.length}`)
  }

  console.log("\n")

  // group by verdict
  const failed = results.filter(r => r.verdict === "fail")
  const warned = results.filter(r => r.verdict === "warn")
  const suspect = results.filter(r => r.verdict === "suspect")
  const passed = results.filter(r => r.verdict === "pass")

  // print report
  console.log("=" .repeat(60))
  console.log("VALIDATION REPORT")
  console.log("=" .repeat(60))

  console.log(`\ntotal: ${companies.length}`)
  console.log(`  pass: ${passed.length}`)
  console.log(`  warn: ${warned.length} (network issues, might be temporary)`)
  console.log(`  suspect: ${suspect.length} (data looks auto-generated)`)
  console.log(`  fail: ${failed.length} (likely not real companies)`)

  if (failed.length > 0) {
    console.log("\n--- FAIL (remove these) ---\n")
    for (const r of failed) {
      console.log(`  ${r.name} (${r.slug})`)
      for (const issue of r.issues) {
        console.log(`    - ${issue}`)
      }
    }
  }

  if (suspect.length > 0) {
    console.log("\n--- SUSPECT (manually verify these) ---\n")
    for (const r of suspect) {
      console.log(`  ${r.name} (${r.slug})`)
      for (const issue of r.issues) {
        console.log(`    - ${issue}`)
      }
    }
  }

  if (warned.length > 0) {
    console.log("\n--- WARN (check if temporary) ---\n")
    for (const r of warned) {
      console.log(`  ${r.name} (${r.slug})`)
      for (const issue of r.issues) {
        console.log(`    - ${issue}`)
      }
    }
  }

  // write full results to JSON for reference
  const outputPath = "./scripts/validation-results.json"
  const fs = await import("fs")
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
  console.log(`\nfull results saved to ${outputPath}`)

  // print the slugs to remove (easy copy paste)
  if (failed.length > 0) {
    console.log("\n--- slugs to remove from data.ts ---\n")
    console.log(failed.map(r => `"${r.slug}"`).join(", "))
  }
}

main().catch(console.error)
