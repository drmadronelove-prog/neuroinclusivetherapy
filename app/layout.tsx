import type { Metadata } from 'next'
import { Fraunces, Geist, Geist_Mono, Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

const atari = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-atari",
  display: "swap",
})

const SITE_DESCRIPTION =
  'Compassionate, neuroinclusive therapy services from Olive Clinical. Specializing in neurodivergent-affirming care, ADHD, autism, and holistic mental wellness.'

export const metadata: Metadata = {
  metadataBase: new URL('https://oliveclinical.com'),
  title: 'Olive Clinical',
  description: SITE_DESCRIPTION,
  generator: 'v0.app',
  icons: {
    icon: '/olive-logo.svg',
    apple: '/olive-logo.svg',
  },
  openGraph: {
    title: 'Olive Clinical',
    description: SITE_DESCRIPTION,
    url: 'https://oliveclinical.com',
    siteName: 'Olive Clinical',
    type: 'website',
    images: [
      {
        url: '/blobs1.png',
        width: 842,
        height: 806,
        alt: 'Olive Clinical — neuroinclusive therapy and assessment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olive Clinical',
    description: SITE_DESCRIPTION,
    images: ['/blobs1.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} ${atari.variable}`}>
      <body className="font-body antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
