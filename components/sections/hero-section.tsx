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

            {/* Wet paint-dab cluster — six organic daubs: flat pigment
                pooling to a darker rim under a soft diffuse wet sheen
                (no specular glint, so it reads as paint, not plastic). */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:absolute lg:left-12 lg:top-[3rem] lg:w-[38rem]"
            >
              <div className="relative w-full aspect-[0.95]">
                {[
                  // mauve / dusty purple — big, upper-left
                  { left: 16, top: 29, d: 38, base: "#9c7d92", light: "#cbb4c5", shade: "#6e5366",
                    radius: "47% 53% 60% 40% / 52% 44% 56% 48%", rot: -8 },
                  // deep navy — small, top
                  { left: 58, top: 20, d: 26, base: "#3c4a63", light: "#6b7a93", shade: "#252f44",
                    radius: "58% 42% 45% 55% / 48% 56% 44% 52%", rot: 6 },
                  // terracotta / peach — right
                  { left: 82, top: 38, d: 32, base: "#c4897a", light: "#e7bcae", shade: "#955f51",
                    radius: "42% 58% 52% 48% / 55% 45% 55% 45%", rot: -5 },
                  // warm sand — largest, central
                  { left: 45, top: 56, d: 40, base: "#cdb392", light: "#edd9b8", shade: "#9d8463",
                    radius: "52% 48% 46% 54% / 50% 54% 46% 50%", rot: 3 },
                  // sage green — small, lower-left
                  { left: 11, top: 65, d: 20, base: "#97a883", light: "#c2d0b1", shade: "#6c7d59",
                    radius: "55% 45% 58% 42% / 46% 52% 48% 54%", rot: 10 },
                  // dusty pink — lower-right
                  { left: 79, top: 66, d: 24, base: "#c498a0", light: "#e7c6cc", shade: "#9a7178",
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
                        // broad, soft, diffuse wet sheen — a satin streak, not a hard specular glint
                        `radial-gradient(ellipse 58% 42% at 39% 31%, rgba(255,255,255,0.22), rgba(255,255,255,0) 72%)`,
                        // pigment pooling: thin lighter centre thickening to an even, darker rim —
                        // centred, with no single light direction, so it reads as paint not a lit sphere
                        `radial-gradient(circle at 50% 50%, ${c.light} 0%, ${c.base} 36%, ${c.shade} 100%)`,
                      ].join(", "),
                      boxShadow: [
                        // soft, flat contact shadow — the dab sits on the paper, it doesn't float
                        `0 6px 12px -8px rgba(60,40,30,0.22)`,
                        // darker pooled paint edge all the way around the rim
                        `inset 0 0 15px -6px rgba(0,0,0,0.20)`,
                      ].join(", "),
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Heading group */}
            <div className="space-y-1 lg:absolute lg:left-12 lg:bottom-[10rem] lg:max-w-none">
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
            className="flex justify-center lg:absolute lg:right-12 lg:top-1/2 lg:-translate-y-1/2"
          >
            <HeroCards />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
