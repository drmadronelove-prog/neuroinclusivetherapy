"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const cards = [
  {
    title: "Affirming Care",
    description: "Neurodivergent-affirming therapeutic approaches",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: -3,
  },
  {
    title: "ADHD & Autism",
    description: "Specialized support for neurodivergent minds",
    color: "border-nav-coral",
    bgAccent: "bg-nav-coral/10",
    rotation: 2,
  },
  {
    title: "Holistic Wellness",
    description: "Mind-body integration for lasting change",
    color: "border-nav-salmon",
    bgAccent: "bg-nav-salmon/10",
    rotation: -2,
  },
]

export function HeroCards() {
  return (
    <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mt-12 lg:mt-0">
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
    <motion.div
      className={`relative w-48 lg:w-56 h-64 lg:h-72 bg-card rounded-lg border-2 ${card.color} shadow-lg cursor-pointer overflow-hidden`}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      <div className="relative p-6 h-full flex flex-col justify-end">
        <span className="text-muted-foreground text-xs font-medium tracking-wider mb-2">
          0{index + 1}
        </span>
        <h3 className="font-[var(--font-display)] text-2xl font-bold text-foreground mb-2">
          {card.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  )
}
