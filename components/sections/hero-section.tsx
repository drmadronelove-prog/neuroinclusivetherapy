"use client"

import { HeroCards } from "@/components/hero-cards"
import { AnimatedHeading } from "@/components/animated-heading"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-20 md:pt-0 pb-12 lg:-mt-[5vh] overflow-hidden"
    >
      {/* Full-bleed background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      >
        <source src="/pottery.mp4" type="video/mp4" />
      </video>

      {/* Soft overlay so text stays legible over the video */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(240,235,227,0.62)",
          zIndex: 1,
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-[var(--font-display)] text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-[0.85] tracking-tight">
                <span className="block">NEURO</span>
                <span className="block text-nav-coral">INCLU</span>
                <span className="block">SIVE</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedHeading />
            </motion.div>
          </div>

          {/* Right content — Hero Cards */}
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
