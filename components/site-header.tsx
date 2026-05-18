"use client"

import Link from "next/link"
import { OliveLockup } from "@/components/olive-logo"

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Practice",               href: "/psychotherapy" },
  { label: "Clinicians",             href: "/psychotherapy" },
  { label: "Writing",                href: "/blog" },
  { label: "For referring clinicians", href: "/contact" },
]

export function SiteHeader() {
  return (
    <header
      className="no-print w-full border-b border-[rgba(11,37,69,0.10)]"
      style={{ background: "var(--paper)" }}
    >
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
              className="text-[0.95rem] text-foreground/85 hover:text-foreground transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: appointment CTA */}
        <div className="flex flex-1 md:flex-none items-center justify-end">
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
            Make an appointment
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
