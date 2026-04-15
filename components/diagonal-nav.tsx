"use client"

import { useState } from "react"
import Link from "next/link"

// Six distinct colors from the personal-site palette — no repeats
const navItems = [
  { id: "01", label: "TESTS",           href: "/tests",              spineColor: "#7A9A78", darkColor: "#5E7A5C" },
  { id: "02", label: "NEURODIVERGENCE", href: "/neurodiversity",     spineColor: "#A09478", darkColor: "#7A705A" },
  { id: "03", label: "BRAIN GAMES",     href: "/brain-games",        spineColor: "#B8949C", darkColor: "#8C6E76" },
  { id: "04", label: "BLOG",            href: "/blog",               spineColor: "#5E8060", darkColor: "#445E46" },
  { id: "05", label: "THERAPY",         href: "/individual-therapy", spineColor: "#9AADA0", darkColor: "#728078" },
  { id: "07", label: "CONTACT",         href: "/contact",            spineColor: "#8C7E72", darkColor: "#665C52" },
]

function spineBackground(color: string): string {
  return [
    // Fine linen cross-hatch — very subtle
    "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.018) 4px, rgba(0,0,0,0.018) 5px)",
    "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.012) 4px, rgba(255,255,255,0.012) 5px)",
    // Convex centre highlight (left dark → centre bright → right dark)
    "linear-gradient(90deg, rgba(0,0,0,0.14) 0%, rgba(255,255,255,0.09) 35%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.09) 65%, rgba(0,0,0,0.14) 100%)",
    `linear-gradient(180deg, ${color} 0%, ${color} 100%)`,
  ].join(", ")
}

export function DiagonalNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex,  setActiveIndex]  = useState(0)

  return (
    <nav className="no-print fixed right-0 top-0 h-screen z-50 hidden md:flex">
      <div className="flex h-full items-stretch">
        {navItems.map((item, index) => {
          const isHovered = hoveredIndex === index
          const isActive  = activeIndex  === index

          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center transition-all duration-300 ease-out"
              style={{
                width: isHovered ? "52px" : "42px",
                height: "100%",
                backgroundImage: spineBackground(item.spineColor),
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
                boxShadow: isHovered
                  ? "-3px 0 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.22)"
                  : "-1px 0 4px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.16)",
                transform: isHovered ? "translateY(-5px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(index)}
            >
              {/* Top headband cap */}
              <div style={{
                width: "100%",
                height: "9px",
                flexShrink: 0,
                background: "linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.05) 100%)",
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
              }} />

              {/* Centered spine label */}
              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span
                  className="font-medium whitespace-nowrap transition-opacity duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    opacity: isHovered || isActive ? 1 : 0.78,
                    color: "rgba(255,255,255,0.92)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  }}
                >
                  {item.label}
                </span>
              </div>

              {/* Bottom cap */}
              <div style={{
                width: "100%",
                height: "9px",
                flexShrink: 0,
                background: "linear-gradient(0deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 100%)",
              }} />

              {/* Active indicator */}
              {isActive && (
                <div style={{
                  position: "absolute",
                  left: 0,
                  top: "12%",
                  height: "76%",
                  width: "3px",
                  background: "rgba(255,255,255,0.65)",
                  borderRadius: "0 2px 2px 0",
                }} />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// Mobile navigation
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="no-print md:hidden absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-end p-4 bg-background/95 backdrop-blur-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
          aria-label="Toggle menu"
        >
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
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-4 p-4 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: item.spineColor }} />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.08em", fontSize: "0.85rem" }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
