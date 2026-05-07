"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const PAPER_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

// Blue-grey palette variations for cards (cycled by index)
const BLUE_GREY_VARIANTS = [
  { border: "#8A9AAE", tint: "rgba(138,154,174,0.22)", accent: "#4F5D6E" },
  { border: "#A7B7C8", tint: "rgba(167,183,200,0.28)", accent: "#6B7B8C" },
  { border: "#6B7B8C", tint: "rgba(107,123,140,0.20)", accent: "#2F3B47" },
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
  const variant = BLUE_GREY_VARIANTS[index % BLUE_GREY_VARIANTS.length]
  const rotate = ((index % 2 === 0 ? -1 : 1) * (1 + (index % 3) * 0.5))

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
          backgroundColor: "rgba(248, 250, 252, 0.92)",
          backgroundImage: `${PAPER_BG}, linear-gradient(160deg, ${variant.tint} 0%, rgba(191,202,214,0.18) 100%)`,
          backgroundSize: "200px 200px, cover",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `2px solid ${variant.border}`,
          borderRadius: "14px",
          boxShadow: isHovered
            ? `0 14px 32px rgba(47,59,71,0.18), 0 0 0 1px ${variant.border}66`
            : `0 3px 10px rgba(47,59,71,0.10), 0 1px 3px rgba(47,59,71,0.06)`,
          cursor: "pointer",
          overflow: "hidden",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.40) 0%, transparent 55%)",
            borderRadius: "13px",
            pointerEvents: "none",
          }}
        />

        <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span
              className="text-[0.7rem] tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-accent)",
                color: variant.border,
                opacity: 0.85,
              }}
            >
              {post.category ?? "Essay"}
            </span>
            <span
              className="text-[0.75rem]"
              style={{
                fontFamily: "var(--font-accent)",
                color: variant.accent,
                opacity: 0.7,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="text-[1.25rem] sm:text-[1.55rem] leading-tight"
            style={{
              fontFamily: "var(--font-accent)",
              fontWeight: 400,
              color: variant.accent,
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </h3>

          <div
            className="flex items-center gap-2 text-[0.78rem]"
            style={{ color: variant.border }}
          >
            <span style={{ fontFamily: "var(--font-accent)" }}>Read essay</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
