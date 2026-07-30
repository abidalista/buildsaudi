import type { FaqItem } from "@/lib/aeo-content"

const site = "https://buildsaudi.co"

const cityArName: Record<string, string> = {
  riyadh: "الرياض",
  jeddah: "جدة",
  dammam: "الدمام",
  remote: "عن بُعد",
}

function exampleClause(examples: string[]): string {
  if (examples.length === 0) return ""
  return ` من أمثلتها ${examples.slice(0, 4).join("، ")}.`
}

export function getCityFaq(
  cityName: string,
  slug: string,
  companyCount: number,
  examples: string[] = [],
): FaqItem[] {
  const cityUrl = `${site}/jobs/${slug}`
  const arCity = cityArName[slug] || cityName
  const enExamples =
    examples.length > 0 ? ` Examples include ${examples.slice(0, 4).join(", ")}.` : ""
  const arExamples = exampleClause(examples)

  const faqs: FaqItem[] = [
    {
      question: `وين ألاقي وظائف شركات ناشئة في ${arCity}؟`,
      answer: `أفضل طريقة تلاقي وظائف شركات ناشئة في ${arCity} هي دليل محدث للشركات الممولة مع رابط التقديم المباشر. على BuildSaudi فيه حالياً حوالي ${companyCount} شركة في ${arCity}.${arExamples} تقدر تتصفح حسب القطاع والمرحلة وتدخل على صفحة التوظيف الرسمية لكل شركة من هنا: ${cityUrl}. القائمة تتحدث أسبوعياً.`,
    },
    {
      question: `How many startups are hiring in ${cityName}?`,
      answer: `BuildSaudi lists ${companyCount} funded startups in ${cityName}.${enExamples} Each company profile links to official careers pages for engineering, product, design, and operations roles. Browse ${cityUrl}.`,
    },
    {
      question: `كيف أقدم على وظيفة في شركة ناشئة في ${arCity}؟`,
      answer: `اختر الشركة من صفحة وظائف ${arCity} على BuildSaudi، افتح ملف الشركة، ثم اضغط رابط التوظيف الرسمي وقدّم هناك مباشرة. BuildSaudi ما يستلم طلبات التوظيف — يوصلك لصاحب العمل فقط.`,
    },
    {
      question: `How do I apply to startup jobs in ${cityName}?`,
      answer: `Pick a company on the ${cityName} jobs page (${cityUrl}), open its BuildSaudi profile, and click through to the official careers page. BuildSaudi does not host applications — we link you to the employer directly.`,
    },
  ]

  if (slug === "jeddah") {
    faqs.unshift({
      question: "وين ألاقي وظائف ذكاء اصطناعي في جدة؟",
      answer:
        "وظائف الذكاء الاصطناعي في جدة أقل من الرياض، لكن تقدر تبدأ بشركات تقنية مقرها جدة أو لها حضور هناك (مثل Hazen.ai في الرؤية الحاسوبية)، وتكمّل البحث عبر صفحة الذكاء الاصطناعي وشركات الرياض اللي توظف عن بُعد أو لها مكاتب متعددة. على BuildSaudi افتح /jobs/jeddah و /jobs/sector/ai مع روابط التقديم المباشرة.",
    })
  }

  if (slug === "dammam") {
    faqs.unshift({
      question: "أفضل شركات ناشئة في الظهران والشغل في المنطقة الشرقية؟",
      answer:
        "الظهران والمنطقة الشرقية فيها شركات تقنية مرتبطة بالطاقة والتحول الرقمي — مثل Aramco Digital في الظهران وFalconViz في الدمام. على BuildSaudi تقدر تشوف شركات الشرقية من /jobs/dammam مع مرحلة التمويل ورابط التوظيف. إذا القائمة ضيقة، وسّع البحث لشركات الرياض في نفس تخصصك مع إمكانية العمل من المنطقة الشرقية.",
    })
  }

  return faqs
}

export function getSectorFaq(sectorName: string, slug: string, companyCount: number, examples: string[]): FaqItem[] {
  const exampleText = examples.length > 0 ? examples.slice(0, 4).join(", ") : "leading Saudi startups"
  const arExamples = examples.length > 0 ? examples.slice(0, 4).join("، ") : "شركات سعودية رائدة"
  return [
    {
      question: `أي شركات ${sectorName} سعودية توظف الحين؟`,
      answer: `BuildSaudi يتتبع حوالي ${companyCount} شركة في مجال ${sectorName} داخل السعودية، منها ${arExamples}. كل ملف فيه مرحلة التمويل ومدينة المقر ورابط التوظيف الرسمي. تصفّح: ${site}/jobs/sector/${slug}`,
    },
    {
      question: `Which ${sectorName.toLowerCase()} startups are hiring in Saudi Arabia?`,
      answer: `BuildSaudi tracks ${companyCount} ${sectorName.toLowerCase()} startups in Saudi Arabia, including ${exampleText}. Each profile includes funding stage, HQ city, and a direct careers link.`,
    },
    {
      question: `How do I find ${sectorName.toLowerCase()} jobs in Riyadh?`,
      answer: `Use this sector page to shortlist ${sectorName.toLowerCase()} companies, then filter by Riyadh on the homepage or visit the Riyadh city page for location-specific hiring.`,
    },
    {
      question: `Is BuildSaudi free for ${sectorName.toLowerCase()} job seekers?`,
      answer: `Yes. Browse every ${sectorName.toLowerCase()} startup and careers link for free at ${site}/jobs/sector/${slug}. Founders can submit missing companies on the submit page.`,
    },
  ]
}

