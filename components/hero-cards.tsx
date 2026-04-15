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

function tileBackground(): string {
  return [
    // Cross-grain organic texture — two angles for a woven/stone feel
    "repeating-linear-gradient(38deg, transparent, transparent 5px, rgba(255,255,255,0.018) 5px, rgba(255,255,255,0.018) 6px)",
    "repeating-linear-gradient(128deg, transparent, transparent 7px, rgba(0,0,0,0.022) 7px, rgba(0,0,0,0.022) 8px)",
    // Soft colour blooms for organic variation
    "radial-gradient(ellipse 110% 70% at 25% 35%, rgba(130,175,215,0.18) 0%, transparent 55%)",
    "radial-gradient(ellipse 80% 110% at 75% 72%, rgba(50,95,150,0.14) 0%, transparent 52%)",
    // Convex top highlight
    "radial-gradient(ellipse 75% 45% at 50% 18%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.04) 65%, transparent 100%)",
    // Side-edge shadowing
    "linear-gradient(90deg, rgba(0,0,0,0.13) 0%, rgba(255,255,255,0.05) 18%, rgba(255,255,255,0.05) 82%, rgba(0,0,0,0.13) 100%)",
    // Base — richer, more saturated blue
    "linear-gradient(158deg, #7A9EC4 0%, #5E84AC 38%, #4A6E9A 68%, #6080AA 100%)",
  ].join(", ")
}

function tileShadow(hovered: boolean): string {
  return hovered
    ? "0 16px 32px rgba(40,70,110,0.38), 0 6px 12px rgba(40,70,110,0.22), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(20,50,90,0.28)"
    : "0 5px 16px rgba(40,70,110,0.28), 0 2px 5px rgba(40,70,110,0.16), inset 0 1px 0 rgba(255,255,255,0.44), inset 0 -2px 0 rgba(20,50,90,0.22)"
}

export function HeroCards() {
  return (
    // ml-auto pushes the whole grid to the right edge
    <div className="grid grid-cols-3 gap-2 lg:gap-3 ml-auto">
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
        animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          // Domino proportions — roughly 1:2 (width:height)
          width: "7.5rem",
          height: "13.5rem",
          backgroundImage: tileBackground(),
          border: "1px solid rgba(120,160,210,0.45)",
          borderRadius: "14px",
          boxShadow: tileShadow(isHovered),
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.25s ease",
        }}
      >
        {/* Top headband cap */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "8px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.04) 100%)",
          borderRadius: "14px 14px 0 0", pointerEvents: "none",
        }} />

        {/* Domino dividing line at centre */}
        <div style={{
          position: "absolute", top: "50%", left: "14%", right: "14%",
          height: "1px", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.22)",
          pointerEvents: "none",
        }} />

        {/* Bottom cap */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "8px",
          background: "linear-gradient(0deg, rgba(20,50,90,0.28) 0%, rgba(20,50,90,0.04) 100%)",
          borderRadius: "0 0 14px 14px", pointerEvents: "none",
        }} />

        <div className="relative h-full flex flex-col justify-center items-center gap-2 px-2">
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.65)",
            textShadow: "0 1px 3px rgba(20,50,90,0.5)",
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.93)",
            textAlign: "center",
            lineHeight: 1.35,
            letterSpacing: "0.01em",
            textShadow: "0 1px 4px rgba(20,50,90,0.55)",
          }}>
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
