"use client"

import { HeroCards } from "@/components/hero-cards"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-16 md:pt-0 pb-12 -mt-[5vh]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Massive headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-[var(--font-display)] text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-[0.85] tracking-tight">
                <span className="block">NEURO</span>
                <span className="block text-nav-coral">INCLU</span>
                <span className="block">SIVE</span>
              </h1>
            </motion.div>

            {/* Secondary headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="font-[var(--font-display)] text-foreground text-2xl sm:text-3xl font-bold leading-snug max-w-md">
                Therapy and Tools for people who feel different.
              </p>
            </motion.div>

          </div>

          {/* Right content - Hero Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <HeroCards />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
