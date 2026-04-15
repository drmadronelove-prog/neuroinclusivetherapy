"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  { title: "Neurodiversity",     href: "/neurodiversity" },
  { title: "Tests",              href: "/tests" },
  { title: "ADHD Skills",        href: "/adhd-skills" },
  { title: "ASD Skills",         href: "/asd-skills" },
  { title: "OCD Skills",         href: "/ocd-skills" },
  { title: "Mindfulness",        href: "/mindfulness" },
  { title: "Brain Games",        href: "/brain-games" },
  { title: "Blog",               href: "/blog" },
  { title: "Individual Therapy", href: "/individual-therapy" },
]

// Pale grey-blue base — same texture/depth language as the book spines
const BASE = "#B8C4CE"
const BASE_LIGHT = "#C8D2DA"
const BASE_DARK = "#A4B2BE"

function tileBackground(hovered: boolean): string {
  return [
    // Linen cross-hatch — same as spine texture
    "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.022) 4px, rgba(0,0,0,0.022) 5px)",
    "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.018) 4px, rgba(255,255,255,0.018) 5px)",
    // Convex radial highlight — brightest near top-centre
    `radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,255,255,${hovered ? "0.28" : "0.20"}) 0%, rgba(255,255,255,0.04) 65%, rgba(0,0,0,0.04) 100%)`,
    // Side-edge darkening (convex sides fall into shadow)
    "linear-gradient(90deg, rgba(0,0,0,0.10) 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, rgba(0,0,0,0.10) 100%)",
    // Base colour gradient — slight tonal variation for depth
    `linear-gradient(155deg, ${BASE_LIGHT} 0%, ${BASE} 40%, ${BASE_DARK} 75%, ${BASE} 100%)`,
  ].join(", ")
}

function tileShadow(hovered: boolean): string {
  if (hovered) {
    return [
      "0 14px 28px rgba(70,90,110,0.28)",
      "0 6px 10px rgba(70,90,110,0.18)",
      "inset 0 1px 0 rgba(255,255,255,0.55)",   // top inner highlight
      "inset 0 -2px 0 rgba(50,70,90,0.22)",      // bottom inner shadow
    ].join(", ")
  }
  return [
    "0 4px 14px rgba(70,90,110,0.22)",
    "0 2px 4px rgba(70,90,110,0.14)",
    "inset 0 1px 0 rgba(255,255,255,0.50)",
    "inset 0 -2px 0 rgba(50,70,90,0.18)",
  ].join(", ")
}

export function HeroCards() {
  return (
    <div className="grid grid-cols-3 gap-3 lg:gap-4 max-w-4xl mx-auto mt-12 lg:mt-0">
      {cards.map((card, index) => (
        <HeroCard key={card.title} card={card} index={index} />
      ))}
    </div>
  )
}

function HeroCard({
  card,
  index,
}: {
  card: (typeof cards)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={card.href}>
      <motion.div
        animate={{ y: isHovered ? -9 : 0, scale: isHovered ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          height: "9.2rem",
          backgroundImage: tileBackground(isHovered),
          border: `1px solid rgba(140,158,172,0.55)`,
          borderRadius: "10px",
          boxShadow: tileShadow(isHovered),
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.25s ease, background-image 0.25s ease",
        }}
      >
        {/* Top headband cap — same as spine */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "7px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.05) 100%)",
          borderRadius: "10px 10px 0 0",
          pointerEvents: "none",
        }} />

        {/* Bottom cap */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "7px",
          background: "linear-gradient(0deg, rgba(50,70,90,0.20) 0%, rgba(50,70,90,0.04) 100%)",
          borderRadius: "0 0 10px 10px",
          pointerEvents: "none",
        }} />

        <div className="relative h-full flex flex-col justify-center items-center gap-2 p-3 sm:p-4">
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.72)",
            textShadow: "0 1px 2px rgba(50,70,90,0.35)",
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            lineHeight: 1.35,
            letterSpacing: "0.01em",
            textShadow: "0 1px 3px rgba(50,70,90,0.4)",
          }}>
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
