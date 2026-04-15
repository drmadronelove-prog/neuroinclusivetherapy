"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  { title: "Neurodiversity",    href: "/neurodiversity" },
  { title: "Tests",             href: "/tests" },
  { title: "ADHD Skills",       href: "/adhd-skills" },
  { title: "ASD Skills",        href: "/asd-skills" },
  { title: "OCD Skills",        href: "/ocd-skills" },
  { title: "Mindfulness",       href: "/mindfulness" },
  { title: "Brain Games",       href: "/brain-games" },
  { title: "Blog",              href: "/blog" },
  { title: "Individual Therapy", href: "/individual-therapy" },
]

// Wooden box that holds all the tiles
const boxStyle: React.CSSProperties = {
  background: [
    "repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(0,0,0,0.045) 9px, rgba(0,0,0,0.045) 10px)",
    "linear-gradient(160deg, #7A3E1A 0%, #5C2A0C 25%, #7A3E1A 52%, #6A320F 76%, #4E2208 100%)",
  ].join(", "),
  boxShadow: [
    "inset 0 6px 18px rgba(0,0,0,0.58)",
    "inset 0 -6px 18px rgba(0,0,0,0.48)",
    "inset 6px 0 18px rgba(0,0,0,0.42)",
    "inset -6px 0 18px rgba(0,0,0,0.42)",
    "0 14px 40px rgba(0,0,0,0.32)",
    "0 4px 10px rgba(0,0,0,0.2)",
  ].join(", "),
  padding: "20px 16px",
  borderRadius: "8px",
}

export function HeroCards() {
  return (
    <div style={boxStyle} className="max-w-4xl mx-auto mt-12 lg:mt-0">
      <div className="grid grid-cols-3 gap-3 lg:gap-4">
        {cards.map((card, index) => (
          <HeroCard key={card.title} card={card} index={index} />
        ))}
      </div>
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

  // Outer frame: raised rim of the tile
  const frameStyle: React.CSSProperties = {
    background: [
      "repeating-linear-gradient(172deg, transparent, transparent 6px, rgba(60,25,5,0.045) 6px, rgba(60,25,5,0.045) 7px)",
      "linear-gradient(145deg, #D49060 0%, #C07840 28%, #B87038 62%, #C07840 100%)",
    ].join(", "),
    boxShadow: [
      "0 4px 10px rgba(0,0,0,0.48)",
      "0 1px 3px rgba(0,0,0,0.3)",
      "0 0 0 1px rgba(175,95,35,0.45)",
      "inset 0 1px 1px rgba(230,160,80,0.25)",
    ].join(", "),
    padding: "7px",
    borderRadius: "5px",
    // 15% taller than original h-32/h-36/h-40
    height: "9.2rem",
  }

  // Inner face: recessed carved surface
  const faceStyle: React.CSSProperties = {
    background: [
      "repeating-linear-gradient(175deg, transparent, transparent 8px, rgba(35,12,2,0.055) 8px, rgba(35,12,2,0.055) 9px)",
      "linear-gradient(162deg, #B87040 0%, #A06030 28%, #AE7038 55%, #9A5828 82%, #A86832 100%)",
    ].join(", "),
    boxShadow: [
      "inset 0 5px 12px rgba(28,9,1,0.58)",
      "inset 0 -3px 8px rgba(28,9,1,0.38)",
      "inset 4px 0 9px rgba(28,9,1,0.38)",
      "inset -4px 0 9px rgba(28,9,1,0.38)",
    ].join(", "),
    borderRadius: "2px",
    height: "100%",
    position: "relative" as const,
    overflow: "hidden",
  }

  return (
    <Link href={card.href}>
      <motion.div
        style={{
          ...frameStyle,
          zIndex: isHovered ? 10 : index,
        }}
        animate={{
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.04 : 1,
          boxShadow: isHovered
            ? [
                "0 12px 24px rgba(0,0,0,0.55)",
                "0 4px 8px rgba(0,0,0,0.35)",
                "0 0 0 1px rgba(200,120,50,0.5)",
                "inset 0 1px 1px rgba(230,160,80,0.3)",
              ].join(", ")
            : frameStyle.boxShadow as string,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 14 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={faceStyle}>
          {/* Subtle highlight streak — simulates carved surface catching light */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              width: "30%",
              height: "100%",
              background:
                "linear-gradient(180deg, rgba(255,200,120,0.07) 0%, rgba(255,200,120,0.03) 40%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <div className="relative h-full flex flex-col justify-center items-center gap-2 p-3">
            <span
              className="text-xs font-medium tracking-wider"
              style={{ color: "rgba(80,35,8,0.55)", fontFamily: "var(--font-display)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className="font-bold text-center leading-tight break-words hyphens-auto w-full"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
                color: "#3D1E06",
                textShadow: "0 1px 2px rgba(255,180,100,0.15)",
              }}
            >
              {card.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
