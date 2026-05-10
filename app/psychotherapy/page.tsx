"use client"

import { OliveLockup } from "@/components/olive-logo"
import { ProviderCards } from "@/components/provider-cards"
import { motion } from "framer-motion"
import Link from "next/link"

export default function PsychotherapyPage() {
  return (
    <main className="relative bg-background overflow-x-hidden">
      <section
        className="relative"
        style={{ minHeight: "100svh", background: "var(--paper)" }}
      >
        {/* Logo — smaller mark only on phones (back link is on the left), full lockup on sm+ */}
        <div
          className="no-print fixed top-3 right-3 z-[60] sm:hidden rounded-full px-3 py-1.5"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(251,248,243,0.82)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 1px 8px rgba(11,37,69,0.06)",
          }}
        >
          <OliveLockup size={0.32} />
        </div>
        <div
          className="no-print fixed top-4 right-4 z-[60] hidden sm:inline-flex rounded-full px-4 py-2"
          style={{
            alignItems: "center",
            background: "rgba(251,248,243,0.82)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 1px 8px rgba(11,37,69,0.06)",
          }}
        >
          <OliveLockup size={0.55} />
        </div>

        {/* Back link — upper left */}
        <div
          className="no-print fixed top-3 sm:top-5 left-3 sm:left-4 z-[60] rounded-full px-3 py-1.5"
          style={{
            background: "rgba(251,248,243,0.82)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 1px 8px rgba(11,37,69,0.06)",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
              color: "rgba(11,37,69,0.7)",
            }}
            className="hover:opacity-100 transition-opacity"
          >
            ← Home
          </Link>
        </div>

        <div className="relative px-5 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-20 flex flex-col items-center gap-10 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-2xl"
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 8vw, 4.2rem)",
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: 0,
                wordBreak: "break-word",
                hyphens: "auto",
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

        <footer
          className="no-print absolute bottom-0 left-0 right-0"
          style={{
            paddingBottom: "18px",
            paddingTop: "32px",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(11,37,69,0.65)",
                fontSize: "0.78rem",
                letterSpacing: "0.02em",
              }}
            >
              Hayes Valley, San Francisco &amp; Berkeley, CA
            </p>
            <div
              className="flex flex-wrap gap-x-5 gap-y-1"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(11,37,69,0.65)",
                fontSize: "0.78rem",
                letterSpacing: "0.02em",
              }}
            >
              <a href="tel:+14159152183" className="hover:opacity-100 transition-opacity">
                (415) 915-2183
              </a>
              <a
                href="mailto:info@oliveclinical.com"
                className="hover:opacity-100 transition-opacity"
              >
                info@oliveclinical.com
              </a>
              <Link href="/contact" className="hover:opacity-100 transition-opacity">
                Book a consultation
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  )
}
