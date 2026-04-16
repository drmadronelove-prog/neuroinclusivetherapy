"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Subtle paper grain texture via SVG turbulence
const PAPER_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

const cards = [
  { title: "Neurodiversity",     href: "/neurodiversity",     borderColor: "#C17C74", rotate: -2   },
  { title: "Tests",              href: "/tests",              borderColor: "#A7B79F", rotate:  1.5 },
  { title: "ADHD Skills",        href: "/adhd-skills",        borderColor: "#7D805F", rotate: -1   },
  { title: "ASD Skills",         href: "/asd-skills",         borderColor: "#8A9E96", rotate:  2   },
  { title: "OCD Skills",         href: "/ocd-skills",         borderColor: "#A7B79F", rotate: -1.5 },
  { title: "Mindfulness",        href: "/mindfulness",        borderColor: "#B89878", rotate:  0.5 },
  { title: "Brain Games",        href: "/brain-games",        borderColor: "#C17C74", rotate: -2   },
  { title: "Blog",               href: "/blog",               borderColor: "#C0B4A0", rotate:  1   },
  { title: "Madrone Love, PsyD", href: "/individual-therapy", borderColor: "#8A9E96", rotate: -0.5 },
]

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

  return (
    <Link href={card.href}>
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
          backgroundColor: "rgba(248, 244, 238, 0.92)",
          backgroundImage: `${PAPER_BG}, linear-gradient(160deg, ${card.borderColor}22 0%, ${card.borderColor}14 100%)`,
          backgroundSize: "200px 200px, cover",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `2px solid ${card.borderColor}`,
          borderRadius: "14px",
          boxShadow: isHovered
            ? `0 12px 30px rgba(0,0,0,0.16), 0 0 0 1px ${card.borderColor}55`
            : `0 3px 10px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.06)`,
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
          borderRadius: "13px",
          pointerEvents: "none",
        }} />

        <div className="relative h-full flex flex-col justify-center items-center gap-2 p-3">
          <span className="text-[0.6rem] md:text-[0.85rem]" style={{
            fontFamily: "var(--font-accent)",
            fontWeight: 400,
            color: card.borderColor,
            opacity: 0.65,
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[0.85rem] md:text-[1.2rem]" style={{
            fontFamily: "var(--font-accent)",
            fontWeight: 400,
            color: "#6B5F58",
            textAlign: "center",
            lineHeight: 1.15,
          }}>
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
