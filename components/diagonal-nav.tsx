"use client"

import { useState } from "react"
import Link from "next/link"
import { useHover } from "./hover-context"

const navItems = [
  { id: "01", label: "TESTS", color: "bg-nav-teal", href: "/tests" },
  { id: "02", label: "AUTISM", color: "bg-nav-coral", href: "/autism-affirming" },
  { id: "03", label: "ADHD", color: "bg-nav-salmon", href: "/adhd-support" },
  { id: "04", label: "BRAIN GAMES", color: "bg-nav-amber", href: "/brain-games" },
  { id: "05", label: "BLOG", color: "bg-nav-teal", href: "/blog" },
  { id: "06", label: "THERAPY", color: "bg-nav-coral", href: "/individual-therapy" },
]

export function DiagonalNav() {
  const { hoveredIndex, setHoveredIndex } = useHover()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <nav className="no-print fixed right-0 top-0 h-screen z-50 hidden md:flex">
      {/* Logo badge */}
      <div className="absolute top-6 right-6 z-60">
        <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center">
          <span className="text-background font-[var(--font-display)] text-xs font-bold text-center leading-tight">
            ML
            <br />
            PsyD
          </span>
        </div>
      </div>

      {/* Navigation columns */}
      <div className="flex h-full">
        {navItems.map((item, index) => {
          const isHovered = hoveredIndex === index
          const isActive = activeIndex === index

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${item.color} relative flex items-center justify-center transition-all duration-300 ease-out`}
              style={{
                width: isHovered ? "56px" : "48px",
                height: "100%",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className="text-white font-[var(--font-display)] font-bold text-sm tracking-widest whitespace-nowrap transition-opacity duration-300"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  opacity: isHovered || isActive ? 1 : 0.85,
                }}
              >
                ({item.id}) {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r" />
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
      <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm">
        <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
          <span className="text-background font-[var(--font-display)] text-[10px] font-bold text-center leading-tight">
            ML
            <br />
            PsyD
          </span>
        </div>
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
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
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
