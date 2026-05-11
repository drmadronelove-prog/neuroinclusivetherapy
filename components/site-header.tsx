"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { OliveLockup } from "@/components/olive-logo"

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
      <div className="shrink-0 w-[3.25rem] sm:w-20">
        {!isHome && (
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
              color: "rgba(11,37,69,0.78)",
            }}
            className="hover:opacity-100 transition-opacity"
          >
            ← Home
          </Link>
        )}
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-center">
        {title && (
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight text-gold"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h1>
        )}
      </div>

      <div className="shrink-0 sm:hidden">
        <OliveLockup size={0.36} />
      </div>
      <div className="shrink-0 hidden sm:inline-flex" style={{ alignItems: "center" }}>
        <OliveLockup size={0.55} />
      </div>
    </header>
  )
}
