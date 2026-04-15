"use client"

import { HeroCards } from "@/components/hero-cards"
import { AnimatedHeading } from "@/components/animated-heading"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-20 md:pt-0 pb-12 lg:-mt-[5vh]"
    >
      {/* Video — spans full width up to the tabs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          // extend 5vh below the section to compensate for lg:-mt-[5vh]
          height: "calc(100% + 5vh)",
          minHeight: "100vh",
          width: "calc(100vw - 252px)",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <video autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
        }}>
          <source src="/pottery.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay: heavy cream on left (heading), light on right (cards) */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(240,235,227,0.94) 0%, rgba(240,235,227,0.82) 28%, rgba(240,235,227,0.52) 55%, rgba(240,235,227,0.28) 85%, rgba(240,235,227,0.15) 100%)",
        }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto" style={{ zIndex: 2 }}>
        <div className="flex items-center gap-8 lg:gap-12">

          {/* Left — heading, fixed width so cards get all remaining space */}
          <div className="shrink-0 space-y-6" style={{ maxWidth: "340px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1
                className="font-[var(--font-display)] text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tight"
                style={{ textShadow: "0 2px 16px rgba(240,235,227,0.85)" }}
              >
                <span className="block" style={{ color: "#3D5230" }}>NEURO</span>
                <span className="block" style={{ color: "#C4755A" }}>INCLU</span>
                <span className="block" style={{ color: "#3D5230" }}>SIVE</span>
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

          {/* Right — cards pushed flush right toward the tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-end"
          >
            <HeroCards />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
