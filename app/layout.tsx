import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: 'BuildSaudi — Startup Jobs in Saudi Arabia',
  description: 'A curated directory of companies building the future of Saudi. Find startup jobs at the best companies in the Kingdom.',
  openGraph: {
    title: 'BuildSaudi — Startup Jobs in Saudi Arabia',
    description: 'A curated directory of companies building the future of Saudi. Find startup jobs at the best companies in the Kingdom.',
    url: 'https://buildsaudi.co',
    siteName: 'BuildSaudi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildSaudi — Startup Jobs in Saudi Arabia',
    description: 'Curated startup jobs. No noise, no spam.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-[#fafafa] text-[#1a1a1a]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
