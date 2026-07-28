import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Post a Job — BuildSaudi",
  description:
    "List open roles at your Saudi startup on BuildSaudi. Reach job seekers looking for funded companies in the Kingdom.",
  alternates: { canonical: "https://buildsaudi.co/submit" },
}

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children
}
