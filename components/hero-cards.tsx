"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  { title: "Neurodiversity",     href: "/neurodiversity" },
  { title: "Tests",              href: "/tests" },
  { title: "ADHD Skills",        href: "/adhd-skills" },
  { title: "ASD Skills",         href: "/asd-skills" },
  { title: "OCD Skills",         href: "/ocd-skills" },
  { title: "Mindfulness",        href: "/mindfulness" },
  { title: "Brain Games",        href: "/brain-games" },
  { title: "Blog",               href: "/blog" },
  { title: "Individual Therapy", href: "/individual-therapy" },
]

export function HeroCards() {
  return (
    <div className="grid grid-cols-3 gap-3 lg:gap-4 max-w-4xl mx-auto mt-12 lg:mt-0">
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
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          // 15% taller than original h-32/h-36/h-40
          height: "9.2rem",
          background: "#F5F2EC",
          border: "1px solid rgba(180,165,140,0.38)",
          borderRadius: "10px",
          boxShadow: isHovered
            ? "0 12px 32px rgba(61,82,48,0.14), 0 4px 10px rgba(61,82,48,0.1)"
            : "0 2px 10px rgba(61,82,48,0.08), 0 1px 3px rgba(61,82,48,0.06)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle inner top highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, transparent 55%)",
            borderRadius: "10px",
            pointerEvents: "none",
          }}
        />

        {/* Hover tint */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(122,154,120,0.06)",
            borderRadius: "10px",
            pointerEvents: "none",
          }}
        />

        <div className="relative h-full flex flex-col justify-center items-center gap-2 p-3 sm:p-4">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "rgba(122,154,120,0.7)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
              fontWeight: 500,
              color: "#3D5230",
              textAlign: "center",
              lineHeight: 1.35,
              letterSpacing: "0.01em",
            }}
          >
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
