// Company slugs that used to exist and were indexed by Google, but were removed
// from lib/data.ts (dead/unverifiable listings). Redirect them instead of 404ing
// so Search Console stops flagging them and any residual traffic lands somewhere useful.
const DEAD_COMPANY_SLUGS = [
  "aajil", "aanaab", "adalahchain", "adaptive-techsoft", "aerial-solutions",
  "al-rushaid-technologies", "alfanar-digital", "allam", "amigo-ai", "aqarz",
  "aramco-ventures", "artefact", "atam-kiosks", "bayzat", "blink-co",
  "botme-ai", "bytestechnolab", "calo", "capify", "cognitev", "collecto",
  "coretechx", "cyberni", "dar-tech", "dawatech", "dlvr", "edana",
  "edunovai", "ejadah", "ejar", "elm", "engagesoft", "enjaz-ai", "eyego",
  "faheem", "fordeal", "gaussian-robotics", "genie-ai", "gmt-robotics",
  "grove", "healtec", "hiba-health-ai", "hyperpay", "iconnect-robotics",
  "infiniarc", "intella", "invygo", "jazer", "jiye-technologies", "judhur",
  "kashon", "kilow", "lawazem", "lisan", "lite", "logexa", "madfu",
  "madkhol", "morni", "munwra-dates", "mustadem", "nabta-health",
  "najeeb-ai", "nala-robotics", "nasl-tech", "nearmotion", "neom-tech",
  "newara", "nighat", "noon", "noor-ai", "nuasecurity", "nuwayra",
  "open-valley", "ozvid-technologies", "prypco", "quant", "quantum-robotics",
  "rawaa", "redbox", "rekaz", "reporty", "retailo", "rukiza", "rvin",
  "sadeem", "sahmalgo", "salesfine", "saudi-robotics-club", "sayfi", "scai",
  "sdaia", "sdaia-hexagon", "shift", "silq", "splyd", "spore", "squadio",
  "stitch-money", "tabby", "takamul", "tam", "tarmeez", "teammates-ai",
  "thya-technology", "trukker", "tulip-technologies", "ummar", "unitx",
  "visiontech-ai", "vminds", "widebot", "xbites", "zenhr",
  "zetta-technologies", "ziadah",
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Needed so PostHog can resolve minified stacks (upload via `npm run upload-sourcemaps`)
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ]
  },
  async redirects() {
    return DEAD_COMPANY_SLUGS.map((slug) => ({
      source: `/company/${slug}`,
      destination: "/",
      permanent: true,
    }))
  },
  skipTrailingSlashRedirect: true,
}

export default nextConfig
