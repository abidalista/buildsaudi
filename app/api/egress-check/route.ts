// Temporary probe: does Substack accept requests from Vercel's egress IPs?
// Sends NO cookie — we only care about the status code.
//   401 -> IP is fine (Substack just says "not logged in"). Vercel cron will work.
//   403 -> IP is blocked by Cloudflare, same as GitHub Actions. Vercel won't work either.
// Delete this route once we've made the call.

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await fetch("https://substack.com/api/v1/user/profile/self", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return Response.json({
    status: res.status,
    verdict:
      res.status === 403
        ? "BLOCKED — Vercel egress is challenged too, same as GitHub Actions"
        : "OK — Vercel egress is not blocked, cron will work here",
    body: (await res.text()).slice(0, 200),
  });
}
