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
      {/* Main content — same max-w-[1400px] px frame as the nav so the
          blob/heading left edge lines up with the lockup and the card
          grid's right edge lines up with the nav's right edge. */}
      <div
        className="relative min-h-[100svh] max-w-[1400px] mx-auto flex flex-col justify-end px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 lg:pt-12 pb-10"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col gap-6 w-full lg:max-w-none mx-auto">

          {/* On phone/tablet the cluster + heading stack in one centered
              column. On desktop `lg:contents` dissolves this wrapper so the
              cluster and heading become independent absolutely-positioned
              blocks. */}
          <div className="shrink-0 mx-auto flex flex-col items-stretch max-w-[340px] gap-6 text-center lg:text-left lg:contents">

            {/* Matte organic paint-blob cluster — six soft daubs with a
                gentle directional light and a faint sheen (not glossy
                spheres). Organic per-blob border-radius + slight rotation
                give a hand-placed, painterly feel. */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:absolute lg:left-12 lg:top-[1rem] lg:w-[38rem]"
            >
              <div className="relative w-full aspect-[0.95]">
                {[
                  // mauve / dusty purple — big, upper-left
                  { left: 16, top: 29, d: 38, base: "#9c7d92", light: "#b89bb0", shade: "#7d6175",
                    radius: "47% 53% 60% 40% / 52% 44% 56% 48%", rot: -8 },
                  // deep navy — small, top
                  { left: 58, top: 20, d: 26, base: "#3c4a63", light: "#54637c", shade: "#2e3b52",
                    radius: "58% 42% 45% 55% / 48% 56% 44% 52%", rot: 6 },
                  // terracotta / peach — right
                  { left: 82, top: 38, d: 32, base: "#c4897a", light: "#d6a394", shade: "#a4705f",
                    radius: "42% 58% 52% 48% / 55% 45% 55% 45%", rot: -5 },
                  // warm sand — largest, central
                  { left: 45, top: 56, d: 40, base: "#cdb392", light: "#dfcaa8", shade: "#ad9573",
                    radius: "52% 48% 46% 54% / 50% 54% 46% 50%", rot: 3 },
                  // sage green — small, lower-left
                  { left: 11, top: 65, d: 20, base: "#97a883", light: "#b0c09e", shade: "#788966",
                    radius: "55% 45% 58% 42% / 46% 52% 48% 54%", rot: 10 },
                  // dusty pink — lower-right
                  { left: 79, top: 66, d: 24, base: "#c498a0", light: "#d7b1b8", shade: "#a67c83",
                    radius: "45% 55% 50% 50% / 56% 44% 58% 42%", rot: -7 },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="absolute aspect-square"
                    style={{
                      left: `${c.left}%`,
                      top: `${c.top}%`,
                      width: `${c.d}%`,
                      transform: `translate(-50%, -50%) rotate(${c.rot}deg)`,
                      borderRadius: c.radius,
                      backgroundColor: c.base,
                      backgroundImage: [
                        // faint matte sheen, soft and off-center (not glossy)
                        `radial-gradient(ellipse 34% 22% at 36% 28%, rgba(255,255,255,0.22), rgba(255,255,255,0) 72%)`,
                        // gentle directional paint shading, low contrast
                        `linear-gradient(152deg, ${c.light} 0%, ${c.base} 48%, ${c.shade} 100%)`,
                      ].join(", "),
                      boxShadow: `0 10px 20px -12px rgba(60,40,30,0.18)`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Heading group */}
            <div className="space-y-1 lg:absolute lg:left-12 lg:bottom-[9rem] lg:max-w-none">
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
            className="flex justify-center lg:absolute lg:right-12 lg:bottom-[9rem]"
          >
            <HeroCards />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
