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
      {/* Main content. Heading + image anchor near the top (right under the
          fixed site header); HeroCards anchor at the bottom on desktop. */}
      <div
        className="relative min-h-[100svh] flex flex-col px-5 sm:px-6 lg:px-0 pt-32 sm:pt-32 lg:pt-32 pb-10"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col gap-6 w-full lg:max-w-none mx-auto">

          <div className="shrink-0 space-y-1 text-center lg:text-left mx-auto lg:mx-0 lg:absolute lg:left-[2.9rem] lg:top-[6.5rem]" style={{ maxWidth: "340px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Image + heading share a width so the banner stretches to match
                  the word "Neuroinclusive". */}
              <div className="inline-flex flex-col items-stretch gap-3 align-top">
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "4 / 1",
                    borderRadius: "10px",
                    border: "1.5px solid #5b6e88",
                    boxShadow:
                      "0 8px 22px rgba(11,37,69,0.16), 0 2px 6px rgba(11,37,69,0.10), 0 0 0 1px rgba(255,255,255,0.4) inset",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/public-hero-portrait.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
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
              </div>
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
            className="flex justify-center mt-auto lg:mt-0 lg:absolute lg:right-[2.9rem] lg:bottom-[9rem]"
          >
            <HeroCards />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
