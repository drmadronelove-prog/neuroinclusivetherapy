"use client"

import { HeroCards } from "@/components/hero-cards"
import { AnimatedHeading } from "@/components/animated-heading"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative"
      style={{ minHeight: "100svh", background: "var(--paper)" }}
    >
      {/* Main content */}
      <div
        className="relative min-h-[100svh] flex flex-col justify-end px-5 sm:px-6 lg:px-0 pt-40 sm:pt-44 lg:pt-48 pb-10"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col gap-6 w-full lg:max-w-none mx-auto">

          <div className="shrink-0 space-y-1 text-center lg:text-left mx-auto lg:mx-0 lg:absolute lg:left-[2.9rem] lg:bottom-[13rem]" style={{ maxWidth: "340px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 7vw, 6rem)",
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: 0,
                whiteSpace: "nowrap",
              }}>
                Neuroinclusive
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:absolute lg:right-[2.9rem] lg:bottom-[9rem]"
          >
            <HeroCards />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
