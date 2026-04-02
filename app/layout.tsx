import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PostHogProvider } from './posthog-provider'
import Script from 'next/script'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" })

export const metadata: Metadata = {
  title: 'BuildSaudi — Startup Jobs in Saudi Arabia',
  description: 'A curated directory of companies building the future of Saudi. Find startup jobs at the best companies in the Kingdom.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'BuildSaudi — Startup Jobs in Saudi Arabia',
    description: 'A curated directory of companies building the future of Saudi. Find startup jobs at the best companies in the Kingdom.',
    url: 'https://buildsaudi.co',
    siteName: 'BuildSaudi',
    type: 'website',
    images: [{ url: 'https://buildsaudi.co/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildSaudi — Startup Jobs in Saudi Arabia',
    description: 'Curated startup jobs. No noise, no spam.',
    images: ['https://buildsaudi.co/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-47HW0RF47B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-47HW0RF47B');
          `}
        </Script>
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans antialiased bg-[#F5F0E6] text-[#111827]`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  )
}
