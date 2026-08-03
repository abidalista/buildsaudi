import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Space_Grotesk, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PostHogProvider } from './posthog-provider'
import Script from 'next/script'
import { companies } from '@/lib/data'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
})
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" })

const siteTitle = `Startup Jobs in Saudi Arabia — ${companies.length}+ Companies | BuildSaudi`
const siteDescription =
  `Browse ${companies.length}+ funded Saudi startups hiring in Riyadh and across the Kingdom. Filter by sector and stage — apply direct. وظائف شركات ناشئة في السعودية.`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'BuildSaudi',
  },
  openGraph: {
    title: siteTitle,
    description:
      `Browse ${companies.length}+ funded Saudi startups hiring in Riyadh and across the Kingdom. Filter by sector and stage — apply direct.`,
    url: 'https://buildsaudi.co',
    siteName: 'BuildSaudi',
    type: 'website',
    images: [{ url: 'https://buildsaudi.co/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: 'Funded Saudi startups hiring now. Apply direct.',
    images: ['https://buildsaudi.co/og-image.png'],
    creator: '@abidalista',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar">
      <head>
        <meta name="google-site-verification" content="f96-OwBtXCDY0hDPUNnhEfGWOfPUpOB5i0dNZvC_Pzw" />
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
      <body className={`${ibmPlexArabic.variable} ${ibmPlexArabic.className} ${spaceGrotesk.variable} ${spaceMono.variable} font-sans antialiased bg-[#F5F0E6] text-[#111827]`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  )
}
