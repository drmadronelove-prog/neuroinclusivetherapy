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
      {/* Subtle flowing movement lines — full section background */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.32,
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Curved arc lines that sweep from bottom-left toward top-right */}
          {Array.from({ length: 22 }).map((_, i) => (
            <path
              key={i}
              id={`arc-${i}`}
              d={`M ${-200 + i * 60},900 Q ${200 + i * 55},${480 - i * 12} ${700 + i * 48},${-60 + i * 8}`}
              fill="none"
            />
          ))}
        </defs>
        <g stroke="#7A9A78" strokeWidth="0.9" fill="none">
          {Array.from({ length: 22 }).map((_, i) => (
            <use key={i} href={`#arc-${i}`} strokeOpacity={0.35 - i * 0.008} />
          ))}
        </g>
      </svg>

      {/* Secondary finer lines at a steeper angle for depth */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.16,
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="diag-lines"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(34)"
          >
            <line x1="0" y1="0" x2="0" y2="36" stroke="#7A9A78" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-lines)" />
      </svg>

      <div className="relative max-w-6xl mx-auto w-full">
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
