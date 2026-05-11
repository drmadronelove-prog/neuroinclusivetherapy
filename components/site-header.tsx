"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { OliveLockup } from "@/components/olive-logo"

interface PageMeta {
  title: string
  color: string
}

const PAGE_META: Record<string, PageMeta> = {
  "/neurodiversity":   { title: "Neurodivergent Maps", color: "text-ink"   },
  "/blog":             { title: "Blog",                 color: "text-ink"   },
  "/brain-games":      { title: "Brain Games",          color: "text-gold"  },
  "/contact":          { title: "Contact",              color: "text-ink"   },
  "/mindfulness":      { title: "Mindfulness",          color: "text-ink"   },
  "/adhd-skills":      { title: "ADHD Skills",          color: "text-plum"  },
  "/adhd-support":     { title: "ADHD Support",         color: "text-rose"  },
  "/asd-skills":       { title: "ASD Skills",           color: "text-glass" },
  "/autism-affirming": { title: "Autism-Affirming",     color: "text-plum"  },
  "/ocd-skills":       { title: "OCD Skills",           color: "text-slate" },
  "/tests":            { title: "Tests",                color: "text-slate" },
}

function metaForPath(pathname: string): PageMeta | null {
  if (PAGE_META[pathname]) return PAGE_META[pathname]
  if (pathname.startsWith("/blog/")) return PAGE_META["/blog"]
  return null
}

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const meta = metaForPath(pathname)

  return (
    <header
      className="no-print fixed top-0 left-0 right-0 z-[60] flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 lg:py-5"
      style={{
        background:
          "linear-gradient(180deg, #efeeea 0%, #e8e7e3 45%, #e0dfda 100%)",
        boxShadow:
          "0 2px 12px rgba(11,37,69,0.08), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(11,37,69,0.06)",
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
        {meta && (
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight ${meta.color}`}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {meta.title}
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
