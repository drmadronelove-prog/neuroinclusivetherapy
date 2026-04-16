"use client"

import { useState } from "react"
import Link from "next/link"

// Six distinct earthy-but-saturated colours — one per spine
const navItems = [
  { id: "01", label: "TESTS",           href: "/tests",              spineColor: "#A7B79F" },
  { id: "02", label: "NEURODIVERGENCE", href: "/neurodiversity",     spineColor: "#C17C74" },
  { id: "03", label: "BRAIN GAMES",     href: "/brain-games",        spineColor: "#7D805F" },
  { id: "04", label: "BLOG",            href: "/blog",               spineColor: "#B0A898" },
  { id: "05", label: "INDIVIDUAL THERAPY", href: "/individual-therapy", spineColor: "#8A9E96" },
  { id: "07", label: "CONTACT",         href: "/contact",            spineColor: "#A08070" },
]

// Step size in px — each spine starts this much lower than the previous
const STEP = 61

function spineBackground(color: string): string {
  return `linear-gradient(180deg, ${color} 0%, ${color} 100%)`
}

export function DiagonalNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className="no-print fixed right-0 top-0 h-screen z-50 hidden md:flex items-end">
      {navItems.map((item, index) => {
        const isHovered = hoveredIndex === index
        const topOffset = index * STEP

        return (
          <Link
            key={item.id}
            href={item.href}
            className="relative flex flex-col items-center transition-all duration-300 ease-out"
            style={{
              width: isHovered ? "52px" : "42px",
              height: `calc(100vh - ${topOffset}px)`,
              backgroundImage: spineBackground(item.spineColor),
              // Rounded top corners only — flat staircase profile
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              boxShadow: isHovered
                ? `-3px 0 12px rgba(0,0,0,0.18)`
                : `-1px 0 4px rgba(0,0,0,0.10)`,
              transform: isHovered ? "translateY(-6px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Centred label */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span
                className="whitespace-nowrap transition-opacity duration-300"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.05em",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  opacity: isHovered ? 1 : 0.80,
                  color: "rgba(255,255,255,0.94)",
                  textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                }}
              >
                {item.label}
              </span>
            </div>

          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="no-print md:hidden absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-end p-4 bg-background/95 backdrop-blur-sm">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Toggle menu">
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-foreground transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-foreground transition-opacity ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-foreground transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="bg-background border-t border-border">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href}
              className="flex items-center gap-4 p-4 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: item.spineColor }} />
              <span style={{ fontFamily: "var(--font-accent)", fontWeight: 600, letterSpacing: "0.04em", fontSize: "0.95rem" }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
