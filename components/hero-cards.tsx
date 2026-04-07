"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useHover } from "./hover-context"

const cards = [
  {
    title: "Tests",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: -3,
    href: "/tests",
  },
  {
    title: "Autism-Affirming",
    color: "border-nav-coral",
    bgAccent: "bg-nav-coral/10",
    rotation: 2,
    href: "/autism-affirming",
  },
  {
    title: "ADHD Support",
    color: "border-nav-salmon",
    bgAccent: "bg-nav-salmon/10",
    rotation: -2,
    href: "/adhd-support",
  },
  {
    title: "Brain Games",
    color: "border-nav-amber",
    bgAccent: "bg-nav-amber/10",
    rotation: 3,
    href: "/brain-games",
  },
  {
    title: "Slowing Down",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: -1,
    href: "/slowing-down",
  },
  {
    title: "Individual Therapy",
    color: "border-nav-coral",
    bgAccent: "bg-nav-coral/10",
    rotation: 2,
    href: "/individual-therapy",
  },
]

export function HeroCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mt-12 lg:mt-0">
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
  const { hoveredIndex, setHoveredIndex } = useHover()
  const isHovered = hoveredIndex === index

  return (
    <Link href={card.href}>
      <motion.div
        className={`relative w-full h-40 sm:h-48 lg:h-56 bg-card rounded-lg border-2 ${card.color} shadow-lg cursor-pointer overflow-hidden`}
        initial={{ rotate: card.rotation }}
        animate={{
          rotate: isHovered ? 0 : card.rotation,
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          zIndex: isHovered ? 10 : index,
        }}
      >
        {/* Accent background on hover */}
        <motion.div
          className={`absolute inset-0 ${card.bgAccent}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <div className="relative p-6 h-full flex flex-col justify-center items-center">
          <span className="text-muted-foreground text-xs font-medium tracking-wider mb-2">
            0{index + 1}
          </span>
          <h3 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold text-foreground text-center">
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
