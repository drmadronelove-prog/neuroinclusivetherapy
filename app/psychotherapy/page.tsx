"use client"

import { ProviderCards } from "@/components/provider-cards"
import { motion } from "framer-motion"

export default function PsychotherapyPage() {
  return (
    <main className="relative bg-background overflow-x-hidden">
      <section
        className="relative"
        style={{ minHeight: "100svh", background: "var(--paper)" }}
      >
        <div className="relative px-5 sm:px-6 lg:px-12 pt-40 sm:pt-44 lg:pt-48 pb-20 flex flex-col items-center gap-10 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-2xl"
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 6vw, 4.2rem)",
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              Neuroinclusive
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                color: "var(--ink)",
                lineHeight: 1.3,
                marginTop: "0.4rem",
              }}
            >
              psychotherapy and{" "}
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  color: "var(--plum)",
                }}
              >
                assessment
              </span>
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(11,37,69,0.55)",
                marginTop: "1.4rem",
              }}
            >
              Clinical Providers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <ProviderCards />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
