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
        className="relative min-h-[100svh] flex flex-col justify-end px-5 sm:px-6 lg:px-0 pt-8 sm:pt-10 lg:pt-12 pb-10"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col gap-6 w-full lg:max-w-none mx-auto">

          {/* On phone/tablet the cluster + heading stack in one centered
              column. On desktop `lg:contents` dissolves this wrapper so the
              cluster and heading become independent absolutely-positioned
              blocks. */}
          <div className="shrink-0 mx-auto flex flex-col items-stretch max-w-[340px] gap-6 text-center lg:text-left lg:contents">

            {/* Soft 3D blob cluster — six spheres with baked-in radial
                shading + a lighter inner highlight. No borders/outlines;
                only a faint warm contact shadow so they feel grounded. */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:absolute lg:left-[2.9rem] lg:top-[1rem] lg:w-[38rem]"
            >
              <div className="relative w-full aspect-[0.95]">
                {[
                  // mauve / dusty purple — big, upper-left
                  { left: 16, top: 29, d: 38, base: "#9c7d92", light: "#bda1b4", shade: "#785b70" },
                  // deep navy — small, top
                  { left: 58, top: 20, d: 26, base: "#3c4a63", light: "#5a6981", shade: "#283650" },
                  // terracotta / peach — right
                  { left: 82, top: 38, d: 32, base: "#c4897a", light: "#dba898", shade: "#9d685b" },
                  // warm sand — largest, central
                  { left: 45, top: 56, d: 40, base: "#cdb392", light: "#e4cfac", shade: "#a98e6c" },
                  // sage green — small, lower-left
                  { left: 11, top: 65, d: 20, base: "#97a883", light: "#b6c4a2", shade: "#728362" },
                  // dusty pink — lower-right
                  { left: 79, top: 66, d: 24, base: "#c498a0", light: "#dcb6bd", shade: "#a1767e" },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="absolute aspect-square rounded-full"
                    style={{
                      left: `${c.left}%`,
                      top: `${c.top}%`,
                      width: `${c.d}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: c.base,
                      backgroundImage: [
                        // glossy inner highlight near the top-left
                        `radial-gradient(ellipse 42% 30% at 38% 26%, rgba(255,255,255,0.5), rgba(255,255,255,0) 70%)`,
                        // sphere shading: light core to darker lower-right edge
                        `radial-gradient(circle at 40% 36%, ${c.light} 0%, ${c.base} 52%, ${c.shade} 100%)`,
                      ].join(", "),
                      boxShadow: `0 14px 26px -10px rgba(60,40,30,0.22)`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Heading group */}
            <div className="space-y-1 lg:absolute lg:left-[2.9rem] lg:bottom-[9rem] lg:max-w-none">
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
