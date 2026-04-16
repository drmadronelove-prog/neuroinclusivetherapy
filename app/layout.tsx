import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans, Dancing_Script, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Madrone Love, PsyD | Neuroinclusive Therapy',
  description: 'Compassionate, neuroinclusive therapy services by Madrone Love, PsyD. Specializing in neurodivergent-affirming care, ADHD, autism, and holistic mental wellness.',
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
          style={{ display: "flex", alignItems: "center", gap: "10px", lineHeight: 1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Neuroinclusive Therapy logo"
            width={52}
            height={52}
            style={{ display: "block", flexShrink: 0 }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{
              fontFamily: "var(--font-accent)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#C0B4A0",
              lineHeight: 1.15,
              letterSpacing: "0.05em",
            }}>
              Madrone Love, PsyD
            </span>
            <span style={{
              fontFamily: "var(--font-accent)",
              fontSize: "0.85rem",
              fontWeight: 400,
              color: "#C0B4A0",
              lineHeight: 1.15,
              letterSpacing: "0.12em",
            }}>
              Clinical Psychologist
            </span>
          </div>
        </Link>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
