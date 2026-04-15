"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  { title: "Neurodiversity",     href: "/neurodiversity",     borderColor: "#5BA89E" },
  { title: "Tests",              href: "/tests",              borderColor: "#D47870" },
  { title: "ADHD Skills",        href: "/adhd-skills",        borderColor: "#C89050" },
  { title: "ASD Skills",         href: "/asd-skills",         borderColor: "#C07898" },
  { title: "OCD Skills",         href: "/ocd-skills",         borderColor: "#7A9A78" },
  { title: "Mindfulness",        href: "/mindfulness",        borderColor: "#7890A8" },
  { title: "Brain Games",        href: "/brain-games",        borderColor: "#B86848" },
  { title: "Blog",               href: "/blog",               borderColor: "#6A9070" },
  { title: "Individual Therapy", href: "/individual-therapy", borderColor: "#9878A8" },
]

export function HeroCards() {
  return (
    <div className="grid grid-cols-3 gap-3 ml-auto">
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
        animate={{ y: isHovered ? -6 : 0, scale: isHovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "8.5rem",
          height: "10rem",
          background: "rgba(248, 244, 238, 0.88)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `2px solid ${card.borderColor}`,
          borderRadius: "14px",
          boxShadow: isHovered
            ? `0 10px 28px rgba(0,0,0,0.14), 0 0 0 1px ${card.borderColor}55`
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
          background: "linear-gradient(160deg, rgba(255,255,255,0.45) 0%, transparent 50%)",
          borderRadius: "13px",
          pointerEvents: "none",
        }} />

        <div className="relative h-full flex flex-col justify-center items-center gap-2 p-3">
          <span style={{
            fontFamily: "var(--font-accent)",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: card.borderColor,
            opacity: 0.75,
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "#2A3A28",
            textAlign: "center",
            lineHeight: 1.25,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
