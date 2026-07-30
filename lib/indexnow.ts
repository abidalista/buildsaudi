/**
 * IndexNow — notify Bing (and other engines) when URLs change.
 * Key file: https://buildsaudi.co/{INDEXNOW_KEY}.txt
 */
export const INDEXNOW_KEY = "81aa2bc97046eba78b2d3be9fc9be4cc"
export const INDEXNOW_HOST = "buildsaudi.co"
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; status: number; body: string }> {
  if (urls.length === 0) {
    return { ok: false, status: 0, body: "no urls" }
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })

  const body = await res.text()
  // 200 = OK, 202 = Accepted
  return { ok: res.status === 200 || res.status === 202, status: res.status, body }
}
