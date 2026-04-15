"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  {
    title: "Neurodiversity",
    color: "border-nav-amber",
    bgAccent: "bg-nav-amber/10",
    rotation: -3,
    href: "/neurodiversity",
  },
  {
    title: "Tests",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: 2,
    href: "/tests",
  },
  {
    title: "ADHD Skills",
    color: "border-nav-salmon",
    bgAccent: "bg-nav-salmon/10",
    rotation: -2,
    href: "/adhd-skills",
  },
  {
    title: "ASD Skills",
    color: "border-nav-coral",
    bgAccent: "bg-nav-coral/10",
    rotation: 3,
    href: "/asd-skills",
  },
  {
    title: "OCD Skills",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: -1,
    href: "/ocd-skills",
  },
  {
    title: "Mindfulness",
    color: "border-nav-amber",
    bgAccent: "bg-nav-amber/10",
    rotation: 2,
    href: "/mindfulness",
  },
  {
    title: "Brain Games",
    color: "border-nav-salmon",
    bgAccent: "bg-nav-salmon/10",
    rotation: -3,
    href: "/brain-games",
  },
  {
    title: "Blog",
    color: "border-nav-teal",
    bgAccent: "bg-nav-teal/10",
    rotation: 1,
    href: "/blog",
  },
  {
    title: "Individual Therapy",
    color: "border-nav-coral",
    bgAccent: "bg-nav-coral/10",
    rotation: -2,
    href: "/individual-therapy",
  },
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
        className={`relative w-full h-32 sm:h-36 lg:h-40 bg-card rounded-lg border-2 ${card.color} shadow-lg cursor-pointer overflow-hidden`}
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

        <div className="relative p-3 sm:p-4 h-full flex flex-col justify-center items-center">
          <span className="text-muted-foreground text-xs font-medium tracking-wider mb-2">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-[var(--font-display)] text-[10px] sm:text-xs lg:text-sm font-bold text-foreground text-center leading-tight break-words hyphens-auto w-full">
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
