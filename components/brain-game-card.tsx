"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const PAPER_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

const PALETTE_BORDERS = ["#8c9bb0", "#9fb3b0", "#5b6e88", "#7a4f6e", "#b88894", "#c4877e", "#c5a572"]

export interface BrainGameCardData {
  id: string
  title: string
  category: string
  href: string
  rotate: number
}

export function BrainGameCard({ game, index }: { game: BrainGameCardData; index: number }) {
  const [hovered, setHovered] = useState(false)
  const borderColor = PALETTE_BORDERS[index % PALETTE_BORDERS.length]

  return (
    <a href={game.href} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        animate={{
          y: hovered ? -6 : 0,
          scale: hovered ? 1.04 : 1,
          rotate: hovered ? 0 : game.rotate,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full"
        style={{
          aspectRatio: "17 / 20",
          backgroundColor: "rgba(244, 243, 240, 0.94)",
          backgroundImage: `${PAPER_BG}, linear-gradient(160deg, ${borderColor}22 0%, ${borderColor}10 100%)`,
          backgroundSize: "200px 200px, cover",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "12px",
          boxShadow: hovered
            ? `0 14px 32px rgba(11,37,69,0.18), 0 0 0 1px ${borderColor}55`
            : `0 3px 10px rgba(11,37,69,0.08), 0 1px 3px rgba(11,37,69,0.05)`,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gloss */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.35) 0%, transparent 55%)",
            borderRadius: "11px",
            pointerEvents: "none",
          }}
        />

        <div className="relative h-full flex flex-col items-center justify-between gap-2 p-4 sm:p-5">
          {/* Top: index + category */}
          <div className="w-full flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: borderColor,
                opacity: 0.75,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: borderColor,
                opacity: 0.65,
                textAlign: "right",
                lineHeight: 1.3,
                maxWidth: "65%",
              }}
            >
              {game.category}
            </span>
          </div>

          {/* Center: Atari-style title */}
          <h3
            className="text-center"
            style={{
              fontFamily: "var(--font-atari), 'Courier New', monospace",
              fontSize: "clamp(0.55rem, 1.6vw, 0.82rem)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              wordBreak: "break-word",
              hyphens: "auto",
              padding: "0 4px",
            }}
          >
            {game.title}
          </h3>

          {/* Bottom: play indicator */}
          <span
            style={{
              fontFamily: "var(--font-atari), 'Courier New', monospace",
              fontSize: "0.5rem",
              color: borderColor,
              letterSpacing: "0.18em",
              opacity: hovered ? 1 : 0.55,
              transition: "opacity 0.2s",
            }}
          >
            ▶ PLAY
          </span>
        </div>
      </motion.div>
    </a>
  )
}
