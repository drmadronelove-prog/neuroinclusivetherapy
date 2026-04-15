"use client"

import { useState } from "react"
import Link from "next/link"

// Six distinct earthy spine colors — none repeated
const navItems = [
  { id: "01", label: "TESTS",           href: "/tests",              spineColor: "#7A5230", darkColor: "#5C3A1E" },
  { id: "02", label: "NEURODIVERGENCE", href: "/neurodiversity",     spineColor: "#4E7252", darkColor: "#36523A" },
  { id: "03", label: "BRAIN GAMES",     href: "/brain-games",        spineColor: "#B86040", darkColor: "#8C4428" },
  { id: "04", label: "BLOG",            href: "/blog",               spineColor: "#7A8C5E", darkColor: "#5A6844" },
  { id: "05", label: "THERAPY",         href: "/individual-therapy", spineColor: "#967250", darkColor: "#704E32" },
  { id: "07", label: "CONTACT",         href: "/contact",            spineColor: "#5E6880", darkColor: "#424A5C" },
]

function spineBackground(color: string): string {
  return [
    // Linen/cloth cross-hatch texture
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)",
    "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
    // Convex highlight — center brighter, edges darker
    "linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.10) 70%, rgba(0,0,0,0.18) 100%)",
    // Base spine color
    `linear-gradient(180deg, ${color} 0%, ${color} 100%)`,
  ].join(", ")
}

export function DiagonalNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex,  setActiveIndex]  = useState(0)

  return (
    <nav className="no-print fixed right-0 top-0 h-screen z-50 hidden md:flex">
      <div className="flex h-full items-end">
        {navItems.map((item, index) => {
          const isHovered = hoveredIndex === index
          const isActive  = activeIndex  === index

          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center justify-between transition-all duration-300 ease-out"
              style={{
                width: isHovered ? "52px" : "42px",
                // Book spines hang from top — slight gap at bottom like resting on a shelf
                height: "calc(100% - 0px)",
                backgroundImage: spineBackground(item.spineColor),
                // Rounded top = book spine crown
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                // Shadow between spines
                boxShadow: isHovered
                  ? `-3px 0 10px rgba(0,0,0,0.35), 3px 0 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)`
                  : `-1px 0 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)`,
                // Slight upward shift on hover — like pulling a book
                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(index)}
            >
              {/* Top headband cap */}
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: `linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)`,
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                  flexShrink: 0,
                }}
              />

              {/* Spine label */}
              <span
                className="font-bold text-sm tracking-widest whitespace-nowrap transition-opacity duration-300"
                style={{
                  fontFamily: "var(--font-display)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  opacity: isHovered || isActive ? 1 : 0.82,
                  color: "rgba(255,255,255,0.92)",
                  textShadow: `0 1px 3px rgba(0,0,0,0.55), 0 0 8px rgba(0,0,0,0.2)`,
                  letterSpacing: "0.12em",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ({item.id}) {item.label}
              </span>

              {/* Bottom headband cap */}
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: `linear-gradient(0deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 100%)`,
                  flexShrink: 0,
                }}
              />

              {/* Active indicator — thin front-edge line */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "10%",
                    height: "80%",
                    width: "3px",
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: "0 2px 2px 0",
                  }}
                />
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
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: item.spineColor }}
              />
              <span className="font-[var(--font-display)] font-bold tracking-wider">
                ({item.id}) {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
