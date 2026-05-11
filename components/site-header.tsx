"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { OliveLockup } from "@/components/olive-logo"

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header
      className="no-print fixed top-0 left-0 right-0 z-[60] flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-b"
      style={{
        background: "#fbfaf7",
        borderColor: "rgba(11,37,69,0.08)",
        boxShadow: "0 2px 12px rgba(11,37,69,0.07)",
      }}
    >
      {isHome ? (
        <span aria-hidden="true" />
      ) : (
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            letterSpacing: "0.04em",
            color: "rgba(11,37,69,0.78)",
          }}
          className="hover:opacity-100 transition-opacity shrink-0"
        >
          ← Home
        </Link>
      )}

      <div className="sm:hidden">
        <OliveLockup size={0.42} />
      </div>
      <div className="hidden sm:inline-flex" style={{ alignItems: "center" }}>
        <OliveLockup size={0.6} />
      </div>
    </header>
  )
}
