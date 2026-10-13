#!/usr/bin/env node
/**
 * Verification scaffolding for BuildSaudi.
 * Drive only the instance this run launched. Never kill by process name.
 */
import { spawn, execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { createConnection } from "node:net"
import { dirname, isAbsolute, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright-core"

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const SKILL_DIR = resolve(SCRIPT_DIR, "..")
const REPO_ROOT = resolve(SKILL_DIR, "../../..")

const RUN_ID = process.env.BUILDSAUDI_VERIFY_RUN_ID || "default"
const HOST = process.env.BUILDSAUDI_VERIFY_HOST || "127.0.0.1"
const PORT = Number(process.env.BUILDSAUDI_VERIFY_PORT || 4317)
const CDP_PORT = Number(process.env.BUILDSAUDI_VERIFY_CDP_PORT || 4318)
const VIEWPORT = { width: 1440, height: 900 }
const READY_MARKERS = ["BUILDSAUDI", "Humain"]
const STATE_DIR = process.env.BUILDSAUDI_VERIFY_STATE_DIR || `/tmp/buildsaudi-verify/${RUN_ID}`
const STATE_FILE = join(STATE_DIR, "state.json")
const LOG_FILE = join(STATE_DIR, "next.log")
const CHROME_DIR = join(STATE_DIR, "chrome-profile")
const TMUX_SESSION = `buildsaudi-verify-${RUN_ID}`

function usage(code = 1) {
  console.error(`control-buildsaudi — drive a local BuildSaudi instance this run started.

Usage:
  control-buildsaudi launch
  control-buildsaudi doctor
  control-buildsaudi cleanup
  control-buildsaudi http get <path>
  control-buildsaudi browser start
  control-buildsaudi browser goto <path>
  control-buildsaudi browser click --role <role> --name <name> [--nth N] [--exact]
  control-buildsaudi browser fill --selector <css> --value <text>
  control-buildsaudi browser fill --role <role> --name <name> --value <text>
  control-buildsaudi browser press --key <key>
  control-buildsaudi browser wait --text <text>
  control-buildsaudi browser dismiss-job-alert
  control-buildsaudi browser snapshot --aria --path <file>
  control-buildsaudi browser screenshot --path <file>
  control-buildsaudi browser eval --js <expression>

Env:
  BUILDSAUDI_VERIFY_RUN_ID   default: default
  BUILDSAUDI_VERIFY_PORT     default: 4317
  BUILDSAUDI_VERIFY_CDP_PORT default: 4318
  BUILDSAUDI_VERIFY_HOST     default: 127.0.0.1
  BUILDSAUDI_VERIFY_HEADED   set to 1 for a visible Chrome window
`)
  process.exit(code)
}

function loadState() {
  if (!existsSync(STATE_FILE)) {
    throw new Error(`No verification state at ${STATE_FILE}. Run launch first.`)
  }
  return JSON.parse(readFileSync(STATE_FILE, "utf8"))
}

function saveState(state) {
  mkdirSync(STATE_DIR, { recursive: true })
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n")
}

function pidAlive(pid) {
  if (!pid) return false
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function portOpen(host, port) {
  return new Promise((resolvePort) => {
    const sock = createConnection({ host, port })
    sock.once("connect", () => {
      sock.end()
      resolvePort(true)
    })
    sock.once("error", () => resolvePort(false))
    sock.setTimeout(500, () => {
      sock.destroy()
      resolvePort(false)
    })
  })
}

function pidsOnPort(port) {
  const pids = new Set()
  try {
    const out = execFileSync("netstat", ["-tlnp"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
    const re = new RegExp(`[:.]${port}\\s+.*LISTEN\\s+(\\d+)/`)
    for (const line of out.split("\n")) {
      const match = line.match(re)
      if (match) pids.add(Number(match[1]))
    }
  } catch {
    /* netstat missing */
  }
  if (pids.size) return [...pids]
  try {
    const out = execFileSync("ss", ["-ltnp"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
    const re = new RegExp(`[:.]${port}\\b`)
    for (const line of out.split("\n")) {
      if (!re.test(line) || !/LISTEN/i.test(line)) continue
      for (const match of line.matchAll(/pid=(\d+)/g)) pids.add(Number(match[1]))
    }
  } catch {
    /* ss missing */
  }
  return [...pids]
}

function descendantPids(root) {
  const ids = new Set([Number(root)])
  try {
    const out = execFileSync("ps", ["-eo", "pid,ppid"], { encoding: "utf8" })
    const rows = out
      .trim()
      .split("\n")
      .slice(1)
      .map((line) => {
        const [pid, ppid] = line.trim().split(/\s+/).map(Number)
        return { pid, ppid }
      })
    let grew = true
    while (grew) {
      grew = false
      for (const row of rows) {
        if (ids.has(row.ppid) && !ids.has(row.pid)) {
          ids.add(row.pid)
          grew = true
        }
      }
    }
  } catch {
    /* ps unavailable */
  }
  return ids
}

async function httpGet(url) {
  const res = await fetch(url, { redirect: "manual" })
  const body = await res.text()
  return { status: res.status, body, headers: Object.fromEntries(res.headers) }
}

function tmuxPrefix() {
  const conf = "/exec-daemon/tmux.portal.conf"
  return existsSync(conf) ? ["-f", conf] : []
}

function tmuxAvailable() {
  try {
    execFileSync("tmux", [...tmuxPrefix(), "-V"], { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

function tmuxHas(session) {
  try {
    execFileSync("tmux", [...tmuxPrefix(), "has-session", "-t", `=${session}`], { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

function chromeBin() {
  for (const bin of ["google-chrome", "chromium", "chromium-browser"]) {
    try {
      return execFileSync("which", [bin], { encoding: "utf8" }).trim()
    } catch {
      /* keep looking */
    }
  }
  throw new Error("No Chrome/Chromium on PATH. Install Chrome or set a browser the skill can launch.")
}

async function waitReady(url, timeoutMs = 120000) {
  const start = Date.now()
  let last = ""
  while (Date.now() - start < timeoutMs) {
    try {
      const { status, body } = await httpGet(url)
      last = `HTTP ${status}, ${body.length} bytes`
      if (status === 200 && READY_MARKERS.every((m) => body.includes(m))) return
    } catch (err) {
      last = String(err.message || err)
    }
    await sleep(500)
  }
  throw new Error(`App at ${url} never became usable (last: ${last}). Need HTTP 200 plus ${READY_MARKERS.join(" and ")} in the homepage HTML.`)
}

async function cmdLaunch() {
  mkdirSync(STATE_DIR, { recursive: true })
  if (existsSync(STATE_FILE)) {
    const existing = JSON.parse(readFileSync(STATE_FILE, "utf8"))
    if (pidAlive(existing.pid)) {
      throw new Error(
        `Run ${existing.runId} already has PID ${existing.pid} on ${existing.url}. Cleanup first, or pick a new BUILDSAUDI_VERIFY_RUN_ID / PORT.`,
      )
    }
  }
  const occupants = pidsOnPort(PORT)
  if (occupants.length) {
    throw new Error(`Port ${PORT} is already owned by pid(s) ${occupants.join(", ")}. Pick another BUILDSAUDI_VERIFY_PORT.`)
  }

  const url = `http://${HOST}:${PORT}`
  const env = {
    ...process.env,
    PORT: String(PORT),
    BROWSER: "none",
    HOSTNAME: HOST,
  }
  const args = ["run", "dev", "--", "--port", String(PORT), "--hostname", HOST]
  let pid
  if (tmuxAvailable()) {
    if (tmuxHas(TMUX_SESSION)) {
      execFileSync("tmux", [...tmuxPrefix(), "kill-session", "-t", `=${TMUX_SESSION}`], { stdio: "ignore" })
    }
    const inner = `cd ${JSON.stringify(REPO_ROOT)} && exec npm run dev -- --port ${PORT} --hostname ${HOST} > ${JSON.stringify(LOG_FILE)} 2>&1`
    execFileSync(
      "tmux",
      [...tmuxPrefix(), "new-session", "-d", "-s", TMUX_SESSION, "-c", REPO_ROOT, "--", "bash", "-lc", inner],
      { env },
    )
    await sleep(400)
    try {
      pid = Number(
        execFileSync("tmux", [...tmuxPrefix(), "list-panes", "-t", `=${TMUX_SESSION}`, "-F", "#{pane_pid}"], {
          encoding: "utf8",
        }).trim(),
      )
    } catch {
      pid = 0
    }
  } else {
    const child = spawn("npm", args, {
      cwd: REPO_ROOT,
      env,
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    })
    pid = child.pid
    const log = (chunk) => writeFileSync(LOG_FILE, chunk, { flag: "a" })
    child.stdout.on("data", log)
    child.stderr.on("data", log)
    child.unref()
  }

  const state = {
    runId: RUN_ID,
    host: HOST,
    port: PORT,
    cdpPort: CDP_PORT,
    url,
    pid,
    tmuxSession: tmuxAvailable() ? TMUX_SESSION : null,
    repoRoot: REPO_ROOT,
    logFile: LOG_FILE,
    startedAt: new Date().toISOString(),
  }
  saveState(state)
  try {
    await waitReady(url)
  } catch (err) {
    await cmdCleanup({ keepEvidence: true })
    throw err
  }
  const refreshed = { ...loadState(), readyAt: new Date().toISOString() }
  saveState(refreshed)
  console.log(`launched ${url} run=${RUN_ID} pid=${pid} state=${STATE_FILE}`)
}

async function cmdDoctor() {
  const state = loadState()
  const problems = []
  if (!pidAlive(state.pid)) problems.push(`next pid ${state.pid} is not running`)
  const occupants = pidsOnPort(state.port)
  const tree = descendantPids(state.pid)
  if (occupants.length) {
    if (!occupants.some((pid) => tree.has(pid))) {
      problems.push(`port ${state.port} is owned by pid(s) ${occupants.join(", ")}, not this run's pid ${state.pid}`)
    }
  } else {
    const nextLike = [...tree].filter((pid) => {
      try {
        return readFileSync(`/proc/${pid}/cmdline`, "utf8").includes("next")
      } catch {
        return false
      }
    })
    if (!nextLike.length) problems.push(`nothing is listening on ${state.port}`)
  }
  const { status, body } = await httpGet(state.url).catch((err) => {
    problems.push(`GET ${state.url} failed: ${err.message}`)
    return { status: 0, body: "" }
  })
  if (status !== 200) problems.push(`GET ${state.url} -> HTTP ${status}, want 200`)
  for (const marker of READY_MARKERS) {
    if (!body.includes(marker)) problems.push(`homepage HTML missing ${marker}`)
  }
  const jobs = await httpGet(`${state.url}/jobs`).catch((err) => ({ status: 0, body: String(err) }))
  if (jobs.status !== 200 || !jobs.body.includes("BUILDSAUDI")) {
    problems.push(`GET ${state.url}/jobs is not a usable jobs page (HTTP ${jobs.status})`)
  }
  const report = {
    ok: problems.length === 0,
    runId: state.runId,
    url: state.url,
    port: state.port,
    pid: state.pid,
    portPids: occupants,
    chromePid: state.chromePid || null,
    startedAt: state.startedAt,
    problems,
  }
  console.log(JSON.stringify(report, null, 2))
  if (problems.length) process.exit(2)
}

async function cmdCleanup() {
  let state = null
  if (existsSync(STATE_FILE)) {
    try {
      state = JSON.parse(readFileSync(STATE_FILE, "utf8"))
    } catch {
      state = null
    }
  }
  if (state?.chromePid && pidAlive(state.chromePid)) {
    try {
      process.kill(state.chromePid, "SIGTERM")
    } catch {
      /* already gone */
    }
  }
  if (state?.tmuxSession && tmuxHas(state.tmuxSession)) {
    try {
      execFileSync("tmux", [...tmuxPrefix(), "kill-session", "-t", `=${state.tmuxSession}`], { stdio: "ignore" })
    } catch {
      /* already gone */
    }
  } else if (state?.pid && pidAlive(state.pid)) {
    try {
      process.kill(-state.pid, "SIGTERM")
    } catch {
      try {
        process.kill(state.pid, "SIGTERM")
      } catch {
        /* already gone */
      }
    }
  }
  await sleep(300)
  if (state?.chromePid && pidAlive(state.chromePid)) {
    try {
      process.kill(state.chromePid, "SIGKILL")
    } catch {
      /* ignore */
    }
  }
  if (state?.pid && pidAlive(state.pid) && !state.tmuxSession) {
    try {
      process.kill(-state.pid, "SIGKILL")
    } catch {
      try {
        process.kill(state.pid, "SIGKILL")
      } catch {
        /* ignore */
      }
    }
  }
  rmSync(CHROME_DIR, { recursive: true, force: true })
  if (existsSync(STATE_FILE)) rmSync(STATE_FILE)
  console.log(`cleaned run=${RUN_ID} (evidence under ${join(SKILL_DIR, "artifacts")} kept)`)
}

function parseFlags(argv) {
  const flags = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i]
    if (token === "--") {
      flags._.push(...argv.slice(i + 1))
      break
    }
    if (token.startsWith("--")) {
      const key = token.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith("--")) flags[key] = true
      else {
        flags[key] = next
        i++
      }
    } else {
      flags._.push(token)
    }
  }
  return flags
}

function artifactPath(p) {
  if (!p) throw new Error("Need --path")
  const abs = isAbsolute(p) ? p : resolve(REPO_ROOT, p)
  mkdirSync(dirname(abs), { recursive: true })
  return abs
}

async function ensureChrome(state) {
  if (state.chromePid && pidAlive(state.chromePid) && (await portOpen(HOST, state.cdpPort))) {
    return state
  }
  const occupants = pidsOnPort(state.cdpPort)
  if (occupants.length) {
    throw new Error(`CDP port ${state.cdpPort} is already owned by pid(s) ${occupants.join(", ")}. Pick another BUILDSAUDI_VERIFY_CDP_PORT.`)
  }
  mkdirSync(CHROME_DIR, { recursive: true })
  const headed = process.env.BUILDSAUDI_VERIFY_HEADED === "1"
  const args = [
    `--remote-debugging-port=${state.cdpPort}`,
    `--remote-debugging-address=${HOST}`,
    `--user-data-dir=${CHROME_DIR}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    "about:blank",
  ]
  if (!headed) args.unshift("--headless=new")
  const child = spawn(chromeBin(), args, {
    detached: true,
    stdio: "ignore",
  })
  child.unref()
  const next = { ...state, chromePid: child.pid, chromeProfile: CHROME_DIR }
  saveState(next)
  const start = Date.now()
  while (Date.now() - start < 15000) {
    if (await portOpen(HOST, state.cdpPort)) return next
    await sleep(150)
  }
  throw new Error(`Chrome did not open CDP on ${HOST}:${state.cdpPort}`)
}

async function withPage(fn) {
  const state = await ensureChrome(loadState())
  const browser = await chromium.connectOverCDP(`http://${HOST}:${state.cdpPort}`)
  try {
    const context = browser.contexts()[0] || (await browser.newContext({ viewport: VIEWPORT }))
    await context.setViewportSize(VIEWPORT).catch(() => {})
    const page = context.pages()[0] || (await context.newPage())
    await page.setViewportSize(VIEWPORT)
    return await fn(page, state)
  } finally {
    /* Intentionally not browser.close(): that kills Chrome. process.exit(0) drops the CDP socket. */
  }
}

function locatorFromFlags(page, flags) {
  if (flags.selector) return page.locator(String(flags.selector))
  if (flags.role) {
    const opts = {}
    if (flags.name !== undefined) {
      opts.name = flags.exact ? String(flags.name) : new RegExp(escapeRegExp(String(flags.name)), "i")
    }
    return page.getByRole(String(flags.role), opts)
  }
  throw new Error("Need --selector or --role")
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

async function nthLocator(locator, flags) {
  const n = flags.nth !== undefined ? Number(flags.nth) : 0
  return locator.nth(n)
}

async function ariaDump(page) {
  return page.evaluate(() => {
    const interesting = new Set(["link", "button", "textbox", "searchbox", "combobox", "heading", "status", "dialog", "option"])
    const rows = []
    const walk = (root) => {
      const nodes = root.querySelectorAll("*")
      for (const el of nodes) {
        if (!(el instanceof HTMLElement)) continue
        const style = window.getComputedStyle(el)
        if (style.display === "none" || style.visibility === "hidden") continue
        const role = el.getAttribute("role") || implicitRole(el)
        if (!role || !interesting.has(role)) continue
        const name =
          el.getAttribute("aria-label") ||
          el.getAttribute("placeholder") ||
          (el instanceof HTMLInputElement ? el.labels?.[0]?.innerText : "") ||
          el.innerText
        const compact = (name || "").replace(/\s+/g, " ").trim().slice(0, 160)
        rows.push({
          role,
          name: compact,
          tag: el.tagName.toLowerCase(),
          id: el.id || "",
        })
      }
    }
    function implicitRole(el) {
      const tag = el.tagName.toLowerCase()
      if (tag === "a" && el.hasAttribute("href")) return "link"
      if (tag === "button") return "button"
      if (tag === "input") {
        const type = (el.getAttribute("type") || "text").toLowerCase()
        if (type === "search") return "searchbox"
        if (["text", "email", "url", "tel", "password", ""].includes(type)) return "textbox"
        if (type === "button" || type === "submit") return "button"
      }
      if (tag === "textarea") return "textbox"
      if (tag === "select") return "combobox"
      if (/^h[1-6]$/.test(tag)) return "heading"
      return el.getAttribute("role") || ""
    }
    walk(document)
    const main = document.querySelector("#main-content")
    return {
      title: document.title,
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      url: location.href,
      identity: document.body.innerText.includes("BUILDSAUDI"),
      heading: document.querySelector("h1")?.innerText?.trim() || "",
      mainText: (main?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 4000),
      controls: rows.slice(0, 250),
    }
  })
}

const JOB_ALERT_TITLES = [
  "نرسل لك عروض وظايف مخصصة كل أسبوع.",
  "We send you personalized job offers every week.",
]

async function dismissJobAlert(page, waitMs = 0) {
  const deadline = Date.now() + waitMs
  while (true) {
    const close = page.getByRole("button", { name: "Close" })
    if (await close.count()) {
      await close.first().click()
      return "closed-aria"
    }
    for (const title of JOB_ALERT_TITLES) {
      const heading = page.getByRole("heading", { name: title })
      if (await heading.count()) {
        const overlay = page.locator("div.fixed.inset-0").filter({ hasText: title })
        await overlay.locator("button").first().click()
        return "closed-heading"
      }
    }
    if (Date.now() >= deadline) return "absent"
    await sleep(250)
  }
}

async function cmdBrowser(argv) {
  const sub = argv[0]
  const flags = parseFlags(argv.slice(1))
  if (!sub || sub === "help") usage(0)

  if (sub === "start") {
    await withPage(async (page) => {
      await page.goto(loadState().url, { waitUntil: "domcontentloaded" })
      console.log(`browser ready ${page.url()}`)
    })
    return
  }

  if (sub === "goto") {
    const path = flags._[0] || "/"
    await withPage(async (page, state) => {
      const url = path.startsWith("http") ? path : `${state.url}${path.startsWith("/") ? path : `/${path}`}`
      await page.goto(url, { waitUntil: "domcontentloaded" })
      await page.waitForSelector("h1", { timeout: 30000 })
      console.log(`goto ${page.url()}`)
    })
    return
  }

  if (sub === "click") {
    await withPage(async (page) => {
      const loc = await nthLocator(locatorFromFlags(page, flags), flags)
      await loc.click()
      console.log(`clicked ${flags.role || flags.selector} ${flags.name || ""}`.trim())
    })
    return
  }

  if (sub === "fill") {
    await withPage(async (page) => {
      if (flags.value === undefined) throw new Error("Need --value")
      const loc = await nthLocator(locatorFromFlags(page, flags), flags)
      await loc.fill(String(flags.value))
      console.log(`filled ${flags.selector || flags.name}`)
    })
    return
  }

  if (sub === "press") {
    const key = flags.key || flags._[0]
    if (!key) throw new Error("Need --key")
    await withPage(async (page) => {
      await page.keyboard.press(String(key))
      console.log(`pressed ${key}`)
    })
    return
  }

  if (sub === "wait") {
    const text = flags.text || flags._[0]
    if (!text) throw new Error("Need --text")
    await withPage(async (page) => {
      await page.getByText(String(text), { exact: false }).first().waitFor({ timeout: 15000 })
      console.log(`saw ${text}`)
    })
    return
  }

  if (sub === "dismiss-job-alert") {
    const waitMs = flags.wait !== undefined ? Number(flags.wait) : 0
    await withPage(async (page) => {
      const result = await dismissJobAlert(page, waitMs)
      console.log(`job-alert ${result}`)
    })
    return
  }

  if (sub === "snapshot") {
    const path = artifactPath(flags.path)
    await withPage(async (page) => {
      const dump = await ariaDump(page)
      writeFileSync(path, JSON.stringify(dump, null, 2) + "\n")
      console.log(`wrote ${path}`)
    })
    return
  }

  if (sub === "screenshot") {
    const path = artifactPath(flags.path)
    await withPage(async (page) => {
      await page.screenshot({ path, fullPage: false })
      console.log(`wrote ${path}`)
    })
    return
  }

  if (sub === "eval") {
    const js = flags.js || flags._.join(" ")
    if (!js) throw new Error("Need --js")
    await withPage(async (page) => {
      const result = await page.evaluate(js)
      console.log(typeof result === "string" ? result : JSON.stringify(result, null, 2))
    })
    return
  }

  throw new Error(`Unknown browser command: ${sub}`)
}

async function cmdHttp(argv) {
  const method = (argv[0] || "get").toLowerCase()
  const path = argv[1] || "/"
  if (method !== "get") throw new Error("Only GET is implemented. Do not POST job-seeker or suggest from verification.")
  const state = loadState()
  const url = path.startsWith("http") ? path : `${state.url}${path.startsWith("/") ? path : `/${path}`}`
  const { status, body } = await httpGet(url)
  console.log(`HTTP ${status} ${url}`)
  console.log(body.slice(0, 4000))
  if (status >= 400) process.exit(1)
}

const [cmd, ...rest] = process.argv.slice(2)
if (!cmd || cmd === "-h" || cmd === "--help") usage(0)

try {
  if (cmd === "launch") await cmdLaunch()
  else if (cmd === "doctor") await cmdDoctor()
  else if (cmd === "cleanup") await cmdCleanup()
  else if (cmd === "browser") await cmdBrowser(rest)
  else if (cmd === "http") await cmdHttp(rest)
  else usage(1)
  process.exit(0)
} catch (err) {
  console.error(String(err && err.stack ? err.stack : err))
  process.exit(1)
}
