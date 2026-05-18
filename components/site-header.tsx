"use client"

import Link from "next/link"
import { OliveLockup } from "@/components/olive-logo"

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Practice",   href: "/psychotherapy" },
  { label: "Assessment", href: "/tests" },
  { label: "Therapy",    href: "/psychotherapy" },
  { label: "Skills",     href: "/asd-skills" },
  { label: "Writing",    href: "/blog" },
]

export function SiteHeader() {
  return (
    <header className="no-print w-full" style={{ background: "var(--paper)" }}>
      {/* Eyebrow row */}
      <div className="w-full border-b border-[rgba(11,37,69,0.08)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-1.5">
          <p
            className="text-[0.66rem] sm:text-[0.7rem]"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              color: "rgba(11,37,69,0.5)",
            }}
          >
            Olive Clinical
            <span className="mx-2 opacity-50">·</span>
            San Francisco &amp; Berkeley
            <span className="mx-2 opacity-50">·</span>
            By referral
          </p>
        </div>
      </div>

      {/* Nav row */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center gap-4">
        {/* Left: lockup */}
        <div className="shrink-0">
          <Link href="/" aria-label="Olive Clinical home" className="inline-flex items-center">
            <OliveLockup size={0.5} />
          </Link>
        </div>

        {/* Center: nav links */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-7 lg:gap-9">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[0.95rem] text-foreground/85 hover:text-foreground transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: sign in + intake CTA */}
        <div className="flex flex-1 md:flex-none items-center justify-end gap-4 sm:gap-6">
          <Link
            href="/contact"
            className="hidden sm:inline text-[0.95rem] text-foreground/80 hover:text-foreground transition-colors"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 sm:px-5 text-[0.9rem] transition-opacity hover:opacity-90"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              background: "var(--ink)",
              color: "var(--paper)",
            }}
          >
            Request an intake
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
