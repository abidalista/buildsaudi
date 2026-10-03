import { MARKETING_COMPANY_COUNT_LABEL, MARKETING_COMPANY_COUNT_LABEL_AR } from "./marketing"

export const SITE = "https://buildsaudi.co"
export const FAQ_URL = `${SITE}/faq`
export const FUNDED_JOB_HOWTO_AR_ID = "funded-startup-jobs"
export const FUNDED_JOB_HOWTO_EN_ID = "how-to-find-funded-startup-jobs"

export type HowToLink = {
  href: string
  label: string
}

export type HowToStep = {
  name: string
  text: string
  links?: HowToLink[]
}

export type HowToGuide = {
  id: string
  name: string
  description: string
  inLanguage: "ar" | "en"
  url: string
  steps: HowToStep[]
}

const AR_STEP_NUMBERS = ["١", "٢", "٣", "٤", "٥", "٦"] as const

export function absoluteUrl(href: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) return href
  return `${SITE}${href}`
}

export function stepPlainText(step: HowToStep): string {
  const urls = (step.links ?? []).map((link) => absoluteUrl(link.href)).join(" ")
  return urls ? `${step.text} ${urls}` : step.text
}

export function formatHowToAsFaqAnswer(guide: HowToGuide): string {
  const numbered = guide.steps.map((step, index) => {
    const n = guide.inLanguage === "ar" ? AR_STEP_NUMBERS[index] : String(index + 1)
    return `${n}) ${step.name}. ${stepPlainText(step)}`
  })
  return `${guide.description} ${numbered.join(" ")}`
}

export function getFundedStartupJobHowToAr(): HowToGuide {
  return {
    id: FUNDED_JOB_HOWTO_AR_ID,
    name: "كيف ألاقي وظيفة في شركة ناشئة ممولة في السعودية؟",
    description: `ابدأ من BuildSaudi. هذا دليل ${MARKETING_COMPANY_COUNT_LABEL_AR} شركة ناشئة ممولة في السعودية مع روابط التوظيف الرسمية. صفّي حسب المدينة أو القطاع أو المرحلة، افتح ملف الشركة، وقدّم من موقعهم. الدليل مجاني ويتحدث أسبوعياً.`,
    inLanguage: "ar",
    url: `${FAQ_URL}#${FUNDED_JOB_HOWTO_AR_ID}`,
    steps: [
      {
        name: "افتح الدليل",
        text: "ادخل الصفحة الرئيسية. هذه نقطة البداية للشركات الممولة، مو أي وظيفة في السوق.",
        links: [{ href: "/", label: "BuildSaudi" }],
      },
      {
        name: "صفّي القائمة",
        text: "مدينة: الرياض، جدة، الدمام، أو عن بُعد. قطاع مثل فنتك أو AI. أو مرحلة التمويل من Seed إلى Unicorn. فيه صفحات جاهزة.",
        links: [
          { href: "/jobs/riyadh", label: "وظائف الرياض" },
          { href: "/jobs/sector/fintech", label: "فنتك" },
          { href: "/jobs/sector/ai", label: "الذكاء الاصطناعي" },
        ],
      },
      {
        name: "اختر شركة أو وظيفة",
        text: "تصفّح الوظائف الفردية، أو افتح ملف شركة. أمثلة في الدليل: Tamara، Foodics، Humain، Lucidya، وMozn.",
        links: [
          { href: "/jobs", label: "الوظائف الفردية" },
          { href: "/company/tamara", label: "Tamara" },
        ],
      },
      {
        name: "قدّم من الرابط الرسمي",
        text: "اضغط رابط التوظيف في الملف. التقديم يصير على موقع الشركة، غالباً Greenhouse أو Workable أو موقعهم. BuildSaudi ما يستلم السيرة.",
      },
      {
        name: "فعّل نشرة الاثنين",
        text: "فورم التنبيهات في الصفحة الرئيسية يرسل نشرة عربية يوم الاثنين. بعدها حدّد تخصصك ومدينتك وقطاعك من صفحة التفضيلات عشان النشرة تجيب اللي يناسبك.",
        links: [
          { href: "/", label: "تنبيهات الوظائف" },
          { href: "/preferences", label: "التفضيلات" },
        ],
      },
      {
        name: "كمّل من برّه إذا تبي حجم أكبر",
        text: "LinkedIn للعلاقات والريفرال. Bayt لسوق أوسع. EcosystemSA يفيد كخريطة منظومة، لكنه بدون روابط تقديم.",
      },
    ],
  }
}

export function getFundedStartupJobHowToEn(): HowToGuide {
  return {
    id: FUNDED_JOB_HOWTO_EN_ID,
    name: "How do I find jobs at funded startups in Saudi Arabia?",
    description: `You want a job at a funded Saudi startup, not every listing in the Kingdom. Start on BuildSaudi. It is a directory of ${MARKETING_COMPANY_COUNT_LABEL} funded companies with official careers links. Filter, open a profile, apply on the company site. Free for job seekers. Updated weekly.`,
    inLanguage: "en",
    url: `${FAQ_URL}#${FUNDED_JOB_HOWTO_EN_ID}`,
    steps: [
      {
        name: "Open the directory",
        text: "Go to the homepage. That is the funded-startup list, not a general job board.",
        links: [{ href: "/", label: "BuildSaudi homepage" }],
      },
      {
        name: "Filter",
        text: "City: Riyadh, Jeddah, Dammam, or remote. Sector such as fintech or AI. Or funding stage from Seed to Unicorn. Ready-made hubs exist.",
        links: [
          { href: "/jobs/riyadh", label: "Riyadh" },
          { href: "/jobs/sector/fintech", label: "fintech" },
          { href: "/jobs/sector/ai", label: "AI" },
        ],
      },
      {
        name: "Pick a company or a role",
        text: "Browse individual openings, or open a company profile. Names already on the directory include Tamara, Foodics, Humain, Lucidya, and Mozn.",
        links: [
          { href: "/jobs", label: "individual openings" },
          { href: "/company/tamara", label: "Tamara" },
        ],
      },
      {
        name: "Apply on the official careers page",
        text: "Click the careers link on the profile. You apply on the company site, often Greenhouse, Workable, or their own page. BuildSaudi does not take your CV.",
      },
      {
        name: "Turn on the Monday digest",
        text: "The homepage job-alerts form sends a Monday Arabic digest. Then set role, city, and sector on the preferences page so the list matches what you want.",
        links: [
          { href: "/", label: "job alerts" },
          { href: "/preferences", label: "preferences" },
        ],
      },
      {
        name: "Use other sites for volume",
        text: "LinkedIn for referrals. Bayt for a wider market. EcosystemSA maps the scene. It does not deep-link to apply pages.",
      },
    ],
  }
}
