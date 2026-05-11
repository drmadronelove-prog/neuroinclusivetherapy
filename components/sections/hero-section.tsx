"use client"

import { HeroCards } from "@/components/hero-cards"
import { AnimatedHeading } from "@/components/animated-heading"
import { OliveLockup } from "@/components/olive-logo"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative"
      style={{ minHeight: "100svh", background: "var(--paper)" }}
    >

      {/* Mobile header bar — full-width bone strip across the top */}
      <div
        className="no-print fixed top-0 left-0 right-0 z-[60] sm:hidden flex items-center px-4 py-2.5 border-b"
        style={{
          background: "#fdfbf7",
          borderColor: "rgba(11,37,69,0.10)",
          boxShadow: "0 1px 6px rgba(11,37,69,0.04)",
        }}
      >
        <OliveLockup size={0.42} />
      </div>
      {/* Desktop wordmark — bare lockup */}
      <div
        className="no-print fixed top-5 left-6 z-[60] hidden sm:inline-flex"
        style={{ alignItems: "center" }}
      >
        <OliveLockup size={0.55} />
      </div>

      {/* Main content — flex-col on mobile so footer anchors to bottom */}
      <div
        className="relative min-h-[100svh] flex flex-col justify-between lg:justify-end px-5 sm:px-6 lg:px-0 pt-20 sm:pt-28 pb-0 lg:pt-0"
        style={{ zIndex: 2 }}
      >
        {/* Heading + cards (absolute positioned on desktop, in flex flow on mobile) */}
        <div className="flex flex-col gap-6 w-full lg:max-w-none mx-auto">

          <div className="shrink-0 space-y-1 text-center lg:text-left mx-auto lg:mx-0 lg:absolute lg:left-[2.9rem] lg:bottom-[13rem]" style={{ maxWidth: "340px" }}>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:absolute lg:right-[2.9rem] lg:bottom-[9rem]"
          >
            <HeroCards />
          </motion.div>

        </div>

        {/* Mobile footer — sits at bottom of viewport */}
        <div className="no-print lg:hidden py-6" style={{ fontFamily: "var(--font-mono)", color: "rgba(11,37,69,0.65)", lineHeight: 1.5, fontSize: "0.72rem", letterSpacing: "0.02em" }}>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>San Francisco &amp; Berkeley</span>
            <span aria-hidden="true">·</span>
            <a href="tel:+14159152183" className="hover:opacity-100 transition-opacity">(415) 915-2183</a>
            <span aria-hidden="true">·</span>
            <a href="mailto:info@oliveclinical.com" className="hover:opacity-100 transition-opacity break-all">info@oliveclinical.com</a>
          </p>
        </div>
      </div>

      {/* Desktop footer */}
      <footer
        className="no-print hidden lg:block absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 3,
          paddingBottom: "18px",
          paddingTop: "32px",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
          <p style={{ fontFamily: "var(--font-mono)", color: "rgba(11,37,69,0.65)", fontSize: "0.78rem", letterSpacing: "0.02em" }}>
            Hayes Valley, San Francisco &amp; Berkeley, CA
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ fontFamily: "var(--font-mono)", color: "rgba(11,37,69,0.65)", fontSize: "0.78rem", letterSpacing: "0.02em" }}>
            <a href="tel:+14159152183" className="hover:opacity-100 transition-opacity">(415) 915-2183</a>
            <a href="mailto:info@oliveclinical.com" className="hover:opacity-100 transition-opacity">info@oliveclinical.com</a>
            <Link href="/contact" className="hover:opacity-100 transition-opacity">Book a consultation</Link>
          </div>
        </div>
      </footer>
    </section>
  )
}
