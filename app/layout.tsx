import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans, Dancing_Script, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Image from 'next/image'
import Link from 'next/link'
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
    icon: '/logo.png',
    apple: '/logo.png',
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
        {/* Site-wide corner logo */}
        <Link
          href="/"
          className="no-print fixed top-3 left-3 z-[60]"
          aria-label="Home"
          style={{ display: "block", lineHeight: 0 }}
        >
          <Image
            src="/logo.png"
            alt="Neuroinclusive Therapy logo"
            width={52}
            height={52}
            style={{ borderRadius: "50%", display: "block" }}
            priority
          />
        </Link>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
