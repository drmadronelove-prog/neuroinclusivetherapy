"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const PAPER_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

// Variant accents drawn from the settled palette.
const VARIANTS = [
  { accent: "#5b6e88", surface: "#fbf8f3" }, // slate on paper
  { accent: "#7a4f6e", surface: "#efeae0" }, // plum on linen
  { accent: "#8c9bb0", surface: "#fbf8f3" }, // mist on paper
]

export type BlogHeroCardData = {
  slug: string
  title: string
  category?: string
  date?: string
}

export function BlogHeroCard({
  post,
  index,
}: {
  post: BlogHeroCardData
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const variant = VARIANTS[index % VARIANTS.length]
  const rotate = (index % 2 === 0 ? -1 : 1) * (1 + (index % 3) * 0.5)

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <motion.div
        animate={{
          y: isHovered ? -6 : 0,
          scale: isHovered ? 1.03 : 1,
          rotate: isHovered ? 0 : rotate,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full"
        style={{
          aspectRatio: "5 / 4",
          backgroundColor: variant.surface,
          backgroundImage: PAPER_BG,
          backgroundSize: "200px 200px",
          border: `1px solid rgba(11,37,69,0.18)`,
          boxShadow: isHovered
            ? `0 14px 32px rgba(11,37,69,0.18)`
            : `0 6px 18px rgba(11,37,69,0.08)`,
          cursor: "pointer",
          overflow: "hidden",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <div className="relative h-full flex flex-col justify-between p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <span
              className="text-[0.65rem]"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: variant.accent,
                opacity: 0.85,
              }}
            >
              {post.category ?? "Essay"}
            </span>
            <span
              className="text-[0.65rem]"
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
            className="text-[1.4rem] sm:text-[1.7rem] leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h3>

          <div
            className="flex items-center gap-2 text-[0.7rem]"
            style={{
              fontFamily: "var(--font-mono)",
              color: variant.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <span>Read essay</span>
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
    </Link>
  )
}
