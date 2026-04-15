import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans, Dancing_Script, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: 'Dr. Madrone Love, PsyD | Neuroinclusive Therapy',
  description: 'Compassionate, neuroinclusive therapy services by Dr. Madrone Love, PsyD. Specializing in neurodivergent-affirming care, ADHD, autism, and holistic mental wellness.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable} ${dancingScript.variable} ${caveat.variable}`}>
      <body className="font-body antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
