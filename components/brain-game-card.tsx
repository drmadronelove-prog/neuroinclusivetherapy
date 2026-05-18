"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const PAPER_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

// 80s arcade neon palette — bright accents on near-black surfaces.
const VARIANTS = [
  { accent: "#ff2e8b", surface: "#1a0e2e" }, // hot pink on deep purple
  { accent: "#00e5ff", surface: "#0e1a2e" }, // cyan on dark navy
  { accent: "#39ff14", surface: "#0e1a14" }, // neon green on dark forest
  { accent: "#ffe600", surface: "#1f0e2e" }, // electric yellow on plum-black
  { accent: "#ff7a00", surface: "#0f1018" }, // neon orange on near-black
  { accent: "#c724ff", surface: "#0c0f1f" }, // electric purple on midnight
]

export interface BrainGameCardData {
  id: string
  title: string
  category: string
  href: string
  rotate: number
}

export function BrainGameCard({ game, index }: { game: BrainGameCardData; index: number }) {
  const [hovered, setHovered] = useState(false)
  const variant = VARIANTS[index % VARIANTS.length]

  return (
    <a href={game.href} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        animate={{
          y: hovered ? -6 : 0,
          scale: hovered ? 1.03 : 1,
          rotate: 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full"
        style={{
          aspectRatio: "5 / 4",
          backgroundColor: variant.surface,
          backgroundImage: PAPER_BG,
          backgroundSize: "200px 200px",
          border: `1.5px solid ${variant.accent}`,
          boxShadow: hovered
            ? `0 14px 32px rgba(0,0,0,0.55), 0 0 30px ${variant.accent}80, inset 0 0 22px ${variant.accent}1f`
            : `0 6px 18px rgba(0,0,0,0.40), 0 0 14px ${variant.accent}55, inset 0 0 14px ${variant.accent}14`,
          cursor: "pointer",
          overflow: "hidden",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span
              className="text-[0.7rem]"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: variant.accent,
                textShadow: `0 0 6px ${variant.accent}99`,
              }}
            >
              {game.category}
            </span>
            <span
              className="text-[0.7rem] shrink-0"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.1em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="text-center px-2"
            style={{
              fontFamily: "var(--font-atari), 'Courier New', monospace",
              fontWeight: 400,
              color: variant.accent,
              fontSize: "clamp(0.78rem, 1.6vw, 1.05rem)",
              lineHeight: 1.55,
              letterSpacing: "0.02em",
              textShadow: `0 0 6px ${variant.accent}80, 0 0 14px ${variant.accent}40`,
            }}
          >
            {game.title}
          </h3>

          <div
            className="flex items-center gap-2 text-[0.72rem]"
            style={{
              fontFamily: "var(--font-mono)",
              color: variant.accent,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              textShadow: `0 0 6px ${variant.accent}99`,
            }}
          >
            <span>Play game</span>
            <svg
              width="14"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </a>
  )
}