export function getStageFaq(stageName: string, slug: string, companyCount: number, description: string): FaqItem[] {
  return [
    {
      question: `How many ${stageName.toLowerCase()} startups are on BuildSaudi?`,
      answer: `We list ${companyCount} ${stageName.toLowerCase()} Saudi startups. ${description} Each profile links to live careers pages updated weekly.`,
    },
    {
      question: `What roles do ${stageName.toLowerCase()} Saudi startups typically hire for?`,
      answer: `${stageName} startups in Saudi Arabia commonly hire software engineers, product managers, designers, sales, and operations talent. Early-stage teams often hire generalists; growth-stage teams add specialists.`,
    },
    {
      question: `How is ${stageName.toLowerCase()} different from other startup stages?`,
      answer: `${description} Use BuildSaudi stage pages to compare hiring across maturity levels — from seed teams to unicorns — and apply on official careers sites.`,
    },
  ]
}

export function getCompanyFaq(
  companyName: string,
  sector: string,
  city: string,
  stage: string,
  careersUrl: string,
): FaqItem[] {
  return [
    {
      question: `كيف أقدم على وظائف ${companyName}؟`,
      answer: `قدّم عبر صفحة التوظيف الرسمية لـ ${companyName}. BuildSaudi يوفّر الرابط المباشر لصاحب العمل ولا يستلم الطلبات. رابط التوظيف: ${careersUrl}`,
    },
    {
      question: `How do I apply to jobs at ${companyName}?`,
      answer: `Visit ${companyName}'s official careers page to browse open roles and apply directly. BuildSaudi links to the employer's hiring site — we do not process applications. Careers: ${careersUrl}`,
    },
    {
      question: `What does ${companyName} do?`,
      answer: `${companyName} is a ${stage.toLowerCase()} ${sector} startup headquartered in ${city}, Saudi Arabia. See the company profile above for funding, founders, and team size when available.`,
    },
    {
      question: `Is ${companyName} a Saudi startup?`,
      answer: `Yes. ${companyName} is listed on BuildSaudi as a funded Saudi startup hiring in ${city}. We verify listings manually and refresh careers links weekly.`,
    },
  ]
}

export const sectorBlurbs: Record<string, string> = {
  fintech:
    "Saudi fintech has scaled rapidly with BNPL, digital banking, and payments infrastructure. Riyadh hosts most licensed fintech startups, supported by SAMA sandboxes and Vision 2030 financial-sector reforms.",
  ai: "Saudi AI startups span cybersecurity, Arabic NLP, voice, computer vision, and enterprise automation. Government AI initiatives and giga-project demand are driving hiring across engineering and research roles.",
  proptech:
    "Proptech in Saudi Arabia covers rental marketplaces, property management, and construction tech. Riyadh and Jeddah lead hiring as urban development accelerates under Vision 2030.",
  "b2b-saas":
    "B2B SaaS is one of the strongest categories in the Kingdom — vertical software for restaurants, retail, supply chain, and HR. Many Series A and B companies hire engineers and customer success in Riyadh.",
  logistics:
    "Logistics startups connect last-mile delivery, freight, and warehouse tech to Saudi commerce growth. Hiring spans operations, engineering, and fleet management roles.",
  healthtech:
    "Healthtech startups in Saudi Arabia focus on diagnostics, care delivery, and digital health platforms. The sector is early but growing with regulatory support for telehealth and at-home care.",
  edtech:
    "Edtech companies build LMS, school management, and upskilling platforms for Saudi Arabia's large student population. Engineering and curriculum roles are common in Riyadh-based teams.",
  ecommerce:
    "E-commerce and retail-tech startups power merchant tools, quick commerce, and marketplace infrastructure. Salla, Nana, and adjacent enablers drive much of the hiring in this sector.",
  cybersecurity:
    "Cybersecurity startups protect enterprises and government digital infrastructure. Saudi demand for SOC, threat intelligence, and compliance tooling supports steady hiring for security engineers and analysts.",
}
