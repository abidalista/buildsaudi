import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" })

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
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans antialiased bg-[#fafafa] text-[#1a1a1a]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
