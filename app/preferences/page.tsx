import type { Metadata } from "next"
import { MARKETING_COMPANY_COUNT_LABEL, MARKETING_COMPANY_COUNT_LABEL_AR } from "@/lib/marketing"
import { PreferencesForm } from "@/components/preferences-form"

const site = "https://buildsaudi.co"

export const metadata: Metadata = {
  title: `تفضيلات الوظائف | BuildSaudi`,
  description: `حدّد تخصصك ومدينتك وقطاعك. نشرة الاثنين تجيب الوظائف اللي تطابق اختيارك من ${MARKETING_COMPANY_COUNT_LABEL_AR} شركة سعودية.`,
  alternates: { canonical: `${site}/preferences` },
  openGraph: {
    title: "تفضيلات الوظائف | BuildSaudi",
    description: `Job alert preferences for ${MARKETING_COMPANY_COUNT_LABEL} Saudi startups.`,
    url: `${site}/preferences`,
  },
}

export default async function PreferencesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const email = typeof params.email === "string" ? params.email : ""

  return <PreferencesForm initialEmail={email} />
}
