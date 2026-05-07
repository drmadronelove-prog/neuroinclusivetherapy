"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Subtle paper grain texture via SVG turbulence
const PAPER_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

// Border colors cycle through cool & warm accents from the settled palette.
const PALETTE_BORDERS = ["#8c9bb0", "#9fb3b0", "#5b6e88", "#7a4f6e", "#b88894", "#c4877e", "#c5a572"]

const CARD_DEFS: { title: string; href: string; rotate: number }[] = [
  { title: "Neurodiversity",     href: "/neurodiversity", rotate: -2   },
  { title: "Tests",              href: "/tests",          rotate:  1   },
  { title: "Blog",               href: "/blog",           rotate:  1.5 },
  { title: "ASD Skills",         href: "/asd-skills",     rotate: -1   },
  { title: "ADHD Skills",        href: "/adhd-skills",    rotate:  1   },
  { title: "OCD Skills",         href: "/ocd-skills",     rotate: -2   },
  { title: "Mindfulness",        href: "/mindfulness",    rotate:  0.5 },
  { title: "Brain Games",        href: "/brain-games",    rotate: -1.5 },
  { title: "Psychotherapy",      href: "https://v0-madronelove-website.vercel.app/", rotate: -0.5 },
]

const cards = CARD_DEFS.map((c, i) => ({
  ...c,
  borderColor: PALETTE_BORDERS[i % PALETTE_BORDERS.length],
}))

export function HeroCards() {
  return (
    <div className="grid grid-cols-3 gap-2 lg:gap-4 w-full lg:w-auto">
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
  const isExternal = card.href.startsWith("http")

  const content = (
      <motion.div
        animate={{
          y: isHovered ? -6 : 0,
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 0 : card.rotate,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full lg:w-[8.5rem]"
        style={{
          aspectRatio: "17 / 20",
          height: undefined,
          backgroundColor: "rgba(251, 248, 243, 0.94)",
          backgroundImage: `${PAPER_BG}, linear-gradient(160deg, ${card.borderColor}22 0%, ${card.borderColor}10 100%)`,
          backgroundSize: "200px 200px, cover",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1.5px solid ${card.borderColor}`,
          borderRadius: "10px",
          boxShadow: isHovered
            ? `0 12px 30px rgba(11,37,69,0.16), 0 0 0 1px ${card.borderColor}55`
            : `0 3px 10px rgba(11,37,69,0.08), 0 1px 3px rgba(11,37,69,0.05)`,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {/* Inner top gloss */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(255,255,255,0.35) 0%, transparent 55%)",
          borderRadius: "9px",
          pointerEvents: "none",
        }} />

        <div className="relative h-full flex flex-col justify-center items-center gap-2 p-3">
          <span className="text-[0.55rem] md:text-[0.7rem]" style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: card.borderColor,
            opacity: 0.75,
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[0.95rem] md:text-[1.25rem]" style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: "var(--ink)",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}>
            {card.title}
          </h3>
        </div>
      </motion.div>
  )

  return isExternal ? (
    <a href={card.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={card.href}>{content}</Link>
  )
}
