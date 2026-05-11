"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const PAPER_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

// Brighter palette for the brain games — warmer surfaces, more saturated
// accents than the muted slate/plum/mist used elsewhere.
const VARIANTS = [
  { accent: "#c4877e", surface: "#fbeae3" }, // warm rose on peach
  { accent: "#c5a572", surface: "#f9efd6" }, // gold on warm cream
  { accent: "#5b6e88", surface: "#e2eaf2" }, // slate-blue on cool wash
  { accent: "#7a4f6e", surface: "#f1e3eb" }, // plum on lavender
  { accent: "#9fb3b0", surface: "#e3eee9" }, // glass on mint
  { accent: "#b88894", surface: "#f4e3e8" }, // dusk on pink
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
          rotate: hovered ? 0 : game.rotate,
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
          border: `1px solid rgba(11,37,69,0.18)`,
          boxShadow: hovered
            ? `0 14px 32px rgba(11,37,69,0.18)`
            : `0 6px 18px rgba(11,37,69,0.08)`,
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
                opacity: 0.9,
              }}
            >
              {game.category}
            </span>
            <span
              className="text-[0.7rem] shrink-0"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(11,37,69,0.5)",
                letterSpacing: "0.1em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="text-[1.6rem] sm:text-[2.2rem] md:text-[2.6rem] leading-[1.05] text-center px-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
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
