"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const cards = [
  {
    title: "Tests",
    description: "Full assessment to identify treatment goals tailored to your unique life",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: -3,
  },
  {
    title: "Autism-Affirming",
    description: "Therapy that honors autistic identity and addresses masking burnout",
    color: "border-nav-coral",
    bgAccent: "bg-nav-coral/10",
    rotation: 2,
  },
  {
    title: "ADHD Support",
    description: "Executive function coaching woven into therapeutic work",
    color: "border-nav-salmon",
    bgAccent: "bg-nav-salmon/10",
    rotation: -2,
  },
  {
    title: "Brain Games",
    description: "Cognitive exercises and skills for psychological resilience",
    color: "border-nav-amber",
    bgAccent: "bg-nav-amber/10",
    rotation: 3,
  },
  {
    title: "Mindfulness",
    description: "Buddhist-inspired somatic practices for grounding and clarity",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: -1,
  },
  {
    title: "Individual Therapy",
    description: "One-on-one sessions to thrive on your own terms",
    color: "border-nav-coral",
    bgAccent: "bg-nav-coral/10",
    rotation: 2,
  },
]

export function HeroCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mt-12 lg:mt-0 max-w-4xl mx-auto">
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
      className={`relative w-full h-48 sm:h-56 lg:h-64 bg-card rounded-lg border-2 ${card.color} shadow-lg cursor-pointer overflow-hidden`}
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
