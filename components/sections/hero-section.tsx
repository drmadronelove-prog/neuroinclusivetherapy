"use client"

import { HeroCards } from "@/components/hero-cards"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 md:pt-12 pb-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Massive headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-[var(--font-display)] text-7xl sm:text-8xl lg:text-9xl font-black text-foreground leading-[0.85] tracking-tight">
                <span className="block">NEURO</span>
                <span className="block text-nav-coral">INCLU</span>
                <span className="block">SIVE</span>
              </h1>
            </motion.div>

            {/* Secondary headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground">
                Still your mind. Open your heart.
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md">
                I work with people who feel different. Maybe you have an autism, ADHD, or OCD 
                diagnosis (including self-diagnosis) or you simply describe yourself as 
                &quot;weird.&quot; Your difference isn&apos;t a sign that something is wrong with you.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-[var(--font-display)] font-bold text-sm tracking-wider uppercase hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Schedule a Consultation
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>

            {/* Micro info grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-6 pt-8 border-t border-border"
            >
              <div>
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Approach:
                </span>
                <p className="text-sm text-foreground mt-1">
                  Neuro-inclusive, Buddhist-inspired, mindfulness &amp; compassion focused
                </p>
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Training:
                </span>
                <p className="text-sm text-foreground mt-1">
                  ERP, DBT, ACT, Ketamine-assisted therapy, executive function coaching
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right content - Hero Cards */}
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
