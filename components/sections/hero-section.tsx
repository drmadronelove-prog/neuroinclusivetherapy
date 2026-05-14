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

          {/* Image + heading share one inline-flex column so the banner
              stretches to the same width as the word "Neuroinclusive" (the
              h1 sets the column width via white-space: nowrap; items-stretch
              makes the image fill that width). On desktop the column is fixed
              to 29.75rem tall with justify-between, which pins the image to
              the top row of HeroCards and the heading group to bottom-13rem. */}
          <div
            className="shrink-0 mx-auto lg:mx-0 lg:absolute lg:left-[2.9rem] lg:bottom-[13rem] lg:h-[29.75rem] flex flex-col items-stretch lg:justify-between max-w-[340px] lg:max-w-none gap-4 lg:gap-0 text-center lg:text-left"
          >
            {/* Banner image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:mt-12"
            >
              <div
                className="relative w-full overflow-hidden aspect-[4/1] lg:aspect-auto lg:h-[10.59rem]"
                style={{
                  borderRadius: "10px",
                  border: "1.5px solid #5b6e88",
                  background: "var(--paper)",
                  boxShadow:
                    "0 8px 22px rgba(11,37,69,0.16), 0 2px 6px rgba(11,37,69,0.10), 0 0 0 1px rgba(255,255,255,0.4) inset",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/header%20photo.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Heading group */}
            <div className="space-y-1">
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
