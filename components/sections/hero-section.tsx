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

          {/* On phone/tablet the cluster + heading stack in one centered
              column. On desktop `lg:contents` dissolves this wrapper so the
              cluster and heading become independent absolutely-positioned
              blocks (the cluster sits below the fixed header; the heading
              anchors to the lower-left). */}
          <div className="shrink-0 mx-auto flex flex-col items-stretch max-w-[340px] gap-6 text-center lg:text-left lg:contents">

            {/* Scattered cluster of 6 circular photos, framed like the hero
                cards (slate hairline + soft drop shadow + inner highlight).
                On desktop it's pinned at lg:top-[7rem] so it always clears
                the fixed header, and the circle `top` values keep every
                circle inside the box (no upward overflow behind the bar). */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:absolute lg:left-[2.9rem] lg:top-[7rem] lg:w-[38rem]"
            >
              <div className="relative w-full aspect-[1.3]">
                {[
                  { src: "/image%206%20(1).jpeg", left: 24, top: 32, d: 44 },
                  { src: "/image%202.jpeg", left: 58, top: 22, d: 30 },
                  { src: "/image%203.jpeg", left: 87, top: 48, d: 36 },
                  { src: "/image%204.jpeg", left: 48, top: 60, d: 50 },
                  { src: "/image%205.jpeg", left: 11, top: 78, d: 22 },
                  { src: "/image%201.jpeg", left: 80, top: 84, d: 28 },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="absolute aspect-square overflow-hidden"
                    style={{
                      left: `${c.left}%`,
                      top: `${c.top}%`,
                      width: `${c.d}%`,
                      transform: "translate(-50%, -50%)",
                      borderRadius: "9999px",
                      border: "1.5px solid #5b6e88",
                      boxShadow:
                        "0 8px 22px rgba(11,37,69,0.16), 0 2px 6px rgba(11,37,69,0.10), 0 0 0 1px rgba(255,255,255,0.4) inset",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
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
