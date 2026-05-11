"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { OliveLockup, OliveMark } from "@/components/olive-logo"

const PAGE_TITLES: Record<string, string> = {
  "/neurodiversity":   "Neurodivergent Maps",
  "/blog":             "Blog",
  "/brain-games":      "Brain Games",
  "/contact":          "Contact",
  "/mindfulness":      "Mindfulness",
  "/adhd-skills":      "ADHD Skills",
  "/adhd-support":     "ADHD Support",
  "/asd-skills":       "ASD Skills",
  "/autism-affirming": "Autism-Affirming",
  "/ocd-skills":       "OCD Skills",
  "/tests":            "Tests",
}

function titleForPath(pathname: string): string | null {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith("/blog/")) return PAGE_TITLES["/blog"]
  return null
}

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const title = titleForPath(pathname)

  return (
    <header
      className="no-print fixed top-0 left-0 right-0 z-[60] flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 lg:py-5"
      style={{
        background:
          "linear-gradient(180deg, #f2f1ed 0%, #e8e7e3 50%, #d8d7d2 100%)",
        boxShadow:
          "0 4px 17px rgba(11,37,69,0.149), inset 0 2px 0 rgba(255,255,255,0.79), inset 0 1px 0 rgba(255,255,255,0.51), inset 0 -2px 0 rgba(11,37,69,0.167), inset 0 -3px 4px rgba(11,37,69,0.056)",
      }}
    >
      <div className="shrink-0 w-12 sm:w-20">
        {!isHome && (
          <Link
            href="/"
            className="hover:opacity-100 transition-opacity text-[0.72rem] sm:text-[0.85rem]"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              color: "rgba(11,37,69,0.78)",
            }}
          >
            ← Home
          </Link>
        )}
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-center">
        {title && (
          <h1
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight text-gold truncate max-w-full"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
        )}
      </div>

      {/* Phone: just the olive mark to leave room for the title */}
      <div className="shrink-0 sm:hidden">
        <OliveMark size={32} />
      </div>
      {/* Tablet+: full lockup with the wordmark */}
      <div className="shrink-0 hidden sm:inline-flex" style={{ alignItems: "center" }}>
        <OliveLockup size={0.55} />
      </div>
    </header>
  )
}
