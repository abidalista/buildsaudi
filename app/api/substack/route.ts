// Substack proxy.
//
// Substack (Cloudflare) blocks GitHub Actions IP ranges with a 403, but accepts
// requests from Vercel. So the digest runs on GitHub Actions and sends only its
// Substack calls through here.
//
// The session cookie lives in Vercel env vars and never leaves this function.
//
// Env required:
//   SUBSTACK_SID    the substack.sid cookie value
//   PROXY_SECRET    shared secret; callers must send it as x-proxy-secret

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const ALLOWED_HOSTS = new Set(["substack.com", "averageabidall.substack.com"]);

export async function POST(req: Request) {
  const secret = process.env.PROXY_SECRET;
  if (!secret || req.headers.get("x-proxy-secret") !== secret) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const sid = process.env.SUBSTACK_SID;
  if (!sid) {
    return Response.json({ error: "SUBSTACK_SID not configured" }, { status: 500 });
  }

  const { host, path, method = "GET", body } = await req.json();

  if (!ALLOWED_HOSTS.has(host)) {
    return Response.json({ error: `host not allowed: ${host}` }, { status: 400 });
  }
  if (typeof path !== "string" || !path.startsWith("/api/")) {
    return Response.json({ error: `path not allowed: ${path}` }, { status: 400 });
  }

  const res = await fetch(`https://${host}${path}`, {
    method,
    headers: {
      Cookie: `substack.sid=${sid}`,
      "Content-Type": "application/json",
      "User-Agent": BROWSER_UA,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  return Response.json({ status: res.status, body: await res.text() });
}
