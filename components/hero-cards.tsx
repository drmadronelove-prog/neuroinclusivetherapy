"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Subtle paper grain texture via SVG turbulence
const PAPER_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

const cards = [
  { title: "Neurodiversity",     href: "/neurodiversity",     borderColor: "#3D5230", rotate: -2   },
  { title: "Tests",              href: "/tests",              borderColor: "#D47870", rotate:  1.5 },
  { title: "ADHD Skills",        href: "/adhd-skills",        borderColor: "#C89050", rotate: -1   },
  { title: "ASD Skills",         href: "/asd-skills",         borderColor: "#C07898", rotate:  2   },
  { title: "OCD Skills",         href: "/ocd-skills",         borderColor: "#7A9A78", rotate: -1.5 },
  { title: "Mindfulness",        href: "/mindfulness",        borderColor: "#7890A8", rotate:  0.5 },
  { title: "Brain Games",        href: "/brain-games",        borderColor: "#B86848", rotate: -2   },
  { title: "Blog",               href: "/blog",               borderColor: "#6A9070", rotate:  1   },
  { title: "Individual Therapy", href: "/individual-therapy", borderColor: "#9878A8", rotate: -0.5 },
]

export function HeroCards() {
  return (
    <div className="grid grid-cols-3 gap-4 ml-auto">
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
        style={{
          width: "8.5rem",
          height: "10rem",
          backgroundColor: "rgba(248, 244, 238, 0.92)",
          backgroundImage: PAPER_BG,
          backgroundSize: "200px 200px",
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
          <span style={{
            fontFamily: "var(--font-accent)",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: card.borderColor,
            opacity: 0.65,
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 style={{
            fontFamily: "var(--font-accent)",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#2A3A28",
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
